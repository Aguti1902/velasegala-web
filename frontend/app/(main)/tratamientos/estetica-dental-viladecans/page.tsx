import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Sparkles, CheckCircle, Clock, Shield, Award, Calendar, Users, Smile, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué tratamientos incluye la estética dental?",
    answer:
      "La estética dental incluye diversos tratamientos para mejorar la apariencia de tu sonrisa: carillas dentales de porcelana o composite, blanqueamiento dental profesional, reconstrucciones estéticas, diseño de sonrisa digital (DSD), coronas de zirconio, cierre de diastemas y remodelado estético. En nuestra clínica de Viladecans evaluamos tu caso y te proponemos el tratamiento más adecuado.",
  },
  {
    question: "¿Qué son las carillas dentales?",
    answer:
      "Las carillas dentales son láminas muy finas de porcelana o composite que se adhieren a la superficie frontal de los dientes para mejorar su forma, color, tamaño y alineación. Son el tratamiento estrella de la estética dental porque permiten transformar completamente tu sonrisa de forma mínimamente invasiva. En nuestra clínica de Viladecans utilizamos carillas de porcelana de máxima calidad.",
  },
  {
    question: "¿Cuánto duran las carillas dentales?",
    answer:
      "Las carillas de porcelana pueden durar entre 10 y 20 años con los cuidados adecuados. Las carillas de composite tienen una durabilidad menor, de 5 a 7 años. La longevidad depende de tu higiene oral, hábitos (evitar morder objetos duros) y revisiones periódicas en nuestra clínica de Viladecans. Las carillas de porcelana son más resistentes y mantienen mejor el color.",
  },
  {
    question: "¿Es doloroso ponerse carillas dentales?",
    answer:
      "No, el procedimiento de colocación de carillas dentales es prácticamente indoloro. En algunos casos es necesario tallar mínimamente el diente (0,5-0,7mm), lo que puede hacerse con anestesia local si es necesario. Las carillas de composite no requieren tallado. Después de la colocación no hay dolor ni molestias.",
  },
  {
    question: "¿Puedo elegir el color de mis carillas?",
    answer:
      "Sí, por supuesto. En la primera visita gratuita en nuestra clínica de Viladecans elegimos juntos el color, forma y tamaño de tus carillas dentales. Utilizamos guías de color y diseño de sonrisa digital (DSD) para que veas el resultado antes de empezar. Puedes optar por un blanco natural o un blanco más brillante según tus preferencias.",
  },
  {
    question: "¿Ofrecen financiación para tratamientos de estética dental?",
    answer:
      "Sí, ofrecemos financiación sin intereses hasta en 12 meses para tratamientos de estética dental. También disponemos de opciones de financiación a más largo plazo con cuotas muy cómodas. Te explicamos todas las opciones de pago en tu primera visita gratuita en Viladecans.",
  },
];

export const metadata: Metadata = {
  title: "Estética Dental en Viladecans | Carillas y Diseño de Sonrisa",
  description:
    "Estética dental en Viladecans. Carillas dentales de porcelana, diseño de sonrisa digital DSD y blanqueamiento. Especialistas con +15 años. Primera visita gratuita. Financiación sin intereses.",
  keywords: [
    "estética dental viladecans",
    "carillas dentales viladecans",
    "diseño de sonrisa viladecans",
    "carillas porcelana viladecans",
    "estética dental barcelona",
    "dentista estético viladecans",
  ],
  openGraph: {
    title: "Estética Dental en Viladecans | Carillas y Diseño de Sonrisa",
    description:
      "Transforma tu sonrisa con estética dental. Carillas de porcelana, diseño digital DSD. Especialistas con +15 años. Primera visita gratuita.",
    images: ["/images/estetica-dental-viladecans.jpg"],
  },
};

export default function EsteticaDentalPage() {
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
                name: "Estética Dental Viladecans",
                href: "/tratamientos/estetica-dental-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                ESTÉTICA DENTAL AVANZADA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Estética Dental en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Transforma tu sonrisa con <strong>estética dental avanzada en Viladecans</strong>. Los 
                doctores Xavier Vela y Maribel Segalà son <strong>especialistas en rehabilitaciones 
                estéticas complejas</strong> con más de 15 años de experiencia internacional.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Utilizamos <strong>diseño de sonrisa digital (DSD)</strong>, carillas de porcelana de 
                máxima calidad y técnicas mínimamente invasivas para resultados naturales y duraderos. 
                Mejora el color, forma, tamaño y alineación de tus dientes.
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
                  <div className="text-xs text-slate-500">Según tratamiento elegido</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Financiación sin intereses hasta 12 meses
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y diseño digital gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Carillas de porcelana premium
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Resultados naturales y duraderos
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
                src="/images/estetica-dental-viladecans.jpg"
                alt="Estética Dental en Viladecans - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tratamientos de Estética Dental en Viladecans
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> ofrecemos una amplia gama de tratamientos 
            de estética dental para mejorar tu sonrisa. Desde carillas dentales hasta diseño de sonrisa completo.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Carillas Dentales de Porcelana
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>carillas de porcelana</strong> son láminas ultrafinas (0,3-0,7mm) que se adhieren 
                a la superficie frontal de los dientes para corregir imperfecciones estéticas. Permiten cambiar 
                el color, forma, tamaño y alineación de tus dientes de forma mínimamente invasiva.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Utilizamos porcelana feldespática de máxima calidad que imita perfectamente la translucidez y 
                brillo del esmalte natural. Duración de 10-20 años con mantenimiento adecuado.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Smile className="w-6 h-6" />
                Diseño de Sonrisa Digital (DSD)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                El <strong>diseño de sonrisa digital (Digital Smile Design)</strong> es una tecnología que 
                permite planificar tu sonrisa ideal de forma virtual antes de realizar cualquier tratamiento. 
                Analizamos tu rostro, proporciones faciales y características dentales.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Te mostramos el resultado final en 3D para que apruebes el diseño antes de empezar. Así 
                garantizamos que el resultado cumple tus expectativas y es armónico con tu rostro.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Carillas de Composite
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>carillas de composite</strong> son una alternativa más económica y rápida a las 
                carillas de porcelana. Se realizan directamente en boca en una sola sesión mediante resinas 
                compuestas estéticas de alta calidad.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Ideales para correcciones estéticas menores: cerrar diastemas, alargar dientes desgastados, 
                cambiar la forma o mejorar el color. No requieren tallado dental. Duración de 5-7 años.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Coronas de Zirconio
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>coronas de zirconio</strong> son fundas cerámicas de alta resistencia que cubren 
                completamente el diente. Ideales para dientes muy dañados, endodonciados o con grandes 
                reconstrucciones que necesitan protección adicional.
              </p>
              <p className="text-slate-700 leading-relaxed">
                El zirconio es un material biocompatible, muy resistente y estético que imita perfectamente el 
                aspecto del diente natural. Sin metal, sin línea gris en la encía.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Reconstrucciones Estéticas
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Realizamos <strong>reconstrucciones estéticas con composite</strong> para reparar dientes 
                fracturados, con caries o desgastados. Utilizamos técnicas de estratificación para imitar las 
                diferentes capas del diente natural (dentina, esmalte, translucidez incisal).
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Remodelado Estético (Stripping)
              </h3>
              <p className="text-slate-700 leading-relaxed">
                El <strong>remodelado estético dental</strong> consiste en pulir y dar forma a los dientes para 
                mejorar su contorno, simetría y proporciones. Técnica mínimamente invasiva que se realiza en una 
                sola sesión. Ideal para dientes con forma irregular o asimétrica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Ventajas de la Estética Dental en Viladecans
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Smile className="w-10 h-10" />,
                title: "Sonrisa Natural y Armónica",
                description:
                  "Diseñamos tu sonrisa teniendo en cuenta las proporciones de tu rostro, tus facciones y tu personalidad. Resultados naturales que realzan tu belleza sin parecer artificial.",
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Mínimamente Invasivo",
                description:
                  "Las carillas de porcelana requieren un tallado mínimo (0,5-0,7mm) o incluso nulo. Preservamos al máximo tu estructura dental natural. Técnicas conservadoras y reversibles cuando es posible.",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Resultados Rápidos",
                description:
                  "En solo 2-4 semanas puedes tener tu sonrisa completamente transformada. Las carillas de composite se realizan en una sola sesión. Cambios visibles inmediatos.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Materiales Premium",
                description:
                  "Utilizamos porcelana feldespática de máxima calidad, composites estéticos de última generación y zirconio de alta resistencia. Materiales biocompatibles y duraderos.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Especialistas con +15 Años",
                description:
                  "Los doctores Vela y Segalà son especialistas en rehabilitaciones estéticas complejas con formación internacional. Miembros de sociedades científicas de estética dental.",
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Tecnología Digital 3D",
                description:
                  "Diseño de sonrisa digital (DSD), escáner intraoral 3D, fotografía digital y planificación virtual. Ves el resultado final antes de empezar el tratamiento.",
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
            Preguntas Frecuentes sobre Estética Dental
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre estética dental en Viladecans.
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
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Transformar tu Sonrisa?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans y te 
            haremos un diseño de sonrisa digital para que veas el resultado antes de empezar.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Especialistas en estética dental en Viladecans</strong> con más de 15 años de experiencia. 
            Financiación sin intereses disponible.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Financiación sin intereses • Diseño digital 3D
          </p>
        </div>
      </section>
    </>
  );
}

