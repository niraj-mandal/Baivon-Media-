"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { calUrl, nextSteps, services, site } from "@/lib/site";

// Free static-site form backend; the key is public by design. Set it in .env.local / Cloudflare env.
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm placeholder:text-fg/35 outline-none transition-colors focus:border-accent/60";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!KEY) return setStatus("error");
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, access_key: KEY, subject: `New enquiry from ${data.name}`, from_name: "Baivon Media website" }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-8 sm:p-10" role="status">
        <span className="grid size-10 place-items-center rounded-full bg-accent text-black" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-6 text-2xl font-medium tracking-tight">Thanks, we got it.</p>
        <p className="mt-2 text-muted">Here&apos;s what happens next:</p>
        <ol className="mt-6 space-y-4">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <span className="text-sm font-medium">{s.title}</span>
            </li>
          ))}
        </ol>
        {site.calLink ? (
          <a href={calUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg hover:bg-accent">
            Skip the wait: book a call now
          </a>
        ) : (
          <p className="mt-8 text-sm text-muted">
            Anything to add? Email{" "}
            <a href={`mailto:${site.email}`} className="text-fg underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      {/* honeypot: bots fill it, Web3Forms drops the submission */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" required>
          <input id="name" name="name" required placeholder="Jane Cooper" autoComplete="name" className={field} />
        </Field>
        <Field id="email" label="Work email" required>
          <input id="email" name="email" type="email" required placeholder="jane@company.com" autoComplete="email" className={field} />
        </Field>
        <Field id="company" label="Company" required>
          <input id="company" name="company" required placeholder="Your company name" autoComplete="organization" className={field} />
        </Field>
        <Field id="website" label="Website">
          <input id="website" name="website" placeholder="company.com" autoComplete="url" className={field} />
        </Field>
        <Field id="service" label="Service you need" required>
          <select id="service" name="service" required defaultValue="" className={field}>
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field id="budget" label="Monthly budget" required>
          <select id="budget" name="budget" required defaultValue="" className={field}>
            <option value="" disabled>Select a range</option>
            <option>Under $2,500</option>
            <option>$2,500 – $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000+</option>
          </select>
        </Field>
      </div>
      <Field id="source" label="How did you hear about us?">
        <select id="source" name="source" defaultValue="" className={field}>
          <option value="">Select one (optional)</option>
          {["X / Twitter", "LinkedIn", "TikTok", "Instagram", "YouTube", "Referral", "Google search", "Other"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field id="message" label="Message">
        <textarea id="message" name="message" rows={4} placeholder="Tell us about your product and goals" className={field} />
      </Field>
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-12 w-full rounded-full bg-fg text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-center text-xs text-muted">
        By sending this you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-fg">
          Privacy Policy
        </a>
        .
      </p>
      {status === "error" && (
        <p className="text-center text-sm text-red-400" role="alert">
          Something went wrong. Email us at{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-muted"> *</span>}
      </label>
      {children}
    </div>
  );
}
