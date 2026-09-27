import type { MetadataRoute } from "next";
import { shopName, t } from "@/i18n";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: shopName,
    short_name: "SKT",
    description: t.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1F383F",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
