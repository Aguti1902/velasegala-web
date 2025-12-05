import Link from "next/link";
import { GraduationCap, Globe, Award, BookOpen } from "lucide-react";

export function BorgSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white text-black px-4 py-2 rounded-lg text-sm font-bold mb-4">
              CENTRO DE FORMACIÓN INTERNACIONAL
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              BORG Center Barcelona: Centro de Referencia Internacional
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Somos <strong>co-fundadores de BORG Center Barcelona</strong>, el centro de formación de referencia 
              internacional en implantología oral y técnicas BOPT. Desde 2005, dentistas de todo el mundo acuden 
              a nuestras instalaciones en Viladecans para aprender las <strong>técnicas más innovadoras en 
              odontología</strong>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              BORG es un espacio de investigación y divulgación donde colaboramos con las universidades y 
              profesionales más brillantes del sector odontológico. Nuestros cursos combinan teoría avanzada 
              con práctica clínica en pacientes reales, siempre supervisados por nuestros doctores.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4">
                <Globe className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">40+</div>
                <div className="text-sm text-gray-400">Países formados</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <GraduationCap className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">2000+</div>
                <div className="text-sm text-gray-400">Profesionales</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Award className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">18+</div>
                <div className="text-sm text-gray-400">Años formando</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <BookOpen className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold mb-1">100+</div>
                <div className="text-sm text-gray-400">Cursos anuales</div>
              </div>
            </div>

            <Link
              href="https://borgbcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Más sobre BORG Center
            </Link>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6">
              Socios Fundadores de BQDC
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Somos <strong>socios fundadores de BQDC</strong> (Barcelona Quality Dental Centers), asociación 
              que agrupa a las clínicas dentales de referencia en Barcelona que comparten valores de 
              <strong> ética profesional, procesos de calidad certificados y compromiso con la formación 
              continuada</strong>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Esta red de clínicas dentales de excelencia en Barcelona garantiza a nuestros pacientes de 
              Viladecans los más altos estándares de calidad en todos los tratamientos dentales, 
              respaldados por protocolos internacionales certificados.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Protocolos de calidad certificados internacionalmente</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Formación continua obligatoria de todo el equipo</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Auditorías de calidad periódicas externas</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Garantías extendidas en tratamientos de implantología</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


