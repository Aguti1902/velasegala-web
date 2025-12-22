"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/config";
import { CheckCircle, Clock, X } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  steps: string[];
  impactScore: number;
  effortScore: number;
  priority: number;
  status: string;
  issue?: {
    title: string;
    severity: string;
  };
}

export function SeoRecommendations({ siteId }: { siteId: string }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [siteId]);

  const loadRecommendations = async () => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(
        `${apiUrl}/seo/sites/${siteId}/recommendations`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (error) {
      console.error("Error al cargar recomendaciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const apiUrl = getApiUrl();
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(`${apiUrl}/seo/recommendations/${id}/status`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        loadRecommendations();
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No hay recomendaciones disponibles. Ejecuta una sincronización para generar recomendaciones.
        </div>
      ) : (
        recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black mb-2">{rec.title}</h3>
                <p className="text-gray-600 mb-4">{rec.rationale}</p>
                {rec.issue && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">
                      Relacionado con: {rec.issue.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Severidad: {rec.issue.severity}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rec.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : rec.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {rec.status === "completed"
                    ? "Completado"
                    : rec.status === "in_progress"
                    ? "En progreso"
                    : "Pendiente"}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pasos para implementar:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                {rec.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Scores */}
            <div className="flex items-center gap-6 mb-4">
              <div>
                <span className="text-xs text-gray-500">Impacto</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `${rec.impactScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{rec.impactScore}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Esfuerzo</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-orange-600 rounded-full"
                      style={{ width: `${rec.effortScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{rec.effortScore}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Prioridad</span>
                <div className="text-lg font-bold text-black">{rec.priority}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {rec.status !== "completed" && (
                <button
                  onClick={() => updateStatus(rec.id, "completed")}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Marcar como completado
                </button>
              )}
              {rec.status === "pending" && (
                <button
                  onClick={() => updateStatus(rec.id, "in_progress")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  En progreso
                </button>
              )}
              <button
                onClick={() => updateStatus(rec.id, "dismissed")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                Descartar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

