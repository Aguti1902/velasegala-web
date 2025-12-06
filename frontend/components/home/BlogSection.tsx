"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { getApiUrl } from "@/lib/config";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  publishAt: string;
  categories: Array<{ name: string }>;
}

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/posts?status=PUBLISHED&limit=3`);
        const data = await response.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error("Error al cargar posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando artículos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // No mostrar sección si no hay posts
  }
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
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {post.categories.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.categories[0].name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishAt)}
                </div>
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-black transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
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


