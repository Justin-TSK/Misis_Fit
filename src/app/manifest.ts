import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MISIS.FIT — Спортивный портал",
    short_name: "MISIS.FIT",
    description:
      "Секции, расписание и прогресс для студентов университета. Sports sections, schedule and progress for university students.",
    start_url: "/",
    display: "standalone",
    background_color: "#001540",
    theme_color: "#001540",
    lang: "ru",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
