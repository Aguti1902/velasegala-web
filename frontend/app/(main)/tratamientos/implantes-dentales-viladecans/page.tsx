import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Drill, CheckCircle, Clock, Shield, Award, Calendar, Users, Microscope, Activity, ChevronRight, Phone, MapPin, Smile, Heart, Zap, Star } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

const TREATMENT_FAQS = [
  {
    question: "¿Cuánto cuesta un implante dental en Viladecans?",
    answer:
      "El precio de un implante dental en nuestra clínica de Viladecans depende del tipo de implante, la marca (Straumann, Nobel Biocare), si es necesario realizar injerto de hueso y el tipo de corona. Utilizamos únicamente implantes de marcas premium con certificación internacional. En la primera visita gratuita te daremos un presupuesto detallado y personalizado sin compromiso, adaptado a tu caso específico.",
  },
  {
    question: "¿Cuánto dura el tratamiento de implantes dentales?",
    answer:
      "El proceso completo de un implante dental suele durar entre 3 y 6 meses. Primero se coloca el implante en el hueso (1 sesión de 30-60 minutos), luego esperamos 2-4 meses para que se integre completamente con el hueso (osteointegración), y finalmente se coloca la corona definitiva. En algunos casos podemos hacer carga inmediata el mismo día de la cirugía.",
  },
  {
    question: "¿Es doloroso ponerse un implante dental?",
    answer:
      "No, el procedimiento se realiza con anestesia local efectiva, por lo que no sentirás dolor durante la colocación del implante. Después de la cirugía puede haber molestias leves durante 2-3 días que se controlan perfectamente con analgésicos comunes como ibuprofeno. La mayoría de nuestros pacientes en Viladecans nos dicen que fue mucho más fácil y menos doloroso de lo que esperaban. Además, ofrecemos sedación consciente para pacientes con miedo o ansiedad.",
  },
  {
    question: "¿Cuánto duran los implantes dentales?",
    answer:
      "Con una buena higiene oral y revisiones periódicas en nuestra clínica de Viladecans, los implantes dentales pueden durar toda la vida. La tasa de éxito supera el 95% a 10 años. Los implantes Straumann y Nobel Biocare que utilizamos tienen estudios científicos que demuestran su durabilidad superior a 20 años. Es fundamental mantener una buena salud bucodental y acudir a las revisiones anuales.",
  },
  {
    question: "¿Ofrecen financiación para implantes dentales?",
    answer:
      "Sí, ofrecemos financiación sin intereses hasta en 12 meses para tratamientos de implantes dentales. También disponemos de opciones de financiación a más largo plazo con cuotas muy cómodas. Te explicamos todas las opciones de pago y financiación en tu primera visita gratuita en Viladecans.",
  },
  {
    question: "¿Qué marcas de implantes dentales utilizan?",
    answer:
      "En nuestra clínica dental de Viladecans utilizamos únicamente implantes dentales de las marcas líderes mundiales: Straumann (Suiza), Nobel Biocare (Suecia) y Zimmer (EEUU). Estas marcas ofrecen las mayores garantías de éxito, la mejor osteointegración y estudios científicos con más de 30 años de seguimiento. Todas ellas con certificación internacional y garantías de por vida.",
  },
  {
    question: "¿Puedo ponerme dientes el mismo día?",
    answer:
      "Sí, somos especialistas en implantes de carga inmediata en Viladecans. En casos adecuados, podemos colocar el implante y la prótesis provisional el mismo día, para que salgas de la clínica con dientes. Esto es posible gracias a la cirugía guiada por ordenador y nuestra experiencia de más de 15 años en implantología.",
  },
];

export const metadata: Metadata = {
  title: "Implantes Dentales en Viladecans | Especialistas Vela-Segalà",
  description:
    `Implantes dentales en Viladecans con el Dr. Xavier Vela, eminencia en implantología. Especialistas con +15 años de experiencia. Marcas premium Straumann y Nobel Biocare. Técnica BOPT. Primera visita gratuita. Financiación sin intereses. Dientes en el día. Sedación consciente disponible. Llama al ${CLINIC_INFO.phoneDisplay}`,
  keywords: [
    "implantes dentales viladecans",
    "implantología viladecans",
    "doctor vela implantes",
    "precio implantes dentales viladecans",
    "cuanto cuesta un implante dental viladecans",
    "dentista implantes viladecans",
    "clinica implantes viladecans",
    "implantes straumann viladecans",
    "implantes carga inmediata viladecans",
    "dientes en el dia viladecans",
    "sedacion consciente implantes",
  ],
  openGraph: {
    title: "Implantes Dentales en Viladecans | Especialistas Vela-Segalà",
    description:
      "Recupera tus dientes con implantes dentales de calidad premium. Dr. Xavier Vela, eminencia en implantología. +15 años de experiencia. Primera visita gratuita.",
    images: ["/images/implantes-dentales-viladecans.jpg"],
  },
};

export default function ImplantesDentalesPage() {
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
                name: "Implantes Dentales Viladecans",
                href: "/tratamientos/implantes-dentales-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                DR. XAVIER VELA · EMINENCIA EN IMPLANTOLOGÍA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Implantes Dentales en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed font-semibold">
                Recupera tus dientes perdidos con el mejor tratamiento de implantes dentales en Viladecans
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                La <strong>implantología</strong> es la mejor opción para reemplazar las piezas dentales perdidas y 
                <strong> no perder la función y la estética dental</strong>. En Clínicas Vela-Segalà, el <strong>Dr. Xavier Vela</strong>, 
                reconocido especialista en implantología, y su equipo médico te ayudarán a recuperar tu sonrisa.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border-2 border-black/5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-3xl font-bold text-black">+15 años</div>
                    <div className="text-xs text-slate-600">de experiencia</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black">98%</div>
                    <div className="text-xs text-slate-600">tasa de éxito</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-black" />
                    <strong>Primera visita y diagnóstico 3D gratuito</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-black" />
                    Dientes en el día - Carga inmediata
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-black" />
                    Implantes premium Straumann y Nobel Biocare
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-black" />
                    Sedación consciente disponible
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-black" />
                    Financiación sin intereses hasta 12 meses
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pedir-cita" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-2xl hover:shadow-xl hover:scale-105 transition-all">
                  Pedir Cita Gratuita
                </Link>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white border-2 border-black rounded-2xl hover:bg-black hover:text-white transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/implantes-dentales-viladecans.jpg"
                alt="Implantes Dentales en Viladecans - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* No es solo estética */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              No es solo estética
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Queremos ayudarte a <strong>recuperar la funcionalidad total de tu boca y frenar la degeneración de hueso</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Recupera tu sonrisa</h3>
              <p className="text-slate-600 text-sm">
                Restituimos tu sonrisa con resultados naturales y estéticos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Función masticatoria</h3>
              <p className="text-slate-600 text-sm">
                Recupera la capacidad de masticar y pronunciar con claridad
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Frena la pérdida ósea</h3>
              <p className="text-slate-600 text-sm">
                Evita la reabsorción ósea y mantén la estructura facial
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-slate-700 mb-6">
              Con el tiempo, la falta de dientes te provocará <strong>dificultades al masticar o al pronunciar palabras con claridad</strong> y 
              la reabsorción ósea avanzará inevitablemente.
            </p>
            <p className="text-xl font-bold text-black mb-6">
              Podemos solucionar esto con un tratamiento de implantes dentales en Viladecans.
            </p>
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
            >
              Pedir Cita Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios de los implantes */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Beneficios de los Implantes Dentales
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Función completa</h3>
              <p className="text-slate-600 text-sm">
                Recuperas la función masticatoria por completo al recuperar las piezas perdidas
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Estética natural</h3>
              <p className="text-slate-600 text-sm">
                Restituimos tu sonrisa con resultados indistinguibles de dientes naturales
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Protege tus dientes</h3>
              <p className="text-slate-600 text-sm">
                Los dientes naturales contiguos no se dañan ni se tallan
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Proceso sencillo</h3>
              <p className="text-slate-600 text-sm">
                Tratamiento rutinario e indoloro con anestesia local o sedación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de colocación - 5 pasos */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Así Colocamos un Implante Dental en Nuestra Clínica de Viladecans
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                number: "1",
                title: "Estudio previo en profundidad",
                description: "Diagnóstico dirigido por el Dr. Vela, eminencia en implantología. Realizamos un escáner 3D completo para visualizar la forma y tamaño del hueso.",
                icon: Microscope,
              },
              {
                number: "2",
                title: "Colocación del implante",
                description: "Es un proceso quirúrgico rutinario e indoloro con anestesia local. Duración: 30-60 minutos por implante.",
                icon: Drill,
              },
              {
                number: "3",
                title: "Cicatrización y cuidados",
                description: "Osteointegración del tornillo implantado con el hueso. Proceso natural que tarda 2-4 meses.",
                icon: Clock,
              },
              {
                number: "4",
                title: "Colocación de la corona",
                description: "Tu nuevo diente definitivo. Corona cerámica personalizada con estética y función perfecta.",
                icon: Smile,
              },
              {
                number: "5",
                title: "Revisiones periódicas",
                description: "Para garantizar el éxito a largo plazo. Verificamos el hueso, ajustes y la salud de la encía.",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-2xl">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2 flex items-center gap-3">
                    <step.icon className="w-6 h-6" />
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
            >
              Pedir Cita Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Análisis previo - Tecnología 3D */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Análisis Previo al Tratamiento
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Nuestra clínica cuenta con la más novedosa tecnología, que permite realizar un correcto{" "}
                <strong>diagnóstico con tecnología 3D</strong>. De esta forma podemos visualizar tanto la forma, 
                como el tamaño del hueso y de las futuras piezas.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                En <strong>Clínica Dental Vela-Segalà</strong>, el <strong>Dr. Vela</strong>, reconocido especialista en 
                implantología, analiza cada caso para ofrecer a nuestros pacientes el mejor tratamiento, siempre basándose 
                en numerosos estudios y aplicando las técnicas más innovadoras.
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Incluye en tu primera visita gratuita:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Escáner 3D completo (CBCT)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Planificación digital del tratamiento</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Presupuesto detallado sin compromiso</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Asesoramiento personalizado del Dr. Vela</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/tecnologia-dentista-viladecans.jpg"
                alt="Tecnología 3D para implantes dentales - Clínica Vela-Segalà"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dientes en el Día - Carga Inmediata */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/implantes-dentales-protesis-viladecans.jpg"
                alt="Implantes de carga inmediata - Dientes en el día"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                DIENTES EN EL DÍA
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Recupera tus Dientes en Menos de 24 Horas
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                <strong>Reemplazar uno o varios dientes de manera inmediata</strong> y recuperar la sonrisa en el día es posible 
                gracias a los <strong>implantes de carga inmediata</strong>, un proceso donde el implante dental se coloca en la 
                misma cita en la que se extrae el diente que se debe reemplazar.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                En nuestras clínicas dentales de Viladecans somos <strong>especialistas en implantes dentales inmediatos</strong>, 
                pudiendo colocar la prótesis el mismo día gracias a la cirugía orientada por ordenador.
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="font-bold text-lg mb-4">Ventajas de los implantes inmediatos:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Ahorro de tiempo:</strong> Dientes el mismo día</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Menos intervenciones:</strong> Todo en una sola cita</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Reduce la reabsorción ósea</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smile className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700"><strong>Sin esperas:</strong> Sonríe inmediatamente</span>
                  </div>
                </div>
              </div>

              <Link
                href="/pedir-cita"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-2xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Quiero Recuperar Mis Dientes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sedación Consciente */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                ¡ADIÓS AL MIEDO!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Sedación Consciente
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Como especialistas en el cuidado y la atención médica, comprendemos que este proceso pueda generar 
                miedo en algunas personas. Por eso ofrecemos la posibilidad de utilizar <strong>sedación intravenosa 
                para que el paciente esté relajado</strong> en todo momento.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                La sedación se lleva a cabo mediante fármacos sedantes que se introducen por vía intravenosa para{" "}
                <strong>controlar la ansiedad</strong> y que el paciente no sienta ningún tipo de miedo ni malestar.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                En las clínicas dentales Vela-Segalà de Viladecans contamos con <strong>expertos anestesistas</strong> que 
                harán que tu <strong>experiencia con nosotros sea agradable y satisfactoria</strong>.
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Beneficios de la sedación consciente:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Elimina el miedo y la ansiedad</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Proceso completamente indoloro</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Anestesista profesional presente</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                    <span className="text-slate-700">Recuperación rápida y sin efectos secundarios</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/visita-clinica-dental-viladecans.jpg"
                alt="Sedación consciente para implantes dentales"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resultados - Before/After */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
              CASOS REALES
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Casos Clínicos de Nuestro Tratamiento de Implantes Dentales en Viladecans
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Casos reales de pacientes tratados en nuestra clínica. Desliza el control para ver el antes y el después.
            </p>
          </div>

          {/* Grid de 2 columnas para los casos */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Caso 1 */}
            <div>
              <h3 className="text-xl font-bold text-black mb-3">
                Implantes en sector anterior y prótesis BOPT sobre implantes
              </h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Rehabilitación completa del sector anterior con implantes dentales y prótesis cerámica BOPT, 
                logrando resultados naturales y predecibles.
              </p>
              <BeforeAfterSlider
                beforeImage="/images/implantes-dentales-caso1-antes.jpg"
                afterImage="/images/implantes-dentales-caso1-despues.jpg"
                beforeLabel="ANTES"
                afterLabel="DESPUÉS"
              />
            </div>

            {/* Caso 2 */}
            <div>
              <h3 className="text-xl font-bold text-black mb-3">
                Rehabilitación con implantes
              </h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Tratamiento completo de implantología dental con resultados estéticos y funcionales excepcionales. 
                Rehabilitación total mediante implantes dentales premium.
              </p>
              <BeforeAfterSlider
                beforeImage="/images/implantes-dentales-caso2-antes.jpg"
                afterImage="/images/implantes-dentales-caso2-despues.jpg"
                beforeLabel="ANTES"
                afterLabel="DESPUÉS"
              />
            </div>
          </div>

          {/* CTA dentro de la sección de resultados */}
          <div className="mt-12 text-center bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Quieres resultados como estos?
            </h3>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Pide tu primera visita gratuita y te haremos un estudio personalizado con escáner 3D 
              para planificar tu tratamiento de implantes dentales.
            </p>
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Pedir Cita Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Implantes Dentales
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre implantes dentales en Viladecans.
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
          <Star className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por Qué Retrasar Más Tu Nueva Sonrisa?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Queremos ponerte fácil la decisión. Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental 
            de Viladecans y te haremos un estudio completo con escáner 3D, planificación digital y presupuesto detallado.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Especialistas en implantes dentales en Viladecans</strong> con más de 15 años de experiencia. 
            Más de 10.000 implantes colocados con éxito. Financiación sin intereses. Dientes en el día.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Financiación sin intereses • Garantía de por vida
          </p>
        </div>
      </section>
    </>
  );
}
