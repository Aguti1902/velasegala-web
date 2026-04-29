"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Globe, AlertTriangle, CheckCircle, XCircle, RefreshCw,
  ExternalLink, ChevronDown, ChevronUp, TrendingUp, Eye,
  MousePointerClick, Hash, Zap,
} from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface SiteScore {
  id: string;
  domain: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  ringColor: string;
  gradeColor: string;
  bgColor: string;
  issues: { critical: number; high: number; medium: number; low: number; total: number };
  topIssues: Array<{ title: string; severity: string; url?: string }>;
  kpis?: { totalClicks: number; totalImpressions: number; avgPosition: number | null; keywordsTop10: number };
  isLoading: boolean;
}

const DEDUCTIONS = { critical: 20, high: 10, medium: 4, low: 1 };

function calcScore(issues: SiteScore["issues"]) {
  const d = issues.critical * DEDUCTIONS.critical + issues.high * DEDUCTIONS.high +
            issues.medium * DEDUCTIONS.medium + issues.low * DEDUCTIONS.low;
  return Math.max(0, Math.min(100, 100 - d));
}

function gradeInfo(score: number) {
  if (score >= 90) return { grade: "A" as const, ringColor: "#16a34a", gradeColor: "text-green-600", bgColor: "bg-green-50 border-green-200" };
  if (score >= 75) return { grade: "B" as const, ringColor: "#2563eb", gradeColor: "text-blue-600",  bgColor: "bg-blue-50 border-blue-200"  };
  if (score >= 60) return { grade: "C" as const, ringColor: "#d97706", gradeColor: "text-amber-600", bgColor: "bg-amber-50 border-amber-200" };
  if (score >= 40) return { grade: "D" as const, ringColor: "#ea580c", gradeColor: "text-orange-600",bgColor: "bg-orange-50 border-orange-200"};
  return           { grade: "F" as const, ringColor: "#dc2626", gradeColor: "text-red-600",   bgColor: "bg-red-50 border-red-200"    };
}

function ScoreRing({ score, ringColor, gradeColor, grade }: Pick<SiteScore, "score" | "ringColor" | "gradeColor" | "grade">) {
  const r = 42; const c = 2 * Math.PI * r;
  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
        <circle cx="56" cy="56" r={r} fill="none" stroke="#e5e7eb" strokeWidth="9" />
        <circle cx="56" cy="56" r={r} fill="none" stroke={ringColor} strokeWidth="9"
          strokeDasharray={c} strokeDashoffset={c - (score / 100) * c}
          strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-black leading-none ${gradeColor}`}>{score}</span>
        <span className={`text-sm font-bold ${gradeColor}`}>{grade}</span>
      </div>
    </div>
  );
}

export function SeoMultiSiteOverview({ sites, onSelectSite }: {
  sites: Array<{ id: string; domain: string }>;
  onSelectSite: (id: string) => void;
}) {
  const [scores, setScores] = useState<SiteScore[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadSite = useCallback(async (site: { id: string; domain: string }) => {
    const apiUrl = getApiUrl();
    const token = document.cookie.split("; ").find(r => r.startsWith("admin_token="))?.split("=")[1];
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

    setScores(p => p.map(s => s.id === site.id ? { ...s, isLoading: true } : s));
    try {
      const [techRes, ovRes] = await Promise.all([
        fetch(`${apiUrl}/seo/sites/${site.id}/technical`, { credentials: "include", headers }),
        fetch(`${apiUrl}/seo/sites/${site.id}/overview?days=28`, { credentials: "include", headers }),
      ]);

      let issues = { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
      let topIssues: SiteScore["topIssues"] = [];
      let kpis: SiteScore["kpis"] | undefined;

      if (techRes.ok) {
        const d = await techRes.json();
        const all: any[] = d.issues || [];
        issues = {
          critical: all.filter(i => i.severity === "critical").length,
          high:     all.filter(i => i.severity === "high").length,
          medium:   all.filter(i => i.severity === "medium").length,
          low:      all.filter(i => i.severity === "low").length,
          total:    all.length,
        };
        topIssues = all.filter(i => ["critical","high"].includes(i.severity)).slice(0, 5)
          .map(i => ({ title: i.title, severity: i.severity, url: i.url }));
      }
      if (ovRes.ok) {
        const d = await ovRes.json();
        kpis = { totalClicks: d.kpis?.totalClicks ?? 0, totalImpressions: d.kpis?.totalImpressions ?? 0, avgPosition: d.kpis?.avgPosition ?? null, keywordsTop10: d.kpis?.keywordsTop10 ?? 0 };
      }

      const score = calcScore(issues);
      const info = gradeInfo(score);
      setScores(p => p.map(s => s.id === site.id ? { ...s, ...info, score, issues, topIssues, kpis, isLoading: false } : s));
    } catch {
      setScores(p => p.map(s => s.id === site.id ? { ...s, isLoading: false } : s));
    }
  }, []);

  useEffect(() => {
    if (!sites.length) return;
    setScores(sites.map(s => ({ ...s, score: 0, grade: "F", ringColor: "#9ca3af", gradeColor: "text-gray-400", bgColor: "bg-gray-50 border-gray-200", issues: { critical:0,high:0,medium:0,low:0,total:0 }, topIssues: [], isLoading: true })));
    sites.forEach(loadSite);
  }, [sites, loadSite]);

  if (!sites.length) return null;

  return (
    <div className="mb-10">
      {/* Título */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black text-black">Panel SEO — Todas las webs</h2>
          <p className="text-sm text-slate-500 mt-1">Puntuación basada en issues técnicos detectados · Se actualiza al ejecutar auditoría</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {scores.map(site => (
          <div key={site.id} className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-shadow hover:shadow-md ${site.bgColor}`}>
            {/* Header */}
            <div className="p-5 pb-4">
              <div className="flex items-center gap-1.5 mb-4">
                <Globe className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-600 truncate">{site.domain}</span>
                <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-slate-300 hover:text-slate-600 transition-colors flex-shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-5">
                {site.isLoading ? (
                  <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
                    <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-200 border-t-gray-600" />
                  </div>
                ) : (
                  <ScoreRing score={site.score} grade={site.grade} ringColor={site.ringColor} gradeColor={site.gradeColor} />
                )}

                {!site.isLoading && (
                  <div className="flex-1 space-y-2">
                    {/* Issue pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {site.issues.critical > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-1 rounded-full font-bold">
                          <XCircle className="w-3 h-3" />{site.issues.critical} críticos
                        </span>
                      )}
                      {site.issues.high > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-700 border border-orange-200 px-2 py-1 rounded-full font-semibold">
                          <AlertTriangle className="w-3 h-3" />{site.issues.high} altos
                        </span>
                      )}
                      {site.issues.medium > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 border border-yellow-200 px-2 py-1 rounded-full">
                          ⚠ {site.issues.medium} medios
                        </span>
                      )}
                      {site.issues.total === 0 && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-1 rounded-full font-bold">
                          <CheckCircle className="w-3 h-3" />Sin issues
                        </span>
                      )}
                    </div>

                    {/* KPIs */}
                    {site.kpis && (site.kpis.totalImpressions > 0 || site.kpis.keywordsTop10 > 0) ? (
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <p className="text-sm font-black text-black">{site.kpis.totalClicks.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5"><MousePointerClick className="w-2.5 h-2.5"/>clics</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <p className="text-sm font-black text-black">{site.kpis.totalImpressions.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5"><Eye className="w-2.5 h-2.5"/>impr.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <p className="text-sm font-black text-black">{site.kpis.avgPosition?.toFixed(1) ?? "—"}</p>
                          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5"><TrendingUp className="w-2.5 h-2.5"/>posición</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2 text-center">
                          <p className="text-sm font-black text-black">{site.kpis.keywordsTop10}</p>
                          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5"><Hash className="w-2.5 h-2.5"/>top 10</p>
                        </div>
                      </div>
                    ) : (
                      !site.isLoading && <p className="text-xs text-slate-400 italic">Sin datos GSC · Conecta Search Console</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Issues expandibles */}
            {!site.isLoading && site.topIssues.length > 0 && (
              <div className="border-t border-black/10">
                <button onClick={() => setExpanded(expanded === site.id ? null : site.id)}
                  className="w-full px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-black flex items-center justify-between transition-colors bg-white/40 hover:bg-white/60">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    {site.topIssues.length} problemas prioritarios
                  </span>
                  {expanded === site.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {expanded === site.id && (
                  <div className="px-5 pb-4 space-y-2 bg-white/20">
                    {site.topIssues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 pt-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase flex-shrink-0 ${
                          issue.severity === "critical" ? "bg-red-100 text-red-700 border-red-200" :
                          issue.severity === "high" ? "bg-orange-100 text-orange-700 border-orange-200" :
                          "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>
                          {issue.severity === "critical" ? "crítico" : issue.severity === "high" ? "alto" : "medio"}
                        </span>
                        <p className="text-xs text-slate-700 leading-tight">{issue.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Botones */}
            <div className="px-5 py-3 bg-white/50 border-t border-black/10 flex gap-2">
              <button onClick={() => onSelectSite(site.id)}
                className="flex-1 text-xs font-bold bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
                Analizar en detalle →
              </button>
              <button onClick={() => loadSite(site)} disabled={site.isLoading}
                className="p-2.5 text-slate-400 hover:text-black border border-black/10 rounded-xl bg-white/50 transition-colors disabled:opacity-40" title="Refrescar">
                <RefreshCw className={`w-3.5 h-3.5 ${site.isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
