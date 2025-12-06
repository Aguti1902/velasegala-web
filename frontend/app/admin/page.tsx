"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  FolderTree,
  Tags,
  Eye,
  TrendingUp,
  Calendar,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
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
import { GoogleAnalyticsWidget } from "@/components/admin/GoogleAnalyticsWidget";

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalCategories: number;
  totalTags: number;
  totalViews: number;
  viewsGrowth: number;
}

interface RecentPost {
  id: string;
  title: string;
  publishAt: string;
  views: number;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalCategories: 0,
    totalTags: 0,
    totalViews: 0,
    viewsGrowth: 0,
  });

  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo para gráficos (reemplazar con datos reales)
  const viewsData = [
    { name: "Lun", views: 120 },
    { name: "Mar", views: 145 },
    { name: "Mié", views: 168 },
    { name: "Jue", views: 190 },
    { name: "Vie", views: 210 },
    { name: "Sáb", views: 165 },
    { name: "Dom", views: 140 },
  ];

  const postsData = [
    { name: "Ene", posts: 5 },
    { name: "Feb", posts: 8 },
    { name: "Mar", posts: 12 },
    { name: "Abr", posts: 10 },
    { name: "May", posts: 15 },
    { name: "Jun", posts: 18 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener posts
        const postsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`
        );
        const postsData = await postsResponse.json();

        // Obtener categorías
        const categoriesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const categoriesData = await categoriesResponse.json();

        // Obtener tags
        const tagsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tags`
        );
        const tagsData = await tagsResponse.json();

        const posts = postsData.data || [];
        const publishedPosts = posts.filter(
          (p: any) => p.publishStatus === "PUBLISHED"
        );
        const draftPosts = posts.filter((p: any) => p.publishStatus === "DRAFT");

        setStats({
          totalPosts: posts.length,
          publishedPosts: publishedPosts.length,
          draftPosts: draftPosts.length,
          totalCategories: categoriesData.length || 0,
          totalTags: tagsData.length || 0,
          totalViews: 1247, // Mock data - implementar analytics real
          viewsGrowth: 12.5, // Mock data
        });

        // Obtener posts recientes
        setRecentPosts(
          posts.slice(0, 5).map((post: any) => ({
            id: post.id,
            title: post.title,
            publishAt: post.publishAt || post.createdAt,
            views: Math.floor(Math.random() * 200), // Mock data
            status: post.publishStatus,
          }))
        );
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Resumen general del blog y estadísticas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Posts */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +{stats.publishedPosts} publicados
            </span>
          </div>
          <h3 className="text-2xl font-bold text-black mb-1">
            {stats.totalPosts}
          </h3>
          <p className="text-sm text-gray-600">Total de Artículos</p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {stats.draftPosts} borradores
            </p>
          </div>
        </div>

        {/* Views */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              {stats.viewsGrowth}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-black mb-1">
            {stats.totalViews.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-600">Total de Visitas</p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Este mes</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FolderTree className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-black mb-1">
            {stats.totalCategories}
          </h3>
          <p className="text-sm text-gray-600">Categorías</p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              href="/admin/categories"
              className="text-xs text-blue-600 hover:underline"
            >
              Gestionar →
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Tags className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-black mb-1">
            {stats.totalTags}
          </h3>
          <p className="text-sm text-gray-600">Etiquetas</p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              href="/admin/tags"
              className="text-xs text-blue-600 hover:underline"
            >
              Gestionar →
            </Link>
          </div>
        </div>
      </div>

      {/* Google Analytics Section */}
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">Estadísticas del Sitio Web</h2>
          <p className="text-gray-600">Datos de Google Analytics en tiempo real</p>
        </div>
        <GoogleAnalyticsWidget />
      </div>

      {/* Blog Posts Chart */}
      <div className="mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-black mb-1">
                Artículos Publicados
              </h3>
              <p className="text-sm text-gray-600">Últimos 6 meses</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={postsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="posts" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-black mb-1">
              Artículos Recientes
            </h3>
            <p className="text-sm text-gray-600">
              Últimos artículos creados por el agente de IA
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
          >
            Ver todos
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No hay artículos todavía</p>
            <p className="text-sm text-gray-500">
              Configura el agente de IA para empezar a generar contenido
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Título
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Visitas
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="font-medium text-black hover:text-blue-600 line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : post.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {post.status === "PUBLISHED"
                          ? "Publicado"
                          : post.status === "DRAFT"
                          ? "Borrador"
                          : "Programado"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{post.views}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(post.publishAt).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 shadow-2xl text-white">
        <h3 className="text-2xl font-bold mb-2">¿Qué deseas hacer?</h3>
        <p className="text-gray-300 mb-6">Accesos rápidos a las acciones más comunes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/posts/new"
            className="bg-white text-black px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all text-center"
          >
            Crear Artículo Manual
          </Link>
          <Link
            href="/admin/posts?status=DRAFT"
            className="bg-gray-700 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-600 transition-all text-center"
          >
            Revisar Borradores
          </Link>
          <Link
            href="/admin/categories"
            className="bg-gray-700 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-600 transition-all text-center"
          >
            Gestionar Categorías
          </Link>
        </div>
      </div>
    </div>
  );
}

