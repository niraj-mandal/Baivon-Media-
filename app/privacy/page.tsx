import type { Metadata } from "next";
import { Legal } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy | Baivon Media" };

// PLACEHOLDER: starter text only; have the client confirm it before launch.
export default function Privacy() {
  return (
    <Legal title="Privacy Policy">
      <p>This policy explains how Baivon Media (&ldquo;we&rdquo;) collects and uses information when you visit this website or contact us.</p>
      <h2>What we collect</h2>
      <p>Details you send through our contact form or booking tool, such as your name, email, company and message, plus basic analytics about how the site is used.</p>
      <h2>How we use it</h2>
      <p>To reply to your enquiry, schedule calls, provide our services and improve this website. We do not sell your personal information.</p>
      <h2>Third parties</h2>
      <p>We use trusted providers to run this site, including form handling, scheduling (Cal.com), hosting and analytics. They process data only on our behalf.</p>
      <h2>Your rights</h2>
      <p>You can ask us to access, correct or delete your information at any time by emailing <a className="text-fg underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </Legal>
  );
}
