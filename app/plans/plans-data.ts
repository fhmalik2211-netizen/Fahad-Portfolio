export type Plan = {
  name: string;
  price: number;
  description: string;
  featured: boolean;
  cta: string;
  perks: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: 70,
    description: "A clean, quick-start website for personal brands and early-stage businesses.",
    featured: false,
    cta: "Book Starter",
    perks: [
      "1-page personal or business landing page",
      "Mobile-friendly layout with basic sections",
      "Contact CTA and simple inquiry form",
      "1 round of revision",
      "Fast launch and deployment support",
    ],
  },
  {
    name: "Growth",
    price: 130,
    description: "A stronger service site with more depth, structure, and conversion-focused details.",
    featured: true,
    cta: "Book Growth",
    perks: [
      "Up to 3-5 pages with service and portfolio sections",
      "Custom UI layout and consistent visual system",
      "SEO basics, metadata, and page structure",
      "Responsive design across common devices",
      "2 rounds of revision and front-end handoff",
    ],
  },
  {
    name: "Scale",
    price: 210,
    description: "A more premium business website built for credibility, lead generation, and growth.",
    featured: false,
    cta: "Book Scale",
    perks: [
      "Multi-page business website with advanced sections",
      "Custom animations, premium visual treatment, and UX polish",
      "Lead capture forms, service logic, and call-to-action flows",
      "Structured content blocks and optimization guidance",
      "3 rounds of revision and launch QA",
    ],
  },
];

export function getPlanByName(name?: string | null) {
  return plans.find((plan) => plan.name.toLowerCase() === (name || "").toLowerCase()) ?? plans[2];
}
