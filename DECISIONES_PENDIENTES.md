# Decisiones Pendientes (Bloqueantes para Desarrollo)

Este documento lista las decisiones, datos y configuraciones exactas que el fundador debe definir antes de que podamos implementar las integraciones reales y redactar el texto definitivo de las páginas legales y transaccionales.

## 1. Identidad Legal y Tributaria (Para Términos, Condiciones y Pagos)
*Dado que venderás un producto digital en Colombia ($45.000 COP), necesitamos definir cómo vas a facturar/declarar.*

- [ ] **Tipo de persona:** ¿Operas como Persona Natural o Persona Jurídica (ej. SAS)?
- [ ] **Régimen de IVA:** ¿Eres responsable de IVA (antiguo Régimen Común) o No responsable de IVA (antiguo Régimen Simplificado)?
- [ ] **RUT y Razón Social:** Nombre completo o razón social y NIT/Cédula que aparecerá en los Términos y Condiciones.
- [ ] **Dirección física/notificaciones:** Exigido legalmente en Colombia para comercio electrónico (Estatuto del Consumidor).

## 2. Integración Mercado Pago (Link de Pago)
*Para habilitar el pago del producto digital.*

- [x] **Mecanismo:** Mercado Pago Link de Pago (Checkout Pro). Sin API, sin webhook, sin base de datos de órdenes. Ver `INTEGRACION_PAGOS.md`.
- [ ] **Link de Pago:** Pega en `.env.local` el enlace del link que ya creaste:
      `NEXT_PUBLIC_MERCADOPAGO_LINK=https://www.mercadopago.com.co/l/XXXXXXXXXXXX`
      *(El repositorio trae `.env.example` como plantilla; `.env.local` está en `.gitignore`.)*
- [ ] **Comisión:** ¿El precio de $45.000 COP incluye la comisión de Mercado Pago o se la vas a sumar al comprador? Si no lo incluye, actualiza el precio en el link **y** en `src/lib/product.ts` (están en sitios separados).
- [ ] **Cuenta:** el link debe estar creado en la cuenta de ArrendadorCO, no en una personal, para no mezclar ventas e impuestos.

## 3. Email y Newsletter (FormSubmit)
*Para la configuración de envíos y formularios.*

- [ ] **Remitente FormSubmit:** El email de destino para FormSubmit es `spaceyisusshop@gmail.com`. Verifica que tienes acceso a esta cuenta para confirmar los envíos.
- [ ] **URL de agradecimiento:** Cambia `https://tudominio.com/gracias` en los formularios por la URL real de tu página de gracias cuando la tengas.

## 4. Enlaces de Afiliados (Reales)
*Para no usar placeholders.*

- [ ] **Seguros de Arrendamiento:** ¿Qué aseguradora/broker vas a recomendar? (ej. Sura, El Libertador, Seguros Bolívar, o un broker digital). URL exacta de tu enlace de afiliado.
- [ ] **Software de Facturación:** ¿Qué software vas a recomendar? (ej. Alegra, Siigo, Loggro). URL exacta de tu enlace de afiliado.

## 5. Producto Digital (La Plantilla)
*Para preparar el almacenamiento y entrega.*

- [ ] **Contenido del ZIP/Documento:** Debes tener listo el archivo `.docx` y el PDF de instrucciones para poder probar el flujo de entrega manual post-pago.
- [ ] **Precio final confirmado:** $45.000 COP incluye comisión o no (ver §2).

---

**Siguiente Paso:** Por favor, responde a estos puntos (especialmente el bloque legal/tributario §1, el Link de Pago §2, y partners de afiliados §4). Una vez los definamos, actualizaremos los placeholders y podremos probar las integraciones reales.