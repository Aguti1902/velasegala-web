import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MultiStepContactForm } from "@/components/forms/MultiStepContactForm";
import { CLINIC_INFO } from "@/lib/constants";
import { Calendar, Clock, CheckCircle, Phone, Award } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: '/pedir-cita',
  },
  title: "Pedir Cita | Clínica Dental Vela-Segalà Viladecans",
  description:
    `Pide tu cita en nuestra clínica dental de Viladecans. Diagnóstico completo y plan de tratamiento personalizado. Llámanos al ${CLINIC_INFO.phoneDisplay} o rellena el formulario online.`,
  keywords: [
    "pedir cita dentista viladecans",
    "cita dentista viladecans",
    "cita online dentista viladecans",
    "reservar cita dental viladecans",
    "dentista viladecans cita previa",
  ],
  openGraph: {
    title: "Pedir Cita | Clínica Dental Vela-Segalà",
    description:
      `Pide tu cita en nuestra clínica dental de Viladecans. Diagnóstico completo y plan de tratamiento personalizado. Llámanos al ${CLINIC_INFO.phoneDisplay}.`,
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
            centered={true}
          />

          <div className="mt-8 text-center max-w-4xl mx-auto">
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
              ¿Qué Incluye tu Visita?
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
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Reserva tu Cita Online
                </h2>
                <p className="text-lg text-slate-600">
                  Rellena el formulario y nos pondremos en contacto contigo en menos de 24 horas para confirmar tu cita.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 flex-1">
                <MultiStepContactForm />
              </div>
            </div>

            {/* Sidebar - Información y Contacto */}
            <aside>
              <div className="sticky top-32 space-y-4">
                {/* Llamar Ahora */}
                <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-5 shadow-xl text-white">
                  <Phone className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold mb-2">
                    ¿Prefieres Llamar?
                  </h3>
                  <p className="text-gray-200 text-xs mb-3">
                    Llámanos y te atenderemos enseguida
                  </p>
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="block bg-white text-black text-center px-5 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-base mb-3"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>

                  {/* Horario */}
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-bold text-xs">Horario de Atención</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-300">
                      <p><span className="font-medium">Lunes a Jueves:</span><br />9:00 - 14:00 y 15:00 - 20:00</p>
                      <p><span className="font-medium">Viernes:</span><br />9:00 - 15:00</p>
                    </div>
                  </div>
                </div>

                {/* Qué Esperar */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 shadow-lg border border-blue-100">
                  <h3 className="text-base font-bold text-black mb-3">
                    ¿Qué Ocurre Después?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-black">Revisamos tu solicitud</p>
                        <p className="text-xs text-slate-600">En menos de 2 horas laborables</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-black">Te llamamos</p>
                        <p className="text-xs text-slate-600">Para confirmar fecha y hora</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-black">¡Listo!</p>
                        <p className="text-xs text-slate-600">Tu cita está confirmada</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primera Visita Incluye */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 shadow-lg border border-green-100">
                  <h3 className="text-base font-bold text-black mb-3">
                    Primera Visita Incluye
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700">Revisión completa bucodental</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700">Diagnóstico con tecnología 3D</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700">Plan de tratamiento personalizado</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700">Presupuesto sin compromiso</p>
                    </div>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Imagen de las Instalaciones */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
              Te Esperamos en Viladecans
            </h2>
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/cabina-dentista-viladecans.jpg"
                alt="Instalaciones Clínica Dental Vela-Segalà Viladecans"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-slate-700 mb-6">
                <strong>📍 {CLINIC_INFO.address.street}</strong><br />
                {CLINIC_INFO.address.postalCode} {CLINIC_INFO.address.city}, {CLINIC_INFO.address.region}
              </p>
              <a
                href="https://maps.app.goo.gl/UHo15sKZYEH34pe76"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              ¿Por Qué Elegirnos?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-5xl font-bold text-black mb-2">+15</div>
                <p className="text-slate-700 font-medium">Años de Experiencia</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">100%</div>
                <p className="text-slate-700 font-medium">Pacientes Satisfechos</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-black mb-2">24h</div>
                <p className="text-slate-700 font-medium">Respuesta Garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

