import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const CANONICAL_ORIGIN = 'https://dinheuro.com';

const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

const CANONICAL_SUBROUTES = [
  'mercados',
  'ferramentas',
  'noticias',
  'graficos',
  'corretoras',
  'guia-cambio-remessas',
  'politica-monetaria-juros',
  'renda-fixa-derivativos',
  'carteiras',
  'academy',
  'sobre',
  'politica-de-privacidade',
  'termos-de-uso',
  'politica-de-cookies',
  'disclaimer',
];

const sitemapSubroutes = fs.existsSync(sitemapPath)
  ? [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>https:\/\/dinheuro\.com\/([^<]*)<\/loc>/g)]
      .map((match) => match[1].replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
  : [];

const GH_PAGES_SUBROUTES = Array.from(new Set([...CANONICAL_SUBROUTES, ...sitemapSubroutes]));

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[postbuild-gh-pages] dist/index.html not found.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Keep dist/404.html as an exact byte-for-byte copy of dist/index.html
fs.copyFileSync(indexHtmlPath, path.join(distDir, '404.html'));

// 2. Ensure dist/_redirects contains /* /index.html 200 for static hosting environments
const redirectsPath = path.join(distDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/* /index.html 200\n', 'utf8');
}

// 3. Materialize physical <route>/index.html per route in sitemap.xml so direct requests return HTTP 200 OK
for (const route of GH_PAGES_SUBROUTES) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });

  const canonicalUrl = `${CANONICAL_ORIGIN}/${route}`;

  const routeHtml = baseHtml
    // Update static canonical tag to exact sub-route canonical URL
    .replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    // Update static hreflang alternate tags to exact sub-route canonical URL
    .replace(
      /(<link\s+rel=["']alternate["']\s+hreflang=["'][^"']+["']\s+href=["'])[^"']*(["']\s*\/?>)/gi,
      `$1${canonicalUrl}$2`
    )
    // Update OpenGraph & Twitter URL meta tags to exact sub-route canonical URL
    .replace(
      /(<meta\s+(?:property|name)=["'](?:og:url|twitter:url)["']\s+content=["'])[^"']*(["']\s*\/?>)/gi,
      `$1${canonicalUrl}$2`
    )
    // Rewrite root-level relative asset paths in nested /<route>/index.html so assets resolve from /
    .replace(/(href|src|content)=(["'])\.\//g, '$1=$2/')
    .replace(
      /register\(['"]\.\/sw\.js['"]\s*,\s*\{\s*scope:\s*['"]\.\/['"]\s*\}\)/g,
      "register('/sw.js', { scope: '/' })"
    );

  fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
}

console.log(
  `[postbuild-gh-pages] Generated dist/404.html, dist/_redirects, and ${GH_PAGES_SUBROUTES.length} static route entrypoints.`
);
