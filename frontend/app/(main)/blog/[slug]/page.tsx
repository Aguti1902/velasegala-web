import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { api } from "@/lib/api";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await api.getPostBySlug(params.slug);

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      keywords: post.tags.map((tag) => tag.name),
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || undefined,
        images: post.featuredImage ? [post.featuredImage] : [],
        type: "article",
        publishedTime: post.publishAt || post.createdAt,
        modifiedTime: post.updatedAt,
        authors: post.author ? [post.author.name] : undefined,
      },
    };
  } catch {
    return {
      title: "Post no encontrado",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;

  try {
    post = await api.getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.title}
        publishedDate={post.publishAt || post.createdAt}
        modifiedDate={post.updatedAt}
        authorName={post.author?.name || "Clínica Dental Viladecans"}
        imageUrl={post.featuredImage || "/logo.png"}
        slug={post.slug}
      />

      {/* Hero */}
      <article className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 mb-4">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/categoria/${category.slug}`}
                  className="text-sm bg-primary-600 text-white px-3 py-1 rounded-full hover:bg-primary-700 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{formatDate(post.publishAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{readingTime} min de lectura</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <span>✍️</span>
                <span>{post.author.name}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-video bg-slate-200 rounded-xl overflow-hidden mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </article>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-sm font-medium text-slate-500 mb-4">
                ETIQUETAS
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog/tag/${tag.slug}`}
                    className="text-sm border border-slate-300 text-slate-700 px-3 py-1 rounded-full hover:border-primary-600 hover:text-primary-600 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
          {post.author && (
            <div className="mt-12 p-6 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-2xl text-primary-600 font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-lg">{post.author.name}</div>
                  <div className="text-sm text-slate-600">
                    Dentista en Clínica Dental Viladecans
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary-600 text-white rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas más información?
            </h3>
            <p className="text-primary-100 mb-6">
              Pide tu primera visita gratuita y resolveremos todas tus dudas
            </p>
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-colors"
            >
              Pedir Cita Gratuita
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {/* Aquí podrías añadir posts relacionados si los tienes */}
    </>
  );
}


