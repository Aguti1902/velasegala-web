"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getApiUrl } from "@/lib/config";
import { ArrowLeft, CheckCircle, XCircle, TrendingUp, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ComparisonData {
  competitor: {
    id: string;
    name: string;
    domain: string;
    url: string;
  };
  stats: {
    sharedKeywords: number;
    ourOnlyKeywords: number;
    competitorOnlyKeywords: number;
    weWin: number;
    weLose: number;
    tied: number;
  };
  sharedKeywords: Array<{
    keyword: string;
    ourPosition: number | null;
    competitorPosition: number | null;
    ourVolume: number | null;
    competitorVolume: number | null;
    ourClicks: number;
    competitorClicks: number;
    ourImpressions: number;
    competitorImpressions: number;
    ourUrl: string | null;
    competitorUrl: string | null;
    weAreBetter: boolean | null;
  }>;
  ourOnlyKeywords: Array<{
    keyword: string;
    position: number | null;
    volume: number | null;
    clicks: number;
    impressions: number;
    url: string | null;
  }>;
  competitorOnlyKeywords: Array<{
    keyword: string;
    position: number | null;
    volume: number | null;
    url: string | null;
  }>;
}

const COLORS = {
  win: "#10b981",
  lose: "#ef4444",
  tied: "#f59e0b",
  ourOnly: "#3b82f6",
  competitorOnly: "#8b5cf6",
};

export default function CompetitorComparisonPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const competitorId = params.competitorId as string;
  
  const [data, setData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComparison();
  }, [siteId, competitorId]);

  const loadComparison = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(
        `${apiUrl}/seo/sites/${siteId}/competitors/${competitorId}/compare`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        const errorData = await response.json().catch(() => ({ message: "Error desconocido" }));
        console.error("Error al cargar comparativa:", errorData);
        alert(`Error al cargar comparativa: ${errorData.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error al cargar comparativa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-800 rounded-lg">
          <p>No se pudieron cargar los datos de comparación.</p>
        </div>
      </div>
    );
  }

  // Datos para gráficas
  const positionComparisonData = data.sharedKeywords
    .filter((k) => k.ourPosition && k.competitorPosition)
    .slice(0, 20)
    .map((k) => ({
      keyword: k.keyword.length > 30 ? k.keyword.substring(0, 30) + "..." : k.keyword,
      "Nuestra Posición": k.ourPosition,
      "Posición Competidor": k.competitorPosition,
    }));

  const winLossData = [
    { name: "Ganamos", value: data.stats.weWin, color: COLORS.win },
    { name: "Perdemos", value: data.stats.weLose, color: COLORS.lose },
    { name: "Empate", value: data.stats.tied, color: COLORS.tied },
  ];

  const volumeComparisonData = data.sharedKeywords
    .filter((k) => (k.ourVolume || 0) > 0 || (k.competitorVolume || 0) > 0)
    .slice(0, 15)
    .map((k) => ({
      keyword: k.keyword.length > 25 ? k.keyword.substring(0, 25) + "..." : k.keyword,
      "Nuestro Volumen": k.ourVolume || 0,
      "Volumen Competidor": k.competitorVolume || 0,
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <h1 className="text-3xl font-bold text-black mb-2">
          Comparativa SEO: {data.competitor.name}
        </h1>
        <p className="text-gray-600">
          Análisis detallado de keywords, posiciones y volúmenes vs {data.competitor.domain}
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Keywords Compartidas</p>
              <p className="text-3xl font-bold text-black mt-2">{data.stats.sharedKeywords}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nosotros Ganamos</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{data.stats.weWin}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ellos Ganan</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{data.stats.weLose}</p>
            </div>
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfica Win/Loss */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-black mb-4">Distribución de Resultados</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={winLossData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Volúmenes */}
        {volumeComparisonData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-black mb-4">Comparación de Volúmenes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="keyword" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Nuestro Volumen" fill={COLORS.ourOnly} />
                <Bar dataKey="Volumen Competidor" fill={COLORS.competitorOnly} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Gráfica de Posiciones */}
      {positionComparisonData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-black mb-4">Comparación de Posiciones (Top 20)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={positionComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="keyword" angle={-45} textAnchor="end" height={120} />
              <YAxis reversed />
              <Tooltip />
              <Legend />
              <Bar dataKey="Nuestra Posición" fill={COLORS.win} />
              <Bar dataKey="Posición Competidor" fill={COLORS.lose} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Keywords Compartidas */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">Keywords Compartidas</h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nuestra Posición</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Su Posición</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nuestro Volumen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Su Volumen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.sharedKeywords.slice(0, 50).map((kw, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-black">{kw.keyword}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {kw.ourPosition ? `#${kw.ourPosition.toFixed(0)}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {kw.competitorPosition ? `#${kw.competitorPosition.toFixed(0)}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {kw.ourVolume ? kw.ourVolume.toLocaleString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {kw.competitorVolume ? kw.competitorVolume.toLocaleString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {kw.weAreBetter === true ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Ganamos
                        </span>
                      ) : kw.weAreBetter === false ? (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          <XCircle className="w-3 h-3 inline mr-1" />
                          Perdemos
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Empate
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Keywords Solo Nuestras */}
      {data.ourOnlyKeywords.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Keywords Solo Nuestras ({data.ourOnlyKeywords.length})
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volumen Mensual</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impresiones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.ourOnlyKeywords.slice(0, 30).map((kw, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-black">{kw.keyword}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {kw.position ? `#${kw.position.toFixed(0)}` : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {kw.volume ? kw.volume.toLocaleString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{kw.clicks.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{kw.impressions.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Solo del Competidor (Oportunidades) */}
      {data.competitorOnlyKeywords.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Oportunidades: Keywords Solo del Competidor ({data.competitorOnlyKeywords.length})
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Su Posición</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volumen Mensual</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.competitorOnlyKeywords.slice(0, 30).map((kw, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-black">{kw.keyword}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {kw.position ? `#${kw.position.toFixed(0)}` : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {kw.volume ? kw.volume.toLocaleString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {kw.url ? (
                          <a href={kw.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {kw.url}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

