"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import {
  MousePointerClick, Users, TrendingUp, TrendingDown, Target,
  RefreshCw, ExternalLink, BarChart3, Search, Globe, Mail,
  Share2, Megaphone, ArrowUpRight, ArrowDownRight, Minus,
  AlertCircle, CheckCircle,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Campaign {
  campaign: string;
  source: string;
  medium: string;
  sessions: number;
  users: number;
  bounceRate: number;
  avgDuration: number;
  pageViews: number;
  conversions: number;
}

interface ChannelGroup {
  channel: string;
  sessions: number;
  users: number;
  conversions: number;
  bounceRate: number;
}

interface Keyword {
  keyword: string;
  campaign: string;
  sessions: number;
  conversions: number;
  bounceRate: number;
}

interface AdsData {
  campaigns: Campaign[];
  channelGroups: ChannelGroup[];
  keywords: Keyword[];
  summary: { sessions: number; users: number; conversions: number; bounceRate: number };
}

// ─── Colores por canal ─────────────────────────────────────────────────────────
const CHANNEL_CONFIG: Record<string, { color: string; icon: React.ElementType; bg: string }> = {
  "Paid Search":        { color: "#4f46e5", icon: Search,         bg: "bg-indigo-50"  },
  "Organic Search":     { color: "#16a34a", icon: Search,         bg: "bg-green-50"   },
  "Direct":             { color: "#0284c7", icon: Globe,          bg: "bg-blue-50"    },
  "Email":              { color: "#d97706", icon: Mail,           bg: "bg-amber-50"   },
  "Referral":           { color: "#7c3aed", icon: Share2,         bg: "bg-violet-50"  },
  "Paid Social":        { color: "#db2777", icon: Share2,         bg: "bg-pink-50"    },
  "Organic Social":     { color: "#9333ea", icon: Share2,         bg: "bg-purple-50"  },
  "Display":            { color: "#0891b2", icon: Megaphone,      bg: "bg-cyan-50"    },
  "Unassigned":         { color: "#6b7280", icon: Globe,          bg: "bg-gray-50"    },
};

const CHART_COLORS = ["#4f46e5", "#16a34a", "#d97706", "#0284c7", "#db2777", "#7c3aed", "#0891b2", "#9333ea"];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function fmtDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
}

function StatCard({
  label, value, sub, icon: Icon, color, trend,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; trend?: "up" | "down" | "neutral";
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-black text-black leading-none">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
      {trend && (
        <div className={`flex-shrink-0 ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-400"}`}>
          {trend === "up" ? <ArrowUpRight className="w-5 h-5" /> : trend === "down" ? <ArrowDownRight className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
        </div>
      )}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AdsPage() {
  const [data, setData] = useState<AdsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "keywords">("overview");
  const [hasGA, setHasGA] = useState(true);

  const getToken = () =>
    document.cookie.split("; ").find(r => r.startsWith("admin_token="))?.split("=")[1];

  const loadData = async (d: number) => {
    setIsLoading(true);
    try {
      const apiUrl = getApiUrl();
      const token = getToken();
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`${apiUrl}/analytics/campaigns?days=${d}`, {
        credentials: "include", headers,
      });

      if (res.ok) {
        const json = await res.json();
        setData(json);
        // Si no hay datos, puede ser que GA no esté configurado
        if (json.channelGroups.length === 0 && json.campaigns.length === 0) {
          setHasGA(false);
        }
      } else {
        setHasGA(false);
      }
    } catch {
      setHasGA(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(days); }, [days]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-200 border-t-black mx-auto mb-4" />
          <p className="text-gray-600">Cargando métricas de publicidad...</p>
        </div>
      </div>
    );
  }

  // ── Sin GA configurado ─────────────────────────────────────────────────────
  if (!hasGA || !data) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black">Ads & Campañas</h1>
          <p className="text-slate-500 mt-1">Métricas de publicidad y rendimiento de campañas</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-amber-900 mb-2">Google Analytics no conectado</h2>
          <p className="text-amber-700 mb-6">
            Para ver las métricas de campañas necesitas conectar Google Analytics 4 con la API de datos.
            Una vez conectado, verás clics, sesiones, conversiones y el desglose por canal de tráfico.
          </p>
          <div className="bg-white rounded-xl border border-amber-200 p-4 text-left text-sm text-amber-800 space-y-2 max-w-md mx-auto">
            <p className="font-semibold">Variables de entorno necesarias en Railway:</p>
            <code className="block bg-amber-100 rounded p-2 text-xs">GOOGLE_ANALYTICS_CREDENTIALS={"{"}"type":"service_account"...{"}"}</code>
            <code className="block bg-amber-100 rounded p-2 text-xs">GOOGLE_ANALYTICS_PROPERTY_ID=517091107</code>
          </div>
        </div>
      </div>
    );
  }

  const totalSessions = data.channelGroups.reduce((s, c) => s + c.sessions, 0);
  const paidData = data.channelGroups.filter(c =>
    c.channel.toLowerCase().includes("paid") || c.channel.toLowerCase().includes("cpc")
  );
  const paidSessions = paidData.reduce((s, c) => s + c.sessions, 0);
  const paidPct = totalSessions > 0 ? Math.round((paidSessions / totalSessions) * 100) : 0;

  const pieData = data.channelGroups.map((c, i) => ({
    name: c.channel,
    value: c.sessions,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-black">Ads & Campañas</h1>
          <p className="text-slate-500 mt-1">
            Fuente: Google Analytics 4 · Velasegalaviladecans.com
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Selector período */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {[7, 14, 30, 90].map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  days === d ? "bg-white text-black shadow-sm" : "text-slate-500 hover:text-black"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
          <button
            onClick={() => loadData(days)}
            className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-colors"
            title="Refrescar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href="https://ads.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Google Ads
          </a>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Sesiones totales"
          value={totalSessions.toLocaleString()}
          sub={`Últimos ${days} días`}
          icon={BarChart3}
          color="bg-indigo-600"
        />
        <StatCard
          label="Usuarios únicos"
          value={data.channelGroups.reduce((s, c) => s + c.users, 0).toLocaleString()}
          icon={Users}
          color="bg-blue-600"
        />
        <StatCard
          label="Conversiones"
          value={data.channelGroups.reduce((s, c) => s + c.conversions, 0).toFixed(0)}
          sub="Eventos de conversión GA4"
          icon={Target}
          color="bg-green-600"
        />
        <StatCard
          label="Tráfico de pago"
          value={`${paidPct}%`}
          sub={`${paidSessions.toLocaleString()} sesiones CPC`}
          icon={Megaphone}
          color="bg-orange-500"
        />
      </div>

      {/* Banner Google Ads API */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold">Conecta Google Ads API para ver gasto, CPC e impresiones</p>
            <p className="text-blue-100 text-sm">Actualmente los datos provienen de Google Analytics 4. Para ver el gasto real por campaña necesitas la Google Ads API.</p>
          </div>
        </div>
        <a
          href="https://developers.google.com/google-ads/api/docs/start"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors"
        >
          Configurar <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 w-fit">
          {([
            { key: "overview",  label: "📊 Canales" },
            { key: "campaigns", label: "🎯 Campañas" },
            { key: "keywords",  label: "🔑 Keywords" },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key ? "bg-white text-black shadow-sm" : "text-slate-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Canales ─────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Gráfico de barras */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-black mb-4">Sesiones por canal</h3>
              {data.channelGroups.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data.channelGroups} margin={{ left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="channel" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v: number, name: string) => [v.toLocaleString(), name]}
                      contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                    />
                    <Bar dataKey="sessions" name="Sesiones" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="conversions" name="Conversiones" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-slate-400">Sin datos de canales</div>
              )}
            </div>

            {/* Gráfico circular */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-black mb-4">Distribución de tráfico</h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                      outerRadius={100} innerRadius={50} paddingAngle={2}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => [v.toLocaleString() + " sesiones"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64 text-slate-400">Sin datos</div>
              )}
            </div>

            {/* Tabla de canales */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-black">Rendimiento por canal</h3>
              </div>
              {data.channelGroups.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-slate-500 text-xs uppercase tracking-wide">
                      <tr>
                        <th className="px-6 py-3 text-left">Canal</th>
                        <th className="px-6 py-3 text-right">Sesiones</th>
                        <th className="px-6 py-3 text-right">Usuarios</th>
                        <th className="px-6 py-3 text-right">Conversiones</th>
                        <th className="px-6 py-3 text-right">% Rebote</th>
                        <th className="px-6 py-3 text-right">% del total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.channelGroups.map((ch, i) => {
                        const cfg = CHANNEL_CONFIG[ch.channel] || CHANNEL_CONFIG["Unassigned"];
                        const ChIcon = cfg.icon;
                        const pct = totalSessions > 0 ? (ch.sessions / totalSessions * 100) : 0;
                        return (
                          <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                                  <ChIcon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                                </div>
                                <span className="font-medium text-black">{ch.channel}</span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-right font-semibold">{ch.sessions.toLocaleString()}</td>
                            <td className="px-6 py-3 text-right text-slate-600">{ch.users.toLocaleString()}</td>
                            <td className="px-6 py-3 text-right">
                              <span className="font-semibold text-green-700">{ch.conversions.toFixed(0)}</span>
                            </td>
                            <td className="px-6 py-3 text-right">
                              <span className={ch.bounceRate > 70 ? "text-red-600 font-semibold" : ch.bounceRate > 50 ? "text-amber-600" : "text-green-600 font-semibold"}>
                                {ch.bounceRate}%
                              </span>
                            </td>
                            <td className="px-6 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
                                </div>
                                <span className="text-xs text-slate-500 w-8 text-right">{pct.toFixed(0)}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <BarChart3 className="w-12 h-12 mb-3" />
                  <p className="font-medium">Sin datos de canales</p>
                  <p className="text-sm mt-1">Los datos aparecerán cuando haya tráfico registrado en GA4</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Campañas ────────────────────────────────────────────────── */}
        {activeTab === "campaigns" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black">Campañas activas</h3>
              <span className="text-xs text-slate-400">{data.campaigns.length} campañas · últimos {days} días</span>
            </div>
            {data.campaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Campaña</th>
                      <th className="px-6 py-3 text-left">Fuente / Medio</th>
                      <th className="px-6 py-3 text-right">Sesiones</th>
                      <th className="px-6 py-3 text-right">Usuarios</th>
                      <th className="px-6 py-3 text-right">Conversiones</th>
                      <th className="px-6 py-3 text-right">% Rebote</th>
                      <th className="px-6 py-3 text-right">Duración media</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.campaigns.map((c, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3">
                          <p className="font-semibold text-black truncate max-w-[200px]">{c.campaign}</p>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              c.medium === "cpc" ? "bg-orange-100 text-orange-700" :
                              c.medium === "organic" ? "bg-green-100 text-green-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>{c.medium || "–"}</span>
                            <span className="text-xs text-slate-400">{c.source}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-right font-semibold">{c.sessions.toLocaleString()}</td>
                        <td className="px-6 py-3 text-right text-slate-600">{c.users.toLocaleString()}</td>
                        <td className="px-6 py-3 text-right">
                          <span className="font-semibold text-green-700">{c.conversions.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <span className={c.bounceRate > 70 ? "text-red-600 font-semibold" : "text-slate-600"}>
                            {c.bounceRate}%
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right text-slate-600">{fmtDuration(c.avgDuration)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <Target className="w-12 h-12 mb-3" />
                <p className="font-medium">Sin campañas registradas</p>
                <p className="text-sm mt-1">Las campañas aparecerán cuando haya tráfico con parámetros UTM o de Google Ads</p>
                <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700">
                  Crear campaña en Google Ads <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Keywords ───────────────────────────────────────────────── */}
        {activeTab === "keywords" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black">Keywords de pago (CPC)</h3>
              <span className="text-xs text-slate-400">{data.keywords.length} keywords · últimos {days} días</span>
            </div>
            {data.keywords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Keyword</th>
                      <th className="px-6 py-3 text-left">Campaña</th>
                      <th className="px-6 py-3 text-right">Sesiones</th>
                      <th className="px-6 py-3 text-right">Conversiones</th>
                      <th className="px-6 py-3 text-right">% Rebote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.keywords.map((k, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="font-medium text-black">{k.keyword}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-slate-500 text-xs">{k.campaign}</td>
                        <td className="px-6 py-3 text-right font-semibold">{k.sessions}</td>
                        <td className="px-6 py-3 text-right">
                          <span className="font-semibold text-green-700">{k.conversions.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <span className={k.bounceRate > 70 ? "text-red-600 font-semibold" : "text-slate-600"}>
                            {k.bounceRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <Search className="w-12 h-12 mb-3" />
                <p className="font-medium">Sin keywords de pago registradas</p>
                <p className="text-sm mt-1">Aparecerán cuando haya tráfico CPC con keywords en Google Ads</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nota informativa */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800">
        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Datos de Google Analytics 4</p>
          <p>
            Las métricas de sesiones, usuarios, conversiones y rebote provienen de GA4.
            Para ver gasto, CPC, impresiones y ROAS necesitas conectar la{" "}
            <a href="https://developers.google.com/google-ads/api" target="_blank" rel="noopener noreferrer"
              className="underline font-semibold">Google Ads API</a>{" "}
            con un Developer Token. Puedes solicitarlo en{" "}
            <a href="https://ads.google.com/aw/apicenter" target="_blank" rel="noopener noreferrer"
              className="underline font-semibold">Google Ads API Center</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
