import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const LATEST_POSTS = [
  {
    title: "¿Cuándo necesito un implante dental? Guía completa",
    excerpt: "Descubre los casos en los que un implante dental es la mejor solución para recuperar tu sonrisa y funcionalidad dental.",
    slug: "cuando-necesito-implante-dental",
    date: "5 Dic 2024",
    category: "Implantes Dentales",
    image: "/images/estetica-dental-viladecans.jpg",
  },
  {
    title: "Ortodoncia invisible: ventajas de Invisalign",
    excerpt: "Todo lo que necesitas saber sobre la ortodoncia invisible y por qué es la opción más elegida por adultos.",
    slug: "ortodoncia-invisible-ventajas-invisalign",
    date: "28 Nov 2024",
    category: "Ortodoncia",
    image: "/images/estetica-dental-viladecans.jpg",
  },
  {
    title: "Cuidados después de un implante dental",
    excerpt: "Consejos profesionales para una recuperación óptima tras la colocación de tus implantes dentales.",
    slug: "cuidados-despues-implante-dental",
    date: "20 Nov 2024",
    category: "Implantes Dentales",
    image: "/images/estetica-dental-viladecans.jpg",
  },
];

export function BlogSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
              Últimos Artículos
            </h2>
            <p className="text-slate-600 max-w-xl">
              Consejos y novedades sobre salud dental en Viladecans
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-black font-bold hover:gap-3 transition-all"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {LATEST_POSTS.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-black transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center text-black font-semibold text-sm group-hover:gap-2 transition-all">
                  Leer más
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-black font-bold"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}


