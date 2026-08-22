"use client";

import { useState } from "react";
import { Product, Size, Firmness } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function ProductForm({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(product.sizes[0]);
  const [selectedFirmness, setSelectedFirmness] = useState<Firmness | undefined>(product.firmness?.[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      product,
      quantity,
      size: selectedSize,
      firmness: selectedFirmness,
    });
  };

  return (
    <div className="space-y-8">
      {/* Size Selector */}
      {product.sizes.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-heading text-lg text-core-ink">Select Size</span>
            <span className="text-xs text-core-muted-foreground underline cursor-pointer">Size Guide</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 px-4 border rounded-sm text-sm font-medium transition-all ${
                  selectedSize === size 
                    ? "border-core-ink bg-core-ink text-white" 
                    : "border-core-line text-core-ink hover:border-core-ink"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Firmness Selector */}
      {product.firmness && product.firmness.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-heading text-lg text-core-ink">Select Firmness</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.firmness.map((firm) => (
              <button
                key={firm}
                onClick={() => setSelectedFirmness(firm)}
                className={`py-3 px-4 border rounded-sm text-sm font-medium transition-all ${
                  selectedFirmness === firm 
                    ? "border-core-ink bg-core-ink text-white" 
                    : "border-core-line text-core-ink hover:border-core-ink"
                }`}
              >
                {firm}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-core-line">
        <div className="flex items-center border border-core-ink rounded-sm sm:w-32 justify-between">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-12 flex items-center justify-center text-core-ink hover:bg-core-muted transition-colors"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-12 flex items-center justify-center text-core-ink hover:bg-core-muted transition-colors"
          >
            +
          </button>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="flex-1 bg-core-ink text-white hover:bg-core-ink/90 h-12 rounded-sm text-xs font-semibold tracking-widest uppercase"
        >
          Add to Cart - ${(product.price * quantity).toLocaleString()}
        </Button>
      </div>
      
      <div className="text-center sm:text-left text-xs text-core-muted-foreground pt-2">
        Ships free in 2-4 business days.
      </div>

    </div>
  );
}
