"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-20 md:h-[600px] no-scrollbar">
        {images.map((img, i) => (
          <button 
            key={i} 
            onClick={() => setActiveImg(i)}
            className={`relative w-20 h-24 flex-shrink-0 bg-core-muted rounded-sm overflow-hidden transition-all duration-300 ${activeImg === i ? "ring-2 ring-core-ink ring-offset-2" : "opacity-60 hover:opacity-100"}`}
          >
            <Image src={img} alt={`${productName} view ${i + 1}`} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square md:aspect-[4/5] bg-core-muted rounded-sm overflow-hidden">
        <Image 
          src={images[activeImg]} 
          alt={productName} 
          fill 
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
