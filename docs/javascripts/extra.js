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
