import { test } from 'node:test';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import '../src/lib/blog.ts';

test('YAML frontmatter parses correctly', () => {
  const yaml = matter('---\ntitle: Hola\ndate: 2026-01-01\n---\ncontenido');
  assert.strictEqual(yaml.data.title, 'Hola');
  assert.ok(yaml.data.date instanceof Date, 'date parsed as Date');
  assert.strictEqual(yaml.content.trim(), 'contenido');
});

test('---js frontmatter is explicitly rejected', () => {
  let executed = false;
  globalThis.__gm_js_test = () => { executed = true; };
  assert.throws(() => {
    matter('---js\n__gm_js_test()\n---\ncontenido');
  }, /JavaScript frontmatter is not supported/);
  assert.strictEqual(executed, false, 'js engine must not execute');
  delete globalThis.__gm_js_test;
});

test('---javascript frontmatter is explicitly rejected', () => {
  let executed = false;
  globalThis.__gm_javascript_test = () => { executed = true; };
  assert.throws(() => {
    matter('---javascript\n__gm_javascript_test()\n---\ncontenido');
  }, /JavaScript frontmatter is not supported/);
  assert.strictEqual(executed, false, 'javascript engine must not execute');
  delete globalThis.__gm_javascript_test;
});

test('malicious JS frontmatter is rejected without side effects', () => {
  const before = Object.keys(globalThis).length;
  assert.throws(() => {
    matter('---js\nprocess.exit(1)\n---\ncontenido');
  }, /JavaScript frontmatter is not supported/);
  assert.throws(() => {
    matter('---javascript\nrequire("fs").writeFileSync("/tmp/pwned","x")\n---\ncontenido');
  }, /JavaScript frontmatter is not supported/);
  const after = Object.keys(globalThis).length;
  assert.ok(after - before < 5, 'no significant global side effects');
});

test('normal Markdown content is preserved', () => {
  const parsed = matter('---\ntitle: Test\n---\n# Heading\n\nParagraph with **bold**.');
  assert.strictEqual(parsed.data.title, 'Test');
  assert.ok(parsed.content.includes('Heading'));
  assert.ok(parsed.content.includes('bold'));
});