"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import {
  AlertTriangle, CheckCircle, XCircle, RefreshCw,
  ExternalLink, Globe, FileText, Link2, Image, Code,
} from "lucide-react";

interface Issue {
  id: string;
  type: string;
  severity: string;
  url: string | null;
  title: string;
  description: string;
  status: string;
}

interface TechnicalSeo {
  issues: Issue[];
  issuesByType: Record<string, Issue[]>;
  summary: { critical: number; high: number; medium: number; low: number; total: number };
}

const SEVERITY = {
  critical: { label: "Crítico",  bg: "bg-red-50",     border: "border-red-200",    text: "text-red-700",    badge: "bg-red-100 text-red-700 border-red-200",     icon: XCircle      },
  high:     { label: "Alto",     bg: "bg-orange-50",  border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-700 border-orange-200", icon: AlertTriangle },
  medium:   { label: "Medio",    bg: "bg-yellow-50",  border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertTriangle },
  low:      { label: "Bajo",     bg: "bg-blue-50",    border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-100 text-blue-700 border-blue-200",    icon: CheckCircle  },
};

// Soluciones específicas por título de issue
const FIXES: Record<string, { fix: string; link?: string }> = {
  "Sitemap no encontrado":   { fix: "El sitemap se genera automáticamente en /sitemap.xml. Si sigue fallando, verifica que el dominio de producción esté configurado en las variables de entorno de Vercel (NEXT_PUBLIC_SITE_URL).", link: "https://www.velasegalaviladecans.com/sitemap.xml" },
  "Robots.txt no encontrado":{ fix: "El robots.txt se genera en /robots.txt. Accede directamente para verificar que responde correctamente.", link: "https://www.velasegalaviladecans.com/robots.txt" },
  "Falta canonical tag":     { fix: "Las canonical URLs ya se han añadido al código. Ejecuta una nueva auditoría tras el próximo deploy para verificar." },
  "Falta H1":                { fix: "Revisa que la página tenga un H1 visible (no oculto con CSS). En páginas React con 'use client', el H1 se renderiza en el cliente y puede no ser detectado por el crawler del servidor." },
  "Title tag no optimizado": { fix: "El title debe tener entre 50-60 caracteres e incluir la keyword principal. Edita el campo 'title' en el metadata de cada página." },
  "Meta description no optimizada": { fix: "La meta description debe tener entre 120-160 caracteres con llamada a la acción. Actualiza el campo 'description' en el metadata de cada página." },
  "Error al auditar página": { fix: "El timeout ocurre por cold starts en Vercel (tier gratuito). No es un error real — la página funciona correctamente para los usuarios. Se auto-resuelve tras el primer acceso." },
  "Imágenes sin alt text":   { fix: "Revisa las imágenes en el componente y añade el atributo alt descriptivo. Las imágenes del blog generadas por IA tienen alt automático con el título del artículo." },
  "Falta schema markup":     { fix: "El Schema LocalBusiness/Dentist ya está implementado globalmente en el layout. Si aparece este error, puede ser que el crawler no ejecute JavaScript." },
  "Múltiples H1":            { fix: "Revisa la página indicada y elimina H1 duplicados. Solo debe haber un H1 por página, generalmente el título principal del contenido." },
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  technical: Code,
  content: FileText,
  links: Link2,
  images: Image,
};

export function SeoTechnical({ siteId }: { siteId: string }) {
  const [data, setData] = useState<TechnicalSeo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuditing, setIsAuditing] = useState(false);
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");

  useEffect(() => { loadTechnical(); }, [siteId]);

  const loadTechnical = async () => {
    setIsLoading(true);
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie.split("; ").find(r => r.startsWith("admin_token="))?.split("=")[1];
      const res = await fetch(`${apiUrl}/seo/sites/${siteId}/technical`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) setData(await res.json());
    } catch {}
    finally { setIsLoading(false); }
  };

  const runAudit = async () => {
    setIsAuditing(true);
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie.split("; ").find(r => r.startsWith("admin_token="))?.split("=")[1];
      await fetch(`${apiUrl}/seo/sync`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ siteId }),
      });
      await loadTechnical();
    } catch {}
    finally { setIsAuditing(false); }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-black" />
    </div>
  );

  if (!data) return <div className="text-center py-12 text-gray-500">No hay datos disponibles</div>;

  const allIssues = data.issues;
  const displayed = filter === "all" ? allIssues : allIssues.filter(i => i.severity === filter);

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { key: "all",      label: "Total",    count: data.summary.total,    bg: "bg-gray-50",     border: "border-gray-200",   text: "text-gray-900",   active: "border-gray-900 bg-gray-100" },
          { key: "critical", label: "Críticos", count: data.summary.critical, bg: "bg-red-50",      border: "border-red-200",    text: "text-red-700",    active: "border-red-500 bg-red-50"    },
          { key: "high",     label: "Altos",    count: data.summary.high,     bg: "bg-orange-50",   border: "border-orange-200", text: "text-orange-700", active: "border-orange-500 bg-orange-50"},
          { key: "medium",   label: "Medios",   count: data.summary.medium,   bg: "bg-yellow-50",   border: "border-yellow-200", text: "text-yellow-700", active: "border-yellow-500 bg-yellow-50"},
          { key: "low",      label: "Bajos",    count: data.summary.low,      bg: "bg-blue-50",     border: "border-blue-200",   text: "text-blue-700",   active: "border-blue-500 bg-blue-50"  },
        ].map(({ key, label, count, bg, border, text, active }) => (
          <button key={key} onClick={() => setFilter(key as any)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${filter === key ? active : `${bg} ${border} hover:opacity-80`}`}>
            <p className={`text-2xl font-black ${text}`}>{count}</p>
            <p className={`text-xs font-semibold ${text} opacity-80 mt-0.5`}>{label}</p>
          </button>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {displayed.length === 0 ? "Sin issues" : `${displayed.length} issue${displayed.length > 1 ? "s" : ""} encontrado${displayed.length > 1 ? "s" : ""}`}
          {filter !== "all" && ` (filtrado por: ${filter})`}
        </p>
        <button onClick={runAudit} disabled={isAuditing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
          <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
          {isAuditing ? "Auditando..." : "Ejecutar auditoría"}
        </button>
      </div>

      {/* Sin issues */}
      {displayed.length === 0 && (
        <div className="text-center py-16 bg-green-50 border-2 border-green-200 rounded-2xl">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
          <p className="font-black text-green-900 text-xl">¡Sin issues técnicos!</p>
          <p className="text-sm text-green-700 mt-1">Todos los problemas técnicos están resueltos.</p>
        </div>
      )}

      {/* Lista de issues */}
      <div className="space-y-3">
        {displayed.map(issue => {
          const sev = SEVERITY[issue.severity as keyof typeof SEVERITY] || SEVERITY.low;
          const SevIcon = sev.icon;
          const fixInfo = FIXES[issue.title];
          const TypeIcon = TYPE_ICONS[issue.type] || Globe;

          return (
            <div key={issue.id} className={`rounded-2xl border-2 ${sev.bg} ${sev.border} overflow-hidden`}>
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <SevIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${sev.text}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className={`font-bold text-sm ${sev.text}`}>{issue.title}</h4>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <TypeIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sev.badge}`}>
                          {sev.label}
                        </span>
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed ${sev.text} opacity-80`}>{issue.description}</p>

                    {issue.url && (
                      <a href={issue.url} target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-xs mt-2 ${sev.text} opacity-70 hover:opacity-100 break-all`}>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        {issue.url}
                      </a>
                    )}

                    {/* Cómo solucionarlo */}
                    {fixInfo && (
                      <div className="mt-3 p-3 bg-white/60 rounded-xl border border-white/80">
                        <p className={`text-xs font-bold ${sev.text} mb-1 flex items-center gap-1.5`}>
                          ✅ Cómo solucionarlo:
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed">{fixInfo.fix}</p>
                        {fixInfo.link && (
                          <a href={fixInfo.link} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1">
                            <ExternalLink className="w-3 h-3" />Verificar →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
