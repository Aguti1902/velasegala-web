import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { CLINIC_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto - Clínica Dental Vela-Segalà Viladecans",
  description:
    `Contacta con nuestra clínica dental en Viladecans. ${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.city}. Teléfono: ${CLINIC_INFO.phoneDisplay}. Email: ${CLINIC_INFO.email}. Primera visita gratuita.`,
  keywords: [
    "contacto clínica dental viladecans",
    "dentista viladecans contacto",
    "cita dentista viladecans",
    "clínica dental viladecans dirección",
    "teléfono dentista viladecans",
  ],
  openGraph: {
    title: "Contacto - Clínica Dental Vela-Segalà Viladecans",
    description:
      `Contacta con nuestra clínica dental en Viladecans. ${CLINIC_INFO.address.street}. Teléfono: ${CLINIC_INFO.phoneDisplay}. Primera visita gratuita.`,
    images: ["/images/instalaciones-vela-segala.webp"],
  },
};

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Contacto", href: "/contacto" },
            ]}
          />

          <div className="mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Contacto
            </h1>
            <p className="text-xl text-slate-700 mb-8 max-w-3xl">
              Estamos aquí para ayudarte. Contacta con nuestra <strong>clínica dental en Viladecans</strong> por 
              teléfono, email o rellena el formulario y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      {/* Información de Contacto e Imagen */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Imagen de la Recepción */}
            <div className="order-2 lg:order-1 flex flex-col h-full">
              <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative min-h-[500px]">
                <Image
                  src="/images/instalaciones-vela-segala.webp"
                  alt="Recepción Clínica Dental Vela-Segalà Viladecans"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Dirección */}
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Nuestra Ubicación
                </h2>
                <p className="text-lg text-slate-700 mb-2 font-medium">
                  {CLINIC_INFO.address.street}
                </p>
                <p className="text-lg text-slate-700">
                  {CLINIC_INFO.address.postalCode} {CLINIC_INFO.address.city}, {CLINIC_INFO.address.region}
                </p>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="order-1 lg:order-2 space-y-6 flex flex-col">
              {/* Teléfono */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Teléfono</h3>
                    <a 
                      href={`tel:${CLINIC_INFO.phone}`}
                      className="text-2xl font-bold text-black hover:text-gray-700 transition-colors"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                    <p className="text-sm text-slate-600 mt-2">
                      Llámanos para pedir cita o resolver tus dudas
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Email</h3>
                    <a 
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="text-xl font-bold text-black hover:text-gray-700 transition-colors break-all"
                    >
                      {CLINIC_INFO.email}
                    </a>
                    <p className="text-sm text-slate-600 mt-2">
                      Escríbenos y te responderemos en menos de 24h
                    </p>
                  </div>
                </div>
              </div>

              {/* Horario */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-black rounded-xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-3">Horario</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Lunes a Jueves:</span>
                        <span className="text-slate-900 font-bold">9:00 - 14:00 y 15:00 - 20:00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium">Viernes:</span>
                        <span className="text-slate-900 font-bold">9:00 - 15:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Pedir Cita */}
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 shadow-xl text-white">
                <Calendar className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Primera Visita Gratuita</h3>
                <p className="text-gray-200 mb-6">
                  Reserva tu cita sin compromiso. Diagnóstico completo y plan de tratamiento personalizado.
                </p>
                <Link
                  href="/pedir-cita"
                  className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Pedir Cita Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Envíanos un Mensaje
            </h2>
            <p className="text-lg text-slate-600">
              Rellena el formulario y nos pondremos en contacto contigo lo antes posible
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Cómo Llegar a Nuestra Clínica
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.1234567890123!2d2.013021315674367!3d41.31429967927362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4990c1234567%3A0xabcdef1234567890!2sCarrer%20de%20la%20Mare%20de%20D%C3%A9u%20de%20Sales%2C%2067%2C%2008840%20Viladecans%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1638888888888!5m2!1ses!2ses"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Clínica Dental Vela-Segalà Viladecans"
            ></iframe>
          </div>
          
          <div className="mt-8 text-center">
            <a
              href="https://maps.app.goo.gl/UHo15sKZYEH34pe76"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <MapPin className="w-5 h-5" />
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>

    </>
  );
}

