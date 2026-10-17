// All site copy and data lives here. Items marked PLACEHOLDER must be swapped
// for the client's real material before launch.

export const site = {
  name: "Baivon Media",
  url: "https://baivonmedia.com", // PLACEHOLDER: final domain
  // Pre-launch switch: false keeps search engines out (draft has sample numbers). Set true at launch.
  launched: false,
  email: "hello@baivonmedia.com", // PLACEHOLDER
  calLink: "", // PLACEHOLDER: cal.com "username/event"; empty shows a fallback card
  socials: {
    linkedin: "https://www.linkedin.com/", // PLACEHOLDER
    instagram: "https://www.instagram.com/", // PLACEHOLDER
  },
};

export const calUrl = `https://cal.com/${site.calLink}`;
// Every "Book a call" button: Cal.com once the link is set, the contact page until then.
export const bookHref = site.calLink ? calUrl : "/contact";

// Markets pulsing on the closing-section globe: [latitude, longitude]. Arcs link them in order.
export const markets: { name: string; at: [number, number] }[] = [
  { name: "San Francisco", at: [37.77, -122.42] },
  { name: "New York", at: [40.71, -74.01] },
  { name: "Toronto", at: [43.65, -79.38] },
  { name: "London", at: [51.51, -0.13] },
  { name: "Sydney", at: [-33.87, 151.21] },
  { name: "Melbourne", at: [-37.81, 144.96] },
  { name: "Los Angeles", at: [34.05, -118.24] },
  { name: "Austin", at: [30.27, -97.74] },
];

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

// Client brands. Logos are official marks taken from each brand's own website (public/logos).
// No `logo` = shown as a text wordmark.
export const logos: { name: string; logo?: string; h?: string; withName?: boolean }[] = [
  { name: "Lovable", logo: "/logos/lovable.svg", h: "h-6" },
  { name: "Replit", logo: "/logos/replit.svg", h: "h-7" },
  { name: "Higgsfield", logo: "/logos/higgsfield.svg", h: "h-6", withName: true },
  { name: "Content Rewards", logo: "/logos/content-rewards.svg", h: "h-9" },
  { name: "Whop", logo: "/logos/whop.svg", h: "h-6" },
  { name: "Polymarket", logo: "/logos/polymarket.svg", h: "h-6" },
  { name: "Shogo AI", logo: "/logos/shogo.svg", h: "h-7" },
  { name: "Airlearn", logo: "/logos/airlearn.svg", h: "h-6" },
];

// PLACEHOLDER: real totals from the client
export const stats = [
  { value: 120, suffix: "M+", label: "Views delivered" },
  { value: 80, suffix: "+", label: "Campaigns launched" },
  { value: 2500, suffix: "+", label: "Creators & clippers" },
  { value: 1.2, prefix: "$", decimals: 2, label: "Avg. CPM" },
];

export const services = [
  {
    tag: "01",
    title: "Content Marketing",
    heading: ["Content", "Marketing"], // two-tone display title on the services panels
    visual: "post" as const,
    body: "Founder-led and brand content that builds authority on X and LinkedIn, written and produced for technical buyers.",
    points: ["Founder ghostwriting", "Short-form video", "Content calendar & analytics"],
  },
  {
    tag: "02",
    title: "Tech Campaigns",
    heading: ["Tech", "Campaigns"],
    visual: "launch" as const,
    body: "Launches, fundraises and feature drops engineered to hit millions of views in the first 72 hours.",
    points: ["Launch video & thread", "Creator seeding", "Real-time view tracking"],
  },
  {
    tag: "03",
    title: "UGC",
    heading: ["UGC", "Creator content"],
    visual: "ugc" as const,
    body: "Vetted creators who make your product look native to the feed. Ready for ads or organic.",
    points: ["Hook-tested scripts", "Full usage rights", "Paid-ads ready cuts"],
  },
  {
    tag: "04",
    title: "Clipping",
    heading: ["Clipping", "At scale"],
    visual: "clips" as const,
    body: "Thousands of clips from your podcasts, demos and talks, distributed by our clipper network. You pay per view.",
    points: ["Pay-per-view CPM", "TikTok, Reels, Shorts, X", "Live campaign dashboard"],
  },
];

// Clip showcase. To add a real clip: put the vertical MP4 in /public/clips (and optionally a
// still frame .jpg as `poster`), set brand/platform/real views, add `logo` from /public/logos,
// and remove `sample`. Entries without `video` show a placeholder tile.
export const clips: {
  title: string;
  brand: string;
  platform: string;
  views: string;
  video?: string;
  poster?: string;
  logo?: string;
  sample?: boolean;
}[] = [
  { title: "Launch day teaser", brand: "Lumen AI", platform: "TikTok", views: "4.2M", sample: true },
  { title: "Founder hot take", brand: "Stackly", platform: "X", views: "1.8M", sample: true },
  { title: "Unboxing the API", brand: "Vectra", platform: "Reels", views: "2.6M", sample: true },
  { title: "Podcast clip", brand: "Orbit", platform: "Shorts", views: "6.1M", sample: true },
  { title: "Day in the life", brand: "Kilo", platform: "TikTok", views: "900K", sample: true },
  { title: "Feature drop", brand: "Flux Labs", platform: "LinkedIn", views: "740K", sample: true },
  { title: "Demo in 30s", brand: "Parallel", platform: "Reels", views: "3.3M", sample: true },
];

// Shown on the contact page and the form's success screen. Timings match the FAQ and How it works.
export const nextSteps = [
  { title: "We reply within one business day", body: "A real person reads every message and gets back to you." },
  { title: "30-minute intro call", body: "We learn your product, audience and goals." },
  { title: "Plan and quote in 48 hours", body: "Hooks, creators, platforms and view targets, all in writing." },
];

// `when` = typical timing shown on the How it works timeline. PLACEHOLDER: confirm with client.
export const steps = [
  { title: "Brief & strategy", when: "Day 1–2", body: "A 30-minute call, then a campaign plan with hooks, creators and view targets within 48 hours." },
  { title: "Create & seed", when: "Days 3–6", body: "Our creators and clippers produce content in your voice. You approve before anything goes live." },
  { title: "Launch & report", when: "Day 7 onward", body: "We distribute across every platform and send live view, CPM and engagement reports." },
];

// SAMPLE content until the client sends real campaigns. For a real case: set `sample: false`,
// add `logo` (from /public/logos), real numbers, and `video` (vertical .mp4 in /public/clips).
// Never pair a real client's logo with invented numbers.
export const cases: {
  brand: string;
  logo?: string;
  sample?: boolean;
  result: { value: string; label: string };
  title: string;
  body: string;
  metrics: { value: string; label: string }[];
  platform: string;
  video?: string;
}[] = [
  {
    brand: "Lumen AI",
    sample: true,
    result: { value: "9.1M", label: "views in 7 days" },
    title: "AI note-taker launch",
    body: "Coordinated launch video, founder thread and 40 creators seeded on day one.",
    metrics: [
      { value: "12x", label: "Site traffic" },
      { value: "$0.84", label: "CPM" },
    ],
    platform: "TikTok",
  },
  {
    brand: "Orbit",
    sample: true,
    result: { value: "30M", label: "views in 6 months" },
    title: "Podcast clipping funnel",
    body: "Long-form episodes repurposed into 1,400 clips across TikTok, Reels and Shorts.",
    metrics: [
      { value: "+41k", label: "Subscribers" },
      { value: "1,400", label: "Clips" },
    ],
    platform: "Shorts",
  },
  {
    brand: "Stackly",
    sample: true,
    result: { value: "-38%", label: "paid acquisition cost" },
    title: "UGC ads that beat studio ads",
    body: "60 creator videos tested against studio ads, with winners scaled on Meta and TikTok.",
    metrics: [
      { value: "2.4x", label: "Click-through rate" },
      { value: "60", label: "Videos" },
    ],
    platform: "Reels",
  },
];

// SAMPLE posts for the "wall of love" until the client sends real ones (screenshots of real
// X/LinkedIn posts, or approved quotes). For a real one: set `sample: false` and add `photo` if available.
export const testimonials: {
  name: string;
  handle: string; // @handle on X, role on LinkedIn
  platform: "x" | "linkedin";
  quote: string;
  photo?: string;
  sample?: boolean;
}[] = [
  { name: "Jordan Lee", handle: "@jordanbuilds", platform: "x", sample: true, quote: "Baivon got our launch in front of more people in three days than our last three launches combined." },
  { name: "Priya Shah", handle: "Head of Growth, podcast network", platform: "linkedin", sample: true, quote: "The clipping program runs itself. We record, they ship hundreds of clips and the views keep compounding." },
  { name: "Marcus Hill", handle: "@marcushill", platform: "x", sample: true, quote: "Their UGC creators actually understand developer tools. Our best-performing ads all came from them." },
  { name: "Elena Park", handle: "Founder, AI startup", platform: "linkedin", sample: true, quote: "Weekly reports with real view counts and CPM. The first agency where I knew exactly what I was paying for." },
  { name: "Sam Okafor", handle: "@samships", platform: "x", sample: true, quote: "Went from zero to 2M views on our demo clips in a month. Inbound demo requests doubled." },
  { name: "Daniel Cho", handle: "CMO, SaaS company", platform: "linkedin", sample: true, quote: "They plan, script, seed and report. We just approve. The easiest marketing partner we've worked with." },
  { name: "Ava Moreno", handle: "@avamakes", platform: "x", sample: true, quote: "Launch day felt unfair. Our video was everywhere on X and TikTok within hours." },
  { name: "Ravi Menon", handle: "Founder, fintech app", platform: "linkedin", sample: true, quote: "A clear plan within 48 hours of the first call and a live campaign a week later. Fast, no fluff." },
];

// Ordered by the doubts that stop a tech buyer booking. PLACEHOLDER: client to confirm the process
// answers (bot views, missed targets, approvals) match how they actually work.
export const faqs = [
  { q: "How much does it cost?", a: "Every campaign is scoped to your goals, platforms and view targets, so pricing is tailored rather than one-size-fits-all. Book a short call and we'll send a clear plan and quote, usually within 48 hours. There are no long-term contracts: engagements run month to month." },
  { q: "How fast can a campaign go live?", a: "Most campaigns launch within 7 days of the brief. Launch campaigns are planned 2 to 3 weeks before your launch date." },
  { q: "What do you need from us to start?", a: "A 30-minute call, your goals and any existing content such as podcasts, demos or launch assets. We handle scripts, creators, editing and distribution from there." },
  { q: "Do we approve content before it goes live?", a: "Yes. Every script and clip is shared with you for approval before anything is posted, so nothing goes out in your name without a yes from you." },
  { q: "How does pay-per-view clipping work?", a: "You set a budget and a CPM. Our clippers post clips from your content across TikTok, Reels, Shorts and X, and are paid only for verified views, so you never pay for content that doesn't perform." },
  { q: "How do you stop fake or bot views?", a: "We only count views we can verify on each platform, vet the accounts our clippers post from, and remove suspicious traffic before it's reported or paid for." },
  { q: "What if a campaign doesn't hit its views?", a: "We agree on view targets before launch and report progress live. If a campaign falls behind, we change hooks, creators and distribution until it's back on track." },
  { q: "Do we own the UGC content?", a: "Yes. Every UGC campaign includes usage rights for organic and paid ads." },
];
