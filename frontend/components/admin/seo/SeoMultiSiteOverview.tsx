"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface SiteScore {
  id: string;
  domain: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  color: string;
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  topIssues: Array<{ title: string; severity: string; url?: string }>;
  kpis?: {
    totalClicks: number;
    totalImpressions: number;
    avgPosition: number | null;
    keywordsTop10: number;
  };
  isLoading: boolean;
  error?: string;
}

// Puntos deducidos por tipo de issue
const DEDUCTIONS = { critical: 20, high: 10, medium: 4, low: 1 };

function calcScore(issues: SiteScore["issues"]): number {
  const deduction =
    issues.critical * DEDUCTIONS.critical +
    issues.high * DEDUCTIONS.high +
    issues.medium * DEDUCTIONS.medium +
    issues.low * DEDUCTIONS.low;
  return Math.max(0, Math.min(100, 100 - deduction));
}

function scoreToGrade(score: number): { grade: SiteScore["grade"]; color: string } {
  if (score >= 90) return { grade: "A", color: "text-green-600" };
  if (score >= 75) return { grade: "B", color: "text-blue-600" };
  if (score >= 60) return { grade: "C", color: "text-yellow-600" };
  if (score >= 40) return { grade: "D", color: "text-orange-600" };
  return { grade: "F", color: "text-red-600" };
}

function ScoreRing({ score, grade, color }: { score: number; grade: string; color: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const ringColor =
    score >= 90 ? "#16a34a" :
    score >= 75 ? "#2563eb" :
    score >= 60 ? "#d97706" :
    score >= 40 ? "#ea580c" : "#dc2626";

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={radius} fill="none"
          stroke={ringColor} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-black ${color}`}>{score}</span>
        <span className={`text-xs font-bold ${color}`}>{grade}</span>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    critical: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${styles[severity] || styles.low}`}>
      {severity}
    </span>
  );
}

export function SeoMultiSiteOverview({
  sites,
  onSelectSite,
}: {
  sites: Array<{ id: string; domain: string }>;
  onSelectSite: (id: string) => void;
}) {
  const [siteScores, setSiteScores] = useState<SiteScore[]>([]);
  const [expandedSite, setExpandedSite] = useState<string | null>(null);

  const loadSiteData = useCallback(
    async (site: { id: string; domain: string }) => {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      setSiteScores((prev) =>
        prev.map((s) => (s.id === site.id ? { ...s, isLoading: true } : s))
      );

      try {
        const [techRes, overviewRes] = await Promise.all([
          fetch(`${apiUrl}/seo/sites/${site.id}/technical`, { credentials: "include", headers }),
          fetch(`${apiUrl}/seo/sites/${site.id}/overview?days=28`, { credentials: "include", headers }),
        ]);

        let issues = { critical: 0, high: 0, medium: 0, low: 0, total: 0 };
        let topIssues: SiteScore["topIssues"] = [];
        let kpis: SiteScore["kpis"] | undefined;

        if (techRes.ok) {
          const techData = await techRes.json();
          const allIssues: any[] = techData.issues || [];
          issues = {
            critical: allIssues.filter((i) => i.severity === "critical").length,
            high: allIssues.filter((i) => i.severity === "high").length,
            medium: allIssues.filter((i) => i.severity === "medium").length,
            low: allIssues.filter((i) => i.severity === "low").length,
            total: allIssues.length,
          };
          topIssues = allIssues
            .filter((i) => ["critical", "high"].includes(i.severity))
            .slice(0, 4)
            .map((i) => ({ title: i.title, severity: i.severity, url: i.url }));
        }

        if (overviewRes.ok) {
          const ovData = await overviewRes.json();
          kpis = {
            totalClicks: ovData.kpis?.totalClicks ?? 0,
            totalImpressions: ovData.kpis?.totalImpressions ?? 0,
            avgPosition: ovData.kpis?.avgPosition ?? null,
            keywordsTop10: ovData.kpis?.keywordsTop10 ?? 0,
          };
        }

        const score = calcScore(issues);
        const { grade, color } = scoreToGrade(score);

        setSiteScores((prev) =>
          prev.map((s) =>
            s.id === site.id
              ? { ...s, score, grade, color, issues, topIssues, kpis, isLoading: false }
              : s
          )
        );
      } catch (err) {
        setSiteScores((prev) =>
          prev.map((s) =>
            s.id === site.id
              ? { ...s, isLoading: false, error: "Error al cargar datos" }
              : s
          )
        );
      }
    },
    []
  );

  useEffect(() => {
    if (sites.length === 0) return;

    const initial: SiteScore[] = sites.map((s) => ({
      ...s,
      score: 0,
      grade: "F",
      color: "text-gray-400",
      issues: { critical: 0, high: 0, medium: 0, low: 0, total: 0 },
      topIssues: [],
      isLoading: true,
    }));
    setSiteScores(initial);

    sites.forEach((site) => loadSiteData(site));
  }, [sites, loadSiteData]);

  if (sites.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-black">Resumen SEO — Todas las webs</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Puntuación calculada en base a issues técnicos detectados
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {siteScores.map((site) => (
          <div
            key={site.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >
            {/* Cabecera de la card */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Score ring */}
                {site.isLoading ? (
                  <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                  </div>
                ) : (
                  <ScoreRing score={site.score} grade={site.grade} color={site.color} />
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-xs text-slate-500 truncate">{site.domain}</span>
                  </div>

                  {!site.isLoading && (
                    <>
                      {/* Contadores de issues */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {site.issues.critical > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
                            <XCircle className="w-3 h-3" />
                            {site.issues.critical} críticos
                          </span>
                        )}
                        {site.issues.high > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">
                            <AlertTriangle className="w-3 h-3" />
                            {site.issues.high} altos
                          </span>
                        )}
                        {site.issues.medium > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full">
                            <Minus className="w-3 h-3" />
                            {site.issues.medium} medios
                          </span>
                        )}
                        {site.issues.total === 0 && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            Sin issues
                          </span>
                        )}
                      </div>

                      {/* KPIs GSC */}
                      {site.kpis && (site.kpis.totalClicks > 0 || site.kpis.keywordsTop10 > 0) ? (
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-base font-bold text-black">{site.kpis.totalClicks.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-500">clics / 28d</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-base font-bold text-black">{site.kpis.keywordsTop10}</p>
                            <p className="text-[10px] text-slate-500">keywords top 10</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Sin datos GSC conectados</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Issues destacados (expandible) */}
            {!site.isLoading && site.topIssues.length > 0 && (
              <>
                <button
                  onClick={() => setExpandedSite(expandedSite === site.id ? null : site.id)}
                  className="w-full px-5 py-2 text-xs text-slate-500 hover:text-black flex items-center justify-between border-t border-gray-100 transition-colors"
                >
                  <span>Ver principales problemas ({site.topIssues.length})</span>
                  {expandedSite === site.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {expandedSite === site.id && (
                  <div className="px-5 pb-4 space-y-2 border-t border-gray-100 bg-gray-50">
                    {site.topIssues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 pt-2">
                        <SeverityBadge severity={issue.severity} />
                        <p className="text-xs text-slate-700 leading-tight">{issue.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Botones */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => onSelectSite(site.id)}
                className="flex-1 text-xs font-semibold bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Analizar
              </button>
              <button
                onClick={() => loadSiteData(site)}
                disabled={site.isLoading}
                className="p-2 text-slate-400 hover:text-black border border-gray-200 rounded-lg transition-colors disabled:opacity-40"
                title="Refrescar"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://${site.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-black border border-gray-200 rounded-lg transition-colors"
                title="Abrir web"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
