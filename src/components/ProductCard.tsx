"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCartStore, useShopStore } from "@/lib/store";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { useRef } from "react";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const addItem = useCartStore(state => state.addItem);
  const { wishlist, toggleWishlist } = useShopStore();
  
  const isWishlisted = wishlist.includes(product.id);

  const handleHover = (isEnter: boolean) => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      scale: isEnter ? 1.05 : 1,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      product,
      quantity: 1,
      size: product.sizes[0],
      firmness: product.firmness?.[0],
    });
  };

  return (
    <Link 
      href={`/product/${product.slug}`} 
      className={`group block relative ${className}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-core-muted mb-6 rounded-sm">
        <Image
          ref={imageRef}
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-core-accent text-core-accent" : "text-core-ink"}`} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-house)]">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-white text-core-ink py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-core-ink hover:text-white transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-lg text-core-ink">{product.name}</h3>
          <div className="text-right">
            {product.compareAtPrice && (
              <span className="text-core-muted-foreground line-through text-xs mr-2">
                ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
            <span className="text-core-ink text-sm">${product.price.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-core-muted-foreground text-sm line-clamp-1">{product.description}</p>
      </div>
    </Link>
  );
}
