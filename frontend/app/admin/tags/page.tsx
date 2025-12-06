"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Tag, MoreVertical } from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface TagType {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

export default function AdminTagsPage() {
  const [tags, setTags] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTag, setEditingTag] = useState<TagType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/tags`);
      const data = await response.json();
      setTags(data || []);
    } catch (error) {
      console.error("Error al cargar etiquetas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const url = editingTag
        ? `${getApiUrl()}/tags/${editingTag.id}`
        : `${getApiUrl()}/tags`;

      const method = editingTag ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          slug: formData.slug || generateSlug(formData.name),
        }),
      });

      if (response.ok) {
        fetchTags();
        setShowModal(false);
        setEditingTag(null);
        setFormData({ name: "", slug: "" });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "No se pudo guardar la etiqueta"}`);
      }
    } catch (error) {
      console.error("Error al guardar etiqueta:", error);
      alert("Error al guardar la etiqueta");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta etiqueta?")) {
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(
        `${getApiUrl()}/tags/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchTags();
        setActiveMenu(null);
      } else {
        alert("Error al eliminar la etiqueta");
      }
    } catch (error) {
      console.error("Error al eliminar etiqueta:", error);
      alert("Error al eliminar la etiqueta");
    }
  };

  const openEditModal = (tag: TagType) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug,
    });
    setShowModal(true);
    setActiveMenu(null);
  };

  const openCreateModal = () => {
    setEditingTag(null);
    setFormData({ name: "", slug: "" });
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando etiquetas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Etiquetas</h1>
          <p className="text-gray-600">Gestiona las etiquetas del blog</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Nueva Etiqueta
        </button>
      </div>

      {/* Tags Grid */}
      {tags.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">
            No hay etiquetas
          </h3>
          <p className="text-gray-600 mb-6">
            Crea tu primera etiqueta para categorizar los artículos
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Crear Primera Etiqueta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-green-600" />
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === tag.id ? null : tag.id)
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeMenu === tag.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                        <button
                          onClick={() => openEditModal(tag)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors w-full text-left"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id)}
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

              <h3 className="text-lg font-bold text-black mb-2">
                #{tag.name}
              </h3>
              <p className="text-xs text-gray-600 font-mono mb-4">
                /{tag.slug}
              </p>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {tag._count?.posts || 0} artículos
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-6">
              {editingTag ? "Editar Etiqueta" : "Nueva Etiqueta"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Ej: Implantes Dentales"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
                  placeholder="implantes-dentales"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se genera automáticamente a partir del nombre
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-black text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  {editingTag ? "Guardar Cambios" : "Crear Etiqueta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

