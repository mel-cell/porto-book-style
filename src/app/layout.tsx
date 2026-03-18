import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat, Playfair_Display, Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-handwrite",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dryBrush = localFont({
  src: [
    {
      path: "../../public/fonts/DryBrush.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-brush",
  display: "swap",
});

const zeyada = localFont({
  src: [
    {
      path: "../../public/fonts/Zeyada.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-zeyada",
  display: "swap",
});

const roughDraft = localFont({
  src: [
    {
      path: "../../public/fonts/RoughDraft.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-rough",
  display: "swap",
});

const scrawl = localFont({
  src: [
    {
      path: "../../public/fonts/Scrawl.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-scrawl",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melvin — Web Dev & DevOps",
  description:
    "Portfolio of Melvin (mel-cell) — a web developer and DevOps engineer. Explore projects, skills, and experience through an interactive flipbook experience.",
  openGraph: {
    title: "Melvin — Web Dev & DevOps",
    description: "Interactive flipbook portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} ${playfairDisplay.variable} ${lora.variable} ${dryBrush.variable} ${zeyada.variable} ${roughDraft.variable} ${scrawl.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
