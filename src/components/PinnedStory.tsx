"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export function PinnedStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const layersContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const layers = [
    { title: "Core Coils", desc: "Individually wrapped steel coils for deep support and durability.", image: "/textures/core_coils.jpg", z: 10 },
    { title: "Transition Layer", desc: "Targeted support for your spine's natural alignment.", image: "/textures/transition_foam.jpg", z: 20 },
    { title: "Cloud Foam", desc: "Adaptive memory foam that cradles your joints.", image: "/textures/cloud_foam.jpg", z: 30 },
    { title: "Breathable Cover", desc: "Organic cotton infused with cooling technology.", image: "/textures/mattress_cover.jpg", z: 40 },
  ];

  useEffect(() => {
    if (!sectionRef.current || !layersContainerRef.current || !textRef.current) return;

    const layerEls = gsap.utils.toArray<HTMLElement>(".mattress-layer");
    const textEls = gsap.utils.toArray<HTMLElement>(".layer-text");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000", // Scroll for 3000px to see the animation
        pin: true,
        scrub: 1,
      }
    });

    // Initial state: layers spread out vertically
    gsap.set(layerEls, { y: (i) => i * 150 + 200, opacity: 0.2 });
    gsap.set(textEls, { opacity: 0, y: 20 });
    gsap.set(textEls[0], { opacity: 1, y: 0 }); // Show first text

    layerEls.forEach((layer, i) => {
      // Bring layer up
      tl.to(layer, { y: -i * 30, opacity: 1, duration: 1 }, i * 1);
      
      // Update text
      if (i > 0) {
        tl.to(textEls[i - 1], { opacity: 0, y: -20, duration: 0.5 }, i * 1);
        tl.to(textEls[i], { opacity: 1, y: 0, duration: 0.5 }, i * 1 + 0.5);
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-core-bg flex items-center justify-center overflow-hidden border-t border-core-line">
      <div className="max-w-[1440px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div ref={textRef} className="relative h-64 flex flex-col justify-center">
          <h2 className="font-heading text-4xl mb-8 text-core-ink absolute top-0">The Anatomy of Comfort</h2>
          
          <div className="relative mt-20 h-full">
            {layers.map((layer, i) => (
              <div key={i} className="layer-text absolute top-0 left-0">
                <h3 className="text-2xl font-medium text-core-accent mb-4">{layer.title}</h3>
                <p className="text-core-muted-foreground text-lg leading-relaxed max-w-sm">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Layers Graphic */}
        <div ref={layersContainerRef} className="relative h-[600px] flex flex-col items-center justify-center perspective-[1000px]">
          <div className="relative w-full max-w-md aspect-square transform rotate-x-60 rotate-z-45">
            {layers.map((layer, i) => (
              <div 
                key={i} 
                className={`mattress-layer absolute inset-0 rounded-xl shadow-xl border border-core-line/20 overflow-hidden flex items-center justify-center`}
                style={{ zIndex: layer.z, transition: 'none' }}
              >
                <Image src={layer.image} alt={layer.title} fill className="object-cover" sizes="400px" />
                <span className="opacity-0">{layer.title}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
