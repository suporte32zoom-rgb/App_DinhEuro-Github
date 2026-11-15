import test from 'node:test';
import assert from 'node:assert/strict';
import { detectInitialLanguage, HTML_LANG_MAP, TRANSLATIONS } from './translations.ts';

test('detectInitialLanguage prioritizes valid stored language preference', () => {
  assert.equal(detectInitialLanguage('en-US', 'es'), 'es');
  assert.equal(detectInitialLanguage('pt-BR', 'en'), 'en');
  assert.equal(detectInitialLanguage('fr-FR', 'pt'), 'pt');
});

test('detectInitialLanguage routes pt*, es*, and defaults all other locales to English', () => {
  assert.equal(detectInitialLanguage('pt-BR', null), 'pt');
  assert.equal(detectInitialLanguage('pt-PT', null), 'pt');
  assert.equal(detectInitialLanguage('es-ES', null), 'es');
  assert.equal(detectInitialLanguage('es-419', null), 'es');
  assert.equal(detectInitialLanguage('en-US', null), 'en');
  assert.equal(detectInitialLanguage('de-DE', null), 'en');
  assert.equal(detectInitialLanguage('ja-JP', null), 'en');
  assert.equal(detectInitialLanguage('', null), 'en');
});

test('all three translation dictionaries (pt, en, es) share identical section structure', () => {
  assert.deepEqual(Object.keys(TRANSLATIONS.pt), Object.keys(TRANSLATIONS.en));
  assert.deepEqual(Object.keys(TRANSLATIONS.pt), Object.keys(TRANSLATIONS.es));
  assert.equal(HTML_LANG_MAP.pt, 'pt-BR');
  assert.equal(HTML_LANG_MAP.en, 'en');
  assert.equal(HTML_LANG_MAP.es, 'es');
});
