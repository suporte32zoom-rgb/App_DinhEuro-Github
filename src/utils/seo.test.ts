import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCanonicalUrl,
  buildStructuredDataSchemas,
  normalizeRoutePath,
  ROUTE_SEO_METADATA,
  syncCanonicalLink,
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

test('buildStructuredDataSchemas produces valid Organization, WebSite SearchAction, and FinancialService/WebApplication JSON-LD', () => {
  const { organizationSchema, websiteSchema, financialServiceSchema } =
    buildStructuredDataSchemas('pt');
  assert.equal(organizationSchema['@type'], 'Organization');
  assert.equal(organizationSchema.url, 'https://dinheuro.com/');
  assert.equal(organizationSchema.logo.url, 'https://dinheuro.com/logo.png');
  assert.equal(websiteSchema['@type'], 'WebSite');
  assert.equal(websiteSchema.potentialAction['@type'], 'SearchAction');
  assert.equal(
    websiteSchema.potentialAction.target.urlTemplate,
    'https://dinheuro.com/?q={search_term_string}'
  );
  assert.deepEqual(financialServiceSchema['@type'], ['FinancialService', 'WebApplication']);
  assert.equal(financialServiceSchema.logo, 'https://dinheuro.com/logo.png');
  assert.equal(financialServiceSchema.isAccessibleForFree, true);
  assert.equal(financialServiceSchema.offers.price, '0');
});

test('ROUTE_SEO_METADATA injects high-RPM FX, global equity, and E-E-A-T macro keywords across target routes', () => {
  assert.ok(ROUTE_SEO_METADATA.dashboard.pt.description.includes('168 ativos globais'));
  assert.ok(ROUTE_SEO_METADATA.dashboard.pt.keywords.includes('EUR to BRL live rate'));
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
  assert.ok(source.includes("id: 'apec-2026-trump-xi-putin-shenzhen'"));
  assert.ok(source.includes("id: 'aladi-cosmeticos-exportacao-brasil-2026'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_e7fa591e.png'"));
  assert.ok(source.includes("imageUrl: '/assets/aistudio/image_559daecb.png'"));
  assert.ok(
    source.includes(
      'Donald Trump, Xi Jinping e Vladimir Putin durante encontro na Cúpula da APEC 2026 em Shenzhen, na China'
    )
  );

  const schema = buildEditorialArticlesSchema('pt', [], {
    id: 'aladi-cosmeticos-exportacao-brasil-2026',
    schemaType: 'NewsArticle',
    headline:
      'Comércio Exterior: Brasil Simplifica Exportação de Cosméticos para a América Latina via Acordo da Aladi',
    description:
      'Decreto federal internaliza acordo da Associação Latino-Americana de Integração (Aladi) que elimina barreiras técnicas e reduz custos regulatórios em um mercado regional estimado em US$ 55 bilhões.',
    articleSection: 'Comércio Exterior & Economia Regional',
    datePublished: '2026-11-18',
    imageUrl: '/assets/aistudio/image_559daecb.png',
    keywords: [
      'exportação cosméticos brasil',
      'acordo aladi comércio exterior',
      'balança comercial brasil 2026',
      'comércio américa latina mdic',
      'exportações brasileiras superávit',
    ],
  });
  assert.equal(schema['@type'], 'NewsArticle');
  assert.ok('image' in schema);
  assert.deepEqual(schema.image, ['https://dinheuro.com/assets/aistudio/image_559daecb.png']);
  assert.equal(schema.datePublished, '2026-11-18');
});
