/*
=========================================================
Fromentin Industries
Private Development-Stage Website
Systems for a Stronger Canada
=========================================================
*/

const cursorRing = document.getElementById("cursor-ring");
const cursorDot = document.getElementById("cursor-dot");

let cursorFrame = null;
let cursorX = 0;
let cursorY = 0;

/* =========================================================
   Archive Gate Configuration

   Temporary archive phrase:
   Systems for a Stronger Canada | Founder Archive | 2026

   SHA-256:
   ba78b606614cc1d95398b0347c97e302990cc2da609b3f23e008b0cbf13c5cd2

   Static-site protection is only a temporary front-end gate.
   Future real protection should use Cloudflare Access, Supabase Auth,
   server-side sessions, Stripe paywall logic, or equivalent.
========================================================= */

const ARCHIVE_UNLOCK_KEY = "fi_archive_unlocked";
const ARCHIVE_ATTEMPT_KEY = "fi_archive_attempts";
const ARCHIVE_LOCKOUT_KEY = "fi_archive_lockout_until";
const ARCHIVE_HASH = "ba78b606614cc1d95398b0347c97e302990cc2da609b3f23e008b0cbf13c5cd2";

/* =========================================================
   Cookie Configuration
========================================================= */

const defaultCookiePreferences = {
  functional: true,
  analytics: false,
  deviceStorage: false,
  contentPerformance: false,
  serviceImprovement: false,
  advertising: false
};

let cookiePreferences = { ...defaultCookiePreferences };

/* =========================================================
   C.A.N.A.D.A Content
========================================================= */

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

/* =========================================================
   Main Startup
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  bindIntroTransition();
  bindLightweightCursor();
  bindCursorHoverStates();
  bindDropdownsForMobile();
  bindHeaderScrollBehaviour();
  bindHeroMissionMerge();
  bindScrollDrivenCanada();
  bindSectionRail();
  bindCookieChoiceButtons();
  bindProtectedLinks();
  bindArchivePageGate();
  loadCookiePreferences();
  bindReversibleReveal();

  window.setTimeout(() => {
    document.body.classList.add("loaded");
    openCookiePopupIfNeeded();
  }, 500);
});

/* =========================================================
   Intro Transition
========================================================= */

function bindIntroTransition() {
  const intro = document.getElementById("site-intro");

  if (!intro) return;

  window.setTimeout(() => {
    document.body.classList.add("intro-complete");

    window.setTimeout(() => {
      intro.remove();
    }, 1000);
  }, 7000);
}

/* =========================================================
   Cursor
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
   Header Dropdowns
   Desktop: CSS hover
   Mobile: JS click
========================================================= */

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
      closeCookieModal();
    }
  });
}

function closeDropdowns() {
  document.querySelectorAll(".dropdown-panel").forEach((panel) => {
    panel.classList.remove("open");
  });
}

/* =========================================================
   Header Scroll Behaviour
========================================================= */

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

/* =========================================================
   Hero Mission Merge
========================================================= */

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
  window.addEventListener("resize", update);
  update();
}

/* =========================================================
   Scroll-Driven C.A.N.A.D.A
========================================================= */

function bindScrollDrivenCanada() {
  const section = document.getElementById("canada-framework");
  const display = document.querySelector(".canada-display");
  const kicker = document.getElementById("canada-kicker");
  const text = document.getElementById("canada-text");
  const units = document.querySelectorAll(".canada-unit");

  if (!section || !display || !kicker || !text || !units.length) return;

  const update = () => {
    if (window.innerWidth <= 1100) {
      const visibleIndex = getClosestCanadaMobileIndex(units);
      setCanadaIndex(visibleIndex, display, kicker, text, units);
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
    const progress = scrollable > 0 ? travelled / scrollable : 0;
    const index = Math.min(canadaContent.length - 1, Math.floor(progress * canadaContent.length));

    setCanadaIndex(index, display, kicker, text, units);
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function getClosestCanadaMobileIndex(units) {
  const viewportCenter = window.innerHeight / 2;
  let bestIndex = 0;
  let bestDistance = Infinity;

  units.forEach((unit, index) => {
    const rect = unit.getBoundingClientRect();
    const unitCenter = rect.top + rect.height / 2;
    const distance = Math.abs(unitCenter - viewportCenter);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function setCanadaIndex(index, display, kicker, text, units) {
  if (!canadaContent[index]) return;

  if (index === activeCanadaIndex && kicker.textContent === canadaContent[index].kicker) return;

  activeCanadaIndex = index;

  units.forEach((unit) => {
    unit.classList.toggle("active", Number(unit.dataset.canadaIcon) === index);
  });

  display.classList.add("switching");

  window.setTimeout(() => {
    kicker.textContent = canadaContent[index].kicker;
    text.textContent = canadaContent[index].text;
    display.classList.remove("switching");
  }, 160);
}

/* =========================================================
   01–05 Section Rail
========================================================= */

function bindSectionRail() {
  const sections = document.querySelectorAll(".f-section[data-section-id]");
  const links = document.querySelectorAll(".f-rail-card");

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

/* =========================================================
   Reversible Reveal Animations
========================================================= */

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

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   Cookie System
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
  clearModalLockIfNoModalsOpen();
}

function bindCookieChoiceButtons() {
  document.querySelectorAll(".cookie-row[data-cookie-key]").forEach((row) => {
    const key = row.dataset.cookieKey;
    const buttons = row.querySelectorAll(".choice-buttons button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        cookiePreferences[key] = button.dataset.choice === "true";

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

/* =========================================================
   Archive Links and Archive Page Gate
========================================================= */

function bindProtectedLinks() {
  document.querySelectorAll(".login-required").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/en/founders-archive/";
    });
  });
}

async function sha256Hex(value) {
  if (!window.crypto || !crypto.subtle) {
    return null;
  }

  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getArchiveAttempts() {
  const attempts = Number(localStorage.getItem(ARCHIVE_ATTEMPT_KEY) || "0");
  return Number.isFinite(attempts) ? attempts : 0;
}

function setArchiveAttempts(value) {
  localStorage.setItem(ARCHIVE_ATTEMPT_KEY, String(value));
}

function getArchiveLockoutUntil() {
  const lockout = Number(localStorage.getItem(ARCHIVE_LOCKOUT_KEY) || "0");
  return Number.isFinite(lockout) ? lockout : 0;
}

function setArchiveLockout(millisecondsFromNow) {
  localStorage.setItem(ARCHIVE_LOCKOUT_KEY, String(Date.now() + millisecondsFromNow));
}

function clearArchiveLockout() {
  localStorage.removeItem(ARCHIVE_ATTEMPT_KEY);
  localStorage.removeItem(ARCHIVE_LOCKOUT_KEY);
}

function bindArchivePageGate() {
  const archiveForm = document.getElementById("archive-page-login-form");
  const archivePassword = document.getElementById("archive-page-password");
  const archiveNote = document.getElementById("archive-page-note");

  if (!archiveForm || !archivePassword) return;

  if (localStorage.getItem(ARCHIVE_UNLOCK_KEY) === "true") {
    document.body.classList.add("archive-unlocked");
  }

  archiveForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const lockoutUntil = getArchiveLockoutUntil();

    if (lockoutUntil && Date.now() < lockoutUntil) {
      const secondsRemaining = Math.ceil((lockoutUntil - Date.now()) / 1000);

      if (archiveNote) {
        archiveNote.classList.add("visible");
        archiveNote.textContent = `Temporary lockout active. Try again in ${secondsRemaining} seconds.`;
      }

      return;
    }

    if (!window.crypto || !crypto.subtle) {
      if (archiveNote) {
        archiveNote.classList.add("visible");
        archiveNote.textContent = "Secure browser hashing is unavailable. Use HTTPS and try again.";
      }

      return;
    }

    const enteredPhrase = archivePassword.value.trim();
    const enteredHash = await sha256Hex(enteredPhrase);

    if (enteredHash === ARCHIVE_HASH) {
      localStorage.setItem(ARCHIVE_UNLOCK_KEY, "true");
      clearArchiveLockout();
      document.body.classList.add("archive-unlocked");

      if (archiveNote) {
        archiveNote.classList.add("visible");
        archiveNote.textContent = "Access granted.";
      }

      return;
    }

    const attempts = getArchiveAttempts() + 1;
    setArchiveAttempts(attempts);

    if (attempts >= 5) {
      setArchiveLockout(5 * 60 * 1000);
      setArchiveAttempts(0);

      if (archiveNote) {
        archiveNote.classList.add("visible");
        archiveNote.textContent = "Too many failed attempts. Temporary lockout active for 5 minutes.";
      }

      return;
    }

    if (archiveNote) {
      archiveNote.classList.add("visible");
      archiveNote.textContent = `Access denied. ${5 - attempts} attempt(s) remaining before timeout.`;
    }
  });
}

function lockArchiveAgain() {
  localStorage.removeItem(ARCHIVE_UNLOCK_KEY);
  document.body.classList.remove("archive-unlocked");
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
  clearModalLockIfNoModalsOpen();
}

/* =========================================================
   Shared Modal Unlock
========================================================= */

function clearModalLockIfNoModalsOpen() {
  const openModal = document.querySelector(".modal.open");

  if (!openModal) {
    document.body.classList.remove("modal-open");
  }
}