"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import { Search, Plus, RefreshCw, TrendingUp, Eye, EyeOff, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface Competitor {
  id: string;
  domain: string;
  name: string | null;
  url: string;
  enabled: boolean;
  lastAnalyzed: string | null;
  _count: {
    keywords: number;
  };
}

export function SeoCompetitors({ siteId }: { siteId: string }) {
  const router = useRouter();
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({
    domain: "",
    name: "",
    url: "",
  });
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleViewComparison = (competitorId: string) => {
    router.push(`/admin/seo/comparison/${siteId}/${competitorId}`);
  };

  useEffect(() => {
    loadCompetitors();
  }, [siteId]);

  const loadCompetitors = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites/${siteId}/competitors`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const data = await response.json();
        setCompetitors(data);
      }
    } catch (error) {
      console.error("Error al cargar competidores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCompetitor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites/${siteId}/competitors`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          domain: newCompetitor.domain,
          name: newCompetitor.name || undefined,
          url: newCompetitor.url,
        }),
      });

      if (response.ok) {
        alert("Competidor añadido correctamente");
        setShowAddForm(false);
        setNewCompetitor({ domain: "", name: "", url: "" });
        loadCompetitors();
      } else {
        alert("Error al añadir competidor");
      }
    } catch (error) {
      console.error("Error al añadir competidor:", error);
      alert("Error al añadir competidor");
    }
  };

  const handleAnalyze = async (competitorId: string) => {
    setAnalyzingId(competitorId);
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/competitors/${competitorId}/analyze`, {
        method: "POST",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          `Análisis completado: ${result.keywordsFound} keywords encontradas en ${result.pagesAnalyzed} páginas`,
        );
        loadCompetitors();
      } else {
        alert("Error al analizar competidor");
      }
    } catch (error) {
      console.error("Error al analizar competidor:", error);
      alert("Error al analizar competidor");
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleToggleEnabled = async (competitorId: string, currentEnabled: boolean) => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/competitors/${competitorId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ enabled: !currentEnabled }),
      });

      if (response.ok) {
        loadCompetitors();
      }
    } catch (error) {
      console.error("Error al actualizar competidor:", error);
    }
  };

  const handleDelete = async (competitorId: string) => {
    if (!confirm("¿Estás seguro de eliminar este competidor?")) return;

    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/competitors/${competitorId}`, {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        loadCompetitors();
      } else {
        alert("Error al eliminar competidor");
      }
    } catch (error) {
      console.error("Error al eliminar competidor:", error);
      alert("Error al eliminar competidor");
    }
  };

  const handleSeedCompetitors = async () => {
    if (!confirm("¿Añadir competidores predefinidos de Viladecans? Esto añadirá 11 competidores conocidos.")) return;

    setIsSeeding(true);
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites/${siteId}/competitors/seed`, {
        method: "POST",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Competidores añadidos: ${result.created} creados/actualizados`);
        loadCompetitors();
      } else {
        alert("Error al añadir competidores");
      }
    } catch (error) {
      console.error("Error al añadir competidores:", error);
      alert("Error al añadir competidores");
    } finally {
      setIsSeeding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Análisis de Competencia</h2>
          <p className="text-sm text-gray-600 mt-1">
            Analiza qué keywords usan tus competidores y compara con tu sitio
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSeedCompetitors}
            disabled={isSeeding}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            title="Añadir competidores predefinidos"
          >
            {isSeeding ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Añadiendo...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Añadir Competidores Predefinidos
              </>
            )}
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Añadir Competidor
          </button>
        </div>
      </div>

      {/* Formulario añadir competidor */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-4">Añadir Nuevo Competidor</h3>
          <form onSubmit={handleAddCompetitor} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dominio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newCompetitor.domain}
                onChange={(e) => setNewCompetitor({ ...newCompetitor, domain: e.target.value })}
                placeholder="clinicadentalbaldrich.es"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre (opcional)</label>
              <input
                type="text"
                value={newCompetitor.name}
                onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                placeholder="Clínica Dental Baldrich"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={newCompetitor.url}
                onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                placeholder="https://www.clinicadentalbaldrich.es"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewCompetitor({ domain: "", name: "", url: "" });
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Añadir Competidor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de competidores */}
      {competitors.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">No hay competidores configurados aún</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Añadir Primer Competidor
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Competidor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Keywords
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Último Análisis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitors.map((competitor) => (
                <tr key={competitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-black">
                        {competitor.name || competitor.domain}
                      </div>
                      <div className="text-sm text-gray-500">{competitor.domain}</div>
                      {competitor._count.keywords === 0 && competitor.lastAnalyzed && (
                        <div className="text-xs text-yellow-600 mt-1">
                          ⚠️ Sin keywords encontradas. Revisa configuración de API.
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={competitor._count.keywords === 0 ? "text-red-600 font-medium" : ""}>
                      {competitor._count.keywords} keywords
                    </span>
                      {competitor._count.keywords === 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Haz clic en &quot;Analizar&quot; para obtener keywords reales
                        </div>
                      )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {competitor.lastAnalyzed
                      ? new Date(competitor.lastAnalyzed).toLocaleDateString("es-ES", {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : "Nunca"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleEnabled(competitor.id, competitor.enabled)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        competitor.enabled
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {competitor.enabled ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewComparison(competitor.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        title="Ver comparativa detallada"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver
                      </button>
                      <button
                        onClick={() => handleAnalyze(competitor.id)}
                        disabled={analyzingId === competitor.id}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Analizar competidor"
                      >
                        <RefreshCw
                          className={`w-4 h-4 ${analyzingId === competitor.id ? "animate-spin" : ""}`}
                        />
                        Analizar
                      </button>
                      <a
                        href={competitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        title="Ver sitio web"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(competitor.id)}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        title="Eliminar competidor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

