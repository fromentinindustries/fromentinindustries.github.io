/*
  =========================================================
  Fromentin Industries
  Private Development-Stage Website
  Systems for a stronger Canada.

  All site structure, written content, branding, layouts,
  visual identity, logos, development-area wording and
  documentation concepts are part of the Fromentin Industries
  brand system unless otherwise stated.

  Unauthorized copying, mirroring, scraping, impersonation,
  commercial reuse or misleading use of this website content
  is not permitted.
  =========================================================
*/

const themeToggleButtons = document.querySelectorAll('.theme-toggle');
const root = document.documentElement;
const navHeader = document.querySelector('.site-header');
const termsGate = document.getElementById('terms-gate');
const termsCheckbox = document.getElementById('terms-checkbox');
const acceptTermsButton = document.getElementById('accept-terms-button');

const THEME_KEY = 'fromentinTheme';
const TERMS_KEY = 'fromentinTermsAccepted';

function getSavedTheme() {
  return localStorage.getItem(THEME_KEY);
}

function getPreferredTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggleButtons.forEach(button => {
    button.textContent = theme === 'dark' ? 'Light' : 'Dark';
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
}

function setTheme(theme) {
  applyTheme(theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function initTheme() {
  const savedTheme = getSavedTheme();
  const theme = savedTheme || getPreferredTheme();
  applyTheme(theme);
}

function toggleMenu() {
  const expanded = navHeader.classList.toggle('menu-open');
  const button = document.querySelector('.nav-toggle');
  if (button) {
    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
}

function showTermsGate() {
  if (termsGate) {
    termsGate.style.display = 'grid';
  }
}

function hideTermsGate() {
  if (termsGate) {
    termsGate.style.display = 'none';
  }
}

function checkTerms() {
  const accepted = localStorage.getItem(TERMS_KEY) === 'true';
  if (!accepted) {
    showTermsGate();
  } else {
    hideTermsGate();
  }
}

function initTermsGate() {
  if (!termsGate || !termsCheckbox || !acceptTermsButton) {
    return;
  }
  const accepted = localStorage.getItem(TERMS_KEY) === 'true';
  if (accepted) {
    hideTermsGate();
    return;
  }
  showTermsGate();
  termsCheckbox.addEventListener('change', () => {
    acceptTermsButton.disabled = !termsCheckbox.checked;
  });
  acceptTermsButton.addEventListener('click', () => {
    if (termsCheckbox.checked) {
      localStorage.setItem(TERMS_KEY, 'true');
      hideTermsGate();
    }
  });
}

function requireTermsBeforeContact() {
  if (localStorage.getItem(TERMS_KEY) !== 'true') {
    showTermsGate();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTermsGate();
  themeToggleButtons.forEach(button => button.addEventListener('click', toggleTheme));
});
