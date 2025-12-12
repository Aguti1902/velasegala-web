import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Calendar, Clock, Tag, Folder, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { API_URL } from "@/lib/config";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishAt: string;
  categories: Array<{ id: string; name: string; slug: string }>;
  tags: Array<{ id: string; name: string; slug: string }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts/slug/${slug}`, {
      next: { revalidate: 60 }, // Revalidar cada minuto
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(
  postId: string,
  categories: string[],
  tags: string[],
  limit: number = 3
): Promise<Post[]> {
  try {
    // Construir query para obtener posts relacionados
    const categoryQuery = categories.map((c) => `category=${c}`).join("&");
    const tagQuery = tags.map((t) => `tag=${t}`).join("&");
    const query = [categoryQuery, tagQuery].filter(Boolean).join("&");

    const response = await fetch(
      `${API_URL}/posts?${query}&limit=10&status=PUBLISHED`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const posts = data.data || [];

    // Filtrar el post actual y limitar resultados
    return posts
      .filter((p: Post) => p.id !== postId)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

async function getRecentPosts(currentPostId: string, limit: number = 5): Promise<Post[]> {
  try {
    const response = await fetch(
      `${API_URL}/posts?limit=10&status=PUBLISHED`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const posts = data.data || [];

    // Filtrar el post actual y limitar resultados
    return posts
      .filter((p: Post) => p.id !== currentPostId)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const [relatedPosts, recentPosts, categories] = await Promise.all([
    getRelatedPosts(
      post.id,
      post.categories.map((c) => c.slug),
      post.tags.map((t) => t.slug)
    ),
    getRecentPosts(post.id),
    getAllCategories(),
  ]);

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.metaDescription || ""}
        publishedDate={post.publishAt}
        modifiedDate={post.publishAt}
        authorName="Clínica Dental Vela-Segalà"
        imageUrl={post.featuredImage || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://velasegala-web-emc8.vercel.app'}/images/logo.png`}
        slug={post.slug}
      />
      <FAQSchema faqs={[]} />

      {/* Hero - Solo Breadcrumbs y Back Button */}
      <section className="pt-8 pb-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_350px] gap-12">
            {/* Main Content */}
            <article>
              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className="text-xs bg-gray-100 text-slate-700 px-3 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {calculateReadingTime(post.content)} min lectura
                </span>
              </div>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-slate prose-lg max-w-none">
                <div className="prose-headings:font-bold prose-headings:text-black prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-black prose-a:font-bold prose-strong:text-black prose-ul:text-slate-700 prose-ol:text-slate-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/blog?tag=${tag.slug}`}
                        className="px-4 py-2 bg-gray-100 text-slate-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-black to-gray-800 rounded-2xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">
                  ¿Necesitas una Consulta?
                </h3>
                <p className="text-gray-300 mb-6">
                  Pide tu primera visita gratuita en nuestra clínica dental de
                  Viladecans
                </p>
                <Link
                  href="/pedir-cita"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                >
                  Pedir Cita Gratuita
                </Link>
              </div>
            </article>

            {/* Sticky Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-8 space-y-6">
                {/* Categorías */}
                {categories.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                      <Folder className="w-5 h-5" />
                      Categorías
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/blog?category=${category.slug}`}
                          className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <span className="text-sm font-medium text-slate-700 group-hover:text-black">
                            {category.name}
                          </span>
                          {category._count && (
                            <span className="text-xs bg-gray-200 text-slate-600 px-2 py-1 rounded-full">
                              {category._count.posts}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Artículos Relacionados */}
                {relatedPosts.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Artículos Relacionados
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            {/* Image */}
                            {relatedPost.featuredImage && (
                              <div className="relative aspect-video bg-gray-100">
                                <Image
                                  src={relatedPost.featuredImage}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="p-4">
                              {/* Categories */}
                              {relatedPost.categories.length > 0 && (
                                <span className="text-xs bg-gray-100 text-slate-700 px-2 py-1 rounded-full font-medium">
                                  {relatedPost.categories[0].name}
                                </span>
                              )}

                              {/* Title */}
                              <h4 className="text-sm font-bold text-black mt-2 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                                {relatedPost.title}
                              </h4>

                              {/* Meta */}
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(relatedPost.publishAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {calculateReadingTime(relatedPost.content)} min
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Posts Recientes */}
                {recentPosts.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Artículos Recientes
                    </h3>
                    <div className="space-y-3">
                      {recentPosts.map((recentPost) => (
                        <Link
                          key={recentPost.id}
                          href={`/blog/${recentPost.slug}`}
                          className="block group"
                        >
                          <article className="p-3 bg-white rounded-xl hover:bg-gray-100 transition-colors">
                            <h4 className="text-sm font-bold text-black mb-2 line-clamp-2 group-hover:text-gray-700">
                              {recentPost.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(recentPost.publishAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {calculateReadingTime(recentPost.content)} min
                              </span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Sidebar */}
                <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-6 text-white text-center">
                  <h3 className="text-lg font-bold mb-3">
                    Primera Visita Gratuita
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Agenda tu cita sin compromiso
                  </p>
                  <Link
                    href="/pedir-cita"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-black rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Pedir Cita
                  </Link>
                </div>

                {/* Ver Todos los Artículos */}
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Ver Todos los Artículos
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
