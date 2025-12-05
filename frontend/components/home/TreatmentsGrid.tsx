import Link from "next/link";
import { MAIN_TREATMENTS } from "@/lib/constants";
import { Drill, Smile, Sparkles, Droplet, Baby, Heart, Activity, Boxes, AlertCircle, ChevronRight, Scissors, ShieldAlert, SparklesIcon } from "lucide-react";
import { ToothIcon } from "@/components/icons/ToothIcon";

// Mapa de iconos por tratamiento
const treatmentIcons: { [key: string]: React.ReactNode } = {
  "implantes-dentales-viladecans": <ToothIcon className="w-12 h-12" />,
  "ortodoncia-invisible-viladecans": <Smile className="w-12 h-12" />,
  "estetica-dental-viladecans": <Sparkles className="w-12 h-12" />,
  "blanqueamiento-dental-viladecans": <Droplet className="w-12 h-12" />,
  "odontopediatria-viladecans": <Baby className="w-12 h-12" />,
  "periodoncia-viladecans": <Heart className="w-12 h-12" />,
  "endodoncia-viladecans": <Activity className="w-12 h-12" />,
  "protesis-dentales-viladecans": <Boxes className="w-12 h-12" />,
  "cirugia-oral-viladecans": <Scissors className="w-12 h-12" />,
  "bruxismo-viladecans": <ShieldAlert className="w-12 h-12" />,
  "limpieza-dental-viladecans": <SparklesIcon className="w-12 h-12" />,
  "urgencias-dentales-viladecans": <AlertCircle className="w-12 h-12" />,
};

export function TreatmentsGrid() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Tratamientos Dentales en Viladecans
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            <strong>Especialistas en cada área</strong> de la odontología con tecnología avanzada y 
            <strong> primera visita gratuita</strong>. Tratamientos personalizados para toda la familia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAIN_TREATMENTS.slice(0, 6).map((treatment) => (
            <Link
              key={treatment.slug}
              href={`/tratamientos/${treatment.slug}`}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-xl inline-block group-hover:bg-black group-hover:text-white transition-all">
                {treatmentIcons[treatment.slug]}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                {treatment.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{treatment.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/tratamientos" className="btn-primary">
            Ver Todos los Tratamientos
          </Link>
        </div>
      </div>
    </section>
  );
}

