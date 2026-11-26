# PRD — ArrendadorCO

> **Versión:** 1.0  
> **Fecha:** 2026-10-05  
> **Autor:** Fundador  
> **Estado:** Borrador para validación

---

## 1. Problema

Los pequeños arrendadores de vivienda urbana en Colombia (1–10 inmuebles) no tienen
acceso fácil a información operativa clara sobre:

- Cómo redactar un contrato de arrendamiento que los proteja.
- Cómo documentar la entrega y recepción de un inmueble.
- Qué hacer legalmente cuando un inquilino deja de pagar.
- Qué obligaciones tributarias tienen como arrendadores.

La información existente está fragmentada en foros, PDFs desactualizados y asesorías
legales que muchos no pueden costear.

---

## 2. Solución

Un sitio web de contenido especializado que ofrece:

1. **Guías prácticas** sobre contratos, actas, morosos y fiscalidad.
2. **Un blog** con artículos SEO-optimizados que atraigan tráfico orgánico.
3. **Un producto digital** (plantilla de contrato editable) como primera fuente de ingreso.
4. **Recomendaciones de herramientas** (seguros, facturación) mediante enlaces de afiliados.
5. **Newsletter** para retención y monetización recurrente.

**Lo que NO es:** No es un SaaS. No es un despacho de abogados. No ofrece asesoría legal
personalizada. No garantiza cumplimiento legal — es contenido informativo.

---

## 3. Público objetivo

| Segmento | Características | Necesidades |
|---|---|---|
| **Propietario-arrendador (1–10 inmuebles)** | 30–55 años, profesional o emprendedor, bajo conocimiento legal inmobiliario. | Entender cláusulas de contrato, gestionar pagos atrasados, herramientas accesibles. |
| **Gestor de inmueble familiar** | Administra la vivienda familiar como alquiler. Sin experiencia previa. | Formalizar entregas/recepciones, evitar conflictos. |
| **Micro-agente inmobiliario** | Opera como broker de pocos inmuebles, sin oficina. | Servicios complementarios (seguros, facturación), plantillas profesionales. |

---

## 4. Modelo de negocio

| Canal de ingreso | Mecanismo | Prioridad |
|---|---|---|
| **Producto digital** | Plantilla de contrato editable (Word + Google Docs). Pago único vía Mercado Pago. | Alta — ingreso directo. |
| **Afiliados** | Enlaces a seguros de arrendamiento y software de facturación con tracking UTM. | Media — requiere volumen de tráfico. |
| **Newsletter** | Suscriptores → confianza → conversión a producto o afiliado. | Media — canal de retención. |
| **SEO orgánico** | Tráfico gratuito desde Google hacia los artículos pilar. | Alta — es el motor principal de adquisición. |

---

## 5. Producto digital: Plantilla de contrato

| Atributo | Valor |
|---|---|
| **Formato** | .docx + enlace a Google Docs editable. |
| **Precio** | COP $45.000 (pago único). |
| **Entrega** | **Manual, por correo.** Se captura el email del comprador en `/tienda`, se cruza con el pago confirmado en el panel de Mercado Pago y se envía la plantilla (compromiso: < 24 h hábiles). |
| **Incluye** | Campos dinámicos (fecha, valor, garantía). Guía de personalización en PDF. |
| **Disclaimer** | "Esta plantilla es un modelo informativo. No constituye asesoría legal. Recomendamos revisarla con un profesional antes de firmar." |

### Mecanismo de pago (decisión)

**Link de Pago de Mercado Pago (Checkout Pro).** Sin integración con la API de Mercado Pago.

- Sin credenciales (`ACCESS_TOKEN` / `PUBLIC_KEY`), sin webhook, sin base de datos de órdenes.
- El pago **no se confirma automáticamente**: se revisa a mano en el panel de Mercado Pago.
- Por eso `/tienda` pide el correo antes de redirigir al link, para poder entregar el producto.
- Detalle completo en [`INTEGRACION_PAGOS.md`](./INTEGRACION_PAGOS.md), que incluye también el
  plan de migración a la API si el volumen lo justifica.

> **Roadmap futuro (no MVP):**
> - Versión para arriendo comercial.
> - Acta de entrega editable.
> - Bundle contrato + acta con descuento.

---

## 6. Artículos pilar (10)

Cada artículo lleva frontmatter estandarizado (ver esquema en la sección 9).

| # | Slug | Título (SEO) | Categoría |
|---|---|---|---|
| 1 | `guia-contrato-arrendamiento-colombia` | Guía definitiva del contrato de arrendamiento en Colombia | contratos |
| 2 | `acta-entrega-recepcion-inmueble` | Cómo crear un acta de entrega y recepción sin errores | actas |
| 3 | `manejo-inquilinos-morosos-colombia` | Manejo de inquilinos morosos: pasos legales y preventivos | morosos |
| 4 | `seguros-arrendamiento-colombia` | Seguros de arrendamiento: ¿realmente necesitas uno? | herramientas |
| 5 | `software-facturacion-arrendadores` | Software de facturación para arrendadores: top 5 opciones | herramientas |
| 6 | `impuestos-arrendador-colombia` | Fiscalidad del arrendador colombiano: impuestos y deducciones | fiscalidad |
| 7 | `renovacion-contratos-arrendamiento` | Renovación de contratos: cuándo y cómo hacerlo | contratos |
| 8 | `evitar-conflictos-inquilinos` | Cómo evitar conflictos de convivencia con tus inquilinos | convivencia |
| 9 | `checklist-mantenimiento-inmueble-alquiler` | Checklist de mantenimiento anual del inmueble en alquiler | mantenimiento |
| 10 | `aumentar-rentabilidad-alquileres` | Cómo aumentar la rentabilidad de tu portafolio de alquileres | rentabilidad |

---

## 7. Estructura de navegación

```
/                          → Home (hero + cards + CTA producto + newsletter)
/guias                     → Índice de guías
/guias/contratos           → Guía: Contratos
/guias/actas               → Guía: Actas de entrega
/guias/morosos             → Guía: Inquilinos morosos
/guias/fiscalidad          → Guía: Fiscalidad
/blog                      → Grid de artículos
/blog/[slug]               → Artículo individual (Markdown → HTML)
/herramientas              → Herramientas recomendadas (afiliados)
/tienda                    → Producto digital (plantilla de contrato)
/contacto                  → FAQ + formulario de contacto
/sobre-nosotros            → Quiénes somos
/legal/terminos            → Términos y condiciones
/legal/privacidad          → Política de privacidad
/legal/cookies             → Política de cookies
```

**Navbar:** Inicio · Guías · Blog · Herramientas · Tienda · Contacto  
**Footer:** Navegación secundaria + links legales + disclaimer de afiliados + newsletter

---

## 8. Estrategia de afiliados

### Ubicaciones

| Zona | Formato | Notas |
|---|---|---|
| Dentro de artículos relevantes | Componente `<AffiliateBox>` | Contextual, no intrusivo. |
| Sidebar en guías (desktop) | Banner 150×150 px | Solo desktop. |
| Página `/herramientas` | Listado completo | Página dedicada con comparativas. |
| Footer global | Texto "Nuestros partners" | Cumplimiento de transparencia. |
| Newsletter | Sección "Herramientas recomendadas" | Refuerzo de conversión. |

### Reglas de transparencia

- Cada enlace afiliado muestra: *"Este enlace es afiliado y puede generar una comisión."*
- Los enlaces llevan `rel="noopener noreferrer sponsored"`.
- Cada enlace incluye parámetros UTM: `?utm_source=arrendadorco&utm_medium=[ubicacion]&utm_campaign=[producto]`.
- Las URLs reales de afiliados se configuran en un archivo centralizado (no hardcodeadas en componentes).

---

## 9. Esquema de frontmatter (artículos Markdown)

Todos los archivos en `content/blog/*.md` deben cumplir este esquema:

```yaml
---
# === OBLIGATORIOS ===
slug: "guia-contrato-arrendamiento-colombia"     # string — URL-safe, lowercase, hyphens
title: "Guía definitiva del contrato de arrendamiento en Colombia"  # string — título para <h1> y <title>
description: "Guía completa sobre contratos de arrendamiento..."    # string — meta description (≤160 chars)
excerpt: "Todo lo que necesitas saber sobre contratos de arriendo." # string — resumen para tarjetas del blog (≤200 chars)
date: "2026-10-01"              # string ISO 8601 — fecha de publicación original
updated: "2026-10-05"           # string ISO 8601 — última actualización de contenido
author: "ArrendadorCO"          # string — nombre del autor
category: "contratos"           # string — una de: contratos, actas, morosos, fiscalidad, herramientas, convivencia, mantenimiento, rentabilidad

# === OPCIONALES (con defaults) ===
tags: ["contrato", "arrendamiento", "colombia"]  # string[] — tags para filtrado y SEO (default: [])
sources: []                     # string[] — URLs de fuentes citadas en el artículo (default: [])
featured: false                 # boolean — si aparece destacado en Home (default: false)
canonical: ""                   # string — URL canónica si el contenido fue publicado antes en otro lugar (default: "")
legalReviewDate: ""             # string ISO 8601 — fecha en que un profesional revisó el contenido (default: ""). Dejar vacío si NO ha sido revisado.
---
```

### Validaciones esperadas (a implementar en build)

- `slug` debe coincidir con el nombre del archivo (sin `.md`).
- `description` no debe exceder 160 caracteres.
- `excerpt` no debe exceder 200 caracteres.
- `date` y `updated` deben ser fechas ISO 8601 válidas.
- `category` debe ser uno de los valores del enum.
- `legalReviewDate` solo se llena cuando un profesional real ha revisado el artículo. No inventar fechas.

---

## 10. Stack técnico (decisiones tomadas)

| Componente | Tecnología | Notas |
|---|---|---|
| Framework | Next.js 16 (App Router) | TypeScript |
| Estilos | Tailwind CSS | Mobile-first, paleta azul/gris |
| Contenido | Markdown local + gray-matter + remark | Sin CMS externo |
| Hosting | Vercel | Free tier para MVP |
| Pagos | Mercado Pago (Link de Pago) | Checkout alojado, sin API ni webhook |
| Newsletter | Brevo | API para suscripción |
| Almacenamiento digital | Envío por correo | El .docx se envía a mano; sin Vercel Blob en el MVP |
| Analítica | Pendiente de decisión | GA4 no instalado. Requiere autorización del propietario e ID de medición de producción; no hay eventos ni medición activa. |
| Tipografía | Inter (Google Fonts) | |

> **Estado de analítica verificado (2026-11-25):** no existe integración de GA4, Google Tag Manager ni otro proveedor de analítica web en el código, y las pruebas en el Worker desplegado no registraron solicitudes a Google, eventos `page_view` ni parámetros `tid`. No hay ID de medición configurado, por lo que **no hay recepción de eventos ni seguimiento de conversiones que validar**. Cualquier futura integración requiere autorización explícita del propietario y un ID de medición de producción proporcionado por él, además de una nueva auditoría previa a la implementación.

---

## 11. Alcance del MVP

| Funcionalidad | MVP | Post-MVP |
|---|---|---|
| Home + navegación responsive | ✔ | |
| 5 artículos pilar publicados | ✔ | Los otros 5 en los siguientes 30 días |
| Páginas de guías (4 secciones) | ✔ | |
| Blog con grid + página dinámica [slug] | ✔ | |
| Página de tienda con producto digital | ✔ | |
| Checkout Mercado Pago (Link de Pago) + captura de email | ✔ | Entrega automatizada (API + webhook + Blob) |
| Newsletter con Brevo | ✔ | Automatizaciones post-MVP |
| 2 afiliados integrados (seguro + facturación) | ✔ | |
| Páginas legales (términos, privacidad, cookies) | ✔ | |
| Analítica web (GA4) | | No instalado. Pendiente de autorización del propietario, ID de medición de producción y nueva auditoría antes de implementar. |
| SEO (meta, OG, schema.org) | ✔ | |
| Validación de frontmatter en build | ✔ | |
| Calculadora de rentabilidad | | ✔ |
| Firma digital (DocuSign/similar) | | ✔ |
| Versión arriendo comercial | | ✔ |

---

## 12. Disclaimer legal del sitio

El siguiente texto (o equivalente) debe aparecer en el footer y en las páginas legales:

> "ArrendadorCO es un sitio de contenido informativo. No somos un despacho de abogados
> ni ofrecemos asesoría legal personalizada. Las guías y plantillas publicadas son modelos
> de referencia. Recomendamos consultar con un profesional del derecho antes de tomar
> decisiones legales. Los enlaces marcados como afiliados pueden generar una comisión
> para el sitio."
