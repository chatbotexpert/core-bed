"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";

export function CheckoutSummary() {
  const { items, cartTotal } = useCartStore();

  return (
    <div className="bg-[#EBE7DF] p-8 rounded-sm">
      <h2 className="font-heading text-xl text-core-ink mb-6">Order Summary</h2>
      
      <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 bg-core-muted rounded-sm flex-shrink-0">
              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
              <span className="absolute -top-2 -right-2 bg-core-ink text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-core-ink">{item.product.name}</h4>
              <p className="text-xs text-core-muted-foreground mt-1 uppercase tracking-widest">
                {item.size && `${item.size} `}
                {item.firmness && `• ${item.firmness}`}
              </p>
            </div>
            <span className="text-sm font-medium text-core-ink">
              ${(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4 text-sm text-core-ink mb-6 pb-6 border-b border-core-line">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-heading text-xl">Total</span>
        <span className="font-heading text-2xl">${cartTotal.toLocaleString()}</span>
      </div>
    </div>
  );
}
