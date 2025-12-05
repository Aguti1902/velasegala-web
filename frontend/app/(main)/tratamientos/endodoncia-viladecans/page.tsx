import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Zap, CheckCircle, Clock, Shield, Award, Heart, Microscope, Smile, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué es una endodoncia?",
    answer:
      "La endodoncia, comúnmente conocida como 'matar el nervio', es un tratamiento dental que consiste en eliminar la pulpa dental (nervio y vasos sanguíneos) del interior del diente cuando está infectada o inflamada. Se limpian y desinfectan los conductos radiculares, se rellenan con un material biocompatible y se sella el diente. Permite salvar dientes que de otro modo habría que extraer.",
  },
  {
    question: "¿Cuándo es necesaria una endodoncia?",
    answer:
      "Una endodoncia es necesaria cuando la pulpa dental está infectada o inflamada de forma irreversible. Causas comunes: caries profundas que llegan al nervio, traumatismos dentales, fracturas dentales, infecciones (abscesos o flemones), dolor intenso al frío/calor, dolor espontáneo o al morder. En nuestra clínica de Viladecans hacemos un diagnóstico preciso con radiografías y pruebas de vitalidad.",
  },
  {
    question: "¿Es dolorosa la endodoncia?",
    answer:
      "No, la endodoncia se realiza con anestesia local efectiva, por lo que no sentirás dolor durante el tratamiento. Después puede haber molestias leves durante 2-3 días que se controlan con analgésicos comunes como ibuprofeno. La mayoría de pacientes en nuestra clínica de Viladecans nos dicen que fue mucho menos doloroso de lo que esperaban. De hecho, la endodoncia elimina el dolor que tenías antes del tratamiento.",
  },
  {
    question: "¿Cuánto dura una endodoncia?",
    answer:
      "La duración del tratamiento depende del diente: los dientes anteriores (incisivos, caninos) tienen un solo conducto y tardan 30-45 minutos. Los premolares tienen 1-2 conductos y tardan 45-60 minutos. Los molares tienen 3-4 conductos y pueden tardar 60-90 minutos. En nuestra clínica de Viladecans utilizamos microscopio dental y sistema rotatorio para mayor rapidez y precisión. La mayoría de endodoncias se completan en una sola sesión.",
  },
  {
    question: "¿Cuánto dura un diente endodonciado?",
    answer:
      "Un diente endodonciado bien tratado y correctamente restaurado puede durar toda la vida. La tasa de éxito de las endodoncias es superior al 90%. Es fundamental realizar una buena reconstrucción tras la endodoncia y, en molares endodonciados, se recomienda colocar una corona de zirconio para proteger el diente, ya que los dientes sin nervio son más frágiles. En nuestra clínica de Viladecans hacemos seguimiento con radiografías de control.",
  },
  {
    question: "¿Qué pasa si no me hago una endodoncia?",
    answer:
      "Si no tratas una infección dental con endodoncia, la infección progresará causando abscesos, flemones, fístulas, pérdida de hueso alrededor del diente y finalmente pérdida del diente. La infección también puede extenderse a otras zonas de la boca, cara o incluso al resto del cuerpo. Es importante tratar las infecciones dentales a tiempo en nuestra clínica de Viladecans.",
  },
];

export const metadata: Metadata = {
  title: "Endodoncia en Viladecans | Tratamiento de Conductos",
  description:
    "Endodoncia en Viladecans. Tratamiento de conductos radiculares sin dolor. Salva tu diente con endodoncia. Microscopio dental para máxima precisión. Primera visita gratuita.",
  keywords: [
    "endodoncia viladecans",
    "tratamiento conductos viladecans",
    "matar nervio diente viladecans",
    "endodoncia sin dolor viladecans",
    "endodoncista viladecans",
  ],
  openGraph: {
    title: "Endodoncia en Viladecans | Tratamiento de Conductos",
    description:
      "Salva tus dientes con endodoncia. Tratamiento de conductos sin dolor. Microscopio dental para máxima precisión. Primera visita gratuita.",
    images: ["/images/endodoncia-viladecans.jpg"],
  },
};

export default function EndodonciaPage() {
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
                name: "Endodoncia Viladecans",
                href: "/tratamientos/endodoncia-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                ENDODONCIA CON MICROSCOPIO
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Endodoncia en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Salva tus dientes con <strong>endodoncia sin dolor en Viladecans</strong>. Utilizamos 
                <strong> microscopio dental</strong> y sistema rotatorio para tratamientos de conductos más 
                precisos, rápidos y con mayor tasa de éxito.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Eliminamos la infección dental, preservamos tu diente natural y acabamos con el dolor. 
                Tratamiento en una sola sesión en la mayoría de casos. Más de 15 años de experiencia en 
                endodoncia compleja.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración del tratamiento
                  </div>
                  <div className="text-3xl font-bold text-black">
                    1 sesión
                  </div>
                  <div className="text-xs text-slate-500">45-90 minutos según diente</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y diagnóstico gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Microscopio dental para máxima precisión
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Tratamiento sin dolor con anestesia local
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Tasa de éxito superior al 90%
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
                src="/images/endodoncia-viladecans.jpg"
                alt="Endodoncia en Viladecans - Tratamiento de Conductos - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿Qué es una Endodoncia o Tratamiento de Conductos?
          </h2>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            La <strong>endodoncia</strong> es un tratamiento dental que permite salvar dientes con infección o 
            inflamación de la pulpa dental (nervio). Consiste en eliminar el tejido pulpar infectado del interior 
            del diente, limpiar y desinfectar los conductos radiculares, y sellarlos con un material biocompatible 
            para prevenir futuras infecciones.
          </p>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> realizamos endodoncias con <strong>microscopio 
            dental</strong>, que permite visualizar el interior de los conductos con gran aumento (hasta 25x). Esto 
            mejora significativamente la precisión, la limpieza de los conductos y la tasa de éxito del tratamiento.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Utilizamos también <strong>sistema rotatorio</strong> (instrumentos de níquel-titanio) para preparar 
            los conductos de forma más rápida, eficiente y respetando la anatomía natural del diente. La mayoría 
            de endodoncias se completan en una sola sesión.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">¿Cuándo es Necesaria una Endodoncia?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Caries profunda que llega al nervio",
                "Dolor intenso al frío, calor o dulce",
                "Dolor espontáneo o nocturno",
                "Traumatismo dental con fractura",
                "Absceso o flemón dental",
                "Fístula (grano en la encía)",
                "Diente gris u oscurecido",
                "Dolor al morder o masticar",
              ].map((symptom, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Proceso del Tratamiento de Endodoncia
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Te explicamos paso a paso cómo realizamos una endodoncia en nuestra clínica de Viladecans.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "1",
                icon: <Microscope className="w-6 h-6" />,
                title: "Diagnóstico y Radiografías",
                description:
                  "Realizamos radiografías digitales y pruebas de vitalidad pulpar para confirmar que necesitas una endodoncia. Evaluamos la anatomía de los conductos radiculares y detectamos posibles complicaciones (conductos calcificados, curvaturas, reabsorciones). Te explicamos el tratamiento y resolvemos tus dudas.",
              },
              {
                step: "2",
                icon: <Shield className="w-6 h-6" />,
                title: "Anestesia y Aislamiento",
                description:
                  "Aplicamos anestesia local efectiva para que no sientas ningún dolor. Colocamos un dique de goma para aislar el diente del resto de la boca, mantenerlo seco y evitar contaminación bacteriana durante el tratamiento. El aislamiento es fundamental para el éxito de la endodoncia.",
              },
              {
                step: "3",
                icon: <Zap className="w-6 h-6" />,
                title: "Acceso y Limpieza de Conductos",
                description:
                  "Hacemos una apertura en la corona del diente para acceder a la cámara pulpar. Localizamos todos los conductos radiculares con ayuda del microscopio dental. Retiramos el tejido pulpar infectado, limpiamos y desinfectamos los conductos con instrumentos rotatorios y soluciones irrigantes (hipoclorito sódico, EDTA).",
              },
              {
                step: "4",
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Obturación de Conductos",
                description:
                  "Una vez los conductos están limpios y secos, los rellenamos con gutapercha (material biocompatible) y cemento sellador. Esto evita que las bacterias vuelvan a entrar en los conductos. Tomamos una radiografía de control para verificar que el relleno llega hasta el ápice (punta de la raíz).",
              },
              {
                step: "5",
                icon: <Award className="w-6 h-6" />,
                title: "Reconstrucción del Diente",
                description:
                  "Sellamos la apertura con un empaste provisional o definitivo de composite. En dientes posteriores (muelas) muy destruidos, recomendamos colocar una corona de zirconio para proteger el diente, ya que los dientes endodonciados son más frágiles y pueden fracturarse con la masticación.",
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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
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

      {/* Ventajas Microscopio */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ventajas de la Endodoncia con Microscopio
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra clínica de Viladecans utilizamos <strong>microscopio dental</strong> en todas nuestras 
            endodoncias. Esto proporciona numerosas ventajas frente a la endodoncia convencional:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Mayor Precisión",
                description: "Visualización magnificada (hasta 25x) del interior de los conductos. Permite detectar conductos accesorios, fracturas, reabsorciones y anatomías complejas.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Mayor Tasa de Éxito",
                description: "Las endodoncias con microscopio tienen una tasa de éxito superior al 95%, frente al 85-90% de las endodoncias convencionales.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Tratamiento Conservador",
                description: "Al ver mejor el interior del diente, se elimina menos tejido sano. Esto preserva la resistencia estructural del diente endodonciado.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Más Rápido",
                description: "La buena visualización permite trabajar de forma más eficiente. La mayoría de endodoncias se completan en una sola sesión de 45-90 minutos.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
                <div className="mb-4 p-3 bg-white rounded-xl inline-block">
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Endodoncia
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre endodoncia en Viladecans.
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
          <Zap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Salva tu Diente con Endodoncia
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Diagnóstico completo con radiografías digitales y plan de tratamiento personalizado.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Endodoncia con microscopio en Viladecans</strong>. Tratamiento sin dolor en una sola sesión. 
            Más de 15 años de experiencia.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • Microscopio dental
          </p>
        </div>
      </section>
    </>
  );
}

