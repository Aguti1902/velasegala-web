import { CLINIC_INFO, SITE_CONFIG } from "@/lib/constants";
import type { WithContext, Article } from "schema-dts";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate: string;
  authorName: string;
  imageUrl: string;
  slug: string;
}

export function ArticleSchema({
  title,
  description,
  publishedDate,
  modifiedDate,
  authorName,
  imageUrl,
  slug,
}: ArticleSchemaProps) {
  const schema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: CLINIC_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


