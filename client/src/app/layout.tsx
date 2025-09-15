import type { Metadata, Viewport } from "next";
import { Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import ReactQueryProvider from "@/providers/query-client-provider";
import {
  generateMetadata as generateSEOMetadata,
  generateJsonLd,
} from "@/lib/seo";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Cotzia - Calculadora de Costos y Presupuestos Empresariales",
  description:
    "Herramienta profesional para calcular costos de producción, gestionar insumos y crear presupuestos precisos. Optimiza la rentabilidad de tu negocio con análisis detallados de costos.",
  keywords: [
    "calculadora de costos",
    "presupuestos empresariales",
    "gestión de insumos",
    "costos de producción",
    "análisis de rentabilidad",
    "herramientas empresariales",
    "control de costos",
    "presupuesto online",
    "gestión de productos",
    "calculadora empresarial",
  ],
  url: "/",
  type: "website",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = generateJsonLd("WebSite");
  const organizationJsonLd = generateJsonLd("Organization");
  const webAppJsonLd = generateJsonLd("WebApplication");

  return (
    <html lang="es">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppJsonLd),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cotzia" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${nunito.variable} ${nunito.className} ${geistMono.variable} antialiased flex flex-col justify-between h-svh max-w-svw`}
      >
        <ReactQueryProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
