"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

interface BeforeAfterCase {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

const CASES: BeforeAfterCase[] = [
  {
    beforeImage: "/images/caso1-antes.png",
    afterImage: "/images/caso1-despues.png",
    title: "Caso 1: Ortodoncia Invisible",
    description: "Corrección de apiñamiento dental con ortodoncia invisible. Resultados en 12 meses.",
  },
  {
    beforeImage: "/images/caso2-antes.png",
    afterImage: "/images/caso2-despues.png",
    title: "Caso 2: Estética Dental",
    description: "Rehabilitación completa con carillas dentales. Transformación total de la sonrisa.",
  },
  {
    beforeImage: "/images/caso3-antes.png",
    afterImage: "/images/caso3-despues.png",
    title: "Caso 3: Implantes Dentales",
    description: "Implantes dentales con prótesis cerámica. Recuperación total de la funcionalidad.",
  },
  {
    beforeImage: "/images/caso4-antes.png",
    afterImage: "/images/caso4-despues.png",
    title: "Caso 4: Blanqueamiento Dental",
    description: "Blanqueamiento dental profesional. Dientes varios tonos más blancos.",
  },
];

export function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CASES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CASES.length) % CASES.length);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
            CASOS REALES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
            Resultados Reales de Nuestros Pacientes
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Casos reales tratados en nuestra clínica dental de Viladecans.
            Desliza el control para ver el antes y el después de cada tratamiento.
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Caso actual */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black mb-3 text-center">
              {CASES[currentIndex].title}
            </h3>
            <p className="text-slate-600 mb-6 text-center max-w-2xl mx-auto">
              {CASES[currentIndex].description}
            </p>
            
            <BeforeAfterSlider
              beforeImage={CASES[currentIndex].beforeImage}
              afterImage={CASES[currentIndex].afterImage}
              beforeLabel="ANTES"
              afterLabel="DESPUÉS"
            />
          </div>

          {/* Botones de navegación */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Caso anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {CASES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-black"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir al caso ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Caso siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Contador */}
          <p className="text-center text-slate-500 text-sm mt-4">
            Caso {currentIndex + 1} de {CASES.length}
          </p>
        </div>
      </div>
    </section>
  );
}

