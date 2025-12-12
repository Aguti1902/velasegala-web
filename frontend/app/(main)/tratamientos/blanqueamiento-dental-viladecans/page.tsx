import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Sparkles, CheckCircle, Clock, Shield, Award, Smile, Sun, ChevronRight, Phone, MapPin, Star } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿En qué consiste el blanqueamiento dental profesional?",
    answer:
      "El blanqueamiento dental profesional en nuestra clínica de Viladecans utiliza gel blanqueador de peróxido de hidrógeno o peróxido de carbamida en concentraciones controladas. Se aplica sobre los dientes y se activa con lámparas LED de última generación. El proceso dura 45-60 minutos y consigues dientes varios tonos más blancos en una sola sesión. También ofrecemos blanqueamiento ambulatorio con férulas personalizadas para usar en casa.",
  },
  {
    question: "¿Cuánto dura el resultado del blanqueamiento?",
    answer:
      "Los resultados del blanqueamiento dental profesional pueden durar entre 1-3 años dependiendo de tus hábitos. Si fumas, consumes mucho café, té, vino tinto o alimentos con colorantes, la duración será menor. Con buena higiene oral y evitando sustancias que manchan los dientes, los resultados se mantienen más tiempo. En nuestra clínica de Viladecans te damos consejos para prolongar el blanqueamiento.",
  },
  {
    question: "¿El blanqueamiento dental es seguro?",
    answer:
      "Sí, el blanqueamiento dental profesional realizado en nuestra clínica de Viladecans es totalmente seguro. Utilizamos productos certificados y concentraciones controladas que no dañan el esmalte dental. Antes del tratamiento evaluamos el estado de tus dientes y encías para asegurarnos de que eres candidato. El blanqueamiento casero de farmacia o remedios caseros pueden dañar el esmalte y las encías.",
  },
  {
    question: "¿El blanqueamiento causa sensibilidad dental?",
    answer:
      "Puede haber sensibilidad dental temporal durante 24-48 horas después del blanqueamiento, pero desaparece rápidamente. En nuestra clínica de Viladecans aplicamos gel desensibilizante con flúor y potasio tras el blanqueamiento para minimizar las molestias. Si tienes sensibilidad previa severa, podemos hacer blanqueamiento ambulatorio con férulas en casa a concentraciones menores.",
  },
  {
    question: "¿Qué manchas se pueden blanquear?",
    answer:
      "El blanqueamiento dental funciona muy bien para manchas causadas por edad, café, té, vino, tabaco y alimentos. Manchas intrínsecas por tetraciclinas o fluorosis también mejoran, aunque pueden necesitar más sesiones. Manchas por amalgamas o restauraciones dentales no se blanquean (las restauraciones se pueden reemplazar después). En Viladecans evaluamos tu caso en la primera visita gratuita.",
  },
  {
    question: "¿A qué edad se puede hacer blanqueamiento dental?",
    answer:
      "Recomendamos hacer blanqueamiento dental a partir de los 18 años, cuando el esmalte dental está completamente formado. No se recomienda en embarazadas ni en período de lactancia. Tampoco en personas con caries activas, enfermedad periodontal severa o sensibilidad dental extrema hasta resolver estos problemas. En nuestra clínica de Viladecans evaluamos si eres candidato.",
  },
];

export const metadata: Metadata = {
  title: "Blanqueamiento Dental en Viladecans | Sonrisa Más Blanca",
  description:
    "Blanqueamiento dental profesional en Viladecans. Tratamiento en clínica con lámparas LED. Resultados inmediatos y duraderos. Primera visita gratuita. Dientes más blancos y brillantes.",
  keywords: [
    "blanqueamiento dental viladecans",
    "blanqueamiento dental profesional viladecans",
    "blanquear dientes viladecans",
    "dientes blancos viladecans",
  ],
  openGraph: {
    title: "Blanqueamiento Dental en Viladecans | Sonrisa Más Blanca",
    description:
      "Consigue una sonrisa más blanca y brillante. Blanqueamiento dental profesional con resultados inmediatos. Primera visita gratuita.",
    images: ["/images/estetica-dental-viladecans.jpg"],
  },
};

export default function BlanqueamientoDentalPage() {
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
                name: "Blanqueamiento Dental Viladecans",
                href: "/tratamientos/blanqueamiento-dental-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                BLANQUEAMIENTO DENTAL PROFESIONAL
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Blanqueamiento Dental en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Consigue una sonrisa más blanca y brillante con <strong>blanqueamiento dental profesional en 
                Viladecans</strong>. Tratamiento en clínica con lámparas LED de última generación para resultados 
                inmediatos y duraderos.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Seguro y efectivo. Elimina manchas y decoloración dental causada por café, té, vino, tabaco y 
                envejecimiento. También ofrecemos <strong>blanqueamiento ambulatorio</strong> con férulas 
                personalizadas para casa.
              </p>
              
              <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-5 shadow-xl mb-6 text-white">
                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-tight">1 sesión</div>
                      <div className="text-[10px] text-gray-300 mt-0.5">45-60 minutos</div>
                    </div>
                    <div className="h-10 w-px bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-tight">100%</div>
                      <div className="text-[10px] text-gray-300 mt-0.5">seguro</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight"><strong>Primera visita y valoración gratuita</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Resultados inmediatos en una sesión</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Tratamiento seguro y sin dolor</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Dientes varios tonos más blancos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Tecnología LED de última generación</span>
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
                src="/images/higiene-bucal-viladecans-3.jpg"
                alt="Blanqueamiento Dental en Viladecans - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Blanqueamiento */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tipos de Blanqueamiento Dental en Viladecans
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> ofrecemos dos tipos de blanqueamiento dental 
            profesional adaptados a tus necesidades.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Sun className="w-6 h-6" />
                Blanqueamiento en Clínica (LED/Fotoactivación)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                El <strong>blanqueamiento dental en clínica</strong> es el más rápido y efectivo. Aplicamos gel 
                blanqueador de peróxido de hidrógeno al 25-35% sobre tus dientes y lo activamos con lámparas LED 
                de última generación. El proceso se repite en 3-4 ciclos de 15 minutos cada uno.
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>Ventajas:</strong> Resultados inmediatos en una sola sesión (45-60 minutos), dientes varios 
                tonos más blancos, supervisión profesional, aplicación de desensibilizante.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Ideal para:</strong> Personas que quieren resultados rápidos, eventos especiales (bodas, 
                celebraciones), manchas moderadas-severas por café, té, vino o tabaco.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Smile className="w-6 h-6" />
                Blanqueamiento Ambulatorio (Férulas en Casa)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                El <strong>blanqueamiento ambulatorio</strong> se realiza en casa con férulas transparentes 
                personalizadas fabricadas a medida en nuestra clínica de Viladecans. Aplicas el gel blanqueador 
                de peróxido de carbamida al 10-16% en las férulas y las llevas puestas durante la noche o varias 
                horas al día.
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>Ventajas:</strong> Más económico, menor sensibilidad dental, tratamiento gradual, control 
                del resultado, férulas reutilizables para mantenimiento.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Ideal para:</strong> Personas con sensibilidad dental, que prefieren tratamiento gradual, 
                manchas leves-moderadas, mantenimiento del blanqueamiento en clínica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Proceso del Blanqueamiento Dental en Clínica
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Te explicamos paso a paso cómo realizamos el blanqueamiento dental en nuestra clínica de Viladecans.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Evaluación y Limpieza Previa",
                description:
                  "Evaluamos el color actual de tus dientes con la guía de color Vita. Comprobamos que no tengas caries, enfermedad periodontal ni sensibilidad severa. Realizamos una limpieza dental profesional previa para eliminar sarro y placa, ya que el blanqueamiento funciona mejor sobre dientes limpios.",
              },
              {
                step: "2",
                title: "Protección de Encías",
                description:
                  "Aplicamos una resina protectora fotopolimerizable sobre las encías para aislarlas y evitar que el gel blanqueador las irrite. También protegemos los labios y la lengua. Esto es fundamental para tu comodidad y seguridad durante el tratamiento.",
              },
              {
                step: "3",
                title: "Aplicación del Gel Blanqueador",
                description:
                  "Aplicamos el gel blanqueador de peróxido de hidrógeno al 25-35% sobre la superficie frontal de tus dientes (de canino a canino, superiores e inferiores). El gel actúa penetrando en el esmalte y dentina para descomponer las moléculas de pigmento responsables de las manchas.",
              },
              {
                step: "4",
                title: "Fotoactivación con Lámpara LED",
                description:
                  "Activamos el gel blanqueador con una lámpara LED de última generación durante 15 minutos. La luz acelera la reacción química del blanqueamiento. Repetimos este proceso en 3-4 ciclos retirando el gel usado y aplicando gel fresco cada vez. Total: 45-60 minutos.",
              },
              {
                step: "5",
                title: "Aplicación de Desensibilizante",
                description:
                  "Al finalizar, retiramos todo el gel blanqueador y la protección de encías. Aplicamos un gel desensibilizante con flúor, potasio y calcio para remineralizar el esmalte y prevenir sensibilidad post-blanqueamiento. Te damos instrucciones de cuidados posteriores.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="flex gap-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-2xl">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuidados Post-Blanqueamiento */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Cuidados Después del Blanqueamiento Dental
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Para mantener los resultados del blanqueamiento dental en Viladecans el máximo tiempo posible, 
            sigue estas recomendaciones:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-4 text-green-800">✓ Recomendado</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Mantén excelente higiene oral: cepillado 3 veces al día y hilo dental</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Usa pasta dental blanqueadora con flúor para mantenimiento</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Bebe con pajita bebidas que manchan (café, té, vino)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Enjuaga la boca con agua después de comer alimentos con colorantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span>Acude a limpiezas dentales profesionales cada 6 meses</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold mb-4 text-red-800">✗ Evitar (primeras 48h)</h3>
              <ul className="space-y-2 text-slate-700">
                <li>❌ Café, té, vino tinto, refrescos de cola</li>
                <li>❌ Tabaco (manchador principal)</li>
                <li>❌ Alimentos con colorantes intensos: remolacha, curry, salsa de soja, ketchup, mostaza</li>
                <li>❌ Frutas rojas: arándanos, moras, cerezas</li>
                <li>❌ Zumos de frutas oscuros</li>
                <li>❌ Chocolate oscuro</li>
                <li>❌ Vinagre balsámico</li>
              </ul>
              <p className="text-sm text-slate-600 mt-4">
                Durante 48 horas después del blanqueamiento, los dientes son más susceptibles a mancharse. Evita 
                estos alimentos o bebidas en este período crítico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Blanqueamiento Dental
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre blanqueamiento dental en Viladecans.
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
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Consigue una Sonrisa Más Blanca y Brillante
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Evaluación completa y presupuesto personalizado sin compromiso.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Blanqueamiento dental profesional en Viladecans</strong>. Resultados inmediatos en una sesión. 
            Tratamiento seguro y efectivo.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • Resultados inmediatos
          </p>
        </div>
      </section>
    </>
  );
}

