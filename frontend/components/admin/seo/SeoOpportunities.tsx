"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import { TrendingUp, AlertCircle } from "lucide-react";

interface Opportunity {
  quickWins: Array<{
    keyword: string;
    position: number | null;
    monthlyVolume: number | null;
    impressions: number;
    url: string | null;
  }>;
  cannibalization: Array<{
    keyword: string;
    urls: string[];
    urlCount: number;
  }>;
}

export function SeoOpportunities({ siteId }: { siteId: string }) {
  const [data, setData] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOpportunities();
  }, [siteId]);

  const loadOpportunities = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(
        `${apiUrl}/seo/sites/${siteId}/opportunities`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.ok) {
        const opportunities = await response.json();
        setData(opportunities);
      }
    } catch (error) {
      console.error("Error al cargar oportunidades:", error);
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
      {/* Quick Wins */}
      <div>
        <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Quick Wins
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Keywords en posición 4-15 con alto volumen de búsqueda. Mejorar estas puede generar
          tráfico significativo.
        </p>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Posición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Volumen Mensual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Impressions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  URL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.quickWins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="space-y-2">
                      <p>No hay quick wins disponibles</p>
                      <p className="text-sm text-gray-400">
                        Las quick wins aparecen cuando hay keywords en posición 4-15 con volumen &gt;= 100
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Necesitas sincronizar con Google Search Console para obtener posiciones
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.quickWins.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{kw.keyword}</td>
                    <td className="px-6 py-4">{kw.position?.toFixed(1) || "N/A"}</td>
                    <td className="px-6 py-4">
                      {kw.monthlyVolume ? kw.monthlyVolume.toLocaleString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">{kw.impressions.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                      {kw.url || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cannibalization */}
      <div>
        <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Cannibalización
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Keywords que rankean en múltiples URLs. Esto divide el link equity y puede confundir a
          Google.
        </p>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  URLs que Rankean
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.cannibalization.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No hay problemas de cannibalización detectados
                  </td>
                </tr>
              ) : (
                data.cannibalization.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.keyword}</td>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside space-y-1">
                        {item.urls.map((url, urlIdx) => (
                          <li key={urlIdx} className="text-sm text-gray-600 truncate max-w-md">
                            {url}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4">{item.urlCount}</td>
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

