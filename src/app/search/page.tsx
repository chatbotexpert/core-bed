"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useShopStore } from "@/lib/store";
import ShopPage from "@/app/shop/[[...category]]/page";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div className="pt-24 pb-12 bg-core-bg border-b border-core-line text-center">
      <h1 className="font-heading text-4xl text-core-ink mb-2">Search Results</h1>
      <p className="text-core-muted-foreground">Showing results for "{q}"</p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<div className="h-48 bg-core-bg animate-pulse" />}>
        <SearchContent />
      </Suspense>
      {/* We can re-use the Shop page logic, but without categories pre-selected */}
      <ShopPage params={Promise.resolve({})} />
    </>
  );
}
