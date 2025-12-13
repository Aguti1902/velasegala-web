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
  title: "Blanqueamiento Dental en Viladecans | Clínica Vela-Segalà",
  description:
    `Blanqueamiento dental profesional en Viladecans. Tecnología LED avanzada. Dientes varios tonos más blancos en 1 sesión. Primera visita gratuita. Tratamiento seguro e indoloro. Llama al ${CLINIC_INFO.phoneDisplay}`,
  keywords: [
    "blanqueamiento dental viladecans",
    "blanqueamiento dental profesional viladecans",
    "blanquear dientes viladecans",
    "dientes blancos viladecans",
    "blanqueamiento dental led viladecans",
    "blanqueamiento dental precio viladecans",
    "blanqueamiento dental casa viladecans",
    "dentista blanqueamiento viladecans",
  ],
  openGraph: {
    title: "Blanqueamiento Dental en Viladecans | Clínica Vela-Segalà",
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
              <p className="text-xl text-slate-700 mb-4 leading-relaxed font-semibold">
                ¿Sabías que cuando sonríes reduces el nivel de estrés y contagias tu felicidad? 
                No dejes que el color de tus dientes te impida sonreír.
              </p>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                El <strong>blanqueamiento dental profesional en Viladecans</strong> es uno de los mejores tratamientos 
                para <strong>mejorar el aspecto de tu sonrisa</strong>. En poco tiempo, aclaramos la tonalidad de tus 
                dientes para que luzcas <strong>una sonrisa más blanca</strong> sin perder su naturalidad.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Tratamiento con <strong>lámparas LED de última generación</strong>. Elimina manchas causadas por café, 
                té, vino, tabaco y envejecimiento. También ofrecemos <strong>blanqueamiento ambulatorio</strong> con 
                férulas personalizadas para casa.
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

      {/* Por qué perdemos el color blanco */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative order-2 lg:order-1">
              <Image
                src="/images/blanqueamiento-dental-perdida-color.jpg"
                alt="Por qué los dientes pierden el color blanco"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                ¿Por Qué Mis Dientes Han Perdido Su Color Blanco?
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                El <strong>esmalte de nuestros dientes puede oscurecerse</strong> por diferentes motivos. 
                Conocer las causas es fundamental para prevenir la decoloración dental.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Alimentos y bebidas con pigmentos fuertes:</strong> café, té, vino tinto, salsas oscuras, remolacha
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Tabaco:</strong> amarillea los dientes con el tiempo
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Sarro acumulado:</strong> por higiene dental deficiente
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Algunos medicamentos:</strong> como las tetraciclinas
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Descalcificación del esmalte</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">
                    <strong>Envejecimiento natural</strong> de las piezas dentales
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-700 font-semibold">
                Con el blanqueamiento dental podemos aclarar varios tonos el color del esmalte y mejorar 
                significativamente la estética de tu sonrisa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Blanqueamiento */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Tipos de Blanqueamiento Dental en Viladecans
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed max-w-3xl mx-auto">
              En <strong>Clínicas Vela-Segalà de Viladecans</strong> ofrecemos dos tipos de blanqueamiento dental 
              profesional adaptados a tus necesidades. Nuestro objetivo es velar por tu bienestar y conseguir que 
              vuelvas a <strong>disfrutar de tu sonrisa sin complejos</strong>.
            </p>
          </div>

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

      {/* Blanqueamiento en casa */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                BLANQUEAMIENTO DOMICILIARIO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Blanqueamiento Dental en Casa
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Tras el <strong>blanqueamiento en la clínica</strong>, proporcionamos al paciente un <strong>kit de 
                blanqueamiento para aplicar en casa</strong>. Este kit contiene unas <strong>cubetas fabricadas a 
                medida</strong> y gel blanqueador profesional.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Esta segunda fase del <strong>blanqueamiento dental a domicilio está supervisada por nuestros 
                especialistas</strong> y ayuda a complementar los resultados del tratamiento en la clínica para 
                obtener un resultado óptimo y duradero.
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="font-bold text-lg mb-4">Ventajas del blanqueamiento en casa:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Comodidad:</strong> Lo realizas cuando tú quieras</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Supervisión profesional:</strong> Seguimiento por especialistas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Complemento perfecto:</strong> Potencia los resultados de clínica</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Mantenimiento:</strong> Conserva la blancura por más tiempo</span>
                  </div>
                </div>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                En las clínicas Vela-Segalà también ofrecemos <strong>consejos de higiene y cuidado dental</strong> 
                para que realices un buen mantenimiento tras el blanqueamiento y los resultados se mantengan durante 
                el mayor tiempo posible.
              </p>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/blanqueamiento-dental-casa.jpg"
                alt="Blanqueamiento dental en casa - Kit personalizado"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Cómo es el Proceso del Blanqueamiento Dental en Nuestra Clínica
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Te explicamos paso a paso cómo realizamos el blanqueamiento dental en nuestra clínica de Viladecans. 
            Un tratamiento profesional, seguro y completamente <strong>indoloro</strong>.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Diagnóstico y Limpieza Dental Profesional",
                description:
                  "El primer paso es comentar con el paciente sus expectativas y analizar qué factores han causado la decoloración del esmalte. Realizamos una revisión de su salud oral y, si es necesario, una limpieza dental profesional previa para eliminar el exceso de sarro acumulado y asegurarnos de que el blanqueamiento se ejecuta sobre una boca sana.",
              },
              {
                step: "2",
                title: "Protección y Aislamiento de Encías",
                description:
                  "Antes de empezar, protegemos y aislamos las encías. Aplicamos una resina protectora fotopolimerizable sobre las encías para aislarlas y evitar que el gel blanqueador las irrite. También protegemos los labios y la lengua para garantizar tu comodidad y seguridad durante todo el tratamiento.",
              },
              {
                step: "3",
                title: "Aplicación del Gel Blanqueador con Moléculas Activas",
                description:
                  "El blanqueamiento se realiza aplicando un gel que contiene moléculas blanqueadoras de peróxido de hidrógeno al 25-35%. Extendemos el gel sobre la superficie de los dientes. El gel actúa de forma interna en el esmalte y elimina las partículas que han provocado su decoloración.",
              },
              {
                step: "4",
                title: "Activación con Lámpara LED de Última Generación",
                description:
                  "Utilizamos una lámpara de luz LED que activa la liberación de estas moléculas blanqueadoras. La luz acelera la reacción química del blanqueamiento para obtener resultados más rápidos y efectivos. Repetimos este proceso en 3-4 ciclos de 15 minutos cada uno. Duración total: 45-60 minutos.",
              },
              {
                step: "5",
                title: "Tratamiento de Desensibilización",
                description:
                  "Aunque es un tratamiento completamente indoloro, puede provocar algo de sensibilidad dental temporal. Por ello, en nuestra clínica llevamos a cabo un tratamiento de desensibilización con flúor, potasio y calcio que ayuda a mitigar estos efectos con mayor rapidez y remineraliza el esmalte.",
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

      {/* Beneficios de sonreír */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/blanqueamiento-dental-sonrisa (1).jpg"
                alt="Sonrisa blanca y saludable después del blanqueamiento dental"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Sonreír Mejora Tu Autoestima e Inspira Confianza
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                <strong>Cuando sonríes reduces el nivel de estrés</strong> y contagias tu felicidad a las personas 
                que te rodean. Aunque sonreír es algo que muchas veces hacemos de forma mecánica como reacción ante 
                un estado de ánimo, hay veces que lo evitamos.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Especialmente <strong>si no nos gusta nuestra sonrisa o nos avergüenza el color de nuestros dientes</strong>. 
                El blanqueamiento dental es uno de los mejores tratamientos que puedes hacerte para mejorar el aspecto 
                de tu sonrisa.
              </p>

              <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-6 shadow-xl mb-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Smile className="w-6 h-6" />
                  Beneficios de una sonrisa blanca:
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Aumenta tu autoestima y confianza personal</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Mejora tu imagen profesional y social</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Te hace parecer más joven y saludable</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Genera una primera impresión positiva</span>
                  </div>
                </div>
              </div>

              <p className="text-xl font-bold text-black">
                ¡No te prives de sonreír! Recupera la confianza en tu sonrisa.
              </p>
            </div>
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

      {/* Resultados del blanqueamiento */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                RESULTADOS INMEDIATOS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Dientes Varios Tonos Más Blancos en una Sola Sesión
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                El <strong>blanqueamiento dental profesional en nuestra clínica de Viladecans</strong> consigue 
                resultados inmediatos y visibles desde la primera sesión. Notarás cómo tus dientes se aclaran 
                varios tonos en solo 45-60 minutos.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Los resultados son <strong>duraderos entre 1-3 años</strong> dependiendo de tus hábitos de higiene 
                oral y alimentación. Con un buen mantenimiento y siguiendo nuestros consejos, tu sonrisa se mantendrá 
                blanca y brillante durante mucho tiempo.
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500 mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  ¿Qué esperar del tratamiento?
                </h3>
                <div className="space-y-3 text-slate-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span><strong>Resultados inmediatos:</strong> Notarás la diferencia al salir de la clínica</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span><strong>Tratamiento seguro:</strong> No daña el esmalte dental</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span><strong>Sin dolor:</strong> Proceso completamente indoloro</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span><strong>Aspecto natural:</strong> Blancura sin perder naturalidad</span>
                  </div>
                </div>
              </div>

              <Link
                href="/pedir-cita"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Quiero Blanquear Mis Dientes
              </Link>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/Gemini_Generated_Image_aovmlfaovmlfaovm.png"
                alt="Resultados del blanqueamiento dental profesional"
                fill
                className="object-cover"
              />
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
          <Smile className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por Qué Esperar Más para Lucir una Sonrisa Radiante?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            En <strong>Clínicas Vela-Segalà de Viladecans</strong> queremos que vuelvas a <strong>disfrutar de tu 
            sonrisa sin complejos</strong>. Pide tu primera visita gratuita y te explicaremos cómo podemos ayudarte.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Blanqueamiento dental profesional en Viladecans</strong>. Tecnología LED avanzada. Resultados 
            inmediatos en una sesión. Tratamiento seguro, indoloro y efectivo. Primera visita y valoración gratuita.
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
              Llamar: {CLINIC_INFO.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            <MapPin className="w-4 h-4 inline mr-1" />
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Especialistas en estética dental • Tecnología LED de última generación
          </p>
        </div>
      </section>
    </>
  );
}

