"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeoOverview } from "@/components/admin/seo/SeoOverview";
import { SeoKeywords } from "@/components/admin/seo/SeoKeywords";
import { SeoOpportunities } from "@/components/admin/seo/SeoOpportunities";
import { SeoTechnical } from "@/components/admin/seo/SeoTechnical";
import { SeoRecommendations } from "@/components/admin/seo/SeoRecommendations";
import { SeoCompetitors } from "@/components/admin/seo/SeoCompetitors";
import { SeoCompetitorComparison } from "@/components/admin/seo/SeoCompetitorComparison";
import { getApiUrl } from "@/lib/config";
import { Settings, RefreshCw, Plus, Lightbulb } from "lucide-react";

interface SeoSite {
  id: string;
  domain: string;
  gscProperty: string | null;
  countryDefault: string;
}

export default function SeoPage() {
  const [sites, setSites] = useState<SeoSite[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSite, setNewSite] = useState({
    domain: "",
    gscProperty: "",
    countryDefault: "ES",
  });

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const data = await response.json();
        setSites(data);
        if (data.length > 0 && !selectedSiteId) {
          setSelectedSiteId(data[0].id);
        }
      }
    } catch (error) {
      console.error("Error al cargar sitios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (!selectedSiteId || isSyncing) return;

    setIsSyncing(true);
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // Primero importar keywords de la web
      try {
        const importResponse = await fetch(`${apiUrl}/seo/sites/${selectedSiteId}/import-keywords`, {
          method: "POST",
          credentials: "include",
          headers,
        });

        if (importResponse.ok) {
          const importResult = await importResponse.json();
          console.log("Keywords importadas:", importResult);
        }
      } catch (error) {
        console.warn("Error al importar keywords (continuando):", error);
      }

      // Luego sincronizar con GSC
      const response = await fetch(`${apiUrl}/seo/sync`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({ siteId: selectedSiteId }),
      });

      if (response.ok) {
        alert("Sincronización completada. Keywords importadas y datos de GSC actualizados.");
        window.location.reload();
      } else {
        alert("Error al iniciar sincronización");
      }
    } catch (error) {
      console.error("Error al sincronizar:", error);
      alert("Error al sincronizar");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDiscoverKeywords = async () => {
    if (!selectedSiteId || isDiscovering) return;

    setIsDiscovering(true);
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(
        `${apiUrl}/seo/sites/${selectedSiteId}/discover-keywords?minVolume=100`,
        {
          method: "POST",
          credentials: "include",
          headers,
        },
      );

      if (response.ok) {
        const result = await response.json();
        alert(
          `Descubrimiento completado.\n${result.discovered} keywords encontradas.\n${result.saved} nuevas keywords guardadas.\n${result.skipped} ya existían.`
        );
        window.location.reload();
      } else {
        alert("Error al descubrir keywords");
      }
    } catch (error) {
      console.error("Error al descubrir keywords:", error);
      alert("Error al descubrir keywords");
    } finally {
      setIsDiscovering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando módulo SEO...</p>
        </div>
      </div>
    );
  }

  const handleCreateSite = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!newSite.domain.trim()) {
      alert("Por favor, introduce un dominio");
      return;
    }

    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          domain: newSite.domain.trim(),
          gscProperty: newSite.gscProperty.trim() || undefined,
          countryDefault: newSite.countryDefault,
        }),
      });

      if (response.ok) {
        const createdSite = await response.json();
        setSites([...sites, createdSite]);
        setSelectedSiteId(createdSite.id);
        setShowCreateForm(false);
        setNewSite({ domain: "", gscProperty: "", countryDefault: "ES" });
        alert("✅ Sitio creado correctamente. Puedes ejecutar una sincronización para empezar a obtener datos.");
      } else {
        const errorData = await response.json().catch(() => ({ message: "Error desconocido" }));
        alert(`❌ Error al crear el sitio: ${errorData.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error al crear sitio:", error);
      alert("❌ Error al crear el sitio. Revisa la consola para más detalles.");
    }
  };

  if (sites.length === 0 && !showCreateForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">No hay sitios configurados</h2>
          <p className="text-gray-600 mb-4">
            Necesitas configurar al menos un sitio para usar el módulo SEO. El sitio representa tu dominio web que quieres analizar.
          </p>
          <div className="space-y-3 mb-6 text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
            <p><strong>1. Dominio:</strong> El dominio de tu sitio web (ej: www.velasegalaviladecans.com)</p>
            <p><strong>2. Google Search Console (opcional):</strong> La URL de la propiedad en GSC si ya tienes una configurada</p>
            <p><strong>3. País:</strong> País por defecto para el análisis (ej: ES para España)</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Configurar Primer Sitio
          </button>
        </div>
      </div>
    );
  }

  if (sites.length === 0 && showCreateForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Crear Nuevo Sitio</h2>
          <form onSubmit={handleCreateSite} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dominio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newSite.domain}
                onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                placeholder="www.velasegalaviladecans.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Sin https://, solo el dominio</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Search Console Property (Opcional)
              </label>
              <input
                type="text"
                value={newSite.gscProperty}
                onChange={(e) => setNewSite({ ...newSite, gscProperty: e.target.value })}
                placeholder="https://www.velasegalaviladecans.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-500 mt-1">URL completa de la propiedad en GSC (necesario para sincronizar datos)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País por defecto
              </label>
              <select
                value={newSite.countryDefault}
                onChange={(e) => setNewSite({ ...newSite, countryDefault: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="ES">España (ES)</option>
                <option value="US">Estados Unidos (US)</option>
                <option value="GB">Reino Unido (GB)</option>
                <option value="FR">Francia (FR)</option>
                <option value="DE">Alemania (DE)</option>
                <option value="IT">Italia (IT)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Crear Sitio
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewSite({ domain: "", gscProperty: "", countryDefault: "ES" });
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">📝 Notas importantes:</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>El dominio es obligatorio para crear el sitio</li>
              <li>Google Search Console es opcional pero necesario para sincronizar datos reales</li>
              <li>Puedes configurar GSC después creando una cuenta de servicio en Google Cloud</li>
              <li>Consulta <code className="bg-blue-100 px-1 rounded">SEO_MODULE_SETUP.md</code> para más detalles</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">SEO Dashboard</h1>
          <p className="text-gray-600">
            Análisis de posicionamiento, keywords y recomendaciones SEO
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedSiteId || ""}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.domain}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Añadir nuevo sitio"
          >
            <Plus className="w-4 h-4" />
            Añadir Sitio
          </button>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Sincronizando..." : "Sincronizar"}
          </button>
          <button
            onClick={handleDiscoverKeywords}
            disabled={isDiscovering}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            title="Descubrir nuevas keywords con alto volumen de búsqueda"
          >
            <RefreshCw className={`w-4 h-4 ${isDiscovering ? "animate-spin" : ""}`} />
            {isDiscovering ? "Descubriendo..." : "Descubrir Keywords"}
          </button>
        </div>
      </div>

      {/* Formulario crear sitio (overlay) */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Sitio</h2>
            <form onSubmit={handleCreateSite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dominio <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSite.domain}
                  onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                  placeholder="www.velasegalaviladecans.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Sin https://, solo el dominio</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Search Console Property (Opcional)
                </label>
                <input
                  type="text"
                  value={newSite.gscProperty}
                  onChange={(e) => setNewSite({ ...newSite, gscProperty: e.target.value })}
                  placeholder="https://www.velasegalaviladecans.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">URL completa de la propiedad en GSC (necesario para sincronizar datos)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País por defecto
                </label>
                <select
                  value={newSite.countryDefault}
                  onChange={(e) => setNewSite({ ...newSite, countryDefault: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="ES">España (ES)</option>
                  <option value="US">Estados Unidos (US)</option>
                  <option value="GB">Reino Unido (GB)</option>
                  <option value="FR">Francia (FR)</option>
                  <option value="DE">Alemania (DE)</option>
                  <option value="IT">Italia (IT)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Crear Sitio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewSite({ domain: "", gscProperty: "", countryDefault: "ES" });
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabs */}
      {selectedSiteId && !showCreateForm && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
            <TabsTrigger value="competitors">Competencia</TabsTrigger>
            <TabsTrigger value="comparison">Comparativa</TabsTrigger>
            <TabsTrigger value="technical">Técnico</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SeoOverview siteId={selectedSiteId} />
          </TabsContent>

          <TabsContent value="keywords">
            <SeoKeywords siteId={selectedSiteId} />
          </TabsContent>

          <TabsContent value="opportunities">
            <SeoOpportunities siteId={selectedSiteId} />
          </TabsContent>

          <TabsContent value="competitors">
            <SeoCompetitors siteId={selectedSiteId} />
          </TabsContent>

          <TabsContent value="comparison">
            <SeoCompetitorComparison siteId={selectedSiteId} />
          </TabsContent>

          <TabsContent value="technical">
            <SeoTechnical siteId={selectedSiteId} />
          </TabsContent>

          <TabsContent value="recommendations">
            <SeoRecommendations siteId={selectedSiteId} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

