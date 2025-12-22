"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, User, MessageSquare, Phone } from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TREATMENT_INFO: { [key: string]: string } = {
  "implantes dentales": `🦷 Implantes dentales en Vela Segalà:

💰 Precio: 1.600€ (implante + corona)
⏱️ Duración: 3-4 meses
⭐ Implantes inmediatos: NUNCA SALES SIN DIENTES
🦷 Sacamos el diente, colocamos el implante y ponemos un provisional
🔍 Escáner intraoral, cirugía guiada
🛡️ Garantía de por vida
💳 Financiación a 2 años sin intereses

Los implantes son la mejor solución para reemplazar dientes perdidos. ¿Te gustaría pedir cita?`,

  "ortodoncia invisible": `😊 Ortodoncia invisible en Vela Segalà:

✨ Sistema de alineadores transparentes (Invisalign y Spark)
👀 Nadie notará que los llevas
👨‍⚕️ Ortodoncistas certificados
📈 Resultados desde el primer mes
⏱️ Para niños y adultos
🔍 Estudio digital completo
💳 Financiación a 2 años sin intereses

Perfecta para todas las edades. ¿Quieres más información?`,

  "estética dental": `✨ Estética dental en Vela Segalà:

🦷 Carilla dental: 650€ (1-2 meses)
👑 Corona BOPT: 750€ (1-2 meses)
🎨 Diseño de sonrisa digital (DSD)
🔧 Reconstrucciones estéticas
⭐ Resultados naturales y duraderos
💳 Financiación a 2 años sin intereses

Transforma tu sonrisa con nuestros especialistas. ¿Te interesa algún tratamiento específico?`,

  "blanqueamiento dental": `💎 Blanqueamiento dental Zoom en Vela Segalà:

💰 Precio: 420€
✨ Tratamiento en clínica + domicilio
🦷 Férulas de blanqueamiento personalizadas
💊 Geles de blanqueamiento incluidos
⏱️ Dos sesiones
✅ Seguro y efectivo
💳 Financiación a 2 años sin intereses

¿Quieres conseguir una sonrisa más blanca?`,

  "higiene dental": `🦷 Higiene dental en Vela Segalà:

💰 Precio: 60€
⏱️ Duración: 45 minutos
✨ Limpieza profesional completa
🦷 Eliminación de placa y sarro
⭐ Prevención de caries y enfermedades

Mantén tu boca sana. ¿Quieres pedir cita?`,

  "primera visita": `📋 Primera visita en Vela Segalà:

💰 Precio: 45€
⏱️ Duración: 30-45 minutos
📸 Incluye:
  • Ortopantomografía
  • Radiografías dentales
  • Escáner si es necesario
  • Fotos clínicas
🔍 Diagnóstico completo

Te haremos un estudio completo de tu salud bucodental. ¿Quieres pedir cita?`,

  "periodoncia": `🦷 Periodoncia en Vela Segalà:

💰 Raspado arcada: 170€
⏱️ Duración: 1 hora
✨ Tratamiento de encías especializado
🦷 Eliminación de placa y sarro subgingival
⭐ Prevención de pérdida dental

Salva tus dientes con tratamiento periodontal. ¿Quieres más información?`,

  "empaste": `🦷 Empastes en Vela Segalà:

💰 Precio: 65-90€
⏱️ Duración: 45 minutos - 1 hora
✨ Empastes estéticos de composite
🦷 Restauración de dientes con caries
⭐ Materiales de primera calidad

Tratamiento rápido y efectivo. ¿Quieres pedir cita?`,

  "odontopediatria": `👶 Odontopediatría en Vela Segalà:

👨‍⚕️ Especialista en niños
🏥 Quirófano de niños en Hospital 3 Torres
🦷 Tratamientos adaptados a niños
⭐ Ambiente amigable y seguro
💉 Sedación cuando es necesario

Cuidado dental especializado para los más pequeños. ¿Quieres más información?`,

  "sedacion": `😌 Sedación semiconsciente en Vela Segalà:

💉 Técnica contra el miedo dental
✨ Para adultos con ansiedad dental
😴 Sedación suave y segura
🦷 Tratamientos sin estrés ni dolor
⭐ Supervisión médica constante

Supera tu miedo al dentista. ¿Quieres más información?`,

  "tecnologia": `🔬 Tecnología avanzada en Vela Segalà:

📐 Escáner intraoral 3D
🖨️ Impresora digital
🎯 Cirugía guiada por ordenador
🔬 Microscopio dental
📸 Fotografía clínica digital

Tecnología de última generación para tratamientos precisos.`,

  "precio": `💰 Precios en Vela Segalà:

🦷 Implante + corona: 1.600€ (3-4 meses)
🦷 Carilla dental: 650€ (1-2 meses)
👑 Corona BOPT: 750€ (1-2 meses)
🦷 Higiene dental: 60€ (45 min)
📋 Primera visita: 45€ (30-45 min)
🦷 Raspado arcada: 170€ (1 hora)
🦷 Empastes: 65-90€ (45 min - 1 hora)
💎 Blanqueamiento Zoom: 420€ (2 sesiones)

💳 Financiación a 2 años sin intereses

Todos los precios incluyen materiales de primera calidad. ¿Quieres pedir cita?`,

  "cita": `📅 Para pedir cita en Vela Segalà:

📞 Teléfono: 93 658 84 06
📧 Email: info@clinicadentalviladecans.com
📍 Dirección: Carrer de Sant Joan, 10, Viladecans

También puedes pedir cita online haciendo clic en el botón "Pedir Cita" de la web.

⭐ Calidad y servicio de excelencia con diagnóstico completo.`,

  "horario": `🕐 Horario de Vela Segalà:

🕐 Lunes a Viernes: 9:00 - 20:00
🕐 Sábados y Domingos: Cerrado

Para urgencias dentales, llámanos al 93 658 84 06.`,
};

const QUICK_QUESTIONS = [
  "¿Cuánto cuestan los implantes?",
  "Quiero ortodoncia invisible",
  "¿Cuánto cuesta la primera visita?",
  "Pedir cita",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! 👋 Soy el asistente virtual de Vela Segalà. ¿En qué puedo ayudarte hoy? Puedo informarte sobre tratamientos, precios, horarios y citas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleWhatsAppClick = () => {
    const phoneNumber = CLINIC_INFO.whatsappPhone.replace(/\s/g, ""); // Eliminar espacios
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
    setIsMenuOpen(false);
  };

  const handleChatClick = () => {
    setIsOpen(true);
    setIsMenuOpen(false);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Detectar keywords
    if (lowerMessage.includes("implante")) {
      return TREATMENT_INFO["implantes dentales"];
    } else if (lowerMessage.includes("ortodoncia") || lowerMessage.includes("invisalign") || lowerMessage.includes("spark")) {
      return TREATMENT_INFO["ortodoncia invisible"];
    } else if (lowerMessage.includes("estética") || lowerMessage.includes("estetica") || lowerMessage.includes("carilla") || lowerMessage.includes("corona bopt")) {
      return TREATMENT_INFO["estética dental"];
    } else if (lowerMessage.includes("blanqueamiento") || lowerMessage.includes("blanqueamiento zoom")) {
      return TREATMENT_INFO["blanqueamiento dental"];
    } else if (lowerMessage.includes("higiene") || lowerMessage.includes("limpieza dental")) {
      return TREATMENT_INFO["higiene dental"];
    } else if (lowerMessage.includes("primera visita") || lowerMessage.includes("primera consulta")) {
      return TREATMENT_INFO["primera visita"];
    } else if (lowerMessage.includes("periodoncia") || lowerMessage.includes("raspado") || lowerMessage.includes("encía") || lowerMessage.includes("encia")) {
      return TREATMENT_INFO["periodoncia"];
    } else if (lowerMessage.includes("empaste") || lowerMessage.includes("obturación") || lowerMessage.includes("obturacion")) {
      return TREATMENT_INFO["empaste"];
    } else if (lowerMessage.includes("odontopediatría") || lowerMessage.includes("odontopediatria") || lowerMessage.includes("niños") || lowerMessage.includes("niños") || lowerMessage.includes("infantil")) {
      return TREATMENT_INFO["odontopediatria"];
    } else if (lowerMessage.includes("sedación") || lowerMessage.includes("sedacion") || lowerMessage.includes("miedo") || lowerMessage.includes("ansiedad")) {
      return TREATMENT_INFO["sedacion"];
    } else if (lowerMessage.includes("tecnología") || lowerMessage.includes("tecnologia") || lowerMessage.includes("escáner") || lowerMessage.includes("escaner") || lowerMessage.includes("microscopio")) {
      return TREATMENT_INFO["tecnologia"];
    } else if (lowerMessage.includes("precio") || lowerMessage.includes("cuánto") || lowerMessage.includes("cuanto") || lowerMessage.includes("cuesta") || lowerMessage.includes("coste")) {
      return TREATMENT_INFO["precio"];
    } else if (lowerMessage.includes("cita") || lowerMessage.includes("contacto") || lowerMessage.includes("teléfono") || lowerMessage.includes("telefono")) {
      return TREATMENT_INFO["cita"];
    } else if (lowerMessage.includes("horario") || lowerMessage.includes("hora")) {
      return TREATMENT_INFO["horario"];
    } else if (lowerMessage.includes("financiación") || lowerMessage.includes("financiacion") || lowerMessage.includes("pago")) {
      return "💳 Financiación en Vela Segalà:\n\n✅ Financiación a 2 años sin intereses\n💰 Para todos los tratamientos\n📋 Consulta las condiciones en tu primera visita\n\n¿Quieres más información sobre algún tratamiento específico?";
    } else if (lowerMessage.includes("hola") || lowerMessage.includes("buenos") || lowerMessage.includes("buenas")) {
      return "¡Hola! 👋 ¿En qué tratamiento dental estás interesado? Puedo ayudarte con información sobre:\n\n🦷 Implantes dentales\n😊 Ortodoncia invisible\n✨ Estética dental\n💎 Blanqueamiento\n🦷 Higiene dental\n📋 Primera visita\n💰 Precios y financiación";
    }

    return `Gracias por tu consulta. Para información más específica, te recomiendo:

📞 Llamarnos: 93 658 84 06
📧 Email: info@clinicadentalviladecans.com
💬 O pedir tu cita

¿Hay algo más sobre nuestros tratamientos en Vela Segalà que quieras saber?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(() => {
      const botResponse: Message = {
        role: "assistant",
        content: getBotResponse(input),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Botón flotante principal - Desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 hidden sm:flex items-center justify-center bg-black text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border border-white ${
          isOpen ? "scale-0" : "scale-100"
        } px-6 py-4 rounded-full gap-3`}
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-bold">¿Necesitas ayuda?</span>
      </button>

      {/* Menú desplegable móvil */}
      <div ref={menuRef} className="fixed bottom-6 right-6 z-50 sm:hidden">
        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2 animate-slide-up">
            <button
              onClick={handleChatClick}
              className="flex items-center gap-3 bg-white text-black shadow-2xl px-4 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-200 min-w-[160px]"
              aria-label="Abrir chat"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium text-sm">Chat</span>
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-[#25D366] text-white shadow-2xl px-4 py-3 rounded-full hover:bg-[#20BA5A] transition-all duration-200 min-w-[160px]"
              aria-label="Abrir WhatsApp"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium text-sm">WhatsApp</span>
            </button>
          </div>
        )}

        {/* Botón principal móvil */}
        <button
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              setIsMenuOpen(!isMenuOpen);
            }
          }}
          className={`w-14 h-14 flex items-center justify-center bg-black text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border border-white rounded-full ${
            isOpen ? "scale-0" : "scale-100"
          }`}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú de contacto"}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-5rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-900 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5">
                <Image
                  src="/images/Logos/Isotipo.png"
                  alt="Clínica Dental Viladecans"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-lg">Asistente Virtual</div>
                <div className="text-xs text-gray-300">Vela Segalà</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 p-1.5">
                    <Image
                      src="/images/Logos/Isotipo blanco.png"
                      alt="Asistente"
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-black text-white rounded-br-sm"
                      : "bg-white text-slate-800 shadow-sm border border-gray-100 rounded-bl-sm"
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 p-1.5">
                  <Image
                    src="/images/Logos/Isotipo blanco.png"
                    alt="Asistente"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preguntas rápidas */}
          {messages.length === 1 && (
            <div className="px-6 py-3 bg-white border-t border-gray-100">
              <div className="text-xs text-slate-600 mb-2 font-medium">Preguntas frecuentes:</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-slate-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

