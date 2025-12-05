import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Droplets, CheckCircle, Clock, Shield, Award, Smile, Sparkles, Heart, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué diferencia hay entre limpieza dental y cepillado en casa?",
    answer:
      "El cepillado diario en casa elimina la placa bacteriana blanda de la superficie de los dientes. Sin embargo, aunque te cepilles correctamente, siempre queda placa en zonas de difícil acceso que se calcifica formando sarro (tártaro o cálculo dental). El sarro solo se puede eliminar con limpieza dental profesional en nuestra clínica de Viladecans mediante instrumentos especializados (ultrasonidos y curetas). Por eso es importante hacer limpiezas cada 6-12 meses.",
  },
  {
    question: "¿Con qué frecuencia debo hacer una limpieza dental?",
    answer:
      "Recomendamos hacer limpieza dental profesional cada 6-12 meses para personas con buena salud oral. Si tienes enfermedad periodontal (gingivitis o periodontitis), apiñamiento dental, ortodoncia o alto riesgo de caries, puede ser necesaria cada 3-6 meses. En nuestra clínica de Viladecans evaluamos tu caso y te recomendamos la frecuencia ideal según tus necesidades.",
  },
  {
    question: "¿Es dolorosa la limpieza dental?",
    answer:
      "No, la limpieza dental profesional no es dolorosa. Puede haber sensibilidad en algunas zonas con mucho sarro o encías sensibles, pero es tolerable. Si tienes sensibilidad dental severa, podemos aplicar anestesia tópica o local para tu comodidad. Después de la limpieza puede haber sensibilidad temporal durante 24-48 horas que desaparece sola.",
  },
  {
    question: "¿La limpieza dental daña el esmalte?",
    answer:
      "No, la limpieza dental profesional realizada correctamente en nuestra clínica de Viladecans no daña el esmalte. Utilizamos ultrasonidos que vibran para despegar el sarro sin desgastar el diente. Después pulimos los dientes con pasta profiláctica para dejarlos lisos y brillantes. El pulido elimina manchas superficiales sin afectar el esmalte. Es fundamental para la salud bucodental.",
  },
  {
    question: "¿Qué incluye una limpieza dental profesional?",
    answer:
      "Una limpieza dental profesional en Viladecans incluye: 1) Eliminación de sarro con ultrasonidos (tartrectomía). 2) Eliminación de sarro subgingival con curetas manuales. 3) Pulido dental con pasta profiláctica y copa de goma para eliminar manchas y dejar los dientes lisos. 4) Aplicación de flúor tópico para fortalecer el esmalte. 5) Instrucciones de higiene oral personalizada y recomendación de cepillos, pastas e hilo dental adecuados.",
  },
  {
    question: "¿Puedo hacer limpieza dental si tengo ortodoncia?",
    answer:
      "Sí, es especialmente importante hacer limpiezas dentales cada 3-6 meses si llevas ortodoncia con brackets, ya que acumulan más placa y sarro. En nuestra clínica de Viladecans realizamos limpiezas cuidadosas alrededor de los brackets sin dañarlos. También te enseñamos técnicas específicas de higiene para ortodoncia: cepillos interproximales, irrigador bucal, superfloss. Con Invisalign es más fácil porque te quitas los alineadores para cepillarte.",
  },
];

export const metadata: Metadata = {
  title: "Limpieza Dental Profesional en Viladecans | Higiene Bucodental",
  description:
    "Limpieza dental profesional en Viladecans. Higiene bucodental completa con ultrasonidos. Prevención de caries y enfermedades periodontales. Recomendable cada 6-12 meses.",
  keywords: [
    "limpieza dental viladecans",
    "limpieza dental profesional viladecans",
    "higiene dental viladecans",
    "limpieza bucal viladecans",
    "profilaxis dental viladecans",
  ],
  openGraph: {
    title: "Limpieza Dental Profesional en Viladecans | Higiene Bucodental",
    description:
      "Higiene bucodental completa con eliminación de sarro y placa. Prevención de caries y enfermedades. Limpieza dental cada 6-12 meses.",
    images: ["/images/tecnologia-clinica-dental-viladecans.jpg"],
  },
};

export default function LimpiezaDentalPage() {
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
                name: "Limpieza Dental Viladecans",
                href: "/tratamientos/limpieza-dental-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                HIGIENE BUCODENTAL PROFESIONAL
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Limpieza Dental en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                <strong>Limpieza dental profesional en Viladecans</strong>. Higiene bucodental completa con 
                eliminación de sarro, placa bacteriana y manchas superficiales. Profilaxis dental con ultrasonidos 
                y pulido.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Prevención de caries y enfermedades periodontales. Higienista dental titulado con más de 15 años 
                de experiencia. Recomendable cada 6-12 meses para mantener tu salud oral óptima.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración del tratamiento
                  </div>
                  <div className="text-3xl font-bold text-black">
                    30-45 min
                  </div>
                  <div className="text-xs text-slate-500">Limpieza completa</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Eliminación completa de sarro y placa
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Pulido dental y eliminación de manchas
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Aplicación de flúor tópico
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Instrucciones de higiene personalizada
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pedir-cita" className="btn-primary text-center">
                  Pedir Cita para Limpieza
                </Link>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="btn-secondary text-center"
                >
                  Llamar: {CLINIC_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-50 rounded-3xl overflow-hidden shadow-xl relative flex items-center justify-center">
              <Droplets className="w-32 h-32 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* En qué consiste */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿En Qué Consiste la Limpieza Dental Profesional?
          </h2>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            La <strong>limpieza dental profesional</strong> (también llamada profilaxis dental o tartrectomía) es 
            un procedimiento preventivo fundamental para mantener una óptima salud bucodental. Aunque te cepilles 
            correctamente en casa, siempre hay zonas de difícil acceso donde se acumula placa bacteriana que se 
            calcifica formando sarro.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> realizamos limpiezas dentales completas con 
            tecnología de ultrasonidos para eliminar todo el sarro supragingival (por encima de la encía) y 
            subgingival (por debajo de la encía), pulimos los dientes para dejarlos lisos y brillantes, y aplicamos 
            flúor tópico para fortalecer el esmalte.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Fases de la Limpieza Dental</h3>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Exploración Inicial",
                  description: "Revisamos el estado de tus dientes, encías y tejidos blandos. Detectamos caries, inflamación gingival o problemas periodontales.",
                },
                {
                  step: "2",
                  title: "Eliminación de Sarro con Ultrasonidos",
                  description: "Utilizamos un aparato de ultrasonidos que vibra a alta frecuencia para despegar el sarro adherido a los dientes sin dañar el esmalte. El ultrasonido también irriga agua para eliminar los restos.",
                },
                {
                  step: "3",
                  title: "Eliminación de Sarro Subgingival con Curetas",
                  description: "Con instrumentos manuales (curetas) eliminamos el sarro que está por debajo de la encía (zona subgingival) que el ultrasonido no puede alcanzar completamente.",
                },
                {
                  step: "4",
                  title: "Pulido Dental",
                  description: "Pulimos todos los dientes con pasta profiláctica y copa de goma rotatoria para eliminar manchas superficiales (café, té, tabaco) y dejar la superficie dental lisa y brillante. Esto dificulta la adhesión de nueva placa bacteriana.",
                },
                {
                  step: "5",
                  title: "Aplicación de Flúor Tópico",
                  description: "Aplicamos gel o barniz de flúor de alta concentración para remineralizar el esmalte, cerrar túbulos dentinarios (reduce sensibilidad) y prevenir caries.",
                },
                {
                  step: "6",
                  title: "Instrucciones de Higiene Oral",
                  description: "Te enseñamos técnicas correctas de cepillado, uso de hilo dental, cepillos interproximales e irrigador bucal. Recomendamos productos adecuados para tu caso.",
                },
              ].map((phase) => (
                <div key={phase.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    {phase.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black mb-2">{phase.title}</h4>
                    <p className="text-slate-600">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Beneficios de la Limpieza Dental Profesional
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Previene Caries",
                description:
                  "Elimina la placa bacteriana que produce ácidos que desmineralizan el esmalte causando caries. La prevención es más económica que los tratamientos.",
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Previene Enfermedades de Encías",
                description:
                  "Elimina el sarro que causa gingivitis y periodontitis. Las enfermedades periodontales son la principal causa de pérdida dental en adultos.",
              },
              {
                icon: <Smile className="w-10 h-10" />,
                title: "Elimina Mal Aliento",
                description:
                  "La acumulación de placa y sarro causa halitosis (mal aliento). La limpieza dental profesional elimina las bacterias responsables del mal olor.",
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Dientes Más Blancos y Brillantes",
                description:
                  "El pulido elimina manchas superficiales causadas por café, té, vino y tabaco. Tus dientes lucen más limpios, blancos y brillantes.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Detecta Problemas Temprano",
                description:
                  "Durante la limpieza revisamos tu boca y detectamos caries incipientes, problemas de encías o lesiones orales en fase inicial. Tratamiento más sencillo y económico.",
              },
              {
                icon: <Droplets className="w-10 h-10" />,
                title: "Mejora Salud General",
                description:
                  "Las enfermedades periodontales se relacionan con problemas cardiovasculares, diabetes y partos prematuros. Mantener encías sanas mejora tu salud general.",
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

      {/* Consejos de Higiene */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Consejos de Higiene Oral en Casa
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            La limpieza dental profesional cada 6-12 meses debe complementarse con una excelente higiene oral diaria 
            en casa. En nuestra clínica de Viladecans te enseñamos las técnicas correctas:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Cepillado Correcto",
                tips: [
                  "Cepíllate 3 veces al día durante 2-3 minutos",
                  "Usa cepillo de cerdas suaves o medio-suaves",
                  "Técnica de Bass: cepillo inclinado 45° hacia la encía con movimientos vibratorios cortos",
                  "No olvides cepillar lengua (elimina bacterias causantes de halitosis)",
                  "Cambia el cepillo cada 3 meses o cuando las cerdas estén desgastadas",
                ],
              },
              {
                title: "Hilo Dental Diario",
                tips: [
                  "Usa hilo dental al menos 1 vez al día (preferiblemente por la noche)",
                  "Pasa el hilo entre todos los dientes, incluso los de atrás",
                  "Abraza el diente con el hilo en forma de 'C' y deslízalo suavemente hacia la encía",
                  "Usa un trozo de hilo limpio para cada espacio interdental",
                  "Si tienes ortodoncia, usa superfloss o enhebrador",
                ],
              },
              {
                title: "Cepillos Interproximales",
                tips: [
                  "Ideales para espacios entre dientes, ortodoncia e implantes",
                  "Elige el tamaño adecuado según el espacio interdental",
                  "Introduce el cepillo interproximal sin forzar y muévelo hacia dentro y fuera varias veces",
                  "Usa después de cada comida o al menos 1 vez al día",
                  "Cambia cuando las cerdas estén desgastadas",
                ],
              },
              {
                title: "Irrigador Bucal / Waterpik",
                tips: [
                  "Complementa el cepillado y el hilo dental (no los sustituye)",
                  "Muy útil para ortodoncia, implantes, puentes y prótesis",
                  "Mejora la salud de las encías eliminando restos de alimentos",
                  "Usa después del cepillado con agua tibia o enjuague bucal diluido",
                  "Regula la presión: empieza con presión baja y ve aumentando gradualmente",
                ],
              },
            ].map((section, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-black">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Limpieza Dental
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre limpieza dental en Viladecans.
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
            Mantén tu Sonrisa Sana con Limpiezas Regulares
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>cita para limpieza dental</strong> en nuestra clínica de Viladecans. 
            Prevención de caries y enfermedades periodontales. Higienista dental titulado.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Limpieza dental profesional en Viladecans</strong>. Tratamiento completo en 30-45 minutos. 
            Recomendable cada 6-12 meses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Pedir Cita para Limpieza
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Higienista dental titulado • Prevención y salud oral
          </p>
        </div>
      </section>
    </>
  );
}

