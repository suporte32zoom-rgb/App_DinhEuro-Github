export const CANONICAL_ORIGIN = 'https://dinheuro.com';

/**
 * Constrói a URL canônica oficial para o domínio https://dinheuro.com
 * - Home ('/' ou vazio): 'https://dinheuro.com/'
 * - Sub-rotas: sem barra final e sem query/hash (ex: 'https://dinheuro.com/mercados')
 */
export function buildCanonicalUrl(routePath: string): string {
  const cleanPath = (routePath || '/')
    .split('?')[0]
    .split('#')[0]
    .trim();

  if (!cleanPath || cleanPath === '/') {
    return `${CANONICAL_ORIGIN}/`;
  }

  const withLeadingSlash = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, '');

  return withoutTrailingSlash ? `${CANONICAL_ORIGIN}${withoutTrailingSlash}` : `${CANONICAL_ORIGIN}/`;
}

/**
 * Normaliza um pathname para lookup no mapa de rotas (ex: '/mercados/' -> '/mercados').
 */
export function normalizeRoutePath(pathname: string): string {
  const clean = (pathname || '/').split('?')[0].split('#')[0].toLowerCase().trim();
  if (!clean || clean === '/') return '/';
  const normalized = clean.replace(/\/+$/, '');
  return normalized || '/';
}

/**
 * Garante exatamente uma tag <link rel="canonical"> no <head> com o href atualizado para a rota atual.
 */
export function syncCanonicalLink(routePath: string, doc: Document | undefined = typeof document !== 'undefined' ? document : undefined): string {
  const canonicalHref = buildCanonicalUrl(routePath);
  if (!doc || !doc.head) return canonicalHref;

  const existingLinks = Array.from(doc.head.querySelectorAll('link[rel="canonical"]')) as HTMLLinkElement[];

  if (existingLinks.length > 0) {
    const primary = existingLinks[0];
    if (primary.getAttribute('href') !== canonicalHref) {
      primary.setAttribute('href', canonicalHref);
    }
    // Remove eventuais duplicatas garantindo estritamente 1 tag canonical no <head>
    for (let i = 1; i < existingLinks.length; i++) {
      existingLinks[i].parentNode?.removeChild(existingLinks[i]);
    }
  } else {
    const link = doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalHref);
    doc.head.appendChild(link);
  }

  return canonicalHref;
}
