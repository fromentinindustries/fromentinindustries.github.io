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

let cursorFrame = null;
let cursorX = 0;
let cursorY = 0;

const defaultCookiePreferences = {
  functional: true,
  analytics: false,
  deviceStorage: false,
  contentPerformance: false,
  serviceImprovement: false,
  advertising: false
};

let cookiePreferences = { ...defaultCookiePreferences };

const canadaContent = [
  {
    kicker: "C / Capability",
    text: "Building practical strength through engineering, infrastructure, systems planning, industrial awareness, and technical execution."
  },
  {
    kicker: "A / Advancement",
    text: "Moving ideas forward through research, documentation, design development, education, and long-term institutional growth."
  },
  {
    kicker: "N / National",
    text: "Maintaining a Canadian focus across infrastructure, industry, aerospace, security research, digital systems, and future capability."
  },
  {
    kicker: "A / Architecture",
    text: "Organizing systems, projects, research, records, and operating structures so the company can scale without losing direction."
  },
  {
    kicker: "D / Discipline",
    text: "Prioritizing order, standards, documentation, technical clarity, and controlled execution over noise, hype, or weak presentation."
  },
  {
    kicker: "A / Ambition",
    text: "Pursuing long-term Canadian industrial strength through serious work, technical development, and a mission-first company identity."
  }
];

let activeCanadaIndex = 0;

window.addEventListener("load", () => {
  function bindIntroTransition() {
  const intro = document.getElementById("site-intro");
  if (!intro) return;

  window.setTimeout(() => {
    document.body.classList.add("intro-complete");

    window.setTimeout(() => {
      intro.remove();
    }, 1000);
  }, 7000);
};
  bindLightweightCursor();
  bindCursorHoverStates();
  bindDropdownsForMobile();
  bindHeaderScrollBehaviour();
  bindHeroMissionMerge();
  bindScrollDrivenCanada();
  bindSectionRail();
  bindCookieChoiceButtons();
  bindProtectedLinks();
  bindLoginForm();
  loadCookiePreferences();
  bindReversibleReveal();

  setTimeout(() => {
    document.body.classList.add("loaded");
    openCookiePopupIfNeeded();
  }, 500);
});

/* Intro */

function bindIntroTransition() {
  const intro = document.getElementById("site-intro");
  if (!intro) return;

  window.setTimeout(() => {
    document.body.classList.add("intro-complete");
  }, 2400);
}

/* Cursor */

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
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

/* Mobile Menu */

function toggleMobileMenu() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  nav.classList.toggle("open");
}

/* Dropdowns */

function bindDropdownsForMobile() {
  const triggers = document.querySelectorAll(".nav-trigger[data-dropdown]");
  const panels = document.querySelectorAll(".dropdown-panel");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (window.innerWidth > 1100) return;

      event.stopPropagation();

      const targetId = trigger.dataset.dropdown;
      const targetPanel = document.getElementById(targetId);
      const isOpen = targetPanel && targetPanel.classList.contains("open");

      closeDropdowns();

      if (!isOpen && targetPanel) {
        targetPanel.classList.add("open");
      }
    });
  });

  panels.forEach((panel) => {
    panel.addEventListener("click", (event) => event.stopPropagation());
  });

  document.addEventListener("click", () => closeDropdowns());

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
  document.querySelectorAll(".dropdown-panel").forEach((panel) => {
    panel.classList.remove("open");
  });
}

/* Header */

function bindHeaderScrollBehaviour() {
  const header = document.getElementById("site-header");
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

      header.classList.toggle("scrolled", pastHeader);

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

/* Hero text fades into header */

function bindHeroMissionMerge() {
  const header = document.getElementById("site-header");
  const hero = document.getElementById("landing-hero");

  if (!header || !hero) return;

  const update = () => {
    const heroHeight = hero.offsetHeight || window.innerHeight;
    const progress = Math.min(window.scrollY / (heroHeight * 0.58), 1);

    hero.style.setProperty("--hero-fade", String(progress));
    header.classList.toggle("mission-visible", progress > 0.42);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* Scroll-driven C.A.N.A.D.A */

function bindScrollDrivenCanada() {
  const section = document.getElementById("canada-framework");
  const display = document.querySelector(".canada-display");
  const kicker = document.getElementById("canada-kicker");
  const text = document.getElementById("canada-text");
  const icons = document.querySelectorAll(".canada-icon");

  if (!section || !display || !kicker || !text || !icons.length) return;

  const update = () => {
    if (window.innerWidth <= 1100) {
      setCanadaIndex(0, display, kicker, text, icons);
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
    const progress = scrollable > 0 ? travelled / scrollable : 0;
    const index = Math.min(canadaContent.length - 1, Math.floor(progress * canadaContent.length));

    setCanadaIndex(index, display, kicker, text, icons);
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function setCanadaIndex(index, display, kicker, text, icons) {
  if (index === activeCanadaIndex && kicker.textContent === canadaContent[index].kicker) return;

  activeCanadaIndex = index;

  icons.forEach((icon) => {
    icon.classList.toggle("active", Number(icon.dataset.canadaIcon) === index);
  });

  display.classList.add("switching");

  window.setTimeout(() => {
    kicker.textContent = canadaContent[index].kicker;
    text.textContent = canadaContent[index].text;
    display.classList.remove("switching");
  }, 160);
}

/* 01-05 scroll rail */

function bindSectionRail() {
  const sections = document.querySelectorAll(".f-section[data-section-id]");
  const links = document.querySelectorAll(".f-rail-link");

  if (!sections.length || !links.length) return;

  const update = () => {
    const viewportPoint = window.innerHeight * 0.42;
    let activeId = sections[0].dataset.sectionId;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top - viewportPoint);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeId = section.dataset.sectionId;
      }
    });

    links.forEach((link) => {
      link.classList.toggle("active", link.dataset.sectionLink === activeId);
    });

    sections.forEach((section) => {
      section.classList.toggle("active-section", section.dataset.sectionId === activeId);
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* Reversible reveal animations */

function bindReversibleReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.22
  });

  revealElements.forEach((element) => observer.observe(element));
}

/* Cookies */

function openCookiePopupIfNeeded() {
  const cookieSaved = localStorage.getItem("fi_cookie_preferences_saved");
  const popup = document.getElementById("cookie-popup");

  if (!cookieSaved && popup) {
    popup.classList.add("visible");
  }
}

function closeCookiePopup() {
  const popup = document.getElementById("cookie-popup");
  if (popup) popup.classList.remove("visible");
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
  clearModalLockIfNoModalsOpen();
}

function bindCookieChoiceButtons() {
  document.querySelectorAll(".cookie-row[data-cookie-key]").forEach((row) => {
    const key = row.dataset.cookieKey;
    const buttons = row.querySelectorAll(".choice-buttons button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        cookiePreferences[key] = button.dataset.choice === "true";

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

  cookiePreferences.functional = true;
  updateCookieButtons();
}

function updateCookieButtons() {
  document.querySelectorAll(".cookie-row[data-cookie-key]").forEach((row) => {
    const key = row.dataset.cookieKey;
    const buttons = row.querySelectorAll(".choice-buttons button");
    const selected = Boolean(cookiePreferences[key]);

    buttons.forEach((button) => {
      button.classList.toggle("active", (button.dataset.choice === "true") === selected);
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
  console.info("Analytics placeholder ready. No production analytics loaded.");
}

/* Protected archive */

function bindProtectedLinks() {
  document.querySelectorAll(".login-required").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      openLoginModal(element.dataset.protectedArea || "Protected Area");
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
  clearModalLockIfNoModalsOpen();
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
  });
}

/* Contact */

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
  clearModalLockIfNoModalsOpen();
}

function clearModalLockIfNoModalsOpen() {
  const openModal = document.querySelector(".modal.open");

  if (!openModal) {
    document.body.classList.remove("modal-open");
  }
}