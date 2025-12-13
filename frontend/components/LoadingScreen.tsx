"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Ocultar loading inicial después de que la página cargue (máximo 1 segundo)
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    // Mostrar loading durante transiciones de página (máximo 1 segundo)
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading && !isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center lg:hidden">
      <div className="flex flex-col items-center gap-8">
        {/* Isotipo con animación */}
        <div className="relative w-28 h-28 md:w-36 md:h-36">
          <div className="absolute inset-0 animate-pulse">
            <Image
              src="/images/Logos/Isotipo.png"
              alt="Vela Segalà"
              fill
              className="object-contain opacity-80"
              priority
            />
          </div>
          <div className="absolute inset-0 animate-ping">
            <Image
              src="/images/Logos/Isotipo.png"
              alt="Vela Segalà"
              fill
              className="object-contain opacity-20"
              priority
            />
          </div>
        </div>
        
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

