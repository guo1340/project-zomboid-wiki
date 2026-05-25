/* ============================================================
   Project Zomboid Wiki — App
   Path router, page renderers, search, filters, ad slots.
   No external dependencies.
   ============================================================ */

(function () {
  const D = window.WikiData;
  const main = document.getElementById('main');
  const leftNav = document.getElementById('leftNav');
  const rightNav = document.getElementById('rightNav');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const menuToggle = document.getElementById('menuToggle');

  /* -------------------- helpers -------------------- */
  const $ = (s, p = document) => p.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const byId = (arr, id) => (arr || []).find((x) => x.id === id);
  const tag = (text, cls) => `<span class="tag ${esc(cls || '')}">${esc(text)}</span>`;
  const titleCase = (s) => String(s || '').replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  /* -------------------- icons --------------------
     Inline SVG icons. Survival / tactical handbook style.
  ------------------------------------------------------------ */
  const SVG = {
    biohazard: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="10" fill="currentColor"/><path d="M50 12 Q40 30 50 40 Q60 30 50 12 Z" fill="currentColor"/><path d="M18 70 Q38 64 44 53 Q31 50 18 70 Z" fill="currentColor"/><path d="M82 70 Q62 64 56 53 Q69 50 82 70 Z" fill="currentColor"/><circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    crosshair: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="5"/><line x1="50" y1="8" x2="50" y2="30" stroke="currentColor" stroke-width="5"/><line x1="50" y1="70" x2="50" y2="92" stroke="currentColor" stroke-width="5"/><line x1="8" y1="50" x2="30" y2="50" stroke="currentColor" stroke-width="5"/><line x1="70" y1="50" x2="92" y2="50" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="5" fill="currentColor"/></svg>`,
    hammer: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="20" width="44" height="20" rx="4" fill="currentColor" transform="rotate(-40 44 30)"/><rect x="44" y="36" width="10" height="48" rx="3" fill="currentColor" transform="rotate(-40 49 60)"/></svg>`,
    wrench: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M62 20 a18 18 0 1 0 14 30 L82 56 L70 68 L52 50 a18 18 0 0 0-22-30 L42 32 L36 38 L48 50 L30 68 a10 10 0 0 0 14 14 L62 64" fill="currentColor"/></svg>`,
    book: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="18" width="56" height="64" rx="3" fill="currentColor"/><rect x="24" y="20" width="52" height="60" fill="rgba(255,255,255,0.1)"/><line x1="32" y1="34" x2="68" y2="34" stroke="currentColor" stroke-width="3"/><line x1="32" y1="46" x2="68" y2="46" stroke="currentColor" stroke-width="3"/><line x1="32" y1="58" x2="56" y2="58" stroke="currentColor" stroke-width="3"/></svg>`,
    sword: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M70 14 L78 22 L40 60 L32 60 L32 52 Z" fill="currentColor"/><rect x="22" y="62" width="22" height="8" rx="2" fill="currentColor" transform="rotate(45 33 66)"/><rect x="20" y="70" width="12" height="18" rx="3" fill="currentColor"/></svg>`,
    mappin: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 12 C32 12 20 26 20 44 C20 68 50 90 50 90 C50 90 80 68 80 44 C80 26 68 12 50 12 Z" fill="currentColor"/><circle cx="50" cy="42" r="12" fill="rgba(0,0,0,0.45)"/></svg>`,
    car: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14 60 L22 40 Q24 34 32 34 L68 34 Q76 34 78 40 L86 60 L86 70 L14 70 Z" fill="currentColor"/><circle cx="30" cy="70" r="9" fill="currentColor"/><circle cx="70" cy="70" r="9" fill="currentColor"/><rect x="34" y="40" width="32" height="12" fill="rgba(0,0,0,0.4)"/></svg>`,
    flame: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 10 C58 30 74 38 70 60 C68 78 56 88 50 88 C44 88 30 80 30 60 C30 46 40 44 42 52 C44 38 44 24 50 10 Z" fill="currentColor"/></svg>`,
    radio: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="18" y="40" width="64" height="40" rx="4" fill="currentColor"/><circle cx="34" cy="60" r="9" fill="rgba(0,0,0,0.45)"/><rect x="50" y="50" width="24" height="6" fill="rgba(0,0,0,0.45)"/><rect x="50" y="62" width="24" height="6" fill="rgba(0,0,0,0.45)"/><line x1="66" y1="40" x2="80" y2="18" stroke="currentColor" stroke-width="4"/></svg>`,
    server: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="20" width="56" height="24" rx="3" fill="currentColor"/><rect x="22" y="52" width="56" height="24" rx="3" fill="currentColor"/><circle cx="34" cy="32" r="4" fill="rgba(0,0,0,0.5)"/><circle cx="34" cy="64" r="4" fill="rgba(0,0,0,0.5)"/></svg>`,
    paw: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="50" cy="64" rx="20" ry="16" fill="currentColor"/><ellipse cx="28" cy="38" rx="8" ry="10" fill="currentColor"/><ellipse cx="44" cy="26" rx="7" ry="9" fill="currentColor"/><ellipse cx="62" cy="26" rx="7" ry="9" fill="currentColor"/><ellipse cx="76" cy="38" rx="8" ry="10" fill="currentColor"/></svg>`,
    badge: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 12 L62 22 L78 22 L78 38 L88 50 L78 62 L78 78 L62 78 L50 88 L38 78 L22 78 L22 62 L12 50 L22 38 L22 22 L38 22 Z" fill="currentColor"/><circle cx="50" cy="50" r="16" fill="rgba(0,0,0,0.4)"/></svg>`,
    shelter: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M50 16 L86 46 L78 46 L78 84 L22 84 L22 46 L14 46 Z" fill="currentColor"/><rect x="42" y="58" width="16" height="26" fill="rgba(0,0,0,0.45)"/></svg>`
  };

  function iconBox(kind) {
    return `<div class="ico ${esc(kind)}">${SVG[kind] || SVG.biohazard}</div>`;
  }

  /* -------------------- ad slot --------------------
     Inert until you fill in your AdSense publisher + slot
     IDs in index.html and uncomment the <ins> below.
  ----------------------------------------------------- */
  function adSlot(format) {
    const f = format || 'rectangle';
    const isBanner = f === 'banner';
    return `
      <aside class="ad-slot ad-${esc(f)}" aria-label="Advertisement">
        <span class="ad-label">Advertisement</span>
        <ins class="adsbygoogle"
          style="display:block;${isBanner ? 'width:100%;height:90px;' : ''}"
          data-ad-client="ca-pub-1319817671788428"
          data-ad-slot="6141169453"
          ${isBanner ? '' : 'data-ad-format="auto"'}
          data-full-width-responsive="true"></ins>
      </aside>
    `;
  }

  function loadAds() {
    if (!window.adsbygoogle) return;
    document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
      catch (e) { console.warn('AdSense push failed:', e); }
    });
  }

  /* -------------------- section renderers -------------------- */
  function calloutBlock(kind, label, text) {
    return `<div class="callout ${kind}"><span class="callout-label">${esc(label)}</span>${esc(text)}</div>`;
  }

  function sectionsHTML(sections) {
    return (sections || []).map((s) => {
      const list = s.list && s.list.length
        ? `<ul>${s.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`
        : '';
      let extra = '';
      if (s.warn) extra += calloutBlock('build42', 'Build 42 Warning', s.warn);
      if (s.tip) extra += calloutBlock('tip', 'Survivor Tip', s.tip);
      if (s.mistake) extra += calloutBlock('mistake', 'Beginner Mistake', s.mistake);
      return `<h3>${esc(s.h)}</h3>${list}${s.body || ''}${extra}`;
    }).join('');
  }

  /* -------------------- hero image -------------------- */
  function heroBlock(section, entity) {
    const hero = window.WikiMeta && window.WikiMeta.heroFor(section, entity);
    if (!hero) return '';
    return `<figure class="page-hero">
      <img src="${esc(hero.src)}" alt="${esc(hero.alt)}" width="1200" height="500"
        onerror="this.closest('.page-hero').classList.add('hero-missing');this.remove();">
      <span class="hero-fallback" aria-hidden="true">${esc(entity.name || entity.title || '')}</span>
    </figure>`;
  }

  /* -------------------- sources & update notes -------------------- */
  function resolveSources(list) {
    return (list || []).map((s) => (typeof s === 'string' ? D.sourceRegistry[s] : s)).filter(Boolean);
  }

  function sourceNotes(entity) {
    const site = D.site;
    const last = (entity && entity.lastUpdated) || site.lastUpdated;
    const build = (entity && entity.buildStatus) || site.buildStatus;
    const srcs = resolveSources(entity && entity.sources);
    const fallback = srcs.length ? srcs : resolveSources(['steamStore', 'officialBlog', 'pzwiki']);
    const links = `<ul class="src-list">${fallback.map((s) =>
      `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a><span> — ${esc(s.note)}</span></li>`
    ).join('')}</ul>`;
    const modNote = entity && entity.modNote
      ? `<p class="src-uncertain">${esc(entity.modNote)}</p>` : '';
    return `<aside class="source-notes" aria-label="Sources and update notes">
      <div class="src-head">Sources &amp; Update Notes</div>
      <div class="src-meta">
        <span><strong>Last updated:</strong> ${esc(last)}</span>
        <span><strong>Build focus:</strong> ${esc(build)}</span>
      </div>
      <div class="src-checked"><strong>Sources checked:</strong></div>
      ${links}
      ${modNote}
      <p class="src-uncertain">Note: Build 42 systems are still changing between unstable patches. Treat exact numbers, recipes and requirements as patch-dependent.</p>
    </aside>`;
  }

  /* -------------------- related pages -------------------- */
  function relatedBlock(entity) {
    const rel = (entity && entity.related) || [];
    if (!rel.length) return '';
    return `<nav class="related" aria-label="Related pages">
      <h3>Related Pages</h3>
      <div class="related-grid">
        ${rel.map((r) => `<a class="related-card" href="${esc(r.href)}">${esc(r.label)}</a>`).join('')}
      </div>
    </nav>`;
  }

  /* -------------------- dynamic SEO (client-side) -------------------- */
  function setMeta(attr, key, value) {
    let el = document.head && document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      if (document.head) document.head.appendChild(el);
    }
    el.setAttribute('content', value || '');
  }

  function setLink(rel, href) {
    let el = document.head && document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      if (document.head) document.head.appendChild(el);
    }
    el.setAttribute('href', href || '');
  }

  function applySeo(route) {
    if (!window.WikiMeta || !document.head) return;
    const seo = window.WikiMeta.seoFor(route);
    try {
      document.title = seo.title;
      setMeta('name', 'description', seo.description);
      setMeta('name', 'keywords', (seo.keywords || []).join(', '));
      setLink('canonical', seo.canonical);
      setMeta('property', 'og:title', seo.ogTitle);
      setMeta('property', 'og:description', seo.ogDescription);
      setMeta('property', 'og:url', seo.canonical);
      setMeta('property', 'og:image', seo.ogImage);
      setMeta('property', 'og:type', seo.ogType);
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', seo.ogTitle);
      setMeta('name', 'twitter:description', seo.ogDescription);
      setMeta('name', 'twitter:image', seo.ogImage);
      let ld = document.getElementById('jsonld');
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'jsonld';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(window.WikiMeta.jsonLdFor(route));
    } catch (e) { /* non-fatal */ }
  }

  /* -------------------- left nav -------------------- */
  function renderLeftNav(activeRoute) {
    leftNav.innerHTML = `
      <h3>Start Here</h3>
      <ul>
        <li><a href="/" data-r="/">Home</a></li>
        <li><a href="/getting-started" data-r="/getting-started">Getting Started</a></li>
        <li><a href="/guides" data-r="/guides">Survival Guides</a></li>
      </ul>
      <h3>Character</h3>
      <ul>
        <li><a href="/traits" data-r="/traits">Traits</a></li>
        <li><a href="/occupations" data-r="/occupations">Occupations</a></li>
        <li><a href="/skills" data-r="/skills">Skills</a></li>
      </ul>
      <h3>The Field</h3>
      <ul>
        <li><a href="/weapons" data-r="/weapons">Weapons</a></li>
        <li><a href="/maps" data-r="/maps">Maps &amp; Locations</a></li>
        <li><a href="/vehicles" data-r="/vehicles">Vehicles</a></li>
      </ul>
      <h3>Knox Archive</h3>
      <ul>
        <li><a href="/build42" data-r="/build42">Build 42 Hub</a></li>
        <li><a href="/mods" data-r="/mods">Mods</a></li>
        <li><a href="/multiplayer" data-r="/multiplayer">Multiplayer</a></li>
        <li><a href="/tips" data-r="/tips">Survivor Tips</a></li>
        <li><a href="/patches" data-r="/patches">Build News</a></li>
      </ul>
      <h3>Site Info</h3>
      <ul>
        <li><a href="/about" data-r="/about">About</a></li>
        <li><a href="/privacy-policy" data-r="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/contact" data-r="/contact">Contact</a></li>
      </ul>
      ${adSlot('half-page')}
    `;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (activeRoute === r || (activeRoute.startsWith(r + '/') && r !== '/')) a.classList.add('active');
      if (r === '/' && activeRoute === '/') a.classList.add('active');
    });
  }

  /* -------------------- right nav -------------------- */
  function renderRightNav(route) {
    let extra = '';
    if (route.startsWith('/traits')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="/occupations">Occupations</a></li>
        <li><a href="/skills">Skills</a></li>
      </ul>`;
    } else if (route.startsWith('/weapons')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="/skills">Combat skills</a></li>
        <li><a href="/guides/first-day-survival">Combat basics</a></li>
      </ul>`;
    } else if (route.startsWith('/build42')) {
      extra = `<h3>Build 42</h3><ul>
        <li><a href="/build42/build-42-overview">Overview</a></li>
        <li><a href="/build42/animals-hunting">Animals &amp; Hunting</a></li>
        <li><a href="/patches">Build news</a></li>
      </ul>`;
    } else if (route.startsWith('/maps')) {
      extra = `<h3>Related</h3><ul>
        <li><a href="/maps/best-base-locations">Best base locations</a></li>
        <li><a href="/vehicles">Vehicles</a></li>
      </ul>`;
    }
    const tip = D.survivorTips[Math.floor(Math.random() * D.survivorTips.length)];
    rightNav.innerHTML = `
      <h3>Most Searched</h3>
      <ul>
        <li><a href="/traits">Best Beginner Traits</a></li>
        <li><a href="/guides/how-infection-works">How Infection Works</a></li>
        <li><a href="/vehicles/how-to-hotwire-cars">How To Hotwire Cars</a></li>
        <li><a href="/maps/best-base-locations">Best Base Locations</a></li>
        <li><a href="/weapons">Best Weapons</a></li>
        <li><a href="/build42/build-42-overview">Build 42 Guide</a></li>
        <li><a href="/guides/surviving-winter">How To Survive Winter</a></li>
      </ul>
      ${extra}
      <h3>Survivor Tip</h3>
      <p class="qd">&ldquo;${esc(tip)}&rdquo;</p>
      <h3>Build 42 News</h3>
      <p class="qd">${esc(D.patches[0].version)} &mdash; the largest update in the game&rsquo;s history. <a href="/patches">Read more.</a></p>
      ${adSlot('rectangle')}
    `;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function parseRoute() {
    const pathRoute = location.pathname.replace(/\/$/, '') || '/';
    return pathRoute === '/index.html' ? '/' : pathRoute;
  }

  function go(path) {
    const cleanPath = path.replace(/\/$/, '') || '/';
    if (cleanPath === parseRoute()) return;
    history.pushState({}, '', cleanPath);
    leftNav.classList.remove('open');
    navigate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function navigate() {
    const route = parseRoute();
    renderLeftNav(route);
    renderRightNav(route);

    if (route === '/' || route === '') renderHome();
    else if (route === '/getting-started') renderStaticPage('getting-started');
    else if (route === '/guides') renderGuidesList();
    else if (route === '/traits') renderTraitsList();
    else if (route === '/occupations') renderOccupationsList();
    else if (route === '/skills') renderSkillsList();
    else if (route === '/weapons') renderWeaponsList();
    else if (route === '/maps') renderMapsList();
    else if (route === '/build42') renderBuild42List();
    else if (route === '/vehicles') renderVehiclesList();
    else if (route === '/mods') renderModsList();
    else if (route === '/multiplayer') renderMultiplayerList();
    else if (route === '/tips') renderTips();
    else if (route === '/patches') renderPatches();
    else if (route === '/about') renderInfoPage('about');
    else if (route === '/privacy-policy') renderInfoPage('privacy-policy');
    else if (route === '/contact') renderInfoPage('contact');
    else if (route.startsWith('/guides/')) renderGuideDetail(route.slice(8));
    else if (route.startsWith('/traits/')) renderTraitDetail(route.slice(8));
    else if (route.startsWith('/occupations/')) renderOccupationDetail(route.slice(13));
    else if (route.startsWith('/skills/')) renderSkillDetail(route.slice(8));
    else if (route.startsWith('/weapons/')) renderWeaponDetail(route.slice(9));
    else if (route.startsWith('/maps/')) renderMapDetail(route.slice(6));
    else if (route.startsWith('/build42/')) renderBuild42Detail(route.slice(9));
    else if (route.startsWith('/vehicles/')) renderVehicleDetail(route.slice(10));
    else if (route.startsWith('/mods/')) renderModDetail(route.slice(6));
    else if (route.startsWith('/multiplayer/')) renderMultiplayerDetail(route.slice(13));
    else render404(route);

    applySeo(route);
    setTimeout(loadAds, 100);
  }

  /* ============================================================
     HOME
     ============================================================ */
  function renderHome() {
    const cat = [
      { href: '/skills', icon: 'hammer', label: 'Skills' },
      { href: '/traits', icon: 'badge', label: 'Traits' },
      { href: '/weapons', icon: 'sword', label: 'Weapons' },
      { href: '/guides', icon: 'biohazard', label: 'Survival Guides' },
      { href: '/maps/best-base-locations', icon: 'shelter', label: 'Base Building' },
      { href: '/vehicles', icon: 'car', label: 'Vehicles' },
      { href: '/build42/animals-hunting', icon: 'paw', label: 'Hunting' },
      { href: '/occupations', icon: 'wrench', label: 'Occupations' },
      { href: '/multiplayer', icon: 'server', label: 'Multiplayer' },
      { href: '/maps', icon: 'mappin', label: 'Maps' },
      { href: '/mods', icon: 'radio', label: 'Mods' },
      { href: '/build42', icon: 'flame', label: 'Build 42' }
    ];
    const mostSearched = [
      { href: '/traits', t: 'Best Beginner Traits' },
      { href: '/guides/how-infection-works', t: 'How Infection Works' },
      { href: '/vehicles/how-to-hotwire-cars', t: 'How To Hotwire Cars' },
      { href: '/maps/best-base-locations', t: 'Best Base Locations' },
      { href: '/weapons', t: 'Best Weapons' },
      { href: '/build42/build-42-overview', t: 'Build 42 Guide' },
      { href: '/skills/carpentry', t: 'Carpentry Guide' },
      { href: '/skills/electrical', t: 'Generator Guide' },
      { href: '/guides/helicopter-event', t: 'How Helicopter Events Work' },
      { href: '/guides/surviving-winter', t: 'How To Survive Winter' }
    ];
    const b42 = [
      { href: '/build42/animals-hunting', t: 'Animals' },
      { href: '/build42/animals-hunting', t: 'Hunting' },
      { href: '/skills/fitness', t: 'Muscle Strain' },
      { href: '/build42/crafting-overhaul', t: 'Crafting Overhaul' },
      { href: '/build42/build-42-overview', t: 'Lighting Changes' },
      { href: '/build42/blacksmithing', t: 'Blacksmithing' },
      { href: '/skills/foraging', t: 'Wilderness Survival' },
      { href: '/build42/build-42-overview', t: 'New Animation Systems' }
    ];

    main.innerHTML = `
      <div class="hero">
        <img class="hero-bg" src="/assets/images/hero/homepage-hero.jpg" alt="Project Zomboid gameplay scene" loading="eager">
        <div class="hero-fog"></div>
        <div class="hero-inner">
          <span class="hero-kicker">Knox County Survival Manual</span>
          <h1>Project Zomboid Wiki</h1>
          <p class="hero-quote">&ldquo;Survive longer. Die slower.&rdquo;</p>
          <p class="hero-sub">The practical survival guide for Build 42 and beyond.</p>
          <div class="hero-buttons">
            <a class="btn" href="/guides/first-day-survival">Beginner Guide</a>
            <a class="btn" href="/build42">Build 42 Changes</a>
            <a class="btn" href="/traits">Traits Guide</a>
            <a class="btn" href="/maps">Maps &amp; Locations</a>
            <a class="btn" href="/maps/best-base-locations">Best Base Locations</a>
          </div>
        </div>
      </div>

      ${adSlot('banner')}

      <h2 class="section-head">Field Categories</h2>
      <div class="cards cat-cards">
        ${cat.map((c) => `
          <a class="card cat-card" href="${c.href}">
            ${iconBox(c.icon)}
            <h4>${esc(c.label)}</h4>
          </a>`).join('')}
      </div>

      <div class="home-grid">
        <div class="page">
          <h2>Most Searched Pages</h2>
          <div class="breadcrumb">The pages survivors come back to.</div>
          <ul class="link-list">
            ${mostSearched.map((m) => `<li><a href="${m.href}">${esc(m.t)}</a></li>`).join('')}
          </ul>
        </div>
        <div class="page">
          <h2>Build 42 Spotlight</h2>
          <div class="breadcrumb">The update reshaping long-term survival.</div>
          <div class="chip-list">
            ${b42.map((b) => `<a class="chip" href="${b.href}">${esc(b.t)}</a>`).join('')}
          </div>
          <p style="margin-top:14px;"><a href="/build42">Open the full Build 42 Hub &rarr;</a></p>
        </div>
      </div>

      ${adSlot('in-article')}

      <div class="page">
        <h2>Latest Build News &mdash; ${esc(D.patches[0].version)}</h2>
        <div class="breadcrumb">${esc(D.patches[0].date)}</div>
        <ul>${D.patches[0].changes.slice(0, 5).map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        <p><a href="/patches">View full build history &rarr;</a></p>
      </div>
    `;
  }

  /* ============================================================
     STATIC PAGES
     ============================================================ */
  function renderStaticPage(slug) {
    const p = D.pages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>${esc(p.title)}</h1>
        <div class="breadcrumb">Home / ${esc(p.title)}</div>
        ${p.body}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     GUIDES
     ============================================================ */
  function renderGuidesList() {
    const beginner = D.guides.filter((g) => g.category === 'beginner');
    const advanced = D.guides.filter((g) => g.category === 'advanced');
    const cardFor = (g) => `
      <a class="card" href="/guides/${esc(g.id)}">
        <h4>${esc(g.title)}</h4>
        <p>${esc(g.summary)}</p>
      </a>`;
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Survival Guides</h1>
        <div class="breadcrumb">Home / Survival Guides</div>
        <p>Field manuals written from the perspective of survivors who have been through it. Start with the beginner guides; graduate to advanced survival once your base holds.</p>
        <h3>Beginner Guides</h3>
        <div class="cards">${beginner.map(cardFor).join('')}</div>
        <h3>Advanced Survival</h3>
        <div class="cards">${advanced.map(cardFor).join('')}</div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderGuideDetail(id) {
    const g = byId(D.guides, id);
    if (!g) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page article">
        <div class="breadcrumb"><a href="/guides">Survival Guides</a> / ${esc(g.title)}</div>
        <h1>${esc(g.title)}</h1>
        ${heroBlock('guides', g)}
        <p class="lore">${esc(g.tagline)}</p>
        ${sectionsHTML(g.sections)}
        ${tipBox()}
        ${relatedBlock(g)}
        ${sourceNotes(g)}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     TRAITS
     ============================================================ */
  function traitRowsHTML(rows) {
    return rows.length === 0
      ? `<tr><td colspan="5"><div class="empty-result">No traits match.</div></td></tr>`
      : rows.map((t) => `
        <tr>
          <td><a href="/traits/${esc(t.id)}" class="row-link">${esc(t.name)}</a></td>
          <td>${tag(t.polarity, t.polarity === 'positive' ? 'good' : 'bad')}</td>
          <td class="num">${esc(t.cost)}</td>
          <td>${esc(t.difficulty)}</td>
          <td>${esc((t.worthIt || '').split('.')[0])}</td>
        </tr>`).join('');
  }

  function renderTraitsList() {
    const stateKey = 'traits-filters';
    const state = loadState(stateKey, { polarity: 'all', search: '' });
    const initialRows = D.traits.slice();
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Traits</h1>
        <div class="breadcrumb">Home / Traits</div>
        <p>Traits are the highest-leverage decision at character creation. Positive traits cost points; negative traits refund them. The art is funding the survivability you need with downsides you can live with.</p>
        <div class="toolbar" id="traitsTb">
          <div class="filter-group">
            <span class="filter-label">Type</span>
            ${['all', 'positive', 'negative'].map((t) => `<button data-f="polarity" data-v="${t}">${titleCase(t)}</button>`).join('')}
          </div>
          <input type="text" class="filter-search" placeholder="Filter by name…" data-f="search" value="${esc(state.search)}">
          <span class="result-count" id="traitsCount">${D.traits.length} of ${D.traits.length}</span>
        </div>
        <table class="data">
          <thead><tr>
            <th>Trait</th><th>Type</th><th class="num">Points</th><th>Difficulty</th><th>Worth It?</th>
          </tr></thead>
          <tbody id="traitsBody">${traitRowsHTML(initialRows)}</tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;
    bindTraitsTable();
  }

  function bindTraitsTable() {
    if (!D.traits || !D.traits.length) return;
    const toolbar = $('#traitsTb');
    const body = $('#traitsBody');
    const count = $('#traitsCount');
    const search = toolbar && toolbar.querySelector('input.filter-search');
    if (!toolbar || !body || !count || !search) return;
    const stateKey = 'traits-filters';
    const state = loadState(stateKey, { polarity: 'all', search: search.value || '' });
    state.polarity = ['all', 'positive', 'negative'].includes(state.polarity) ? state.polarity : 'all';
    if (state.search) search.value = state.search;
    function applyAndRender() {
      saveState(stateKey, state);
      let rows = D.traits.slice();
      if (state.polarity !== 'all') rows = rows.filter((t) => t.polarity === state.polarity);
      if (state.search) {
        const q = state.search.toLowerCase();
        rows = rows.filter((t) => t.name.toLowerCase().includes(q));
      }
      $('#traitsBody').innerHTML = traitRowsHTML(rows);
      $('#traitsCount').textContent = `${rows.length} of ${D.traits.length}`;
      document.querySelectorAll('#traitsTb [data-f="polarity"]').forEach((b) => b.classList.toggle('active', b.dataset.v === state.polarity));
    }
    toolbar.querySelectorAll('[data-f="polarity"]').forEach((b) => {
      b.addEventListener('click', () => { state.polarity = b.dataset.v; applyAndRender(); });
    });
    search.addEventListener('input', () => { state.search = search.value; applyAndRender(); });
    applyAndRender();
  }

  function renderTraitDetail(id) {
    const t = byId(D.traits, id);
    if (!t) return render404(id);
    const pairings = (t.occupationPairings || []).map((oid) => byId(D.occupations, oid)).filter(Boolean);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/traits">Traits</a> / ${esc(t.name)}</div>
        <div class="detail-grid">
          <div class="article">
            <h1>${esc(t.name)} ${tag(t.polarity, t.polarity === 'positive' ? 'good' : 'bad')}</h1>
            <p class="lore">${esc(t.tone)}</p>
            <h3>Why Players Take It</h3><p>${esc(t.whyPlayersTake)}</p>
            <h3>Early Game Impact</h3><p>${esc(t.earlyImpact)}</p>
            <h3>Mid Game Impact</h3><p>${esc(t.midImpact)}</p>
            <h3>Late Game Impact</h3><p>${esc(t.lateImpact)}</p>
            <h3>Hidden Mechanics</h3><p>${esc(t.hidden)}</p>
            <h3>Is It Worth Taking?</h3>
            <div class="callout tip">${esc(t.worthIt)}</div>
            <h3>Best Occupation Pairings</h3>
            <div class="chip-list">
              ${pairings.length ? pairings.map((o) => `<a class="chip" href="/occupations/${esc(o.id)}">${esc(o.name)}</a>`).join('') : '<span class="qd">Flexible — works with any occupation.</span>'}
            </div>
            <h3>Community Verdict</h3><p>${esc(t.communityVerdict)}</p>
            ${relatedBlock(t)}
            ${sourceNotes(t)}
          </div>
          <div class="infobox">
            <div class="infobox-head ${t.polarity === 'positive' ? 'pos' : 'neg'}">${esc(t.name)}</div>
            <dl>
              <dt>Type</dt><dd>${tag(t.polarity, t.polarity === 'positive' ? 'good' : 'bad')}</dd>
              <dt>Points</dt><dd>${esc(t.cost)}</dd>
              <dt>Difficulty</dt><dd>${esc(t.difficulty)}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     OCCUPATIONS
     ============================================================ */
  function renderOccupationsList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Occupations</h1>
        <div class="breadcrumb">Home / Occupations</div>
        <p>Your occupation is a bundle of pre-spent skill points and, sometimes, a unique capability. Pick the one that fixes the weakness your playstyle cannot afford.</p>
        <div class="cards">
          ${D.occupations.map((o) => `
            <a class="card" href="/occupations/${esc(o.id)}">
              <h4>${esc(o.name)} ${tag('Beginner: ' + o.beginnerFriendly, o.beginnerFriendly === 'High' ? 'good' : '')}</h4>
              <p>${esc(o.summary)}</p>
            </a>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderOccupationDetail(id) {
    const o = byId(D.occupations, id);
    if (!o) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/occupations">Occupations</a> / ${esc(o.name)}</div>
        <div class="detail-grid">
          <div class="article">
            <h1>${esc(o.name)}</h1>
            <p class="lore">${esc(o.tone)}</p>
            <h3>Summary</h3><p>${esc(o.summary)}</p>
            <h3>Bonuses</h3>
            <ul>${(o.bonuses || []).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
            ${sectionsHTML(o.sections)}
            <h3>Verdict</h3>
            <div class="callout tip">${esc(o.verdict)}</div>
            ${relatedBlock(o)}
            ${sourceNotes(o)}
          </div>
          <div class="infobox">
            <div class="infobox-head">${esc(o.name)}</div>
            <dl>
              <dt>Point cost</dt><dd>${esc(o.cost)}</dd>
              <dt>Beginner</dt><dd>${tag(o.beginnerFriendly, o.beginnerFriendly === 'High' ? 'good' : '')}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     SKILLS
     ============================================================ */
  function renderSkillsList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Skills</h1>
        <div class="breadcrumb">Home / Skills</div>
        <p>Skills are how a survivor stops depending on luck. Each page covers what the skill does, the fastest XP routes, the books that matter, and the mistakes that waste your time.</p>
        <table class="data">
          <thead><tr><th>Skill</th><th>What It Governs</th></tr></thead>
          <tbody>
            ${D.skills.map((s) => `
              <tr>
                <td><a href="/skills/${esc(s.id)}" class="row-link">${esc(s.name)}</a></td>
                <td>${esc(s.overview)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderSkillDetail(id) {
    const s = byId(D.skills, id);
    if (!s) return render404(id);
    const pairings = (s.pairings || []).map((pid) => byId(D.skills, pid)).filter(Boolean);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page article">
        <div class="breadcrumb"><a href="/skills">Skills</a> / ${esc(s.name)}</div>
        <h1>${esc(s.name)}</h1>
        <h3>Overview</h3><p>${esc(s.overview)}</p>
        <h3>Why It Matters</h3><p>${esc(s.whyItMatters)}</p>
        <h3>Fastest XP Methods</h3><p>${esc(s.fastestXP)}</p>
        <h3>Best Books</h3><p>${esc(s.bestBooks)}</p>
        <h3>VHS Priority</h3><p>${esc(s.vhsPriority)}</p>
        <h3>Common Mistakes</h3>
        <div class="callout warn">${esc(s.commonMistakes)}</div>
        <h3>Build 42 Changes</h3><p>${esc(s.build42Changes)}</p>
        <h3>Recommended Pairings</h3>
        <div class="chip-list">
          ${pairings.length ? pairings.map((p) => `<a class="chip" href="/skills/${esc(p.id)}">${esc(p.name)}</a>`).join('') : '<span class="qd">Pairs broadly with any build.</span>'}
        </div>
        ${relatedBlock(s)}
        ${sourceNotes(s)}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     WEAPONS
     ============================================================ */
  function weaponRowsHTML(rows) {
    return rows.length === 0
      ? `<tr><td colspan="4"><div class="empty-result">No weapons match.</div></td></tr>`
      : rows.map((w) => `
        <tr>
          <td><a href="/weapons/${esc(w.id)}" class="row-link">${esc(w.name)}</a></td>
          <td>${tag(w.weaponType, w.weaponType === 'ranged' ? 'bad' : '')}</td>
          <td>${tag(w.class)}</td>
          <td>${esc((w.bestSituations || '').split(/[;.]/)[0])}</td>
        </tr>`).join('');
  }

  function renderWeaponsList() {
    const stateKey = 'weapons-filters';
    const state = loadState(stateKey, { type: 'all', search: '' });
    const initialRows = D.weapons.slice();
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Weapons</h1>
        <div class="breadcrumb">Home / Weapons</div>
        <p>A weapon is a long-term relationship. The best one is rarely the one that hits hardest — it is the one that lasts, does not exhaust you, and does not bring the whole street down on your head.</p>
        <div class="toolbar" id="wpnTb">
          <div class="filter-group">
            <span class="filter-label">Type</span>
            ${['all', 'melee', 'ranged'].map((t) => `<button data-f="type" data-v="${t}">${titleCase(t)}</button>`).join('')}
          </div>
          <input type="text" class="filter-search" placeholder="Filter by name…" data-f="search" value="${esc(state.search)}">
          <span class="result-count" id="wpnCount">${D.weapons.length} of ${D.weapons.length}</span>
        </div>
        <table class="data">
          <thead><tr><th>Weapon</th><th>Type</th><th>Class</th><th>Best For</th></tr></thead>
          <tbody id="wpnBody">${weaponRowsHTML(initialRows)}</tbody>
        </table>
      </div>
      ${adSlot('in-article')}
    `;
    bindWeaponsTable();
  }

  function bindWeaponsTable() {
    if (!D.weapons || !D.weapons.length) return;
    const toolbar = $('#wpnTb');
    const body = $('#wpnBody');
    const count = $('#wpnCount');
    const search = toolbar && toolbar.querySelector('input.filter-search');
    if (!toolbar || !body || !count || !search) return;
    const stateKey = 'weapons-filters';
    const state = loadState(stateKey, { type: 'all', search: search.value || '' });
    state.type = ['all', 'melee', 'ranged'].includes(state.type) ? state.type : 'all';
    if (state.search) search.value = state.search;
    function applyAndRender() {
      saveState(stateKey, state);
      let rows = D.weapons.slice();
      if (state.type !== 'all') rows = rows.filter((w) => w.weaponType === state.type);
      if (state.search) {
        const q = state.search.toLowerCase();
        rows = rows.filter((w) => w.name.toLowerCase().includes(q));
      }
      $('#wpnBody').innerHTML = weaponRowsHTML(rows);
      $('#wpnCount').textContent = `${rows.length} of ${D.weapons.length}`;
      document.querySelectorAll('#wpnTb [data-f="type"]').forEach((b) => b.classList.toggle('active', b.dataset.v === state.type));
    }
    toolbar.querySelectorAll('[data-f="type"]').forEach((b) => {
      b.addEventListener('click', () => { state.type = b.dataset.v; applyAndRender(); });
    });
    search.addEventListener('input', () => { state.search = search.value; applyAndRender(); });
    applyAndRender();
  }

  function renderWeaponDetail(id) {
    const w = byId(D.weapons, id);
    if (!w) return render404(id);
    const syn = (w.skillSynergies || []).map((sid) => byId(D.skills, sid)).filter(Boolean);
    const stat = (label, val) => `<dt>${label}</dt><dd>${esc(val)}</dd>`;
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/weapons">Weapons</a> / ${esc(w.name)}</div>
        <div class="detail-grid">
          <div class="article">
            <h1>${esc(w.name)} ${tag(w.weaponType, w.weaponType === 'ranged' ? 'bad' : '')}</h1>
            <p class="lore">${esc(w.tone)}</p>
            <h3>Weapon Overview</h3><p>${esc(w.overview)}</p>
            <h3>Durability</h3><p>${esc(w.durability)}</p>
            <h3>Damage</h3><p>${esc(w.damage)}</p>
            <h3>Noise</h3><p>${esc(w.noise)}</p>
            <h3>Endurance Cost</h3><p>${esc(w.endurance)}</p>
            <h3>Multi-Target Potential</h3><p>${esc(w.multiTarget)}</p>
            <h3>Repairability</h3><p>${esc(w.repairability)}</p>
            <h3>Skill Synergies</h3>
            <div class="chip-list">
              ${syn.length ? syn.map((s) => `<a class="chip" href="/skills/${esc(s.id)}">${esc(s.name)}</a>`).join('') : '<span class="qd">None.</span>'}
            </div>
            <h3>Best Situations</h3>
            <div class="callout tip">${esc(w.bestSituations)}</div>
            <h3>Worst Situations</h3>
            <div class="callout warn">${esc(w.worstSituations)}</div>
            ${relatedBlock(w)}
            ${sourceNotes(w)}
          </div>
          <div class="infobox">
            <div class="infobox-head">${esc(w.name)}</div>
            <dl>
              ${stat('Type', titleCase(w.weaponType))}
              ${stat('Class', w.class)}
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     MAPS
     ============================================================ */
  function dangerClass(d) {
    return ({ Low: 'good', Moderate: '', High: 'bad', Extreme: 'bad' })[d] || '';
  }

  function renderMapsList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Maps &amp; Locations</h1>
        <div class="breadcrumb">Home / Maps &amp; Locations</div>
        <p>Where you survive matters as much as how. These guides rate towns by danger, loot quality and beginner viability — and tell you where to actually put your base.</p>
        <div class="cards">
          ${D.maps.map((m) => `
            <a class="card" href="/maps/${esc(m.id)}">
              <h4>${esc(m.name)} ${tag(m.dangerRating, dangerClass(m.dangerRating))}</h4>
              <p>${esc(m.tone)}</p>
            </a>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderMapDetail(id) {
    const m = byId(D.maps, id);
    if (!m) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <div class="breadcrumb"><a href="/maps">Maps &amp; Locations</a> / ${esc(m.name)}</div>
        <div class="detail-grid">
          <div class="article">
            <h1>${esc(m.name)}</h1>
            ${heroBlock('maps', m)}
            <p class="lore">${esc(m.tone)}</p>
            ${sectionsHTML(m.sections)}
            ${tipBox()}
            ${relatedBlock(m)}
            ${sourceNotes(m)}
          </div>
          <div class="infobox">
            <div class="infobox-head">${esc(m.name)}</div>
            <dl>
              <dt>Danger</dt><dd>${tag(m.dangerRating, dangerClass(m.dangerRating))}</dd>
              <dt>Loot</dt><dd>${esc(m.lootQuality)}</dd>
              <dt>Beginner</dt><dd>${m.beginnerViable ? tag('Viable', 'good') : tag('Not advised', 'bad')}</dd>
            </dl>
          </div>
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     BUILD 42 HUB
     ============================================================ */
  function renderBuild42List() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Build 42 Hub</h1>
        <div class="breadcrumb">Home / Build 42</div>
        <p>Build 42 is the largest update in the game&rsquo;s history — close to an expansion. It shifts Project Zomboid toward long-term survival depth: crafting, animals, hunting and self-sufficiency.</p>
        <div class="cards">
          ${D.build42.map((b) => `
            <a class="card" href="/build42/${esc(b.id)}">
              <h4>${esc(b.name)}</h4>
              <p>${esc(b.intro)}</p>
            </a>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderBuild42Detail(id) {
    const b = byId(D.build42, id);
    if (!b) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page article">
        <div class="breadcrumb"><a href="/build42">Build 42</a> / ${esc(b.name)}</div>
        <h1>${esc(b.name)}</h1>
        ${heroBlock('build42', b)}
        <p class="lore">${esc(b.intro)}</p>
        ${calloutBlock('build42', 'Build 42 Warning', 'Build 42 is still changing. Systems, numbers, recipes, traits, occupations, animal behaviour and crafting requirements may shift between unstable patches. This guide focuses on practical survival patterns rather than fragile exact values.')}
        ${sectionsHTML(b.sections)}
        ${tipBox()}
        ${relatedBlock(b)}
        ${sourceNotes(b)}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     VEHICLES
     ============================================================ */
  function renderVehiclesList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Vehicles</h1>
        <div class="breadcrumb">Home / Vehicles</div>
        <p>A working car is storage, shelter and an escape plan in one. These guides cover getting one running and choosing the right one for the job.</p>
        <div class="cards">
          ${D.vehicles.map((v) => `
            <a class="card" href="/vehicles/${esc(v.id)}">
              <h4>${esc(v.name)}</h4>
              <p>${esc(v.intro)}</p>
            </a>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderVehicleDetail(id) {
    const v = byId(D.vehicles, id);
    if (!v) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page article">
        <div class="breadcrumb"><a href="/vehicles">Vehicles</a> / ${esc(v.name)}</div>
        <h1>${esc(v.name)}</h1>
        ${heroBlock('vehicles', v)}
        <p class="lore">${esc(v.intro)}</p>
        ${sectionsHTML(v.sections)}
        ${tipBox()}
        ${relatedBlock(v)}
        ${sourceNotes(v)}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     MODS
     ============================================================ */
  function renderModsList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Mods</h1>
        <div class="breadcrumb">Home / Mods</div>
        <p>Project Zomboid has one of the most active modding communities in survival gaming. These guides cover the mods survivors most often reach for — and the compatibility traps to avoid.</p>
        <div class="cards">
          ${D.mods.map((m) => `
            <a class="card" href="/mods/${esc(m.id)}">
              <h4>${esc(m.name)}</h4>
              <p>${esc(m.intro)}</p>
            </a>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderModDetail(id) {
    const m = byId(D.mods, id);
    if (!m) return render404(id);
    const modList = (m.modList || []).length ? `
      <h3>Recommended Mods</h3>
      <div class="mod-list">
        ${m.modList.map((x) => `
          <div class="mod-row">
            <div class="mod-name">${esc(x.name)}</div>
            <div class="mod-why">${esc(x.why)}</div>
          </div>`).join('')}
      </div>` : '';
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page article">
        <div class="breadcrumb"><a href="/mods">Mods</a> / ${esc(m.name)}</div>
        <h1>${esc(m.name)}</h1>
        ${heroBlock('mods', m)}
        <p class="lore">${esc(m.intro)}</p>
        ${sectionsHTML(m.sections)}
        ${modList}
        ${tipBox()}
        ${relatedBlock(m)}
        ${sourceNotes(m)}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     MULTIPLAYER
     ============================================================ */
  function renderMultiplayerList() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Multiplayer</h1>
        <div class="breadcrumb">Home / Multiplayer</div>
        <p>Surviving alongside other people is a different game. These guides cover server configuration and the social rules that keep a community alive.</p>
        <div class="cards">
          ${D.multiplayer.map((mp) => `
            <a class="card" href="/multiplayer/${esc(mp.id)}">
              <h4>${esc(mp.name)}</h4>
              <p>${esc(mp.intro)}</p>
            </a>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderMultiplayerDetail(id) {
    const mp = byId(D.multiplayer, id);
    if (!mp) return render404(id);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page article">
        <div class="breadcrumb"><a href="/multiplayer">Multiplayer</a> / ${esc(mp.name)}</div>
        <h1>${esc(mp.name)}</h1>
        ${heroBlock('multiplayer', mp)}
        <p class="lore">${esc(mp.intro)}</p>
        ${sectionsHTML(mp.sections)}
        ${tipBox()}
        ${relatedBlock(mp)}
        ${sourceNotes(mp)}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     TIPS / PATCHES
     ============================================================ */
  function tipBox() {
    const tip = D.survivorTips[Math.floor(Math.random() * D.survivorTips.length)];
    return `<div class="survivor-tip"><span class="st-label">Survivor Tip</span><p>&ldquo;${esc(tip)}&rdquo;</p></div>`;
  }

  function renderTips() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Survivor Tips</h1>
        <div class="breadcrumb">Home / Survivor Tips</div>
        <p>Hard-won advice, repeated until it became common sense. Read it before Knox Country teaches it to you the expensive way.</p>
        <div class="tip-grid">
          ${D.survivorTips.map((t) => `<div class="survivor-tip"><span class="st-label">Tip</span><p>&ldquo;${esc(t)}&rdquo;</p></div>`).join('')}
        </div>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderPatches() {
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page">
        <h1>Build News</h1>
        <div class="breadcrumb">Home / Build News</div>
        <p style="color:var(--muted);font-size:13px;">Most recent first. Build 42 is the largest update the game has ever received.</p>
        ${D.patches.map((p) => `
          <div class="patch">
            <div class="patch-meta"><span class="ver">${esc(p.version)}</span><span>${esc(p.date)}</span></div>
            <ul>${p.changes.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      ${adSlot('in-article')}
    `;
  }

  /* ============================================================
     INFO PAGES (about / privacy / contact)
     ============================================================ */
  function renderInfoPage(slug) {
    const pages = {
      'about': {
        title: 'About Project Zomboid Wiki',
        crumb: 'About',
        body: `
          <p><strong>Project Zomboid Wiki</strong> is an unofficial, fan-made survival guide for players navigating the Knox Event. It collects practical guidance on traits, occupations, skills, weapons, maps, vehicles, Build 42 systems and long-term survival strategy.</p>
          <p>This site is built and maintained as a static community resource. It is not affiliated with, endorsed by, or sponsored by The Indie Stone or any rights holder of Project Zomboid.</p>
          <h3>Our approach</h3>
          <p>This wiki is written to sound like advice from survivors who have actually put in the hours — practical, opinionated, and focused on the long game. Every page leads with what matters, explains why, and names the mistakes that get new players killed.</p>
          <h3>Content accuracy</h3>
          <p>Project Zomboid is in active development, and Build 42 changes systems substantially. Patch updates, balance changes and community discoveries can make older pages incomplete. Use the <a href="/contact">Contact page</a> to report corrections.</p>
          <h3>Advertising</h3>
          <p>This site may display advertising to help cover hosting, domain and maintenance costs. Ads are placed so they do not block core wiki content.</p>
        `
      },
      'privacy-policy': {
        title: 'Privacy Policy',
        crumb: 'Privacy Policy',
        body: `
          <p><strong>Effective date:</strong> May 22, 2026</p>
          <p>This Privacy Policy explains how Project Zomboid Wiki handles information when you visit this website.</p>
          <h3>Information we collect</h3>
          <p>This site is a static wiki and does not require user accounts. We do not intentionally collect names, passwords, payment information, or private account details from visitors.</p>
          <p>Basic technical information may be processed automatically by hosting, security, analytics and advertising providers. This can include IP address, browser type, device type, pages visited, referring pages, approximate location and timestamps.</p>
          <h3>Cookies and local storage</h3>
          <p>The site may use browser storage such as <code>localStorage</code> to remember interface preferences, such as table filters. Third-party services such as analytics or advertising providers may use cookies or similar technologies according to their own policies.</p>
          <h3>Analytics</h3>
          <p>We may use analytics tools to understand site traffic, popular pages, search behaviour and technical issues. Analytics data is used to improve the site and prioritise wiki content.</p>
          <h3>Advertising</h3>
          <p>This site may use Google AdSense or other advertising providers. Advertising partners may use cookies or similar technologies to serve ads, measure ad performance, prevent fraud, and personalise or limit advertising depending on user settings and applicable law.</p>
          <p>You can learn more about how Google uses information from sites that use its services by visiting Google&rsquo;s privacy and advertising documentation.</p>
          <h3>Third-party links</h3>
          <p>This wiki may link to external websites, stores, social platforms, developer posts or community resources. We are not responsible for the privacy practices or content of third-party websites.</p>
          <h3>Children&rsquo;s privacy</h3>
          <p>This site is intended as a general game-information resource. It is not designed to knowingly collect personal information from children.</p>
          <h3>Changes to this policy</h3>
          <p>We may update this Privacy Policy as the site grows, especially when new analytics, advertising, contact or community features are added.</p>
          <h3>Contact</h3>
          <p>Questions about this policy can be sent through the <a href="/contact">Contact page</a>.</p>
        `
      },
      'contact': {
        title: 'Contact',
        crumb: 'Contact',
        body: `
          <p>Use this page to report incorrect wiki information, request removals, suggest new pages, or ask questions about Project Zomboid Wiki.</p>
          <div class="callout tip"><strong>Before publishing:</strong> replace the placeholder email below with your real contact email, or link to your issue tracker.</div>
          <h3>Email</h3>
          <p><a href="mailto:contact@gamewikihub.com">contact@gamewikihub.com</a></p>
          <h3>What to include</h3>
          <ul>
            <li>The page or entry name you are referring to.</li>
            <li>What information is wrong, missing or outdated.</li>
            <li>A source, screenshot, patch note or clear explanation when available.</li>
          </ul>
          <h3>Unofficial site notice</h3>
          <p>This is an unofficial fan wiki. For official support, purchasing issues, bug reports or account problems, contact The Indie Stone or the relevant platform support channel.</p>
        `
      }
    };
    const p = pages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `
      ${adSlot('banner')}
      <div class="page legal-page">
        <h1>${p.title}</h1>
        <div class="breadcrumb">Home / ${p.crumb}</div>
        ${p.body}
        ${sourceNotes(null)}
      </div>
    `;
  }

  function render404(slug) {
    main.innerHTML = `
      <div class="page">
        <h1>Signal Lost</h1>
        <p>No survival record found for <code>${esc(slug)}</code>. The trail has gone cold.</p>
        <p><a href="/">&larr; Back to base</a></p>
      </div>
    `;
  }

  /* ============================================================
     SEARCH (across all entities)
     ============================================================ */
  function buildSearchIndex() {
    if (Array.isArray(D.searchIndex)) return D.searchIndex;
    const index = [];
    D.guides.forEach((g) => index.push({ title: g.title, sub: 'Guide', href: '/guides/' + g.id }));
    D.traits.forEach((t) => index.push({ title: t.name + ' Trait', sub: 'Trait', href: '/traits/' + t.id }));
    D.occupations.forEach((o) => index.push({ title: o.name, sub: 'Occupation', href: '/occupations/' + o.id }));
    D.skills.forEach((s) => index.push({ title: s.name, sub: 'Skill', href: '/skills/' + s.id }));
    D.weapons.forEach((w) => index.push({ title: w.name, sub: 'Weapon', href: '/weapons/' + w.id }));
    D.maps.forEach((m) => index.push({ title: m.name, sub: 'Location', href: '/maps/' + m.id }));
    D.build42.forEach((b) => index.push({ title: b.name, sub: 'Build 42', href: '/build42/' + b.id }));
    D.vehicles.forEach((v) => index.push({ title: v.name, sub: 'Vehicles', href: '/vehicles/' + v.id }));
    D.mods.forEach((m) => index.push({ title: m.name, sub: 'Mods', href: '/mods/' + m.id }));
    D.multiplayer.forEach((mp) => index.push({ title: mp.name, sub: 'Multiplayer', href: '/multiplayer/' + mp.id }));
    Object.entries(D.pages).forEach(([k, v]) => index.push({ title: v.title, sub: 'Page', href: '/' + k }));
    index.push({ title: 'Survivor Tips', sub: 'Page', href: '/tips' });
    index.push({ title: 'Build News', sub: 'Page', href: '/patches' });
    index.push({ title: 'About Project Zomboid Wiki', sub: 'Site Info', href: '/about' });
    index.push({ title: 'Privacy Policy', sub: 'Site Info', href: '/privacy-policy' });
    index.push({ title: 'Contact', sub: 'Site Info', href: '/contact' });
    return index;
  }

  const searchIndex = buildSearchIndex();

  function runSearch(q) {
    if (!q) { searchResults.classList.remove('open'); return; }
    const ql = q.toLowerCase();
    const matches = searchIndex
      .filter((it) => it.title.toLowerCase().includes(ql) || it.sub.toLowerCase().includes(ql))
      .slice(0, 12);
    searchResults.innerHTML = matches.length
      ? matches.map((m) => `<a href="${esc(m.href)}">${esc(m.title)}<span class="cat">${esc(m.sub)}</span></a>`).join('')
      : '<div class="empty">No survival records match.</div>';
    searchResults.classList.add('open');
  }

  searchInput.addEventListener('input', () => runSearch(searchInput.value.trim()));
  searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) runSearch(searchInput.value.trim()); });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) searchResults.classList.remove('open');
  });
  searchResults.addEventListener('click', () => {
    setTimeout(() => {
      searchInput.value = '';
      searchResults.classList.remove('open');
    }, 50);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchResults.classList.remove('open');
      searchInput.blur();
    }
  });

  if (menuToggle) menuToggle.onclick = () => leftNav.classList.toggle('open');

  function loadState(key, defaults) {
    try {
      const raw = localStorage.getItem('pzw:' + key);
      if (!raw) return { ...defaults };
      return { ...defaults, ...JSON.parse(raw) };
    } catch (e) { return { ...defaults }; }
  }
  function saveState(key, state) {
    try { localStorage.setItem('pzw:' + key, JSON.stringify(state)); } catch (e) {}
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    const url = new URL(href, location.origin);
    if (url.origin !== location.origin) return;
    if (!window.__GW_PRERENDER__) return;
    e.preventDefault();
    go(url.pathname);
  });

  function hydrateStaticPage() {
    const route = parseRoute();
    if (route === '/traits') bindTraitsTable();
    if (route === '/weapons') bindWeaponsTable();
    setTimeout(loadAds, 100);
  }

  if (window.__GW_PRERENDER__) {
    window.addEventListener('popstate', () => {
      leftNav.classList.remove('open');
      navigate();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navigate();
  } else {
    hydrateStaticPage();
  }
})();
