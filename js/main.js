/* =========================================================
   AI PLS — MAIN JAVASCRIPT
   Personal Learning System
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   01. DOM REFERENCES
========================================================= */

const DOM = {

  body: document.body,

  header: document.getElementById("site-header"),

  menuToggle: document.getElementById("menu-toggle"),

  mobileMenu: document.getElementById("mobile-menu"),

  currentYear: document.getElementById("current-year"),

  loginDemoButton:
    document.getElementById("login-demo-button")

};


/* =========================================================
   02. APPLICATION STATE
========================================================= */

const AppState = {

  mobileMenuOpen: false,

  scrolled: false

};


/* =========================================================
   03. UTILITY FUNCTIONS
========================================================= */

/**
 * Safely select all elements.
 */
function selectAll(selector) {

  return Array.from(
    document.querySelectorAll(selector)
  );

}


/**
 * Smoothly scroll to an element.
 */
function scrollToElement(element) {

  if (!element) return;

  element.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}


/* =========================================================
   04. HEADER SCROLL STATE
========================================================= */

function updateHeaderOnScroll() {

  if (!DOM.header) return;

  const shouldBeScrolled =
    window.scrollY > 24;

  if (
    shouldBeScrolled ===
    AppState.scrolled
  ) {

    return;

  }

  AppState.scrolled =
    shouldBeScrolled;

  DOM.header.classList.toggle(
    "is-scrolled",
    shouldBeScrolled
  );

}


/* =========================================================
   05. MOBILE MENU
========================================================= */

function setMobileMenu(open) {

  if (
    !DOM.menuToggle ||
    !DOM.mobileMenu
  ) {

    return;

  }


  AppState.mobileMenuOpen = open;


  DOM.menuToggle.classList.toggle(
    "is-active",
    open
  );


  DOM.mobileMenu.classList.toggle(
    "is-open",
    open
  );


  DOM.menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );


  DOM.mobileMenu.setAttribute(
    "aria-hidden",
    String(!open)
  );


  DOM.body.classList.toggle(
    "menu-open",
    open
  );

}


/**
 * Toggle mobile navigation.
 */
function toggleMobileMenu() {

  setMobileMenu(
    !AppState.mobileMenuOpen
  );

}


/* =========================================================
   06. MOBILE NAVIGATION LINKS
========================================================= */

function setupMobileNavigation() {

  const mobileLinks =
    selectAll(
      "#mobile-menu a"
    );


  mobileLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        setMobileMenu(false);

      }
    );

  });

}


/* =========================================================
   07. CLOSE MENU WITH ESCAPE
========================================================= */

function setupEscapeHandler() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        AppState.mobileMenuOpen
      ) {

        setMobileMenu(false);

      }

    }
  );

}


/* =========================================================
   08. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

function setupOutsideClick() {

  document.addEventListener(
    "click",
    event => {

      if (
        !AppState.mobileMenuOpen ||
        !DOM.mobileMenu ||
        !DOM.menuToggle
      ) {

        return;

      }


      const clickedInsideMenu =
        DOM.mobileMenu.contains(
          event.target
        );


      const clickedToggle =
        DOM.menuToggle.contains(
          event.target
        );


      if (
        !clickedInsideMenu &&
        !clickedToggle
      ) {

        setMobileMenu(false);

      }

    }
  );

}


/* =========================================================
   09. CURRENT YEAR
========================================================= */

function updateCurrentYear() {

  if (!DOM.currentYear) return;

  DOM.currentYear.textContent =
    new Date().getFullYear();

}


/* =========================================================
   10. SCROLL REVEAL
========================================================= */

function setupScrollReveal() {

  const revealElements =
    selectAll(
      ".benefit-card, " +
      ".feature-card, " +
      ".step-card, " +
      ".value-item, " +
      ".ai-section, " +
      ".cta-card, " +
      ".login-placeholder"
    );


  if (
    !revealElements.length
  ) {

    return;

  }


  revealElements.forEach(
    (element, index) => {

      element.classList.add(
        "reveal-on-scroll"
      );


      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 60, 360)}ms`
      );

    }
  );


  if (
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(
      element => {

        element.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            !entry.isIntersecting
          ) {

            return;

          }


          entry.target.classList.add(
            "is-visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {

        threshold: 0.12,

        rootMargin:
          "0px 0px -50px 0px"

      }
    );


  revealElements.forEach(
    element => {

      observer.observe(element);

    }
  );

}


/* =========================================================
   11. BUTTON INTERACTION
========================================================= */

function setupButtonFeedback() {

  const buttons =
    selectAll(
      ".btn"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "pointerdown",
      () => {

        button.classList.add(
          "is-pressed"
        );

      }
    );


    button.addEventListener(
      "pointerup",
      () => {

        button.classList.remove(
          "is-pressed"
        );

      }
    );


    button.addEventListener(
      "pointercancel",
      () => {

        button.classList.remove(
          "is-pressed"
        );

      }
    );

  });

}


/* =========================================================
   12. LOGIN DEMO
========================================================= */

function openLoginDemo() {

  const loginSection =
    document.getElementById(
      "login"
    );


  if (!loginSection) return;


  scrollToElement(
    loginSection
  );


  setTimeout(
    () => {

      const placeholder =
        loginSection.querySelector(
          ".login-placeholder"
        );


      if (!placeholder) return;


      placeholder.classList.add(
        "login-highlight"
      );


      setTimeout(
        () => {

          placeholder.classList.remove(
            "login-highlight"
          );

        },
        1400
      );

    },
    500
  );

}


/* =========================================================
   13. ANCHOR NAVIGATION
========================================================= */

function setupAnchorNavigation() {

  const anchorLinks =
    selectAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const href =
          link.getAttribute(
            "href"
          );


        if (
          !href ||
          href === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            href
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        setMobileMenu(false);


        scrollToElement(
          target
        );


        /*
         * Update URL without
         * causing a page reload.
         */

        if (
          window.history &&
          window.history.replaceState
        ) {

          window.history.replaceState(
            null,
            "",
            href
          );

        }

      }
    );

  });

}


/* =========================================================
   14. REDUCE MOTION SUPPORT
========================================================= */

function setupReducedMotion() {

  if (
    !window.matchMedia
  ) {

    return;

  }


  const mediaQuery =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (!mediaQuery.matches) {

    return;

  }


  DOM.body.classList.add(
    "reduce-motion"
  );

}


/* =========================================================
   15. LOGIN BUTTON
========================================================= */

function setupLoginDemo() {

  if (
    !DOM.loginDemoButton
  ) {

    return;

  }


  DOM.loginDemoButton.addEventListener(
    "click",
    openLoginDemo
  );

}


/* =========================================================
   16. WINDOW EVENTS
========================================================= */

function setupWindowEvents() {

  window.addEventListener(
    "scroll",
    updateHeaderOnScroll,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        AppState.mobileMenuOpen
      ) {

        setMobileMenu(false);

      }

    }
  );

}


/* =========================================================
   17. APPLICATION INITIALIZATION
========================================================= */

function initializeAI_PLS() {

  updateCurrentYear();

  updateHeaderOnScroll();

  setupMobileNavigation();

  setupEscapeHandler();

  setupOutsideClick();

  setupScrollReveal();

  setupButtonFeedback();

  setupAnchorNavigation();

  setupReducedMotion();

  setupLoginDemo();

  setupWindowEvents();


  console.log(
    "%cAI PLS initialized successfully.",
    "color:#22d3ee;font-weight:700;font-size:14px;"
  );

}


/* =========================================================
   18. BOOT
========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeAI_PLS
  );

} else {

  initializeAI_PLS();

}
