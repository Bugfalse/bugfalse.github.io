const APP_URL = 'https://buglens-r1ow.onrender.com/';
const root = document.documentElement;
const appView = document.getElementById('app-view');
const frame = document.getElementById('errorhunter');
const loading = document.getElementById('iframe-loading');
const error = document.getElementById('iframe-error');
const status = document.getElementById('app-status');

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('bugfalse-theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀' : '☾';
}

const savedTheme = localStorage.getItem('bugfalse-theme');
setTheme(savedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
document.getElementById('theme-toggle').addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

function showApp() {
  appView.hidden = false;
  document.body.style.overflow = 'hidden';
  loading.hidden = false;
  error.hidden = true;
  status.innerHTML = '<span class="status-dot"></span> Connecting…';
  frame.src = APP_URL;
  frame.focus({ preventScroll: true });
}

function hideApp() {
  appView.hidden = true;
  document.body.style.overflow = '';
  frame.src = 'about:blank';
}

document.querySelectorAll('#launch-top, #launch-hero').forEach(button => button.addEventListener('click', showApp));
document.getElementById('back-home').addEventListener('click', hideApp);
document.getElementById('retry').addEventListener('click', showApp);

frame.addEventListener('load', () => {
  loading.hidden = true;
  error.hidden = true;
  status.innerHTML = '<span class="status-dot"></span> Connected';
});

// Cross-origin iframes cannot be inspected for their internal network status.
// Use a conservative timeout so a permanently unavailable backend gets a useful fallback.
let loadTimer;
const observer = new MutationObserver(() => {});
function armLoadTimeout() {
  clearTimeout(loadTimer);
  loadTimer = setTimeout(() => {
    if (!loading.hidden) {
      loading.hidden = true;
      error.hidden = false;
      status.textContent = 'Application unavailable';
    }
  }, 18000);
}
const originalShowApp = showApp;
// Re-arm the timeout whenever the iframe navigation starts.
document.querySelectorAll('#launch-top, #launch-hero, #retry').forEach(button => button.addEventListener('click', armLoadTimeout));
frame.addEventListener('load', () => clearTimeout(loadTimer));

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !appView.hidden) hideApp();
});

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
