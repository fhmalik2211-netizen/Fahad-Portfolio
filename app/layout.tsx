import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteOrigin, siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Fahad Hassan | Full-Stack Developer",
    template: "%s | Fahad Hassan",
  },
  description:
    "Fahad Hassan is a full-stack developer from Chiniot, Sargodha, building thoughtful websites, digital products, and reliable web systems.",
  keywords: [
    "Fahad Hassan",
    "full-stack developer",
    "web developer in Chiniot",
    "React developer",
    "Next.js developer",
    "web design and development",
  ],
  authors: [{ name: "Fahad Hassan", url: siteOrigin }],
  creator: "Fahad Hassan",
  publisher: "Fahad Hassan",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Fahad Hassan | Full-Stack Developer",
    description:
      "Thoughtful websites, digital products, and reliable web systems by Fahad Hassan.",
    type: "website",
    url: siteOrigin,
    siteName: "Fahad Hassan",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Fahad Hassan | Full-Stack Developer",
    description:
      "Thoughtful websites, digital products, and reliable web systems by Fahad Hassan.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteOrigin}/#person`,
      name: "Fahad Hassan",
      url: siteOrigin,
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer building thoughtful websites, digital products, and reliable web systems.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chiniot",
        addressRegion: "Sargodha",
        addressCountry: "Pakistan",
      },
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Web development"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: "Fahad Hassan",
      url: siteOrigin,
      description:
        "Portfolio of Fahad Hassan, a full-stack developer from Chiniot, Sargodha.",
      publisher: { "@id": `${siteOrigin}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
