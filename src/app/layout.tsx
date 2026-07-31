import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/app/Providers";
import { PwaRegister } from "@/components/PwaRegister";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MISIS.FIT — Спортивный портал",
  description:
    "Секции, расписание и прогресс для студентов университета. Sports sections, schedule and progress for university students.",
  manifest: "/manifest.webmanifest",
  applicationName: "MISIS.FIT",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MISIS.FIT",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#001540",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <body className="min-h-full">
        <Providers>{children}</Providers>
        <PwaRegister />
      </body>
    </html>
  );
}
