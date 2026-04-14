import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CLINIC_INFO, SITE_CONFIG } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const PROD_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.velasegalaviladecans.com';

export const metadata: Metadata = {
  metadataBase: new URL(PROD_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default: `${CLINIC_INFO.name} - Tu Dentista de Confianza en Viladecans`,
    template: `%s | ${CLINIC_INFO.name}`,
  },
  icons: {
    icon: [
      { url: "/images/Logos/FAVICON.png", sizes: "32x32", type: "image/png" },
      { url: "/images/Logos/FAVICON.png", sizes: "16x16", type: "image/png" },
      { url: "/images/Logos/FAVICON.png", sizes: "192x192", type: "image/png" },
      { url: "/images/Logos/FAVICON.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/Logos/FAVICON.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/Logos/FAVICON.png",
  },
  description:
    "Clínica dental en Viladecans con más de 25 años de experiencia. Implantes dentales, ortodoncia invisible, estética dental y más. Calidad y servicio de excelencia. ¡Pide tu cita!",
  keywords: [
    "clínica dental viladecans",
    "dentista viladecans",
    "clínica dental en viladecans",
    "dentista en viladecans",
    "implantes dentales viladecans",
    "ortodoncia viladecans",
    "ortodoncia invisible viladecans",
    "estética dental viladecans",
  ],
  authors: [{ name: CLINIC_INFO.name }],
  creator: CLINIC_INFO.name,
  publisher: CLINIC_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_CONFIG.url,
    siteName: CLINIC_INFO.name,
    title: `${CLINIC_INFO.name} - Tu Dentista de Confianza en Viladecans`,
    description:
      "Clínica dental en Viladecans con más de 25 años de experiencia. Implantes dentales, ortodoncia invisible, estética dental y más. Calidad y servicio de excelencia.",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: CLINIC_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLINIC_INFO.name} - Tu Dentista de Confianza en Viladecans`,
    description:
      "Clínica dental en Viladecans. Implantes, ortodoncia invisible, estética dental. Calidad y servicio de excelencia.",
    images: [`${SITE_CONFIG.url}/og-image.jpg`],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      </head>
      <body className="font-sans antialiased">
        {GTM_ID && <GoogleTagManagerNoScript gtmId={GTM_ID} />}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-LF82NH1E0E"} />
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}

