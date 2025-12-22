"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import { TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface ComparisonData {
  ourUniqueKeywords: Array<{
    keyword: string;
    position: number | null;
    volume: number | null;
    clicks: number;
    impressions: number;
  }>;
  opportunities: Array<{
    keyword: string;
    ourPosition: number | null;
    competitorPositions: Array<{
      competitor: string;
      competitorName: string;
      position: number | null;
      volume: number | null;
      url: string | null;
    }>;
    bestCompetitorPosition: number | null;
    volume: number | null;
    priority: 'alta' | 'media' | 'baja';
    recommendation: string;
  }>;
  ourAdvantages?: Array<{
    keyword: string;
    ourPosition: number;
    competitorPositions: Array<{
      competitor: string;
      position: number | null;
    }>;
  }>;
  competitorsAnalyzed: number;
  totalCompetitorKeywords: number;
  summary?: {
    keywordsWeHave: number;
    keywordsCompetitorsHave: number;
    opportunitiesCount: number;
    highPriorityOpportunities: number;
  };
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Keywords Únicas Nuestras</p>
              <p className="text-3xl font-bold text-black mt-2">{data.ourUniqueKeywords.length}</p>
              {data.summary && (
                <p className="text-xs text-gray-500 mt-1">Total: {data.summary.keywordsWeHave}</p>
              )}
            </div>
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Oportunidades</p>
              <p className="text-3xl font-bold text-black mt-2">{data.opportunities.length}</p>
              {data.summary && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  {data.summary.highPriorityOpportunities} alta prioridad
                </p>
              )}
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Competidores Analizados</p>
              <p className="text-3xl font-bold text-black mt-2">{data.competitorsAnalyzed}</p>
              {data.summary && (
                <p className="text-xs text-gray-500 mt-1">
                  {data.summary.keywordsCompetitorsHave} keywords totales
                </p>
              )}
            </div>
            <AlertCircle className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        {data.ourAdvantages && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ventajas Nuestras</p>
                <p className="text-3xl font-bold text-black mt-2">{data.ourAdvantages.length}</p>
                <p className="text-xs text-green-600 mt-1">Mejor posicionados</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
        )}
      </div>

      {/* Keywords únicas nuestras */}
      <div>
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Keywords que solo nosotros tenemos
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {data.ourUniqueKeywords.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay keywords únicas detectadas. Asegúrate de haber importado tus keywords.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volumen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impresiones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.ourUniqueKeywords.slice(0, 50).map((kw, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-black">{kw.keyword}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {kw.position ? kw.position.toFixed(1) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {kw.volume ? kw.volume.toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{kw.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{kw.impressions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Nuestras ventajas */}
      {data.ourAdvantages && data.ourAdvantages.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Keywords donde estamos mejor posicionados
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nuestra Posición</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competidores</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.ourAdvantages.slice(0, 30).map((adv, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-black">{adv.keyword}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        #{adv.ourPosition}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {adv.competitorPositions.slice(0, 3).map((comp, compIdx) => (
                          <span
                            key={compIdx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {comp.competitor}: {comp.position ? `#${comp.position}` : 'N/A'}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Oportunidades */}
      <div>
        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          Oportunidades SEO (Keywords donde competidores están mejor)
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nuestra Posición
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mejor Posición Competidor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Volumen Mensual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Recomendación
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.opportunities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No hay oportunidades disponibles. Asegúrate de haber analizado competidores.
                  </td>
                </tr>
              ) : (
                data.opportunities.map((opp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-black">{opp.keyword}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {opp.ourPosition ? `#${opp.ourPosition.toFixed(0)}` : 'No posicionamos'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {opp.bestCompetitorPosition && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                            #{opp.bestCompetitorPosition}
                          </span>
                        )}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {opp.competitorPositions.slice(0, 2).map((comp, compIdx) => (
                            <span
                              key={compIdx}
                              className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                              title={comp.url || ''}
                            >
                              {comp.competitorName}: {comp.position ? `#${comp.position}` : 'N/A'}
                            </span>
                          ))}
                          {opp.competitorPositions.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              +{opp.competitorPositions.length - 2} más
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {opp.volume ? opp.volume.toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          opp.priority === 'alta'
                            ? 'bg-red-100 text-red-800'
                            : opp.priority === 'media'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {opp.priority === 'alta' ? 'Alta' : opp.priority === 'media' ? 'Media' : 'Baja'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      {opp.recommendation}
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

