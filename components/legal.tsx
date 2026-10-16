import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Nav } from "./nav";

export function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-4 pt-40 pb-24 sm:px-6">
        <h1 className="text-4xl font-medium tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted">Last updated October 2026</p>
        <div className="mt-10 space-y-6 text-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-fg">{children}</div>
      </main>
      <Footer />
    </>
  );
}
