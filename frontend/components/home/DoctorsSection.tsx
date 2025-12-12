import Link from "next/link";
import Image from "next/image";
import { Award, GraduationCap, Users } from "lucide-react";

export function DoctorsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Doctores de Referencia Internacional
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Los <strong>doctores Xavier Vela y Maribel Segalà</strong> dirigen nuestra clínica con más de 15 años 
            de experiencia. Pioneros en técnica BOPT y fundadores del <strong>BORG Center Barcelona</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Dr. Xavier Vela */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 relative">
                <Image
                  src="/images/doctor-xavier-vela.png"
                  alt="Dr. Xavier Vela - Dentista Viladecans"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Dr. Xavier Vela
                </h3>
                <p className="text-slate-600 font-medium mb-2">
                  Co-director de Vela-Segalà Viladecans
                </p>
                <p className="text-sm text-slate-600">
                  Co-fundador de BORG Center Barcelona
                </p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Especialista en rehabilitaciones estéticas y prótesis sobre implantes</strong>. Pionero en la técnica BOPT 
              en España y ponente internacional en congresos de odontología.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                <Award className="w-4 h-4" />
                Implantología Avanzada
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                <GraduationCap className="w-4 h-4" />
                Estética Dental
              </div>
            </div>
          </div>

          {/* Dra. Maribel Segalà */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 relative">
                <Image
                  src="/images/doctora-maribel-segala-1.png"
                  alt="Dra. Maribel Segalà - Dentista Viladecans"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Dra. Maribel Segalà
                </h3>
                <p className="text-slate-600 font-medium mb-2">
                  Co-directora de Vela-Segalà Viladecans
                </p>
                <p className="text-sm text-slate-600">
                  Co-fundadora de BORG Center Barcelona
                </p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Especialista en cirugía de implantes y regeneración ósea</strong>. Autora de artículos científicos 
              en colaboración con universidades internacionales.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                <Award className="w-4 h-4" />
                Cirugía Implantológica
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                <GraduationCap className="w-4 h-4" />
                Rehabilitación Oral
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

