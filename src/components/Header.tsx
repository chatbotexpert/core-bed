"use client";

import Link from "next/link";
import { User, Search, Menu } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  useEffect(() => {
    if (!isHome || !headerRef.current) {
      // If not home, force solid background
      gsap.set(headerRef.current, { backgroundColor: "var(--color-bg)", borderBottomColor: "var(--color-line)", color: "var(--color-ink)" });
      return;
    }

    // Set initial transparent state
    gsap.set(headerRef.current, { backgroundColor: "transparent", borderBottomColor: "transparent", color: "#ffffff" });

    const trigger = ScrollTrigger.create({
      start: "top -50",
      end: 99999,
      toggleClass: { targets: headerRef.current, className: "is-scrolled" },
      onToggle: (self) => {
        if (self.isActive) {
          gsap.to(headerRef.current, {
            backgroundColor: "var(--color-bg)",
            borderBottomColor: "var(--color-line)",
            color: "var(--color-ink)",
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(headerRef.current, {
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isHome]);

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent"
    >
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          <Link href="/shop/mattresses" className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity">Mattresses</Link>
          <Link href="/shop/pillows" className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity">Pillows</Link>
          <Link href="/shop/bedding" className="text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity">Bedding</Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex-1 md:hidden">
          <button className="p-2 -ml-2">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Logo (Centered) */}
        <div className="flex-shrink-0 flex justify-center">
          <Link href="/" className="font-heading text-3xl tracking-tight">
            COREBED.
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center justify-end gap-4 flex-1">
          <button className="p-2 hover:opacity-70 transition-opacity hidden sm:block">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <Link href="/login" className="p-2 hover:opacity-70 transition-opacity hidden sm:block">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
