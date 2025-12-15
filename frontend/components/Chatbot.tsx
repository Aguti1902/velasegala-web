"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TREATMENT_INFO: { [key: string]: string } = {
  "implantes dentales": `🦷 Implantes dentales en Vela Segalà:

💰 Precio: desde 800€ (implante + corona)
⏱️ Duración: 3-6 meses (proceso completo)
⭐ Marcas premium: Straumann y Nobel Biocare
🛡️ Garantía de por vida
🔍 Diagnóstico 3D completo
💳 Financiación sin intereses hasta 12 meses

Los implantes son la mejor solución para reemplazar dientes perdidos. ¿Te gustaría pedir cita?`,

  "ortodoncia invisible": `😊 Ortodoncia invisible (Invisalign) en Vela Segalà:

✨ Sistema de alineadores transparentes y removibles
👀 Nadie notará que los llevas
👨‍⚕️ Ortodoncistas certificados Invisalign
📈 Resultados desde el primer mes
⏱️ Duración: 12-18 meses (promedio)
🔍 Estudio digital completo

Perfecta para adultos y adolescentes. ¿Quieres más información?`,

  "estética dental": `✨ Estética dental en Vela Segalà:

🦷 Carillas de porcelana
💎 Blanqueamiento dental profesional
🎨 Diseño de sonrisa digital (DSD)
🔧 Reconstrucciones estéticas
⭐ Resultados naturales y duraderos
⭐ Calidad y servicio de excelencia

Transforma tu sonrisa con nuestros especialistas. ¿Te interesa algún tratamiento específico?`,

  "blanqueamiento dental": `💎 Blanqueamiento dental profesional en Vela Segalà:

💡 Blanqueamiento en clínica con LED
⚡ Resultados inmediatos (1 sesión)
✅ Seguro y efectivo
🎨 Elimina manchas y aclara varios tonos
🏠 También blanqueamiento ambulatorio
💰 Desde 199€

¿Quieres conseguir una sonrisa más blanca?`,

  "precio": `💰 Precios en Vela Segalà:

🦷 Implantes dentales: desde 800€
😊 Ortodoncia invisible: consultar presupuesto
💎 Blanqueamiento: desde 199€
⭐ Calidad y servicio de excelencia
💳 Financiación sin intereses disponible

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
  "¿Tenéis blanqueamiento dental?",
  "Pedir cita",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! 👋 Soy el asistente virtual de Vela Segalà. ¿En qué puedo ayudarte hoy? Puedo informarte sobre tratamientos, precios, horarios y citas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Detectar keywords
    if (lowerMessage.includes("implante")) {
      return TREATMENT_INFO["implantes dentales"];
    } else if (lowerMessage.includes("ortodoncia") || lowerMessage.includes("invisalign")) {
      return TREATMENT_INFO["ortodoncia invisible"];
    } else if (lowerMessage.includes("estética") || lowerMessage.includes("estetica") || lowerMessage.includes("carilla")) {
      return TREATMENT_INFO["estética dental"];
    } else if (lowerMessage.includes("blanqueamiento")) {
      return TREATMENT_INFO["blanqueamiento dental"];
    } else if (lowerMessage.includes("precio") || lowerMessage.includes("cuánto") || lowerMessage.includes("cuanto") || lowerMessage.includes("cuesta")) {
      return TREATMENT_INFO["precio"];
    } else if (lowerMessage.includes("cita") || lowerMessage.includes("contacto") || lowerMessage.includes("teléfono") || lowerMessage.includes("telefono")) {
      return TREATMENT_INFO["cita"];
    } else if (lowerMessage.includes("horario") || lowerMessage.includes("hora")) {
      return TREATMENT_INFO["horario"];
    } else if (lowerMessage.includes("hola") || lowerMessage.includes("buenos") || lowerMessage.includes("buenas")) {
      return "¡Hola! 👋 ¿En qué tratamiento dental estás interesado? Puedo ayudarte con información sobre:\n\n🦷 Implantes dentales\n😊 Ortodoncia invisible\n✨ Estética dental\n💎 Blanqueamiento\n💰 Precios y citas";
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
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center bg-black text-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border border-white ${
          isOpen ? "scale-0" : "scale-100"
        } ${
          // En móvil: completamente redondo, solo icono
          // En desktop: redondeado con texto
          "w-14 h-14 sm:w-auto sm:h-auto sm:px-6 sm:py-4 rounded-full sm:gap-3"
        }`}
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-bold hidden sm:block">¿Necesitas ayuda?</span>
      </button>

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

