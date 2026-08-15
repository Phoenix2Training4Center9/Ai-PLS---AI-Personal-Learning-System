/* =========================================================
   AI PLS — MAIN JAVASCRIPT
   Personal Learning System
   Version: 1.0
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const siteHeader = document.getElementById("site-header");
  const currentYear = document.getElementById("current-year");
  const loginDemoButton = document.getElementById("login-demo-button");


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  if (menuToggle && mobileMenu) {

    const mobileLinks = mobileMenu.querySelectorAll("a");


    /**
     * Open mobile navigation
     */
    const openMenu = () => {

      mobileMenu.classList.add("is-open");

      menuToggle.classList.add("is-active");

      menuToggle.setAttribute("aria-expanded", "true");

      mobileMenu.setAttribute("aria-hidden", "false");

      document.body.classList.add("menu-open");
    };


    /**
     * Close mobile navigation
     */
    const closeMenu = () => {

      mobileMenu.classList.remove("is-open");

      menuToggle.classList.remove("is-active");

      menuToggle.setAttribute("aria-expanded", "false");

      mobileMenu.setAttribute("aria-hidden", "true");

      document.body.classList.remove("menu-open");
    };


    /**
     * Toggle menu
     */
    menuToggle.addEventListener("click", (event) => {

      event.preventDefault();

      const isOpen =
        mobileMenu.classList.contains("is-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    /**
     * Close after clicking a navigation link
     */
    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    /**
     * Close when clicking outside menu
     */
    document.addEventListener("click", (event) => {

      const clickedInsideMenu =
        mobileMenu.contains(event.target);

      const clickedToggle =
        menuToggle.contains(event.target);

      if (
        mobileMenu.classList.contains("is-open") &&
        !clickedInsideMenu &&
        !clickedToggle
      ) {
        closeMenu();
      }

    });


    /**
     * Close with Escape
     */
    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    /**
     * Close menu when returning to desktop
     */
    window.addEventListener("resize", () => {

      if (window.innerWidth > 900) {
        closeMenu();
      }

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  if (siteHeader) {

    const updateHeader = () => {

      if (window.scrollY > 20) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }

    };

    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );

    updateHeader();
  }


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     LOGIN DEMO
  ======================================================= */

  if (loginDemoButton) {

    loginDemoButton.addEventListener("click", () => {

      loginDemoButton.classList.add("is-loading");

      const originalText =
        loginDemoButton.textContent;

      loginDemoButton.textContent =
        "جاري تجهيز الواجهة...";

      setTimeout(() => {

        loginDemoButton.classList.remove("is-loading");

        loginDemoButton.textContent =
          originalText;

        alert(
          "واجهة تسجيل الدخول سيتم تفعيلها في المرحلة القادمة من AI PLS."
        );

      }, 700);

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("main section[id]");

  const navLinks =
    document.querySelectorAll(
      '.main-nav a[href^="#"]'
    );


  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const currentId =
              entry.target.getAttribute("id");

            navLinks.forEach((link) => {

              const linkTarget =
                link.getAttribute("href");

              link.classList.toggle(
                "is-active",
                linkTarget === `#${currentId}`
              );

            });

          });

        },
        {
          root: null,
          threshold: 0.25,
          rootMargin: "-20% 0px -60% 0px"
        }
      );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  console.log(
    "AI PLS initialized successfully 🚀"
  );

});
