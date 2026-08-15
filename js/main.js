"use strict";

document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuToggle || !mobileMenu) {
    console.error("AI PLS: Menu elements not found.");
    return;
  }

  menuToggle.addEventListener("click", function () {

    mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-active");

    const isOpen = mobileMenu.classList.contains("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      isOpen ? "false" : "true"
    );

  });

});
