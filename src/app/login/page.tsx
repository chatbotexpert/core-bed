"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] bg-core-bg pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl text-core-ink mb-2">Welcome Back</h1>
          <p className="text-core-muted-foreground">Sign in to your CoreBed account.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-core-ink mb-2">Email</label>
            <input type="email" required className="w-full bg-transparent border border-core-line p-3 rounded-sm focus:outline-none focus:border-core-gold" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-core-ink">Password</label>
              <Link href="/forgot-password" className="text-xs text-core-muted-foreground underline">Forgot Password?</Link>
            </div>
            <input type="password" required className="w-full bg-transparent border border-core-line p-3 rounded-sm focus:outline-none focus:border-core-gold" />
          </div>
          <Button type="submit" className="w-full bg-core-ink text-white hover:bg-core-ink/90 h-12 rounded-sm text-xs font-semibold tracking-widest uppercase mt-4">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-core-muted-foreground">
          Don't have an account? <Link href="/signup" className="text-core-ink underline underline-offset-4">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
