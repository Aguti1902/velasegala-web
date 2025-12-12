import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Drill, CheckCircle, Clock, Shield, Award, Calendar, Users, Microscope, Activity, ChevronRight, Phone, MapPin } from "lucide-react";
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
      "No, el procedimiento se realiza con anestesia local efectiva, por lo que no sentirás dolor durante la colocación del implante. Después de la cirugía puede haber molestias leves durante 2-3 días que se controlan perfectamente con analgésicos comunes como ibuprofeno. La mayoría de nuestros pacientes en Viladecans nos dicen que fue mucho más fácil y menos doloroso de lo que esperaban.",
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
];

export const metadata: Metadata = {
  title: "Implantes Dentales en Viladecans | Especialistas Vela-Segalà",
  description:
    `Implantes dentales en Viladecans. Especialistas con +15 años de experiencia. Marcas premium Straumann y Nobel Biocare. Primera visita gratuita. Financiación sin intereses. Clínica Vela-Segalà Viladecans.`,
  keywords: [
    "implantes dentales viladecans",
    "implantología dental viladecans",
    "precio implantes dentales viladecans",
    "cuanto cuesta un implante dental en viladecans",
    "implantes dentales baratos viladecans",
    "clinica implantes viladecans",
    "implantes straumann viladecans",
    "implantes nobel biocare viladecans",
  ],
  openGraph: {
    title: "Implantes Dentales en Viladecans | Especialistas Vela-Segalà",
    description:
      "Recupera tus dientes con implantes dentales de calidad premium. Especialistas con +15 años. Primera visita gratuita y financiación sin intereses.",
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
                IMPLANTOLOGÍA DENTAL AVANZADA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Implantes Dentales en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Recupera la funcionalidad y estética de tus dientes con{" "}
                <strong>implantes dentales de última generación en Viladecans</strong>. Los doctores Xavier Vela 
                y Maribel Segalà, especialistas con más de 15 años de experiencia, dirigen personalmente todos los 
                tratamientos de implantología.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Somos <strong>pioneros en España en la técnica BOPT para implantes dentales</strong>, que permite 
                resultados más naturales y predecibles. Utilizamos únicamente <strong>implantes premium Straumann 
                y Nobel Biocare</strong> con más del 98% de éxito y garantía de por vida.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Duración del tratamiento
                  </div>
                  <div className="text-3xl font-bold text-black">
                    3-6 meses
                  </div>
                  <div className="text-xs text-slate-500">Proceso completo</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Financiación sin intereses hasta 12 meses
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita y diagnóstico 3D gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Implantes premium Straumann y Nobel Biocare
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Garantía de por vida en implantes
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

      {/* Qué son los implantes */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿Qué son los Implantes Dentales?
          </h2>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            Los <strong>implantes dentales</strong> son raíces artificiales de titanio biocompatible que se insertan 
            en el hueso maxilar o mandibular para sustituir dientes perdidos o ausentes. Sobre estos implantes se coloca 
            una corona o prótesis que imita perfectamente el aspecto, función y sensación de un diente natural.
          </p>
          <p className="text-lg text-slate-700 mb-4 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> utilizamos <strong>implantes dentales de marcas 
            líderes mundiales</strong> como Straumann (Suiza), Nobel Biocare (Suecia) y Zimmer (EEUU), que ofrecen las 
            mayores tasas de éxito (superiores al 98%), la mejor osteointegración y durabilidad certificada con estudios 
            científicos de más de 30 años de seguimiento.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Los doctores <strong>Xavier Vela y Maribel Segalà</strong> son especialistas en implantología dental con 
            certificación internacional y pioneros en España en la aplicación de la <strong>técnica BOPT</strong> 
            (Biologically Oriented Preparation Technique) para implantes, que permite resultados estéticos mucho más 
            naturales y predecibles a largo plazo.
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4">Tipos de Implantes Dentales que Realizamos</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Implantes Unitarios
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Para reemplazar un único diente perdido sin afectar a los dientes adyacentes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Implantes Múltiples
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Para reemplazar varios dientes perdidos con puentes sobre implantes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Implantes de Arcada Completa
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  All-on-4 o All-on-6 para rehabilitar toda una arcada con solo 4-6 implantes.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Implantes Inmediatos
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Colocación del implante el mismo día de la extracción dental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Ventajas de los Implantes Dentales en Viladecans
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Los implantes dentales son la mejor solución para reemplazar dientes perdidos. Estas son las principales 
            ventajas de elegir implantes frente a otras alternativas como puentes o prótesis removibles.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Misma Función que un Diente Natural",
                description:
                  "Podrás comer, hablar y sonreír con total normalidad y confianza. Los implantes se integran con el hueso y funcionan exactamente igual que tus dientes naturales.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Resultado Estético Perfecto",
                description:
                  "Nadie notará que llevas un implante dental. Con la técnica BOPT conseguimos que el implante y la corona se integren perfectamente con el resto de tu sonrisa de forma totalmente natural.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Preserva el Hueso Maxilar",
                description:
                  "Los implantes dentales evitan la reabsorción ósea que ocurre cuando falta un diente. Mantienen la estructura facial y previenen el envejecimiento prematuro del rostro.",
              },
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "Duran Toda la Vida",
                description:
                  "Con cuidados adecuados y revisiones anuales en nuestra clínica de Viladecans, los implantes pueden durar para siempre. Tasa de éxito superior al 98%.",
              },
              {
                icon: <CheckCircle className="w-10 h-10" />,
                title: "No Afecta Dientes Vecinos",
                description:
                  "A diferencia de los puentes dentales tradicionales, no hay que tallar ni dañar los dientes sanos adyacentes. Los implantes son independientes.",
              },
              {
                icon: <Microscope className="w-10 h-10" />,
                title: "Tecnología Avanzada",
                description:
                  "Utilizamos escáner intraoral 3D, TAC dental, cirugía guiada por ordenador y técnica BOPT para máxima precisión y resultados predecibles.",
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
            Proceso del Tratamiento de Implantes Dentales en Viladecans
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Te explicamos paso a paso cómo es el proceso completo de colocación de implantes dentales en nuestra 
            clínica de Viladecans. Transparencia total en cada fase del tratamiento.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "1",
                icon: <Calendar className="w-6 h-6" />,
                title: "Primera Visita Gratuita y Estudio Completo",
                description:
                  "Evaluamos tu caso con radiografías digitales, TAC dental 3D y escáner intraoral. Planificamos tu tratamiento de forma virtual y te mostramos el resultado final antes de empezar. Te explicamos todo el proceso y te damos un presupuesto detallado sin compromiso. También evaluamos si es necesario injerto de hueso o elevación de seno maxilar.",
              },
              {
                step: "2",
                icon: <Drill className="w-6 h-6" />,
                title: "Colocación del Implante Dental",
                description:
                  "Con anestesia local efectiva, insertamos el implante de titanio en el hueso mediante cirugía mínimamente invasiva. Utilizamos cirugía guiada por ordenador para máxima precisión. La intervención dura entre 30-60 minutos por implante y es totalmente indolora. En casos de implantes inmediatos, extraemos el diente y colocamos el implante en la misma sesión.",
              },
              {
                step: "3",
                icon: <Clock className="w-6 h-6" />,
                title: "Osteointegración (2-4 meses)",
                description:
                  "El implante se integra progresivamente con el hueso maxilar o mandibular. Este proceso de osteointegración dura entre 2-4 meses dependiendo de la calidad del hueso. Durante este tiempo llevas una prótesis provisional estética para que no notes la falta del diente. Hacemos seguimiento con revisiones periódicas.",
              },
              {
                step: "4",
                icon: <Award className="w-6 h-6" />,
                title: "Colocación de la Corona Definitiva",
                description:
                  "Una vez integrado el implante dental completamente, tomamos medidas digitales con escáner 3D y fabricamos tu corona personalizada de porcelana o zirconio en nuestro laboratorio colaborador. La corona se diseña específicamente para tu boca, imitando el color, forma y translucidez de tus dientes naturales. La colocamos y ajustamos perfectamente tu oclusión.",
              },
              {
                step: "5",
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Revisiones Periódicas y Mantenimiento",
                description:
                  "Hacemos seguimiento a largo plazo para asegurar el éxito del implante dental. Recomendamos una revisión cada 6-12 meses en nuestra clínica de Viladecans, donde comprobamos el estado del implante, realizamos limpieza profesional y radiografías de control. El mantenimiento es clave para la durabilidad de tus implantes.",
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

      {/* Marcas de Implantes */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">
            Implantes Dentales de Marcas Premium
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            En nuestra clínica dental de Viladecans trabajamos únicamente con las mejores marcas de implantes dentales 
            del mundo, con estudios científicos que avalan su éxito a largo plazo.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold mb-2">Straumann</div>
              <div className="text-sm text-slate-600 mb-4">Suiza - Líder Mundial</div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Implantes premium con la mayor tasa de éxito del mercado. Superficie SLA para osteointegración rápida.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold mb-2">Nobel Biocare</div>
              <div className="text-sm text-slate-600 mb-4">Suecia - 60 años</div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Pioneros en implantología. Implantes con conexión cónica para máxima estabilidad a largo plazo.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold mb-2">Zimmer</div>
              <div className="text-sm text-slate-600 mb-4">EEUU - Premium</div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Superficie Trabecular Metal para osteointegración acelerada. Ideales para hueso de baja densidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos Especiales */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Soluciones para Casos Complejos de Implantes
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra clínica dental de Viladecans somos especialistas en <strong>casos complejos de implantología</strong>. 
            Si te han dicho que no tienes suficiente hueso o que tu caso es complicado, te recomendamos una segunda opinión con 
            nuestros especialistas.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Injertos de Hueso y Regeneración Ósea Guiada</h3>
              <p className="text-slate-700 leading-relaxed">
                Cuando no hay suficiente hueso para colocar implantes, realizamos <strong>injertos de hueso</strong> autólogo o 
                biomaterial con técnicas de regeneración ósea guiada (ROG). Utilizamos membranas reabsorbibles y biomateriales 
                de última generación. En 4-6 meses tendrás el hueso necesario para tus implantes dentales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Elevación de Seno Maxilar</h3>
              <p className="text-slate-700 leading-relaxed">
                Para casos de poco hueso en la zona posterior del maxilar superior, realizamos <strong>elevación de seno 
                maxilar</strong> mediante técnicas mínimamente invasivas. Esto permite colocar implantes dentales en zonas donde 
                parecía imposible. Técnica con tasa de éxito superior al 95%.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Implantes Zigomáticos</h3>
              <p className="text-slate-700 leading-relaxed">
                Para casos de <strong>atrofia severa del maxilar superior</strong>, utilizamos implantes zigomáticos que se anclan 
                en el hueso cigomático (pómulo). Solución sin injertos para rehabilitar el maxilar completo de forma fija.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados - Before/After */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-bold mb-4">
              CASOS REALES
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Resultados de nuestro tratamiento de implantes dentales en Viladecans
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
                Caso 1: Implantes en sector anterior y prótesis BOPT sobre implantes
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
                Caso 2: Rehabilitación con implantes
              </h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Tratamiento completo de implantología dental con resultados estéticos y funcionales excepcionales.
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
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Recuperar tu Sonrisa con Implantes Dentales?
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans y te haremos un 
            estudio completo con escáner 3D, planificación digital y presupuesto detallado.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Especialistas en implantes dentales en Viladecans</strong> con más de 15 años de experiencia. 
            Más de 10.000 implantes colocados con éxito. Financiación sin intereses.
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
