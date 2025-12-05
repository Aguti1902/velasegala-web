"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Search, Calendar, Clock, Tag, Folder } from "lucide-react";

// Datos mock de categorías y tags (reemplazar con API cuando esté disponible)
const CATEGORIES = [
  { id: "1", name: "Salud Bucodental", slug: "salud-bucodental", count: 12 },
  { id: "2", name: "Tratamientos", slug: "tratamientos", count: 18 },
  { id: "3", name: "Higiene Dental", slug: "higiene-dental", count: 8 },
  { id: "4", name: "Ortodoncia", slug: "ortodoncia", count: 6 },
  { id: "5", name: "Implantes", slug: "implantes", count: 10 },
  { id: "6", name: "Estética Dental", slug: "estetica-dental", count: 7 },
];

const TAGS = [
  { id: "1", name: "Implantes Dentales", slug: "implantes-dentales", count: 10 },
  { id: "2", name: "Invisalign", slug: "invisalign", count: 8 },
  { id: "3", name: "Blanqueamiento", slug: "blanqueamiento", count: 5 },
  { id: "4", name: "Cuidados", slug: "cuidados", count: 15 },
  { id: "5", name: "Prevención", slug: "prevencion", count: 12 },
  { id: "6", name: "Niños", slug: "ninos", count: 7 },
  { id: "7", name: "Urgencias", slug: "urgencias", count: 4 },
  { id: "8", name: "Consejos", slug: "consejos", count: 9 },
];

// Posts mock
const MOCK_POSTS = [
  {
    id: "1",
    title: "Implantes Dentales en Viladecans: Todo lo que Necesitas Saber",
    slug: "implantes-dentales-viladecans-guia-completa",
    excerpt: "Guía completa sobre implantes dentales: tipos, proceso, cuidados y ventajas. Descubre por qué son la mejor solución para recuperar tu sonrisa.",
    featuredImage: "/images/implantes-dentales-viladecans.jpg",
    categories: ["Tratamientos", "Implantes"],
    tags: ["Implantes Dentales", "Cuidados", "Consejos"],
    publishDate: "2024-01-15",
    readTime: 8,
  },
  {
    id: "2",
    title: "5 Consejos para Mantener tus Dientes Sanos en 2024",
    slug: "consejos-dientes-sanos-2024",
    excerpt: "Descubre los mejores consejos de nuestros dentistas en Viladecans para mantener una salud bucodental óptima durante todo el año.",
    featuredImage: "/images/estetica-dental-viladecans.jpg",
    categories: ["Salud Bucodental", "Higiene Dental"],
    tags: ["Prevención", "Cuidados", "Consejos"],
    publishDate: "2024-01-10",
    readTime: 5,
  },
  {
    id: "3",
    title: "Ortodoncia Invisible Invisalign: Preguntas Frecuentes",
    slug: "invisalign-preguntas-frecuentes",
    excerpt: "Respondemos todas tus dudas sobre la ortodoncia invisible Invisalign: duración, precio, cuidados y resultados esperados.",
    featuredImage: "/images/ortodoncia-invisalign-viladecans.jpg",
    categories: ["Ortodoncia", "Tratamientos"],
    tags: ["Invisalign", "Cuidados", "Prevención"],
    publishDate: "2024-01-05",
    readTime: 6,
  },
  {
    id: "4",
    title: "Cómo Preparar a tu Hijo para su Primera Visita al Dentista",
    slug: "primera-visita-dentista-ninos",
    excerpt: "Consejos prácticos para que la primera visita de tu hijo al dentista sea una experiencia positiva y sin miedos.",
    featuredImage: "/images/odontopediatria-viladecans.jpg",
    categories: ["Salud Bucodental"],
    tags: ["Niños", "Prevención", "Consejos"],
    publishDate: "2023-12-28",
    readTime: 4,
  },
  {
    id: "5",
    title: "Blanqueamiento Dental: Mitos y Realidades",
    slug: "blanqueamiento-dental-mitos-realidades",
    excerpt: "Desmontamos los mitos más comunes sobre el blanqueamiento dental y te contamos qué esperar de este tratamiento estético.",
    featuredImage: "/images/estetica-dental-viladecans.jpg",
    categories: ["Estética Dental", "Tratamientos"],
    tags: ["Blanqueamiento", "Consejos"],
    publishDate: "2023-12-20",
    readTime: 7,
  },
  {
    id: "6",
    title: "Urgencias Dentales: Cuándo Acudir al Dentista de Inmediato",
    slug: "urgencias-dentales-cuando-acudir",
    excerpt: "Aprende a identificar las urgencias dentales que requieren atención inmediata y cómo actuar en cada situación.",
    featuredImage: null,
    categories: ["Salud Bucodental"],
    tags: ["Urgencias", "Prevención", "Consejos"],
    publishDate: "2023-12-15",
    readTime: 5,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar posts
  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesTags && matchesSearch;
  });

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory || selectedTags.length > 0 || searchQuery;

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
                    {CATEGORIES.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.name ? null : category.name
                          )}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                            selectedCategory === category.name
                              ? "bg-black text-white font-bold"
                              : "hover:bg-gray-200 text-slate-700"
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedCategory === category.name
                              ? "bg-white text-black"
                              : "bg-gray-200 text-slate-600"
                          }`}>
                            {category.count}
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
                    {TAGS.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.name)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                          selectedTags.includes(tag.name)
                            ? "bg-black text-white font-bold"
                            : "bg-white border border-gray-300 text-slate-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag.name} ({tag.count})
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
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory(null)} className="hover:text-gray-300">×</button>
                      </span>
                    )}
                    {selectedTags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-sm rounded-full">
                        {tag}
                        <button onClick={() => toggleTag(tag)} className="hover:text-gray-300">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                  <p className="text-lg text-slate-600 mb-4">
                    No se encontraron artículos con los filtros seleccionados.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Ver Todos los Artículos
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Image */}
                      <Link href={`/blog/${post.slug}`}>
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="text-6xl">📝</div>
                          )}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-bold text-black mb-3 hover:text-gray-700 transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                        </Link>

                        {/* Excerpt */}
                        <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-gray-200">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishDate).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} min
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
