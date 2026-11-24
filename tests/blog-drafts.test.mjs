import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllPostSlugs,
  getPostBySlug,
  isValidSlug,
  blogPostHref,
} from '../src/lib/blog.ts';

test('getAllPostSlugs excluye borradores (draft: true)', () => {
  const slugs = getAllPostSlugs();
  // guia-contrato, manejo-inquilinos-morosos, seguros-arrendamiento, software-facturacion son draft: true
  const draftSlugs = [
    'guia-contrato-arrendamiento-colombia',
    'manejo-inquilinos-morosos',
    'seguros-arrendamiento-colombia',
    'software-facturacion-arrendadores',
  ];
  for (const draft of draftSlugs) {
    assert.ok(
      !slugs.includes(draft),
      `el borrador "${draft}" no debe aparecer en getAllPostSlugs()`,
    );
  }
  // acta-entrega es publicado (draft: false)
  assert.ok(
    slugs.includes('acta-entrega-recepcion-arrendamiento-colombia'),
    'el artículo publicado debe aparecer en getAllPostSlugs()',
  );
});

test('getPostBySlug rechaza borradores (404)', async () => {
  // Los borradores están excluidos de getAllPostSlugs, por lo que getPostBySlug
  // no los encuentra y responde con "no encontrado" (equivalente a 404).
  await assert.rejects(
    getPostBySlug('guia-contrato-arrendamiento-colombia'),
    /no encontrado/,
  );
  await assert.rejects(
    getPostBySlug('manejo-inquilinos-morosos'),
    /no encontrado/,
  );
  await assert.rejects(
    getPostBySlug('seguros-arrendamiento-colombia'),
    /no encontrado/,
  );
});

test('getPostBySlug devuelve artículo publicado', async () => {
  const post = await getPostBySlug('acta-entrega-recepcion-arrendamiento-colombia');
  assert.strictEqual(post.slug, 'acta-entrega-recepcion-arrendamiento-colombia');
  assert.strictEqual(post.draft, false);
  assert.ok(post.content.length > 0);
});

test('getPostBySlug devuelve 404-equivalente para slug inexistente', async () => {
  await assert.rejects(getPostBySlug('no-existe'), /no encontrado/);
});

test('slugs con esquemas peligrosos son rechazados', () => {
  const dangerous = [
    'javascript:alert(1)',
    'JAVASCRIPT:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:alert(1)',
  ];
  for (const s of dangerous) {
    assert.ok(!isValidSlug(s), `debe rechazar: ${s}`);
    assert.strictEqual(blogPostHref(s), null, `blogPostHref debe devolver null para: ${s}`);
  }
});

test('slugs con caracteres de escape HTML son rechazados', () => {
  const dangerous = [
    '&lt;script&gt;',
    '&quot;',
    '&#x27;',
    '&#x2F;',
    '&#0;',
  ];
  for (const s of dangerous) {
    assert.ok(!isValidSlug(s), `debe rechazar: ${s}`);
  }
});

test('slugs con puntos y espacios son rechazados', () => {
  const dangerous = ['a.b', 'a/b', 'a\\b', 'a b', 'a  b', '.', '..'];
  for (const s of dangerous) {
    assert.ok(!isValidSlug(s), `debe rechazar: ${s}`);
  }
});

test('blogPostHref nunca genera enlaces externos o ejecutables', () => {
  const valid = ['acta-entrega-recepcion-arrendamiento-colombia', 'a-b', 'a1-b2-c3'];
  for (const s of valid) {
    const href = blogPostHref(s);
    assert.ok(href !== null, `slug válido ${s} no debe devolver null`);
    assert.ok(href.startsWith('/blog/'), `debe iniciar con /blog/: ${href}`);
    assert.ok(!href.includes(':'), `no debe contener dos puntos: ${href}`);
    assert.ok(!href.includes('//'), `no debe contener doble barra: ${href}`);
    assert.ok(!href.startsWith('/blog/../'), `no debe tener path traversal: ${href}`);
  }
});
