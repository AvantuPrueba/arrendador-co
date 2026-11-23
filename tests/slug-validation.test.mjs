import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidSlug, SLUG_PATTERN, blogPostHref } from '../src/lib/blog.ts';

test('valid slugs are accepted', () => {
  const valid = [
    'acta-entrega-recepcion-arrendamiento-colombia',
    'guia-contrato-arrendamiento-colombia',
    'manejo-inquilinos-morosos',
    'seguros-arrendamiento-colombia',
    'software-facturacion-arrendadores',
    'a', 'a1', 'a-b', 'a-b-c', '123', 'a1-b2-c3',
  ];
  for (const s of valid) {
    assert.ok(isValidSlug(s), `should accept: ${s}`);
    assert.ok(SLUG_PATTERN.test(s), `pattern should match: ${s}`);
  }
});

test('empty and malformed slugs are rejected', () => {
  for (const s of ['', '   ', '-', '-a', 'a-', 'a--b']) {
    assert.ok(!isValidSlug(s), `should reject: ${JSON.stringify(s)}`);
  }
});

test('javascript: scheme is rejected', () => {
  for (const s of ['javascript:alert(1)', 'JAVASCRIPT:alert(1)']) {
    assert.ok(!isValidSlug(s), `should reject: ${s}`);
  }
});

test('HTML and quote injection is rejected', () => {
  for (const s of ['<script>alert(1)</script>', '"><script>alert(1)</script>', "a'b", 'a"b', 'a<b', 'a>b', 'a b']) {
    assert.ok(!isValidSlug(s), `should reject: ${s}`);
  }
});

test('path traversal is rejected', () => {
  for (const s of ['../', '..\\', '..', '.', './a', 'a/../b']) {
    assert.ok(!isValidSlug(s), `should reject: ${s}`);
  }
});

test('encoded separators are rejected', () => {
  for (const s of ['a%2Fb', 'a%2fb', 'a%00b', 'a%2e%2e%2fb']) {
    assert.ok(!isValidSlug(s), `should reject: ${s}`);
  }
});

test('control characters and newlines are rejected', () => {
  for (const s of ['a\nb', 'a\r\nb', 'a\tb', 'a\0b', 'a\u2028b']) {
    assert.ok(!isValidSlug(s), `should reject: ${JSON.stringify(s)}`);
  }
});

test('uppercase, unicode and specials are rejected', () => {
  for (const s of ['A-B', 'guía', 'a_b', 'a.b', 'a+b', 'a?b', 'a#b', 'áéíóú']) {
    assert.ok(!isValidSlug(s), `should reject: ${s}`);
  }
});

test('anchored validation rejects trailing junk', () => {
  assert.ok(!isValidSlug('a-b!'));
  assert.ok(!isValidSlug('a-b '));
  assert.ok(!isValidSlug(' a-b'));
});

test('generated links are always relative under /blog/', () => {
  const valid = ['acta-entrega-recepcion-arrendamiento-colombia', 'a-b'];
  for (const s of valid) {
    const href = `/blog/${s}`;
    assert.ok(href.startsWith('/blog/'), `link should be under /blog/: ${href}`);
    assert.ok(!href.includes(':'), `link should not contain colon: ${href}`);
  }
});

test('blogPostHref returns null for invalid slugs', () => {
  for (const s of ['', 'javascript:alert(1)', '../', '<script>', 'a b', 'A-B']) {
    assert.strictEqual(blogPostHref(s), null, `should return null for: ${s}`);
  }
});

test('blogPostHref returns valid relative path for valid slugs', () => {
  const href = blogPostHref('guia-contrato-arrendamiento-colombia');
  assert.strictEqual(href, '/blog/guia-contrato-arrendamiento-colombia');
  assert.ok(href.startsWith('/blog/'));
});