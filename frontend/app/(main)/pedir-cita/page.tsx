import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
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
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 max-w-6xl mx-auto">
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
                <ContactForm />
              </div>
            </div>

            {/* Sidebar - Otras formas de contacto */}
            <aside className="space-y-6">
              {/* Llamar Ahora */}
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 shadow-xl text-white sticky top-32">
                <Phone className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-3">
                  ¿Prefieres Llamar?
                </h3>
                <p className="text-gray-200 mb-6">
                  Llámanos directamente y te atenderemos enseguida
                </p>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="block bg-white text-black text-center px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-xl"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>

                {/* Horario */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5" />
                    <span className="font-bold">Horario de Atención</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><span className="font-medium">Lunes a Jueves:</span><br />9:00 - 14:00 y 15:00 - 20:00</p>
                    <p><span className="font-medium">Viernes:</span><br />9:00 - 15:00</p>
                  </div>
                </div>
              </div>

              {/* Urgencias */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-red-700 mb-3">
                  <Calendar className="w-6 h-6" />
                  <h3 className="text-lg font-bold">¿Urgencia Dental?</h3>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Si tienes dolor intenso o una emergencia dental, llámanos inmediatamente.
                </p>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="block bg-red-600 text-white text-center px-4 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
                >
                  Llamar Urgencias
                </a>
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
                src="/images/instalaciones-vela-segala.webp"
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

