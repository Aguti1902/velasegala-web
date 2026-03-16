"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function BlogFeaturedImage({ src, alt, className = "object-cover", priority = false }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-3">
        <span className="text-6xl">🦷</span>
        <span className="text-sm text-slate-400 text-center px-6 max-w-xs">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
