"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  message: string;
  acceptPrivacy: boolean;
  captcha: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  treatment?: string;
  message?: string;
  acceptPrivacy?: string;
  captcha?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    message: "",
    acceptPrivacy: false,
    captcha: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Generar números aleatorios para el captcha
  const [captchaNumbers] = useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!/^[0-9\s+()-]{9,}$/.test(formData.phone)) {
      newErrors.phone = "Teléfono inválido";
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    // Validar política de privacidad
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = "Debes aceptar la política de privacidad";
    }

    // Validar captcha
    if (!formData.captcha.trim()) {
      newErrors.captcha = "Debes resolver el captcha";
    } else if (parseInt(formData.captcha) !== captchaNumbers.answer) {
      newErrors.captcha = "Respuesta incorrecta";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Aquí iría la llamada a la API para enviar el formulario
      // Por ahora simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Formulario enviado:", formData);
      
      setSubmitStatus("success");
      
      // Resetear formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        treatment: "",
        message: "",
        acceptPrivacy: false,
        captcha: "",
      });
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
          placeholder="600 123 456"
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Tratamiento */}
      <div>
        <label htmlFor="treatment" className="block text-sm font-medium text-slate-700 mb-2">
          Tratamiento de interés
        </label>
        <select
          id="treatment"
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
        >
          <option value="">Selecciona un tratamiento (opcional)</option>
          <option value="implantes-dentales">Implantes Dentales</option>
          <option value="ortodoncia-invisible">Ortodoncia Invisible / Invisalign</option>
          <option value="estetica-dental">Estética Dental / Carillas</option>
          <option value="blanqueamiento-dental">Blanqueamiento Dental</option>
          <option value="odontopediatria">Odontopediatría (Niños)</option>
          <option value="periodoncia">Periodoncia / Encías</option>
          <option value="endodoncia">Endodoncia / Matar Nervio</option>
          <option value="protesis-dentales">Prótesis Dentales</option>
          <option value="cirugia-oral">Cirugía Oral / Muelas del Juicio</option>
          <option value="bruxismo">Bruxismo / Férula de Descarga</option>
          <option value="limpieza-dental">Limpieza Dental</option>
          <option value="urgencias-dentales">Urgencias Dentales</option>
          <option value="revision-general">Revisión General</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none`}
          placeholder="Cuéntanos en qué podemos ayudarte..."
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Política de Privacidad */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="acceptPrivacy"
            checked={formData.acceptPrivacy}
            onChange={handleChange}
            className={`mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer ${
              errors.acceptPrivacy ? "border-red-500" : ""
            }`}
          />
          <span className="text-sm text-slate-700 leading-relaxed">
            Conozco y acepto la{" "}
            <Link
              href="/politica-privacidad"
              className="text-black font-bold underline hover:text-gray-700"
              target="_blank"
            >
              Política de Privacidad
            </Link>
          </span>
        </label>
        {errors.acceptPrivacy && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.acceptPrivacy}
          </p>
        )}
      </div>

      {/* Captcha */}
      <div>
        <label htmlFor="captcha" className="block text-sm font-medium text-slate-700 mb-2">
          Demuestra que no eres un robot, {captchaNumbers.num1} + {captchaNumbers.num2} = ?{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="captcha"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.captcha ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
          placeholder="Tu respuesta"
          maxLength={2}
        />
        {errors.captcha && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.captcha}
          </p>
        )}
      </div>

      {/* Mensajes de Estado */}
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">¡Mensaje enviado con éxito!</p>
            <p className="text-green-700 text-sm mt-1">
              Nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error al enviar el mensaje</p>
            <p className="text-red-700 text-sm mt-1">
              Por favor, inténtalo de nuevo o llámanos directamente.
            </p>
          </div>
        </div>
      )}

      {/* Botón Enviar */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar
          </>
        )}
      </button>
    </form>
  );
}

