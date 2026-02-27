"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield, ChevronDown, ChevronUp, Settings } from "lucide-react";
import Link from "next/link";

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  cookies: { name: string; purpose: string; duration: string; owner: string }[];
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    name: "Cookies esenciales",
    description:
      "Necesarias para el funcionamiento básico del sitio web. No pueden desactivarse.",
    required: true,
    cookies: [
      {
        name: "cookie-consent",
        purpose: "Guarda tu decisión sobre el uso de cookies para no volver a mostrar el aviso.",
        duration: "1 año",
        owner: "Propia",
      },
    ],
  },
  {
    id: "analytics",
    name: "Cookies analíticas",
    description:
      "Nos permiten conocer cómo interactúan los visitantes con el sitio web para mejorar su funcionamiento. Son gestionadas por Google Analytics y Google Tag Manager.",
    required: false,
    cookies: [
      {
        name: "_ga",
        purpose: "Registra un identificador único que permite distinguir usuarios y generar estadísticas de uso.",
        duration: "2 años",
        owner: "Google LLC",
      },
      {
        name: "_ga_[ID]",
        purpose: "Mantiene el estado de la sesión en Google Analytics 4.",
        duration: "2 años",
        owner: "Google LLC",
      },
      {
        name: "_gid",
        purpose: "Registra un identificador único para estadísticas durante la sesión.",
        duration: "24 horas",
        owner: "Google LLC",
      },
      {
        name: "_gtm_*",
        purpose: "Google Tag Manager. Gestiona la carga de etiquetas y scripts de seguimiento.",
        duration: "Sesión / persistente",
        owner: "Google LLC",
      },
    ],
  },
];

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  const handleSaveConfig = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ essential: true, analytics: analyticsEnabled })
    );
    setIsVisible(false);
  };

  const toggleCategory = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6 animate-in slide-in-from-bottom duration-300">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

          {/* ── Cabecera principal ── */}
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              {/* Icono */}
              <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>

              {/* Texto */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-black">Uso de Cookies</h3>
                  <button
                    onClick={handleRejectAll}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el
                  tráfico y personalizar el contenido. Puedes aceptar todas, rechazarlas o configurar
                  tus preferencias haciendo clic en{" "}
                  <button
                    onClick={() => setShowConfig((v) => !v)}
                    className="text-black font-semibold underline hover:text-gray-700 inline"
                  >
                    Aquí
                  </button>
                  . Para más información consulta nuestra{" "}
                  <Link
                    href="/politica-cookies"
                    className="text-black font-semibold underline hover:text-gray-700"
                  >
                    Política de Cookies
                  </Link>
                  .
                </p>

                {/* Botones principales */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all hover:scale-105"
                  >
                    Aceptar todas
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 bg-gray-100 text-black rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => setShowConfig((v) => !v)}
                    className="px-6 py-3 border border-gray-300 text-black rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configurar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Panel de configuración (expandible) ── */}
          {showConfig && (
            <div className="border-t border-gray-200 bg-gray-50 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <Shield className="w-5 h-5 text-black" />
                <h4 className="font-bold text-black text-base">Configuración de cookies</h4>
              </div>

              <div className="space-y-3 mb-6">
                {COOKIE_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    {/* Fila de categoría */}
                    <div className="flex items-center gap-4 p-4">
                      {/* Toggle o badge "obligatoria" */}
                      {cat.required ? (
                        <span className="flex-shrink-0 text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                          Siempre activa
                        </span>
                      ) : (
                        <button
                          role="switch"
                          aria-checked={analyticsEnabled}
                          onClick={() => setAnalyticsEnabled((v) => !v)}
                          className={`flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                            analyticsEnabled ? "bg-black" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                              analyticsEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}

                      {/* Texto */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black text-sm">{cat.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {cat.description}
                        </p>
                      </div>

                      {/* Botón expandir */}
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                        aria-label={
                          expandedCategory === cat.id
                            ? "Ocultar detalle de cookies"
                            : "Ver detalle de cookies"
                        }
                      >
                        {expandedCategory === cat.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Detalle de cookies de la categoría */}
                    {expandedCategory === cat.id && (
                      <div className="border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-3">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead>
                              <tr className="text-slate-500 border-b border-gray-200">
                                <th className="pb-2 pr-4 font-semibold">Cookie</th>
                                <th className="pb-2 pr-4 font-semibold">Propietario</th>
                                <th className="pb-2 pr-4 font-semibold">Duración</th>
                                <th className="pb-2 font-semibold">Finalidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cat.cookies.map((c) => (
                                <tr key={c.name} className="border-b border-gray-100 last:border-0">
                                  <td className="py-2 pr-4 font-mono font-medium text-black align-top">
                                    {c.name}
                                  </td>
                                  <td className="py-2 pr-4 text-slate-600 align-top whitespace-nowrap">
                                    {c.owner}
                                  </td>
                                  <td className="py-2 pr-4 text-slate-600 align-top whitespace-nowrap">
                                    {c.duration}
                                  </td>
                                  <td className="py-2 text-slate-600 align-top leading-relaxed">
                                    {c.purpose}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Botón guardar preferencias */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveConfig}
                  className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all hover:scale-105"
                >
                  Guardar preferencias
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
