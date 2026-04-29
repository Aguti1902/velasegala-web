import type { Metadata } from "next";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aviso Legal y Política de Privacidad | Vela-Segalà",
  description:
    "Aviso legal y política de privacidad de Clínica Dental Vela-Segalà, Viladecans. Información sobre responsable, finalidad del tratamiento y derechos del usuario.",
  robots: { index: false, follow: false },
};

export default function AvisoLegalPage() {
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
            Aviso Legal y Política de Privacidad
          </h1>
          <p className="text-slate-500 text-sm">
            Última actualización: febrero de 2026
          </p>
        </div>

        {/* ─────────────────────────────────────
            AVISO LEGAL
        ───────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-gray-200">
            AVISO LEGAL
          </h2>

          {/* 1. Datos identificativos */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-4">
              1. DATOS IDENTIFICATIVOS
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio,
              de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), el PROPIETARIO DE LA
              WEB le informa de lo siguiente:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 space-y-3 text-sm text-slate-700">
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Denominación social:</span>
                <span>{CLINIC_INFO.legalName}</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Nombre comercial:</span>
                <span>{CLINIC_INFO.name}</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Domicilio social:</span>
                <span>
                  {CLINIC_INFO.address.street}, {CLINIC_INFO.address.postalCode}{" "}
                  {CLINIC_INFO.address.city}, {CLINIC_INFO.address.region}
                </span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Teléfono:</span>
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Email:</span>
                <span>{CLINIC_INFO.email}</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Autorización sanitaria:</span>
                <span>Clínica dental autorizada por el Departament de Salut de la Generalitat de Catalunya</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Doctores colegiados:</span>
                <div className="space-y-1">
                  <p>Dr. Xavier Vela</p>
                  <p>Dra. Maribel Segalà</p>
                </div>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2">
                <span className="font-semibold">Delegado de Protección de Datos:</span>
                <a
                  href="mailto:delegadopd.sanitarios@urbaser.com"
                  className="text-black underline hover:text-slate-600"
                >
                  delegadopd.sanitarios@urbaser.com
                </a>
              </div>
            </div>
          </div>

          {/* 2. Uso del portal */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">2. USO DEL PORTAL</h3>
            <p className="text-slate-600 leading-relaxed">
              El sitio web y sus servicios son de acceso libre y gratuito; no obstante, para poder cumplir con las
              finalidades de algunos de los servicios ofrecidos por {CLINIC_INFO.legalName}, el usuario debe
              cumplimentar previamente el correspondiente formulario. Por tanto, si no se facilitan los datos necesarios
              o no lo hace correctamente no podrán atenderse las solicitudes, sin perjuicio de que podrá visualizar
              libremente el contenido de la web.
            </p>
          </div>

          {/* 3. Usuarios */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">3. USUARIOS</h3>
            <p className="text-slate-600 leading-relaxed mb-3">
              El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o
              uso, las Condiciones Generales de Uso aquí reflejadas. El Usuario:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm pl-2">
              <li>
                Garantiza que ha informado a los terceros de los que facilite sus datos de los aspectos contenidos
                en este documento y que ha obtenido su autorización para facilitar sus datos a {CLINIC_INFO.legalName}{" "}
                para los fines señalados.
              </li>
              <li>
                Será responsable de las informaciones falsas o inexactas que proporcione a través del Sitio Web y de
                los daños y perjuicios, directos o indirectos, que ello cause a {CLINIC_INFO.legalName} o a terceros.
              </li>
            </ul>
          </div>

          {/* 4. Propiedad intelectual */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">4. PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
            <p className="text-slate-600 leading-relaxed">
              {CLINIC_INFO.legalName}, por sí o como cesionaria, es titular de todos los derechos de propiedad
              intelectual e industrial de su página web, así como de los elementos contenidos en la misma (imágenes,
              sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y
              diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso
              y uso, etc.). Todos los derechos reservados. Queda expresamente prohibida la reproducción, la distribución
              y la comunicación pública de la totalidad o parte de los contenidos de esta página web con fines
              comerciales, sin la autorización previa y por escrito de {CLINIC_INFO.legalName}.
            </p>
          </div>

          {/* 5. Exclusión de garantías */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">5. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</h3>
            <p className="text-slate-600 leading-relaxed">
              {CLINIC_INFO.legalName} no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier
              naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de
              disponibilidad del portal o la transmisión de virus o programas maliciosos en los contenidos, a pesar de
              haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </div>

          {/* 6. Modificaciones */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">6. MODIFICACIONES</h3>
            <p className="text-slate-600 leading-relaxed">
              {CLINIC_INFO.legalName} se reserva el derecho de efectuar sin previo aviso las modificaciones que
              considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios
              que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados
              en su portal.
            </p>
          </div>

          {/* 7. Enlaces */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">7. ENLACES</h3>
            <p className="text-slate-600 leading-relaxed">
              En el caso de que en el portal se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet,
              {CLINIC_INFO.legalName} no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún
              caso asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web
              ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, veracidad, validez y
              constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u
              otros sitios de Internet.
            </p>
          </div>

          {/* 8. Legislación aplicable */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-3">8. LEGISLACIÓN APLICABLE</h3>
            <p className="text-slate-600 leading-relaxed">
              La relación entre {CLINIC_INFO.legalName} y el USUARIO se regirá por la normativa española vigente y
              cualquier controversia se someterá a los Juzgados y Tribunales de la ciudad de Barcelona, salvo que la
              Ley prevea otro fuero de obligado cumplimiento.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────
            POLÍTICA DE PRIVACIDAD
        ───────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-gray-200">
            POLÍTICA DE PRIVACIDAD
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
            de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento
            de datos personales y a la libre circulación de estos datos (RGPD), así como en la Ley Orgánica 3/2018
            de 5 de diciembre, de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD),{" "}
            {CLINIC_INFO.legalName} le informa de lo siguiente:
          </p>

          <div className="space-y-8">
            {/* Responsable */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿Quién es el responsable del tratamiento de sus datos?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                El responsable del tratamiento es <strong>{CLINIC_INFO.legalName}</strong>, cuyos datos
                identificativos se encuentran en el punto 1 del Aviso Legal.
              </p>
            </div>

            {/* Finalidad */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿Con qué finalidad tratamos sus datos personales?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {CLINIC_INFO.legalName} tratará la información que facilite el usuario a través del sitio web con
                el fin de gestionar la prestación de los servicios solicitados, dar respuesta a las consultas
                realizadas y la gestión de citas, así como la gestión administrativa derivada de los mismos.
              </p>
            </div>

            {/* Conservación */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿Durante cuánto tiempo se conservarán sus datos?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Los datos personales se conservarán mientras el usuario no solicite la supresión de los mismos y,
                en todo caso, durante los años necesarios para cumplir las obligaciones legales que establezca la
                normativa vigente, o para hacer frente a las posibles responsabilidades que pudiesen surgir.
              </p>
            </div>

            {/* Legitimación */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿Cuál es la legitimación para el tratamiento de sus datos?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                La legitimación de {CLINIC_INFO.legalName} para llevar a cabo el tratamiento de los datos de los
                usuarios se basa en el consentimiento del interesado.
              </p>
            </div>

            {/* Destinatarios */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿A qué destinatarios se comunicarán sus datos?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Con carácter general los datos no serán cedidos a terceros, salvo que lo establezca la legislación
                vigente.
              </p>
            </div>

            {/* Derechos */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿Cuáles son los derechos del usuario?
              </h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                El usuario tiene derecho a obtener confirmación sobre si {CLINIC_INFO.legalName} está tratando
                datos personales que le conciernan o no. Asimismo tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm pl-2">
                <li>Acceder a sus datos personales.</li>
                <li>Solicitar la rectificación de los datos inexactos.</li>
                <li>Solicitar la supresión cuando los datos ya no sean necesarios para los fines que motivaron su recogida.</li>
                <li>Solicitar la limitación del tratamiento de sus datos personales.</li>
                <li>Oponerse al tratamiento de sus datos.</li>
                <li>Retirar el consentimiento previamente otorgado en cualquier momento.</li>
                <li>Presentar una reclamación ante la Autoridad de Control (AEPD: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">www.aepd.es</a>).</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-3">
                Podrá ejercitar materialmente sus derechos aportando copia de su DNI o documento oficial que le
                identifique, mediante el envío de un mail a{" "}
                <a href={`mailto:${CLINIC_INFO.email}`} className="text-black underline hover:text-slate-600">
                  {CLINIC_INFO.email}
                </a>{" "}
                o por correo postal dirigiéndose a {CLINIC_INFO.legalName},{" "}
                {CLINIC_INFO.address.street}, {CLINIC_INFO.address.postalCode}{" "}
                {CLINIC_INFO.address.city}.
              </p>
            </div>

            {/* Seguridad */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3">
                ¿Qué medidas de seguridad implantamos para proteger sus datos?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {CLINIC_INFO.legalName} tratará los datos del usuario en todo momento de forma absolutamente
                confidencial y guardando el preceptivo deber de secreto respecto de los mismos, de conformidad
                con lo previsto en la normativa de aplicación, adoptando al efecto las medidas de índole técnica
                y organizativas necesarias que garanticen la seguridad de sus datos y eviten su alteración,
                pérdida, tratamiento o acceso no autorizado.
              </p>
            </div>
          </div>
        </section>

        {/* Enlace a política de cookies */}
        <div className="bg-gray-50 rounded-xl p-6 text-sm text-slate-600">
          <p>
            Para información sobre el uso de cookies en este sitio web, consulte nuestra{" "}
            <Link href="/politica-cookies" className="text-black font-semibold underline hover:text-slate-700">
              Política de Cookies
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
