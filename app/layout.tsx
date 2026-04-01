import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Toaster } from "sonner";

import "@/app/globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "Neo Motion Clinic Dashboard",
  description:
    "Installable clinic appointments dashboard for managing bookings, service demand, and patient details.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Neo Motion"
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  icons: {
    icon: [{ url: "/icon", sizes: "512x512", type: "image/png" }],
    shortcut: [{ url: "/icon", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#eef6fb",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
