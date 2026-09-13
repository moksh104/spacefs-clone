import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voidfs.dev"),
  title: {
    default: "VoidFS — Infinite Cloud Storage for Creatives",
    template: "%s | VoidFS",
  },
  description:
    "VoidFS gives you a limitless cloud drive that mounts like a local disk. Stream terabyte-scale files instantly, collaborate in real time, and never wait for downloads again.",
  keywords: [
    "cloud storage",
    "virtual filesystem",
    "creative workflow",
    "large file storage",
    "instant file access",
    "team collaboration",
    "video editing storage",
  ],
  authors: [{ name: "VoidFS Team" }],
  creator: "VoidFS",
  publisher: "VoidFS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://voidfs.dev",
    siteName: "VoidFS",
    title: "VoidFS — Infinite Cloud Storage for Creatives",
    description:
      "A limitless cloud drive that mounts like a local disk. Stream terabytes instantly.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoidFS — Infinite Cloud Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoidFS — Infinite Cloud Storage for Creatives",
    description: "A limitless cloud drive that mounts like a local disk.",
    images: ["/images/og-image.png"],
    creator: "@voidfs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
    { media: "(prefers-color-scheme: light)", color: "#080c14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head />
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
