"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Eye, MousePointerClick, Target, AlertTriangle } from "lucide-react";
import { getApiUrl } from "@/lib/config";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface OverviewData {
  kpis: {
    totalClicks: number;
    totalImpressions: number;
    avgPosition: number | null;
    avgCTR: number | null;
    keywordsTop3: number;
    keywordsTop10: number;
    keywordsInTop100: number;
    criticalIssues: number;
    totalIssues: number;
  };
  trends: Array<{
    date: string;
    clicks: number;
    impressions: number;
    avgPosition: number | null;
  }>;
  positionDistribution: {
    avg: number | null;
    total: number;
  };
}

export function SeoOverview({ siteId }: { siteId: string }) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState(28);

  useEffect(() => {
    loadOverview();
  }, [siteId, days]);

  const loadOverview = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(
        `${apiUrl}/seo/sites/${siteId}/overview?days=${days}`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.ok) {
        const overviewData = await response.json();
        setData(overviewData);
      }
    } catch (error) {
      console.error("Error al cargar overview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-12 text-gray-600">No hay datos disponibles</div>;
  }

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Período:</label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value={7}>7 días</option>
          <option value={14}>14 días</option>
          <option value={28}>28 días</option>
          <option value={90}>90 días</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Clicks</h3>
            <MousePointerClick className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-black">{data.kpis.totalClicks.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Últimos {days} días</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Impressions</h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-black">
            {data.kpis.totalImpressions.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Últimos {days} días</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Posición Promedio</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-black">
            {data.kpis.avgPosition ? data.kpis.avgPosition.toFixed(1) : "N/A"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Últimos {days} días</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">CTR Promedio</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-black">
            {data.kpis.avgCTR ? `${data.kpis.avgCTR.toFixed(2)}%` : "N/A"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Últimos {days} días</p>
        </div>
      </div>

      {/* Keywords in Top Positions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Keywords Top 3</h3>
          <p className="text-3xl font-bold text-black">{data.kpis.keywordsTop3}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Keywords Top 10</h3>
          <p className="text-3xl font-bold text-black">{data.kpis.keywordsTop10}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Keywords Top 100</h3>
          <p className="text-3xl font-bold text-black">{data.kpis.keywordsInTop100}</p>
        </div>
      </div>

      {/* Issues Alert */}
      {data.kpis.criticalIssues > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-900">
              {data.kpis.criticalIssues} problema(s) crítico(s) encontrado(s)
            </p>
            <p className="text-sm text-red-700">
              {data.kpis.totalIssues} problema(s) total(es) pendiente(s)
            </p>
          </div>
        </div>
      )}

      {/* Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-black mb-4">Tendencias Diarias</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="clicks"
              stroke="#000000"
              strokeWidth={2}
              name="Clicks"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="impressions"
              stroke="#6B7280"
              strokeWidth={2}
              name="Impressions"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgPosition"
              stroke="#EF4444"
              strokeWidth={2}
              name="Posición Promedio"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

