import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCanonicalUrl, normalizeRoutePath, syncCanonicalLink } from './seo';

test('buildCanonicalUrl formats home and sub-routes strictly for https://dinheuro.com', () => {
  assert.equal(buildCanonicalUrl('/'), 'https://dinheuro.com/');
  assert.equal(buildCanonicalUrl(''), 'https://dinheuro.com/');
  assert.equal(buildCanonicalUrl('/mercados'), 'https://dinheuro.com/mercados');
  assert.equal(buildCanonicalUrl('/mercados/'), 'https://dinheuro.com/mercados');
  assert.equal(buildCanonicalUrl('/ferramentas?tab=cambio#calc'), 'https://dinheuro.com/ferramentas');
  assert.equal(buildCanonicalUrl('noticias'), 'https://dinheuro.com/noticias');
});

test('normalizeRoutePath strips trailing slashes while keeping root', () => {
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('/Mercados/'), '/mercados');
  assert.equal(normalizeRoutePath('/day-trade///'), '/day-trade');
});

test('syncCanonicalLink maintains strictly one canonical link tag in head', () => {
  const createdNodes: Array<{ attrs: Record<string, string>; removed?: boolean }> = [];
  const dupNode = {
    attrs: { rel: 'canonical', href: 'https://old.example/' } as Record<string, string>,
    removed: false,
    parentNode: {
      removeChild(node: any) {
        node.removed = true;
      },
    },
    getAttribute(name: string) {
      return this.attrs[name] ?? null;
    },
    setAttribute(name: string, val: string) {
      this.attrs[name] = val;
    },
  };
  const primaryNode = {
    attrs: { rel: 'canonical', href: 'https://dinheuro.com/' } as Record<string, string>,
    removed: false,
    getAttribute(name: string) {
      return this.attrs[name] ?? null;
    },
    setAttribute(name: string, val: string) {
      this.attrs[name] = val;
    },
  };

  const mockDoc = {
    head: {
      querySelectorAll: () => [primaryNode, dupNode].filter((n) => !n.removed),
      appendChild: (node: any) => createdNodes.push(node),
    },
    createElement: () => ({ attrs: {}, setAttribute() {} }),
  } as unknown as Document;

  const href = syncCanonicalLink('/mercados/', mockDoc);
  assert.equal(href, 'https://dinheuro.com/mercados');
  assert.equal(primaryNode.attrs.href, 'https://dinheuro.com/mercados');
  assert.equal(dupNode.removed, true);
  assert.equal(mockDoc.head.querySelectorAll('link[rel="canonical"]').length, 1);
});
