# PENDIENTE_LEGAL — Datos del responsable del tratamiento

> **DOCUMENTO INTERNO — NO PUBLICAR EN RUTAS PÚBLICAS.**
> No va en `public/`. No se referencia desde ninguna página del sitio.
> La política pública `/politica-de-datos` muestra actualmente marcadores
> `[PENDIENTE: ...]`. **No está lista para publicación** hasta que el
> responsable complete los datos de abajo y se haga revisión jurídica.

Archivo relacionado: `src/lib/legal-config.ts` (fuente de los valores mostrados
en la sección "Identificación del Responsable del Tratamiento").

## Datos que solo el responsable puede proporcionar

| Campo en `LEGAL_CONFIG` | Información requerida | Para qué sirve en la política | Norma que lo exige | ¿Se infiere del repositorio? |
|---|---|---|---|---|
| `legalName` | Nombre completo o razón social del responsable del tratamiento | Identificar al responsable ante los titulares | Ley 1581 de 2012, Art. 12; Decreto 1074 de 2015, Art. 2.2.2.25.3.1 | **No.** No se inventa ni se deduce del dominio. |
| `taxId` | Cédula de ciudadanía (persona natural) o NIT (persona jurídica) | Identificación documental del responsable | Ley 1581 de 2012, Art. 12; Decreto 1074 de 2015, Art. 2.2.2.25.3.1 | **No.** Dato personal/tributario privado. |
| `city` | Ciudad de domicilio del responsable | Domicilio para notificaciones y ejercicio de derechos | Decreto 1074 de 2015, Art. 2.2.2.25.3.1 | **No.** El repo solo indica `Colombia` como jurisdicción; no la ciudad. |
| `address` | Dirección comercial completa para notificaciones | Habeas data: lugar físico de recepción de peticiones | Ley 1581 de 2012, Art. 12; Decreto 1074 de 2015, Art. 2.2.2.25.3.1 | **No.** |
| `phone` | Teléfono de contacto del responsable | Canal alterno para ejercer derechos y ser contactado | Ley 1581 de 2012, Art. 12; Decreto 1074 de 2015, Art. 2.2.2.25.3.1 | **No.** |

## Datos ya configurados (solo requieren confirmación)

| Campo | Valor actual | Origen | Acción pendiente |
|---|---|---|---|
| `officialEmail` | `hola@arrendador.co` | Ya usado en el footer, el blog y `NewsletterCTA.tsx` | Confirmar que la activación de FormSubmit en `hola@arrendador.co` ya fue completada. **No** usar `spaceyisusshop@gmail.com` como correo oficial. |
| `website` | `https://arrendador.co` | Dominio canónico del sitio | Ninguna. |
| `brandName` / `jurisdiction` | `ArrendadorCO` / `Colombia` | Repositorio | Ninguna. |

## Otros pendientes que requieren decisión del responsable

1. **Confirmación de FormSubmit:** el formulario de contacto todavía envía a
   `https://formsubmit.co/spaceyisusshop@gmail.com` (`src/app/contacto/ContactForm.tsx`).
   No se cambió el destinatario sin confirmación del dueño. Confirmar si
   `hola@arrendador.co` ya completó el "Activate Form" de FormSubmit antes de
   cambiarlo. El newsletter ya usa `hola@arrendador.co`.
2. **Revisión jurídica:** validar el texto completo de `/politica-de-datos`
   (finalidades, conservación, transferencias, cookies y vigencia) con el
   responsable o su asesoría legal antes de publicarlo.
3. **Consentimiento verificable:** `/api/leads` no persiste el estado de
   autorización de datos; `CheckoutForm.tsx` envía solo `{ email, source }`.
   Definir con el responsable si se requiere evidencia de consentimiento
   almacenada en servidor.

## Cómo completar

Editar `src/lib/legal-config.ts` reemplazando cada `[PENDIENTE: ...]` por el
valor real. No dejar marcadores visibles en la política pública.
