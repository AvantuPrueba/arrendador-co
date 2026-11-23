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

test('---js frontmatter does not execute', () => {
  let executed = false;
  globalThis.__gm_js_test = () => { executed = true; };
  const parsed = matter('---js\n__gm_js_test()\n---\ncontenido');
  assert.strictEqual(executed, false, 'js engine must not execute');
  delete globalThis.__gm_js_test;
});

test('---javascript frontmatter does not execute', () => {
  let executed = false;
  globalThis.__gm_javascript_test = () => { executed = true; };
  const parsed = matter('---javascript\n__gm_javascript_test()\n---\ncontenido');
  assert.strictEqual(executed, false, 'javascript engine must not execute');
  delete globalThis.__gm_javascript_test;
});

test('malicious JS frontmatter produces no side effects', () => {
  const before = Object.keys(globalThis).length;
  try {
    matter('---js\nprocess.exit(1)\n---\ncontenido');
  } catch (e) {
    // Expected: might throw or silently return empty
  }
  try {
    matter('---javascript\nrequire("fs").writeFileSync("/tmp/pwned","x")\n---\ncontenido');
  } catch (e) {
    // Expected
  }
  const after = Object.keys(globalThis).length;
  assert.ok(after - before < 5, 'no significant global side effects');
});

test('normal Markdown content is preserved', () => {
  const parsed = matter('---\ntitle: Test\n---\n# Heading\n\nParagraph with **bold**.');
  assert.strictEqual(parsed.data.title, 'Test');
  assert.ok(parsed.content.includes('Heading'));
  assert.ok(parsed.content.includes('bold'));
});