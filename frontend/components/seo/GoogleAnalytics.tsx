"use client";

import Script from "next/script";

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  // Usar el ID por defecto si no se proporciona uno
  const gaId = measurementId || "G-LF82NH1E0E";

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}

