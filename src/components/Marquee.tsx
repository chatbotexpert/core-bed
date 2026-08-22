"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;
    
    // We clone the elements inside to create a seamless loop
    const content = marqueeRef.current;
    
    // Clone children to ensure enough width for seamless scroll
    const items = Array.from(content.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      content.appendChild(clone);
    });

    const totalWidth = content.scrollWidth / 2;

    gsap.to(content, {
      x: -totalWidth,
      ease: "none",
      duration: 30, // adjust speed
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });
  }, []);

  const handleMouseEnter = () => gsap.globalTimeline.pause();
  const handleMouseLeave = () => gsap.globalTimeline.play();

  return (
    <div 
      className="w-full overflow-hidden bg-core-bg py-12 border-y border-core-line"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <div className="flex w-max" ref={marqueeRef}>
        {[
          "\"The most comfortable mattress I've ever slept on.\" — Vogue",
          "\"CoreBed redefines quiet luxury.\" — GQ",
          "\"A game-changer for hot sleepers.\" — Sleep Foundation",
          "\"Symmetric calm and unparalleled support.\" — Architectural Digest",
        ].map((text, i) => (
          <div key={i} className="flex items-center mx-12">
            <span className="font-heading text-xl text-core-ink whitespace-nowrap">{text}</span>
            <div className="w-2 h-2 rounded-full bg-core-gold mx-12"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
