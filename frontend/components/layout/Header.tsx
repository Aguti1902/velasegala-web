"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CLINIC_INFO, MAIN_NAV, MAIN_TREATMENTS } from "@/lib/constants";
import { Phone, Mail, Menu, X, ChevronRight, ChevronDown } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsMenuOpen, setTreatmentsMenuOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleTreatmentsMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setTreatmentsMenuOpen(true);
  };

  const handleTreatmentsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setTreatmentsMenuOpen(false);
    }, 300);
    setCloseTimeout(timeout);
  };

  return (
    <header className="fixed lg:sticky top-0 z-[60] w-full bg-white shadow-md">
      {/* Top bar con info de contacto */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden items-center gap-6 md:flex">
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>{CLINIC_INFO.email}</span>
              </a>
            </div>
            <div className="ml-auto text-xs md:text-sm font-medium">
              <span>{CLINIC_INFO.hours.display}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logos/Logo.png"
              alt="Clínica Dental Viladecans - Vela-Segalà"
              width={200}
              height={60}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {MAIN_NAV.map((item) =>
              item.name === "Tratamientos" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleTreatmentsMouseEnter}
                  onMouseLeave={handleTreatmentsMouseLeave}
                >
                  <button
                    onClick={() => setTreatmentsMenuOpen(!treatmentsMenuOpen)}
                    className={`flex items-center gap-1 text-black hover:underline font-bold transition-colors relative ${
                      isActive(item.href) ? "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-black" : ""
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${treatmentsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {treatmentsMenuOpen && (
                    <div className="absolute top-full left-0 mt-0 pt-2 w-72">
                      <div className="bg-white rounded-2xl shadow-2xl py-3 border border-gray-200">
                        {MAIN_TREATMENTS.slice(0, 8).map((treatment) => (
                          <Link
                            key={treatment.slug}
                            href={`/tratamientos/${treatment.slug}`}
                            className="block px-5 py-3 text-sm text-black hover:bg-gray-100 rounded-xl mx-2 transition-colors"
                          >
                            {treatment.name}
                          </Link>
                        ))}
                        <Link
                          href="/tratamientos"
                          className="block px-5 py-3 mt-2 text-sm text-black font-bold hover:bg-gray-100 rounded-xl mx-2 transition-colors border-t border-gray-200 pt-3"
                        >
                          Ver todos los tratamientos →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-black hover:underline font-bold transition-colors relative ${
                    isActive(item.href) ? "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-black" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/pedir-cita" className="btn-primary">
              Pedir Cita Gratuita
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {MAIN_NAV.map((item) =>
              item.name === "Tratamientos" ? (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                    className="w-full flex items-center justify-between py-3 text-slate-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${mobileTreatmentsOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {mobileTreatmentsOpen && (
                    <div className="pl-4 pb-2">
                      {MAIN_TREATMENTS.slice(0, 8).map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/tratamientos/${treatment.slug}`}
                          className="block py-2 text-sm text-slate-600 hover:text-primary-600 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {treatment.name}
                        </Link>
                      ))}
                      <Link
                        href="/tratamientos"
                        className="block py-2 text-sm text-slate-600 hover:text-primary-600 font-bold transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Ver todos los tratamientos →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-slate-700 hover:text-primary-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/pedir-cita"
              className="block mt-4 text-center btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pedir Cita
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

