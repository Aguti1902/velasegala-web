import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CLINIC_INFO, GENERAL_FAQS } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, Award, Users, Microscope, Shield, Calendar, CheckCircle, Activity, Drill, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Clínica Dental en Viladecans - Dentista de Confianza | Vela-Segalà",
  description:
    `Clínica dental en Viladecans con más de 15 años de experiencia. Especialistas en implantes dentales, ortodoncia invisible y estética dental. ${CLINIC_INFO.address.street}, 08840 Viladecans. Tel: ${CLINIC_INFO.phoneDisplay}. Primera visita gratuita.`,
  keywords: [
    "clínica dental viladecans",
    "dentista viladecans",
    "clínica dental en viladecans",
    "dentista en viladecans barcelona",
    "mejor clinica dental viladecans",
    "clinica dental viladecans vela segala",
  ],
  openGraph: {
    title: "Clínica Dental en Viladecans - Tu Dentista de Confianza",
    description:
      `Clínica dental especializada en Viladecans. Implantes, ortodoncia invisible, estética dental. Primera visita gratuita.`,
    images: ["/images/clinica-exterior.jpg"],
  },
};

export default function ClinicaPage() {
  return (
    <>
      <FAQSchema faqs={GENERAL_FAQS} />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ name: "Clínica Dental Viladecans", href: "/clinica-dental-viladecans" }]}
          />
          
          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                MÁS DE 25 AÑOS EN VILADECANS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Clínica Dental en Viladecans
              </h1>
              <p className="text-xl text-slate-700 mb-4 leading-relaxed">
                Somos una <strong>clínica dental de referencia internacional en Viladecans</strong>, dirigida por los 
                doctores <strong>Xavier Vela y Maribel Segalà</strong>, pioneros en técnica BOPT y co-fundadores del 
                BORG Center Barcelona.
              </p>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Nuestra <strong>clínica dental en Viladecans</strong> combina la práctica clínica de excelencia con la 
                docencia y la investigación. Nuestros doctores forman a profesionales de la odontología en todo el mundo, 
                imparten conferencias internacionales y colaboran con universidades de prestigio en proyectos de investigación 
                en implantología y estética dental.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Ubicados en <strong>{CLINIC_INFO.address.street}, 08840 Viladecans</strong>, ofrecemos tratamientos dentales 
                personalizados con tecnología de última generación. Somos tu <strong>dentista de confianza en Viladecans</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pedir-cita" className="btn-primary text-center">
                  Pedir Primera Visita Gratuita
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
                src="/images/cabina-dentista-viladecans-2.jpg"
                alt="Instalaciones Clínica Dental Vela-Segalà Viladecans"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores y Filosofía */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Nuestra Filosofía: Ética, Innovación y Formación Continua
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              En nuestra <strong>clínica dental de Viladecans</strong>, basamos nuestro trabajo en tres pilares fundamentales: 
              <strong> ética profesional, innovación tecnológica y formación continua</strong>. Estos valores nos han convertido 
              en una clínica de referencia tanto en Viladecans como a nivel internacional.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Como socios fundadores de <strong>BQDC (Barcelona Quality Dental Centers)</strong>, cumplimos con los más altos 
              estándares de calidad en odontología. Nuestros protocolos están certificados internacionalmente y nos sometemos a 
              auditorías de calidad periódicas para garantizar la excelencia en cada tratamiento dental que realizamos en Viladecans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Ética Profesional</h3>
              <p className="text-sm text-slate-600">
                Honestidad, transparencia y compromiso con tu salud dental
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg text-center">
              <Microscope className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Innovación</h3>
              <p className="text-sm text-slate-600">
                Tecnología de vanguardia y técnicas más avanzadas
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Formación</h3>
              <p className="text-sm text-slate-600">
                Actualización constante en las últimas técnicas odontológicas
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Equipo Experto</h3>
              <p className="text-sm text-slate-600">
                Especialistas certificados en cada área de la odontología
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NAP + Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            Información de Contacto - Clínica Dental Viladecans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-3">Dónde Estamos</h3>
              <p className="text-slate-700 leading-relaxed">
                <strong>{CLINIC_INFO.address.street}</strong>
                <br />
                {CLINIC_INFO.address.postalCode} {CLINIC_INFO.address.city}
                <br />
                {CLINIC_INFO.address.region}, España
              </p>
              <p className="text-sm text-slate-500 mt-3">
                Fácil acceso desde Gavà, Castelldefels, Sant Boi y Barcelona
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-3">Teléfono de Contacto</h3>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="text-black hover:underline font-bold text-xl block mb-2"
              >
                {CLINIC_INFO.phoneDisplay}
              </a>
              <p className="text-slate-600 text-sm">
                Llámanos para pedir cita o resolver tus dudas
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-3">Horario de Atención</h3>
              <p className="text-slate-700 font-medium mb-2">
                {CLINIC_INFO.hours.display}
              </p>
              <p className="text-slate-600 text-sm">
                Sábados y Domingos: Cerrado
              </p>
              <p className="text-slate-600 text-sm mt-2">
                Urgencias dentales: Consultar disponibilidad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Personalizados */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Tratamientos Personalizados para Cada Paciente
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              En nuestra clínica dental de Viladecans, <strong>ofrecemos soluciones odontológicas específicas para cada 
              paciente</strong> en función de su edad, patología dental y objetivos de tratamiento. No hay dos pacientes iguales, 
              por eso diseñamos planes de tratamiento totalmente personalizados.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Antes de iniciar cualquier tratamiento dental en Viladecans, realizamos un <strong>estudio completo de tu caso</strong> 
              que incluye radiografías digitales, escáner intraoral 3D, fotografías clínicas y análisis oclusal. Este diagnóstico 
              detallado nos permite planificar el mejor tratamiento para ti.
            </p>
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Tecnología Dental de Última Generación
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              Invertimos constantemente en <strong>tecnología odontológica de vanguardia</strong> para ofrecer a nuestros 
              pacientes de Viladecans tratamientos más precisos, predecibles y cómodos. Nuestra clínica dental cuenta con el 
              equipamiento más avanzado del sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Microscope className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Escáner Intraoral 3D</h3>
              <p className="text-slate-600 leading-relaxed">
                Toma de impresiones digitales sin molestias. Planificación precisa de tratamientos de ortodoncia, 
                implantes y prótesis dentales en 3D.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Activity className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Radiología Digital</h3>
              <p className="text-slate-600 leading-relaxed">
                Radiografías digitales con 90% menos radiación que sistemas convencionales. Diagnóstico inmediato 
                y más preciso.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Drill className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Cirugía Guiada por Ordenador</h3>
              <p className="text-slate-600 leading-relaxed">
                Planificación virtual de la cirugía de implantes. Máxima precisión, menor tiempo quirúrgico y 
                recuperación más rápida.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Microscope className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-3">Microscopio Dental</h3>
              <p className="text-slate-600 leading-relaxed">
                Para endodoncias y cirugías de máxima precisión. Amplificación hasta 25x para tratamientos 
                mínimamente invasivos.
              </p>
            </div>
          </div>

          <div className="bg-black text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Materiales Certificados de Máxima Calidad
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Utilizamos únicamente <strong>materiales dentales certificados de las mejores marcas internacionales</strong>: 
              implantes Straumann y Nobel Biocare, ortodoncia Invisalign, porcelanas alemanas y japonesas. Todos nuestros 
              materiales cuentan con certificación CE y garantías del fabricante.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Equipo de Dentistas Especializados en Viladecans
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              Nuestro equipo está formado por <strong>dentistas especialistas con formación universitaria específica</strong> 
              en cada área de la odontología. Todos ellos con certificaciones internacionales y en formación continua permanente.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Los doctores <strong>Xavier Vela y Maribel Segalà</strong> dirigen personalmente la clínica dental de Viladecans, 
              supervisando todos los tratamientos y asegurando los máximos estándares de calidad. Su reconocimiento internacional 
              garantiza que recibes atención de los mejores profesionales.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-100 relative">
                <Image
                  src="/images/doctor-xavier-vela.png"
                  alt="Dr. Xavier Vela - Implantólogo Viladecans"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">Dr. Xavier Vela</h3>
                <p className="text-slate-600 mb-3 font-medium">Co-director Clínica Viladecans</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Especialista en rehabilitaciones estéticas y prótesis sobre implantes. Pionero BOPT en España.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">Implantología</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">Estética</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-100 relative">
                <Image
                  src="/images/doctora-maribel-segala-1.png"
                  alt="Dra. Maribel Segalà - Especialista Implantes Viladecans"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">Dra. Maribel Segalà</h3>
                <p className="text-slate-600 mb-3 font-medium">Co-directora Clínica Viladecans</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Especialista en implantes dentales y cirugía. Autora de artículos científicos internacionales.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">Cirugía</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">Implantes</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                <Users className="w-20 h-20 text-slate-400" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-1">Equipo Multidisciplinar</h3>
                <p className="text-slate-600 mb-3 font-medium">Especialistas en cada área</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Ortodoncistas, periodoncistas, endodoncistas, odontopediatras, cirujanos e higienistas.
                </p>
                <Link href="/equipo" className="text-sm font-bold hover:underline">
                  Ver equipo completo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instalaciones */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Instalaciones Modernas en Viladecans
            </h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              Nuestra <strong>clínica dental en Viladecans</strong> dispone de instalaciones amplias, modernas y perfectamente 
              equipadas. Espacios diseñados pensando en tu comodidad y en ofrecer los tratamientos dentales más avanzados.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Contamos con <strong>6 gabinetes dentales completamente equipados</strong>, sala de radiología digital 3D, 
              sala de esterilización con autoclave de última generación, laboratorio propio de prótesis dental y salas de 
              espera amplias y confortables con tecnología de última generación.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recepción */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-black mb-4">Recepción</h3>
              <p className="text-slate-600 mb-4 text-sm">Sala de Espera</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/recepcion-clinica-viladecans.jpg"
                    alt="Recepción Clínica Vela-Segalà Viladecans"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/recepcion-clinica-viladecans-2.jpg"
                    alt="Sala de espera Clínica Dental Viladecans"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/recepcion-clinica-viladecans-3.jpg"
                    alt="Recepción dentista Viladecans"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Gabinetes */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-black mb-4">Gabinetes</h3>
              <p className="text-slate-600 mb-4 text-sm">6 Salas de Tratamiento</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/cabina-dentista-viladecans-4.jpg"
                    alt="Gabinete dental Viladecans"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/cabina-dentista-viladecans-2.jpg"
                    alt="Sala de tratamiento dental"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/cabina-dentista-viladecans.jpg"
                    alt="Cabina dental equipada"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/cabina-dentista-viladecans-5.jpg"
                    alt="Gabinete dental moderno"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/cabina-dentista-viladecans-3.jpg"
                    alt="Sala tratamiento Viladecans"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/cabina-dentista-viladecans-6.jpg"
                    alt="Gabinete dental completo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Tecnología */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-black mb-4">Tecnología</h3>
              <p className="text-slate-600 mb-4 text-sm">Equipamiento Avanzado</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/visita-clinica-dental-viladecans-6.jpg"
                    alt="Tecnología dental avanzada"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/visita-clinica-dental-viladecans-3.jpg"
                    alt="Equipamiento dental moderno"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/visita-clinica-dental-viladecans-9.jpg"
                    alt="Tecnología dental Viladecans"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md relative">
                  <Image
                    src="/images/tecnologia-dentista-viladecans.jpg"
                    alt="Equipos dentales última generación"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Médico - Directores */}
      <section className="relative py-20 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/clinica-vela-segala-expertos-denstistas.png"
            alt="Clínica Vela-Segalà Viladecans"
            fill
            className="object-cover"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-black/90 to-gray-900/95"></div>
        </div>

        {/* Contenido */}
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Dr. Xavier Vela */}
            <div className="text-center">
              <div className="w-80 h-80 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/images/doctor-xavier-vela.png"
                  alt="Dr. Xavier Vela"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Dr. Xavi Vela</h3>
              <div className="w-16 h-0.5 bg-white mx-auto mb-4"></div>
              <p className="text-gray-300 text-sm mb-2">Número de colegiado: 2247 Odontólogo | 26347 Médico</p>
              <p className="text-gray-400 text-sm">Implantología y estética. Director Clínicas Vela-Segalà</p>
            </div>

            {/* Dra. Maribel Segalà */}
            <div className="text-center">
              <div className="w-80 h-80 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/images/doctora-maribel-segala-1.png"
                  alt="Dra. Maribel Segalà"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Dra. Maribel Segalà</h3>
              <div className="w-16 h-0.5 bg-white mx-auto mb-4"></div>
              <p className="text-gray-300 text-sm mb-2">Número de colegiado: 1379 Odontólogo | 19608 Médico</p>
              <p className="text-gray-400 text-sm">Implantología y prótesis. Directora Clínicas Vela-Segalà</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Médico */}
      <section className="section-padding bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container-custom">
          {/* Equipo médico */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Equipo médico</h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Nuria-casellas-endoncia.jpg"
                    alt="Dra. Núria Casellas"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Núria Casellas</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 65809</p>
                <p className="text-sm text-gray-300">Endodoncia</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Marielys-Garciia-Generalista.jpg"
                    alt="Dra. Marielys García"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Marielys García</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 4866</p>
                <p className="text-sm text-gray-300">Odontología general</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Aurea-Almeida-generalista.jpg"
                    alt="Dra. Aurea Almeida"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Aurea Almeida</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 8688</p>
                <p className="text-sm text-gray-300">Odontología general</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dr-Luis-Carlos-Garza-estetica-dental.jpg"
                    alt="Dr. Luis Carlos Garza"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dr. Luis Carlos Garza</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 8255</p>
                <p className="text-sm text-gray-300">Estética Dental</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dr-Albert-Ferre-Periodoncista.jpg"
                    alt="Dr. Albert Ferré"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dr. Albert Ferré</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado</p>
                <p className="text-sm text-gray-300">Periodoncia</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Angeles-Pias-ortodoncia.jpg"
                    alt="Dra. Ángeles Pias"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Ángeles Pias</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 743-XI</p>
                <p className="text-sm text-gray-300">Ortodoncia</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Eva-Pleguezuelos-Odontopediatra-1.jpg"
                    alt="Dra. Eva Pleguezuelos"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Eva Pleguezuelos</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 2791</p>
                <p className="text-sm text-gray-300">Odontopediatría</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dr-Matias-Del-Rio-Ortodoncia.jpg"
                    alt="Dr. Matías Del Río"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dr. Matías Del Río</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 8893</p>
                <p className="text-sm text-gray-300">Ortodoncia</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/patricia-freire-equipo-clinica-vela-segala.webp"
                    alt="Dra. Patricia Freire"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Patricia Freire</h4>
                <p className="text-sm text-gray-400 mb-1">Número de colegiado: 36001641</p>
                <p className="text-sm text-gray-300">Estética dental y Rehabilitadora</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Estibaliz-Azpeitia-Anestesista.jpg"
                    alt="Dra. Estibaliz Azpeitia"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Estibaliz Azpeitia</h4>
                <p className="text-sm text-gray-400 mb-1">Anestesista</p>
                <p className="text-sm text-gray-300">Anestesista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dr-Alberto-Sanchez-anestesista.jpg"
                    alt="Dr. Alberto Sánchez"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dr. Alberto Sánchez</h4>
                <p className="text-sm text-gray-400 mb-1">Anestesista</p>
                <p className="text-sm text-gray-300">Anestesista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/dra-Alejandra-Prieto-Anestesista.jpg"
                    alt="Dra. Alejandra Prieto"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Dra. Alejandra Prieto</h4>
                <p className="text-sm text-gray-400 mb-1">Anestesista</p>
                <p className="text-sm text-gray-300">Anestesista</p>
              </div>
            </div>
          </div>

          {/* Higienistas y Administración */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Higienistas y Administración</h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-12"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Olga-Garcia-Higienista.jpg"
                    alt="Olga García"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Olga García</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Leticia-Garcia-Higienista.jpg"
                    alt="Leticia García"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Leticia García</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Elisabeth-Higienista.jpg"
                    alt="Elisabet López"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Elisabet López</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Lourdes-Valdelvira-Higienista.jpg"
                    alt="Lourdes Valdelvira"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Lourdes Valdelvira</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Paula-Sirvent-Higienista.jpg"
                    alt="Paula-Sirvent"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Paula-Sirvent</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Nawal-Ziani-Higienista.jpg"
                    alt="Nawal Ziani"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Nawal Ziani</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Emma-Pelaez-Higienista.jpg"
                    alt="Emma Pelaez"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Emma Pelaez</h4>
                <p className="text-sm text-gray-300">Higienista</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Maria-Teresa-Aymar-Auxiliar.jpg"
                    alt="Mª Teresa Aymar"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Mª Teresa Aymar</h4>
                <p className="text-sm text-gray-300">Auxiliar de Clínica</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/Juani-Gallardo-Recepcion.jpg"
                    alt="Juani Gallardo"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Juani Gallardo</h4>
                <p className="text-sm text-gray-300">Recepción</p>
              </div>

              <div className="text-center">
                <div className="aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-4 relative">
                  <Image
                    src="/images/sonia-mas-recepcion.jpg"
                    alt="Sonia Mas"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg mb-1">Sonia Mas</h4>
                <p className="text-sm text-gray-300">Recepción</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegir Vela-Segalà Viladecans */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              ¿Por Qué Elegir Vela-Segalà Viladecans?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Estas son las razones por las que <strong>miles de familias de Viladecans</strong> confían en nuestra 
              clínica dental para el cuidado de su salud bucodental.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Award className="w-6 h-6" />,
                title: "Referencia Internacional",
                text: "Clínica dental de referencia con doctores que forman a profesionales de todo el mundo"
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Más de 25 Años en Viladecans",
                text: "Desde 1992 cuidando de la salud dental de familias en Viladecans y Barcelona"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Pioneros Técnica BOPT",
                text: "Únicos en Viladecans con técnica BOPT para rehabilitaciones estéticas naturales"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Equipo de Especialistas",
                text: "Cada tratamiento lo realiza un especialista certificado en esa disciplina"
              },
              {
                icon: <Microscope className="w-6 h-6" />,
                title: "Tecnología Avanzada",
                text: "Escáner 3D, cirugía guiada, microscopio dental y radiología digital"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Garantías Extendidas",
                text: "Garantías de por vida en implantes dentales. Respaldo de fabricantes internacionales"
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa */}
      {/* FAQs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
              Preguntas Frecuentes sobre Nuestra Clínica Dental
            </h2>
            <p className="text-center text-slate-600 mb-8">
              Resolvemos las dudas más habituales sobre nuestros servicios dentales en Viladecans.
            </p>
            <div className="space-y-4">
              {GENERAL_FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl p-6 group shadow-md"
                >
                  <summary className="font-bold text-lg text-black cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de Google Maps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Cómo Llegar a Nuestra Clínica Dental en Viladecans
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            Estamos en <strong>{CLINIC_INFO.address.street}, {CLINIC_INFO.address.postalCode} {CLINIC_INFO.address.city}</strong>, 
            con fácil acceso en coche, transporte público (Renfe Cercanías) y aparcamiento cercano gratuito.
          </p>
          
          <div className="rounded-3xl overflow-hidden shadow-xl mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.1234567890123!2d2.013021315674367!3d41.31429967927362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4990c1234567%3A0xabcdef1234567890!2sCarrer%20de%20la%20Mare%20de%20D%C3%A9u%20de%20Sales%2C%2067%2C%2008840%20Viladecans%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1638888888888!5m2!1ses!2ses"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Clínica Dental Vela-Segalà Viladecans"
            ></iframe>
          </div>
          
          <div className="text-center">
            <a
              href="https://maps.app.goo.gl/UHo15sKZYEH34pe76"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <MapPin className="w-5 h-5" />
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visita Nuestra Clínica Dental en Viladecans
          </h2>
          <p className="text-xl mb-4 text-gray-200 max-w-2xl mx-auto">
            Ven a conocernos sin compromiso. <strong>Primera visita totalmente gratuita</strong> con exploración completa, 
            diagnóstico profesional y presupuesto detallado.
          </p>
          <p className="text-base mb-8 text-gray-300 max-w-2xl mx-auto">
            Estamos en {CLINIC_INFO.address.street}, en el corazón de Viladecans. Más de 15 años siendo tu dentista 
            de confianza en Viladecans, Barcelona.
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
        </div>
      </section>
    </>
  );
}
