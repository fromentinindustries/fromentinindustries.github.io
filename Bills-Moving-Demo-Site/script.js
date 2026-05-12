/*
  =========================================================
  Bill's Moving
  Local moving demo website
  Brockville, Ontario.

  Demo content and business details are based on publicly available listings.
  Owner verification is required before launch.
  =========================================================
*/

const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const quoteForm = document.getElementById('quote-form');
const THEME_KEY = 'billsMovingTheme';

function getSavedTheme() {
  return localStorage.getItem(THEME_KEY);
}

function getPreferredTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

function initTheme() {
  const saved = getSavedTheme();
  applyTheme(saved || getPreferredTheme());
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

function toggleNav() {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function buildMailto(data) {
  const recipient = 'owner@billsmoving.com';
  const subject = encodeURIComponent('Bill\'s Moving quote request');
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nMoving from: ${data.from}\nMoving to: ${data.to}\nPreferred date: ${data.date}\nType of move: ${data.type}\nDetails: ${data.details}`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const mailto = buildMailto({
    name: formData.get('name') || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    from: formData.get('from') || '',
    to: formData.get('to') || '',
    date: formData.get('date') || '',
    type: formData.get('type') || '',
    details: formData.get('details') || ''
  });
  window.location.href = mailto;
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (navToggle) navToggle.addEventListener('click', toggleNav);
  if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);
});
