import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlogListing, type Post, type Category, type Tag } from "@/components/blog/BlogListing";
import { API_URL } from "@/lib/config";

// Server Component: los artículos van en el HTML inicial (indexables por Google)
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog de Salud Dental en Viladecans | Consejos de tu Dentista",
  description:
    "Consejos de salud bucodental, guías de tratamientos y respuestas a tus dudas dentales escritas por el equipo de la Clínica Dental Vela-Segalà en Viladecans.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Salud Dental | Clínica Dental Vela-Segalà Viladecans",
    description:
      "Guías y consejos de salud bucodental del equipo de la Clínica Dental Vela-Segalà en Viladecans.",
    type: "website",
    url: "/blog",
  },
};

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    return (Array.isArray(data) ? data : data?.data ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export default async function BlogPage() {
  const [posts, categories, tags] = await Promise.all([
    getJson<Post[]>("/posts?status=PUBLISHED&limit=100", []),
    getJson<Category[]>("/categories", []),
    getJson<Tag[]>("/tags", []),
  ]);

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Blog de Salud Dental
            </h1>
            <p className="text-xl text-slate-700 leading-relaxed">
              Consejos, guías y artículos sobre <strong>salud bucodental en Viladecans</strong>,
              tratamientos dentales y cuidados. Todo lo que necesitas saber para mantener tu sonrisa sana.
            </p>
          </div>
        </div>
      </section>

      <BlogListing posts={posts} categories={categories} tags={tags} />
    </>
  );
}
