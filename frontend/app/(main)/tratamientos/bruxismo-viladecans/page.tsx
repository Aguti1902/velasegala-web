import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Moon, CheckCircle, Clock, Shield, Award, Heart, AlertTriangle, Smile, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué es el bruxismo?",
    answer:
      "El bruxismo es el hábito involuntario de apretar o rechinar los dientes, generalmente durante el sueño (bruxismo nocturno) aunque también puede ocurrir durante el día (bruxismo diurno). Causa desgaste dental, dolor en la mandíbula, dolores de cabeza y puede dañar seriamente tus dientes. En nuestra clínica de Viladecans diagnosticamos el bruxismo y fabricamos férulas de descarga personalizadas.",
  },
  {
    question: "¿Cuáles son los síntomas del bruxismo?",
    answer:
      "Los síntomas más comunes son: desgaste de los dientes, dientes fracturados o astillados, dolor en la mandíbula o ATM, dolores de cabeza frecuentes (especialmente al despertar), dolor de oído, tensión en músculos faciales y cuello, sensibilidad dental, dificultad para abrir la boca. Si tienes estos síntomas, pide cita en nuestra clínica de Viladecans para una evaluación.",
  },
  {
    question: "¿Qué es una férula de descarga?",
    answer:
      "La férula de descarga (también llamada férula oclusal o férula de Michigan) es un dispositivo de plástico rígido que se coloca sobre los dientes (generalmente superiores) durante el sueño. Protege los dientes del desgaste, relaja los músculos masticatorios, reduce la presión sobre la ATM y alivia los síntomas del bruxismo. En nuestra clínica de Viladecans las fabricamos a medida con ajuste perfecto.",
  },
  {
    question: "¿Es cómoda la férula de descarga?",
    answer:
      "Sí, las férulas de descarga fabricadas a medida en nuestra clínica de Viladecans son muy cómodas. Durante los primeros 3-5 días hay un período de adaptación, pero rápidamente te acostumbras. La férula se ajusta perfectamente a tus dientes y no se mueve durante la noche. Es mucho mejor que las férulas prefabricadas de farmacia que no se ajustan bien.",
  },
  {
    question: "¿Cuánto dura una férula de descarga?",
    answer:
      "Una férula de descarga de calidad fabricada con materiales rígidos puede durar 2-5 años con cuidados adecuados. Si el bruxismo es muy severo, puede desgastarse antes y necesitar reemplazo. Es importante traer la férula a las revisiones en nuestra clínica de Viladecans para que comprobemos su estado y hagamos ajustes si es necesario.",
  },
  {
    question: "¿El bruxismo tiene cura?",
    answer:
      "El bruxismo no tiene una cura definitiva, ya que suele estar relacionado con el estrés, ansiedad y factores psicológicos. Sin embargo, se puede controlar eficazmente con férula de descarga, técnicas de relajación, fisioterapia, reducción del estrés y en algunos casos medicación. La férula protege tus dientes del daño mientras trabajas en reducir los factores desencadenantes.",
  },
];

export const metadata: Metadata = {
  title: "Tratamiento del Bruxismo en Viladecans | Férula de Descarga",
  description:
    "Tratamiento del bruxismo en Viladecans. Férulas de descarga personalizadas a medida. Protege tus dientes del desgaste. Alivia el dolor de mandíbula. Primera visita gratuita.",
  keywords: [
    "bruxismo viladecans",
    "férula descarga viladecans",
    "apretar dientes viladecans",
    "rechinar dientes viladecans",
    "tratamiento bruxismo viladecans",
  ],
  openGraph: {
    title: "Tratamiento del Bruxismo en Viladecans | Férula de Descarga",
    description:
      "Protege tus dientes del bruxismo con férulas de descarga personalizadas. Alivia el dolor y el desgaste dental. Primera visita gratuita.",
    images: ["/images/bruxismo-viladecans.jpg"],
  },
};

export default function BruxismoPage() {
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
                name: "Bruxismo Viladecans",
                href: "/tratamientos/bruxismo-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                TRATAMIENTO DEL BRUXISMO
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Tratamiento del Bruxismo en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Protege tus dientes del <strong>bruxismo con férulas de descarga personalizadas en Viladecans</strong>. 
                Fabricadas a medida con materiales de alta calidad para proteger tus dientes del desgaste por 
                apretar o rechinar.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Solución para <strong>dolor de mandíbula, dolores de cabeza y desgaste dental</strong> causado 
                por bruxismo. Ajuste perfecto y cómodo para uso nocturno. Más de 15 años fabricando férulas de 
                descarga en Viladecans.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Tiempo de fabricación
                  </div>
                  <div className="text-3xl font-bold text-black">
                    1 semana
                  </div>
                  <div className="text-xs text-slate-500">Férula personalizada a medida</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y diagnóstico gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Férula de descarga a medida
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Materiales de alta calidad
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Ajuste perfecto y cómodo
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
                src="/images/bruxismo-viladecans.jpg"
                alt="Tratamiento del Bruxismo en Viladecans - Férula de Descarga - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qué es el Bruxismo */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿Qué es el Bruxismo y Por Qué Ocurre?
          </h2>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            El <strong>bruxismo</strong> es el hábito involuntario de apretar o rechinar los dientes. Afecta a 
            aproximadamente el 20% de la población adulta y puede causar serios daños en los dientes, músculos 
            masticatorios y articulación temporomandibular (ATM).
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Existen dos tipos principales: <strong>bruxismo nocturno</strong> (durante el sueño) y <strong>bruxismo 
            diurno</strong> (durante el día). El bruxismo nocturno es más común y más difícil de controlar porque 
            ocurre de forma inconsciente mientras duermes.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
            <h3 className="text-2xl font-bold mb-4">Causas del Bruxismo</h3>
            <div className="space-y-3">
              {[
                {
                  title: "Estrés y Ansiedad",
                  description: "La causa principal del bruxismo es el estrés emocional, ansiedad, tensión y presión psicológica."
                },
                {
                  title: "Maloclusión Dental",
                  description: "Mordida incorrecta, dientes mal alineados o restauraciones dentales mal ajustadas pueden desencadenar bruxismo."
                },
                {
                  title: "Trastornos del Sueño",
                  description: "Apnea del sueño, ronquidos y otros trastornos del sueño están asociados con el bruxismo nocturno."
                },
                {
                  title: "Factores Genéticos",
                  description: "Existe predisposición familiar al bruxismo. Si tus padres lo tienen, tienes más probabilidades de padecerlo."
                },
                {
                  title: "Sustancias Estimulantes",
                  description: "Consumo de cafeína, tabaco, alcohol y ciertos medicamentos pueden aumentar el bruxismo."
                },
              ].map((cause, index) => (
                <div key={index} className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-black">{cause.title}</div>
                    <div className="text-slate-600 text-sm">{cause.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consecuencias */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Consecuencias del Bruxismo No Tratado
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Si no tratas el bruxismo, puede causar daños graves e irreversibles en tus dientes y articulación 
            temporomandibular. Es importante diagnosticarlo a tiempo en nuestra clínica de Viladecans.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: "Desgaste Dental Severo",
                description: "El esmalte se desgasta hasta la dentina, causando sensibilidad, caries y fracturas dentales. Pérdida de altura de los dientes.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Fracturas Dentales",
                description: "Los dientes se pueden fracturar, astillar o romper completamente debido a la presión excesiva. Necesidad de coronas o implantes.",
              },
              {
                icon: <Moon className="w-8 h-8" />,
                title: "Dolor de Mandíbula y ATM",
                description: "Dolor en la articulación temporomandibular, chasquidos al abrir la boca, dificultad para abrir o cerrar, bloqueo mandibular.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Dolores de Cabeza",
                description: "Cefaleas tensionales frecuentes, especialmente al despertar. Dolor que irradia a sienes, frente y nuca.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Hipertrofia Maseteros",
                description: "Los músculos masticatorios (maseteros) se hipertrofian, dando aspecto cuadrado a la cara. Tensión muscular crónica.",
              },
              {
                icon: <Smile className="w-8 h-8" />,
                title: "Sensibilidad Dental",
                description: "Al desgastarse el esmalte, la dentina queda expuesta causando sensibilidad al frío, calor y dulce.",
              },
            ].map((consequence, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-4 p-3 bg-gray-50 rounded-xl inline-block">
                  {consequence.icon}
                </div>
                <h3 className="font-bold text-lg text-black mb-3">
                  {consequence.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{consequence.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tratamiento */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tratamiento del Bruxismo: Férula de Descarga
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            El tratamiento principal del bruxismo es la <strong>férula de descarga</strong> (también llamada férula 
            oclusal, férula de Michigan o férula de relajación). Es un dispositivo personalizado que protege tus 
            dientes del desgaste y relaja los músculos masticatorios.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">¿Cómo Funciona la Férula de Descarga?</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                La férula de descarga se coloca sobre los dientes (generalmente superiores) durante la noche. 
                Actúa como barrera protectora entre los dientes superiores e inferiores, absorbiendo y 
                distribuyendo las fuerzas del bruxismo.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Al llevar la férula, los músculos masticatorios se relajan porque la mandíbula queda en una 
                posición más adelantada y menos tensa. Esto reduce el dolor de mandíbula, dolores de cabeza y 
                la tensión muscular.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Fabricación de la Férula en Viladecans</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                En nuestra clínica de Viladecans fabricamos férulas de descarga <strong>personalizadas a medida</strong>:
              </p>
              <ol className="space-y-2 list-decimal list-inside text-slate-700">
                <li>Tomamos impresiones digitales con escáner 3D o impresiones convencionales de tus dientes.</li>
                <li>Enviamos las impresiones al laboratorio especializado donde fabrican tu férula personalizada.</li>
                <li>La férula se fabrica con resinas acrílicas rígidas de alta calidad y ajuste perfecto.</li>
                <li>Te citamos para entregarte la férula, probarla y hacer los ajustes necesarios en tu oclusión.</li>
                <li>Te explicamos cómo usarla, limpiarla y conservarla correctamente.</li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Cuidados de la Férula de Descarga</h3>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>Lava la férula con agua fría y jabón neutro cada mañana después de usarla.</li>
                <li>Cepíllala suavemente con un cepillo de dientes para eliminar restos de saliva y placa.</li>
                <li>Guárdala en su estuche rígido durante el día en un lugar fresco y seco.</li>
                <li>No la expongas a agua caliente ni la dejes al sol (se puede deformar).</li>
                <li>Trae la férula a las revisiones cada 6 meses en nuestra clínica de Viladecans para ajustes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Bruxismo
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre bruxismo y férulas de descarga en Viladecans.
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
          <Moon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Protege tus Dientes del Bruxismo
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Evaluación completa y fabricación de férula de descarga personalizada.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Especialistas en tratamiento del bruxismo en Viladecans</strong>. Férulas de descarga a medida 
            con ajuste perfecto. Alivia el dolor y protege tus dientes.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • Férulas personalizadas
          </p>
        </div>
      </section>
    </>
  );
}

