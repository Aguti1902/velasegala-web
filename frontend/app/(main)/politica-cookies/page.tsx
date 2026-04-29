import type { Metadata } from "next";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Cookies | Clínica Dental Vela-Segalà",
  description:
    "Política de cookies de Clínica Dental Vela-Segalà, Viladecans. Tipos de cookies, finalidad, duración y cómo configurar o desactivar su uso.",
  robots: { index: false, follow: false },
};

const cookieData = [
  {
    nombre: "cookie-consent",
    tipo: "Técnica",
    titularidad: "Propia",
    temporalidad: "1 año",
    finalidad:
      "Almacena la decisión del usuario sobre la aceptación o rechazo de cookies para no volver a mostrar el aviso.",
  },
  {
    nombre: "_ga",
    tipo: "Analítica",
    titularidad: "Ajena — Google LLC",
    temporalidad: "2 años",
    finalidad:
      "Cookie principal de Google Analytics. Registra un identificador único que permite distinguir usuarios y generar estadísticas de uso del sitio.",
  },
  {
    nombre: "_ga_[ID]",
    tipo: "Analítica",
    titularidad: "Ajena — Google LLC",
    temporalidad: "2 años",
    finalidad:
      "Utilizada por Google Analytics 4 para mantener el estado de la sesión y los parámetros de configuración de la propiedad.",
  },
  {
    nombre: "_gid",
    tipo: "Analítica",
    titularidad: "Ajena — Google LLC",
    temporalidad: "24 horas",
    finalidad:
      "Registra un identificador único para generar datos estadísticos sobre cómo usa el visitante el sitio web durante la sesión.",
  },
  {
    nombre: "_gtm_*",
    tipo: "Analítica",
    titularidad: "Ajena — Google LLC",
    temporalidad: "Sesión / persistente",
    finalidad:
      "Google Tag Manager. Gestiona la carga de etiquetas y scripts de seguimiento, incluyendo Google Analytics.",
  },
];

export default function PoliticaCookiesPage() {
  return (
    <main className="section-padding bg-white">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Cabecera */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-black transition-colors mb-4 inline-block"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-black mb-4">
            Política de Cookies
          </h1>
          <p className="text-slate-500 text-sm">
            Última actualización: febrero de 2026
          </p>
        </div>

        {/* ¿Qué es una cookie? */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-4">¿Qué es una cookie?</h2>
          <p className="text-slate-600 leading-relaxed">
            Las cookies son pequeños archivos de texto que se ubican en el directorio de su navegador y que pueden
            ser colocadas en su dispositivo cuando visita un sitio web. Cuando accede a una página, la cookie
            envía información a quien la instaló. Las cookies son utilizadas en numerosos sitios web y sirven
            para finalidades muy diversas: reconocerte como usuario, obtener información sobre tus hábitos de
            navegación o personalizar la forma en que se muestra el contenido.
          </p>
        </section>

        {/* ¿Para qué se utilizan? */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-4">¿Para qué se utilizan las cookies en este sitio web?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            En <strong>{CLINIC_INFO.name}</strong> utilizamos cookies con las siguientes finalidades:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-black mb-2">🔒 Cookies técnicas / esenciales</h3>
              <p className="text-sm text-slate-600">
                Necesarias para el funcionamiento básico del sitio web. Permiten al usuario navegar y utilizar
                las funciones esenciales como guardar sus preferencias de cookies. Sin estas cookies el sitio
                no puede funcionar correctamente.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-black mb-2">📊 Cookies analíticas</h3>
              <p className="text-sm text-slate-600">
                Permiten conocer el comportamiento de los usuarios en el sitio (páginas visitadas, tiempo de
                permanencia, origen del tráfico…). Usamos esta información para mejorar el sitio web y la
                experiencia del usuario. Son gestionadas por Google Analytics y Google Tag Manager.
              </p>
            </div>
          </div>
        </section>

        {/* Tabla de cookies */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-4">Identificación de las cookies utilizadas</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            A continuación se detallan todas las cookies que este sitio web puede instalar en su dispositivo:
          </p>

          {/* Tabla — versión escritorio */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Nombre</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Titularidad</th>
                  <th className="px-4 py-3 font-semibold">Duración</th>
                  <th className="px-4 py-3 font-semibold">Finalidad</th>
                </tr>
              </thead>
              <tbody>
                {cookieData.map((cookie, i) => (
                  <tr
                    key={cookie.nombre}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-black">
                      {cookie.nombre}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{cookie.tipo}</td>
                    <td className="px-4 py-3 text-slate-600">{cookie.titularidad}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {cookie.temporalidad}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{cookie.finalidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas — versión móvil */}
          <div className="md:hidden space-y-4">
            {cookieData.map((cookie) => (
              <div key={cookie.nombre} className="border border-gray-200 rounded-xl p-4">
                <p className="font-mono text-sm font-bold text-black mb-2">{cookie.nombre}</p>
                <div className="space-y-1 text-sm text-slate-600">
                  <p><span className="font-medium text-black">Tipo:</span> {cookie.tipo}</p>
                  <p><span className="font-medium text-black">Titularidad:</span> {cookie.titularidad}</p>
                  <p><span className="font-medium text-black">Duración:</span> {cookie.temporalidad}</p>
                  <p><span className="font-medium text-black">Finalidad:</span> {cookie.finalidad}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Desactivación de cookies */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-4">Desactivación de cookies</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración
            de las opciones del navegador. A continuación le indicamos cómo hacerlo en los navegadores más comunes:
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <strong className="text-black">Google Chrome:</strong>{" "}
              Configuración → Mostrar opciones avanzadas → Privacidad → Configuración de contenido.
            </li>
            <li>
              <strong className="text-black">Mozilla Firefox:</strong>{" "}
              Herramientas → Opciones → Privacidad → Historial → Configuración Personalizada.
            </li>
            <li>
              <strong className="text-black">Safari:</strong>{" "}
              Preferencias → Seguridad → Mostrar cookies.
            </li>
            <li>
              <strong className="text-black">Microsoft Edge:</strong>{" "}
              Configuración → Privacidad, búsqueda y servicios → Cookies.
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-4">
            Tenga en cuenta que si desactiva las cookies técnicas, es posible que algunas funciones del sitio
            web dejen de funcionar correctamente.
          </p>
        </section>

        {/* Aceptación y retirada del consentimiento */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-black mb-4">Aceptación y retirada del consentimiento</h2>
          <p className="text-slate-600 leading-relaxed">
            Al acceder a este sitio web por primera vez, se muestra un aviso de cookies donde puede aceptar o
            rechazar las cookies no esenciales. Puede retirar su consentimiento en cualquier momento borrando
            las cookies de su navegador o utilizando las opciones de configuración indicadas más arriba.
          </p>
        </section>

        {/* Más información */}
        <div className="bg-gray-50 rounded-xl p-6 text-sm text-slate-600 space-y-2">
          <p>
            Para más información sobre el tratamiento de sus datos personales, consulte nuestro{" "}
            <Link href="/aviso-legal" className="text-black font-semibold underline hover:text-slate-700">
              Aviso Legal y Política de Privacidad
            </Link>
            .
          </p>
          <p>
            Puede contactar con nuestro Delegado de Protección de Datos en:{" "}
            <a
              href="mailto:delegadopd.sanitarios@urbaser.com"
              className="text-black underline hover:text-slate-600"
            >
              delegadopd.sanitarios@urbaser.com
            </a>
          </p>
          <p>
            Información adicional sobre cookies en la web de la Agencia Española de Protección de Datos:{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-slate-600"
            >
              www.aepd.es
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
