import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Smile, CheckCircle, Clock, Shield, Award, Calendar, Users, Eye, ChevronRight, Phone, MapPin, Star, Sparkles, Heart } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿Qué es la ortodoncia invisible?",
    answer:
      "La ortodoncia invisible es un sistema que utiliza alineadores transparentes hechos a medida para mover tus dientes gradualmente hasta la posición deseada. Son prácticamente invisibles, removibles y mucho más cómodos que los brackets tradicionales. En nuestra clínica de Viladecans trabajamos con sistemas como Invisalign y Spark, siendo especialistas certificados.",
  },
  {
    question: "¿Cuánto dura el tratamiento de ortodoncia invisible?",
    answer:
      "La duración del tratamiento con ortodoncia invisible varía según cada caso, pero generalmente oscila entre 12 y 18 meses. Casos más simples pueden resolverse en 6-8 meses, mientras que casos complejos pueden requerir hasta 24 meses. En la primera visita te daremos un plan de tratamiento detallado con la duración estimada.",
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
      "Sí, ofrecemos financiación sin intereses hasta en 12 meses para tratamientos de ortodoncia invisible. También disponemos de opciones de financiación a más largo plazo con cuotas muy cómodas. Te explicamos todas las opciones de pago en tu primera visita en Viladecans.",
  },
  {
    question: "¿Invisalign funciona para todos los casos?",
    answer:
      "Invisalign ha evolucionado mucho y actualmente puede tratar la mayoría de casos de maloclusión: apiñamiento, diastemas, sobremordida, mordida cruzada, etc. En casos muy complejos podemos combinar Invisalign con otros tratamientos. En tu primera visita evaluaremos si eres candidato para ortodoncia invisible.",
  },
];

export const metadata: Metadata = {
  alternates: {
    canonical: '/tratamientos/ortodoncia-invisible-viladecans',
  },
  title: "Ortodoncia en Viladecans | Invisible y Brackets | Vela-Segalà",
  description:
    `Ortodoncia en Viladecans para adultos y niños. Ortodoncia invisible con Invisalign y Spark, y brackets tradicionales. Ortodoncistas certificados con +25 años de experiencia. Financiación sin intereses. Llama al ${CLINIC_INFO.phoneDisplay}`,
  keywords: [
    "ortodoncia viladecans",
    "ortodoncia invisible viladecans",
    "invisalign viladecans",
    "brackets viladecans",
    "ortodoncia adultos viladecans",
    "ortodoncia niños viladecans",
    "alineadores transparentes viladecans",
    "ortodoncista viladecans",
    "ortodoncia removible viladecans",
  ],
  openGraph: {
    title: "Ortodoncia en Viladecans | Invisible y Brackets | Vela-Segalà",
    description:
      "Ortodoncia invisible con Invisalign y Spark, y brackets tradicionales para adultos y niños. Ortodoncistas certificados con +25 años en Viladecans.",
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
                name: "Ortodoncia Viladecans",
                href: "/tratamientos/ortodoncia-invisible-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                ORTODONCIA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Ortodoncia en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed font-semibold">
                Ortodoncia invisible y brackets para adultos y niños — la solución más adecuada para cada caso
              </p>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                En <strong>Clínicas Vela-Segalà de Viladecans</strong> podemos transformar tu sonrisa con{" "}
                <strong>ortodoncia invisible</strong>. Para aquellos que busquen un tratamiento de ortodoncia{" "}
                <strong>muy discreto y casi imperceptible a la vista</strong>, la ortodoncia invisible es la 
                alternativa idónea.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Sistema de <strong>férulas transparentes fabricadas a medida</strong> con tecnología 3D. Trabajamos con 
                sistemas de ortodoncia invisible como <strong>Invisalign y Spark</strong>. Los{" "}
                <strong>alineadores son removibles</strong>, permitiéndote extraer y colocar la ortodoncia con 
                completa autonomía. Ortodoncistas certificados con más de 25 años de experiencia.
              </p>
              
              <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-5 shadow-xl mb-6 text-white">
                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-tight">6-18 meses</div>
                      <div className="text-[10px] text-gray-300 mt-0.5">duración media</div>
                    </div>
                    <div className="h-10 w-px bg-white/20"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-tight">100%</div>
                      <div className="text-[10px] text-gray-300 mt-0.5">removible</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Estudio 3D completo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Ortodoncistas certificados en Invisalign y Spark</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Prácticamente invisible y removible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Come y bebe lo que quieras</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">Financiación sin intereses hasta 12 meses</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pedir-cita" className="btn-primary text-center">
                  Pedir Cita
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
                src="/images/ortodoncia-invisible-alineador-viladecans.jpg"
                alt="Alineador transparente de ortodoncia invisible en Viladecans - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dos modalidades de ortodoncia */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Nuestras modalidades de ortodoncia
            </h2>
            <p className="text-lg text-slate-600">
              Elegimos contigo la opción más adecuada según tu caso, tu estilo de vida y tus preferencias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Ortodoncia invisible */}
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-7 text-white">
              <div className="inline-block bg-white/20 px-3 py-1 rounded-lg text-xs font-bold mb-4 uppercase tracking-wide">
                Adultos y niños
              </div>
              <h3 className="text-2xl font-bold mb-3">Ortodoncia Invisible</h3>
              <p className="text-gray-300 leading-relaxed mb-5">
                Sistema de <strong className="text-white">férulas transparentes fabricadas a medida</strong> con tecnología 3D.
                Trabajamos con <strong className="text-white">Invisalign y Spark</strong>. Prácticamente imperceptibles,
                removibles y muy cómodas. Ideal para quien busca el máximo nivel de discreción.
              </p>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />Prácticamente invisible</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />Totalmente removible</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />Come y bebe lo que quieras</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />Higiene oral mucho más fácil</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />Ortodoncistas certificados en Invisalign y Spark</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />Duración media: 6–18 meses</li>
              </ul>
            </div>

            {/* Brackets */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-7 border-2 border-gray-200 shadow-sm">
              <div className="inline-block bg-black text-white px-3 py-1 rounded-lg text-xs font-bold mb-4 uppercase tracking-wide">
                Adultos y niños
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Brackets</h3>
              <p className="text-slate-600 leading-relaxed mb-5">
                Los <strong>brackets tradicionales</strong> siguen siendo una solución muy eficaz para correcciones
                dentales de todo tipo de complejidad. Disponemos de brackets metálicos y estéticos (cerámicos o de zafiro),
                adaptados a niños y adultos.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-black flex-shrink-0" />Brackets metálicos y estéticos (cerámicos)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-black flex-shrink-0" />Aptos para todos los tipos de maloclusión</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-black flex-shrink-0" />Mayor control en casos complejos</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-black flex-shrink-0" />Opción más accesible económicamente</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-black flex-shrink-0" />Ideal para ortodoncia infantil y adolescente</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-black flex-shrink-0" />Duración media: 18–24 meses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galería ortodoncia */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/ortodoncia-invisible-alineador-viladecans.jpg"
                alt="Alineador transparente ortodoncia invisible Viladecans"
                fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/ortodoncia-invisible-modelo-viladecans.jpg"
                alt="Modelo dental con alineadores invisibles - Clínica Vela-Segalà"
                fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/ortodoncia-brackets-metalicos-viladecans.jpg"
                alt="Modelo dental con brackets metálicos - ortodoncia Viladecans"
                fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/ortodoncia-brackets-modelo-viladecans.jpg"
                alt="Brackets estéticos y cerámicos - ortodoncia Clínica Vela-Segalà Viladecans"
                fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/ortodoncia-brackets-modelo2-viladecans.jpg"
                alt="Modelo de ortodoncia con brackets - Clínica Vela-Segalà Viladecans"
                fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-md">
              <Image src="/images/ortodoncia-modelo-dental-viladecans.jpg"
                alt="Modelo dental - ortodoncia en Viladecans"
                fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Férulas transparentes a medida */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative order-2 lg:order-1">
              <Image
                src="/images/fase-retencion-ortodoncia-invisible.jpg"
                alt="Férulas transparentes de ortodoncia invisible fabricadas a medida"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ortodoncia Invisible: Férulas Transparentes Fabricadas a tu Medida
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                La <strong>ortodoncia invisible</strong> es un sistema de <strong>férulas de material invisible</strong> que, 
                gracias a una estrategia de micromovimientos dentarios, son capaces de colocar las piezas dentales en la 
                posición correcta.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Los <strong>alineadores son removibles</strong>, lo que permite al paciente <strong>extraer y colocar la 
                ortodoncia en sus dientes con completa autonomía</strong>. Podrás llevar a cabo tus higienes diarias con 
                total normalidad y comer cualquier tipo de alimento.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="font-bold text-lg mb-4">Las ventajas para el bienestar del paciente:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Higiene diaria normal:</strong> Cepillado y uso de hilo dental sin obstáculos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Sin restricciones alimentarias:</strong> Come cualquier tipo de alimento</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Comodidad superior:</strong> Sin alambres ni brackets que causen rozaduras</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Autonomía total:</strong> Tú decides cuándo quitártelos</span>
                  </div>
                </div>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                Las ventajas para el bienestar del paciente, durante el proceso de corrección de la posición bucodental, 
                son <strong>ampliamente superiores respecto a otros sistemas tradicionales</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es Invisalign */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              ¿Cómo Será tu Tratamiento de Ortodoncia Invisible en Viladecans?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Nuestros <strong>expertos en ortodoncia invisible en Viladecans</strong> escucharán qué es aquello que 
              deseas transformar de tu sonrisa, cómo imaginas los resultados y cuáles son tus expectativas. En{" "}
              <strong>Clínicas Vela-Segalà comenzaremos tu tratamiento con un estudio diagnóstico en profundidad</strong> con 
              tecnología dental digital.
            </p>
          </div>

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

      {/* Mucho más que estética */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ortodoncia Invisible: Mucho Más Que Estética Dental
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Con la corrección de la posición de los dientes no solo ayudamos al paciente a recuperar la armonía 
                visual de su sonrisa, también <strong>garantizamos que se alcanza una mordida perfecta</strong>.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Evitando así <strong>problemas de masticación, fonética, pérdida de hueso, dolores de cabeza e incluso 
                problemas de bruxismo o en la ATM</strong> (Articulación Temporomandibular).
              </p>

              <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-6 shadow-xl mb-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Beneficios para tu salud:
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Mejora la masticación y digestión de alimentos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Corrige problemas de fonética y pronunciación</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Previene la pérdida de hueso dental</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Reduce dolores de cabeza y mandibulares</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Alivia problemas de bruxismo y ATM</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Además, convivir con una sonrisa que te produce inseguridades conlleva una <strong>carga emocional que 
                afecta directamente a tu salud mental</strong>.
              </p>
              <p className="text-xl font-bold text-black">
                En Clínicas Vela-Segalà llevamos muchos años acompañando a nuestros pacientes en la transformación 
                de su sonrisa.
              </p>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/dentistas-clinica-dental-viladecans-5.jpg"
                alt="Ortodoncistas expertos en Viladecans"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">
            ¿Cuáles son las Ventajas de la Ortodoncia Invisible?
          </h2>
          <p className="text-center text-slate-700 mb-12 max-w-3xl mx-auto text-lg leading-relaxed">
            Elegir tu tratamiento de <strong>ortodoncia invisible en Clínicas Vela-Segalà de Viladecans</strong> te 
            garantizará conseguir los mejores resultados y una sonrisa con la que siempre has soñado. A continuación, 
            te detallamos sus múltiples ventajas:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye className="w-10 h-10" />,
                title: "Sonríe sin Interrupciones",
                description:
                  "Disfruta de una solución prácticamente invisible que te permita sonreír como siempre lo has hecho mientras alineas tus dientes. Ideal para quienes desean mejorar su sonrisa discretamente, sin comprometer su imagen profesional o social.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Comodidad Durante Todo el Proceso",
                description:
                  "Experimenta el ajuste personalizado de los alineadores diseñados específicamente para tus dientes. Disfruta de un tratamiento sin las molestias de los brackets tradicionales, sin irritaciones ni interrupciones en tu vida diaria.",
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Te Permite Comer y Beber lo que Quieras",
                description:
                  "Los tratamientos de ortodoncia invisible te permiten poder retirar tus alineadores para comer, beber y realizar tu rutina de higiene dental. Este beneficio clave elimina las complicaciones asociadas con otros tipos de aparatos.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Un Tratamiento Preciso con Resultado Final",
                description:
                  "Observa el avance esperado de tu tratamiento mediante las visualizaciones en 3D avanzadas que te mostraremos antes de comenzar. Nuestra tecnología permite prever los resultados con claridad desde el inicio.",
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Menos Visitas al Dentista",
                description:
                  "Disfruta de la eficiencia de menos citas, disponiendo de más tiempo para ti sin sacrificar la efectividad del tratamiento. Las visitas programadas se centrarán en el seguimiento de tu progreso, haciéndolas más eficientes y menos frecuentes.",
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Es el Tratamiento Más Seguro",
                description:
                  "Un tratamiento de ortodoncia invisible te permite minimizar riesgos durante actividades físicas y deportivas. Los alineadores eliminan el peligro de cortes y heridas comunes de otros tratamientos. Ideal si llevas un ritmo de vida dinámico y activo.",
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
            Fases del Tratamiento de Ortodoncia Invisible en Viladecans
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Te explicamos paso a paso cómo funciona el tratamiento con ortodoncia invisible en nuestra clínica de 
            Viladecans. Un proceso claro, predecible y cómodo desde el primer día.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "1",
                icon: <Calendar className="w-6 h-6" />,
                title: "Fase de Inicio y Fabricación de Alineadores",
                description:
                  "Obtenemos una reproducción en 3D de la forma y posición de tus dientes gracias a nuestro escáner intraoral, evitando así el uso de los moldes de pasta convencionales. Con esta imagen virtual podemos trazar la estrategia de micromovimientos que deben seguir los dientes para alcanzar la sonrisa final deseada: sana y bonita. Con la estrategia trazada, ortodoncista y paciente, podréis visualizar cómo será tu futura sonrisa incluso antes de comenzar a usar los primeros alineadores.",
              },
              {
                step: "2",
                icon: <Smile className="w-6 h-6" />,
                title: "Comienzo del Tratamiento de Ortodoncia Invisible",
                description:
                  "Deberás acudir a consulta de forma periódica para recoger tu nuevo par de férulas y recibir una revisión que nos garantice que el tratamiento sigue el desarrollo esperado. La duración de un tratamiento de ortodoncia invisible varía según el problema de malposición dentario o maloclusión que sufra el paciente. Generalmente oscila entre 6 y 18 meses.",
              },
              {
                step: "3",
                icon: <Shield className="w-6 h-6" />,
                title: "Final del Tratamiento y Fase de Retención",
                description:
                  "Cuando nuestros expertos en ortodoncia invisible den la fase correctiva por finalizada, procederemos a garantizar que los resultados se mantienen en el tiempo. Los dientes, si no existe un sistema de retención, tienden a recuperar su posición inicial. En Clínicas Vela-Segalà contamos con distintos sistemas de retención para garantizar que el tratamiento concluye correctamente.",
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
            Resolvemos las dudas más habituales sobre ortodoncia invisible en Viladecans.
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
          <Smile className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expertos en Ortodoncia Invisible en Viladecans
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            ¿Quieres una sonrisa nueva? Ponte en manos de nuestros profesionales para conseguir la{" "}
            <strong>sonrisa sana y bonita que deseas</strong>. Tras muchos años de experiencia transformando sonrisas, 
            podemos asegurarte que <strong>te va a cambiar la vida</strong>.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Ortodoncistas certificados en Viladecans</strong> con más de 25 años de experiencia. Trabajamos con 
            sistemas Invisalign y Spark. Estudio 3D completo. Financiación sin intereses. Alineadores transparentes removibles. Aún no puedes 
            imaginarte cuánto va a mejorar tu vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Quiero una Sonrisa Sana y Bonita
            </Link>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-2xl hover:bg-white hover:text-black transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar: {CLINIC_INFO.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            <MapPin className="w-4 h-4 inline mr-1" />
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Expertos en transformar sonrisas • Férulas transparentes a medida
          </p>
        </div>
      </section>
    </>
  );
}

