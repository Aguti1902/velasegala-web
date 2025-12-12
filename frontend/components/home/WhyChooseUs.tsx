import Image from "next/image";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { Award, Microscope, Gift, CreditCard, Heart, DollarSign } from "lucide-react";

const whyChooseUsIcons = [
  <Award className="w-10 h-10" key="1" />,
  <Microscope className="w-10 h-10" key="2" />,
  <Gift className="w-10 h-10" key="3" />,
  <CreditCard className="w-10 h-10" key="4" />,
  <Heart className="w-10 h-10" key="5" />,
  <DollarSign className="w-10 h-10" key="6" />,
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            <strong>Clínica dental de referencia en Viladecans</strong> con más de 15 años 
            cuidando de la salud bucodental de familias en la zona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {WHY_CHOOSE_US.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="mb-4 p-3 bg-black text-white rounded-xl inline-block">
                {whyChooseUsIcons[index]}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Imagen de Tecnología */}
        <div className="relative aspect-[16/7] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/tecnologia-clinica-dental-viladecans.jpg"
            alt="Tecnología avanzada Clínica Dental Vela-Segalà Viladecans"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Tecnología de Última Generación
              </h3>
              <p className="text-gray-200 max-w-2xl">
                Equipamiento 3D de vanguardia para diagnósticos precisos y tratamientos mínimamente invasivos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

