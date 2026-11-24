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

test('DinhEuro Academy highlights EUR/BRL & EU-Mercosur/ECB in Track 2, non-speculative risk focus in Track 4, and expands Glossary A-Z across PT/EN/ES', async () => {
  const {
    getLocalizedAcademyCourses,
    getLocalizedAcademyFaq,
    getLocalizedGlossaryTerms,
  } = await import('../i18n/academyTranslations.ts');

  const forbiddenTerms =
    /\b(d3\s*v7|day\s*trade\s*pro|order\s*flow\s*dom|flujo\s*dom|recharts|finnhub|awesomeapi|coingecko|brapi|yahoo\s*finance|vite|github|cloudflare|localstorage)\b/i;

  const expectedGlossaryTermsPt = [
    'Banco Central Europeu (BCE)',
    'Paridade EUR/BRL',
    'Comércio Exterior UE–Mercosul',
  ];
  const ptGlossary = getLocalizedGlossaryTerms('pt');
  for (const termTitle of expectedGlossaryTermsPt) {
    assert.ok(
      ptGlossary.some((g) => g.term === termTitle),
      `Missing expected PT glossary term: ${termTitle}`
    );
  }

  for (const lang of ['pt', 'en', 'es'] as const) {
    const courses = getLocalizedAcademyCourses(lang);
    const faq = getLocalizedAcademyFaq(lang);
    const glossary = getLocalizedGlossaryTerms(lang);

    assert.equal(courses.length, 4);
    assert.equal(glossary.length, 13, `Expected 13 glossary terms in ${lang}`);

    const track2 = courses.find((c) => c.id === 'cambio-dolar-protecao');
    assert.ok(track2, `Missing Track 2 in ${lang}`);
    const track2Text = JSON.stringify(track2);
    assert.ok(/EUR\/BRL/i.test(track2Text), `Track 2 (${lang}) must mention EUR/BRL`);
    assert.ok(/(BCE|ECB)/i.test(track2Text), `Track 2 (${lang}) must mention BCE/ECB`);
    assert.ok(/Mercosul|Mercosur/i.test(track2Text), `Track 2 (${lang}) must mention EU-Mercosur`);

    const track4 = courses.find((c) => c.id === 'fluxo-futuros-opcoes');
    assert.ok(track4, `Missing Track 4 in ${lang}`);
    const track4Text = JSON.stringify(track4);
    assert.ok(
      /(hedge|cobertura|proteção)/i.test(track4Text),
      `Track 4 (${lang}) must emphasize hedging/protection`
    );
    assert.ok(
      /(risco|risk|riesgo)/i.test(track4Text),
      `Track 4 (${lang}) must emphasize risk management`
    );

    assert.ok(!forbiddenTerms.test(JSON.stringify(courses)), `Forbidden visible term in courses (${lang})`);
    assert.ok(!forbiddenTerms.test(JSON.stringify(faq)), `Forbidden visible term in FAQ (${lang})`);
    assert.ok(!forbiddenTerms.test(JSON.stringify(glossary)), `Forbidden visible term in glossary (${lang})`);
  }
});

