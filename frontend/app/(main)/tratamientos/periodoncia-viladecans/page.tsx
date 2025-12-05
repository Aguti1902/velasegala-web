import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Activity, CheckCircle, Clock, Shield, Award, Heart, AlertTriangle, Smile, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué es la periodoncia?",
    answer:
      "La periodoncia es la especialidad dental que se encarga de prevenir, diagnosticar y tratar las enfermedades de las encías y el hueso que soporta los dientes (periodonto). Las enfermedades periodontales más comunes son la gingivitis (inflamación de encías) y la periodontitis o piorrea (pérdida de hueso). En nuestra clínica de Viladecans somos especialistas en periodoncia.",
  },
  {
    question: "¿Cuáles son los síntomas de enfermedad periodontal?",
    answer:
      "Los síntomas más comunes son: encías rojas, inflamadas o que sangran al cepillarse, mal aliento persistente, retracción de encías (dientes más largos), movilidad dental, sensibilidad dental, espacios entre los dientes, pus entre encías y dientes. Si tienes alguno de estos síntomas, pide cita en nuestra clínica de Viladecans para una evaluación periodontal completa.",
  },
  {
    question: "¿Qué diferencia hay entre gingivitis y periodontitis?",
    answer:
      "La gingivitis es la inflamación reversible de las encías causada por acumulación de placa bacteriana. Se trata con limpieza profesional y mejora de la higiene oral. La periodontitis (piorrea) es más grave: hay pérdida irreversible de hueso y ligamento periodontal. Requiere tratamiento con raspado y alisado radicular (curetaje) y mantenimiento periodontal de por vida.",
  },
  {
    question: "¿Es doloroso el tratamiento periodontal?",
    answer:
      "No, realizamos el tratamiento periodontal con anestesia local efectiva, por lo que no sentirás dolor durante el procedimiento. Después puede haber sensibilidad dental durante unos días que se controla con analgésicos comunes. El raspado y alisado radicular (curetaje) es un tratamiento mínimamente invasivo que se realiza por cuadrantes en varias sesiones.",
  },
  {
    question: "¿Se puede curar la periodontitis?",
    answer:
      "La periodontitis se puede controlar y estabilizar, pero el hueso perdido no se regenera de forma natural. Con tratamiento periodontal adecuado (curetaje, cirugía si es necesario) y mantenimiento cada 3-6 meses en nuestra clínica de Viladecans, podemos detener la progresión de la enfermedad y mantener tus dientes sanos durante muchos años. En casos avanzados podemos realizar regeneración ósea guiada.",
  },
  {
    question: "¿Con qué frecuencia debo hacer mantenimiento periodontal?",
    answer:
      "Los pacientes con enfermedad periodontal tratada deben acudir cada 3-6 meses para mantenimiento periodontal en nuestra clínica de Viladecans. En estas sesiones realizamos limpieza profunda de las bolsas periodontales, eliminamos placa y sarro subgingival, y controlamos que la enfermedad no progrese. El mantenimiento es fundamental para el éxito a largo plazo.",
  },
];

export const metadata: Metadata = {
  title: "Periodoncia en Viladecans | Tratamiento de Encías y Piorrea",
  description:
    "Periodoncia en Viladecans. Tratamiento de encías, gingivitis, periodontitis y piorrea. Especialistas en enfermedades periodontales. Primera visita gratuita. Clínica Vela-Segalà.",
  keywords: [
    "periodoncia viladecans",
    "tratamiento encías viladecans",
    "gingivitis viladecans",
    "periodontitis viladecans",
    "piorrea viladecans",
    "periodoncista viladecans",
  ],
  openGraph: {
    title: "Periodoncia en Viladecans | Tratamiento de Encías y Piorrea",
    description:
      "Tratamiento especializado de encías y enfermedades periodontales. Salva tus dientes con periodoncia. Primera visita gratuita.",
    images: ["/images/pariodoncia-viladecans.jpg"],
  },
};

export default function PeriodonciaPage() {
  return (
    <>
      <FAQSchema faqs={TREATMENT_FAQS} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Tratamientos", href: "/tratamientos" },
              {
                name: "Periodoncia Viladecans",
                href: "/tratamientos/periodoncia-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                PERIODONCIA ESPECIALIZADA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Periodoncia en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Tratamiento especializado de <strong>encías y enfermedades periodontales en Viladecans</strong>. 
                Nuestro equipo de periodoncistas tiene amplia experiencia en el tratamiento de gingivitis, 
                periodontitis (piorrea) y regeneración de tejidos periodontales.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>Salva tus dientes</strong> con tratamientos de periodoncia avanzada: raspado y alisado 
                radicular (curetaje), cirugía periodontal mínimamente invasiva, regeneración ósea guiada y 
                mantenimiento periodontal personalizado.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración del tratamiento
                  </div>
                  <div className="text-3xl font-bold text-black">
                    Variable
                  </div>
                  <div className="text-xs text-slate-500">Según gravedad del caso</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y diagnóstico gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Periodoncista especializado
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Tratamiento sin dolor
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Mantenimiento periodontal
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pedir-cita" className="btn-primary text-center">
                  Pedir Cita Gratuita
                </Link>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="btn-secondary text-center"
                >
                  Llamar: {CLINIC_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/pariodoncia-viladecans.jpg"
                alt="Periodoncia en Viladecans - Tratamiento de Encías - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enfermedades Periodontales */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Enfermedades Periodontales: Gingivitis y Periodontitis
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Las <strong>enfermedades periodontales</strong> son infecciones bacterianas que afectan a las encías 
            y el hueso que soporta los dientes. Son la principal causa de pérdida dental en adultos. En nuestra 
            clínica de Viladecans realizamos diagnóstico precoz y tratamiento especializado.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                Gingivitis (Fase Inicial)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                La <strong>gingivitis</strong> es la inflamación reversible de las encías causada por acumulación 
                de placa bacteriana. Síntomas: encías rojas, inflamadas y que sangran al cepillarse. No hay pérdida 
                de hueso ni movilidad dental.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Limpieza dental profesional (tartrectomía), mejora de la higiene oral 
                y revisiones cada 6 meses. La gingivitis es completamente reversible si se trata a tiempo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Periodontitis o Piorrea (Fase Avanzada)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                La <strong>periodontitis</strong> (también llamada piorrea) es la fase avanzada de la enfermedad 
                periodontal. Hay pérdida irreversible de hueso y ligamento periodontal, formación de bolsas 
                periodontales profundas, retracción de encías, movilidad dental y riesgo de pérdida de dientes.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Raspado y alisado radicular (curetaje) para eliminar placa y sarro 
                subgingival, cirugía periodontal si es necesario, regeneración ósea guiada en casos avanzados y 
                mantenimiento periodontal cada 3-6 meses de por vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tratamientos de Periodoncia en Viladecans
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Raspado y Alisado Radicular (Curetaje)</h3>
              <p className="text-slate-700 leading-relaxed">
                El <strong>curetaje dental</strong> es el tratamiento básico de la periodontitis. Consiste en 
                eliminar la placa bacteriana y el sarro acumulado por debajo de la encía (subgingival) mediante 
                instrumentos específicos (curetas). Se realiza con anestesia local por cuadrantes en varias sesiones. 
                Permite que la encía vuelva a adherirse al diente y las bolsas periodontales se reduzcan.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Cirugía Periodontal</h3>
              <p className="text-slate-700 leading-relaxed">
                En casos de periodontitis avanzada con bolsas muy profundas (>6mm), puede ser necesaria 
                <strong> cirugía periodontal</strong> para acceder a las zonas más profundas y eliminar el tejido 
                infectado. Realizamos colgajos periodontales mínimamente invasivos con sutura reabsorbible. 
                Permite limpiar a fondo las raíces y remodelar el hueso.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Regeneración Ósea Guiada</h3>
              <p className="text-slate-700 leading-relaxed">
                La <strong>regeneración ósea guiada (ROG)</strong> permite recuperar parte del hueso perdido por 
                periodontitis mediante biomateriales (injertos de hueso sintético, xenoinjertos) y membranas 
                reabsorbibles. Técnica avanzada que mejora el pronóstico de los dientes con pérdida ósea severa.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Mantenimiento Periodontal</h3>
              <p className="text-slate-700 leading-relaxed">
                El <strong>mantenimiento periodontal</strong> es fundamental tras el tratamiento activo. Consiste 
                en limpiezas profesionales cada 3-6 meses en nuestra clínica de Viladecans para eliminar placa y 
                sarro subgingival, controlar las bolsas periodontales y prevenir recidivas. Es un tratamiento de 
                por vida que permite mantener los dientes sanos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Factores de Riesgo */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Factores de Riesgo de Enfermedad Periodontal
          </h2>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Algunos factores aumentan el riesgo de desarrollar enfermedades periodontales:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Tabaco",
                description: "El tabaco es el principal factor de riesgo. Los fumadores tienen 3 veces más riesgo de periodontitis y peor respuesta al tratamiento.",
              },
              {
                title: "Diabetes",
                description: "Los diabéticos tienen mayor riesgo de infecciones periodontales. A su vez, la periodontitis dificulta el control de la glucemia.",
              },
              {
                title: "Genética",
                description: "Existe predisposición genética a la periodontitis. Si tus padres han perdido dientes, tienes más riesgo.",
              },
              {
                title: "Estrés",
                description: "El estrés crónico debilita el sistema inmune y aumenta el riesgo de enfermedades periodontales.",
              },
              {
                title: "Embarazo",
                description: "Los cambios hormonales durante el embarazo pueden causar gingivitis gestacional. Es importante el control periodontal.",
              },
              {
                title: "Mala Higiene Oral",
                description: "La acumulación de placa bacteriana por higiene deficiente es la causa principal de gingivitis y periodontitis.",
              },
            ].map((factor, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-2">{factor.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Periodoncia
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre periodoncia en Viladecans.
          </p>
          <div className="space-y-4">
            {TREATMENT_FAQS.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-xl p-6 group cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              >
                <summary className="font-bold text-lg text-black list-none flex items-center justify-between">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container-custom text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Salva tus Dientes con Periodoncia
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Evaluación periodontal completa con sondaje y radiografías digitales.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Periodoncista especializado en Viladecans</strong>. Tratamiento de encías, gingivitis y 
            periodontitis. Mantenimiento periodontal personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Pedir Cita Gratuita Ahora
            </Link>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-2xl hover:bg-white hover:text-black transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              {CLINIC_INFO.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            <MapPin className="w-4 h-4 inline mr-1" />
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • Periodoncista especializado
          </p>
        </div>
      </section>
    </>
  );
}

