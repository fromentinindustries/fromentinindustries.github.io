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

/* =========================================================
   Fromentin Industries Main JavaScript
   Handles:
   - Lightweight custom cursor
   - Header dropdown panels
   - Mobile menu
   - Auto-hide header on scroll
   - Bottom cookie popup
   - Full cookie preference modal
   - Protected archive login wall
   - Contact modal
   - C.A.N.A.D.A mission framework
   - Scroll reveal animations
========================================================= */

const cursorRing = document.getElementById("cursor-ring");
const cursorDot = document.getElementById("cursor-dot");

let cursorFrame = null;
let cursorX = 0;
let cursorY = 0;

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

window.addEventListener("load", () => {
  bindLightweightCursor();
  bindCursorHoverStates();
  bindDropdowns();
  bindCookieChoiceButtons();
  bindCanadaMissionPanels();
  bindProtectedLinks();
  bindHeaderAutoHide();
  bindContactForm();
  bindLoginForm();
  loadCookiePreferences();
  revealOnScroll();

  setTimeout(() => {
    document.body.classList.add("loaded");
    openCookiePopupIfNeeded();
  }, 800);
});

/* =========================================================
   Lightweight Custom Cursor
========================================================= */

function bindLightweightCursor() {
  if (!cursorRing || !cursorDot) return;

  document.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;

    if (!document.body.classList.contains("cursor-ready")) {
      document.body.classList.add("cursor-ready");
    }

    if (cursorFrame) return;

    cursorFrame = requestAnimationFrame(() => {
      const position = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

      cursorRing.style.transform = position;
      cursorDot.style.transform = position;

      cursorFrame = null;
    });
  });
}

function bindCursorHoverStates() {
  document.querySelectorAll("a, button, input, textarea, select").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });
  });
}

/* =========================================================
   Mobile Menu
========================================================= */

function toggleMobileMenu() {
  const nav = document.getElementById("site-nav");

  if (!nav) return;

  nav.classList.toggle("open");
}

/* =========================================================
   Header Dropdown Mega Panels
========================================================= */

function bindDropdowns() {
  const triggers = document.querySelectorAll(".nav-trigger[data-dropdown]");
  const panels = document.querySelectorAll(".dropdown-panel");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();

      const targetId = trigger.dataset.dropdown;
      const targetPanel = document.getElementById(targetId);
      const isOpen = targetPanel && targetPanel.classList.contains("open");

      closeDropdowns();

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
      closeLoginModal();
      closeCookieModal();
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

/* =========================================================
   Header Auto-Hide on Scroll
========================================================= */

function bindHeaderAutoHide() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const pastHeader = currentScrollY > 120;

      if (scrollingDown && pastHeader) {
        header.classList.add("header-hidden");
        closeDropdowns();
      } else {
        header.classList.remove("header-hidden");
      }

      lastScrollY = Math.max(currentScrollY, 0);
      ticking = false;
    });
  });
}

/* =========================================================
   C.A.N.A.D.A Mission Framework
========================================================= */

function bindCanadaMissionPanels() {
  const items = document.querySelectorAll(".canada-item");
  const panels = document.querySelectorAll(".canada-panel");

  if (!items.length || !panels.length) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.dataset.canadaPanel;
      const targetPanel = document.getElementById(targetId);

      items.forEach((button) => {
        button.classList.remove("active");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      item.classList.add("active");

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

/* =========================================================
   Cookie Popup and Preference Modal
========================================================= */

function openCookiePopupIfNeeded() {
  const cookieSaved = localStorage.getItem("fi_cookie_preferences_saved");
  const popup = document.getElementById("cookie-popup");

  if (!cookieSaved && popup) {
    popup.classList.add("visible");
  }
}

function closeCookiePopup() {
  const popup = document.getElementById("cookie-popup");

  if (popup) {
    popup.classList.remove("visible");
  }
}

function openCookieModal(forceOpen = true) {
  const modal = document.getElementById("cookie-modal");

  if (!modal) return;

  closeCookiePopup();

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
  const loginModal = document.getElementById("login-modal");

  if (
    (!contactModal || !contactModal.classList.contains("open")) &&
    (!loginModal || !loginModal.classList.contains("open"))
  ) {
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

        buttons.forEach((item) => {
          item.classList.remove("active");
        });

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

  cookiePreferences.functional = true;
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

  closeCookiePopup();
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

/* =========================================================
   Protected Archive Login Wall
========================================================= */

function bindProtectedLinks() {
  document.querySelectorAll(".login-required").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      const area = element.dataset.protectedArea || "Protected Area";
      openLoginModal(area);
    });
  });
}

function openLoginModal(areaName = "Protected Area") {
  const modal = document.getElementById("login-modal");
  const title = document.getElementById("login-title");

  if (!modal) return;

  closeDropdowns();

  if (title) {
    title.textContent = `${areaName} Access`;
  }

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");

  if (!modal) return;

  modal.classList.remove("open");

  const cookieModal = document.getElementById("cookie-modal");
  const contactModal = document.getElementById("contact-modal");

  if (
    (!cookieModal || !cookieModal.classList.contains("open")) &&
    (!contactModal || !contactModal.classList.contains("open"))
  ) {
    document.body.classList.remove("modal-open");
  }
}

function bindLoginForm() {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = document.getElementById("login-note");

    if (note) {
      note.classList.add("visible");
    }

    /*
      Future backend authentication logic:

      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(new FormData(loginForm)))
      });
    */
  });
}

/* =========================================================
   Contact Modal
========================================================= */

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
  const loginModal = document.getElementById("login-modal");

  if (
    (!cookieModal || !cookieModal.classList.contains("open")) &&
    (!loginModal || !loginModal.classList.contains("open"))
  ) {
    document.body.classList.remove("modal-open");
  }
}

function bindContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

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

/* =========================================================
   Scroll Reveal Animations
========================================================= */

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

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}