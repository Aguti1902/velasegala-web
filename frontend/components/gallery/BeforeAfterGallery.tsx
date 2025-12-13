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
    title: "Carillas Dentales",
    description: "Rehabilitación completa con carillas de porcelana. Transformación total de la sonrisa con resultados naturales.",
  },
  {
    beforeImage: "/images/caso2-antes.png",
    afterImage: "/images/caso2-despues.png",
    title: "Sonrisa Gingival",
    description: "Corrección de sonrisa gingival con estética periodontal. Mejora de proporciones y armonía dental.",
  },
  {
    beforeImage: "/images/caso3-antes.png",
    afterImage: "/images/caso3-despues.png",
    title: "Carillas Dentales",
    description: "Diseño de sonrisa con carillas cerámicas. Resultado estético excepcional y funcional.",
  },
  {
    beforeImage: "/images/caso4-antes.png",
    afterImage: "/images/caso4-despues.png",
    title: "Blanqueamiento Dental",
    description: "Blanqueamiento dental profesional con tecnología LED. Dientes varios tonos más blancos.",
  },
  {
    beforeImage: "/images/implantes-dentales-caso1-antes.jpg",
    afterImage: "/images/implantes-dentales-caso1-despues.jpg",
    title: "Implantes Dentales",
    description: "Implantes en sector anterior y prótesis BOPT sobre implantes. Resultados naturales y predecibles.",
  },
  {
    beforeImage: "/images/implantes-dentales-caso2-antes.jpg",
    afterImage: "/images/implantes-dentales-caso2-despues.jpg",
    title: "Implantes Dentales",
    description: "Rehabilitación con implantes dentales premium. Recuperación total de la funcionalidad y estética.",
  },
];

export function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mostrar 2 casos a la vez
  const casesPerPage = 2;
  const totalPages = Math.ceil(CASES.length / casesPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentCases = () => {
    const startIndex = currentIndex * casesPerPage;
    return CASES.slice(startIndex, startIndex + casesPerPage);
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

        {/* Carrusel con 2 casos */}
        <div className="relative max-w-7xl mx-auto">
          {/* Casos actuales */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {getCurrentCases().map((caso, idx) => {
              const startIndex = currentIndex * casesPerPage;
              return (
                <div key={startIndex + idx}>
                  <h3 className="text-xl font-bold text-black mb-3">
                    Caso {startIndex + idx + 1}: {caso.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {caso.description}
                  </p>
                  
                  <BeforeAfterSlider
                    beforeImage={caso.beforeImage}
                    afterImage={caso.afterImage}
                    beforeLabel="ANTES"
                    afterLabel="DESPUÉS"
                  />
                </div>
              );
            })}
          </div>

          {/* Botones de navegación */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              aria-label="Casos anteriores"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-black"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir a la página ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              aria-label="Casos siguientes"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Contador */}
          <p className="text-center text-slate-500 text-sm mt-4">
            Mostrando casos {currentIndex * casesPerPage + 1}-{Math.min((currentIndex + 1) * casesPerPage, CASES.length)} de {CASES.length}
          </p>
        </div>
      </div>
    </section>
  );
}

