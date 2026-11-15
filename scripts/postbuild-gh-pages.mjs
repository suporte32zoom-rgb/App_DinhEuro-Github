import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const CANONICAL_ORIGIN = 'https://dinheuro.com';

const GH_PAGES_SUBROUTES = [
  'mercados',
  'ferramentas',
  'noticias',
  'graficos',
  'corretoras',
  'day-trade',
  'fluxo-tape-reading',
  'renda-fixa-derivativos',
  'carteiras',
  'academy',
  'sobre',
  'politica-de-privacidade',
  'termos-de-uso',
  'politica-de-cookies',
  'disclaimer',
];

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[postbuild-gh-pages] dist/index.html not found.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Keep dist/404.html synced for GitHub Pages fallback
fs.copyFileSync(indexHtmlPath, path.join(distDir, '404.html'));

// 2. Materialize physical folder/index.html per route so GitHub Pages returns HTTP 200 OK
for (const route of GH_PAGES_SUBROUTES) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });

  const canonicalUrl = `${CANONICAL_ORIGIN}/${route}`;

  let routeHtml = baseHtml
    // Update static canonical tag to exact sub-route canonical URL
    .replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    // Rewrite root-level relative asset paths in nested /<route>/index.html so assets resolve from /
    .replace(/(href|src|content)="\.\//g, '$1="/')
    .replace(/register\(['"]\.\/sw\.js['"]\s*,\s*\{\s*scope:\s*['"]\.\/['"]\s*\}\)/g, "register('/sw.js', { scope: '/' })");

  fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
}

console.log(
  `[postbuild-gh-pages] Generated dist/404.html and ${GH_PAGES_SUBROUTES.length} static route entrypoints.`
);
