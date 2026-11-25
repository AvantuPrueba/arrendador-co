'use client';

import { CONSENT_OPEN_EVENT } from '@/lib/consent';

/**
 * Enlace permanente del footer para volver a abrir el panel de preferencias.
 * Es un Client Component pequeño: el Footer se mantiene como Server Component.
 */
export default function ConsentPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-bronze"
    >
      Preferencias de privacidad
    </button>
  );
}
