import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MultiStepContactForm } from "@/components/forms/MultiStepContactForm";
import { CLINIC_INFO } from "@/lib/constants";
import { Calendar, Clock, CheckCircle, Phone, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Pedir Cita - Primera Visita Gratuita | Clínica Dental Vela-Segalà Viladecans",
  description:
    `Pide tu cita en nuestra clínica dental de Viladecans. Primera visita gratuita con diagnóstico completo. Llámanos al ${CLINIC_INFO.phoneDisplay} o rellena el formulario online.`,
  keywords: [
    "pedir cita dentista viladecans",
    "primera visita gratuita viladecans",
    "cita online dentista viladecans",
    "reservar cita dental viladecans",
    "dentista viladecans cita previa",
  ],
  openGraph: {
    title: "Pedir Cita - Primera Visita Gratuita | Clínica Dental Vela-Segalà",
    description:
      `Pide tu cita en nuestra clínica dental de Viladecans. Primera visita gratuita. Llámanos al ${CLINIC_INFO.phoneDisplay}.`,
    images: ["/images/instalaciones-vela-segala.webp"],
  },
};

export default function PedirCitaPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Pedir Cita", href: "/pedir-cita" },
            ]}
          />

          <div className="mt-8 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium mb-6">
              <Award className="w-5 h-5" />
              Primera Visita Gratuita
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Pide tu Cita
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
              Agenda tu visita en nuestra <strong>clínica dental en Viladecans</strong>. 
              Diagnóstico completo, plan de tratamiento personalizado y sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios de la Primera Visita */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              ¿Qué Incluye la Primera Visita?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Beneficio 1 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Revisión Completa
                </h3>
                <p className="text-sm text-slate-600">
                  Examen exhaustivo de tu salud bucodental
                </p>
              </div>

              {/* Beneficio 2 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Diagnóstico Digital
                </h3>
                <p className="text-sm text-slate-600">
                  Tecnología 3D para un diagnóstico preciso
                </p>
              </div>

              {/* Beneficio 3 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Plan Personalizado
                </h3>
                <p className="text-sm text-slate-600">
                  Tratamiento adaptado a tus necesidades
                </p>
              </div>

              {/* Beneficio 4 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Sin Compromiso
                </h3>
                <p className="text-sm text-slate-600">
                  Decide con toda la información
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario y Métodos de Contacto */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 max-w-6xl mx-auto items-start">
            {/* Formulario */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Reserva tu Cita Online
                </h2>
                <p className="text-lg text-slate-600">
                  Rellena el formulario y nos pondremos en contacto contigo en menos de 24 horas para confirmar tu cita.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8">
                <MultiStepContactForm />
              </div>
            </div>

            {/* Sidebar - Información y Contacto */}
            <aside className="space-y-6">
              <div className="sticky top-32 space-y-6">
                {/* Llamar Ahora */}
                <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 shadow-xl text-white">
                  <Phone className="w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-bold mb-3">
                    ¿Prefieres Llamar?
                  </h3>
                  <p className="text-gray-200 mb-6">
                    Llámanos y te atenderemos enseguida
                  </p>
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="block bg-white text-black text-center px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-xl mb-6"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>

                  {/* Horario */}
                  <div className="pt-6 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">Horario de Atención</span>
                    </div>
                    <div className="space-y-3 text-sm text-gray-300">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="font-medium text-white mb-1">Lunes a Jueves:</p>
                        <p>9:00 - 14:00 y 15:00 - 20:00</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="font-medium text-white mb-1">Viernes:</p>
                        <p>9:00 - 15:00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qué Esperar */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-black mb-6">
                    ¿Qué Ocurre Después?
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-bold text-black mb-1">Revisamos tu solicitud</p>
                        <p className="text-sm text-slate-600">En menos de 2 horas laborables</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-bold text-black mb-1">Te llamamos</p>
                        <p className="text-sm text-slate-600">Para confirmar fecha y hora</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-bold text-black mb-1">¡Listo!</p>
                        <p className="text-sm text-slate-600">Tu cita está confirmada</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primera Visita Incluye */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg border border-green-100">
                  <h3 className="text-xl font-bold text-black mb-6">
                    Primera Visita Incluye
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">Revisión completa bucodental</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">Diagnóstico con tecnología 3D</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">Plan de tratamiento personalizado</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">Presupuesto sin compromiso</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-green-200">
                    <p className="text-2xl font-bold text-green-700 text-center">
                      100% Gratuita
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

