import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import CustomCursor from "@/components/CustomCursor";
import SnowfallCanvas from "@/components/SnowfallCanvas";
import GradientMesh from "@/components/GradientMesh";
import FloatingParticles from "@/components/FloatingParticles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Justice for DODOBONYA",
  description:
    "Kindness should never cost a job. Community-driven token on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body className="antialiased min-h-screen overflow-x-hidden">
        <GradientMesh />
        <FloatingParticles />
        <div className="noise-overlay film-grain" aria-hidden />
        <SnowfallCanvas />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
