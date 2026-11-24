import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanonicalUrl,
  buildStructuredDataSchemas,
  GA_MEASUREMENT_ID,
  normalizeRoutePath,
  ROUTE_SEO_METADATA,
  syncCanonicalLink,
  syncHreflangLinks,
  trackAnalyticsPageView,
} from './seo.ts';
import { TAB_ROUTE_MAP, type NavigationTab } from '../context/MarketContext.tsx';

test('buildCanonicalUrl formats home and sub-routes strictly for https://dinheuro.com', () => {
  assert.equal(buildCanonicalUrl('/'), 'https://dinheuro.com/');
  assert.equal(buildCanonicalUrl(''), 'https://dinheuro.com/');
  assert.equal(buildCanonicalUrl('/mercados'), 'https://dinheuro.com/mercados');
  assert.equal(buildCanonicalUrl('/mercados/'), 'https://dinheuro.com/mercados');
  assert.equal(buildCanonicalUrl('/ferramentas?tab=cambio#top'), 'https://dinheuro.com/ferramentas');
  assert.equal(buildCanonicalUrl('academy'), 'https://dinheuro.com/academy');
});

test('normalizeRoutePath strips trailing slashes while keeping root', () => {
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('/Mercados/'), '/mercados');
  assert.equal(normalizeRoutePath('/fluxo-tape-reading/?a=1'), '/fluxo-tape-reading');
});

test('syncCanonicalLink maintains strictly one canonical link tag in head', () => {
  const createdNodes: Array<{ attrs: Record<string, string>; removed?: boolean }> = [];
  const fakeHead = {
    querySelectorAll: () =>
      createdNodes
        .filter((n) => !n.removed)
        .map((n) => ({
          getAttribute: (k: string) => n.attrs[k] ?? null,
          setAttribute: (k: string, v: string) => {
            n.attrs[k] = v;
          },
          parentNode: {
            removeChild: () => {
              n.removed = true;
            },
          },
        })),
    appendChild: (node: { attrs: Record<string, string> }) => {
      createdNodes.push(node);
    },
  };
  const fakeDoc = {
    head: fakeHead,
    createElement: () => ({
      attrs: {} as Record<string, string>,
      setAttribute(k: string, v: string) {
        this.attrs[k] = v;
      },
      getAttribute(k: string) {
        return this.attrs[k] ?? null;
      },
    }),
  } as unknown as Document;

  const first = syncCanonicalLink('/mercados', fakeDoc);
  assert.equal(first, 'https://dinheuro.com/mercados');
  assert.equal(createdNodes.filter((n) => !n.removed).length, 1);

  const second = syncCanonicalLink('/ferramentas/', fakeDoc);
  assert.equal(second, 'https://dinheuro.com/ferramentas');
  assert.equal(createdNodes.filter((n) => !n.removed).length, 1);
  assert.equal(createdNodes[0].attrs.href, 'https://dinheuro.com/ferramentas');
});

test('ROUTE_SEO_METADATA provides unique long-tail SEO titles and descriptions for every route and language', () => {
  const allTabs = Object.keys(TAB_ROUTE_MAP) as NavigationTab[];
  for (const tab of allTabs) {
    for (const lang of ['pt', 'en', 'es'] as const) {
      const entry = ROUTE_SEO_METADATA[tab][lang];
      assert.ok(entry.title.length >= 15, `Missing title for ${tab} (${lang})`);
      assert.ok(entry.description.length >= 40, `Missing description for ${tab} (${lang})`);
      assert.ok(entry.keywords.length >= 10, `Missing keywords for ${tab} (${lang})`);
    }
  }
});

test('buildStructuredDataSchemas produces valid NewsMediaOrganization, WebSite SearchAction, and FinancialService/WebApplication JSON-LD', () => {
  const { organizationSchema, websiteSchema, financialServiceSchema } =
    buildStructuredDataSchemas('pt');
  assert.equal(organizationSchema['@type'], 'NewsMediaOrganization');
  assert.equal(organizationSchema.name, 'DinhEuro');
  assert.equal(organizationSchema.url, 'https://dinheuro.com');
  assert.equal(organizationSchema.logo.url, 'https://dinheuro.com/logo.png');
  assert.equal(organizationSchema.areaServed, 'Worldwide');
  assert.ok(organizationSchema.knowsAbout.includes('Acordo União Europeia-Mercosul'));
  assert.ok(organizationSchema.knowsAbout.includes('Câmbio EUR/BRL'));
  assert.equal(websiteSchema['@type'], 'WebSite');
  assert.equal(websiteSchema.potentialAction['@type'], 'SearchAction');
  assert.equal(
    websiteSchema.potentialAction.target.urlTemplate,
    'https://dinheuro.com/?q={search_term_string}'
  );
  assert.deepEqual(financialServiceSchema['@type'], ['FinancialService', 'WebApplication']);
  assert.equal(financialServiceSchema.logo, 'https://dinheuro.com/logo.png');
  assert.equal(financialServiceSchema.areaServed, 'Worldwide');
  assert.equal(financialServiceSchema.isAccessibleForFree, true);
  assert.equal(financialServiceSchema.offers.price, '0');
});

test('ROUTE_SEO_METADATA injects EU-Mercosur, FX, global equity, and E-E-A-T macro keywords across target routes', () => {
  assert.ok(ROUTE_SEO_METADATA.dashboard.pt.title.includes('União Europeia – Mercosul'));
  assert.ok(ROUTE_SEO_METADATA.dashboard.pt.description.includes('Acesso livre, sem cadastro'));
  assert.ok(ROUTE_SEO_METADATA.dashboard.pt.keywords.includes('acordo união europeia mercosul economia'));
  assert.ok(ROUTE_SEO_METADATA.ferramentas.pt.keywords.includes('spread bancário e iof remessa'));
  assert.ok(ROUTE_SEO_METADATA.mercados.pt.keywords.includes('fechamento ibovespa hoje'));
  assert.ok(ROUTE_SEO_METADATA.graficos.pt.keywords.includes('gráfico d3 v7 análise técnica'));
  assert.ok(
    ROUTE_SEO_METADATA.renda_fixa.pt.keywords.includes('como funciona o modelo black scholes opções')
  );
  assert.ok(ROUTE_SEO_METADATA.noticias.pt.keywords.includes('boletim focus banco central resumo'));
});

test('buildEditorialArticlesSchema outputs valid NewsArticle and Dossier Article JSON-LD linked to Organization', async () => {
  const { buildEditorialArticlesSchema, getInstitutionalDossiersSchemaInputs } = await import(
    './seo.ts'
  );
  const dossiers = getInstitutionalDossiersSchemaInputs('pt');
  assert.equal(dossiers.length, 3);

  const listSchema = buildEditorialArticlesSchema('pt', dossiers);
  assert.equal(listSchema['@type'], 'ItemList');
  assert.ok('itemListElement' in listSchema);
  assert.equal(listSchema.numberOfItems, 3);
  assert.equal(listSchema.itemListElement[0].item['@type'], 'Article');
  assert.equal(listSchema.itemListElement[0].item.publisher['@type'], 'Organization');
  assert.equal(listSchema.itemListElement[0].item.publisher.logo.url, 'https://dinheuro.com/logo.png');

  const singleSchema = buildEditorialArticlesSchema('pt', dossiers, {
    id: 'test-insight',
    schemaType: 'NewsArticle',
    headline: 'Teste Insight do Dia',
    description: 'Resumo executivo',
    datePublished: '2026-11-17',
    imageUrl: '/assets/aistudio/image_c38b3f81.png',
  });
  assert.equal(singleSchema['@type'], 'NewsArticle');
  assert.ok('image' in singleSchema);
  assert.deepEqual(singleSchema.image, ['https://dinheuro.com/assets/aistudio/image_c38b3f81.png']);
});

test('APEC 2026 and ALADI 2026 editorial insights preserve prior items up to 12 max cards and emit valid NewsArticle image JSON-LD', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { buildEditorialArticlesSchema } = await import('./seo.ts');

  const source = fs.readFileSync(
    path.resolve(process.cwd(), 'src/data/dailyInsights.ts'),
    'utf8'
  );
  assert.ok(source.includes('export const MAX_DAILY_INSIGHTS = 12;'));
  const idMatches = source.match(/^\s+id:\s*'[^']+',/gm) || [];
  assert.equal(idMatches.length, 12);
  assert.ok(source.includes("id: 'nvidia-retorno-jensen-huang-ceo-2026'"));
  assert.ok(source.includes("id: 'cop31-fracasso-antalia-cinco-fatores-2026'"));
  assert.ok(source.includes("dateAuthor: '23/11/2026 • Por Américo Martins'"));
  assert.ok(source.includes('foi diretor da BBC de Londres e VP de Conteúdo da CNN'));
  assert.ok(source.includes("id: 'acordo-comercial-ue-mercosul-2026'"));
  assert.ok(source.includes("id: 'mdic-consulta-publica-salvaguardas-bilaterais-2026'"));
  assert.ok(source.includes("id: 'anthropic-ipo-turbulencia-wall-street-2026'"));
  assert.ok(source.includes("id: 'mdic-acordo-mercosul-ue-exportacoes-21-por-cento-2026'"));
  assert.ok(source.includes("id: 'trump-inteligencia-jensen-huang-nvidia-2026'"));
  assert.ok(source.includes("id: 'terras-raras-disparidade-precos-brasil-china-2026'"));
  assert.ok(source.includes("id: 'greves-jovens-europa-custo-vida-2026'"));
  assert.ok(source.includes("id: 'coinbase-deribit-aquisicao-infraestrutura-2026'"));
  assert.ok(source.includes("id: 'apec-2026-trump-xi-putin-shenzhen'"));
  assert.ok(source.includes("id: 'aladi-cosmeticos-exportacao-brasil-2026'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_41c94597.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_71c949d8.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_0205078f.png'"));
  assert.ok(source.includes('/assets/aistudio/expected-gains-from-redu_9daa9c58.png'));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_74407743.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_31f7e667.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_fae53297.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_47a5c2bb.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_c7f7f8fe.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_9efbf558.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_312cc483.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_e7fa591e.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_559daecb.png'"));
  assert.ok(
    source.includes(
      'Donald Trump, Xi Jinping e Vladimir Putin durante encontro na Cúpula da APEC 2026 em Shenzhen, na China'
    )
  );

  const newsViewSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/views/NewsView.tsx'),
    'utf8'
  );
  assert.ok(!newsViewSource.includes('nvidia-retorno-jensen-huang-ceo-2026'));
  assert.ok(!newsViewSource.includes('anthropic-ipo-turbulencia-wall-street-2026'));
  assert.ok(!newsViewSource.includes('trump-inteligencia-jensen-huang-nvidia-2026'));
  assert.ok(!newsViewSource.includes('INITIAL_NEWS'));
  assert.ok(!newsViewSource.includes('tNews.readFull'));
  assert.ok(newsViewSource.includes('NEWS_EDITORIAL_ARTICLES'));
  assert.ok(newsViewSource.includes('tNews.editorialCriteria.title'));

  const { NEWS_EDITORIAL_ARTICLES } = await import('../data/newsEditorialArticles.ts');
  assert.equal(NEWS_EDITORIAL_ARTICLES.length, 9);
  const expectedNewsIds = [
    'bcb-selic-focus-vs-bce-politica-monetaria-2026',
    'dinamica-cambio-comercial-eur-usd-comercio-exterior-2026',
    'fluxo-estrangeiro-b3-commodities-brent-minerio-2026',
    'infraestrutura-digital-real-digital-drex-2026',
    'acordo-comercial-ue-mercosul-2026',
    'mdic-acordo-mercosul-ue-exportacoes-21-por-cento-2026',
    'mdic-consulta-publica-salvaguardas-bilaterais-2026',
    'terras-raras-disparidade-precos-brasil-china-2026',
    'aladi-cosmeticos-exportacao-brasil-2026',
  ];
  for (const expectedId of expectedNewsIds) {
    assert.ok(
      NEWS_EDITORIAL_ARTICLES.some((article) => article.id === expectedId),
      `Missing expected news editorial article: ${expectedId}`
    );
  }
  const forbiddenTechTerms = /finnhub|awesomeapi|coingecko|brapi|yahoo\s*finance|vite|github|cloudflare|recharts/i;
  for (const article of NEWS_EDITORIAL_ARTICLES) {
    for (const locale of ['pt', 'en', 'es'] as const) {
      const content = article.translations[locale];
      const plainText = content.fullContent
        .join(' ')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
        .trim();
      const wordCount = plainText.split(/\s+/).filter(Boolean).length;
      assert.ok(
        wordCount >= 450,
        `Article ${article.id} (${locale}) must have at least 450 words, found ${wordCount}`
      );
      assert.ok(content.source.length > 10, `Article ${article.id} (${locale}) must cite official sources`);
      assert.ok(!forbiddenTechTerms.test(plainText), `Forbidden term in ${article.id} (${locale})`);
    }
  }

  const { VIEWS_TRANSLATIONS } = await import('../i18n/viewsTranslations.ts');
  for (const locale of ['pt', 'en', 'es'] as const) {
    const newsT = VIEWS_TRANSLATIONS[locale].news;
    assert.ok(!/veículos oficiais de imprensa|official press outlets|medios de prensa oficiales/i.test(newsT.subtitle));
    assert.equal(newsT.editorialCriteria.points.length, 4);
    assert.ok(newsT.editorialCriteria.intro.length > 40);
    assert.ok(newsT.editorialCriteria.disclaimer.length > 20);
  }

  const schema = buildEditorialArticlesSchema('pt', [], {
    id: 'acordo-comercial-ue-mercosul-2026',
    schemaType: 'NewsArticle',
    headline:
      'Acordo comercial UE–Mercosul: por que é importante e quais os impactos econômicos projetados até 2040',
    description:
      'Com entrada em vigor provisória em 1º de maio de 2026, o acordo cria uma zona comercial de 700 milhões de pessoas e projeta aumento de mais de € 77,6 bilhões no PIB europeu, avanço de 39% nas exportações anuais da UE e até 600 mil empregos apoiados até 2040.',
    articleSection: 'Comércio Exterior & Acordo UE–Mercosul',
    datePublished: '2026-11-21',
    imageUrl: '/assets/aistudio/image_0205078f.png',
    keywords: [
      'acordo comercial ue mercosul 2026',
      'exportações agroalimentares ue 2040',
      'matérias-primas críticas nióbio mercosul',
    ],
  });
  assert.equal(schema['@type'], 'NewsArticle');
  assert.ok('image' in schema);
  assert.deepEqual(schema.image, ['https://dinheuro.com/assets/aistudio/image_0205078f.png']);
  assert.equal(schema.datePublished, '2026-11-21');

  const cssSource = fs.readFileSync(path.resolve(process.cwd(), 'src/index.css'), 'utf8');
  assert.ok(cssSource.includes(':not([data-overlay-dark] *)'));
  const modalSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/EditorialInsightModal.tsx'),
    'utf8'
  );
  assert.ok(/data-overlay-dark="true"\s+className="pointer-events-none absolute inset-0/.test(newsViewSource));
  assert.ok(modalSource.includes('data-overlay-dark="true"\n            className="pointer-events-none absolute inset-0'));
});

test('syncHreflangLinks maintains global pt-BR, en, es, and x-default alternate links without duplicates and index.html includes GA4 + hreflang', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');

  const createdLinks: Array<{ attrs: Record<string, string>; removed?: boolean }> = [];
  const fakeHead = {
    querySelectorAll: () =>
      createdLinks
        .filter((n) => !n.removed)
        .map((n) => ({
          getAttribute: (k: string) => n.attrs[k] ?? null,
          setAttribute: (k: string, v: string) => {
            n.attrs[k] = v;
          },
          parentNode: {
            removeChild: () => {
              n.removed = true;
            },
          },
        })),
    appendChild: (node: { attrs: Record<string, string> }) => {
      createdLinks.push(node);
    },
  };
  const fakeDoc = {
    head: fakeHead,
    createElement: () => ({
      attrs: {} as Record<string, string>,
      setAttribute(k: string, v: string) {
        this.attrs[k] = v;
      },
      getAttribute(k: string) {
        return this.attrs[k] ?? null;
      },
    }),
  } as unknown as Document;

  const homeTargets = syncHreflangLinks('/', fakeDoc);
  assert.deepEqual(homeTargets, [
    { hreflang: 'pt-BR', href: 'https://dinheuro.com/' },
    { hreflang: 'en', href: 'https://dinheuro.com/' },
    { hreflang: 'es', href: 'https://dinheuro.com/' },
    { hreflang: 'x-default', href: 'https://dinheuro.com/' },
  ]);
  assert.equal(createdLinks.filter((n) => !n.removed).length, 4);

  const marketsTargets = syncHreflangLinks('/mercados/', fakeDoc);
  assert.equal(createdLinks.filter((n) => !n.removed).length, 4);
  assert.ok(marketsTargets.every((t) => t.href === 'https://dinheuro.com/mercados'));

  const events: unknown[][] = [];
  const fakeWin = {
    gtag: (...args: unknown[]) => {
      events.push(args);
    },
  } as unknown as Window & { gtag?: (...args: unknown[]) => void };

  const sent = trackAnalyticsPageView('/mercados', 'Mercados | DinhEuro', 'https://dinheuro.com/mercados', fakeWin);
  assert.equal(sent, true);
  assert.equal(events.length, 1);
  assert.equal(events[0][0], 'event');
  assert.equal(events[0][1], 'page_view');
  assert.deepEqual(events[0][2], {
    send_to: GA_MEASUREMENT_ID,
    page_title: 'Mercados | DinhEuro',
    page_location: 'https://dinheuro.com/mercados',
    page_path: '/mercados',
  });

  const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
  assert.ok(indexHtml.includes('<link rel="alternate" hreflang="pt-BR" href="https://dinheuro.com/" />'));
  assert.ok(indexHtml.includes('<link rel="alternate" hreflang="en" href="https://dinheuro.com/" />'));
  assert.ok(indexHtml.includes('<link rel="alternate" hreflang="es" href="https://dinheuro.com/" />'));
  assert.ok(indexHtml.includes('<link rel="alternate" hreflang="x-default" href="https://dinheuro.com/" />'));
  assert.ok(indexHtml.includes('G-XS3S97LWQC'));
  assert.ok(indexHtml.includes('"areaServed":"Worldwide"'));

  const dashboardSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/views/DashboardView.tsx'),
    'utf8'
  );
  const mercosulIdx = dashboardSource.indexOf('<MercosulEuDossierPanel />');
  const mobileInsightsIdx = dashboardSource.indexOf('<DailyInsightsSidebar variant="mobile" />');
  const drexIdx = dashboardSource.indexOf('<DrexDossierPanel />');
  const desktopInsightsIdx = dashboardSource.indexOf('<DailyInsightsSidebar />');
  assert.ok(mercosulIdx > 0 && mobileInsightsIdx > mercosulIdx && drexIdx > mobileInsightsIdx);
  assert.ok(desktopInsightsIdx > drexIdx);

  const sidebarSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/DailyInsightsSidebar.tsx'),
    'utf8'
  );
  assert.ok(sidebarSource.includes("isMobileVariant ? 'block lg:hidden' : 'hidden lg:block lg:mt-6'"));
});

test('Home editorial FAQ block and both institutional dossiers have complete content across PT, EN, and ES', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { TRANSLATIONS } = await import('../i18n/translations.ts');
  const { MERCOSUL_EU_DOSSIER_DATA, DREX_DOSSIER_DATA } = await import('../i18n/dossiers.ts');

  assert.equal(
    TRANSLATIONS.pt.seoBlock.heading,
    'Sobre o Portal DinhEuro & Perguntas Frequentes (FAQ)'
  );

  for (const lang of ['pt', 'en', 'es'] as const) {
    const seoBlock = TRANSLATIONS[lang].seoBlock;
    assert.ok(seoBlock.lead.length >= 120, `seoBlock.lead too short in ${lang}`);
    assert.equal(seoBlock.faqItems.length, 4, `Expected 4 FAQ items in ${lang}`);
    for (const faq of seoBlock.faqItems) {
      assert.ok(faq.question.length >= 20, `FAQ question too short in ${lang}`);
      assert.ok(faq.answer.length >= 80, `FAQ answer too short in ${lang}`);
    }

    const mercosul = MERCOSUL_EU_DOSSIER_DATA[lang];
    assert.equal(mercosul.sections.length, 17, `Expected 17 sections in Mercosul dossier (${lang})`);
    for (const sec of mercosul.sections) {
      assert.ok(
        sec.paragraphs.length >= 2,
        `Mercosul section ${sec.id} (${lang}) should have multi-paragraph explanation`
      );
      for (const p of sec.paragraphs) {
        assert.ok(p.trim().length >= 40, `Empty/short paragraph in ${sec.id} (${lang})`);
      }
    }

    const drex = DREX_DOSSIER_DATA[lang];
    assert.equal(drex.sections.length, 3, `Expected 3 sections in Drex dossier (${lang})`);
    for (const sec of drex.sections) {
      assert.ok(
        sec.paragraphs.length >= 2,
        `Drex section ${sec.id} (${lang}) should have multi-paragraph explanation`
      );
      for (const p of sec.paragraphs) {
        assert.ok(p.trim().length >= 40, `Empty/short paragraph in ${sec.id} (${lang})`);
      }
    }
  }

  const forbiddenTerms = /\b(finnhub|awesomeapi|coingecko|brapi|vite|github|cloudflare)\b/i;
  const homeFaqSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/HomeSeoEditorialSection.tsx'),
    'utf8'
  );
  const insightsSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/data/dailyInsights.ts'),
    'utf8'
  );
  assert.ok(!forbiddenTerms.test(homeFaqSource), 'HomeSeoEditorialSection must not expose technical providers or build tools');
  assert.ok(!forbiddenTerms.test(insightsSource), 'dailyInsights.ts must not expose technical providers or build tools');
});

test('Markets editorial reading guide and FAQ contain complete PT/EN/ES sections without exposing technical provider names', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { TRANSLATIONS } = await import('../i18n/translations.ts');

  assert.equal(
    TRANSLATIONS.pt.markets.editorialGuide.title,
    'Como Interpretar os Mercados Globais, Câmbio, Commodities e B3'
  );
  assert.equal(
    TRANSLATIONS.pt.markets.faq.title,
    'Perguntas Frequentes sobre Cotações e Mercados Globais'
  );

  const forbiddenTerms = /\b(finnhub|awesomeapi|coingecko|brapi|yahoo\s*finance|vite|github|cloudflare)\b/i;

  for (const lang of ['pt', 'en', 'es'] as const) {
    const guide = TRANSLATIONS[lang].markets.editorialGuide;
    const faq = TRANSLATIONS[lang].markets.faq;
    assert.equal(guide.sections.length, 4, `Expected 4 market guide subsections in ${lang}`);
    assert.equal(faq.items.length, 4, `Expected 4 market FAQ items in ${lang}`);

    for (const sec of guide.sections) {
      assert.ok(sec.title.length >= 15, `Guide section title too short in ${lang}`);
      assert.ok(sec.body.length >= 120, `Guide section body too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(sec.body), `Forbidden technical name in markets guide (${lang})`);
    }
    for (const item of faq.items) {
      assert.ok(item.question.length >= 20, `Markets FAQ question too short in ${lang}`);
      assert.ok(item.answer.length >= 80, `Markets FAQ answer too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(item.answer), `Forbidden technical name in markets FAQ (${lang})`);
    }
  }

  const marketsViewSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/views/MarketsView.tsx'),
    'utf8'
  );
  assert.ok(marketsViewSource.includes('t.markets.editorialGuide.title'));
  assert.ok(marketsViewSource.includes('t.markets.faq.title'));
  assert.ok(!forbiddenTerms.test(marketsViewSource), 'MarketsView.tsx must not expose technical providers or build tools');
});

test('Portfolio page removes Recharts visible reference and renders complete multi-currency editorial guide and FAQ across PT/EN/ES', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { VIEWS_TRANSLATIONS } = await import('../i18n/viewsTranslations.ts');

  assert.equal(
    VIEWS_TRANSLATIONS.pt.portfolio.perfSectionSubtitle,
    'Curva de evolução patrimonial, custo investido e comparativo percentual por ativo em tempo real.'
  );
  assert.equal(
    VIEWS_TRANSLATIONS.pt.portfolio.editorialGuide.title,
    'Guia Prático de Gestão de Carteira Global e Avaliação Patrimonial'
  );
  assert.equal(
    VIEWS_TRANSLATIONS.pt.portfolio.faq.title,
    'Perguntas Frequentes sobre o Gerenciador de Carteiras'
  );

  const forbiddenTerms = /\b(recharts|finnhub|awesomeapi|coingecko|brapi|yahoo\s*finance|vite|github|cloudflare|localstorage)\b/i;

  for (const lang of ['pt', 'en', 'es'] as const) {
    const port = VIEWS_TRANSLATIONS[lang].portfolio;
    assert.ok(!forbiddenTerms.test(port.perfSectionSubtitle), `perfSectionSubtitle must not expose Recharts in ${lang}`);
    assert.equal(port.editorialGuide.sections.length, 4, `Expected 4 portfolio guide blocks in ${lang}`);
    assert.equal(port.faq.items.length, 4, `Expected 4 portfolio FAQ items in ${lang}`);

    for (const sec of port.editorialGuide.sections) {
      assert.ok(sec.title.length >= 15, `Portfolio guide block title too short in ${lang}`);
      assert.ok(sec.body.length >= 120, `Portfolio guide block body too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(sec.body), `Forbidden technical name in portfolio guide (${lang})`);
    }
    for (const item of port.faq.items) {
      assert.ok(item.question.length >= 20, `Portfolio FAQ question too short in ${lang}`);
      assert.ok(item.answer.length >= 80, `Portfolio FAQ answer too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(item.answer), `Forbidden technical name in portfolio FAQ (${lang})`);
    }
  }

  const portfolioViewSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/views/PortfolioView.tsx'),
    'utf8'
  );
  assert.ok(portfolioViewSource.includes('tPort.editorialGuide.title'));
  assert.ok(portfolioViewSource.includes('tPort.faq.title'));
  assert.ok(!forbiddenTerms.test(portfolioViewSource), 'PortfolioView.tsx must not expose technical libraries or providers');
});

test('Brokers Guide renders comparative editorial guide and 4-item FAQ across PT/EN/ES with sober language and zero technical provider names', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { BROKERS_UI } = await import('../i18n/brokersTranslations.ts');

  assert.equal(
    BROKERS_UI.pt.editorialGuide.title,
    'Como Comparar Corretoras no Brasil, no Exterior e no Mercado Cripto'
  );
  assert.equal(
    BROKERS_UI.pt.faq.title,
    'Perguntas Frequentes sobre Corretoras e Contas Globais'
  );

  const forbiddenTerms = /\b(recharts|finnhub|awesomeapi|coingecko|brapi|yahoo\s*finance|vite|github|cloudflare|localstorage)\b/i;
  const hypeSuperlatives = /\b(absoluta|do planeta|inquestionável|impecável|revolucionou|unmatched|on earth|impeccable|del planeta|absoluto)\b/i;

  for (const lang of ['pt', 'en', 'es'] as const) {
    const ui = BROKERS_UI[lang];
    assert.equal(ui.editorialGuide.sections.length, 4, `Expected 4 broker guide blocks in ${lang}`);
    assert.equal(ui.faq.items.length, 4, `Expected 4 broker FAQ items in ${lang}`);

    for (const sec of ui.editorialGuide.sections) {
      assert.ok(sec.title.length >= 15, `Broker guide block title too short in ${lang}`);
      assert.ok(sec.body.length >= 150, `Broker guide block body too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(sec.body), `Forbidden technical name in brokers guide (${lang})`);
      assert.ok(!hypeSuperlatives.test(sec.body), `Overly promotional superlative in brokers guide (${lang})`);
    }
    for (const item of ui.faq.items) {
      assert.ok(item.question.length >= 20, `Broker FAQ question too short in ${lang}`);
      assert.ok(item.answer.length >= 80, `Broker FAQ answer too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(item.answer), `Forbidden technical name in brokers FAQ (${lang})`);
      assert.ok(!hypeSuperlatives.test(item.answer), `Overly promotional superlative in brokers FAQ (${lang})`);
    }
  }

  const brokersViewSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/views/BrokersView.tsx'),
    'utf8'
  );
  const brokersTranslationsSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/i18n/brokersTranslations.ts'),
    'utf8'
  );
  assert.ok(brokersViewSource.includes('tBrokers.editorialGuide.title'));
  assert.ok(brokersViewSource.includes('tBrokers.faq.title'));
  assert.ok(!forbiddenTerms.test(brokersViewSource), 'BrokersView.tsx must not expose technical providers or build tools');
  assert.ok(!hypeSuperlatives.test(brokersViewSource), 'BrokersView.tsx should avoid absolute promotional superlatives');
  assert.ok(!hypeSuperlatives.test(brokersTranslationsSource), 'brokersTranslations.ts should avoid absolute promotional superlatives');
});

test('/day-trade educational restructuring, JSON-LD organization email fix, and base HTML integrity', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { FUTURES_EDUCATION_COPY } = await import('../i18n/futuresEducationTranslations.ts');

  const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
  const seoSource = fs.readFileSync(path.resolve(process.cwd(), 'src/utils/seo.ts'), 'utf8');
  const dayTradeSource = fs.readFileSync(path.resolve(process.cwd(), 'src/views/DayTradeView.tsx'), 'utf8');

  // 1. Organization JSON-LD email fix
  assert.ok(indexHtml.includes('"email":"admin@dinheuro.com"'), 'index.html organization JSON-LD must use admin@dinheuro.com');
  assert.ok(!indexHtml.includes('admin@dinheiro.com'), 'index.html must not contain admin@dinheiro.com');
  assert.ok(seoSource.includes("email: 'admin@dinheuro.com'"), 'seo.ts organization schema must use admin@dinheuro.com');
  assert.ok(!seoSource.includes('admin@dinheiro.com'), 'seo.ts must not contain admin@dinheiro.com');

  // 2. Preserve AdSense, GA4, and PWA manifest in index.html
  assert.ok(indexHtml.includes('ca-pub-7845011898892939'), 'Google AdSense client ID must remain in index.html');
  assert.ok(indexHtml.includes('G-XS3S97LWQC'), 'Google Analytics ID must remain in index.html');
  assert.ok(indexHtml.includes('./manifest.webmanifest'), 'PWA manifest link must remain in index.html');
  assert.ok(indexHtml.includes('serviceWorker'), 'PWA service worker registration must remain in index.html');

  // 3. Educational /day-trade metadata without speculative scalping promises
  for (const lang of ['pt', 'en', 'es'] as const) {
    const meta = ROUTE_SEO_METADATA.daytrade[lang];
    assert.ok(!/scalping|fique rico|lucro garantido|ganhos rápidos/i.test(meta.title), `daytrade title in ${lang} must avoid speculative appeal`);
    assert.ok(!/scalping|fique rico|lucro garantido|ganhos rápidos/i.test(meta.description), `daytrade description in ${lang} must avoid speculative appeal`);
    assert.ok(meta.title.length >= 30 && meta.title.length <= 70, `daytrade title length check (${lang}): ${meta.title.length}`);
    assert.ok(meta.description.length >= 110 && meta.description.length <= 170, `daytrade description length check (${lang}): ${meta.description.length}`);
  }

  // 4. Editorial content, FAQ, and risk disclaimer across PT/EN/ES
  const forbiddenTerms = /\b(recharts|finnhub|awesomeapi|coingecko|brapi|yahoo\s*finance|vite|github|cloudflare)\b/i;
  for (const lang of ['pt', 'en', 'es'] as const) {
    const copy = FUTURES_EDUCATION_COPY[lang];
    assert.equal(copy.sections.length, 4, `Expected 4 educational sections in ${lang}`);
    assert.equal(copy.faqItems.length, 5, `Expected 5 FAQ items in ${lang}`);
    assert.ok(copy.topWarningBody.length >= 80, `Top educational risk notice missing or too short in ${lang}`);
    assert.ok(copy.footerDisclaimerBody.length >= 120, `Bottom disclaimer missing or too short in ${lang}`);
    for (const sec of copy.sections) {
      assert.ok(sec.title.length >= 15, `Futures section title too short in ${lang}`);
      assert.ok(sec.body.join(' ').length >= 180, `Futures section content too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(sec.body.join(' ')), `Forbidden technical term in futures section (${lang})`);
    }
    for (const item of copy.faqItems) {
      assert.ok(item.question.length >= 20, `Futures FAQ question too short in ${lang}`);
      assert.ok(item.answer.length >= 80, `Futures FAQ answer too short in ${lang}`);
      assert.ok(!forbiddenTerms.test(item.answer), `Forbidden technical term in futures FAQ (${lang})`);
    }
  }

  assert.ok(!forbiddenTerms.test(dayTradeSource), 'DayTradeView.tsx must not expose technical providers or build tools');
});
