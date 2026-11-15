import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ACADEMY_COURSES,
  ACADEMY_FAQ,
  ACADEMY_PROGRESS_STORAGE_KEY,
} from './academyCourses.ts';
import { TAB_ROUTE_MAP } from '../context/MarketContext.tsx';

test('DinhEuro Academy defines exactly 4 structured courses with 4 modules each (16 modules total)', () => {
  assert.equal(ACADEMY_COURSES.length, 4);

  const expectedTitles = [
    'Fundamentos de Renda Fixa & Tesouro Direto',
    'Mercado de Câmbio, Dólar & Proteção Internacional',
    'Análise Técnica, Ações & Criptoativos',
    'Fluxo (Tape Reading), Futuros & Opções',
  ];
  assert.deepEqual(
    ACADEMY_COURSES.map((c) => c.title),
    expectedTitles
  );

  const moduleIds = new Set<string>();
  for (const course of ACADEMY_COURSES) {
    assert.equal(course.modules.length, 4);
    assert.ok(['Iniciante', 'Intermediário', 'Avançado'].includes(course.level));
    assert.ok(course.targetTab in TAB_ROUTE_MAP);

    course.modules.forEach((mod, idx) => {
      assert.equal(mod.number, idx + 1);
      assert.ok(!moduleIds.has(mod.id), `Duplicate module id: ${mod.id}`);
      moduleIds.add(mod.id);
      assert.ok(mod.paragraphs.length >= 3);
      assert.ok(mod.numericExample.steps.length >= 3);
      assert.ok(mod.keyConcepts.length >= 3);
      assert.ok(mod.targetTab in TAB_ROUTE_MAP);
    });
  }

  assert.equal(moduleIds.size, 16);
});

test('DinhEuro Academy contains non-empty FAQ entries and storage key', () => {
  assert.ok(ACADEMY_FAQ.length >= 4);
  for (const faq of ACADEMY_FAQ) {
    assert.ok(faq.question.trim().length > 10);
    assert.ok(faq.answer.trim().length > 20);
  }
  assert.equal(typeof ACADEMY_PROGRESS_STORAGE_KEY, 'string');
  assert.ok(ACADEMY_PROGRESS_STORAGE_KEY.length > 0);
});
