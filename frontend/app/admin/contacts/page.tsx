"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  UserCheck,
  Trash2,
  MoreVertical,
  Download,
} from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  treatment?: string;
  status: string;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  contacted: number;
  converted: number;
  conversionRate: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    contacted: 0,
    converted: 0,
    conversionRate: "0",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      const url = statusFilter === "ALL" 
        ? `${getApiUrl()}/contacts`
        : `${getApiUrl()}/contacts?status=${statusFilter}`;
      
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setContacts(data.data || []);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      const response = await fetch(
        `${getApiUrl()}/contacts/stats/overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [fetchContacts, fetchStats]);

  // Recarga automática cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      fetchContacts();
      fetchStats();
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, [fetchContacts, fetchStats]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      await fetch(
        `${getApiUrl()}/contacts/${id}/status?status=${newStatus}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchContacts();
      fetchStats();
      setActiveMenu(null);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      await fetch(`${getApiUrl()}/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchContacts();
      fetchStats();
      setActiveMenu(null);
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Nombre", "Email", "Teléfono", "Tratamiento", "Estado", "Fecha"].join(","),
      ...contacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone,
        contact.treatment || "N/A",
        contact.status,
        new Date(contact.createdAt).toLocaleDateString("es-ES"),
      ].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contactos-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pendiente
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <UserCheck className="w-3 h-3" />
            Contactado
          </span>
        );
      case "converted":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Convertido
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando contactos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Contactos</h1>
          <p className="text-gray-600">
            Gestiona los contactos recibidos desde el formulario web
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
        >
          <Download className="w-5 h-5" />
          Exportar CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.total}</h3>
          <p className="text-sm text-gray-600">Total Contactos</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.pending}</h3>
          <p className="text-sm text-gray-600">Pendientes</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.contacted}</h3>
          <p className="text-sm text-gray-600">Contactados</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.converted}</h3>
          <p className="text-sm text-gray-600">Convertidos</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
          <p className="text-sm mb-2">Tasa de Conversión</p>
          <h3 className="text-3xl font-bold">{stats.conversionRate}%</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="ALL">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="contacted">Contactados</option>
            <option value="converted">Convertidos</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">
            No hay contactos
          </h3>
          <p className="text-gray-600">
            {statusFilter !== "ALL"
              ? "No se encontraron contactos con este filtro"
              : "Los contactos del formulario aparecerán aquí"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-black mb-1">
                        {contact.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(contact.createdAt).toLocaleDateString(
                            "es-ES",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(contact.status)}
                  </div>

                  {contact.treatment && (
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500">
                        Tratamiento de interés:
                      </span>
                      <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        {contact.treatment}
                      </span>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === contact.id ? null : contact.id)
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeMenu === contact.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                        <button
                          onClick={() => updateStatus(contact.id, "pending")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors w-full text-left"
                        >
                          <Clock className="w-4 h-4" />
                          Marcar como Pendiente
                        </button>
                        <button
                          onClick={() => updateStatus(contact.id, "contacted")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors w-full text-left"
                        >
                          <UserCheck className="w-4 h-4" />
                          Marcar como Contactado
                        </button>
                        <button
                          onClick={() => updateStatus(contact.id, "converted")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-green-600 transition-colors w-full text-left"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marcar como Convertido
                        </button>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors w-full text-left"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

