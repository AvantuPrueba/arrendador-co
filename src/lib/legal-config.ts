/**
 * Configuración legal global del sitio.
 *
 * Los campos marcados como [PENDIENTE: ...] deben ser completados por el
 * responsable del tratamiento con datos reales antes de publicar la política.
 * Ver PENDIENTE_LEGAL.md (documento interno, no público) para la lista
 * detallada y la norma que exige cada dato. No se inventan ni infieren datos.
 */
import { SITE_URL } from '@/lib/site-url';

export const LEGAL_CONFIG = {
  brandName: 'ArrendadorCO',
  // PENDIENTE: El responsable debe completar este campo
  // Requerido por: Ley 1581 Art. 12, Decreto 1074 Art. 2.2.2.25.3.1
  legalName: '[PENDIENTE: NOMBRE COMPLETO]',
  // PENDIENTE: El responsable debe completar este campo
  // Requerido por: Ley 1581 Art. 12, Decreto 1074 Art. 2.2.2.25.3.1
  taxId: '[PENDIENTE: CÉDULA]',
  // PENDIENTE: El responsable debe completar este campo
  // Requerido por: Ley 1581 Art. 12, Decreto 1074 Art. 2.2.2.25.3.1
  city: '[PENDIENTE: CIUDAD]',
  // PENDIENTE: El responsable debe completar este campo
  // Requerido por: Ley 1581 Art. 12, Decreto 1074 Art. 2.2.2.25.3.1
  address: '[PENDIENTE: DIRECCIÓN COMERCIAL]',
  officialEmail: 'hola@arrendador.co',
  // PENDIENTE: El responsable debe completar este campo
  // Requerido por: Ley 1581 Art. 12, Decreto 1074 Art. 2.2.2.25.3.1
  phone: '[PENDIENTE: TELÉFONO]',
  website: SITE_URL,
  jurisdiction: 'Colombia',
  lastUpdated: 'Octubre 2026',
} as const;
