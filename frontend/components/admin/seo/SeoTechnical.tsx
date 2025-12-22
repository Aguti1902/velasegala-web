"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface TechnicalSeo {
  issues: Array<{
    id: string;
    type: string;
    severity: string;
    url: string | null;
    title: string;
    description: string;
    status: string;
  }>;
  issuesByType: { [key: string]: any[] };
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
}

export function SeoTechnical({ siteId }: { siteId: string }) {
  const [data, setData] = useState<TechnicalSeo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTechnical();
  }, [siteId]);

  const loadTechnical = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/sites/${siteId}/technical`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (response.ok) {
        const technical = await response.json();
        setData(technical);
      }
    } catch (error) {
      console.error("Error al cargar technical SEO:", error);
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <XCircle className="w-5 h-5" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Issues</div>
          <div className="text-2xl font-bold text-black">{data.summary.total}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-200">
          <div className="text-sm font-medium text-red-600 mb-1">Críticos</div>
          <div className="text-2xl font-bold text-red-900">{data.summary.critical}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg shadow-sm border border-orange-200">
          <div className="text-sm font-medium text-orange-600 mb-1">Altos</div>
          <div className="text-2xl font-bold text-orange-900">{data.summary.high}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
          <div className="text-sm font-medium text-yellow-600 mb-1">Medios</div>
          <div className="text-2xl font-bold text-yellow-900">{data.summary.medium}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <div className="text-sm font-medium text-blue-600 mb-1">Bajos</div>
          <div className="text-2xl font-bold text-blue-900">{data.summary.low}</div>
        </div>
      </div>

      {/* Issues by Type */}
      {Object.entries(data.issuesByType).map(([type, issues]) => (
        <div key={type}>
          <h3 className="text-lg font-bold text-black mb-3 capitalize">{type}</h3>
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
              >
                <div className="flex items-start gap-3">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{issue.title}</h4>
                    <p className="text-sm mb-2">{issue.description}</p>
                    {issue.url && (
                      <p className="text-xs opacity-75 break-all">{issue.url}</p>
                    )}
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-white/50">
                    {issue.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {data.issues.length === 0 && (
        <div className="text-center py-12 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-green-900">
            ¡Excelente! No se encontraron problemas técnicos.
          </p>
        </div>
      )}
    </div>
  );
}

