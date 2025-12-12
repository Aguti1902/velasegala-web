"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  FileText,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  FileEdit,
} from "lucide-react";
import { getApiUrl } from "@/lib/config";
import { fetchWithAuth } from "@/lib/auth";
import Toast from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useToast } from "@/hooks/useToast";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishStatus: "DRAFT" | "PUBLISHED" | "SCHEDULED";
  publishAt: string;
  createdAt: string;
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const { toasts, hideToast, success, error } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((post) => post.publishStatus === statusFilter);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, statusFilter]);

  const fetchPosts = async () => {
    try {
      // Admin debe ver todos los posts sin importar el estado
      // Pasamos limit=100 para obtener más posts (ajusta según necesites)
      const response = await fetch(`${getApiUrl()}/posts?limit=100&status=ALL`);
      const data = await response.json();
      setPosts(data.data || []);
      setFilteredPosts(data.data || []);
    } catch (error) {
      console.error("Error al cargar artículos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Eliminar artículo",
      message: "¿Estás seguro de que quieres eliminar este artículo? Esta acción no se puede deshacer.",
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        try {
          const response = await fetchWithAuth(`${getApiUrl()}/posts/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            setPosts(posts.filter((post) => post.id !== id));
            setActiveMenu(null);
            success("Artículo eliminado correctamente");
          } else {
            error("Error al eliminar el artículo");
          }
        } catch (err) {
          console.error("Error al eliminar artículo:", err);
          error("Error al eliminar el artículo");
        }
      },
    });
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await fetchWithAuth(`${getApiUrl()}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publishStatus: "PUBLISHED" }),
      });

      if (response.ok) {
        fetchPosts();
        setActiveMenu(null);
        success("Artículo publicado correctamente");
      } else {
        error("Error al publicar el artículo");
      }
    } catch (err) {
      console.error("Error al publicar artículo:", err);
      error("Error al publicar el artículo");
    }
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id));
    }
  };

  const handleSelectPost = (id: string) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((postId) => postId !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedPosts.length === 0) {
      error("No hay artículos seleccionados");
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: "Eliminar artículos",
      message: `¿Estás seguro de que quieres eliminar ${selectedPosts.length} artículo(s)? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false });
        setIsDeleting(true);

        try {
          const response = await fetchWithAuth(`${getApiUrl()}/posts/bulk-delete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedPosts }),
          });

          if (response.ok) {
            const data = await response.json();
            success(data.message || `${selectedPosts.length} artículos eliminados`);
            setSelectedPosts([]);
            fetchPosts();
          } else {
            error("Error al eliminar los artículos");
          }
        } catch (err) {
          console.error("Error al eliminar artículos:", err);
          error("Error al eliminar los artículos");
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle2 className="w-3 h-3" />
            Publicado
          </span>
        );
      case "DRAFT":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <FileEdit className="w-3 h-3" />
            Borrador
          </span>
        );
      case "SCHEDULED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Clock className="w-3 h-3" />
            Programado
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Artículos</h1>
          <p className="text-gray-600">
            Gestiona todos los artículos del blog
          </p>
          {selectedPosts.length > 0 && (
            <p className="text-sm text-blue-600 font-medium mt-2">
              {selectedPosts.length} artículo(s) seleccionado(s)
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {selectedPosts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-5 h-5" />
              {isDeleting ? "Eliminando..." : `Eliminar ${selectedPosts.length}`}
            </button>
          )}
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Nuevo Artículo
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Select All Checkbox */}
          {filteredPosts.length > 0 && (
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={
                    selectedPosts.length === filteredPosts.length &&
                    filteredPosts.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                  Todos
                </span>
              </label>
            </div>
          )}

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white min-w-[180px]"
            >
              <option value="ALL">Todos los estados</option>
              <option value="PUBLISHED">Publicados</option>
              <option value="DRAFT">Borradores</option>
              <option value="SCHEDULED">Programados</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm">
            <span className="font-semibold text-black">{posts.length}</span>
            <span className="text-gray-600"> total</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-green-600">
              {posts.filter((p) => p.publishStatus === "PUBLISHED").length}
            </span>
            <span className="text-gray-600"> publicados</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-yellow-600">
              {posts.filter((p) => p.publishStatus === "DRAFT").length}
            </span>
            <span className="text-gray-600"> borradores</span>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">
            No hay artículos
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== "ALL"
              ? "No se encontraron artículos con los filtros aplicados"
              : "Crea tu primer artículo o configura el agente de IA"}
          </p>
          {!searchTerm && statusFilter === "ALL" && (
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Crear Primer Artículo
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border transition-all ${
                selectedPosts.includes(post.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-100 hover:shadow-xl"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Checkbox */}
                <div className="flex items-start pt-1">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title and Status */}
                  <div className="flex items-start gap-3 mb-3">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-xl font-bold text-black hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    {getStatusBadge(post.publishStatus)}
                  </div>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishAt || post.createdAt).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>

                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category.id}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === post.id ? null : post.id)
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeMenu === post.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Ver en web
                        </Link>
                        {post.publishStatus === "DRAFT" && (
                          <button
                            onClick={() => handlePublish(post.id)}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-green-600 transition-colors w-full text-left"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Publicar
                          </button>
                        )}
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors w-full text-left"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />
    </div>
  );
}

