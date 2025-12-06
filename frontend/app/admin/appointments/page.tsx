"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Phone,
  Mail,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Trash2,
  Download,
} from "lucide-react";
import { getApiUrl } from "@/lib/config";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  treatment?: string;
  message?: string;
  status: string;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const url = statusFilter === "ALL" 
        ? `${getApiUrl()}/appointments`
        : `${getApiUrl()}/appointments?status=${statusFilter}`;
      
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
      setAppointments(data.data || []);
    } catch (error) {
      console.error("Error al cargar citas:", error);
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
        `${getApiUrl()}/appointments/stats/overview`,
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
    fetchAppointments();
    fetchStats();
  }, [fetchAppointments, fetchStats]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      await fetch(
        `${getApiUrl()}/appointments/${id}/status?status=${newStatus}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();
      fetchStats();
      setActiveMenu(null);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta cita?")) {
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_token="))
        ?.split("=")[1];

      await fetch(`${getApiUrl()}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAppointments();
      fetchStats();
      setActiveMenu(null);
    } catch (error) {
      console.error("Error al eliminar cita:", error);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Nombre", "Email", "Teléfono", "Fecha", "Hora", "Tratamiento", "Estado"].join(","),
      ...appointments.map(apt => [
        apt.name,
        apt.email,
        apt.phone,
        new Date(apt.preferredDate).toLocaleDateString("es-ES"),
        apt.preferredTime,
        apt.treatment || "N/A",
        apt.status,
      ].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `citas-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertCircle className="w-3 h-3" />
            Pendiente
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <CheckCircle className="w-3 h-3" />
            Confirmada
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Completada
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3" />
            Cancelada
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
          <p className="text-gray-600">Cargando citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Citas</h1>
          <p className="text-gray-600">
            Gestiona las solicitudes de cita recibidas
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.total}</h3>
          <p className="text-sm text-gray-600">Total Citas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.pending}</h3>
          <p className="text-sm text-gray-600">Pendientes</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.confirmed}</h3>
          <p className="text-sm text-gray-600">Confirmadas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-black">{stats.completed}</h3>
          <p className="text-sm text-gray-600">Completadas</p>
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
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-black mb-2">
            No hay citas
          </h3>
          <p className="text-gray-600">
            {statusFilter !== "ALL"
              ? "No se encontraron citas con este filtro"
              : "Las solicitudes de cita aparecerán aquí"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-black mb-1">
                        {appointment.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {appointment.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {appointment.phone}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-blue-700 mb-1">
                        Fecha preferida
                      </p>
                      <p className="text-sm font-bold text-black">
                        {new Date(appointment.preferredDate).toLocaleDateString(
                          "es-ES",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-purple-700 mb-1">
                        Hora preferida
                      </p>
                      <p className="text-sm font-bold text-black flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {appointment.preferredTime}
                      </p>
                    </div>
                  </div>

                  {appointment.treatment && (
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500">
                        Tratamiento:
                      </span>
                      <span className="ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {appointment.treatment}
                      </span>
                    </div>
                  )}

                  {appointment.message && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        Mensaje:
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {appointment.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === appointment.id ? null : appointment.id)
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeMenu === appointment.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                        <button
                          onClick={() => updateStatus(appointment.id, "pending")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors w-full text-left"
                        >
                          <AlertCircle className="w-4 h-4" />
                          Marcar como Pendiente
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, "confirmed")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-blue-600 transition-colors w-full text-left"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marcar como Confirmada
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, "completed")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-green-600 transition-colors w-full text-left"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Marcar como Completada
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, "cancelled")}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-red-600 transition-colors w-full text-left"
                        >
                          <AlertCircle className="w-4 h-4" />
                          Marcar como Cancelada
                        </button>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
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

