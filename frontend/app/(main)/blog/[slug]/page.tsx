import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Calendar, Clock, Tag, Folder, ArrowLeft } from "lucide-react";
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

      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mt-8 max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-black mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Blog
            </Link>

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
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="max-w-4xl mx-auto prose prose-slate prose-lg max-w-none">
            <div className="prose-headings:font-bold prose-headings:text-black prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-black prose-a:font-bold prose-strong:text-black prose-ul:text-slate-700 prose-ol:text-slate-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
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
        </div>
      </section>
    </>
  );
}
