/* Schwick's Picks — minimal vanilla JS
   1. Mobile navigation toggle
   2. Optional gallery filter (only runs if the filter bar is present)
   No dependencies, no build step. */

(function () {
  "use strict";

  /* -------- Mobile nav toggle -------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu when a link is chosen (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Reset state when resizing up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 820) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* -------- Gallery filter (progressive enhancement) -------- */
  var filterBar = document.querySelector("[data-filter-bar]");
  if (filterBar) {
    var items = Array.prototype.slice.call(
      document.querySelectorAll("[data-category]")
    );
    var buttons = Array.prototype.slice.call(
      filterBar.querySelectorAll(".filter-btn")
    );

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;

      var category = btn.getAttribute("data-filter");

      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });

      items.forEach(function (item) {
        var show = category === "all" || item.getAttribute("data-category") === category;
        item.classList.toggle("is-hidden", !show);
      });
    });
  }
})();
