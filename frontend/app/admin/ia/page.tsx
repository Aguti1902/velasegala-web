"use client";

import {
  Bot,
  MessageSquare,
  Phone,
  Calendar,
  BarChart3,
  Wifi,
  WifiOff,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Wrench,
  Sparkles,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  Star,
} from "lucide-react";

// Tarjeta de módulo "próximamente"
function ComingSoonCard({
  icon: Icon,
  title,
  description,
  features,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden opacity-80">
      <div className={`h-1.5 ${color}`} />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100`}>
            <Icon className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-black">{title}</h3>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Próximamente
              </span>
            </div>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <ul className="space-y-1.5">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Tarjeta de estadística placeholder
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-black text-gray-300">—</p>
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

export default function IAPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Banner "En construcción" */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl p-8 mb-10 text-white">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-white rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black">IA Center</h1>
              <span className="flex items-center gap-1.5 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                <Wrench className="w-3 h-3" />
                En construcción
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Centro de control de Inteligencia Artificial para la gestión automatizada de
              citas, WhatsApp y llamadas de la clínica. Pronto disponible.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl px-4 py-3">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-sm font-semibold">Disponible pronto</span>
          </div>
        </div>
      </div>

      {/* Estadísticas placeholder */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-black mb-4">
          Estadísticas generales
          <span className="ml-2 text-xs font-normal text-slate-400">(datos disponibles al activar)</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={MessageSquare} label="Mensajes hoy" value="—" sub="WhatsApp" colorClass="bg-green-500" />
          <StatCard icon={PhoneCall} label="Llamadas hoy" value="—" sub="Atendidas" colorClass="bg-blue-500" />
          <StatCard icon={CalendarCheck} label="Citas creadas" value="—" sub="Este mes" colorClass="bg-purple-500" />
          <StatCard icon={Star} label="Satisfacción" value="—" sub="Media de usuarios" colorClass="bg-yellow-500" />
        </div>
      </div>

      {/* Módulos próximamente */}
      <h2 className="text-lg font-bold text-black mb-4">Módulos incluidos</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* WhatsApp */}
        <ComingSoonCard
          icon={MessageSquare}
          title="WhatsApp Business IA"
          description="Gestión automatizada de conversaciones y citas por WhatsApp."
          color="bg-green-500"
          features={[
            "Conexión y estado del número de WhatsApp",
            "Mensajes recibidos / respondidos / pendientes",
            "Tasa de respuesta del agente IA",
            "Historial de conversaciones por paciente",
            "Citas creadas automáticamente por WhatsApp",
          ]}
        />

        {/* Llamadas */}
        <ComingSoonCard
          icon={Phone}
          title="Gestión de Llamadas IA"
          description="Análisis y automatización de llamadas entrantes y salientes."
          color="bg-blue-500"
          features={[
            "Llamadas atendidas / perdidas / transferidas",
            "Duración media de llamada",
            "Horas punta de llamadas",
            "Transcripción y resumen de llamadas",
            "Recordatorios automáticos de citas",
          ]}
        />

        {/* Citas */}
        <ComingSoonCard
          icon={Calendar}
          title="Estadísticas de Citas IA"
          description="Seguimiento completo de citas gestionadas por el agente de IA."
          color="bg-purple-500"
          features={[
            "Citas creadas por el agente IA vs manual",
            "Citas reagendadas y motivo",
            "Citas canceladas y motivo",
            "Tasa de confirmación de citas",
            "Distribución por tipo de tratamiento",
          ]}
        />

        {/* Analytics IA */}
        <ComingSoonCard
          icon={BarChart3}
          title="Analytics del Agente IA"
          description="Métricas de rendimiento y eficiencia del asistente de IA."
          color="bg-orange-500"
          features={[
            "Consultas resueltas sin intervención humana",
            "Tiempo medio de resolución",
            "Satisfacción del paciente post-interacción",
            "Keywords más frecuentes en consultas",
            "ROI estimado del agente IA",
          ]}
        />
      </div>

      {/* Panel de conexiones */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-black mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-slate-400" />
          Estado de conexiones
        </h2>
        <div className="space-y-3">
          {[
            { name: "WhatsApp Business API", icon: MessageSquare, color: "text-green-500" },
            { name: "Sistema de llamadas (VoIP)", icon: Phone, color: "text-blue-500" },
            { name: "Agente IA (n8n)", icon: Bot, color: "text-purple-500" },
            { name: "Google Calendar", icon: Calendar, color: "text-orange-500" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium text-slate-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-gray-300" />
                <span className="text-xs text-gray-400 font-medium">No conectado</span>
                <button
                  disabled
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Conectar
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5" />
          Las integraciones estarán disponibles en la próxima actualización.
        </p>
      </div>
    </div>
  );
}
