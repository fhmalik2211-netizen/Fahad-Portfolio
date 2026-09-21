import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fahad Hassan | Developer & Designer",
  description: "The portfolio of Fahad Hassan, an independent developer and designer.",
  keywords: ["Fahad Hassan", "full-stack developer", "web developer", "React", "Next.js"],
  creator: "Fahad Hassan",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Fahad Hassan | Developer & Designer",
    description: "The portfolio of Fahad Hassan, an independent developer and designer.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fahad Hassan | Developer & Designer",
    description: "The portfolio of Fahad Hassan, an independent developer and designer.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
