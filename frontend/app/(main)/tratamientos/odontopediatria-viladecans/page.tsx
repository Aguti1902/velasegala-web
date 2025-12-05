import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO } from "@/lib/constants";
import { Baby, CheckCircle, Clock, Shield, Award, Heart, Users, Smile, ChevronRight, Phone, MapPin } from "lucide-react";

const TREATMENT_FAQS = [
  {
    question: "¿A qué edad debo llevar a mi hijo al dentista por primera vez?",
    answer:
      "Recomendamos la primera visita al dentista cuando aparece el primer diente de leche o como máximo al cumplir el primer año de edad. En nuestra clínica de Viladecans realizamos revisiones preventivas para bebés y niños, enseñamos técnicas de higiene oral adaptadas a cada edad y detectamos problemas a tiempo.",
  },
  {
    question: "¿Es necesario tratar las caries en dientes de leche?",
    answer:
      "Sí, es fundamental tratar las caries en dientes de leche aunque se vayan a caer. Los dientes temporales mantienen el espacio para los dientes definitivos, permiten masticar correctamente y son importantes para el desarrollo del habla. Una caries no tratada puede causar dolor, infección y afectar al diente permanente que está debajo.",
  },
  {
    question: "¿Cómo puedo prevenir las caries en mi hijo?",
    answer:
      "Para prevenir caries infantiles: cepilla los dientes de tu hijo dos veces al día con pasta fluorada, limita el consumo de azúcares y bebidas azucaradas, evita el biberón nocturno con leche o zumos, y trae a tu hijo a revisiones cada 6 meses en nuestra clínica de Viladecans. También aplicamos selladores de fosas y fisuras en molares para protegerlos.",
  },
  {
    question: "¿Qué hago si mi hijo tiene miedo al dentista?",
    answer:
      "En nuestra clínica dental de Viladecans estamos especializados en odontopediatría y creamos un ambiente adaptado para niños. Utilizamos técnicas de manejo de conducta infantil, explicamos todo con vocabulario adaptado y hacemos que la visita sea una experiencia positiva. La primera visita suele ser solo de exploración y familiarización sin tratamientos invasivos.",
  },
  {
    question: "¿A qué edad salen los dientes definitivos?",
    answer:
      "Los primeros dientes definitivos suelen aparecer alrededor de los 6 años (primeros molares e incisivos centrales inferiores). El recambio dental completo ocurre entre los 6 y 12 años aproximadamente. Las muelas del juicio aparecen entre los 17 y 15 años. En las revisiones en Viladecans controlamos que la erupción sea correcta.",
  },
  {
    question: "¿Ofrecen tratamientos de ortodoncia para niños?",
    answer:
      "Sí, realizamos ortodoncia interceptiva para niños de 6-12 años que permite corregir problemas de crecimiento óseo, mordida cruzada, paladar estrecho o hábitos como chuparse el dedo. También ortodoncia con brackets o Invisalign Teen para adolescentes. La primera evaluación ortodóncica se recomienda a los 6-7 años.",
  },
];

export const metadata: Metadata = {
  title: "Odontopediatría en Viladecans | Dentista para Niños",
  description:
    "Odontopediatría en Viladecans. Dentista especializado en niños y bebés. Ambiente adaptado y técnicas específicas. Primera visita gratuita. Prevención de caries infantil. Clínica Vela-Segalà.",
  keywords: [
    "odontopediatría viladecans",
    "dentista infantil viladecans",
    "dentista para niños viladecans",
    "dentista bebés viladecans",
    "caries infantil viladecans",
    "odontopediatra viladecans",
  ],
  openGraph: {
    title: "Odontopediatría en Viladecans | Dentista para Niños",
    description:
      "Cuidado dental especializado para niños y bebés. Ambiente adaptado y técnicas específicas. Primera visita gratuita.",
    images: ["/images/odontopediatria-viladecans.jpg"],
  },
};

export default function OdontopediatriaPage() {
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
                name: "Odontopediatría Viladecans",
                href: "/tratamientos/odontopediatria-viladecans",
              },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                ODONTOPEDIATRÍA ESPECIALIZADA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Odontopediatría en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Cuidado dental especializado para <strong>bebés, niños y adolescentes en Viladecans</strong>. 
                Nuestro equipo de odontopediatría tiene amplia experiencia en el tratamiento de los más pequeños 
                con técnicas adaptadas a cada edad.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Creamos <strong>experiencias positivas</strong> para que tus hijos cuiden su salud dental desde 
                pequeños. Ambiente adaptado, vocabulario infantil y técnicas de manejo de conducta para niños 
                con miedo al dentista.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Primera visita recomendada
                  </div>
                  <div className="text-3xl font-bold text-black">
                    1 año
                  </div>
                  <div className="text-xs text-slate-500">O cuando aparece el primer diente</div>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Primera visita gratuita para niños
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Ambiente adaptado para los más pequeños
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Prevención de caries infantil
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Selladores y fluorización
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
                src="/images/odontopediatria-viladecans.jpg"
                alt="Odontopediatría en Viladecans - Dentista para Niños - Clínica Vela-Segalà"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Tratamientos de Odontopediatría en Viladecans
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            En nuestra <strong>clínica dental de Viladecans</strong> ofrecemos todos los tratamientos dentales 
            para bebés, niños y adolescentes con técnicas específicas de odontopediatría.
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Prevención y Revisiones Infantiles
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Revisiones cada 6 meses para detectar caries a tiempo, aplicación de flúor tópico para fortalecer 
                el esmalte, selladores de fosas y fisuras en molares, enseñanza de técnicas de cepillado adaptadas 
                a cada edad y consejos dietéticos para prevenir caries.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Tratamiento de Caries Infantil
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Obturaciones (empastes) con composite del color del diente, pulpotomías y pulpectomías (tratamiento 
                de conductos en dientes de leche), coronas pediátricas de zirconio o metálicas para molares muy 
                dañados. Siempre con anestesia local efectiva y técnicas mínimamente invasivas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Ortodoncia Interceptiva
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Ortodoncia temprana (6-12 años) para corregir problemas de crecimiento óseo, mordida cruzada, 
                paladar estrecho, prognatismo o retrognatismo. Aparatos removibles, expansores palatinos, 
                mantenedores de espacio. Previene problemas mayores en la adolescencia.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Baby className="w-6 h-6" />
                Odontología para Bebés
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Revisiones desde el primer año de vida, prevención de caries del biberón, frenectomía labial o 
                lingual si es necesario, consejos sobre dentición y erupción dental, manejo del dolor durante la 
                salida de los dientes de leche.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Smile className="w-6 h-6" />
                Traumatismos Dentales
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Atención urgente para dientes rotos, fracturados o avulsionados (salidos completamente) por golpes 
                o caídas. Reimplantación dental, ferulización, reconstrucciones estéticas. Es fundamental acudir 
                inmediatamente tras el traumatismo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
            Por Qué Elegir Nuestra Odontopediatría en Viladecans
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Experiencia con Niños",
                description:
                  "Nuestro equipo tiene amplia experiencia en el tratamiento de bebés, niños y adolescentes. Conocemos las técnicas específicas de manejo de conducta infantil.",
              },
              {
                icon: <Smile className="w-10 h-10" />,
                title: "Ambiente Adaptado",
                description:
                  "Clínica con ambiente acogedor y adaptado para los más pequeños. Vocabulario infantil, explicaciones adaptadas a cada edad y experiencias positivas.",
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Prevención desde Pequeños",
                description:
                  "Enfoque preventivo para evitar caries y problemas futuros. Enseñamos hábitos de higiene oral desde la primera infancia. Selladores y fluorización.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Padres Informados",
                description:
                  "Explicamos todo a los padres: desarrollo dental, técnicas de cepillado, alimentación saludable, prevención de caries. Consejos personalizados para cada familia.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Tecnología Avanzada",
                description:
                  "Radiografías digitales con mínima radiación, anestesia local efectiva, materiales biocompatibles y estéticos. Tratamientos mínimamente invasivos.",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Sin Miedo al Dentista",
                description:
                  "Creamos experiencias positivas para que los niños no tengan miedo al dentista. Primera visita de familiarización sin tratamientos invasivos.",
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

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preguntas Frecuentes sobre Odontopediatría
          </h2>
          <p className="text-center text-slate-600 mb-8">
            Resolvemos las dudas más habituales sobre odontopediatría en Viladecans.
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
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container-custom text-center">
          <Baby className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cuida la Salud Dental de tus Hijos desde Pequeños
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Pide tu <strong>primera visita gratuita</strong> en nuestra clínica dental de Viladecans. 
            Revisión completa y consejos personalizados para la salud bucodental de tu hijo.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            <strong>Odontopediatría especializada en Viladecans</strong>. Ambiente adaptado para niños. 
            Prevención de caries infantil desde el primer año.
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
            {CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} • Primera visita gratuita • Ambiente adaptado
          </p>
        </div>
      </section>
    </>
  );
}

