import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Mobile and tablet header displays an accessible high-contrast hamburger menu button without horizontal clipping', () => {
  const headerSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/Header.tsx'),
    'utf8'
  );
  const cssSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/index.css'),
    'utf8'
  );

  // Desktop <nav> remains hidden below lg (1024px) in CSS instead of unconditional display: flex !important
  assert.ok(headerSource.includes('<nav className="hidden lg:flex'));
  assert.ok(cssSource.includes('nav:not(.hidden)'));
  assert.ok(cssSource.includes('@media (min-width: 1024px)'));
  assert.ok(!/^\s*nav,\s*\n\s*\.nav-scroll,\s*\n\s*\.universal-nav-container,\s*\n\s*\[role="navigation"\]\s*\{\s*\n\s*display:\s*flex\s*!important;/m.test(cssSource));

  // Brand block can shrink gracefully on narrow phones so the hamburger button is never pushed off-screen
  assert.ok(headerSource.includes('min-w-0 flex-1 md:flex-initial'));
  assert.ok(headerSource.includes('overflow-x-clip'));

  // Hamburger button has 44x44px minimum touch target, lg:hidden breakpoint, light & dark high-contrast colors, and toggle handler
  assert.ok(headerSource.includes('flex lg:hidden'));
  assert.ok(headerSource.includes('min-w-[44px] min-h-[44px]'));
  assert.ok(headerSource.includes('bg-[#E6EEFF] dark:bg-slate-800'));
  assert.ok(headerSource.includes('text-[#003399] dark:text-emerald-300'));
  assert.ok(headerSource.includes('setIsMobileDrawerOpen((prev) => !prev)'));
  assert.ok(headerSource.includes('aria-controls="mobile-navigation-drawer"'));

  // Drawer auto-closes when resizing to desktop and supports mobile/tablet interaction cleanly
  assert.ok(headerSource.includes('id="mobile-navigation-drawer"'));
  assert.ok(headerSource.includes('fixed inset-0 z-[9999] flex lg:hidden'));
  assert.ok(headerSource.includes('window.innerWidth >= 1024'));
});

test('Initial theme defaults strictly to light for all visitors and only switches to dark on manual toggle', () => {
  const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
  const marketContext = fs.readFileSync(
    path.resolve(process.cwd(), 'src/context/MarketContext.tsx'),
    'utf8'
  );
  const headerSource = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/Header.tsx'),
    'utf8'
  );

  assert.ok(indexHtml.includes('<html lang="pt-BR" class="light" data-theme="light"'));
  assert.ok(indexHtml.includes('<meta name="theme-color" content="#F8FAFC" />'));
  assert.ok(indexHtml.includes("if (storedTheme === 'dark')"));
  assert.ok(!indexHtml.includes('prefers-color-scheme'));

  assert.ok(marketContext.includes("if (typeof window === 'undefined') return 'light';"));
  assert.ok(marketContext.includes("return 'light';"));
  assert.ok(!marketContext.includes('prefers-color-scheme'));

  assert.ok(headerSource.includes('onClick={toggleTheme}'));
});

