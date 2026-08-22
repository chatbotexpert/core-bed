"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export function NewsletterBand() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock subscription
    setEmail("");
    alert("Subscribed!");
  };

  return (
    <section className="bg-core-ink text-core-bg py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="font-heading text-4xl mb-4 text-white">Better Sleep, Delivered.</h3>
        <p className="text-core-line/80 mb-8 max-w-md mx-auto">
          Sign up for early access to new launches, exclusive sleep tips, and 10% off your first order.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent border border-core-line/30 rounded-sm px-4 py-3 text-white placeholder:text-core-line/50 focus:outline-none focus:border-core-gold transition-colors"
          />
          <Button type="submit" className="bg-core-bg text-core-ink hover:bg-white rounded-sm h-auto py-3 px-8 font-semibold tracking-wide uppercase text-xs">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
