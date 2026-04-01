import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neo Motion Clinic Dashboard",
    short_name: "Neo Motion",
    description:
      "Installable clinic appointments dashboard with MongoDB-backed insights and patient details.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef6fb",
    theme_color: "#eef6fb",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
