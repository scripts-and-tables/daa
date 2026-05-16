/*
 * Data Analytics Academy — lesson day-badge injector
 *
 * Auto-injects a coloured "Day N · Lesson M of 5" badge at the top of
 * every lesson and self-test page under /curriculum/dayN_*/, so we
 * don't have to edit each markdown file individually.
 */

(function () {
  "use strict";

  var DAYS = {
    "1": { tool: "Excel",       total: 5 },
    "2": { tool: "SQL",         total: 5 },
    "3": { tool: "Python",      total: 5 },
    "4": { tool: "Power BI",    total: 5 },
    "5": { tool: "Claude Code", total: 5 }
  };

  function injectBadge() {
    var article = document.querySelector("article.md-content__inner");
    if (!article) return;

    // Remove any previously injected badge (handles navigation.instant route changes)
    var existing = article.querySelector(":scope > .lesson-badge");
    if (existing) existing.remove();

    // Match /curriculum/dayN_anything/slug/  — capture day number + slug
    var path = window.location.pathname;
    var m = path.match(/\/curriculum\/day(\d)_[^/]+\/([^/]+)\/?$/);
    if (!m) return;

    var dayNum = m[1];
    var slug = m[2];
    if (!slug || slug === "index") return;

    var day = DAYS[dayNum];
    if (!day) return;

    var crumb;
    var numMatch = slug.match(/^0?(\d+)_/);
    if (numMatch) {
      var n = parseInt(numMatch[1], 10);
      crumb = "Day " + dayNum + " · " + day.tool + " · Lesson " + n + " of " + day.total;
    } else if (slug === "test") {
      crumb = "Day " + dayNum + " · " + day.tool + " · Self-test";
    } else {
      return;
    }

    var h1 = article.querySelector("h1");
    if (!h1) return;

    var badge = document.createElement("div");
    badge.className = "lesson-badge";
    badge.setAttribute("data-day", dayNum);

    var crumbEl = document.createElement("span");
    crumbEl.className = "lesson-badge__crumb";
    crumbEl.textContent = crumb;

    var backEl = document.createElement("a");
    backEl.className = "lesson-badge__back";
    backEl.href = "../";
    backEl.textContent = "← Day " + dayNum + " overview";

    badge.appendChild(crumbEl);
    badge.appendChild(backEl);
    h1.parentNode.insertBefore(badge, h1);
  }

  // First load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectBadge);
  } else {
    injectBadge();
  }

  // Re-run on every Material instant-navigation route change
  if (typeof window.document$ !== "undefined" && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(injectBadge);
  }
})();

/* ============================================================
   Scroll-fade reveals — IntersectionObserver
   Adds .is-visible to elements with class .reveal as they enter the viewport.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduce =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() {
    var els = document.querySelectorAll(".reveal");
    for (var i = 0; i < els.length; i++) els[i].classList.add("is-visible");
  }

  function setupReveal() {
    if (prefersReduce || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      obs.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupReveal);
  } else {
    setupReveal();
  }

  if (typeof window.document$ !== "undefined" && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(setupReveal);
  }
})();

/* ============================================================
   Hero stats counter — count up from 0 to the target value
   Looks for elements with class .count-up and a data-target attribute.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduce =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var target = el.getAttribute("data-target");
    var suffix = el.getAttribute("data-suffix") || "";
    var numericTarget = parseFloat(target);
    if (isNaN(numericTarget)) {
      el.textContent = target + suffix;
      return;
    }
    if (prefersReduce) {
      el.textContent = formatNumber(numericTarget) + suffix;
      return;
    }

    var duration = 900;
    var start = performance.now();

    function step(now) {
      var t = Math.min(1, (now - start) / duration);
      // easeOutQuart
      var eased = 1 - Math.pow(1 - t, 4);
      var current = numericTarget * eased;
      el.textContent = formatNumber(current, numericTarget) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(numericTarget) + suffix;
    }
    requestAnimationFrame(step);
  }

  function formatNumber(value, target) {
    target = target || value;
    if (target >= 1000) {
      // 100K case: keep raw — caller passed integer that's already shorthand
      return Math.round(value).toString();
    }
    if (Number.isInteger(target)) {
      return Math.round(value).toString();
    }
    return value.toFixed(1);
  }

  function setupCounters() {
    var els = document.querySelectorAll(".count-up[data-target]");
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(animateCount);
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.forEach(function (el) { obs.observe(el); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCounters);
  } else {
    setupCounters();
  }

  if (typeof window.document$ !== "undefined" && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(setupCounters);
  }
})();
