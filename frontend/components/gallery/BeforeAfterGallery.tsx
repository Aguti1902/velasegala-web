"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterImage {
  src: string;
  title: string;
  treatment: string;
}

const RESULTS_IMAGES: BeforeAfterImage[] = [
  {
    src: "/images/fotos-resultados-clinica-dental-viladecans.jpg",
    title: "Resultado 1",
    treatment: "Tratamiento Dental",
  },
  {
    src: "/images/fotos-resultados-clinica-dental-viladecans-2.jpg",
    title: "Resultado 2",
    treatment: "Tratamiento Dental",
  },
  {
    src: "/images/fotos-resultados-clinica-dental-viladecans-3.jpg",
    title: "Resultado 3",
    treatment: "Tratamiento Dental",
  },
  {
    src: "/images/fotos-resultados-clinica-dental-viladecans-4.jpg",
    title: "Resultado 4",
    treatment: "Tratamiento Dental",
  },
  {
    src: "/images/fotos-resultados-clinica-dental-viladecans-5.jpg",
    title: "Resultado 5",
    treatment: "Tratamiento Dental",
  },
];

export function BeforeAfterGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % RESULTS_IMAGES.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        (selectedImage - 1 + RESULTS_IMAGES.length) % RESULTS_IMAGES.length
      );
    }
  };

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
              Resultados Reales de Nuestros Pacientes
            </h2>
            <p className="text-lg text-slate-600">
              Casos reales tratados en nuestra clínica dental de Viladecans.
              Cada sonrisa cuenta una historia de éxito.
            </p>
          </div>

          {/* Grid de Imágenes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESULTS_IMAGES.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-bold">{image.treatment}</p>
                    <p className="text-sm text-gray-200">Click para ampliar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl aspect-[4/3]">
            <Image
              src={RESULTS_IMAGES[selectedImage].src}
              alt={RESULTS_IMAGES[selectedImage].title}
              fill
              className="object-contain"
              unoptimized
              priority
            />
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-xl font-bold">
                {RESULTS_IMAGES[selectedImage].treatment}
              </p>
              <p className="text-sm text-gray-300">
                {selectedImage + 1} de {RESULTS_IMAGES.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </>
  );
}

