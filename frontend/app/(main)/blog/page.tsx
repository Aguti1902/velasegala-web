"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Search, Calendar, Clock, Tag, Folder } from "lucide-react";
import { getApiUrl } from "@/lib/config";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  publishAt: string;
  publishStatus: string;
  categories: Array<{ id: string; name: string; slug: string }>;
  tags: Array<{ id: string; name: string; slug: string }>;
  content: string;
}

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toasts, hideToast, error } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = getApiUrl();
        console.log("🔗 Fetching blog data from:", apiUrl);
        
        if (!apiUrl || apiUrl.includes('undefined')) {
          console.error("❌ API URL is invalid:", apiUrl);
          throw new Error("API URL no configurada correctamente");
        }
        
        // Obtener posts publicados (todos, sin límite)
        const postsUrl = `${apiUrl}/posts?status=PUBLISHED&limit=100`;
        console.log("📤 Fetching posts from:", postsUrl);
        
        const postsResponse = await fetch(postsUrl);
        console.log("📥 Posts response status:", postsResponse.status);
        
        if (!postsResponse.ok) {
          const errorText = await postsResponse.text();
          console.error("❌ Posts API error:", postsResponse.status, errorText);
          throw new Error(`Posts API error: ${postsResponse.status} - ${errorText}`);
        }
        
        const postsData = await postsResponse.json();
        console.log("📝 Posts data:", postsData);
        // El backend devuelve { data: [...], total: number }
        const postsArray = Array.isArray(postsData) ? postsData : (postsData.data || []);
        setPosts(postsArray);

        // Obtener categorías
        const categoriesUrl = `${apiUrl}/categories`;
        console.log("📤 Fetching categories from:", categoriesUrl);
        const categoriesResponse = await fetch(categoriesUrl);
        console.log("📥 Categories response status:", categoriesResponse.status);
        
        if (!categoriesResponse.ok) {
          const errorText = await categoriesResponse.text();
          console.error("❌ Categories API error:", categoriesResponse.status, errorText);
          throw new Error(`Categories API error: ${categoriesResponse.status}`);
        }
        const categoriesData = await categoriesResponse.json();
        console.log("📁 Categories data:", categoriesData);
        const categoriesArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData.data || []);
        setCategories(categoriesArray);

        // Obtener tags
        const tagsUrl = `${apiUrl}/tags`;
        console.log("📤 Fetching tags from:", tagsUrl);
        const tagsResponse = await fetch(tagsUrl);
        console.log("📥 Tags response status:", tagsResponse.status);
        
        if (!tagsResponse.ok) {
          const errorText = await tagsResponse.text();
          console.error("❌ Tags API error:", tagsResponse.status, errorText);
          throw new Error(`Tags API error: ${tagsResponse.status}`);
        }
        const tagsData = await tagsResponse.json();
        console.log("🏷️ Tags data:", tagsData);
        const tagsArray = Array.isArray(tagsData) ? tagsData : (tagsData.data || []);
        setTags(tagsArray);
      } catch (err) {
        console.error("❌ Error al cargar datos del blog:", err);
        // Mostrar mensaje de error al usuario
        error("Error al cargar el blog. Por favor, recarga la página.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.categories.some((cat) => cat.slug === selectedCategory)
      );
    }

    // Filtrar por tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every((tagSlug) =>
          post.tags.some((tag) => tag.slug === tagSlug)
        )
      );
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [posts, selectedCategory, selectedTags, searchQuery]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTags, searchQuery]);

  const toggleTag = (tagSlug: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagSlug)
        ? prev.filter((t) => t !== tagSlug)
        : [...prev, tagSlug]
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory || selectedTags.length > 0 || searchQuery;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando blog...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
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

      {/* Blog Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3 mb-8 lg:mb-0">
              <div className="sticky top-24 space-y-8">
                {/* Búsqueda */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Buscar Artículos
                  </h3>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Categorías */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <Folder className="w-5 h-5" />
                    Categorías
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === category.slug ? null : category.slug
                            )
                          }
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                            selectedCategory === category.slug
                              ? "bg-black text-white font-bold"
                              : "hover:bg-gray-200 text-slate-700"
                          }`}
                        >
                          <span>{category.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedCategory === category.slug
                                ? "bg-white text-black"
                                : "bg-gray-200 text-slate-600"
                            }`}
                          >
                            {category._count?.posts || 0}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Etiquetas */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.slug)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                          selectedTags.includes(tag.slug)
                            ? "bg-black text-white font-bold"
                            : "bg-white border border-gray-300 text-slate-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag.name} ({tag._count?.posts || 0})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Limpiar Filtros */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-gray-200 text-black rounded-xl font-bold hover:bg-gray-300 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                )}
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="lg:col-span-9">
              {/* Filtros activos */}
              {hasActiveFilters && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>{filteredPosts.length}</strong> artículos encontrados
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-full">
                        {categories.find((c) => c.slug === selectedCategory)?.name}
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="hover:text-gray-300"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedTags.map((tagSlug) => {
                      const tag = tags.find((t) => t.slug === tagSlug);
                      return (
                        <span
                          key={tagSlug}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-full"
                        >
                          {tag?.name}
                          <button
                            onClick={() => toggleTag(tagSlug)}
                            className="hover:text-gray-300"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <p className="text-lg text-slate-600 mb-4">
                    {posts.length === 0
                      ? "Aún no hay artículos publicados."
                      : "No se encontraron artículos con los filtros seleccionados."}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                    >
                      Ver Todos los Artículos
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {paginatedPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Image */}
                      <Link href={`/blog/${post.slug}`}>
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden relative">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="text-6xl">📝</div>
                          )}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        {/* Categories */}
                        {post.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.categories.slice(0, 2).map((category) => (
                              <span
                                key={category.id}
                                className="text-xs bg-gray-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-bold text-black mb-3 hover:text-gray-700 transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                        </Link>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-gray-200">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {calculateReadingTime(post.content)} min
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </>
  );
}
