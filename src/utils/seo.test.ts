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
  assert.ok(newsViewSource.includes("'acordo-comercial-ue-mercosul-2026'"));
  assert.ok(
    newsViewSource.includes("'mdic-consulta-publica-salvaguardas-bilaterais-2026'")
  );
  assert.ok(
    newsViewSource.includes("'anthropic-ipo-turbulencia-wall-street-2026'")
  );
  assert.ok(
    newsViewSource.includes("'mdic-acordo-mercosul-ue-exportacoes-21-por-cento-2026'")
  );
  assert.ok(newsViewSource.includes("'trump-inteligencia-jensen-huang-nvidia-2026'"));
  assert.ok(newsViewSource.includes("'terras-raras-disparidade-precos-brasil-china-2026'"));
  assert.ok(newsViewSource.includes("'greves-jovens-europa-custo-vida-2026'"));
  assert.ok(newsViewSource.includes("'coinbase-deribit-aquisicao-infraestrutura-2026'"));

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
  assert.ok(newsViewSource.includes('data-overlay-dark="true"\n                  className="pointer-events-none absolute inset-0'));
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
