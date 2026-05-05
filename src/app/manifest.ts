import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Afenda",
    short_name: "Afenda",
    description:
      "Afenda ERP operational workspace: governed workflows, canonical records, evidence-bound approvals, and audit lineage.",
    start_url: "/",
    display: "standalone",

    background_color: "#05070b",
    theme_color: "#0a0f16",

    icons: [
      {
        src: "/icons/afenda-icon-192-transparent.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/afenda-icon-512-transparent.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/afenda-icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
