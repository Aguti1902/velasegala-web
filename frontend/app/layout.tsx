import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { CLINIC_INFO, SITE_CONFIG } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${CLINIC_INFO.name} - Tu Dentista de Confianza en Viladecans`,
    template: `%s | ${CLINIC_INFO.name}`,
  },
  icons: {
    icon: [
      { url: "/images/Logos/Isotipo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/Logos/Isotipo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/Logos/Isotipo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "Clínica dental en Viladecans con más de X años de experiencia. Implantes dentales, ortodoncia invisible, estética dental y más. Primera visita gratuita. ¡Pide tu cita!",
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
      "Clínica dental en Viladecans con más de X años de experiencia. Implantes dentales, ortodoncia invisible, estética dental y más. Primera visita gratuita.",
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
      "Clínica dental en Viladecans. Implantes, ortodoncia invisible, estética dental. Primera visita gratuita.",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={raleway.variable}>
      <body className="font-raleway antialiased">
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}

