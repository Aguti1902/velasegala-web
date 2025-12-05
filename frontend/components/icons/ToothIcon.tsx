import Image from "next/image";

export function ToothIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Icono normal (visible por defecto) */}
      <Image
        src="/images/iconos/icono-diente.png"
        alt="Icono de diente"
        width={48}
        height={48}
        className="w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-300"
        priority
      />
      {/* Icono blanco (visible en hover) */}
      <Image
        src="/images/iconos/icono-diente-blanco.png"
        alt="Icono de diente blanco"
        width={48}
        height={48}
        className="w-full h-full object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        priority
      />
    </div>
  );
}

