"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SeoOverview } from "@/components/admin/seo/SeoOverview";
import { SeoKeywords } from "@/components/admin/seo/SeoKeywords";
import { SeoOpportunities } from "@/components/admin/seo/SeoOpportunities";
import { SeoTechnical } from "@/components/admin/seo/SeoTechnical";
import { SeoRecommendations } from "@/components/admin/seo/SeoRecommendations";
import { getApiUrl } from "@/lib/config";
import { Settings, RefreshCw } from "lucide-react";

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

      const response = await fetch(`${apiUrl}/seo/sync`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ siteId: selectedSiteId }),
      });

      if (response.ok) {
        alert("Sincronización iniciada. Los datos se actualizarán en unos minutos.");
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

  if (sites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">No hay sitios configurados</h2>
          <p className="text-gray-600 mb-4">
            Necesitas configurar al menos un sitio para usar el módulo SEO.
          </p>
          <button className="btn-primary">
            <Settings className="w-4 h-4 mr-2" />
            Configurar Sitio
          </button>
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
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Sincronizando..." : "Sincronizar"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      {selectedSiteId && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
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

