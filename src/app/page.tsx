"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { PinnedStory } from "@/components/PinnedStory";
import { Marquee } from "@/components/Marquee";
import { NewsletterBand } from "@/components/NewsletterBand";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  const statsRef = useRef<HTMLDivElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // 1. Hero Parallax
    if (heroBgRef.current && heroTextRef.current && heroRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Hero headline fade/rise in on load
      const headlineWords = heroTextRef.current.querySelectorAll('.word');
      gsap.fromTo(headlineWords, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }

    // 2. Section reveal-on-scroll
    const revealSections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    revealSections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        }
      );
    });

    // 3. Number counters
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          countRefs.current.forEach((el) => {
            if (!el) return;
            const target = parseInt(el.getAttribute("data-target") || "0");
            gsap.to(el, {
              innerHTML: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              onUpdate: function() {
                el.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString();
              }
            });
          });
        },
        once: true
      });
    }

  }, []);

  // Split text for hero manually since SplitText is a premium plugin
  const heroHeadline = "The foundation of a better tomorrow.";
  const words = heroHeadline.split(" ").map((word, i) => (
    <span key={i} className="inline-block overflow-hidden pb-2">
      <span className="word inline-block opacity-0 translate-y-full">{word}&nbsp;</span>
    </span>
  ));

  return (
    <div className="bg-core-bg">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center pt-20">
        <div ref={heroBgRef} className="absolute inset-[-20%] w-[140%] h-[140%] z-0">
          <Image 
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=2000"
            alt="Beautiful premium bedroom"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <p className="word opacity-0 text-sm md:text-base tracking-[0.2em] uppercase text-white mb-6">Welcome to CoreBed</p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-10">
            {words}
          </h1>
          <div className="word opacity-0">
            <Link 
              href="/shop/mattresses" 
              className="inline-block bg-white text-core-ink hover:bg-core-ink hover:text-white transition-colors duration-300 px-10 py-4 uppercase tracking-widest text-xs font-semibold rounded-sm"
            >
              Shop Mattresses
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="reveal-section py-32 px-6 max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-core-ink mb-4">Shop by Category</h2>
          <p className="text-core-muted-foreground">Elevate every layer of your sleep experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Mattresses", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", link: "/shop/mattresses" },
            { name: "Pillows", image: "https://images.unsplash.com/photo-1528255915607-9012fda0f838?auto=format&fit=crop&q=80&w=800", link: "/shop/pillows" },
            { name: "Bedding", image: "https://images.unsplash.com/photo-1629815037140-1bc62039281a?auto=format&fit=crop&q=80&w=800", link: "/shop/bedding" },
            { name: "Bundles", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800", link: "/shop/bundles" },
          ].map((cat, i) => (
            <Link key={i} href={cat.link} className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-core-muted flex items-end p-6">
              <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-house)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <h3 className="relative z-10 text-white font-heading text-2xl tracking-tight">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* PINNED STORYTELLING */}
      <PinnedStory />

      {/* BESTSELLERS */}
      <section className="reveal-section py-32 px-6 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-heading text-4xl text-core-ink mb-4">Our Bestsellers</h2>
            <p className="text-core-muted-foreground">The community favorites for a reason.</p>
          </div>
          <Link href="/shop" className="hidden md:block uppercase tracking-widest text-xs font-semibold text-core-ink hover:text-core-accent transition-colors">
            Shop All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center md:hidden">
          <Link href="/shop" className="inline-block border border-core-ink px-8 py-3 uppercase tracking-widest text-xs font-semibold text-core-ink hover:bg-core-ink hover:text-white transition-colors">
            Shop All
          </Link>
        </div>
      </section>

      {/* TRUST STATS */}
      <section ref={statsRef} className="reveal-section py-24 bg-[#EBE7DF] border-y border-core-line px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="font-heading text-5xl md:text-7xl text-core-accent mb-4">
              <span ref={el => { countRefs.current[0] = el; }} data-target="120">0</span>
            </div>
            <p className="uppercase tracking-widest text-xs font-semibold text-core-ink">Night Sleep Trial</p>
          </div>
          <div>
            <div className="font-heading text-5xl md:text-7xl text-core-accent mb-4">
              <span ref={el => { countRefs.current[1] = el; }} data-target="10">0</span>
            </div>
            <p className="uppercase tracking-widest text-xs font-semibold text-core-ink">Year Warranty</p>
          </div>
          <div>
            <div className="font-heading text-5xl md:text-7xl text-core-accent mb-4">
              <span ref={el => { countRefs.current[2] = el; }} data-target="50000">0</span>+
            </div>
            <p className="uppercase tracking-widest text-xs font-semibold text-core-ink">5-Star Reviews</p>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* NEWSLETTER */}
      <NewsletterBand />
    </div>
  );
}
