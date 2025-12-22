"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import { TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface ComparisonData {
  ourUniqueKeywords: string[];
  opportunities: Array<{
    keyword: string;
    competitors: string[];
    volume: number | null;
  }>;
  competitorsAnalyzed: number;
  totalCompetitorKeywords: number;
}

export function SeoCompetitorComparison({ siteId }: { siteId: string }) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComparison();
  }, [siteId]);

  const loadComparison = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites/${siteId}/competitors/compare`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Error al cargar comparativa:", error);
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
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 rounded-lg">
        <p>No hay datos de comparación disponibles. Asegúrate de haber analizado competidores.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Keywords Únicas Nuestras</p>
              <p className="text-3xl font-bold text-black mt-2">{data.ourUniqueKeywords.length}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Oportunidades</p>
              <p className="text-3xl font-bold text-black mt-2">{data.opportunities.length}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Competidores Analizados</p>
              <p className="text-3xl font-bold text-black mt-2">{data.competitorsAnalyzed}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Keywords únicas nuestras */}
      <div>
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Keywords que solo nosotros tenemos
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {data.ourUniqueKeywords.length === 0 ? (
            <p className="text-gray-500">No hay keywords únicas detectadas</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.ourUniqueKeywords.slice(0, 50).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
              {data.ourUniqueKeywords.length > 50 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  +{data.ourUniqueKeywords.length - 50} más
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Oportunidades */}
      <div>
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          Oportunidades de Keywords (usan competidores pero nosotros no)
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Competidores
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Volumen Mensual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prioridad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.opportunities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No hay oportunidades disponibles
                  </td>
                </tr>
              ) : (
                data.opportunities.map((opp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-black">{opp.keyword}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {opp.competitors.map((comp, compIdx) => (
                          <span
                            key={compIdx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {opp.volume ? opp.volume.toLocaleString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          opp.competitors.length >= 3 && (opp.volume || 0) > 100
                            ? "bg-red-100 text-red-800"
                            : opp.competitors.length >= 2 || (opp.volume || 0) > 50
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {opp.competitors.length >= 3 && (opp.volume || 0) > 100
                          ? "Alta"
                          : opp.competitors.length >= 2 || (opp.volume || 0) > 50
                            ? "Media"
                            : "Baja"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

