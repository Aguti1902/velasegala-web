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
import { SeoMultiSiteOverview } from "@/components/admin/seo/SeoMultiSiteOverview";
import { getApiUrl } from "@/lib/config";
import { Lightbulb, FileText, Plus, X, RefreshCw } from "lucide-react";

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
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSite, setNewSite] = useState({ domain: "", gscProperty: "", countryDefault: "ES" });

  useEffect(() => { loadSites(); }, []);

  const getToken = () =>
    document.cookie.split("; ").find((r) => r.startsWith("admin_token="))?.split("=")[1];

  const authHeaders = (extra?: Record<string, string>): HeadersInit => {
    const token = getToken();
    return { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra };
  };

  const loadSites = async () => {
    try {
      const res = await fetch(`${getApiUrl()}/seo/sites`, {
        credentials: "include",
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setSites(data);
        if (data.length > 0) setSelectedSiteId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscoverKeywords = async () => {
    if (!selectedSiteId || isDiscovering) return;
    setIsDiscovering(true);
    try {
      const res = await fetch(
        `${getApiUrl()}/seo/sites/${selectedSiteId}/discover-keywords?minVolume=100`,
        { method: "POST", credentials: "include", headers: authHeaders({ "Content-Type": "application/json" }) },
      );
      if (res.ok) {
        const r = await res.json();
        alert(`Descubrimiento completado.\n${r.discovered} keywords encontradas.\n${r.saved} nuevas keywords guardadas.`);
        window.location.reload();
      } else {
        alert("Error al descubrir keywords");
      }
    } catch (e) {
      console.error(e);
      alert("Error al descubrir keywords");
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleRunAudit = async () => {
    if (!selectedSiteId || isAuditing) return;
    setIsAuditing(true);
    try {
      // 1. Resolver issues anteriores
      await fetch(`${getApiUrl()}/seo/sites/${selectedSiteId}/resolve-all-issues`, {
        method: "POST", credentials: "include",
        headers: authHeaders({ "Content-Type": "application/json" }),
      });
      // 2. Re-auditar
      const res = await fetch(`${getApiUrl()}/seo/sync`, {
        method: "POST", credentials: "include",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ siteId: selectedSiteId }),
      });
      if (res.ok) {
        alert("✅ Auditoría completada. Recarga la página para ver los nuevos resultados.");
        window.location.reload();
      } else {
        alert("Error al ejecutar la auditoría");
      }
    } catch (e) {
      console.error(e);
      alert("Error al ejecutar la auditoría");
    } finally {
      setIsAuditing(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedSiteId || isGeneratingReport) return;
    setIsGeneratingReport(true);
    try {
      const res = await fetch(`${getApiUrl()}/seo/sites/${selectedSiteId}/report/pdf`, {
        credentials: "include",
        headers: authHeaders(),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `informe-seo-${selectedSiteId}-${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Error al generar informe PDF");
      }
    } catch (e) {
      console.error(e);
      alert("Error al generar informe PDF");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleCreateSite = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSite.domain.trim()) { alert("Por favor, introduce un dominio"); return; }
    try {
      const res = await fetch(`${getApiUrl()}/seo/sites`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          domain: newSite.domain.trim(),
          gscProperty: newSite.gscProperty.trim() || undefined,
          countryDefault: newSite.countryDefault,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setSites((prev) => [...prev, created]);
        setSelectedSiteId(created.id);
        setShowCreateForm(false);
        setNewSite({ domain: "", gscProperty: "", countryDefault: "ES" });
        alert("✅ Sitio creado. Ejecuta una sincronización para obtener datos.");
      } else {
        const err = await res.json().catch(() => ({ message: "Error desconocido" }));
        alert(`❌ Error: ${err.message || "Error desconocido"}`);
      }
    } catch (e) {
      console.error(e);
      alert("❌ Error al crear el sitio.");
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4" />
          <p className="text-gray-600">Cargando módulo SEO...</p>
        </div>
      </div>
    );
  }

  // ── Sin sitios configurados ───────────────────────────────────────────────
  if (sites.length === 0 && !showCreateForm) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <h2 className="text-2xl font-black mb-3">Sin webs configuradas</h2>
          <p className="text-gray-600 mb-6">
            Añade las webs que quieres analizar: velasegalaviladecans.com, esteticavelasegala.com y velasegalasantceloni.com
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Añadir primera web
          </button>
        </div>
      </div>
    );
  }

  // ── Render principal ─────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-black">SEO Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Posicionamiento, issues técnicos y plan de acción para todas tus webs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-gray-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Añadir web
          </button>
          <button
            onClick={handleRunAudit}
            disabled={isAuditing || !selectedSiteId}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors disabled:opacity-40"
            title="Limpia issues viejos y ejecuta una auditoría SEO nueva"
          >
            <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
            {isAuditing ? "Auditando..." : "Re-auditar"}
          </button>
          <button
            onClick={handleDiscoverKeywords}
            disabled={isDiscovering || !selectedSiteId}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors disabled:opacity-40"
          >
            <Lightbulb className={`w-4 h-4 ${isDiscovering ? "animate-pulse" : ""}`} />
            {isDiscovering ? "Descubriendo..." : "Keywords"}
          </button>
          <button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport || !selectedSiteId}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-40"
          >
            <FileText className={`w-4 h-4 ${isGeneratingReport ? "animate-pulse" : ""}`} />
            {isGeneratingReport ? "Generando..." : "PDF"}
          </button>
        </div>
      </div>

      {/* Multi-site overview */}
      <SeoMultiSiteOverview sites={sites} onSelectSite={(id) => setSelectedSiteId(id)} />

      {/* Modal crear sitio */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-7 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black">Añadir nueva web</h2>
                <p className="text-sm text-slate-500">Introduce el dominio para analizar su SEO</p>
              </div>
              <button
                onClick={() => { setShowCreateForm(false); setNewSite({ domain: "", gscProperty: "", countryDefault: "ES" }); }}
                className="p-2 text-gray-400 hover:text-black rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSite} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Dominio <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSite.domain}
                  onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                  placeholder="esteticavelasegala.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Sin https://, solo el dominio</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Google Search Console (Opcional)
                </label>
                <input
                  type="text"
                  value={newSite.gscProperty}
                  onChange={(e) => setNewSite({ ...newSite, gscProperty: e.target.value })}
                  placeholder="https://esteticavelasegala.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Necesario para datos reales de clics e impresiones</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Añadir web
                </button>
                <button
                  type="button"
                  onClick={() => { setShowCreateForm(false); setNewSite({ domain: "", gscProperty: "", countryDefault: "ES" }); }}
                  className="px-5 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selector de web activa */}
      {sites.length > 1 && selectedSiteId && (
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm font-semibold text-slate-500">Analizando:</span>
          <div className="flex gap-2 flex-wrap">
            {sites.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSiteId(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedSiteId === s.id
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                {s.domain}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs de análisis */}
      {selectedSiteId && (
        <Tabs defaultValue="plan" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-7 bg-gray-100 rounded-2xl p-1 h-auto">
            <TabsTrigger value="plan" className="rounded-xl py-2.5 text-xs font-semibold">
              Plan de Acción
            </TabsTrigger>
            <TabsTrigger value="technical" className="rounded-xl py-2.5 text-xs font-semibold">
              Técnico
            </TabsTrigger>
            <TabsTrigger value="overview" className="rounded-xl py-2.5 text-xs font-semibold">
              Overview
            </TabsTrigger>
            <TabsTrigger value="keywords" className="rounded-xl py-2.5 text-xs font-semibold">
              Keywords
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="rounded-xl py-2.5 text-xs font-semibold">
              Oportunidades
            </TabsTrigger>
            <TabsTrigger value="competitors" className="rounded-xl py-2.5 text-xs font-semibold">
              Competencia
            </TabsTrigger>
            <TabsTrigger value="comparison" className="rounded-xl py-2.5 text-xs font-semibold">
              Comparativa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan">
            <SeoRecommendations siteId={selectedSiteId} />
          </TabsContent>
          <TabsContent value="technical">
            <SeoTechnical siteId={selectedSiteId} />
          </TabsContent>
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
        </Tabs>
      )}
    </div>
  );
}
