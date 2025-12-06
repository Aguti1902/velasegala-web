"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Eye, MousePointerClick, Activity } from "lucide-react";
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
} from "recharts";

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  dailyVisitors: Array<{ date: string; visitors: number }>;
  topPages: Array<{ page: string; views: number }>;
}

export function GoogleAnalyticsWidget() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Conectar con Google Analytics API
    // Por ahora usamos datos mock, pero la estructura está lista para GA4
    const fetchAnalytics = async () => {
      try {
        // Aquí iría la llamada a tu API que obtiene datos de GA4
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics`);
        // const data = await response.json();
        
        // Datos mock por ahora
        const mockData: AnalyticsData = {
          visitors: 1247,
          pageViews: 3421,
          bounceRate: 45.2,
          avgSessionDuration: 2.5,
          dailyVisitors: [
            { date: "Lun", visitors: 120 },
            { date: "Mar", visitors: 145 },
            { date: "Mié", visitors: 168 },
            { date: "Jue", visitors: 190 },
            { date: "Vie", visitors: 210 },
            { date: "Sáb", visitors: 165 },
            { date: "Dom", visitors: 140 },
          ],
          topPages: [
            { page: "/", views: 850 },
            { page: "/tratamientos/implantes-dentales-viladecans", views: 320 },
            { page: "/blog", views: 280 },
            { page: "/clinica-dental-viladecans", views: 195 },
          ],
        };

        setAnalytics(mockData);
      } catch (error) {
        console.error("Error al cargar analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
    
    // Recargar cada 5 minutos
    const interval = setInterval(fetchAnalytics, 300000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <p className="text-gray-600">No hay datos de analytics disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{analytics.visitors.toLocaleString()}</h3>
          <p className="text-blue-100 text-sm">Visitantes Únicos</p>
          <p className="text-blue-200 text-xs mt-2">Últimos 7 días</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8" />
            <TrendingUp className="w-5 h-5 opacity-80" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{analytics.pageViews.toLocaleString()}</h3>
          <p className="text-purple-100 text-sm">Vistas de Página</p>
          <p className="text-purple-200 text-xs mt-2">Últimos 7 días</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <MousePointerClick className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{analytics.bounceRate.toFixed(1)}%</h3>
          <p className="text-orange-100 text-sm">Tasa de Rebote</p>
          <p className="text-orange-200 text-xs mt-2">Promedio</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{analytics.avgSessionDuration.toFixed(1)}m</h3>
          <p className="text-green-100 text-sm">Duración Media</p>
          <p className="text-green-200 text-xs mt-2">Por sesión</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visitors Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-black mb-6">Visitantes Diarios</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.dailyVisitors}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-black mb-6">Páginas Más Visitadas</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.topPages} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" fontSize={12} />
              <YAxis dataKey="page" type="category" stroke="#666" fontSize={12} width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="views" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

