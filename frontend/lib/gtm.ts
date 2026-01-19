/**
 * Utilidades para Google Tag Manager
 * Facilita el envío de eventos a GTM
 */

type GTMEvent = {
  event: string;
  [key: string]: any;
};

/**
 * Envía un evento a Google Tag Manager
 * @param event Objeto con el evento y sus propiedades
 */
export const sendGTMEvent = (event: GTMEvent) => {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push(event);
    console.log("📊 GTM Event:", event);
  } else {
    console.warn("⚠️ Google Tag Manager no está disponible");
  }
};

/**
 * Eventos predefinidos para conversiones
 */
export const GTMEvents = {
  // Conversión: Formulario de contacto
  contactFormSubmit: () => {
    sendGTMEvent({
      event: "generate_lead",
      lead_type: "contact_form",
      value: 50,
    });
  },

  // Conversión: Solicitud de cita
  appointmentRequest: (service?: string) => {
    sendGTMEvent({
      event: "generate_lead",
      lead_type: "appointment_request",
      service: service || "general",
      value: 100,
    });
  },

  // Interacción: Clic en WhatsApp
  whatsappClick: () => {
    sendGTMEvent({
      event: "whatsapp_click",
      contact_method: "whatsapp",
    });
  },

  // Interacción: Clic en teléfono
  phoneClick: () => {
    sendGTMEvent({
      event: "phone_click",
      contact_method: "phone",
    });
  },

  // Interacción: Vista de servicio
  serviceView: (serviceName: string) => {
    sendGTMEvent({
      event: "view_service",
      service_name: serviceName,
    });
  },

  // Interacción: Vista de casos de antes/después
  beforeAfterView: () => {
    sendGTMEvent({
      event: "view_before_after",
      content_type: "gallery",
    });
  },

  // Interacción: Reproducción de video
  videoPlay: (videoTitle: string) => {
    sendGTMEvent({
      event: "video_play",
      video_title: videoTitle,
    });
  },

  // Navegación: Vista de página
  pageView: (pagePath: string, pageTitle: string) => {
    sendGTMEvent({
      event: "page_view",
      page_path: pagePath,
      page_title: pageTitle,
    });
  },
};

