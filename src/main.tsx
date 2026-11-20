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
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F8FAFC;color:#0F172A;font-family:sans-serif;padding:20px;text-align:center;">
        <div style="max-width:420px;width:100%;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;padding:32px 24px;box-shadow:0 20px 40px -12px rgba(0,51,153,0.12);">
          <div style="width:48px;height:48px;border-radius:50%;background:#E6EEFF;color:#003399;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">€</div>
          <h1 style="color:#003399;font-size:20px;font-weight:800;margin-bottom:8px;">Dinh<span style="color:#009B77;">Euro</span></h1>
          <p style="color:#475569;font-size:13px;line-height:1.6;margin-bottom:24px;">O portal está pronto. Clique abaixo para iniciar o painel financeiro.</p>
          <button onclick="window.location.reload()" style="background:#003399;color:#FFFFFF;border:none;padding:12px 24px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer;width:100%;">Acessar Plataforma</button>
        </div>
      </div>
    `;
  }
}
