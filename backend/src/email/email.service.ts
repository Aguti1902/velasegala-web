import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend | null = null;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    console.log('🔧 Inicializando EmailService...');
    console.log(`   RESEND_API_KEY presente: ${apiKey ? 'SÍ (longitud: ' + apiKey.length + ')' : 'NO'}`);
    
    if (!apiKey) {
      console.error('❌ RESEND_API_KEY no configurada. Los emails NO se enviarán.');
      console.error('   ⚠️ IMPORTANTE: Añade la variable RESEND_API_KEY en Railway para que funcione el envío de emails.');
      this.resend = null;
    } else {
      try {
        this.resend = new Resend(apiKey);
        console.log('✅ Resend inicializado correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar Resend:', error);
        this.resend = null;
      }
    }
    
    // Email del remitente (debe ser un dominio verificado en Resend o usar su dominio de prueba)
    this.fromEmail = this.configService.get<string>('EMAIL_FROM') || 'onboarding@resend.dev';
    console.log(`📧 Email del remitente: ${this.fromEmail}`);
    console.log(`📧 Email destino (APPOINTMENT_EMAIL): ${this.configService.get<string>('APPOINTMENT_EMAIL') || 'segala@velasegala.com (por defecto)'}`);
  }

  async sendAppointmentEmail(appointmentData: {
    name: string;
    email: string;
    phone: string;
    preferredDate?: string;
    preferredTime?: string;
    treatment?: string;
    message?: string;
  }): Promise<void> {
    console.log('📬 sendAppointmentEmail llamado con datos:', {
      name: appointmentData.name,
      email: appointmentData.email,
      phone: appointmentData.phone,
    });
    
    const primaryEmail = this.configService.get<string>('APPOINTMENT_EMAIL') || 'segala@velasegala.com';
    const secondaryEmail = this.configService.get<string>('SECONDARY_EMAIL') || 'agutierezgomez00@gmail.com';
    const recipientEmails = [primaryEmail, secondaryEmail];
    
    console.log(`📮 Emails destino: ${recipientEmails.join(', ')}`);
    
    if (!this.resend) {
      console.error('❌ Resend no configurado. Email no enviado.');
      console.error('   Verifica que RESEND_API_KEY esté configurada en Railway.');
      return;
    }
    
    console.log('✅ Resend está configurado, procediendo a enviar email...');

    // Formatear la fecha si existe
    let formattedDate = 'No especificada';
    if (appointmentData.preferredDate) {
      const date = new Date(appointmentData.preferredDate);
      formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #000;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
          }
          .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .field-label {
            font-weight: bold;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .field-value {
            font-size: 16px;
            color: #000;
          }
          .message-box {
            background-color: #fff;
            padding: 15px;
            border-left: 4px solid #000;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Nueva Solicitud de Cita</h1>
          <p style="margin: 0;">Clínica Dental Vela-Segalà</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Nombre completo</div>
            <div class="field-value">${appointmentData.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">${appointmentData.email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Teléfono</div>
            <div class="field-value">${appointmentData.phone}</div>
          </div>
          
          ${appointmentData.treatment ? `
          <div class="field">
            <div class="field-label">Tratamiento de interés</div>
            <div class="field-value">${appointmentData.treatment}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Fecha preferida</div>
            <div class="field-value">${formattedDate}</div>
          </div>
          
          ${appointmentData.preferredTime ? `
          <div class="field">
            <div class="field-label">Horario preferido</div>
            <div class="field-value">${appointmentData.preferredTime}</div>
          </div>
          ` : ''}
          
          ${appointmentData.message ? `
          <div class="field">
            <div class="field-label">Mensaje adicional</div>
            <div class="message-box">${appointmentData.message.replace(/\n/g, '<br>')}</div>
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p>Este correo fue generado automáticamente desde el formulario de pedir cita de la página web.</p>
          <p>Por favor, contacta con el cliente lo antes posible para confirmar la cita.</p>
        </div>
      </body>
      </html>
    `;

    const emailText = `
Nueva Solicitud de Cita - Clínica Dental Vela-Segalà

Nombre completo: ${appointmentData.name}
Email: ${appointmentData.email}
Teléfono: ${appointmentData.phone}
${appointmentData.treatment ? `Tratamiento de interés: ${appointmentData.treatment}` : ''}
Fecha preferida: ${formattedDate}
${appointmentData.preferredTime ? `Horario preferido: ${appointmentData.preferredTime}` : ''}
${appointmentData.message ? `\nMensaje adicional:\n${appointmentData.message}` : ''}

---
Este correo fue generado automáticamente desde el formulario de pedir cita de la página web.
Por favor, contacta con el cliente lo antes posible para confirmar la cita.
    `;

    try {
      console.log(`📤 Intentando enviar email de cita a ${recipientEmails.join(', ')} desde ${this.fromEmail}`);
      
      const result = await this.resend.emails.send({
        from: `Clínica Vela-Segalà <${this.fromEmail}>`,
        to: recipientEmails,
        subject: `Nueva Solicitud de Cita - ${appointmentData.name}`,
        text: emailText,
        html: emailHtml,
      });
      
      if (result.error) {
        console.error('❌ Resend devolvió un error:', result.error);
        throw new Error(JSON.stringify(result.error));
      }
      
      console.log(`✅ Email de cita enviado exitosamente a ${recipientEmails.join(', ')}`);
      console.log(`📧 ID del email: ${result.data?.id || 'N/A'}`);
    } catch (error: any) {
      console.error('❌ Error al enviar email de cita:');
      console.error('   Tipo de error:', error?.constructor?.name || typeof error);
      console.error('   Mensaje:', error?.message || error);
      console.error('   Detalles completos:', JSON.stringify(error, null, 2));
      
      // Si es un error de Resend, mostrar información útil
      if (error?.response) {
        console.error('   Respuesta de Resend:', JSON.stringify(error.response, null, 2));
      }
      
      // No lanzamos el error para no romper el flujo si falla el envío de email
      // Pero lo logueamos para poder debuggear
    }
  }
}
