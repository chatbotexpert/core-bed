import { getProductBySlug, products } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductGallery } from "./ProductGallery";
import { ProductForm } from "./ProductForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = await params;
  const product = getProductBySlug(unwrappedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
    
  if (relatedProducts.length < 4) {
    const extra = products.filter(p => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...extra);
  }

  return (
    <div className="bg-core-bg pt-20">
      
      {/* SPLIT LAYOUT */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Left: Sticky Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="md:sticky md:top-32">
              <ProductGallery images={product.images} productName={product.name} />
            </div>
          </div>

          {/* Right: Product Details & Form (Scrolls) */}
          <div className="w-full md:w-1/2 md:py-10">
            {/* Breadcrumb / Category */}
            <p className="text-xs uppercase tracking-widest text-core-muted-foreground mb-4">
              {product.category}
            </p>
            
            <h1 className="font-heading text-4xl lg:text-5xl text-core-ink mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-core-gold">
                {/* Mock Stars */}
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-current opacity-30"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-core-ink underline underline-offset-4">{product.rating} ({product.reviewCount} Reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-2xl text-core-ink">${product.price.toLocaleString()}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-core-muted-foreground line-through mb-[2px]">
                  ${product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-core-muted-foreground leading-relaxed mb-10">
              {product.description}
            </p>

            <ProductForm product={product} />

            {/* Accordions */}
            <div className="mt-16 border-t border-core-line">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="materials" className="border-core-line py-2">
                  <AccordionTrigger className="text-core-ink hover:no-underline font-heading text-lg">Materials & Care</AccordionTrigger>
                  <AccordionContent className="text-core-muted-foreground leading-relaxed">
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      {product.materials.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                    <p>Machine washable cover. Do not bleach or dry clean.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="features" className="border-core-line py-2">
                  <AccordionTrigger className="text-core-ink hover:no-underline font-heading text-lg">Key Features</AccordionTrigger>
                  <AccordionContent className="text-core-muted-foreground leading-relaxed">
                    <ul className="list-disc pl-5 space-y-2">
                      {product.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-core-line py-2">
                  <AccordionTrigger className="text-core-ink hover:no-underline font-heading text-lg">Shipping & Returns</AccordionTrigger>
                  <AccordionContent className="text-core-muted-foreground leading-relaxed">
                    <p className="mb-2"><strong>Free Shipping</strong> across the continental US via FedEx.</p>
                    <p>Includes a 120-night trial. If you don't love it, we'll arrange a free pickup and full refund.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <section className="border-t border-core-line py-24 px-6 bg-[#EBE7DF]">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-core-ink mb-12 text-center">Complete Your Sleep</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
