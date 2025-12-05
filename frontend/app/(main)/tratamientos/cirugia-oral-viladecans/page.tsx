import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Scissors, CheckCircle, Clock, Shield, Award, AlertTriangle, Heart, Smile, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Cuándo es necesario extraer las muelas del juicio?",
    answer:
      "Las muelas del juicio (terceros molares) deben extraerse cuando están impactadas (no tienen espacio para erupcionar), están parcialmente erupcionadas (pericoronaritis recurrente), causan apiñamiento dental, están en mala posición, tienen caries o quistes, o causan dolor recurrente. En nuestra clínica de Viladecans hacemos un TAC dental 3D para planificar la extracción de forma segura y predecible.",
  },
  {
    question: "¿Es dolorosa la extracción de muelas del juicio?",
    answer:
      "No, la extracción de muelas del juicio se realiza con anestesia local efectiva, por lo que no sentirás dolor durante la cirugía. Puede haber molestias, inflamación y leve dolor durante 3-5 días después que se controlan perfectamente con analgésicos y antiinflamatorios. En nuestra clínica de Viladecans utilizamos cirugía mínimamente invasiva para reducir las molestias postoperatorias.",
  },
  {
    question: "¿Qué es un injerto de hueso dental?",
    answer:
      "El injerto de hueso dental es un procedimiento para aumentar el volumen óseo en zonas donde se ha perdido hueso (por periodontitis, extracción dental, traumatismo). Se coloca hueso sintético, xenoinjerto (de origen bovino o porcino) o hueso autólogo (del propio paciente) en la zona deficitaria. Es necesario antes de colocar implantes dentales cuando no hay suficiente hueso.",
  },
  {
    question: "¿Qué es la elevación de seno maxilar?",
    answer:
      "La elevación de seno maxilar es una técnica de cirugía oral para aumentar el hueso en la zona posterior del maxilar superior (donde están las muelas) cuando hay poco hueso debido a la presencia del seno maxilar. Se levanta la membrana del seno y se rellena con biomaterial óseo. Permite colocar implantes dentales en zonas donde parecía imposible. En Viladecans somos especialistas en esta técnica.",
  },
  {
    question: "¿Qué es una frenectomía?",
    answer:
      "La frenectomía es la eliminación o reposicionamiento del frenillo labial (entre encía y labio) o lingual (debajo de la lengua). Se realiza cuando el frenillo es demasiado corto o grueso y causa diastema (separación) entre los incisivos centrales, retracción de encías, dificultades con el habla o problemas de lactancia en bebés. Se hace con láser o bisturí en una sesión rápida.",
  },
  {
    question: "¿Cuánto tiempo de reposo necesito después de una cirugía oral?",
    answer:
      "Depende del tipo de cirugía. Para extracciones simples: 24-48 horas de reposo relativo. Para muelas del juicio o cirugías más complejas: 3-5 días de reposo. Para injertos de hueso o elevación de seno: 5-7 días. Recomendamos no hacer deporte intenso, no fumar, no beber alcohol y seguir una dieta blanda durante el período de recuperación. En Viladecans te damos instrucciones detalladas postoperatorias.",
  },
];

export const metadata: Metadata = {
  title: "Cirugía Oral en Viladecans | Muelas del Juicio e Injertos",
  description:
    "Cirugía oral y maxilofacial en Viladecans. Extracción de muelas del juicio, injertos de hueso, elevación de seno maxilar y frenectomías. Cirugía mínimamente invasiva. Primera visita gratuita.",
  keywords: [
    "cirugía oral viladecans",
    "extracción muelas juicio viladecans",
    "cirugía maxilofacial viladecans",
    "injerto hueso dental viladecans",
    "elevación seno maxilar viladecans",
  ],
  openGraph: {
    title: "Cirugía Oral en Viladecans | Muelas del Juicio e Injertos",
    description:
      "Cirugía oral especializada. Extracción de muelas del juicio, injertos de hueso y elevación de seno. Cirugía mínimamente invasiva. Primera visita gratuita.",
    images: ["/images/tecnologia-clinica-dental-viladecans.jpg"],
  },
};

export default function CirugiaOralPage() {
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
                name: "Cirugía Oral Viladecans",
                href: "/tratamientos/cirugia-oral-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                CIRUGÍA ORAL ESPECIALIZADA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Cirugía Oral en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                <strong>Cirugía oral y maxilofacial en Viladecans</strong>. Extracción de muelas del juicio, 
                apicectomías, frenectomías, injertos de hueso y elevación de seno maxilar. Cirujano maxilofacial 
                especializado con más de 15 años de experiencia.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Cirugía mínimamente invasiva con tecnología piezoeléctrica. Regeneración ósea guiada para casos 
                complejos. TAC dental 3D para planificación precisa de cada cirugía.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración de la cirugía
                  </div>
                  <div className="text-3xl font-bold text-black">
                    Variable
                  </div>
                  <div className="text-xs text-slate-500">Según complejidad del caso</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y diagnóstico gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Cirujano maxilofacial especializado
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    TAC dental 3D para planificación
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Cirugía mínimamente invasiva
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

            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative flex items-center justify-center">
              <Scissors className="w-32 h-32 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Cirugía */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tipos de Cirugía Oral en Viladecans
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> realizamos todo tipo de cirugías orales y 
            maxilofaciales con tecnología avanzada y técnicas mínimamente invasivas.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Scissors className="w-6 h-6" />
                Extracción de Muelas del Juicio
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                La <strong>extracción de cordales o muelas del juicio</strong> es una de las cirugías orales más 
                frecuentes. Las muelas del juicio suelen erupcionar entre los 17-15 años y muchas veces no tienen 
                espacio suficiente, quedando impactadas o en mala posición.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Realizamos extracción simple (muela erupcionada) o extracción quirúrgica (muela impactada o 
                incluida). Utilizamos cirugía piezoeléctrica para cortes óseos precisos sin dañar tejidos blandos. 
                TAC dental 3D para localizar nervios y estructuras importantes. Menor inflamación y recuperación 
                más rápida.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Injertos de Hueso Dental
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Los <strong>injertos de hueso</strong> permiten regenerar el hueso perdido para colocar implantes 
                dentales en casos donde no hay suficiente volumen óseo. Utilizamos biomateriales de última 
                generación: hueso sintético (hidroxiapatita), xenoinjertos (Bio-Oss) o hueso autólogo.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Regeneración ósea guiada (ROG):</strong> Colocamos el biomaterial en la zona deficitaria 
                y lo cubrimos con membrana reabsorbible para proteger el injerto. En 4-6 meses el hueso se regenera 
                y podemos colocar implantes dentales con éxito.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Elevación de Seno Maxilar
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                La <strong>elevación de seno maxilar</strong> (sinus lift) es una técnica quirúrgica para aumentar 
                el hueso en la zona posterior del maxilar superior (donde están las muelas). Cuando se pierden los 
                molares superiores, el seno maxilar se expande y queda poco hueso para implantes.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Técnicas:</strong> Elevación lateral (para injertos grandes) o elevación crestal (para 
                injertos pequeños). Levantamos la membrana del seno maxilar y rellenamos con biomaterial óseo. 
                En 6-8 meses tendrás el hueso necesario para colocar implantes dentales. Tasa de éxito superior 
                al 95%.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Smile className="w-6 h-6" />
                Apicectomía
              </h3>
              <p className="text-slate-700 leading-relaxed">
                La <strong>apicectomía</strong> es la eliminación quirúrgica del ápice (punta) de la raíz de un 
                diente con infección persistente que no se ha resuelto con endodoncia convencional. Se accede al 
                ápice a través de la encía y el hueso, se elimina la infección y se sella la raíz. Permite salvar 
                el diente evitando la extracción.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Frenectomía
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                La <strong>frenectomía</strong> es la eliminación o reposicionamiento del frenillo labial o lingual. 
                <strong> Frenillo labial superior:</strong> Cuando es muy grueso causa diastema (separación) entre 
                los incisivos centrales. <strong> Frenillo lingual:</strong> Cuando es muy corto (anquiloglosia) 
                causa problemas con el habla y lactancia en bebés.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Cirugía rápida (15-20 minutos) con láser o bisturí. Sin puntos o con puntos reabsorbibles. 
                Recuperación rápida. En niños mejora la ortodoncia y el habla.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas Cirugía Piezoeléctrica */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ventajas de la Cirugía Piezoeléctrica
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra clínica de Viladecans utilizamos <strong>cirugía piezoeléctrica</strong> (ultrasónica) para 
            cortes óseos en cirugías orales. Esta tecnología proporciona numerosas ventajas frente a la cirugía 
            convencional con fresas.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Cortes Precisos y Selectivos",
                description: "El bisturí piezoeléctrico solo corta tejido duro (hueso) sin dañar tejidos blandos (nervios, vasos sanguíneos, membrana sinusal). Mayor seguridad.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Menor Trauma y Sangrado",
                description: "Produce menos traumatismo en los tejidos, menos sangrado intraoperatorio y postoperatorio. Cirugía más limpia y cómoda.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Recuperación Más Rápida",
                description: "Al ser menos traumática, la recuperación es más rápida con menos inflamación, menos dolor y menos molestias postoperatorias.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Mejor Cicatrización Ósea",
                description: "El corte piezoeléctrico respeta la viabilidad del hueso, favoreciendo una mejor y más rápida cicatrización ósea tras la cirugía.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
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

      {/* Cuidados Postoperatorios */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Cuidados Después de una Cirugía Oral
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Para una recuperación óptima después de una cirugía oral en Viladecans, sigue estas recomendaciones:
          </p>

          <div className="space-y-4">
            {[
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: "Primeras 24 horas",
                recommendations: [
                  "Morder una gasa durante 30-60 minutos para que se forme el coágulo",
                  "Aplicar hielo local cada hora (20 minutos con hielo, 20 sin hielo)",
                  "No enjuagar la boca ni escupir con fuerza",
                  "No fumar ni beber alcohol",
                  "Dieta líquida-fría: batidos, helados, yogur, purés",
                ],
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Días 2-7",
                recommendations: [
                  "Continuar con dieta blanda: pescado, huevos, pasta, arroz",
                  "Enjuagues suaves con clorhexidina 3 veces al día (tras comidas)",
                  "Cepillado dental suave evitando la zona operada",
                  "Tomar analgésicos y antibióticos según prescripción",
                  "Dormir con la cabeza elevada (2 almohadas)",
                ],
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Evitar",
                recommendations: [
                  "Ejercicio físico intenso durante 7 días",
                  "Bebidas con pajita (crean succión y pueden desprender el coágulo)",
                  "Alimentos duros, crujientes o que requieran mucha masticación",
                  "Tabaco (retrasa la cicatrización y aumenta el riesgo de infección)",
                  "Exposición solar directa y calor intenso",
                ],
              },
            ].map((section, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span>{rec}</span>
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
            Preguntas Frecuentes sobre Cirugía Oral
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre cirugía oral en Viladecans.
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
          <Scissors className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Necesitas Cirugía Oral?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Evaluación completa con TAC dental 3D y plan quirúrgico personalizado.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Cirujano maxilofacial especializado en Viladecans</strong>. Cirugía mínimamente invasiva 
            con tecnología piezoeléctrica. Más de 15 años de experiencia.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • TAC dental 3D
          </p>
        </div>
      </section>
    </>
  );
}

