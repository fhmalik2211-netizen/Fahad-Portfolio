import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Fahad Hassan | Full-Stack Developer",
		short_name: "Fahad Hassan",
		description: "Thoughtful websites, digital products, and reliable web systems by Fahad Hassan.",
		start_url: "/",
		display: "standalone",
		background_color: "#eff7f0",
		theme_color: "#102a1c",
		icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
	};
}
