import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Smile, CheckCircle, Clock, Shield, Award, Calendar, Users, Eye, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué es la ortodoncia invisible Invisalign?",
    answer:
      "Invisalign es un sistema de ortodoncia invisible que utiliza alineadores transparentes hechos a medida para mover tus dientes gradualmente hasta la posición deseada. Son prácticamente invisibles, removibles y mucho más cómodos que los brackets tradicionales. En nuestra clínica de Viladecans somos especialistas certificados Invisalign.",
  },
  {
    question: "¿Cuánto dura el tratamiento de ortodoncia invisible?",
    answer:
      "La duración del tratamiento con ortodoncia invisible varía según cada caso, pero generalmente oscila entre 12 y 18 meses. Casos más simples pueden resolverse en 6-8 meses, mientras que casos complejos pueden requerir hasta 24 meses. En la primera visita gratuita te daremos un plan de tratamiento detallado con la duración estimada.",
  },
  {
    question: "¿Es dolorosa la ortodoncia invisible?",
    answer:
      "No, la ortodoncia invisible es mucho menos molesta que los brackets tradicionales. Puedes sentir una ligera presión los primeros días al cambiar de alineador, pero es totalmente normal y desaparece rápidamente. No hay alambres ni brackets que puedan causar llagas o rozaduras en la boca.",
  },
  {
    question: "¿Puedo comer con los alineadores puestos?",
    answer:
      "No, debes quitarte los alineadores para comer y beber (excepto agua). Esta es una gran ventaja porque puedes comer lo que quieras sin restricciones, a diferencia de los brackets. Después de comer, simplemente cepillas tus dientes y vuelves a colocarte los alineadores. Debes llevarlos puestos 22 horas al día.",
  },
  {
    question: "¿Ofrece financiación para ortodoncia invisible?",
    answer:
      "Sí, ofrecemos financiación sin intereses hasta en 12 meses para tratamientos de ortodoncia invisible. También disponemos de opciones de financiación a más largo plazo con cuotas muy cómodas. Te explicamos todas las opciones de pago en tu primera visita gratuita en Viladecans.",
  },
  {
    question: "¿Invisalign funciona para todos los casos?",
    answer:
      "Invisalign ha evolucionado mucho y actualmente puede tratar la mayoría de casos de maloclusión: apiñamiento, diastemas, sobremordida, mordida cruzada, etc. En casos muy complejos podemos combinar Invisalign con otros tratamientos. En tu primera visita evaluaremos si eres candidato para ortodoncia invisible.",
  },
];

export const metadata: Metadata = {
  title: "Ortodoncia Invisible Invisalign en Viladecans | Vela-Segalà",
  description:
    "Ortodoncia invisible Invisalign en Viladecans. Especialistas certificados con +15 años de experiencia. Alineadores transparentes y removibles. Primera visita gratuita. Financiación sin intereses.",
  keywords: [
    "ortodoncia invisible viladecans",
    "invisalign viladecans",
    "ortodoncia adultos viladecans",
    "alineadores transparentes viladecans",
    "ortodoncia sin brackets viladecans",
    "invisalign certificado viladecans",
  ],
  openGraph: {
    title: "Ortodoncia Invisible Invisalign en Viladecans | Vela-Segalà",
    description:
      "Alinea tus dientes de forma discreta con ortodoncia invisible Invisalign. Especialistas certificados con +15 años. Primera visita gratuita.",
    images: ["/images/ortodoncia-invisalign-viladecans.jpg"],
  },
};

export default function OrtodonciaInvisiblePage() {
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
                name: "Ortodoncia Invisible Viladecans",
                href: "/tratamientos/ortodoncia-invisible-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                ORTODONCIA INVISIBLE INVISALIGN
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Ortodoncia Invisible en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Alinea tus dientes de forma discreta con{" "}
                <strong>ortodoncia invisible Invisalign en Viladecans</strong>. Los doctores Xavier Vela 
                y Maribel Segalà son <strong>ortodoncistas especializados certificados Invisalign</strong> con 
                más de 15 años de experiencia en ortodoncia para adultos y adolescentes.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Corrige apiñamiento, diastemas, sobremordida y mordida cruzada con <strong>alineadores 
                transparentes removibles</strong> prácticamente invisibles. Resultados visibles desde el 
                primer mes sin brackets metálicos ni alambres.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración del tratamiento
                  </div>
                  <div className="text-3xl font-bold text-black">
                    12-18 meses
                  </div>
                  <div className="text-xs text-slate-500">Según complejidad del caso</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Financiación sin intereses hasta 12 meses
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y estudio 3D gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Ortodoncistas certificados Invisalign
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Prácticamente invisible y removible
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
                src="/images/ortodoncia-invisalign-viladecans.jpg"
                alt="Ortodoncia Invisible Invisalign en Viladecans - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qué es Invisalign */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿Qué es la Ortodoncia Invisible Invisalign?
          </h2>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            <strong>Invisalign</strong> es el sistema de ortodoncia invisible líder mundial que utiliza 
            alineadores transparentes hechos a medida con tecnología 3D para mover tus dientes gradualmente 
            hasta la posición deseada. A diferencia de los brackets tradicionales, los alineadores Invisalign 
            son prácticamente invisibles, removibles y mucho más cómodos.
          </p>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> somos <strong>especialistas certificados 
            Invisalign</strong> con formación internacional. Utilizamos escáner intraoral 3D para diseñar tu 
            tratamiento de forma digital y mostrarte el resultado final antes de empezar.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Cada 1-2 semanas cambias a un nuevo juego de alineadores que van moviendo tus dientes de forma 
            progresiva y controlada. Puedes quitártelos para comer, beber y cepillarte los dientes, lo que 
            facilita enormemente la higiene oral durante el tratamiento.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Casos que Tratamos con Ortodoncia Invisible</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Apiñamiento Dental
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dientes montados o torcidos por falta de espacio en la arcada.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Diastemas (Espacios)
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Separaciones o huecos entre los dientes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Sobremordida
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Los dientes superiores cubren excesivamente los inferiores.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Mordida Cruzada
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Algunos dientes superiores muerden por dentro de los inferiores.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Prognatismo
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  La mandíbula inferior sobresale respecto al maxilar superior.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Mordida Abierta
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Los dientes superiores e inferiores no contactan al cerrar la boca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Ventajas de la Ortodoncia Invisible en Viladecans
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Descubre por qué cada vez más pacientes en Viladecans eligen ortodoncia invisible Invisalign 
            frente a los brackets tradicionales.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye className="w-10 h-10" />,
                title: "Prácticamente Invisible",
                description:
                  "Los alineadores son transparentes y apenas se notan. Nadie sabrá que llevas ortodoncia a menos que se lo digas. Perfecto para adultos y adolescentes.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Removible y Cómodo",
                description:
                  "Puedes quitarte los alineadores para comer, beber, cepillarte los dientes o en eventos especiales. Sin restricciones alimentarias ni alambres que causen rozaduras.",
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Mejor Higiene Oral",
                description:
                  "Al ser removibles, puedes cepillarte y usar hilo dental con normalidad. Esto reduce el riesgo de caries y enfermedades periodontales durante el tratamiento.",
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Menos Visitas a la Clínica",
                description:
                  "Solo necesitas acudir cada 6-8 semanas para revisiones. Recibes varios juegos de alineadores y los cambias tú mismo en casa cada 1-2 semanas.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Resultados Predecibles",
                description:
                  "Con tecnología 3D te mostramos el resultado final antes de empezar. Puedes ver cómo quedarán tus dientes al finalizar el tratamiento de ortodoncia invisible.",
              },
              {
                icon: <Smile className="w-10 h-10" />,
                title: "Sin Urgencias",
                description:
                  "No hay brackets que se despeguen ni alambres que se claven. Los alineadores son suaves y no causan urgencias dentales inesperadas.",
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

      {/* Proceso */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Proceso del Tratamiento de Ortodoncia Invisible
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Te explicamos paso a paso cómo funciona el tratamiento con ortodoncia invisible Invisalign 
            en nuestra clínica de Viladecans.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "1",
                icon: <Calendar className="w-6 h-6" />,
                title: "Primera Visita Gratuita y Estudio 3D",
                description:
                  "Evaluamos tu caso con escáner intraoral 3D, fotografías y radiografías digitales. Diseñamos tu tratamiento de forma virtual con el software ClinCheck y te mostramos el resultado final antes de empezar. Te explicamos la duración estimada y te damos un presupuesto detallado sin compromiso.",
              },
              {
                step: "2",
                icon: <Smile className="w-6 h-6" />,
                title: "Fabricación de tus Alineadores Personalizados",
                description:
                  "Enviamos tu estudio digital a los laboratorios Invisalign en Estados Unidos, donde fabrican tus alineadores transparentes a medida con tecnología SmartTrack. Cada juego de alineadores está numerado y diseñado específicamente para mover tus dientes de forma progresiva.",
              },
              {
                step: "3",
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Colocación de Ataches y Entrega de Alineadores",
                description:
                  "Te colocamos pequeños ataches (relieves de composite del color del diente) en algunos dientes para mejorar el agarre de los alineadores. Te entregamos los primeros juegos de alineadores y te explicamos cómo usarlos correctamente. Debes llevarlos 22 horas al día.",
              },
              {
                step: "4",
                icon: <Clock className="w-6 h-6" />,
                title: "Cambio de Alineadores cada 1-2 Semanas",
                description:
                  "Cambias a un nuevo juego de alineadores cada 1-2 semanas según las indicaciones de tu ortodoncista. Cada alineador mueve tus dientes aproximadamente 0,25mm. Puedes quitártelos para comer, beber (excepto agua) y cepillarte los dientes.",
              },
              {
                step: "5",
                icon: <Award className="w-6 h-6" />,
                title: "Revisiones cada 6-8 Semanas",
                description:
                  "Acudes a nuestra clínica de Viladecans cada 6-8 semanas para que comprobemos que el tratamiento avanza correctamente. En cada revisión te entregamos los siguientes juegos de alineadores. Las visitas son rápidas, de unos 15-20 minutos.",
              },
              {
                step: "6",
                icon: <Shield className="w-6 h-6" />,
                title: "Finalización y Retenedores",
                description:
                  "Una vez finalizado el tratamiento de ortodoncia invisible, retiramos los ataches y te entregamos retenedores fijos y/o removibles para mantener los resultados. Los retenedores son fundamentales para evitar que los dientes vuelvan a moverse.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="flex gap-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-2xl">
                  {step.step}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-xl text-black">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Ortodoncia Invisible
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre ortodoncia invisible Invisalign en Viladecans.
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
          <Smile className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Transformar tu Sonrisa con Ortodoncia Invisible?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans y te 
            haremos un estudio completo con escáner 3D y simulación del resultado final.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Ortodoncistas certificados Invisalign en Viladecans</strong> con más de 15 años de 
            experiencia. Financiación sin intereses disponible.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Financiación sin intereses • Ortodoncistas certificados
          </p>
        </div>
      </section>
    </>
  );
}

