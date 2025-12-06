"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Calendar,
  Image as ImageIcon,
  Tag,
  FolderTree,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export default function AdminPostEditPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const isNewPost = postId === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImageUrl: "",
    metaTitle: "",
    metaDescription: "",
    publishStatus: "DRAFT" as "DRAFT" | "PUBLISHED" | "SCHEDULED",
    publishAt: new Date().toISOString().slice(0, 16),
    categories: [] as string[],
    tags: [] as string[],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(!isNewPost);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fetchPost = useCallback(async () => {
    if (!postId || isNewPost) return;
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`
      );
      const post = await response.json();

      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        featuredImageUrl: post.featuredImageUrl || "",
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        publishStatus: post.publishStatus || "DRAFT",
        publishAt: post.publishAt
          ? new Date(post.publishAt).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),
        categories: post.categories?.map((c: Category) => c.id) || [],
        tags: post.tags?.map((t: Tag) => t.id) || [],
      });
    } catch (error) {
      console.error("Error al cargar artículo:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, isNewPost]);

  const fetchCategoriesAndTags = useCallback(async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`),
      ]);

      const categoriesData = await categoriesRes.json();
      const tagsData = await tagsRes.json();

      setCategories(categoriesData || []);
      setTags(tagsData || []);
    } catch (error) {
      console.error("Error al cargar categorías y tags:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesAndTags();
    if (!isNewPost) {
      fetchPost();
    }
  }, [isNewPost, fetchPost, fetchCategoriesAndTags]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
      metaTitle: title,
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      alert("El título y el contenido son obligatorios");
      return;
    }

    setIsSaving(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const url = isNewPost
        ? `${process.env.NEXT_PUBLIC_API_URL}/posts`
        : `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`;

      const method = isNewPost ? "POST" : "PATCH";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          categoryIds: formData.categories,
          tagIds: formData.tags,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isNewPost) {
          router.push(`/admin/posts/${data.id}`);
        } else {
          alert("Artículo guardado correctamente");
        }
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "No se pudo guardar el artículo"}`);
      }
    } catch (error) {
      console.error("Error al guardar artículo:", error);
      alert("Error al guardar el artículo");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-black">
              {isNewPost ? "Nuevo Artículo" : "Editar Artículo"}
            </h1>
            <p className="text-gray-600">
              {isNewPost ? "Crea un nuevo artículo" : "Modifica el artículo existente"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4" />
                Editor
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Preview
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg font-semibold"
              placeholder="Escribe el título del artículo..."
            />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
              placeholder="titulo-del-articulo"
            />
            <p className="text-xs text-gray-500 mt-2">
              URL: /blog/{formData.slug || "titulo-del-articulo"}
            </p>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido * (Markdown)
            </label>
            {showPreview ? (
              <div className="prose prose-slate max-w-none border border-gray-300 rounded-xl p-6 min-h-[500px] bg-gray-50">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content || "*Escribe contenido para ver el preview...*"}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm min-h-[500px] resize-y"
                placeholder="# Título del Artículo

## Introducción

Escribe tu contenido en Markdown...

## Sección 2

Más contenido aquí...

## FAQ

### ¿Pregunta 1?

Respuesta...
"
              />
            )}
            <p className="text-xs text-gray-500 mt-2">
              Soporta Markdown: **negrita**, *cursiva*, ## títulos, listas, links, etc.
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extracto (Resumen)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              rows={3}
              maxLength={160}
              placeholder="Breve resumen del artículo (máximo 160 caracteres)..."
            />
            <p className="text-xs text-gray-500 mt-2">
              {formData.excerpt.length}/160 caracteres
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-black mb-4">Publicación</h3>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={formData.publishStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publishStatus: e.target.value as any,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="DRAFT">Borrador</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="SCHEDULED">Programado</option>
              </select>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fecha de Publicación
              </label>
              <input
                type="datetime-local"
                value={formData.publishAt}
                onChange={(e) =>
                  setFormData({ ...formData, publishAt: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-black mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Imagen Destacada
            </h3>
            <input
              type="url"
              value={formData.featuredImageUrl}
              onChange={(e) =>
                setFormData({ ...formData, featuredImageUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.featuredImageUrl && (
              <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">
                <div
                  className="w-full h-40 bg-gray-100 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${formData.featuredImageUrl})`,
                  backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-black mb-4 flex items-center gap-2">
              <FolderTree className="w-5 h-5" />
              Categorías
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          categories: [...formData.categories, category.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          categories: formData.categories.filter(
                            (id) => id !== category.id
                          ),
                        });
                      }
                    }}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-black mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Etiquetas
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, tag.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          tags: formData.tags.filter((id) => id !== tag.id),
                        });
                      }
                    }}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
                  />
                  <span className="text-sm text-gray-700">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-black mb-4">SEO</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  maxLength={60}
                  placeholder="Título SEO (máx. 60 caracteres)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaTitle.length}/60
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metaDescription: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  rows={3}
                  maxLength={160}
                  placeholder="Descripción SEO (máx. 160 caracteres)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.metaDescription.length}/160
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

