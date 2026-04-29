"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import {
  CheckCircle, Clock, X, Zap, Target, TrendingUp,
  AlertTriangle, ChevronDown, ChevronUp, ArrowRight,
  Star, Wrench, BarChart3,
} from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  steps: string[];
  impactScore: number;
  effortScore: number;
  priority: number;
  status: string;
  issue?: { title: string; severity: string };
}

// Acciones SEO permanentes (no dependen de la auditoría)
const PERMANENT_ACTIONS = [
  {
    id: "gbp",
    category: "local",
    priority: 98,
    title: "Optimiza tu Google Business Profile",
    rationale: "El GBP es el factor #1 para aparecer en 'dentista cerca de mí' y en el Map Pack de Google. Con 156 reseñas ya tienes autoridad, pero hay que maximizarlo.",
    steps: [
      "Verifica que el nombre sea exactamente 'Clínica Dental Vela-Segalà' (sin variaciones)",
      "Añade categoría principal: 'Dentista' y categorías secundarias: 'Clínica dental', 'Implantólogo'",
      "Sube al menos 10 fotos de alta calidad: exterior, interior, equipo, cabinas",
      "Activa mensajes de Google Business y responde en menos de 1 hora",
      "Publica 1 post semanal en GBP (ofertas, consejos, novedades)",
      "Responde TODAS las reseñas, especialmente las negativas, con nombre y solución",
    ],
    impactScore: 95,
    effortScore: 30,
    tag: "SEO Local",
    tagColor: "bg-blue-100 text-blue-700",
    icon: Star,
  },
  {
    id: "schema",
    category: "technical",
    priority: 92,
    title: "Completa el Schema.org para rich snippets",
    rationale: "Google puede mostrar estrellas, horarios y teléfono directamente en los resultados de búsqueda (rich snippets). Actualmente falta markup de FAQPage, Review y MedicalOrganization.",
    steps: [
      "Añadir Schema 'FAQPage' en las páginas de tratamientos con las preguntas frecuentes",
      "Añadir Schema 'Review/AggregateRating' con la media de las 156 reseñas",
      "Ampliar 'Dentist' Schema con especialidades: implantología, ortodoncia, BOPT",
      "Añadir Schema 'MedicalProcedure' en cada página de tratamiento",
      "Verificar en: https://search.google.com/test/rich-results",
    ],
    impactScore: 88,
    effortScore: 45,
    tag: "SEO Técnico",
    tagColor: "bg-purple-100 text-purple-700",
    icon: Wrench,
  },
  {
    id: "content",
    category: "content",
    priority: 88,
    title: "Crea páginas de servicio para cada ciudad cercana",
    rationale: "Viladecans está cerca de Gavà, Castelldefels, Begues y Sant Boi. Crear páginas específicas para 'dentista en Gavà' etc. puede capturar tráfico de toda la comarca.",
    steps: [
      "Crear página: /tratamientos/implantes-dentales-gava",
      "Crear página: /tratamientos/implantes-dentales-castelldefels",
      "Crear página: /dentista-gava (página de ubicación secundaria)",
      "Cada página debe tener contenido único de 800+ palabras, no duplicar",
      "Añadir mapa de Google Maps embedido en cada página",
    ],
    impactScore: 82,
    effortScore: 65,
    tag: "Contenido",
    tagColor: "bg-green-100 text-green-700",
    icon: TrendingUp,
  },
  {
    id: "speed",
    category: "technical",
    priority: 80,
    title: "Mejora Core Web Vitals (velocidad de carga)",
    rationale: "Google usa Core Web Vitals como factor de ranking desde 2021. Un LCP > 2.5s o CLS > 0.1 penaliza el posicionamiento.",
    steps: [
      "Medir en: https://pagespeed.web.dev/?url=https://www.velasegalaviladecans.com",
      "Comprimir imágenes que superen 200KB (usar WebP)",
      "Añadir lazy loading en imágenes que estén fuera del viewport inicial",
      "Revisar si hay scripts de terceros bloqueantes (GTM, chat widgets)",
      "Objetivo: LCP < 2.5s, FID < 100ms, CLS < 0.1",
    ],
    impactScore: 78,
    effortScore: 50,
    tag: "Técnico",
    tagColor: "bg-purple-100 text-purple-700",
    icon: Zap,
  },
  {
    id: "blog-seo",
    category: "content",
    priority: 75,
    title: "Blog: enfoca los artículos en keywords transaccionales",
    rationale: "Los artículos actuales del blog se enfocan en contenido informativo. Para capturar pacientes potenciales hay que incluir más keywords de intención de compra.",
    steps: [
      "Crear artículo: 'Precio implantes dentales Viladecans 2026' (búsqueda transaccional)",
      "Crear artículo: 'Ortodoncia invisible Invisalign en Viladecans: precio y plazos'",
      "Crear artículo: 'Mejor clínica dental Viladecans: guía para elegir'",
      "Cada artículo debe tener CTA claro para pedir cita",
      "Añadir preguntas frecuentes al final de cada artículo (FAQPage schema)",
    ],
    impactScore: 75,
    effortScore: 40,
    tag: "Contenido",
    tagColor: "bg-green-100 text-green-700",
    icon: BarChart3,
  },
  {
    id: "backlinks",
    category: "offpage",
    priority: 72,
    title: "Consigue backlinks locales de calidad",
    rationale: "Los enlaces entrantes desde webs locales o de salud aumentan la autoridad de dominio. Viladecans.cat, colegios odontólogos y directorios médicos son fuentes fáciles.",
    steps: [
      "Inscribirse en el directorio del Col·legi de Dentistes de Catalunya",
      "Crear perfil en Doctoralia y Top Doctors (backlinks de alta autoridad)",
      "Contactar con el Ayuntamiento de Viladecans para menciones en webs municipales",
      "Colaborar con webs de salud locales o comarcales",
      "Crear perfil en: Google Business, Bing Places, Apple Maps, TripAdvisor Salud",
    ],
    impactScore: 70,
    effortScore: 55,
    tag: "Off-page",
    tagColor: "bg-orange-100 text-orange-700",
    icon: Target,
  },
];

const statusConfig: Record<string, { label: string; bg: string; dot: string }> = {
  pending:     { label: "Pendiente",    bg: "bg-gray-100 text-gray-700",   dot: "bg-gray-400"   },
  in_progress: { label: "En progreso",  bg: "bg-blue-100 text-blue-700",   dot: "bg-blue-500"   },
  completed:   { label: "Completado",   bg: "bg-green-100 text-green-700", dot: "bg-green-500"  },
  dismissed:   { label: "Descartado",   bg: "bg-gray-100 text-gray-400",   dot: "bg-gray-300"   },
};

function ActionCard({ rec, onUpdate, isStatic = false }: {
  rec: Recommendation & { tag?: string; tagColor?: string; icon?: any; category?: string };
  onUpdate?: (id: string, status: string) => void;
  isStatic?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [localStatus, setLocalStatus] = useState(rec.status);
  const Icon = rec.icon || Target;
  const st = statusConfig[localStatus] || statusConfig.pending;

  const handleUpdate = (status: string) => {
    setLocalStatus(status);
    if (!isStatic && onUpdate) onUpdate(rec.id, status);
  };

  const priorityLabel =
    rec.priority >= 90 ? { label: "Crítico", bg: "bg-red-100 text-red-700 border-red-200" } :
    rec.priority >= 75 ? { label: "Alta",    bg: "bg-orange-100 text-orange-700 border-orange-200" } :
    rec.priority >= 60 ? { label: "Media",   bg: "bg-yellow-100 text-yellow-700 border-yellow-200" } :
                         { label: "Baja",    bg: "bg-blue-100 text-blue-700 border-blue-200" };

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
      localStatus === "completed" ? "border-green-200 opacity-70" :
      localStatus === "dismissed" ? "border-gray-100 opacity-50" : "border-gray-200 hover:shadow-md"
    }`}>
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            localStatus === "completed" ? "bg-green-50" : "bg-gray-50"}`}>
            {localStatus === "completed"
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <Icon className="w-5 h-5 text-slate-500" />
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3 className={`font-bold text-base leading-snug ${localStatus === "completed" ? "line-through text-gray-400" : "text-black"}`}>
                {rec.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priorityLabel.bg}`}>
                  {priorityLabel.label}
                </span>
                {rec.tag && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${rec.tagColor || "bg-gray-100 text-gray-600"}`}>
                    {rec.tag}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{rec.rationale}</p>

            {/* Impact / Effort */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs text-slate-500">Impacto:</span>
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${rec.impactScore}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-700">{rec.impactScore}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-slate-500">Esfuerzo:</span>
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: `${rec.effortScore}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-700">{rec.effortScore}</span>
              </div>
              <div className={`ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${st.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                {st.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps expandibles */}
      {rec.steps?.length > 0 && (
        <div className="border-t border-gray-100">
          <button onClick={() => setExpanded(!expanded)}
            className="w-full px-5 py-2.5 text-xs font-semibold text-slate-500 hover:text-black flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
            <span className="flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" />
              Pasos a seguir ({rec.steps.length})
            </span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {expanded && (
            <ol className="px-5 pb-4 pt-3 space-y-2">
              {rec.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Acciones */}
      {localStatus !== "dismissed" && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
          {localStatus !== "completed" && (
            <button onClick={() => handleUpdate("completed")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">
              <CheckCircle className="w-3.5 h-3.5" />Hecho
            </button>
          )}
          {localStatus === "pending" && (
            <button onClick={() => handleUpdate("in_progress")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
              <Clock className="w-3.5 h-3.5" />En progreso
            </button>
          )}
          {localStatus === "completed" && (
            <button onClick={() => handleUpdate("pending")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-300 transition-colors">
              Reabrir
            </button>
          )}
          <button onClick={() => handleUpdate("dismissed")}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-gray-600 rounded-lg text-xs hover:bg-gray-200 transition-colors ml-auto">
            <X className="w-3.5 h-3.5" />Descartar
          </button>
        </div>
      )}
    </div>
  );
}

export function SeoRecommendations({ siteId }: { siteId: string }) {
  const [apiRecs, setApiRecs] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("pending");

  useEffect(() => { loadRecommendations(); }, [siteId]);

  const loadRecommendations = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie.split("; ").find(r => r.startsWith("admin_token="))?.split("=")[1];
      const res = await fetch(`${apiUrl}/seo/sites/${siteId}/recommendations`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) setApiRecs(await res.json());
    } catch {}
    finally { setIsLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie.split("; ").find(r => r.startsWith("admin_token="))?.split("=")[1];
      await fetch(`${apiUrl}/seo/recommendations/${id}/status`, {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ status }),
      });
      loadRecommendations();
    } catch {}
  };

  // Combinar permanentes + API, eliminar duplicados por título
  const apiTitles = new Set(apiRecs.map(r => r.title.toLowerCase()));
  const staticFiltered = PERMANENT_ACTIONS.filter(a => !apiTitles.has(a.title.toLowerCase()));

  const allRecs: (Recommendation & { tag?: string; tagColor?: string; icon?: any; isStatic?: boolean })[] = [
    ...staticFiltered.map(a => ({ ...a, id: `static-${a.id}`, status: "pending", isStatic: true })),
    ...apiRecs,
  ].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  const pending   = allRecs.filter(r => !["completed","dismissed"].includes(r.status));
  const completed = allRecs.filter(r => r.status === "completed");
  const displayed = filter === "all" ? allRecs : filter === "completed" ? completed : pending;

  if (isLoading) return (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-black" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header del plan */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black mb-1">Plan de Acción SEO</h2>
            <p className="text-gray-400 text-sm">
              {pending.length} acciones pendientes · {completed.length} completadas · Ordenadas por impacto en el posicionamiento
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
            {(["pending","completed","all"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filter === f ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}>
                {f === "pending" ? `Pendientes (${pending.length})` : f === "completed" ? `Hechos (${completed.length})` : "Todo"}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span>Progreso del plan</span>
            <span>{completed.length} / {allRecs.filter(r => r.status !== "dismissed").length} completados</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${allRecs.length > 0 ? (completed.length / allRecs.length) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      {/* Quick Wins */}
      {filter !== "completed" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-amber-900 text-sm">Quick Wins — Alto impacto, poco esfuerzo</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {pending.filter(r => r.impactScore >= 75 && r.effortScore <= 45).map(r => (
              <span key={r.id} className="text-xs bg-white border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full font-medium">
                {r.title}
              </span>
            ))}
            {pending.filter(r => r.impactScore >= 75 && r.effortScore <= 45).length === 0 && (
              <span className="text-xs text-amber-700">¡No quedan quick wins pendientes! Buen trabajo.</span>
            )}
          </div>
        </div>
      )}

      {/* Lista de acciones */}
      <div className="space-y-4">
        {displayed.length === 0 && (
          <div className="text-center py-16 bg-green-50 border border-green-200 rounded-2xl">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="font-bold text-green-900 text-lg">¡Plan completado!</p>
            <p className="text-sm text-green-700 mt-1">Has completado todas las acciones del plan SEO.</p>
          </div>
        )}
        {displayed.map(rec => (
          <ActionCard key={rec.id} rec={rec}
            onUpdate={rec.isStatic ? undefined : updateStatus}
            isStatic={!!rec.isStatic} />
        ))}
      </div>
    </div>
  );
}
