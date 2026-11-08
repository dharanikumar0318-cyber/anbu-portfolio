import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0f",
};

export const metadata: Metadata = {
  title: "Dharani Kumar Subban | Mechanical Engineer — Precision Engineering & Operations",
  description:
    "Portfolio of Dharani Kumar Subban, Mechanical Engineer specializing in process optimization, safety compliance, CAD/FEA simulation, and streamlined industrial workflows.",
  keywords: [
    "Dharani Kumar Subban",
    "Mechanical Engineer",
    "Process Optimization",
    "Safety Compliance",
    "Compressed Air Leak Detection",
    "Energy Efficiency",
    "Go-kart Chassis",
    "Biodiesel Blends",
    "University of East London",
    "Sathyabama University",
  ],
  authors: [{ name: "Dharani Kumar Subban" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-[#080a0f] text-[#f1f5f9] antialiased selection:bg-[#ff5f15] selection:text-black font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
