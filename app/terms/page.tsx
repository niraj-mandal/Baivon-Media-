import type { Metadata } from "next";
import { Legal } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service | Baivon Media" };

// PLACEHOLDER: starter text only; have the client confirm it before launch.
export default function Terms() {
  return (
    <Legal title="Terms of Service">
      <p>By using this website you agree to these terms. Services are provided under a separate written agreement with each client.</p>
      <h2>Website content</h2>
      <p>All content on this site belongs to Baivon Media or its clients and may not be copied without permission. Results shown are from past campaigns and are not a guarantee of future performance.</p>
      <h2>Pricing and billing</h2>
      <p>Pricing is quoted per engagement in USD and confirmed in your service agreement. Ongoing engagements renew monthly until cancelled with 30 days&apos; notice.</p>
      <h2>Liability</h2>
      <p>This website is provided &ldquo;as is&rdquo;. We are not liable for any loss arising from its use.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a className="text-fg underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </Legal>
  );
}
