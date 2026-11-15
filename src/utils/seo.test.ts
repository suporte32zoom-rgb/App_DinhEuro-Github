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

test('buildStructuredDataSchemas produces valid WebSite SearchAction and FinancialService/WebApplication JSON-LD', () => {
  const { websiteSchema, financialServiceSchema } = buildStructuredDataSchemas('pt');
  assert.equal(websiteSchema['@type'], 'WebSite');
  assert.equal(websiteSchema.potentialAction['@type'], 'SearchAction');
  assert.equal(
    websiteSchema.potentialAction.target.urlTemplate,
    'https://dinheuro.com/?q={search_term_string}'
  );
  assert.deepEqual(financialServiceSchema['@type'], ['FinancialService', 'WebApplication']);
  assert.equal(financialServiceSchema.isAccessibleForFree, true);
  assert.equal(financialServiceSchema.offers.price, '0');
});
