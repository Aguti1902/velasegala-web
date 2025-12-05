import { CLINIC_INFO, SITE_CONFIG } from "@/lib/constants";
import type { WithContext, Dentist } from "schema-dts";

export function LocalBusinessSchema() {
  const schema: WithContext<Dentist> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: CLINIC_INFO.name,
    legalName: CLINIC_INFO.legalName,
    description:
      "Clínica dental en Viladecans especializada en implantes dentales, ortodoncia invisible, estética dental, blanqueamiento, odontopediatría y más. Primera visita gratuita.",
    image: `${SITE_CONFIG.url}/images/clinica-exterior.jpg`,
    logo: `${SITE_CONFIG.url}/logo.png`,
    url: SITE_CONFIG.url,
    telephone: CLINIC_INFO.phone,
    email: CLINIC_INFO.email,
    priceRange: CLINIC_INFO.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_INFO.address.street,
      addressLocality: CLINIC_INFO.address.city,
      addressRegion: CLINIC_INFO.address.region,
      postalCode: CLINIC_INFO.address.postalCode,
      addressCountry: CLINIC_INFO.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC_INFO.geo.latitude,
      longitude: CLINIC_INFO.geo.longitude,
    },
    openingHoursSpecification: CLINIC_INFO.hours.structured.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day.day,
      opens: day.opens,
      closes: day.closes,
    })),
    sameAs: [
      CLINIC_INFO.social.facebook,
      CLINIC_INFO.social.instagram,
    ].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: {
      "@type": "City",
      name: "Viladecans",
    },
    paymentAccepted: "Efectivo, Tarjeta de crédito, Tarjeta de débito, Transferencia",
    currenciesAccepted: "EUR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


