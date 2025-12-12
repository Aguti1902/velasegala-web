import Link from "next/link";
import { CLINIC_INFO } from "@/lib/constants";
import { Calendar, Award, Shield } from "lucide-react";
import VideoPlayer from "@/components/ui/VideoPlayer";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
              CENTRO DE REFERENCIA INTERNACIONAL
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Clínica Dental de Referencia en{" "}
              <span className="underline decoration-4">Viladecans</span>
            </h1>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              <strong>Clínica dental en Viladecans</strong> con más de 15 años de experiencia internacional en implantología 
              y estética dental. Los <strong>doctores Xavier Vela y Maribel Segalà</strong> dirigen nuestro equipo de especialistas.
            </p>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Pioneros en la <strong>técnica BOPT en España</strong> y co-fundadores del <strong>BORG Center Barcelona</strong>. 
              Especialistas en <strong>implantes dentales en Viladecans, ortodoncia invisible, estética dental, prótesis sobre implantes, 
              periodoncia, odontopediatría y cirugía oral</strong>. Tratamientos personalizados y <strong>primera visita gratuita</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pedir-cita" className="btn-primary text-center">
                Pedir Cita Gratuita
              </Link>
              <Link
                href="/clinica-dental-viladecans"
                className="btn-secondary text-center"
              >
                Conocer la Clínica
              </Link>
            </div>

            {/* Destacados */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <Calendar className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold text-black mb-1">
                  {new Date().getFullYear() - parseInt(CLINIC_INFO.founded)}+
                </div>
                <div className="text-sm text-slate-700 font-medium">Años de Experiencia</div>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <Award className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold text-black mb-1">
                  4.9/5
                </div>
                <div className="text-sm text-slate-700 font-medium">
                  Valoración Pacientes
                </div>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 mb-2" />
                <div className="text-3xl font-bold text-black mb-1">
                  100%
                </div>
                <div className="text-sm text-slate-700 font-medium">
                  Garantía Tratamientos
                </div>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden relative">
              <VideoPlayer
                src="/videos/VelaSegala_2024_Edit.mp4"
                poster="/images/instalaciones-vela-segala.webp"
                autoPlay={true}
                loop={true}
                muted={true}
                className="w-full h-full"
              />
            </div>
            {/* Badge flotante */}
            <div className="absolute -bottom-4 -left-4 bg-black text-white shadow-2xl p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10" />
                <div>
                  <div className="font-bold text-lg">
                    Primera Visita
                  </div>
                  <div className="text-sm font-medium">
                    100% Gratuita
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

