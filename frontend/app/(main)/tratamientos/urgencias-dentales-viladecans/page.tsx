import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Zap, CheckCircle, Clock, Shield, Award, AlertTriangle, Heart, Phone, ChevronRight, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué hacer si tengo un dolor de muelas intenso?",
    answer:
      "Si tienes dolor de muelas intenso, llama inmediatamente a nuestra clínica de Viladecans para una cita urgente el mismo día. Mientras tanto: toma analgésicos (ibuprofeno 400-600mg o paracetamol 1g), evita alimentos muy fríos, calientes o dulces, aplica frío local en la mejilla (nunca directamente en el diente), no te acuestes completamente (mantén la cabeza elevada), y enjuaga con agua tibia y sal. No pongas aspirina sobre la encía (puede causar quemaduras).",
  },
  {
    question: "¿Qué hacer si se me rompe un diente?",
    answer:
      "Si se te rompe un diente por golpe o al masticar, guarda el fragmento en suero fisiológico o leche (nunca en agua del grifo) y acude inmediatamente a nuestra clínica de Viladecans. Si sangra, muerde una gasa durante 15-20 minutos. Aplica frío local en la mejilla para reducir inflamación. Es fundamental acudir en las primeras 24 horas para valorar si podemos pegar el fragmento o hacer una reconstrucción estética con composite.",
  },
  {
    question: "¿Qué hacer si se me cae un diente por un golpe?",
    answer:
      "Si un diente se sale completamente (avulsión dental), es una urgencia extrema. Cada minuto cuenta: 1) Coge el diente por la corona (nunca toques la raíz), 2) Lávalo suavemente con suero o leche (no frotes), 3) Intenta reimplantarlo tú mismo en el alvéolo si puedes, 4) Si no puedes, guárdalo en leche, suero o saliva (bajo la lengua), 5) Acude INMEDIATAMENTE a nuestra clínica de Viladecans (idealmente en los primeros 30 minutos). El pronóstico depende del tiempo que el diente esté fuera de la boca.",
  },
  {
    question: "¿Qué es un absceso o flemón dental?",
    answer:
      "Un absceso dental (flemón) es una acumulación de pus causada por una infección bacteriana en el diente o la encía. Síntomas: dolor intenso pulsátil, inflamación de la mejilla, fiebre, mal sabor de boca, dificultad para tragar o abrir la boca. Es una urgencia dental que requiere tratamiento inmediato en nuestra clínica de Viladecans con antibióticos, drenaje del absceso y posterior tratamiento del diente (endodoncia o extracción).",
  },
  {
    question: "¿Puedo ir a urgencias dentales sin cita previa?",
    answer:
      "Sí, en nuestra clínica de Viladecans atendemos urgencias dentales el mismo día. Llámanos por teléfono explicando tu urgencia y te daremos cita lo antes posible (normalmente el mismo día). Si el dolor es muy intenso o hay inflamación severa, te atendemos con prioridad. Nuestro objetivo es aliviar tu dolor y resolver el problema rápidamente.",
  },
  {
    question: "¿Las urgencias dentales son más caras?",
    answer:
      "En nuestra clínica de Viladecans, las urgencias dentales tienen el mismo precio que las citas normales. No aplicamos recargo por urgencia. El coste depende del tratamiento necesario: cura provisional, reconstrucción, extracción, endodoncia, etc. En la primera visita de urgencia te daremos un presupuesto detallado antes de proceder con cualquier tratamiento definitivo.",
  },
];

export const metadata: Metadata = {
  title: "Urgencias Dentales en Viladecans | Cita el Mismo Día",
  description:
    "Atención dental de urgencia en Viladecans. Tratamos dolor de muelas, dientes rotos, infecciones y traumatismos. Cita el mismo día. Resolvemos tu urgencia rápidamente.",
  keywords: [
    "urgencias dentales viladecans",
    "dentista urgencias viladecans",
    "dolor muelas viladecans",
    "diente roto urgencia viladecans",
    "flemón dental viladecans",
  ],
  openGraph: {
    title: "Urgencias Dentales en Viladecans | Cita el Mismo Día",
    description:
      "Atención dental de urgencia. Dolor de muelas, dientes rotos, infecciones y traumatismos. Cita el mismo día. Resolvemos tu urgencia.",
    images: ["/images/tecnologia-clinica-dental-viladecans.jpg"],
  },
};

export default function UrgenciasDentalesPage() {
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
                name: "Urgencias Dentales Viladecans",
                href: "/tratamientos/urgencias-dentales-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                URGENCIAS DENTALES
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Urgencias Dentales en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                <strong>Atención dental de urgencia en Viladecans</strong>. Tratamos dolor de muelas intenso, 
                dientes rotos o fracturados, infecciones dentales, abscesos, flemones y traumatismos dentales. 
                <strong> Cita el mismo día</strong> para resolver tu problema rápidamente.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Disponemos de servicio de urgencias dentales para aliviar el dolor y tratar infecciones. Más de 
                15 años de experiencia atendiendo urgencias dentales en Viladecans con rapidez y eficacia.
              </p>
              
              <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-red-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Disponibilidad
                  </div>
                  <div className="text-3xl font-bold text-red-600">
                    Mismo día
                  </div>
                  <div className="text-xs text-slate-500">Cita urgente rápida</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Atención el mismo día de tu llamada
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Alivio inmediato del dolor
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Tratamiento de infecciones dentales
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Reparación de dientes rotos
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-2xl hover:bg-red-700 hover:shadow-2xl transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Urgencias Ahora
                </a>
                <Link
                  href="/pedir-cita"
                  className="btn-secondary text-center"
                >
                  Pedir Cita Online
                </Link>
              </div>
            </div>

            <div className="aspect-[4/3] bg-gradient-to-br from-red-100 to-orange-50 rounded-3xl overflow-hidden shadow-xl relative flex items-center justify-center">
              <Zap className="w-32 h-32 text-red-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Urgencias */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Urgencias Dentales Más Frecuentes en Viladecans
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> tratamos todo tipo de urgencias dentales. 
            Estas son las más frecuentes:
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Dolor de Muelas Intenso
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                El <strong>dolor de muelas</strong> puede ser causado por caries profundas que llegan al nervio, 
                pulpitis (inflamación del nervio), absceso dental, periodontitis o traumatismo. El dolor puede ser 
                agudo, punzante, pulsátil o constante, empeorar por la noche, con el frío/calor o al morder.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Evaluamos la causa con radiografías, aplicamos anestesia local y 
                realizamos el tratamiento necesario: cura provisional, endodoncia, extracción o drenaje de absceso. 
                Prescribimos analgésicos y antibióticos si es necesario.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Diente Roto o Fracturado
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Las <strong>fracturas dentales</strong> pueden ser causadas por traumatismos (golpes, caídas, 
                accidentes deportivos) o al morder alimentos duros. Puede afectar solo al esmalte (fractura leve), 
                a la dentina (fractura moderada) o llegar al nervio (fractura severa). Síntomas: dolor al morder, 
                sensibilidad, bordes afilados.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Reconstrucción estética con composite (si la fractura es pequeña-moderada), 
                endodoncia + corona de zirconio (si afecta al nervio), o carilla de porcelana (si es un diente anterior 
                muy estético). Si guardas el fragmento, podemos pegarlo con técnicas de adhesión dental.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
                Absceso o Flemón Dental
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Un <strong>absceso dental</strong> es una acumulación de pus causada por una infección bacteriana 
                en el diente o la encía. Síntomas: dolor intenso pulsátil, inflamación de la mejilla o cuello, fiebre, 
                mal sabor de boca, ganglios inflamados, dificultad para tragar o abrir la boca (trismus).
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Prescripción de antibióticos (amoxicilina + ácido clavulánico o 
                metronidazol), drenaje del absceso si es necesario, analgésicos para el dolor. Una vez controlada 
                la infección aguda, tratamiento definitivo del diente: endodoncia o extracción.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
                Traumatismo Dental (Diente Salido o Movido)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Los <strong>traumatismos dentales</strong> por golpes o accidentes pueden causar: avulsión (diente 
                completamente salido), luxación (diente movido de posición), intrusión (diente empujado hacia 
                dentro del hueso), o subluxación (diente flojo). Es una urgencia extrema, especialmente la avulsión.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Reimplantación del diente (si es avulsión y llegas en las primeras 2 horas), 
                ferulización (fijar el diente con un alambre a los dientes vecinos durante 2-4 semanas), radiografías 
                de control, seguimiento a largo plazo. Fundamental acudir inmediatamente tras el traumatismo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-green-600" />
                Empaste o Corona Caídos
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Si se te cae un empaste, corona o carilla dental, puede haber sensibilidad al frío, calor y dulce 
                porque la dentina queda expuesta. También puede haber dolor al morder. Es importante acudir pronto 
                para evitar que se rompa más el diente o entre comida causando caries.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Si es un empaste caído, hacemos un nuevo empaste. Si es una corona 
                caída y está en buen estado, la recementamos. Si la corona está rota, fabricamos una nueva. Si el 
                diente está muy destruido, puede ser necesaria endodoncia antes de colocar la nueva corona.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                Sangrado de Encías Severo
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                El <strong>sangrado de encías</strong> puede ser causado por gingivitis, periodontitis, traumatismo, 
                o medicamentos anticoagulantes. Si el sangrado es persistente y abundante, es una urgencia.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Tratamiento:</strong> Limpieza dental profesional, raspado y alisado radicular (curetaje) 
                si hay periodontitis, enjuagues con ácido tranexámico o clorhexidina para controlar el sangrado. 
                Si tomas anticoagulantes, coordinamos con tu médico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Hacer en Urgencias */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿Qué Hacer Mientras Llegas a Nuestra Clínica?
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Mientras esperas tu cita de urgencia en Viladecans, sigue estos consejos según tu tipo de urgencia:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Para Dolor de Muelas",
                tips: [
                  "Toma analgésicos: ibuprofeno 400-600mg o paracetamol 1g",
                  "Aplica frío local en la mejilla (nunca directamente en el diente)",
                  "Enjuaga con agua tibia y sal",
                  "Evita alimentos muy fríos, calientes o dulces",
                  "Duerme con la cabeza elevada (2 almohadas)",
                  "NO pongas aspirina sobre la encía",
                ],
              },
              {
                title: "Para Diente Roto",
                tips: [
                  "Guarda el fragmento en suero, leche o saliva",
                  "Si sangra, muerde una gasa 15-20 minutos",
                  "Aplica frío local en la mejilla",
                  "Enjuaga suavemente con agua tibia",
                  "Evita morder con ese diente",
                  "Acude en las primeras 24 horas",
                ],
              },
              {
                title: "Para Diente Salido (Avulsión)",
                tips: [
                  "Coge el diente por la corona (NO toques la raíz)",
                  "Lávalo suavemente con suero o leche",
                  "Intenta reimplantarlo tú mismo si puedes",
                  "Si no, guárdalo en leche o bajo la lengua",
                  "Acude INMEDIATAMENTE (cada minuto cuenta)",
                  "Idealmente en los primeros 30 minutos",
                ],
              },
              {
                title: "Para Absceso o Flemón",
                tips: [
                  "Toma ibuprofeno 600mg cada 8 horas",
                  "Aplica frío local (nunca calor)",
                  "Enjuaga con clorhexidina o agua con sal",
                  "Mantén buena higiene oral",
                  "NO intentes drenar el absceso tú mismo",
                  "Acude a urgencias si hay fiebre o dificultad para tragar",
                ],
              },
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
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
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Urgencias Dentales
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre urgencias dentales en Viladecans.
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
      <section className="section-padding bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white">
        <div className="container-custom text-center">
          <Zap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Tienes una Urgencia Dental?
          </h2>
          <p className="text-xl mb-4 text-gray-100 max-w-2xl mx-auto">
            <strong>Llámanos ahora</strong> y te atenderemos el mismo día en nuestra clínica de Viladecans. 
            Resolveremos tu urgencia dental rápidamente y aliviaremos tu dolor.
          </p>
          <p className="text-base mb-8 text-gray-200 max-w-2xl mx-auto">
            <strong>Servicio de urgencias dentales en Viladecans</strong>. Más de 15 años de experiencia. 
            Cita el mismo día. Sin recargo por urgencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-red-900 bg-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar Urgencias: {CLINIC_INFO.phoneDisplay}
            </a>
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-2xl hover:bg-white hover:text-red-900 transition-all"
            >
              Pedir Cita Online
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-200">
            <MapPin className="w-4 h-4 inline mr-1" />
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Urgencias el mismo día • Sin recargo
          </p>
        </div>
      </section>
    </>
  );
}

