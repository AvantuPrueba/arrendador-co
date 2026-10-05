# Integración de Pagos — Mercado Pago

> **Estado:** MVP con Link de Pago. Sin API, sin webhooks, sin base de datos de órdenes.
> **Última actualización:** 2026-10-05

---

## 1. Decisión de arquitectura

**El MVP usa Mercado Pago Link de Pago (Checkout Pro), no una integración con la API.**

| | Integración con API (descartada) | Link de Pago (actual) |
|---|---|---|
| Credenciales | `ACCESS_TOKEN` + `PUBLIC_KEY` | Ninguna |
| Webhook | Obligatorio para confirmar el pago | No aplica |
| Base de datos | Tabla de órdenes + idempotencia | No aplica |
| Confirmación del pago | Automática vía webhook | **Manual**, desde el panel de Mercado Pago |
| Entrega del producto | Automática (URL firmada) | **Manual**, por correo |
| Coste de implementación | Alta | Baja |

**Por qué:** el producto es un `.docx` de $45.000 COP. A ese volumen, automatizar la entrega no
ahorra trabajo real y sí introduce superficie de fallo (un webhook mal validado entrega el
producto gratis; uno mal configurado pierde ventas). Se puede migrar a la API más adelante, cuando
el volumen justifique el costo.

### Consecuencias asumidas

1. **El pago no se confirma automáticamente.** Hay que revisarlo a mano en el panel de
   Mercado Pago.
2. **La entrega es manual.** Se cruza el correo capturado en `/tienda` contra el pago, y se envía
   la plantilla.
3. **Se puede perder una venta.** Si alguien paga y no dejó su correo, hay que reclamarla en
   el panel de Mercado Pago. El microcopy de `/tienda` pide el correo justamente para evitarlo.
4. **No hay trazabilidad de pedidos.** No se sabe qué compra corresponde a qué orden.

---

## 2. Obtención del Link de Pago

1. Entra a [mercadopago.com.co/links](https://www.mercadopago.com.co/links/) desde la cuenta de
   **ArrendadorCO** (no tu cuenta personal: si mezclas ambas, las ventas y los impuestos se
   reportan mal).
2. **Crear link de pago** → elige **Pago único**.
3. Configura:
   - **Título:** `Plantilla de Contrato de Arrendamiento`
   - **Precio:** `45000` COP (o el precio final, ver `DECISIONES_PENDIENTES.md` §2)
   - **Descripción:** plantilla `.docx` editable + guía de personalización en PDF
4. Copia el enlace. Tiene esta forma:
   `https://www.mercadopago.com.co/l/XXXXXXXXXXXX`
5. Pégalo en `.env.local`:

   ```bash
   NEXT_PUBLIC_MERCADOPAGO_LINK=https://www.mercadopago.com.co/l/XXXXXXXXXXXX
   ```

> **Importante:** el prefijo `NEXT_PUBLIC_` hace que Next.js incruste el valor en el bundle del
> navegador **en tiempo de build**. Si añades o cambias la variable, hay que volver a desplegar
> (en Vercel: redeploy, no solo reiniciar). Las variables `NEXT_PUBLIC_*` no son secretos; que
> este link sea público es intencional, Mercado Pago está diseñado para links públicos.

El repositorio no trae `.env.local` (está en `.gitignore`). La plantilla está en `.env.example`.

---

## 3. Flujo actual

```
Usuario en /tienda
      │
      ├─ Escribe su correo  ──→ validación de formato (client)
      │                              │
      │                              ├─ inválido → error, no se guarda
      │                              │
      │                              └─ válido
      │                                     │
      │                                     ├─→ POST /api/leads  →  data/leads.jsonl (local)
      │                                     │                      o  logs de Vercel (producción)
      │                                     │
      ▼
Redirect a Mercado Pago (window.location.href)
      │
      ▼
Mercado Pago (Checkout Pro, fuera de nuestro dominio)
      │
      ▼
El cliente paga. Nosotros NO nos enteramos todavía.
      │
      ▼  (manual, 1–2 veces al día)
Panel de Mercado Pago → ver pago recibido
      │
      ▼
Cruzar el correo (capturado) con el pago
      │
      ▼
Enviar la plantilla .docx por correo  (compromiso del microcopy: < 24 h hábiles)
```

### Archivos involucrados

| Archivo | Rol |
|---|---|
| `src/app/tienda/page.tsx` | Server Component. Lee `NEXT_PUBLIC_MERCADOPAGO_LINK` y pasa el link a `CheckoutForm`. |
| `src/components/CheckoutForm.tsx` | Client Component. Formulario + microcopy + redirect. |
| `src/lib/email.ts` | Validación de correo. Puro, sin dependencias de Node (se usa en el navegador). |
| `src/app/api/leads/route.ts` | `POST /api/leads`. Valida y guarda el correo. |
| `src/lib/leads.ts` | Persistencia de los correos (`node:fs`, solo servidor). |
| `.env.example` | Plantilla de variables. |

---

## 4. Estado actual: lo que NO existe

Se documenta explícitamente para que nadie lo busque:

- **No hay tabla de órdenes.** No existe Drizzle, ni Neon, ni ninguna otra base de datos.
- **No hay webhook.** No hay ruta `/api/webhook` ni handler de eventos de Mercado Pago.
- **No hay validación de firma.** No aplica: sin webhook no hay firma que verificar.
- **No hay idempotencia.** No aplica: sin reintentos automáticos no hay duplicados que evitar.
- **No hay `ACCESS_TOKEN` ni `PUBLIC_KEY`.** No se necesitan.
- **No hay feature flag de pagos.** El botón se activa con la presencia de la variable de entorno.

Si alguien implementa el flujo del webhook leyendo este documento y encuentra `sección 4`, esa
sección es la respuesta.

---

## 5. Problemas conocidos

### 5.1 El correo no persiste en Vercel

`src/lib/leads.ts` escribe en `data/leads.jsonl` en desarrollo. En Vercel el sistema de archivos
es **efímero**: el archivo se pierde entre invocaciones. En producción el código detecta
`process.env.VERCEL` y escribe en los logs del servidor.

**Cómo recuperar los correos en producción hoy:**
Dashboard de Vercel → el proyecto → *Logs* → filtrar por `[lead]`. Cada línea es un JSON.

Eso no es sustainable. Antes de lanzar hay que conectar un destino real. Opciones, de menos a
más trabajo (ninguna implementada, todas necesitan credenciales):

| Opción | Esfuerzo | Notas |
|---|---|---|
| **Google Sheets vía Apps Script** | Bajo | Publicar un Web App que acepte un POST y añada una fila. Lo más rápido para el MVP manual. |
| **Brevo** | Bajo | Ya está en el stack previsto (PRD §10). `POST /v3/contacts` con `listIds`. Reutiliza el dominio que habrá que configurar igual para el newsletter. |
| **Vercel Postgres / Neon** | Medio | Solo si se va a automatizar la entrega. |

Los tres están descritos en el bloque de comentarios de `src/lib/leads.ts`.

### 5.2 Sin rate limiting

`POST /api/leads` es público y no tiene límite de peticiones. Un atacante puede llenarlo de correos
falsos y saturar la cuota de Vercel. Para el volumen del MVP es aceptable; antes de escalar,
añadir un rate limit por IP (Upstash Redis o el rate limit de Vercel).

### 5.3 El enlace de pago puede quedar desactualizado

Cambiar el precio en el panel de Mercado Pago no cambia nada en el sitio, y viceversa: el precio
mostrado en `/tienda` (`$45.000 COP`) está centralizado en `src/lib/product.ts`. Si cambia el precio,
hay que actualizar **los dos sitios** (Mercado Pago y `PRODUCT_CONFIG.priceCOP`) o se mostrarán
precios distintos al usuario.

---

## 6. Si en el futuro se migra a la API

Solo cuando el volumen lo justifique. El orden recomendado:

1. **Crear el producto en la API** (`POST /v1/products`) para tener un `product_id` estable.
2. **Generar el checkout** con `POST /checkout/preference`, incluyendo:
   - `external_reference` = id de tu orden (para conciliar).
   - `notification_url` = `https://<dominio>/api/webhooks/mercadopago`.
   - `back_urls.success` / `back_urls.failure` = páginas de resultado.
3. **Webhook firmado.** Mercado Pago firma con HMAC-SHA256 y envía los datos en
   `x-signature`, `x-request-id` y `x-timestamp`. El template de verificación es:

   ```ts
   // El string a firmar NO es el JSON crudo: es una plantilla con {id}, {dataId} y {ts}.
   const manifest = `id:${data.id};request-id:${requestId};ts:${timestamp};`;
   const expected = crypto.createHmac('sha256', SECRET).update(manifest).digest('hex');
   const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
   ```

   Leer los headers con `await request.text()` y parsear el JSON **después** de validar: el
   cuerpo se necesita en crudo para que la firma coincida.

4. **Idempotencia.** Mercado Pago reintenta el webhook. La clave natural es
   `data.id` (el id del pago) combinado con `action` (`payment` / `refund`). Antes de procesar,
   insertar en una tabla con restricción de unicidad; si el insert falla, el evento ya se
   procesó y se devuelve `200` sin repetir efectos.

5. **Estados de orden.** Si se migra, estos son los estados y sus transiciones:

   ```
   pendiente ──→ pagado ──→ entregado
       │            │
       │            └──→ reembolsado
       │
       └──→ rechazado
   ```

   | Estado | Significado | Transiciones válidas |
   |---|---|---|
   | `pendiente` | Checkout abierto, sin confirmar | `pagado`, `rechazado` |
   | `pagado` | Pago confirmado por webhook | `entregado`, `reembolsado` |
   | `rechazado` | Pago fallido o cancelado | terminal (crear orden nueva) |
   | `reembolsado` | Devuelto total o parcialmente | terminal |
   | `entregado` | `.docx` enviado al comprador | terminal |

6. **Entrega.** Migrar de URL firmada en `data/leads.jsonl` a Vercel Blob con
   `access: 'private'` y una URL firmada de vida corta (~15 min). Solo se genera tras confirmar
   el pago, y solo cuando el estado pasa a `pagado`.

---

## 7. Checklist de launch

- [ ] `NEXT_PUBLIC_MERCADOPAGO_LINK` definido en las variables de entorno de Vercel (Producción).
- [ ] Link probado en modo real con un pago de $1 y luego el precio final.
- [ ] `NEXT_PUBLIC_SUPPORT_EMAIL` definido; placeholder `[PENDIENTE: correo electrónico]`
      reemplazado en `/tienda` **y** en las páginas legales.
- [ ] Destino persistente de correos conectado (§5.1). Hoy solo hay logs.
- [ ] Verificar en el panel de Mercado Pago que la venta se refleja como el fundador espera.
- [ ] Confirmar que el correo capturado llega y que el flujo permite entregar.