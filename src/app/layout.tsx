import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {  LoadingProvider, ClientLayout  } from "@/components";
import Script from "next/script";
import RouteTracker from "@/components/routeTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Home Automation",
  description:  "Explore cutting-edge smart home devices including security cameras, smart locks, video door phones, lighting, and automation tools. Designed for safety, convenience, and modern living — from trusted brands like Qubo, Tapo, Atomberg, Philips, and Wipro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
        <Script id="plausible-fallback" strategy="beforeInteractive">
          {`
            window.plausible = window.plausible || function(...args) { 
              (window.plausible.q = window.plausible.q || []).push(args);
            };
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <ClientLayout>
            <RouteTracker />
            {children}
          </ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  );
}
