"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, User, Mail, Phone, Calendar, MessageSquare, Clock } from "lucide-react";
import { getApiUrl } from "@/lib/config";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  message: string;
}

const TREATMENTS = [
  "Revisión General",
  "Limpieza Dental",
  "Ortodoncia Invisible",
  "Implantes Dentales",
  "Estética Dental",
  "Blanqueamiento Dental",
  "Periodoncia",
  "Odontopediatría",
  "Endodoncia",
  "Otro / No lo sé",
];

const TIME_SLOTS = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
  "19:00 - 20:00",
];

// Configuración de disponibilidad por tratamiento
const TREATMENT_AVAILABILITY: {
  [key: string]: {
    days: number[]; // 0 = lunes, 1 = martes, 2 = miércoles, 3 = jueves, 4 = viernes
    morningOnly?: boolean; // Solo mañana (09:00 - 13:00)
    afternoonOnly?: boolean; // Solo tarde (15:00 - 20:00)
  };
} = {
  "Limpieza Dental": {
    days: [0, 1, 2, 3, 4], // lunes, martes, miércoles, jueves, viernes
    // Horarios especiales manejados en getAvailableTimeSlots
  },
  "Revisión General": {
    days: [1, 3, 4], // martes, jueves, viernes
    morningOnly: true,
  },
  "Periodoncia": {
    days: [1], // martes
  },
  "Odontopediatría": {
    days: [3], // jueves
  },
  "Endodoncia": {
    days: [3], // jueves
  },
  "Ortodoncia Invisible": {
    days: [1, 2], // martes y miércoles
    afternoonOnly: true, // solo tarde
  },
  "Implantes Dentales": {
    days: [0, 2], // lunes y miércoles
  },
  "Estética Dental": {
    days: [0, 2], // lunes y miércoles
  },
};

// Función para obtener días disponibles según el tratamiento
const getAvailableDays = (treatment: string): number[] => {
  if (!treatment || treatment === "Otro / No lo sé") {
    // Si no hay tratamiento seleccionado, mostrar todos los días
    return [0, 1, 2, 3, 4];
  }
  return TREATMENT_AVAILABILITY[treatment]?.days || [0, 1, 2, 3, 4];
};

// Función para obtener horarios disponibles según el día y tratamiento
const getAvailableTimeSlots = (treatment: string, selectedDate: string): string[] => {
  if (!selectedDate || !treatment || treatment === "Otro / No lo sé") {
    return TIME_SLOTS;
  }

  const date = new Date(selectedDate);
  const dayOfWeek = date.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  // Ajustar: 0 = domingo, 1 = lunes, ..., 6 = sábado
  // Nuestro sistema: 0 = lunes, 1 = martes, ..., 4 = viernes
  const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convertir a nuestro sistema

  const availability = TREATMENT_AVAILABILITY[treatment];
  if (!availability) return TIME_SLOTS;

  // Verificar si el día está disponible
  if (!availability.days.includes(dayIndex)) {
    return [];
  }

  // Filtros especiales para Limpieza Dental
  if (treatment === "Limpieza Dental") {
    if (dayIndex === 1) {
      // Martes: solo mañana (09:00-13:00)
      return TIME_SLOTS.slice(0, 2); // 09:00-11:00, 11:00-13:00
    }
    if (dayIndex === 2) {
      // Miércoles: solo tarde (15:00-20:00)
      return TIME_SLOTS.slice(3); // 15:00-17:00, 17:00-19:00, 19:00-20:00
    }
    if (dayIndex === 4) {
      // Viernes: solo mañana (09:00-13:00)
      return TIME_SLOTS.slice(0, 2); // 09:00-11:00, 11:00-13:00
    }
    // Lunes (0) y jueves (3): todos los horarios
    return TIME_SLOTS;
  }

  // Para otros tratamientos con restricciones
  if (availability.morningOnly) {
    return TIME_SLOTS.slice(0, 2); // Solo mañana
  }
  if (availability.afternoonOnly) {
    return TIME_SLOTS.slice(3); // Solo tarde
  }

  return TIME_SLOTS;
};

// Función para verificar si un día está disponible
const isDayAvailable = (date: Date, treatment: string): boolean => {
  if (!treatment || treatment === "Otro / No lo sé") {
    return true;
  }
  const dayOfWeek = date.getDay();
  const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const availableDays = getAvailableDays(treatment);
  return availableDays.includes(dayIndex);
};

export function MultiStepContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, hideToast, success, error } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    treatment: "",
    message: "",
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          error("Por favor, introduce tu nombre");
          return false;
        }
        if (!formData.email.trim() || !formData.email.includes("@")) {
          error("Por favor, introduce un email válido");
          return false;
        }
        if (!formData.phone.trim()) {
          error("Por favor, introduce tu teléfono");
          return false;
        }
        return true;
      case 2:
        if (!formData.treatment) {
          error("Por favor, selecciona un tratamiento");
          return false;
        }
        return true;
      case 3:
        if (!formData.preferredDate) {
          error("Por favor, selecciona una fecha");
          return false;
        }
        // Validar que el día sea válido para el tratamiento
        if (formData.treatment && formData.treatment !== "Otro / No lo sé") {
          const date = new Date(formData.preferredDate);
          if (!isDayAvailable(date, formData.treatment)) {
            error("Este día no está disponible para el tratamiento seleccionado");
            return false;
          }
        }
        return true;
      case 4:
        return true; // Mensaje es opcional
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Enviar a appointments
      const appointmentResponse = await fetch(`${getApiUrl()}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime || undefined,
          treatment: formData.treatment || undefined,
          message: formData.message || undefined,
        }),
      });

      if (!appointmentResponse.ok) {
        throw new Error("Error al enviar la solicitud de cita");
      }

      // También enviar a contactos para el dashboard
      const contactResponse = await fetch(`${getApiUrl()}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || `Solicitud de cita para ${formData.preferredDate}${formData.preferredTime ? ` a las ${formData.preferredTime}` : ''}${formData.treatment ? `. Tratamiento: ${formData.treatment}` : ''}`,
          treatment: formData.treatment || undefined,
        }),
      });

      // No fallar si el contacto no se crea, solo loguear
      if (!contactResponse.ok) {
        console.warn("No se pudo crear el contacto, pero la cita se envió correctamente");
      }

      success("¡Solicitud enviada! Te contactaremos en menos de 24 horas");
      
      // Reset form
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          treatment: "",
          message: "",
        });
        setCurrentStep(1);
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      error("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="text-sm font-medium text-slate-600">
            {Math.round(progressPercentage)}% completado
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-black to-gray-800 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps Indicators */}
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${
                step < currentStep
                  ? "bg-green-500 text-white"
                  : step === currentStep
                  ? "bg-black text-white scale-110"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="min-h-[400px]">
        {/* Step 1: Información Personal */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Información Personal
              </h3>
              <p className="text-slate-600">
                Necesitamos tus datos para contactarte
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="600 123 456"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>
          </div>
        )}

        {/* Step 2: Tratamiento */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                ¿Qué tratamiento necesitas?
              </h3>
              <p className="text-slate-600">
                Selecciona el tipo de consulta para mostrarte los horarios disponibles
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Tratamiento de interés *
              </label>
              <select
                value={formData.treatment}
                onChange={(e) => {
                  updateFormData("treatment", e.target.value);
                  // Reset fecha y hora cuando cambia el tratamiento
                  updateFormData("preferredDate", "");
                  updateFormData("preferredTime", "");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              >
                <option value="">Selecciona un tratamiento</option>
                {TREATMENTS.map((treatment) => (
                  <option key={treatment} value={treatment}>
                    {treatment}
                  </option>
                ))}
              </select>
            </div>

            {formData.treatment && formData.treatment !== "Otro / No lo sé" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>ℹ️ Horarios disponibles:</strong>{" "}
                  {(() => {
                    const availability = TREATMENT_AVAILABILITY[formData.treatment];
                    if (!availability) return "Consultar disponibilidad";
                    const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
                    const availableDayNames = availability.days.map((d) => dayNames[d]);
                    let text = availableDayNames.join(", ");
                    if (availability.morningOnly) {
                      text += " (solo mañana)";
                    } else if (availability.afternoonOnly) {
                      text += " (solo tarde)";
                    }
                    return text;
                  })()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Fecha y Hora */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                ¿Cuándo te viene bien?
              </h3>
              <p className="text-slate-600">
                Selecciona tu fecha y hora preferida (orientativo)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fecha preferida *
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => {
                  updateFormData("preferredDate", e.target.value);
                  // Reset hora cuando cambia la fecha
                  updateFormData("preferredTime", "");
                }}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              {formData.preferredDate && formData.treatment && formData.treatment !== "Otro / No lo sé" && (
                (() => {
                  const date = new Date(formData.preferredDate);
                  const isAvailable = isDayAvailable(date, formData.treatment);
                  if (!isAvailable) {
                    return (
                      <p className="mt-2 text-sm text-red-600">
                        ⚠️ Este día no está disponible para {formData.treatment}. Por favor, selecciona otro día.
                      </p>
                    );
                  }
                  return null;
                })()
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Franja horaria preferida (orientativo)
              </label>
              {(() => {
                const availableSlots = getAvailableTimeSlots(formData.treatment, formData.preferredDate);
                if (availableSlots.length === 0) {
                  return (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-sm text-yellow-800">
                        ⚠️ No hay horarios disponibles para este día y tratamiento. Por favor, selecciona otra fecha.
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="grid grid-cols-2 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => updateFormData("preferredTime", slot)}
                        className={`p-3 rounded-xl font-medium transition-all ${
                          formData.preferredTime === slot
                            ? "bg-black text-white scale-105 shadow-lg"
                            : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
                        {slot}
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                <strong>📞 Nota:</strong> La fecha y hora son orientativas. Te llamaremos para confirmar la cita según la disponibilidad real del especialista.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Mensaje */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                ¿Algo más que quieras contarnos?
              </h3>
              <p className="text-slate-600">
                Cuéntanos tus dudas o necesidades (opcional)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mensaje adicional
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                rows={6}
                placeholder="Ejemplo: Tengo sensibilidad dental y me gustaría saber opciones..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 5: Resumen */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Revisa tu Solicitud
              </h3>
              <p className="text-slate-600">
                Verifica que todo esté correcto antes de enviar
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-600">Nombre</p>
                  <p className="font-semibold text-black">{formData.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-semibold text-black">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-600">Teléfono</p>
                  <p className="font-semibold text-black">{formData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-600">Fecha preferida</p>
                  <p className="font-semibold text-black">
                    {new Date(formData.preferredDate).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {formData.preferredTime && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-600">Horario</p>
                    <p className="font-semibold text-black">{formData.preferredTime}</p>
                  </div>
                </div>
              )}

              {formData.treatment && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-600">Tratamiento</p>
                    <p className="font-semibold text-black">{formData.treatment}</p>
                  </div>
                </div>
              )}

              {formData.message && (
                <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                  <MessageSquare className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-600">Mensaje</p>
                    <p className="text-slate-700">{formData.message}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>📞 Te llamaremos pronto:</strong> Nos pondremos en contacto contigo
                en menos de 24 horas para confirmar tu cita.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Atrás
          </button>
        )}

        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            Siguiente
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Enviando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Enviar Solicitud
              </>
            )}
          </button>
        )}
      </div>

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}

