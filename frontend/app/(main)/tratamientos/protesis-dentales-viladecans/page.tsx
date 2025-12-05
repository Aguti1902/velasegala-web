import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Package, CheckCircle, Clock, Shield, Award, Smile, Users, Heart, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué tipos de prótesis dentales existen?",
    answer:
      "Existen tres tipos principales de prótesis dentales: 1) Prótesis fijas sobre implantes o dientes naturales (coronas, puentes, prótesis completas fijas). 2) Prótesis removibles (dentaduras parciales o completas que se pueden quitar). 3) Prótesis híbridas que combinan partes fijas y removibles. En nuestra clínica de Viladecans evaluamos tu caso y te recomendamos la mejor opción.",
  },
  {
    question: "¿Qué es mejor: prótesis fija o removible?",
    answer:
      "Las prótesis fijas sobre implantes son la mejor opción porque ofrecen mayor estabilidad, comodidad, estética y funcionalidad. No se mueven al comer o hablar, no necesitan adhesivos y se sienten como dientes naturales. Las prótesis removibles son más económicas pero menos cómodas. En nuestra clínica de Viladecans te explicamos las ventajas e inconvenientes de cada tipo según tu caso.",
  },
  {
    question: "¿Cuánto duran las prótesis dentales?",
    answer:
      "Las prótesis fijas sobre implantes (coronas, puentes) de zirconio o porcelana pueden durar 15-20 años o más con mantenimiento adecuado. Las prótesis removibles tienen una durabilidad de 5-7 años, ya que el hueso y la encía van cambiando con el tiempo y hay que reajustarlas o reemplazarlas. El cuidado diario y las revisiones en nuestra clínica de Viladecans son fundamentales.",
  },
  {
    question: "¿Las prótesis dentales son visibles o naturales?",
    answer:
      "Las prótesis dentales modernas de zirconio o porcelana son extremadamente estéticas y naturales. Imitamos el color, forma, translucidez y textura de tus dientes naturales. Nadie notará que llevas prótesis. En nuestra clínica de Viladecans utilizamos materiales de máxima calidad y trabajamos con laboratorios especializados para resultados óptimos.",
  },
  {
    question: "¿Puedo comer con normalidad con una prótesis dental?",
    answer:
      "Con prótesis fijas sobre implantes puedes comer absolutamente todo con normalidad, igual que con dientes naturales. Con prótesis removibles completas hay algunas limitaciones (alimentos muy duros, pegajosos) pero puedes llevar una dieta variada. Es importante hacer un período de adaptación progresiva. En nuestra clínica de Viladecans te damos consejos personalizados.",
  },
  {
    question: "¿Necesito reemplazar mis dientes perdidos?",
    answer:
      "Sí, es muy importante reemplazar los dientes perdidos. Cuando falta un diente, los dientes vecinos se desplazan, el hueso se reabsorbe, cambia la mordida, aumenta la carga en los dientes restantes y puede haber problemas en la articulación temporomandibular (ATM). Las prótesis dentales en Viladecans restauran la función masticatoria, estética y salud bucodental.",
  },
];

export const metadata: Metadata = {
  title: "Prótesis Dentales en Viladecans | Fijas y Removibles",
  description:
    "Prótesis dentales en Viladecans. Prótesis fijas sobre implantes, prótesis removibles y coronas de zirconio. Recupera funcionalidad y estética. Primera visita gratuita.",
  keywords: [
    "prótesis dentales viladecans",
    "prótesis sobre implantes viladecans",
    "dentadura postiza viladecans",
    "coronas dentales viladecans",
    "puentes dentales viladecans",
  ],
  openGraph: {
    title: "Prótesis Dentales en Viladecans | Fijas y Removibles",
    description:
      "Recupera funcionalidad y estética con prótesis dentales. Prótesis fijas sobre implantes y removibles. Primera visita gratuita.",
    images: ["/images/implantes-dentales-protesis-viladecans.jpg"],
  },
};

export default function ProtesisDentalesPage() {
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
                name: "Prótesis Dentales Viladecans",
                href: "/tratamientos/protesis-dentales-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                PRÓTESIS DENTALES PERSONALIZADAS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Prótesis Dentales en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Recupera funcionalidad y estética con <strong>prótesis dentales en Viladecans</strong>. 
                Especialistas en prótesis fijas sobre implantes, prótesis removibles y coronas de zirconio. 
                Más de 15 años de experiencia en rehabilitaciones complejas.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Soluciones personalizadas para reemplazar uno o varios dientes perdidos con resultados 
                naturales y duraderos. <strong>Laboratorio colaborador especializado</strong> para mayor 
                control de calidad.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración del tratamiento
                  </div>
                  <div className="text-3xl font-bold text-black">
                    2-4 semanas
                  </div>
                  <div className="text-xs text-slate-500">Según tipo de prótesis</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y presupuesto gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Prótesis de zirconio y porcelana premium
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Resultados naturales y estéticos
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Financiación sin intereses disponible
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
                src="/images/implantes-dentales-protesis-viladecans.jpg"
                alt="Prótesis Dentales en Viladecans - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Prótesis */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tipos de Prótesis Dentales en Viladecans
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> ofrecemos todo tipo de prótesis dentales 
            para reemplazar dientes perdidos y restaurar tu sonrisa, función masticatoria y estética facial.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Prótesis Fijas sobre Implantes
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>prótesis fijas sobre implantes</strong> son la mejor solución para reemplazar dientes 
                perdidos. Se atornillan o cementan sobre implantes dentales de titanio integrados en el hueso. No 
                se mueven, no necesitan adhesivos y funcionan exactamente igual que los dientes naturales.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tipos:</strong> Coronas unitarias sobre implante, puentes fijos sobre múltiples implantes, 
                prótesis completas fijas tipo All-on-4 o All-on-6 (arcada completa sobre 4-6 implantes). Fabricadas 
                en zirconio o porcelana de máxima calidad.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Coronas Dentales de Zirconio
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>coronas de zirconio</strong> son fundas cerámicas que cubren completamente un diente 
                muy dañado, endodonciado o con grandes reconstrucciones. El zirconio es un material biocompatible, 
                muy resistente y altamente estético.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Sin metal, sin línea gris en la encía, translucidez natural. Ideales para dientes posteriores (muelas) 
                y anteriores. Duración superior a 15 años con mantenimiento adecuado.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Smile className="w-6 h-6" />
                Puentes Dentales Fijos
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Los <strong>puentes dentales</strong> reemplazan uno o varios dientes perdidos apoyándose en los 
                dientes vecinos o en implantes dentales. El puente se cementa de forma fija y no se puede quitar.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Puente tradicional:</strong> se apoya en dientes naturales tallados. <strong>Puente sobre 
                implantes:</strong> se apoya en implantes dentales (mejor opción, no hay que tallar dientes sanos). 
                Fabricados en zirconio o porcelana.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Prótesis Removibles (Dentaduras)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>prótesis removibles</strong> son dentaduras que se pueden quitar para limpiarlas. 
                <strong> Prótesis completas:</strong> reemplazan todos los dientes de una arcada (dentadura completa). 
                <strong> Prótesis parciales:</strong> reemplazan varios dientes (con ganchos metálicos o estéticos).
              </p>
              <p className="text-slate-700 leading-relaxed">
                Más económicas que las prótesis fijas pero menos cómodas. Requieren adhesivos, tienen menor retención 
                y pueden moverse al comer o hablar. Recomendable reemplazarlas cada 5-7 años.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Prótesis Híbridas (Sobredentaduras)
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Las <strong>sobredentaduras</strong> son prótesis removibles que se retienen sobre implantes dentales 
                mediante sistemas de anclaje (bolas, locator, barras). Mucho más estables que las dentaduras 
                convencionales. Se pueden quitar para limpiarlas pero están muy retenidas durante el uso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Ventajas de las Prótesis Dentales en Viladecans
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Smile className="w-10 h-10" />,
                title: "Recupera tu Sonrisa",
                description:
                  "Las prótesis dentales restauran la estética de tu sonrisa. Materiales de porcelana y zirconio que imitan perfectamente el aspecto de los dientes naturales.",
              },
              {
                icon: <Package className="w-10 h-10" />,
                title: "Mejora la Masticación",
                description:
                  "Recupera la capacidad de masticar correctamente y disfruta de una dieta variada. Las prótesis sobre implantes permiten comer con total normalidad.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Habla con Claridad",
                description:
                  "Los dientes son importantes para la pronunciación. Las prótesis dentales mejoran la fonética y permiten hablar con claridad y seguridad.",
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Previene Problemas",
                description:
                  "Reemplazar dientes perdidos previene el desplazamiento de dientes vecinos, pérdida ósea, cambios en la mordida y problemas en la ATM.",
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Mejora la Autoestima",
                description:
                  "Una sonrisa completa y estética mejora significativamente la confianza y autoestima. Vuelve a sonreír sin complejos.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Resultados Duraderos",
                description:
                  "Las prótesis de zirconio y porcelana sobre implantes pueden durar 15-20 años o más con cuidados adecuados y revisiones periódicas.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="mb-4 p-3 bg-gray-50 rounded-xl inline-block">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg text-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Prótesis Dentales
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre prótesis dentales en Viladecans.
          </p>
          <div className="space-y-4">
            {TREATMENT_FAQS.map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 rounded-xl p-6 group cursor-pointer shadow-md hover:shadow-lg transition-shadow"
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
          <Package className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recupera tu Sonrisa con Prótesis Dentales
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Evaluación completa y presupuesto detallado sin compromiso.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Especialistas en prótesis dentales en Viladecans</strong>. Prótesis fijas sobre implantes 
            y removibles. Financiación sin intereses disponible.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • Financiación disponible
          </p>
        </div>
      </section>
    </>
  );
}

