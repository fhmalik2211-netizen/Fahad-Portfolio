import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fahad Hassan | Full-Stack Developer",
    short_name: "Fahad Hassan",
    description:
      "Portfolio of Fahad Hassan, a full-stack developer building thoughtful digital products.",
    start_url: "/",
    display: "standalone",
    background_color: "#eff7f0",
    theme_color: "#23834f",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}