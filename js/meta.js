/* ============================================================
   Project Zomboid Wiki — Meta
   Shared SEO + JSON-LD resolution. Used by app.js (dynamic
   meta on client navigation) and build.js (static prerender).
   Depends on window.WikiData. No DOM access.
   ============================================================ */

(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  const D = root.WikiData;
  if (!D) return;

  const S = D.site;

  /* section → array + human label */
  const SECTIONS = {
    guides: { arr: 'guides', label: 'Survival Guides' },
    traits: { arr: 'traits', label: 'Traits' },
    occupations: { arr: 'occupations', label: 'Occupations' },
    skills: { arr: 'skills', label: 'Skills' },
    weapons: { arr: 'weapons', label: 'Weapons' },
    maps: { arr: 'maps', label: 'Maps & Locations' },
    build42: { arr: 'build42', label: 'Build 42 Hub' },
    vehicles: { arr: 'vehicles', label: 'Vehicles' },
    mods: { arr: 'mods', label: 'Mods' },
    multiplayer: { arr: 'multiplayer', label: 'Multiplayer' }
  };

  /* sections that carry a hero image */
  const HERO_SECTIONS = ['guides', 'maps', 'build42', 'vehicles', 'mods', 'multiplayer'];

  const LIST_DESC = {
    guides: 'Practical Project Zomboid survival guides — first day, infection, first week, winter, helicopter events and long-term strategy.',
    traits: 'Every Project Zomboid trait explained: point cost, early and late-game impact, hidden mechanics and whether it is worth taking.',
    occupations: 'Project Zomboid occupations compared — bonuses, beginner-friendliness and the best build for each playstyle.',
    skills: 'Project Zomboid skill guides — what each skill governs, the fastest XP methods, the best books and common mistakes.',
    weapons: 'Project Zomboid weapon guides — durability, damage, noise, endurance and the best and worst situations for each.',
    maps: 'Project Zomboid map and location guides — danger ratings, loot quality, base spots and beginner viability for every town.',
    build42: 'Project Zomboid Build 42 hub — crafting overhaul, animals, hunting, blacksmithing and the wilderness survival update.',
    vehicles: 'Project Zomboid vehicle guides — hotwiring, best cars, maintenance, fuel and towing for long-term survival.',
    mods: 'Project Zomboid mod guides — essential mods, multiplayer mods, load order and server-side mods, with compatibility notes.',
    multiplayer: 'Project Zomboid multiplayer guides — server settings, co-op survival, PvP, server administration and etiquette.',
    tips: 'Hard-won Project Zomboid survivor tips — the practical advice that keeps Knox County runs alive.',
    patches: 'Project Zomboid build news and patch notes, with a focus on the Build 42 update.'
  };

  const STATIC_SEO = {
    'getting-started': {
      title: 'Getting Started | ' + S.titleSuffix,
      description: 'New to Project Zomboid? Start here — the survival mindset, your first hour, and the guides to read next before Knox County kills you.'
    },
    about: {
      title: 'About | ' + S.titleSuffix,
      description: 'About the Project Zomboid Survival Wiki — an unofficial, practical fan guide to surviving the Knox Event and Build 42.'
    },
    'privacy-policy': {
      title: 'Privacy Policy | ' + S.titleSuffix,
      description: 'Privacy policy for the Project Zomboid Survival Wiki, covering analytics, advertising, cookies and local storage.'
    },
    contact: {
      title: 'Contact | ' + S.titleSuffix,
      description: 'Contact the Project Zomboid Survival Wiki to report corrections, request removals or suggest new survival guide pages.'
    }
  };

  function clean(route) {
    route = (route || '/').replace(/\/+$/, '');
    return route === '' ? '/' : route;
  }

  function entityName(e) {
    return e ? (e.name || e.title || '') : '';
  }

  /* strip tags and squeeze whitespace */
  function plain(s) {
    return String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }

  /* trim to <=160 chars on a word boundary */
  function clip(s, max) {
    s = plain(s);
    max = max || 158;
    if (s.length <= max) return s;
    const cut = s.slice(0, max);
    const sp = cut.lastIndexOf(' ');
    return (sp > 60 ? cut.slice(0, sp) : cut).replace(/[,;:.\s]+$/, '') + '…';
  }

  /* resolve a route string to {kind, section, entity, slug} */
  function routeInfo(route) {
    route = clean(route);
    if (route === '/' || route === '/index.html') return { kind: 'home', route: '/' };
    const seg = route.split('/').filter(Boolean);
    if (seg.length === 1) {
      const k = seg[0];
      if (SECTIONS[k]) return { kind: 'list', section: k, route: route };
      if (k === 'tips' || k === 'patches') return { kind: 'list', section: k, route: route };
      if (STATIC_SEO[k]) {
        return { kind: (k === 'getting-started' ? 'static' : 'info'), slug: k, route: route };
      }
      return { kind: 'unknown', route: route };
    }
    if (seg.length === 2 && SECTIONS[seg[0]]) {
      const arr = D[SECTIONS[seg[0]].arr] || [];
      const entity = arr.find((x) => x.id === seg[1]);
      if (entity) return { kind: 'detail', section: seg[0], entity: entity, route: route };
    }
    return { kind: 'unknown', route: route };
  }

  /* hero image {src, alt} for a detail entity, or null */
  function heroFor(section, entity) {
    if (!entity || HERO_SECTIONS.indexOf(section) === -1) return null;
    const name = entityName(entity);
    return {
      src: '/assets/images/' + section + '/' + entity.id + '.jpg',
      alt: entity.heroAlt || (name + ' — Project Zomboid ' + (SECTIONS[section].label) + ' reference image')
    };
  }

  function abs(path) {
    if (!path) return S.baseUrl + S.defaultOgImage;
    if (/^https?:/.test(path)) return path;
    return S.baseUrl + path;
  }

  /* derive a description from the first available prose field */
  function deriveDescription(entity) {
    const src = entity.intro || entity.tagline || entity.summary || entity.tone ||
      entity.overview || entity.whyPlayersTake || entity.whyItMatters || '';
    return clip(src);
  }

  function deriveKeywords(section, entity) {
    const base = ['project zomboid', 'project zomboid wiki'];
    const n = entityName(entity).toLowerCase();
    if (n) base.push('project zomboid ' + n.replace(/\s*\([^)]*\)\s*/g, '').trim());
    base.push('project zomboid ' + (SECTIONS[section] ? SECTIONS[section].label.toLowerCase() : section));
    return base;
  }

  /* full SEO object for a route */
  function seoFor(route) {
    const info = routeInfo(route);
    const canonical = S.baseUrl + (info.route === '/' ? '/' : info.route);
    let title, description, ogImage, keywords, ogType = 'website';

    if (info.kind === 'home') {
      title = S.shortName + ' — Knox County Survival Manual';
      description = S.defaultDescription;
      ogImage = abs('/assets/images/hero/homepage-hero.jpg');
      keywords = ['project zomboid wiki', 'project zomboid guide', 'project zomboid build 42', 'knox county survival'];
    } else if (info.kind === 'list') {
      const label = (SECTIONS[info.section] && SECTIONS[info.section].label) ||
        (info.section === 'tips' ? 'Survivor Tips' : 'Build News');
      title = label + ' | ' + S.titleSuffix;
      description = LIST_DESC[info.section] || S.defaultDescription;
      ogImage = abs(S.defaultOgImage);
      keywords = ['project zomboid', 'project zomboid ' + label.toLowerCase()];
    } else if (info.kind === 'static' || info.kind === 'info') {
      const st = STATIC_SEO[info.slug];
      title = st.title;
      description = st.description;
      ogImage = abs(S.defaultOgImage);
      keywords = ['project zomboid', 'project zomboid wiki'];
    } else if (info.kind === 'detail') {
      const e = info.entity;
      const seo = e.seo || {};
      title = seo.title || (entityName(e) + ' | ' + S.titleSuffix);
      description = seo.description || deriveDescription(e);
      keywords = seo.keywords || deriveKeywords(info.section, e);
      const hero = heroFor(info.section, e);
      ogImage = abs(seo.ogImage || (hero ? hero.src : S.defaultOgImage));
      ogType = 'article';
    } else {
      title = 'Signal Lost | ' + S.titleSuffix;
      description = S.defaultDescription;
      ogImage = abs(S.defaultOgImage);
      keywords = ['project zomboid', 'project zomboid wiki'];
    }

    return {
      title: title,
      description: description,
      canonical: canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: ogImage,
      ogType: ogType,
      keywords: keywords
    };
  }

  /* JSON-LD structured data for a route */
  function jsonLdFor(route) {
    const info = routeInfo(route);
    const seo = seoFor(route);
    const publisher = {
      '@type': 'Organization',
      name: S.name,
      url: S.baseUrl
    };

    if (info.kind === 'home') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: S.name,
        url: S.baseUrl,
        description: S.defaultDescription,
        publisher: publisher,
        potentialAction: {
          '@type': 'SearchAction',
          target: S.baseUrl + '/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
    }
    if (info.kind === 'list') {
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: seo.title,
        description: seo.description,
        url: seo.canonical,
        isPartOf: { '@type': 'WebSite', name: S.name, url: S.baseUrl },
        publisher: publisher
      };
    }
    if (info.kind === 'detail') {
      const e = info.entity;
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: entityName(e),
        description: seo.description,
        image: seo.ogImage,
        url: seo.canonical,
        datePublished: '2026-05-22',
        dateModified: (e.lastUpdated || S.lastUpdated),
        author: { '@type': 'Organization', name: S.name },
        publisher: publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': seo.canonical }
      };
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: seo.canonical,
      publisher: publisher
    };
  }

  root.WikiMeta = {
    routeInfo: routeInfo,
    seoFor: seoFor,
    jsonLdFor: jsonLdFor,
    heroFor: heroFor,
    sections: SECTIONS,
    heroSections: HERO_SECTIONS
  };
})();
