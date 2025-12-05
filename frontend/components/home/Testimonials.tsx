import { TESTIMONIALS } from "@/lib/constants";
import { ChevronRight, Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Opiniones de Pacientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-black fill-current" />
            ))}
            <span className="ml-2 text-xl font-bold">4.9/5</span>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Más de 500 pacientes satisfechos en Viladecans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow relative"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-black fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 mb-6 italic leading-relaxed line-clamp-4">&quot;{testimonial.text}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-black">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.treatment} • {testimonial.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

