/* ============================================================
   Project Zomboid Wiki — Static Prerender Build
   ------------------------------------------------------------
   Generates a real HTML file for every route, with route-
   specific <title>, meta, canonical, Open Graph, Twitter card
   and JSON-LD baked into <head>, plus the page's main content
   pre-rendered into <main> for crawlers.

   The SPA (app.js) still hydrates and handles in-app
   navigation. Cloudflare serves the matching static file when
   a route is requested directly, and falls back to index.html
   (single-page-application mode) for anything unmatched.

   Usage:  node build.js      (run before `wrangler deploy`)
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;

/* -------------------- minimal DOM stub -------------------- */
function mkEl() {
  const el = {
    _html: "",
    _text: "",
    dataset: {},
    style: {},
    attributes: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      },
    },
    set innerHTML(v) {
      this._html = String(v);
    },
    get innerHTML() {
      return this._html;
    },
    set textContent(v) {
      this._text = String(v);
    },
    get textContent() {
      return this._text;
    },
    setAttribute(k, v) {
      this.attributes[k] = v;
    },
    getAttribute(k) {
      return this.attributes[k] || null;
    },
    addEventListener() {},
    removeEventListener() {},
    querySelector() {
      return mkEl();
    },
    querySelectorAll() {
      return [];
    },
    appendChild() {},
    removeChild() {},
    remove() {},
    focus() {},
    blur() {},
    closest() {
      return null;
    },
    set onclick(f) {},
    set oninput(f) {},
    set onfocus(f) {},
  };
  return el;
}
const els = {};
[
  "main",
  "leftNav",
  "rightNav",
  "searchInput",
  "searchResults",
  "menuToggle",
].forEach((id) => {
  els[id] = mkEl();
});
const headEl = mkEl();
global.document = {
  getElementById: (id) => els[id] || null,
  querySelector: () => mkEl(),
  querySelectorAll: () => [],
  addEventListener() {},
  createElement: () => mkEl(),
  get activeElement() {
    return mkEl();
  },
  head: headEl,
};
global.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
global.history = { pushState() {} };
let CURRENT = "/";
global.location = {
  get pathname() {
    return CURRENT;
  },
  origin: "https://project-zomboid.gamewikihub.com",
};
global.window = { addEventListener() {}, scrollTo() {}, adsbygoogle: [] };
global.URL = URL;
global.setTimeout = () => {};

/* -------------------- load app code -------------------- */
require("./js/data.js");
global.window.WikiData = window.WikiData;
require("./js/meta.js");
global.window.WikiMeta = window.WikiMeta;
const D = window.WikiData;
const M = window.WikiMeta;
const APP = require.resolve("./js/app.js");

/* -------------------- helpers -------------------- */
function escAttr(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escText(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderMain(route) {
  CURRENT = route;
  delete require.cache[APP];
  els.main._html = "";
  require("./js/app.js");
  return els.main._html;
}

function headBlock(route) {
  const seo = M.seoFor(route);
  const tags = [
    `<title>${escText(seo.title)}</title>`,
    `<meta name="description" content="${escAttr(seo.description)}" />`,
    `<meta name="keywords" content="${escAttr((seo.keywords || []).join(", "))}" />`,
    `<link rel="canonical" href="${escAttr(seo.canonical)}" />`,
    `<meta property="og:site_name" content="Project Zomboid Survival Wiki" />`,
    `<meta property="og:title" content="${escAttr(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escAttr(seo.ogDescription)}" />`,
    `<meta property="og:type" content="${escAttr(seo.ogType)}" />`,
    `<meta property="og:url" content="${escAttr(seo.canonical)}" />`,
    `<meta property="og:image" content="${escAttr(seo.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escAttr(seo.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escAttr(seo.ogDescription)}" />`,
    `<meta name="twitter:image" content="${escAttr(seo.ogImage)}" />`,
  ];
  return "    " + tags.join("\n    ");
}

function jsonLdBlock(route) {
  const ld = JSON.stringify(M.jsonLdFor(route));
  return `<script type="application/ld+json" id="pzw-jsonld">${ld}</script>`;
}

function buildPage(template, route) {
  let html = template;
  html = html.replace(
    /<!-- pzw:head -->[\s\S]*?<!-- \/pzw:head -->/,
    "<!-- pzw:head -->\n" + headBlock(route) + "\n    <!-- /pzw:head -->",
  );
  html = html.replace(
    /<!-- pzw:jsonld -->|<script type="application\/ld\+json" id="pzw-jsonld">[\s\S]*?<\/script>/,
    jsonLdBlock(route),
  );
  html = html.replace(
    /<main id="main">[\s\S]*?<\/main>/,
    '<main id="main">' + renderMain(route) + "</main>",
  );
  return html;
}

/* -------------------- route list -------------------- */
function allRoutes() {
  const routes = [
    "/",
    "/getting-started",
    "/about",
    "/privacy-policy",
    "/contact",
    "/guides",
    "/traits",
    "/occupations",
    "/skills",
    "/weapons",
    "/maps",
    "/build42",
    "/vehicles",
    "/mods",
    "/multiplayer",
    "/tips",
    "/patches",
  ];
  const map = {
    guides: "guides",
    traits: "traits",
    occupations: "occupations",
    skills: "skills",
    weapons: "weapons",
    maps: "maps",
    build42: "build42",
    vehicles: "vehicles",
    mods: "mods",
    multiplayer: "multiplayer",
  };
  Object.keys(map).forEach((seg) => {
    (D[map[seg]] || []).forEach((e) => routes.push("/" + seg + "/" + e.id));
  });
  return routes;
}

function outPath(route) {
  if (route === "/") return path.join(ROOT, "index.html");
  return path.join(ROOT, route.replace(/^\//, ""), "index.html");
}

/* -------------------- run -------------------- */
function run() {
  const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  if (!/<!-- pzw:head -->/.test(template)) {
    console.error(
      "ERROR: index.html is missing the <!-- pzw:head --> marker. Aborting.",
    );
    process.exit(1);
  }
  const routes = allRoutes();
  let written = 0;
  routes.forEach((route) => {
    const html = buildPage(template, route);
    const file = outPath(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html, "utf8");
    written++;
  });
  console.log(
    "Static prerender complete: " + written + " HTML files generated.",
  );
}

run();
