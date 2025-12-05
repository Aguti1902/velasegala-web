import Link from "next/link";
import { CLINIC_INFO } from "@/lib/constants";
import { Gift, CreditCard, Clock } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pide tu Cita en Viladecans
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            <strong>Primera visita gratuita</strong> con diagnóstico completo y presupuesto sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pedir-cita"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Pedir Cita Gratuita Ahora
            </Link>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-2xl hover:bg-white hover:text-black transition-all duration-200"
            >
              Llamar: {CLINIC_INFO.phoneDisplay}
            </a>
          </div>

          {/* Beneficios */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <Gift className="w-5 h-5" />
              <span>Primera Visita Gratuita</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-5 h-5" />
              <span>Financiación Sin Intereses</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-5 h-5" />
              <span>Cita en 24-48h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

