import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handlers defensivos para capturar erros silenciosos no ambiente de produção
window.addEventListener('error', (event) => {
  if (event.message && (event.message.includes('WebSocket') || event.message.includes('vite'))) {
    return;
  }
  console.warn('[DinhEuro] Monitoramento de inicialização:', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  const msg = (event.reason && (event.reason.message || String(event.reason))) || '';
  if (msg.includes('WebSocket') || msg.includes('vite')) {
    return;
  }
  console.warn('[DinhEuro] Promise não tratada:', event.reason);
});

const rootEl = document.getElementById('root');
if (rootEl) {
  try {
    const root = createRoot(rootEl);
    root.render(<App />);
  } catch (err) {
    console.error('[DinhEuro] Falha crítica na renderização raiz:', err);
    rootEl.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0B1320;color:#F8FAFC;font-family:sans-serif;padding:20px;text-align:center;">
        <div style="max-width:420px;width:100%;background:#0F172A;border:1px solid rgba(16,185,129,0.3);border-radius:16px;padding:32px 24px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(16,185,129,0.15);color:#10B981;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">€</div>
          <h1 style="color:#FFFFFF;font-size:20px;font-weight:800;margin-bottom:8px;">DinhEuro</h1>
          <p style="color:#94A3B8;font-size:13px;line-height:1.6;margin-bottom:24px;">O portal está pronto. Clique abaixo para iniciar o painel financeiro.</p>
          <button onclick="window.location.reload()" style="background:#10B981;color:#0B1320;border:none;padding:12px 24px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer;width:100%;">Acessar Plataforma</button>
        </div>
      </div>
    `;
  }
}
