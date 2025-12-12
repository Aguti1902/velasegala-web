import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MAIN_TREATMENTS } from "@/lib/constants";
import { ToothIcon } from "@/components/icons/ToothIcon";
import { SurgicalMaskIcon } from "@/components/icons/SurgicalMaskIcon";
import { 
  ArrowRight, 
  CheckCircle, 
  Smile, 
  Sparkles, 
  Sun,
  Baby,
  Activity,
  Zap,
  Package,
  Moon,
  Droplets,
  AlertTriangle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tratamientos Dentales en Viladecans | Clínica Vela-Segalà",
  description:
    "Todos los tratamientos dentales en Viladecans. Implantes dentales, ortodoncia invisible, estética dental, blanqueamiento, periodoncia, endodoncia y más. Primera visita gratuita.",
  keywords: [
    "tratamientos dentales viladecans",
    "dentista viladecans",
    "clínica dental viladecans",
    "implantes dentales viladecans",
    "ortodoncia viladecans",
    "estética dental viladecans",
  ],
  openGraph: {
    title: "Tratamientos Dentales en Viladecans | Clínica Vela-Segalà",
    description:
      "Todos los tratamientos dentales que necesitas. Especialistas con +15 años de experiencia. Primera visita gratuita.",
    images: ["/images/cabina-dentista-viladecans.jpg"],
  },
};

// Mapeo de iconos para cada tratamiento
const treatmentIcons: Record<string, React.ReactNode> = {
  "implantes-dentales-viladecans": <ToothIcon className="w-12 h-12" />,
  "ortodoncia-invisible-viladecans": <Smile className="w-12 h-12" />,
  "estetica-dental-viladecans": <Sparkles className="w-12 h-12" />,
  "blanqueamiento-dental-viladecans": <Sun className="w-12 h-12" />,
  "odontopediatria-viladecans": <Baby className="w-12 h-12" />,
  "periodoncia-viladecans": <Activity className="w-12 h-12" />,
  "endodoncia-viladecans": <Zap className="w-12 h-12" />,
  "protesis-dentales-viladecans": <Package className="w-12 h-12" />,
  "cirugia-oral-viladecans": <SurgicalMaskIcon className="w-12 h-12" />,
  "bruxismo-viladecans": <Moon className="w-12 h-12" />,
  "limpieza-dental-viladecans": <Droplets className="w-12 h-12" />,
  "urgencias-dentales-viladecans": <AlertTriangle className="w-12 h-12" />,
};

export default function TratamientosPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Tratamientos", href: "/tratamientos" },
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Tratamientos Dentales en Viladecans
            </h1>
            <p className="text-xl text-slate-700 mb-4 leading-relaxed">
              En la <strong>Clínica Dental Vela-Segalà en Viladecans</strong> ofrecemos todos los tratamientos 
              dentales que necesitas con tecnología de última generación y más de 15 años de experiencia.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Desde implantes dentales y ortodoncia invisible hasta estética dental y tratamientos preventivos. 
              <strong> Primera visita gratuita</strong> con diagnóstico completo y plan de tratamiento personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Tratamientos */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAIN_TREATMENTS.map((treatment) => (
              <Link
                key={treatment.slug}
                href={`/tratamientos/${treatment.slug}`}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
              >
                {/* Icono */}
                <div className="mb-4 p-4 bg-gray-100 rounded-2xl inline-block group-hover:bg-black group-hover:text-white transition-all">
                  {treatmentIcons[treatment.slug] || <ToothIcon className="w-12 h-12" />}
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                  {treatment.name}
                </h2>

                {/* Descripción */}
                <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {treatment.excerpt}
                </p>

                {/* Keywords principales */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {treatment.keywords.slice(0, 2).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-gray-100 text-slate-700 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-black font-bold group-hover:gap-4 transition-all">
                  Más información
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              ¿Por Qué Elegir Nuestra Clínica en Viladecans?
            </h2>
            <p className="text-lg text-slate-600">
              Somos tu clínica dental de confianza en Viladecans con la mejor tecnología y equipo profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "+15 Años de Experiencia",
                description: "Doctores Xavier Vela y Maribel Segalà con experiencia internacional y formación continua",
              },
              {
                title: "Tecnología Avanzada",
                description: "Escáner 3D, TAC dental, microscopio, cirugía piezoeléctrica y diseño digital de sonrisa",
              },
              {
                title: "Primera Visita Gratuita",
                description: "Diagnóstico completo y plan de tratamiento personalizado sin compromiso",
              },
              {
                title: "Financiación sin Intereses",
                description: "Hasta 12 meses sin intereses para todos los tratamientos dentales",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-black flex-shrink-0" />
                  <h3 className="font-bold text-lg text-black">{item.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Necesitas un Tratamiento Dental?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Te haremos un diagnóstico completo y te explicaremos el mejor tratamiento para tu caso.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            Más de 15 años cuidando de la salud bucodental de las familias de Viladecans. 
            Financiación sin intereses disponible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Pedir Cita Gratuita Ahora
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-2xl hover:bg-white hover:text-black transition-all"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

