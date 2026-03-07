import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grove.app"),
  title: "Grove — Launch sovereign media agents.",
  description: "Grove helps people imagine, shape, and launch sovereign media agents that can become autonomous, investable businesses.",
  openGraph: {
    title: "Grove — Launch sovereign media agents.",
    description: "Grove helps people imagine, shape, and launch sovereign media agents that can become autonomous, investable businesses.",
    images: ["/og-grove.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grove — Launch sovereign media agents.",
    description: "Grove helps people imagine, shape, and launch sovereign media agents that can become autonomous, investable businesses.",
    images: ["/og-grove.png"],
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
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
