/*
=========================================================
Fromentin Industries
Private Development-Stage Website
Systems for a Stronger Canada

Copyright Notice / Code Watermark

All site structure, written content, branding, layouts,
visual identity, logos, wording, page organization,
documentation concepts and related materials are part of
the Fromentin Industries brand system unless otherwise stated.

Unauthorized copying, mirroring, scraping, impersonation,
commercial reuse, redistribution, misleading reference or
misuse of this website content is not permitted.
=========================================================
*/

const cursorRing = document.getElementById("cursor-ring");
const cursorDot = document.getElementById("cursor-dot");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

const defaultCookiePreferences = {
  functional: true,
  analytics: false,
  deviceStorage: false,
  contentPerformance: false,
  serviceImprovement: false,
  contentProfiles: false,
  personalizedContent: false,
  limitedContentData: false,
  deviceScanning: false,
  preciseGeolocation: false,
  limitedAdvertisingData: false,
  advertisingProfiles: false,
  personalizedAdvertising: false,
  advertisingPerformance: false,
  marketingGeolocation: false,
  audienceStatistics: false,
  advertising: false
};

let cookiePreferences = { ...defaultCookiePreferences };

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;

  if (cursorRing) {
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

window.addEventListener("load", () => {
  applySavedTheme();
  bindCursorHoverStates();
  bindDropdowns();
  bindCookieChoiceButtons();
  loadCookiePreferences();
  revealOnScroll();

  setTimeout(() => {
    document.body.classList.add("loaded");
    openCookieModalIfNeeded();
  }, 800);
});

function bindCursorHoverStates() {
  document.querySelectorAll("a, button, input, textarea, select").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

function toggleMobileMenu() {
  const nav = document.getElementById("site-nav");

  if (!nav) return;

  nav.classList.toggle("open");
}

function bindDropdowns() {
  const triggers = document.querySelectorAll(".nav-trigger");
  const panels = document.querySelectorAll(".dropdown-panel");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();

      const targetId = trigger.dataset.dropdown;
      const targetPanel = document.getElementById(targetId);
      const isOpen = targetPanel && targetPanel.classList.contains("open");

      triggers.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("open"));

      if (!isOpen && targetPanel) {
        trigger.classList.add("active");
        targetPanel.classList.add("open");
      }
    });
  });

  panels.forEach((panel) => {
    panel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    closeDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();
      closeContactModal();
    }
  });
}

function closeDropdowns() {
  document.querySelectorAll(".nav-trigger").forEach((trigger) => {
    trigger.classList.remove("active");
  });

  document.querySelectorAll(".dropdown-panel").forEach((panel) => {
    panel.classList.remove("open");
  });
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark-mode");

  document.body.classList.remove("light-mode", "dark-mode");

  if (isDark) {
    document.body.classList.add("light-mode");
    localStorage.setItem("fi_theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("fi_theme", "dark");
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("fi_theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  }

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }
}

function openCookieModalIfNeeded() {
  const cookieSaved = localStorage.getItem("fi_cookie_preferences_saved");

  if (!cookieSaved) {
    openCookieModal(false);
  }
}

function openCookieModal(forceOpen = true) {
  const modal = document.getElementById("cookie-modal");

  if (!modal) return;

  if (forceOpen) {
    loadCookiePreferences();
  }

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCookieModal() {
  const modal = document.getElementById("cookie-modal");

  if (!modal) return;

  modal.classList.remove("open");

  const contactModal = document.getElementById("contact-modal");

  if (!contactModal || !contactModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}

function bindCookieChoiceButtons() {
  document.querySelectorAll(".cookie-row[data-cookie-key]").forEach((row) => {
    const key = row.dataset.cookieKey;
    const buttons = row.querySelectorAll(".choice-buttons button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const choice = button.dataset.choice === "true";
        cookiePreferences[key] = choice;

        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  });
}

function loadCookiePreferences() {
  const stored = localStorage.getItem("fi_cookie_preferences");

  if (stored) {
    try {
      cookiePreferences = {
        ...defaultCookiePreferences,
        ...JSON.parse(stored)
      };
    } catch {
      cookiePreferences = { ...defaultCookiePreferences };
    }
  }

  updateCookieButtons();
}

function updateCookieButtons() {
  document.querySelectorAll(".cookie-row[data-cookie-key]").forEach((row) => {
    const key = row.dataset.cookieKey;
    const buttons = row.querySelectorAll(".choice-buttons button");
    const selected = Boolean(cookiePreferences[key]);

    buttons.forEach((button) => {
      const choice = button.dataset.choice === "true";

      if (choice === selected) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  });
}

function rejectOptionalCookies() {
  cookiePreferences = { ...defaultCookiePreferences };
  saveCookiePreferences();
}

function acceptAllCookies() {
  Object.keys(cookiePreferences).forEach((key) => {
    cookiePreferences[key] = true;
  });

  cookiePreferences.functional = true;
  saveCookiePreferences();
}

function saveCookiePreferences() {
  cookiePreferences.functional = true;

  localStorage.setItem("fi_cookie_preferences", JSON.stringify(cookiePreferences));
  localStorage.setItem("fi_cookie_preferences_saved", "true");

  closeCookieModal();

  if (cookiePreferences.analytics) {
    activateAnalyticsPlaceholder();
  }
}

function activateAnalyticsPlaceholder() {
  /*
    Future analytics hook:
    - Cloudflare Web Analytics
    - Plausible
    - Google Analytics

    Do not activate production analytics without a valid token
    and completed privacy/cookie disclosure.
  */

  console.info("Analytics placeholder ready. No production analytics loaded.");
}

function openContactModal() {
  const modal = document.getElementById("contact-modal");

  if (!modal) return;

  closeDropdowns();

  modal.classList.add("open");
  document.body.classList.add("modal-open");

  const nav = document.getElementById("site-nav");

  if (nav) {
    nav.classList.remove("open");
  }
}

function closeContactModal() {
  const modal = document.getElementById("contact-modal");

  if (!modal) return;

  modal.classList.remove("open");

  const cookieModal = document.getElementById("cookie-modal");

  if (!cookieModal || !cookieModal.classList.contains("open")) {
    document.body.classList.remove("modal-open");
  }
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = document.getElementById("form-note");

    if (note) {
      note.classList.add("visible");
    }

    /*
      Future backend submission logic:

      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });
    */
  });
}

function revealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16
  });

  revealElements.forEach((element) => revealObserver.observe(element));
}
