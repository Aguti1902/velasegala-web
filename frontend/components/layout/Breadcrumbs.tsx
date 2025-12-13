import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

interface BreadcrumbsProps {
  items: Array<{
    name: string;
    href: string;
  }>;
  centered?: boolean;
}

export function Breadcrumbs({ items, centered = false }: BreadcrumbsProps) {
  // Siempre incluir Home al principio
  const breadcrumbs = [{ name: "Inicio", href: "/" }, ...items];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <nav aria-label="Breadcrumb" className={`text-sm text-slate-600 ${centered ? 'flex justify-center' : ''}`}>
        <ol className={`flex items-center gap-2 flex-wrap ${centered ? 'justify-center' : ''}`}>
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="text-slate-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 font-medium">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}


