import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { basePath } from "@/lib/base-path";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lifecycle Architecture Studio",
  description:
    "An interactive architecture blueprint for martech, data, and lifecycle design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href={`${basePath}/textures/hero-slate.png`} />
        <link rel="preload" as="image" href={`${basePath}/textures/slate-stone-1920.jpg`} />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          ["--studio-texture-slate" as string]: `url('${basePath}/textures/hero-slate.png')`,
          ["--studio-texture-slate-hd" as string]: `url('${basePath}/textures/slate-stone-1920.jpg')`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
