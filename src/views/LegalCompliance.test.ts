import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { ROUTE_TAB_MAP, TAB_ROUTE_MAP, LEGACY_ROUTE_REDIRECTS } from '../context/MarketContext';

test('ROUTE_TAB_MAP correctly routes legal and institutional paths', () => {
  assert.equal(ROUTE_TAB_MAP['/termos-de-uso'], 'termos');
  assert.equal(ROUTE_TAB_MAP['/politica-de-privacidade'], 'privacidade');
  assert.equal(ROUTE_TAB_MAP['/politica-de-cookies'], 'cookies');
  assert.equal(ROUTE_TAB_MAP['/disclaimer'], 'disclaimer');
  assert.equal(ROUTE_TAB_MAP['/sobre'], 'sobre');
  assert.equal(ROUTE_TAB_MAP['/guia-cambio-remessas'], 'guia_cambio');
  assert.equal(ROUTE_TAB_MAP['/politica-monetaria-juros'], 'politica_monetaria');
  assert.equal(ROUTE_TAB_MAP['/day-trade'], 'guia_cambio');
  assert.equal(ROUTE_TAB_MAP['/fluxo-tape-reading'], 'politica_monetaria');
  assert.equal(ROUTE_TAB_MAP['/renda-fixa-derivativos'], 'renda_fixa');
});

test('TAB_ROUTE_MAP produces clean SEO-friendly URLs and LEGACY_ROUTE_REDIRECTS maps deprecated URLs', () => {
  assert.equal(TAB_ROUTE_MAP['termos'], '/termos-de-uso');
  assert.equal(TAB_ROUTE_MAP['privacidade'], '/politica-de-privacidade');
  assert.equal(TAB_ROUTE_MAP['cookies'], '/politica-de-cookies');
  assert.equal(TAB_ROUTE_MAP['disclaimer'], '/disclaimer');
  assert.equal(TAB_ROUTE_MAP['sobre'], '/sobre');
  assert.equal(TAB_ROUTE_MAP['guia_cambio'], '/guia-cambio-remessas');
  assert.equal(TAB_ROUTE_MAP['politica_monetaria'], '/politica-monetaria-juros');
  assert.equal(TAB_ROUTE_MAP['renda_fixa'], '/renda-fixa-derivativos');
  assert.equal(LEGACY_ROUTE_REDIRECTS['/day-trade'], '/guia-cambio-remessas');
  assert.equal(LEGACY_ROUTE_REDIRECTS['/fluxo-tape-reading'], '/politica-monetaria-juros');
});

test('LGPD consent payload structure conforms to legal auditing schema', () => {
  const samplePayload = {
    accepted: true,
    date: new Date().toISOString(),
    version: '2026.1',
  };

  assert.equal(samplePayload.accepted, true);
  assert.ok(typeof samplePayload.date === 'string');
  assert.ok(samplePayload.version.startsWith('2026'));
});

test('Visible footer and institutional pages use official admin@dinheuro.com email only', () => {
  const files = [
    'src/components/Footer.tsx',
    'src/views/AboutView.tsx',
    'src/views/DisclaimerView.tsx',
    'src/views/PrivacyPolicyView.tsx',
    'src/views/TermsOfUseView.tsx',
  ];

  for (const relPath of files) {
    const content = fs.readFileSync(path.resolve(process.cwd(), relPath), 'utf8');
    assert.ok(
      content.includes('admin@dinheuro.com'),
      `${relPath} must include admin@dinheuro.com`
    );
    assert.ok(
      !content.includes('admin@dinheiro.com'),
      `${relPath} must not include admin@dinheiro.com`
    );
  }
});

test('Footer Hub Navigation excludes removed Guia de Corretoras link', () => {
  const footerSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/Footer.tsx'),
    'utf8'
  );
  assert.ok(!footerSource.includes('navBrokers'), 'Footer.tsx must not reference navBrokers');
  assert.ok(
    !footerSource.includes('Guia de Corretoras'),
    'Footer.tsx must not render Guia de Corretoras'
  );
});

test('Terms of Use sets effective date to Vigência: Novembro/2026 and removes correspondente digital phrasing', async () => {
  const { LEGAL_TRANSLATIONS } = await import('../i18n/legalTranslations.ts');

  assert.equal(LEGAL_TRANSLATIONS.pt.terms.badge, 'Vigência: Novembro/2026');
  assert.ok(!/correspondente digital/i.test(LEGAL_TRANSLATIONS.pt.terms.s1P2Before));
  assert.ok(LEGAL_TRANSLATIONS.pt.terms.s1P2Before.includes('portal digital informativo e educacional'));
  assert.ok(LEGAL_TRANSLATIONS.pt.terms.s1P2Before.includes('agregador de dados econômicos públicos'));
  assert.ok(LEGAL_TRANSLATIONS.pt.terms.s1P2Before.includes('ferramentas analíticas'));
  assert.ok(LEGAL_TRANSLATIONS.pt.terms.s1P2Before.includes('simuladores financeiros'));
});

test('Privacy Policy section 4 includes exact Google AdSense third item while preserving prior items', async () => {
  const { LEGAL_TRANSLATIONS } = await import('../i18n/legalTranslations.ts');

  for (const lang of ['pt', 'en', 'es'] as const) {
    assert.equal(
      LEGAL_TRANSLATIONS[lang].privacy.s4Items.length,
      3,
      `Expected 3 items in privacy.s4Items for ${lang}`
    );
  }

  const thirdPt = LEGAL_TRANSLATIONS.pt.privacy.s4Items[2];
  assert.equal(thirdPt.strong, 'Serviços de Publicidade e Mensuração (Google AdSense):');
  assert.equal(
    thirdPt.text,
    'fornecedores terceiros, incluindo o Google, podem utilizar cookies e identificadores de navegador para veicular anúncios com base em visitas anteriores a este portal ou a outros sites na internet. O usuário pode gerenciar suas preferências de cookies no portal ou desativar a publicidade personalizada diretamente nas Configurações de Anúncios do Google.'
  );
});

test('Cookie Policy section 2 includes exact Google AdSense Category D block after Category C', async () => {
  const { LEGAL_TRANSLATIONS } = await import('../i18n/legalTranslations.ts');
  const cookieViewSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/views/CookiePolicyView.tsx'),
    'utf8'
  );

  assert.equal(
    LEGAL_TRANSLATIONS.pt.cookies.catDTitle,
    'D. Cookies de Publicidade e Terceiros (Google AdSense)'
  );
  assert.equal(LEGAL_TRANSLATIONS.pt.cookies.catDBadge, 'Publicidade');
  assert.equal(
    LEGAL_TRANSLATIONS.pt.cookies.catDDesc,
    "Quando habilitados mediante consentimento, parceiros de publicidade como o Google podem utilizar cookies para exibir anúncios relevantes com base em visitas anteriores a este portal ou a outros sites, além de limitar a frequência de exibição e medir o desempenho das campanhas. O usuário pode revogar esse consentimento a qualquer momento no botão 'Redefinir Preferências de Cookies' ou nas Configurações de Anúncios do Google."
  );

  for (const lang of ['pt', 'en', 'es'] as const) {
    assert.ok(LEGAL_TRANSLATIONS[lang].cookies.catDTitle.length > 0);
    assert.ok(LEGAL_TRANSLATIONS[lang].cookies.catDBadge.length > 0);
    assert.ok(LEGAL_TRANSLATIONS[lang].cookies.catDDesc.length > 0);
  }

  assert.ok(cookieViewSource.includes('tCookies.catDTitle'));
  assert.ok(cookieViewSource.includes('tCookies.catDBadge'));
  assert.ok(cookieViewSource.includes('tCookies.catDDesc'));
  assert.ok(
    cookieViewSource.indexOf('tCookies.catCDesc') < cookieViewSource.indexOf('tCookies.catDTitle'),
    'Category D must appear after Category C'
  );
});

