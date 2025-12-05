import Link from "next/link";
import Image from "next/image";
import { CLINIC_INFO, MAIN_TREATMENTS } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna 1: Sobre la clínica */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/Logos/Logo blanco.png"
                alt="Clínica Dental Viladecans - Vela-Segalà"
                width={180}
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm mb-4 leading-relaxed text-gray-300">
              <strong>Clínica dental en Viladecans</strong> con más de {new Date().getFullYear() - parseInt(CLINIC_INFO.founded)} años 
              de experiencia. Tu dentista de confianza en Viladecans para implantes dentales, ortodoncia invisible, 
              estética dental y todos los tratamientos que necesitas. Primera visita gratuita.
            </p>
            <div className="flex gap-4">
              <a
                href={CLINIC_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors font-bold"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
              <a
                href={CLINIC_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors font-bold"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
          </div>

          {/* Columna 2: Tratamientos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Tratamientos</h3>
            <ul className="space-y-2">
              {MAIN_TREATMENTS.slice(0, 6).map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    href={`/tratamientos/${treatment.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {treatment.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tratamientos"
                  className="text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium"
                >
                  Ver todos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces útiles */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Enlaces Útiles
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/clinica-dental-viladecans"
                  className="text-sm hover:text-white transition-colors"
                >
                  Nuestra Clínica
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/pedir-cita"
                  className="text-sm hover:text-white transition-colors"
                >
                  Pedir Cita
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-sm hover:text-white transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidad"
                  className="text-sm hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contacto Clínica Dental Viladecans</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300">
                  <div>{CLINIC_INFO.address.street}</div>
                  <div>
                    {CLINIC_INFO.address.postalCode} {CLINIC_INFO.address.city}
                  </div>
                  <div>{CLINIC_INFO.address.region}</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="hover:underline transition-colors text-gray-300 font-medium"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:underline transition-colors text-gray-300"
                >
                  {CLINIC_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">{CLINIC_INFO.hours.display}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
          <p className="mb-2 text-gray-300">
            © {currentYear} {CLINIC_INFO.name}. Todos los derechos reservados.
          </p>
          <p className="font-bold text-white">
            Clínica Dental en Viladecans | Dentista de Confianza | Implantes Dentales | Ortodoncia Invisible | Estética Dental
          </p>
          <p className="mt-2 text-gray-400 text-xs">
            Tu clínica dental en Viladecans, Barcelona. Más de 15 años al servicio de la salud bucodental de familias en Viladecans.
          </p>
        </div>
      </div>
    </footer>
  );
}

