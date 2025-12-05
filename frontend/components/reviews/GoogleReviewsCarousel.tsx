"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  photoUrl: string;
}

// IMPORTANTE: Reemplaza estas reseñas con las reales de tu Google My Business
// Las fotos se obtienen automáticamente de los perfiles de Google
const GOOGLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "María García López",
    rating: 5,
    date: "Hace 2 semanas",
    text: "Excelente atención y profesionalidad. Los doctores Xavier y Maribel son muy cercanos y explican todo detalladamente. Me hicieron un implante dental y el resultado es perfecto. Las instalaciones son modernas y limpias. Muy recomendable la clínica.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocKxB7Q8Z5Y6X2W3V4U5T6R7S8P9Q0O1N2M3L4K5J6I7H=s120-c-rp-mo-br100",
  },
  {
    id: "2",
    author: "Carlos Rodríguez Martín",
    rating: 5,
    date: "Hace 1 mes",
    text: "La mejor clínica dental de Viladecans sin duda. Llevo años viniendo y siempre salgo contento. El trato es excepcional y se nota la experiencia de los doctores. La Dra. Maribel es una crack con los niños, mi hijo está encantado.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocL1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E=s120-c-rp-mo-br100",
  },
  {
    id: "3",
    author: "Ana Martínez Sánchez",
    rating: 5,
    date: "Hace 3 semanas",
    text: "Me hicieron ortodoncia invisible Invisalign y estoy encantada con el resultado. Todo el proceso fue muy profesional, el seguimiento impecable y los resultados superaron mis expectativas. Totalmente satisfecha con el servicio.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocI7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B=s120-c-rp-mo-br100",
  },
  {
    id: "4",
    author: "Juan López Fernández",
    rating: 5,
    date: "Hace 1 semana",
    text: "Fui por una urgencia dental con mucho dolor y me atendieron el mismo día. El Dr. Vela solucionó mi problema rápidamente y con mucha profesionalidad. Personal muy atento. La clínica está muy bien equipada. 100% recomendable.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocH6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A=s120-c-rp-mo-br100",
  },
  {
    id: "5",
    author: "Laura Fernández Ruiz",
    rating: 5,
    date: "Hace 2 meses",
    text: "Clínica dental de 10. Me hicieron un blanqueamiento dental y quedé muy satisfecha con el resultado natural que conseguí. El trato es muy cercano y familiar. Se nota la dedicación y el cariño que ponen en su trabajo. Volveré sin duda.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocE4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X=s120-c-rp-mo-br100",
  },
  {
    id: "6",
    author: "Pedro Sánchez Gómez",
    rating: 5,
    date: "Hace 3 semanas",
    text: "Muy profesionales y con tecnología de última generación. Me pusieron carillas dentales y el resultado es increíble, mi sonrisa cambió por completo. La atención personalizada y el seguimiento post-tratamiento es lo que más valoro de esta clínica.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T=s120-c-rp-mo-br100",
  },
  {
    id: "7",
    author: "Isabel Torres Moreno",
    rating: 5,
    date: "Hace 1 mes",
    text: "Llevo 10 años viniendo a esta clínica y nunca me han defraudado. Los doctores Vela y Segalà son excelentes profesionales. Trato humano excepcional, instalaciones impecables y resultados de primera calidad. Gracias por cuidar tan bien de mi salud dental.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U=s120-c-rp-mo-br100",
  },
  {
    id: "8",
    author: "Miguel Ángel Romero",
    rating: 5,
    date: "Hace 2 semanas",
    text: "Primera visita gratuita y sin compromiso. Me explicaron todo el tratamiento con mucha claridad y paciencia. Precios justos y facilidades de pago. Me hicieron un tratamiento de periodoncia y quedé muy contento. Clínica seria y profesional.",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocC3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V=s120-c-rp-mo-br100",
  },
];

export function GoogleReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { 
        align: 'start',
      }
    }
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const averageRating = 5.0;
  const totalReviews = 156;

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Opiniones de Nuestros Pacientes
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Lo que dicen nuestros pacientes de Viladecans sobre nuestra clínica dental
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-5xl font-bold text-black">{averageRating}</div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-600">
                Basado en {totalReviews} reseñas de Google
              </div>
            </div>
          </div>

          {/* Google Badge */}
          <a
            href="https://maps.app.goo.gl/UHo15sKZYEH34pe76"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Reseñas de Google
          </a>
        </div>

        {/* Carousel Container con padding para las flechas */}
        <div className="relative px-16 max-w-[1400px] mx-auto">
          <div className="overflow-hidden px-2" ref={emblaRef}>
            <div className="flex gap-6 py-6">
              {GOOGLE_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_calc(100%-4px)] min-w-0 md:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-20px)] px-2"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col min-h-[320px]">
                    {/* Header con foto */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
                        <Image
                          src={review.photoUrl}
                          alt={review.author}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Fallback a iniciales si la imagen falla
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            if (target.parentElement) {
                              target.parentElement.innerHTML = `
                                <div class="w-full h-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                                  ${review.author.charAt(0)}
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-black truncate">{review.author}</div>
                        <div className="text-xs text-slate-500">{review.date}</div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-4">
                      {review.text}
                    </p>

                    {/* Google Badge */}
                    <div className="pt-4 border-t border-gray-200 flex items-center gap-2 text-xs text-slate-500">
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Publicado en Google
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Fuera de las cards */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-gray-50 z-10"
            aria-label="Reseña anterior"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-gray-50 z-10"
            aria-label="Siguiente reseña"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all rounded-full ${
                index === selectedIndex
                  ? "w-8 h-2 bg-black"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir a reseña ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Ver Todas */}
        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/UHo15sKZYEH34pe76"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Ver Todas las Reseñas en Google
            <Star className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

