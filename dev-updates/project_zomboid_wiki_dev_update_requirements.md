# Project Zomboid Wiki — Dev Update Requirements Packet

Use this file as the implementation + content brief for updating the current `project-zomboid-wiki` static site.

Primary goals:
1. Add per-page SEO metadata.
2. Add real images/screenshots.
3. Add source/update notes to pages.
4. Expand thin content sections, especially Vehicles, Mods, Multiplayer.
5. Move toward static generated HTML pages instead of a pure SPA, if possible.
6. Keep the tone practical, survival-focused, and not like a generic copied wiki.

---

## 0. Existing Project Context

Current project appears to be a plain static site with:

```txt
index.html
css/style.css
js/app.js
js/data.js
robots.txt
sitemap.xml
wrangler.jsonc
ads.txt
```

The site content is currently driven mostly from `js/data.js`.

Do not break the current Cloudflare Worker static assets deployment.

Current deployment model:
```txt
wrangler deploy
assets.directory = "./"
not_found_handling = "single-page-application"
```

If converting to static HTML pages, preserve Cloudflare compatibility.

---

# 1. Global Content Direction

The site should feel like:

> A survival field manual written by someone who has actually died 200 times in Knox Country.

Tone rules:
- Be practical.
- Be opinionated.
- Explain why something matters.
- Mention beginner mistakes.
- Mention long-term survival impact.
- Avoid generic encyclopedia wording.
- Avoid copying text from Fandom, Reddit, Steam guides, or official pages.
- Paraphrase and cite sources in source notes.

Bad:
> The car is a vehicle used for transportation.

Good:
> A working car changes the entire run. It lets you choose your fights, escape helicopter chaos, haul generators, and abandon a bad base before pride gets you killed.

---

# 2. Per-Page SEO Metadata Requirements

Each route/page should have unique metadata.

## Required metadata fields per page

For every page object, add or generate:

```js
seo: {
  title: "...",
  description: "...",
  canonical: "https://projectzomboid.gamewikihub.com/path",
  ogTitle: "...",
  ogDescription: "...",
  ogImage: "/assets/images/og/...",
  keywords: ["project zomboid", "..."]
}
```

## Global title format

Use:

```txt
[Page Name] | Project Zomboid Survival Wiki
```

Examples:

```txt
First Day Survival Guide | Project Zomboid Survival Wiki
Best Vehicles | Project Zomboid Survival Wiki
Build 42 Overview | Project Zomboid Survival Wiki
```

## Global meta description style

Keep descriptions between 140–160 characters when possible.

Example:
```txt
Learn how to survive your first day in Project Zomboid with practical priorities, combat basics, common mistakes, and early-game survival tips.
```

## Canonical URL rules

Use clean route URLs:

```txt
/guides/first-day-survival
/guides/first-week
/guides/infection
/vehicles/hotwire-cars
/vehicles/best-vehicles
/multiplayer/best-server-settings
/mods/best-essential-mods
/build42/overview
```

## Open Graph image rules

Use a fallback OG image if the page has no custom image:

```txt
/assets/images/og/default-og.jpg
```

Create page-specific OG images later.

---

# 3. Static Generated HTML Requirement

Current SPA is fine for prototype, but for SEO this should eventually become static generated pages.

## Preferred approach

Generate real HTML files for each route during a build step, for example:

```txt
/guides/first-day-survival/index.html
/guides/first-week/index.html
/vehicles/hotwire-cars/index.html
/mods/best-essential-mods/index.html
```

Each generated HTML page should include:
- unique `<title>`
- unique `<meta name="description">`
- canonical link
- Open Graph tags
- Twitter card tags
- JSON-LD structured data
- static main content in the HTML
- same site CSS/JS loaded after content

## If keeping SPA temporarily

At minimum:
- dynamically update `document.title`
- update/create meta description
- update canonical URL
- update OG tags on route change
- update sitemap.xml to match all routes

But static HTML is preferred for long-term SEO.

---

# 4. Structured Data Requirements

Add JSON-LD for major pages.

## For guide pages

Use `Article` or `HowTo`.

Example skeleton:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "First Day Survival Guide",
  "description": "Learn how to survive your first day in Project Zomboid...",
  "image": "https://projectzomboid.gamewikihub.com/assets/images/og/first-day-survival.jpg",
  "dateModified": "2026-05-22",
  "author": {
    "@type": "Organization",
    "name": "Project Zomboid Survival Wiki"
  }
}
</script>
```

## For homepage

Use `WebSite`.

## For category pages

Use `CollectionPage`.

---

# 5. Source / Update Notes Feature

Each major page should display a compact source/update box near the bottom.

## UI label

Use:

```txt
Sources & Update Notes
```

## Suggested display

Small dark card:
- Last updated date
- Game version / Build status
- Sources checked
- Notes about uncertainty

Example:

```txt
Sources & Update Notes
Last updated: May 22, 2026
Build focus: Build 41 stable + Build 42 unstable changes where relevant
Sources checked: Official Project Zomboid blog, Steam store/game description, Steam News Hub, community discussions
Note: Build 42 systems are still changing. Treat exact numbers as patch-dependent.
```

## Data structure

Add per-page source data:

```js
sources: [
  {
    label: "Project Zomboid Steam Store",
    url: "https://store.steampowered.com/app/108600/Project_Zomboid/",
    note: "Used for official game description and broad feature categories."
  },
  {
    label: "Official Build 42 Upcoming Features Blog",
    url: "https://projectzomboid.com/blog/upcoming-features-b42/",
    note: "Used for Build 42 crafting, animal, and system direction."
  }
],
lastUpdated: "2026-05-22",
buildStatus: "Build 41 stable + Build 42 unstable notes"
```

Do not put citations inline everywhere. Keep content readable and place sources in the note box.

---

# 6. Image / Screenshot Requirements

## Important copyright rule

Do not scrape and hotlink random copyrighted images directly into the site.

Preferred image sources:
1. Screenshots we capture ourselves in-game.
2. Official Steam store screenshots, if used as promotional/reference imagery.
3. Official Project Zomboid blog images, if used with attribution.
4. Community screenshots only with permission.
5. Generic icon libraries for UI icons.

Do not directly hotlink from Steam, Reddit, Fandom, or random CDN pages. Download/prepare approved images into the local static folder.

## Recommended static folder structure

Create:

```txt
/assets/images/
  hero/
    homepage-hero.jpg
    louisville-street.jpg
    fog-road.jpg

  guides/
    first-day-survival.jpg
    first-week-base.jpg
    infection-warning.jpg
    helicopter-event.jpg

  vehicles/
    abandoned-car.jpg
    car-dashboard.jpg
    gas-station.jpg
    mechanic-garage.jpg

  mods/
    workshop-mods.jpg
    mod-load-order.jpg
    server-mods.jpg

  multiplayer/
    survivor-group.jpg
    safehouse.jpg
    server-settings.jpg

  build42/
    animals.jpg
    crafting-station.jpg
    wilderness.jpg
    lighting.jpg

  locations/
    rosewood.jpg
    riverside.jpg
    west-point.jpg
    louisville.jpg

  og/
    default-og.jpg
    first-day-survival.jpg
    best-vehicles.jpg
    multiplayer-server-settings.jpg
```

## Image naming convention

Use lowercase kebab-case.

Good:
```txt
best-base-locations.jpg
hotwire-car-guide.jpg
build42-animals.jpg
```

Bad:
```txt
IMG_1234.png
ScreenshotFinalFINAL.jpg
```

## Image display requirements

Each page should support:

```js
heroImage: "/assets/images/guides/first-day-survival.jpg",
heroAlt: "A quiet Project Zomboid neighborhood street used as first-day survival guide artwork"
```

Each image must have:
- descriptive `alt`
- lazy loading except hero image
- width/height where possible
- no layout shift

Example:

```html
<img src="/assets/images/vehicles/abandoned-car.jpg"
     alt="Abandoned vehicle in Project Zomboid used for vehicle survival guide"
     loading="lazy"
     width="1200"
     height="675">
```

---

# 7. Image Source Links To Review

Use these as places to review and manually collect/replace images. Do not hotlink directly unless confirmed acceptable.

## Official / safer sources

Project Zomboid Steam page:
```txt
https://store.steampowered.com/app/108600/Project_Zomboid/
```

Official Project Zomboid blog:
```txt
https://projectzomboid.com/blog/
```

Build 42 official upcoming features:
```txt
https://projectzomboid.com/blog/upcoming-features-b42/
```

Steam News Hub:
```txt
https://store.steampowered.com/news/app/108600
```

Steam community screenshots:
```txt
https://steamcommunity.com/app/108600/screenshots/
```

SteamDB screenshots reference:
```txt
https://steamdb.info/app/108600/screenshots/
```

## Recommendation

Best practical route:
- Launch with placeholder dark survival-themed panels and Lucide icons.
- Replace with our own in-game screenshots over time.
- Capture screenshots at 1920x1080.
- Compress to WebP where possible.
- Keep JPG fallback only if needed.

---

# 8. Icon Requirements

Use an open icon library instead of copying game item icons unless permission is clear.

Recommended:
- Lucide Icons
- Font Awesome Free
- Heroicons

## Icon mapping

```js
const iconMap = {
  guides: "BookOpen",
  traits: "UserCog",
  skills: "Hammer",
  weapons: "Axe",
  vehicles: "Car",
  maps: "Map",
  locations: "MapPin",
  mods: "Puzzle",
  multiplayer: "Users",
  build42: "RadioTower",
  infection: "Biohazard",
  farming: "Sprout",
  mechanics: "Wrench",
  electrical: "Zap",
  carpentry: "Hammer",
  combat: "Crosshair",
  baseBuilding: "Home",
  serverSettings: "SlidersHorizontal"
}
```

---

# 9. Expanded Content: Vehicles Section

Add or expand these pages:

```txt
/vehicles/overview
/vehicles/hotwire-cars
/vehicles/best-vehicles
/vehicles/vehicle-maintenance
/vehicles/fuel-guide
/vehicles/towing-guide
```

---

## PAGE: Vehicles Overview

### SEO

```js
title: "Vehicles Guide | Project Zomboid Survival Wiki"
description: "Learn why vehicles matter in Project Zomboid, how to choose a car, manage fuel, avoid noise mistakes, and survive long-distance travel."
canonical: "https://projectzomboid.gamewikihub.com/vehicles/overview"
keywords: ["project zomboid vehicles", "project zomboid cars", "project zomboid vehicle guide"]
```

### Hero

```txt
Image: /assets/images/vehicles/abandoned-car.jpg
Alt: Abandoned car on a Project Zomboid road used for the vehicle survival guide
```

### Content

#### Why Vehicles Change The Whole Run

A working car is not just transportation. It is escape, storage, scouting, generator hauling, and a way to abandon a doomed neighborhood before pride turns into a bite wound.

New players often treat cars as optional. Experienced survivors treat mobility as insurance. If the helicopter event, a migration wave, or a failed loot run ruins your area, a car lets you leave instead of trying to win a fight you never needed.

#### What Makes A Good Vehicle

Look for:
- enough cargo space for loot runs
- decent engine quality
- usable tire condition
- enough fuel to move immediately
- windows and doors that are not already ruined
- trunk capacity for generator or base supplies

Avoid:
- cars boxed in by wrecks
- cars surrounded by zombies
- cars with terrible engine condition
- cars that require loud repairs in unsafe areas

#### Beginner Mistakes

- starting the engine in a dense area without planning an exit
- honking accidentally or attracting a crowd with engine noise
- driving too fast through wrecked roads
- relying on one vehicle without spare parts
- forgetting that bad tires can turn an escape into a crash

#### Long-Term Survival Value

Cars become more important after the early game. You will eventually need long-distance loot runs, generator transport, spare parts, fuel storage, and safe map movement. A survivor with a working vehicle network has options. A survivor stuck on foot has problems.

---

## PAGE: How To Hotwire Cars

### SEO

```js
title: "How To Hotwire Cars | Project Zomboid Survival Wiki"
description: "Learn how hotwiring works in Project Zomboid, what skills you need, why Burglar is useful, and how to avoid loud vehicle mistakes."
canonical: "https://projectzomboid.gamewikihub.com/vehicles/hotwire-cars"
keywords: ["project zomboid hotwire", "project zomboid how to hotwire cars", "project zomboid burglar hotwire"]
```

### Hero

```txt
Image: /assets/images/vehicles/car-dashboard.jpg
Alt: Project Zomboid vehicle dashboard representing hotwiring and vehicle startup
```

### Content

#### Hotwiring Is Freedom

Hotwiring is one of the biggest mobility upgrades in Project Zomboid. Once you can start cars without keys, every parking lot becomes a possible escape route, loot hauler, or emergency shelter.

#### Requirements

Use the accurate requirements for the current build. Historically, the basic requirement has been either:
- Burglar occupation, or
- enough Mechanics + Electrical skill to hotwire

Add a warning:
```txt
Exact requirements may shift with Build 42 balance changes. Keep this page updated after patches.
```

#### Why Burglar Is Beginner-Friendly

Burglar is not just a stealth role. It removes the early skill barrier for hotwiring and gives new players earlier access to vehicles. That changes how safely you can scout, loot, and relocate.

#### Safe Hotwiring Checklist

Before hotwiring:
- clear zombies around the driver-side door
- check for fuel
- check engine condition
- check tire condition
- know your escape direction
- do not hotwire while exhausted
- do not test the engine beside a large horde

#### Common Mistakes

- finding a good car but forgetting fuel
- starting a loud engine in the middle of town
- hotwiring while zombies are pathing toward the window
- driving away without checking tire condition
- crashing because panic made you floor it

#### Survivor Tip

The best car is not always the fastest car. The best car is the one that starts, has fuel, survives a bad turn, and gets you out before the street fills up.

### Sources

- https://www.pcgamer.com/project-zomboid-hotwire-a-car-how-to/
- https://store.steampowered.com/app/108600/Project_Zomboid/

---

## PAGE: Best Vehicles

### SEO

```js
title: "Best Vehicles | Project Zomboid Survival Wiki"
description: "Compare the best vehicle types in Project Zomboid for storage, speed, durability, fuel use, towing, and long-term survival."
canonical: "https://projectzomboid.gamewikihub.com/vehicles/best-vehicles"
keywords: ["project zomboid best vehicles", "project zomboid best car", "project zomboid vehicle tier list"]
```

### Content

#### There Is No Single Best Car

The best vehicle depends on what you need today. A fast car is great until you need to haul a generator. A van is great until you try to thread it through wrecked Louisville streets.

#### Vehicle Roles

##### Best For Loot Runs
Use vans, trucks, and vehicles with high trunk capacity.

Why:
They let you carry tools, food, weapons, spare parts, and heavy base supplies in one trip.

Weakness:
Larger vehicles are harder to maneuver and can be dangerous in tight urban roads.

##### Best For Scouting
Use smaller cars with decent speed and handling.

Why:
Scouting is about getting in, checking danger, and getting out. You do not need huge storage if the goal is information.

Weakness:
Smaller cars may not survive repeated zombie impacts.

##### Best For Base Supply Runs
Use cargo vans, pickup trucks, or anything with large storage and enough durability.

Why:
Generators, planks, metalworking gear, and water containers get heavy fast.

##### Best For City Driving
Use smaller vehicles.

Why:
Louisville and dense towns punish wide turns. A bulky vehicle can get trapped between wrecks and zombie clusters.

#### What To Prioritize

Ranking criteria:
1. Engine condition
2. Fuel availability
3. Tire condition
4. Storage capacity
5. Handling
6. Durability
7. Noise

#### Beginner Mistake

Do not fall in love with a car because it looks cool. A flashy car with no fuel and ruined tires is just a coffin with windows.

---

## PAGE: Vehicle Maintenance

### SEO

```js
title: "Vehicle Maintenance Guide | Project Zomboid Survival Wiki"
description: "Learn how to maintain vehicles in Project Zomboid, what parts matter most, and how Mechanics skill affects long-term survival."
canonical: "https://projectzomboid.gamewikihub.com/vehicles/vehicle-maintenance"
keywords: ["project zomboid mechanics", "project zomboid vehicle repair", "project zomboid car maintenance"]
```

### Content

#### Maintenance Is Boring Until It Saves Your Life

Vehicle maintenance does not feel urgent until the car fails during a horde escape. By then, the lesson is usually permanent.

#### Parts To Watch

- Engine condition
- Battery charge
- Tire condition
- Brakes
- Suspension
- Windshield and windows
- Trunk condition

#### Mechanics XP Strategy

General approach:
- read Mechanics skill books when available
- inspect vehicles regularly
- remove and reinstall safe parts when possible
- practice in a cleared area, not beside a horde

#### Long-Term Vehicle Setup

Keep:
- spare gas cans
- spare battery
- spare tires
- tools
- emergency food and water
- backup weapon
- medical supplies

#### Survivor Tip

A survivor with two decent cars is safer than a survivor with one perfect car.

---

## PAGE: Fuel Guide

### SEO

```js
title: "Fuel Guide | Project Zomboid Survival Wiki"
description: "Learn how fuel works in Project Zomboid, how to manage gas stations, generators, gas cans, and long-term vehicle survival."
canonical: "https://projectzomboid.gamewikihub.com/vehicles/fuel-guide"
keywords: ["project zomboid fuel", "project zomboid gas station", "project zomboid generator fuel"]
```

### Content

#### Fuel Is A Strategic Resource

Fuel is not just for cars. It supports generators, loot runs, base relocation, and long-term survival. Once power shuts off, fuel access becomes one of the most important map-control problems.

#### Early Fuel Priorities

- find gas cans
- mark nearby gas stations
- find or move a generator
- secure a route to fuel
- avoid wasting fuel on unnecessary trips

#### Gas Station Strategy

A gas station near your base is valuable, but it also attracts risk. If zombies gather around it, clearing the area safely matters more than rushing one more refill.

#### Generator Connection

Fuel becomes more important once generators are involved. If your base depends on refrigeration or lighting, fuel planning becomes routine survival maintenance.

#### Beginner Mistake

Do not drive everywhere just because you can. Every trip spends fuel, creates noise, and risks vehicle damage.

---

## PAGE: Towing Guide

### SEO

```js
title: "Towing Guide | Project Zomboid Survival Wiki"
description: "Learn when towing is worth it in Project Zomboid, how to move broken cars, and what mistakes make towing dangerous."
canonical: "https://projectzomboid.gamewikihub.com/vehicles/towing-guide"
keywords: ["project zomboid towing", "project zomboid tow car", "project zomboid move vehicles"]
```

### Content

#### Towing Is Useful, But Not Always Safe

Towing lets you move wrecks, rescue broken cars, and bring useful vehicles back to base. It also makes driving slower, louder, and harder to control.

#### Good Uses For Towing

- clearing a road near your base
- moving a good car with no fuel or dead battery
- bringing a repair project home
- removing blocked access points
- moving storage vehicles into a compound

#### Bad Uses For Towing

- towing through dense urban streets
- towing while tired or panicked
- towing without checking the route
- towing through unknown zombie density
- towing during helicopter chaos

#### Survivor Tip

Scout the route first. Towing turns every mistake into a slower mistake.

---

# 10. Expanded Content: Mods Section

Add or expand these pages:

```txt
/mods/overview
/mods/best-essential-mods
/mods/best-multiplayer-mods
/mods/mod-load-order
/mods/server-mods
```

---

## PAGE: Mods Overview

### SEO

```js
title: "Mods Guide | Project Zomboid Survival Wiki"
description: "Learn how Project Zomboid mods change gameplay, what types of mods to install, and how to avoid unstable mod setups."
canonical: "https://projectzomboid.gamewikihub.com/mods/overview"
keywords: ["project zomboid mods", "project zomboid workshop", "project zomboid mod guide"]
```

### Content

#### Mods Can Improve The Game Or Break The Run

Project Zomboid has a huge modding scene. Some mods quietly improve quality of life. Others rewrite the entire balance of survival. The dangerous part is not installing mods — it is installing twenty of them without understanding what they change.

#### Mod Categories

- Quality of life
- UI improvements
- Vehicle expansions
- Weapon packs
- Clothing and cosmetics
- Map expansions
- Server administration
- Immersion and roleplay
- Hardcore survival changes

#### Recommended Rule

Start with fewer mods than you think you need. Add more after testing.

#### Beginner Mistake

Do not build a first serious run around a giant mod pack. If something breaks, you will not know which mod caused it.

---

## PAGE: Best Essential Mods

### SEO

```js
title: "Best Essential Mods | Project Zomboid Survival Wiki"
description: "A practical list of essential Project Zomboid mods for quality of life, immersion, vehicles, UI, and smoother survival runs."
canonical: "https://projectzomboid.gamewikihub.com/mods/best-essential-mods"
keywords: ["project zomboid best mods", "project zomboid essential mods", "project zomboid workshop mods"]
```

### Content

#### What Counts As Essential?

An essential mod should make the game easier to read, smoother to manage, or richer without completely destroying survival balance.

#### Suggested Mod Categories

##### Quality Of Life Mods
Use for:
- better inventory readability
- cleaner UI
- faster repetitive actions
- better item information

##### Vehicle Mods
Use for:
- more vehicle variety
- better long-term car collecting
- stronger roleplay servers

##### Immersion Mods
Use for:
- sitting/lying animations
- clothing variety
- environmental details
- better survivor fantasy

##### Weapon Mods
Use carefully.
Weapon packs can make the game too easy if loot rates are not balanced.

#### Important Warning

Do not present a mod list as permanently correct. Mods update, break, disappear, or conflict. Each mod page should include:
- Workshop link
- last checked date
- compatibility note
- single-player/multiplayer suitability

### Add fields

```js
modMeta: {
  workshopUrl: "",
  lastChecked: "2026-05-22",
  multiplayerSafe: "Unknown / Yes / No",
  balanceImpact: "Low / Medium / High"
}
```

---

## PAGE: Best Multiplayer Mods

### SEO

```js
title: "Best Multiplayer Mods | Project Zomboid Survival Wiki"
description: "Recommended Project Zomboid multiplayer mods for quality of life, roleplay, server management, vehicles, and balanced co-op survival."
canonical: "https://projectzomboid.gamewikihub.com/mods/best-multiplayer-mods"
keywords: ["project zomboid multiplayer mods", "project zomboid server mods", "project zomboid co-op mods"]
```

### Content

#### Multiplayer Mods Need More Discipline

A mod that works fine alone can become a server problem when ten people use it. Multiplayer mods should be stable, understandable, and easy to explain to new players.

#### Good Multiplayer Mod Types

- admin tools
- map tools
- safehouse/claim improvements
- better vehicle variety
- roleplay clothing
- QoL interface improvements
- server event tools

#### Risky Multiplayer Mod Types

- huge weapon packs with unbalanced loot
- mods that change core professions/traits
- mods with outdated dependencies
- mods that add heavy map changes mid-save
- mods that require every player to manually troubleshoot files

#### Server Owner Rule

Before adding a mod to a live server:
1. test it on a private save
2. check comments/update date
3. read dependency requirements
4. verify multiplayer compatibility
5. back up the server

---

## PAGE: Mod Load Order

### SEO

```js
title: "Mod Load Order Guide | Project Zomboid Survival Wiki"
description: "Learn how to think about Project Zomboid mod load order, dependencies, testing, backups, and avoiding broken saves."
canonical: "https://projectzomboid.gamewikihub.com/mods/mod-load-order"
keywords: ["project zomboid mod load order", "project zomboid mod conflicts", "project zomboid mod dependencies"]
```

### Content

#### Load Order Is Damage Control

Project Zomboid modding is powerful, but load order and dependencies matter. When mods touch the same systems, one can override or break another.

#### Practical Rules

- install dependencies first
- add big system-changing mods slowly
- avoid adding map mods after a world is already explored
- keep notes on what changed
- test before committing to a long-term save
- back up saves before major mod changes

#### Beginner Mistake

Adding twenty mods at once feels efficient. It is not. It just makes troubleshooting impossible.

---

# 11. Expanded Content: Multiplayer Section

Add or expand these pages:

```txt
/multiplayer/overview
/multiplayer/best-server-settings
/multiplayer/co-op-survival
/multiplayer/pvp-guide
/multiplayer/server-admin-tips
/multiplayer/etiquette
```

---

## PAGE: Multiplayer Overview

### SEO

```js
title: "Multiplayer Guide | Project Zomboid Survival Wiki"
description: "Learn how Project Zomboid multiplayer changes survival, base building, loot, vehicles, PvP, co-op roles, and server settings."
canonical: "https://projectzomboid.gamewikihub.com/multiplayer/overview"
keywords: ["project zomboid multiplayer", "project zomboid co-op", "project zomboid server guide"]
```

### Content

#### Multiplayer Changes The Game Completely

Solo Project Zomboid is about discipline. Multiplayer is about coordination. The zombies are still dangerous, but other players create the real complexity: shared loot, noisy plans, base trust, vehicles, and different risk tolerance.

#### What Multiplayer Adds

- shared base logistics
- group combat
- role specialization
- loot disputes
- server rules
- PvP risk
- safehouse politics
- mod compatibility problems

#### Good Group Roles

- driver/scout
- carpenter/base builder
- mechanic
- medic
- cook/farmer
- combat escort
- loot organizer

#### Beginner Mistake

Do not let everyone loot randomly. A group without roles becomes five people filling bags with junk while nobody brings tools, fuel, or medical supplies.

---

## PAGE: Best Server Settings

### SEO

```js
title: "Best Server Settings | Project Zomboid Survival Wiki"
description: "Recommended Project Zomboid server settings for beginner co-op, hardcore survival, roleplay, PvP, loot balance, and zombie population."
canonical: "https://projectzomboid.gamewikihub.com/multiplayer/best-server-settings"
keywords: ["project zomboid server settings", "project zomboid best server settings", "project zomboid co-op settings"]
```

### Content

#### Settings Decide The Server's Personality

A Project Zomboid server is not just hosted gameplay. The settings decide whether the world feels like a tense survival story, casual co-op, PvP chaos, or a roleplay colony.

#### Beginner-Friendly Co-op Settings

Recommended direction:
- lower initial zombie population
- slower population peak
- more forgiving loot
- infection settings based on group preference
- multi-hit enabled if players are new
- vehicle condition slightly improved
- safehouse protection enabled

#### Hardcore Survival Settings

Recommended direction:
- higher zombie population
- rare loot
- longer respawn pressure
- harsher weather
- limited safehouse abuse
- stricter death consequences

#### Roleplay Server Settings

Recommended direction:
- safehouse systems enabled
- PvP controlled by rules
- loot respawn carefully tuned
- profession diversity encouraged
- admin event tools
- slower progression

#### PvP Server Settings

Recommended direction:
- clear PvP rules
- safehouse protection limits
- anti-grief rules
- loot scarcity tuned carefully
- vehicle access balanced
- admin logging/moderation tools

#### Settings That Need Care

- Loot respawn
- Zombie respawn
- Safehouse claiming
- Fire spread
- PvP damage
- Infection mortality
- Day length
- Sleep requirements
- Car spawn condition

#### Survivor Tip

Do not copy random server settings blindly. Decide what kind of story you want the server to create, then tune the settings around that.

---

## PAGE: Co-op Survival Guide

### SEO

```js
title: "Co-op Survival Guide | Project Zomboid Survival Wiki"
description: "Learn how to survive Project Zomboid co-op with group roles, base organization, shared loot rules, and safer combat habits."
canonical: "https://projectzomboid.gamewikihub.com/multiplayer/co-op-survival"
keywords: ["project zomboid co-op guide", "project zomboid multiplayer survival", "project zomboid group base"]
```

### Content

#### Co-op Survival Is Logistics

A group can survive longer than one player, but only if the group is organized. More people means more noise, more food consumed, more mistakes, and more chances someone opens the wrong door.

#### Assign Roles Early

Suggested roles:
- Scout: checks new areas before everyone enters
- Driver: manages vehicles and escape routes
- Builder: handles carpentry/base work
- Mechanic: maintains cars and generators
- Quartermaster: organizes loot
- Farmer/Cook: handles food sustainability
- Medic: manages first aid supplies

#### Shared Base Rules

Set rules for:
- where tools go
- where weapons go
- who drives which vehicles
- when to use guns
- how to mark cleared buildings
- where emergency bags are stored

#### Group Combat Rules

- do not swing through each other
- call out exhaustion
- avoid indoor group fights
- retreat before panic spreads
- do not fire guns without agreement
- keep one escape route open

#### Beginner Mistake

The biggest multiplayer killer is confidence. Three players see ten zombies and think it is safe. Then one misses, one trips, one panics, and suddenly the group is arguing over who got bitten first.

---

## PAGE: PvP Guide

### SEO

```js
title: "PvP Guide | Project Zomboid Survival Wiki"
description: "Learn the basics of Project Zomboid PvP, including risk management, safehouses, ambushes, vehicle danger, and server etiquette."
canonical: "https://projectzomboid.gamewikihub.com/multiplayer/pvp-guide"
keywords: ["project zomboid pvp", "project zomboid multiplayer pvp", "project zomboid pvp guide"]
```

### Content

#### PvP Is Not Fair, And That Is The Point

Project Zomboid PvP is less about clean duels and more about information, positioning, sound, and preparation. The person who sees first usually controls the fight.

#### PvP Survival Principles

- never reveal your main base casually
- avoid predictable routes
- do not drive directly home after conflict
- keep backup supplies away from your main base
- assume gunshots attract both players and zombies
- use darkness, buildings, and trees carefully

#### Safehouse Thinking

A safehouse is not safe if everyone knows where it is. Security comes from secrecy, escape routes, storage discipline, and not creating obvious vehicle trails.

#### Beginner Mistake

Do not treat PvP like a shooter. A loud victory can still kill you when the zombies arrive.

---

## PAGE: Server Admin Tips

### SEO

```js
title: "Server Admin Tips | Project Zomboid Survival Wiki"
description: "Practical Project Zomboid server admin tips for backups, rules, mods, grief prevention, loot settings, and player management."
canonical: "https://projectzomboid.gamewikihub.com/multiplayer/server-admin-tips"
keywords: ["project zomboid server admin", "project zomboid dedicated server", "project zomboid server tips"]
```

### Content

#### Admin Work Is Prevention

A good admin does not just ban griefers. A good admin prevents confusion before it becomes drama.

#### Admin Checklist

- write server rules clearly
- back up saves regularly
- test mods before adding them
- announce setting changes
- define PvP rules
- define safehouse rules
- define vehicle ownership rules
- define loot respawn expectations
- have a plan for rollback situations

#### Common Admin Problems

- adding mods mid-save without testing
- unclear PvP expectations
- unlimited loot respawn ruining progression
- no backup before a major change
- players not knowing what behavior counts as griefing

#### Server Rule Examples

- No destroying claimed safehouses.
- No stealing from claimed safehouse containers.
- PvP only outside protected zones.
- Do not lure hordes into bases intentionally.
- Do not block public roads with wrecks unless it is part of an approved event.
- Vehicle ownership must be respected if parked inside a claimed safehouse.

---

## PAGE: Multiplayer Etiquette

### SEO

```js
title: "Multiplayer Etiquette | Project Zomboid Survival Wiki"
description: "Learn basic Project Zomboid multiplayer etiquette for loot sharing, vehicles, safehouses, voice chat, PvP, and group survival."
canonical: "https://projectzomboid.gamewikihub.com/multiplayer/etiquette"
keywords: ["project zomboid multiplayer etiquette", "project zomboid server rules", "project zomboid co-op rules"]
```

### Content

#### The Zombies Are Not The Only Threat

Most multiplayer problems start with expectations, not malice. Players fight because nobody agreed on loot, vehicles, guns, or base rules.

#### Basic Etiquette

- ask before taking rare tools
- do not move someone else's car without telling them
- do not fire guns near base without warning
- label containers clearly
- replace fuel if you use shared vehicles
- do not lead hordes home
- announce bites honestly
- respect safehouse boundaries

#### Group Survival Rule

If your action creates risk for the group, communicate before doing it.

---

# 12. Build 42 Update Notes

Add stronger warnings around Build 42 content.

## Build 42 global warning

For Build 42 pages, include:

```txt
Build 42 is still changing. Some systems, numbers, recipes, traits, occupations, animal behavior, and crafting requirements may shift between unstable patches. This guide focuses on practical survival patterns rather than fragile exact values.
```

## Build 42 source pages

Use:
```txt
https://projectzomboid.com/blog/upcoming-features-b42/
https://store.steampowered.com/news/app/108600
https://theindiestone.com/forums/
```

---

# 13. Source List To Add Globally

Add a global `Sources` object or `sourceRegistry`.

```js
const sourceRegistry = {
  steamStore: {
    label: "Project Zomboid Steam Store",
    url: "https://store.steampowered.com/app/108600/Project_Zomboid/",
    type: "official",
    note: "Official game description and broad feature categories."
  },
  officialBlogB42: {
    label: "Official Build 42 Upcoming Features Blog",
    url: "https://projectzomboid.com/blog/upcoming-features-b42/",
    type: "official",
    note: "Official Build 42 feature direction including crafting, animals, and systems."
  },
  steamNews: {
    label: "Project Zomboid Steam News Hub",
    url: "https://store.steampowered.com/news/app/108600",
    type: "official",
    note: "Patch news and update announcements."
  },
  indieStoneForums: {
    label: "The Indie Stone Forums",
    url: "https://theindiestone.com/forums/",
    type: "official/community",
    note: "Patch discussion and official forum posts."
  },
  steamScreenshots: {
    label: "Steam Community Screenshots",
    url: "https://steamcommunity.com/app/108600/screenshots/",
    type: "community",
    note: "Reference only. Do not use user screenshots without permission."
  }
}
```

---

# 14. Page Quality Checklist

Every page should pass this checklist:

```txt
[ ] Unique SEO title
[ ] Unique meta description
[ ] Canonical URL
[ ] OG tags
[ ] Twitter card tags
[ ] Hero image or styled fallback
[ ] Hero image alt text
[ ] At least 800–1200 words for major SEO pages
[ ] Practical beginner mistakes section
[ ] Long-term survival section
[ ] Sources & Update Notes box
[ ] Internal links to related pages
[ ] Added to sitemap.xml
[ ] No copied text from external sites
[ ] No hotlinked random images
[ ] Mobile layout checked
[ ] Ads do not break content flow
```

---

# 15. Internal Linking Requirements

Add related links at the bottom of each page.

Examples:

## Vehicle pages should link to:
```txt
/skills/mechanics
/skills/electrical
/vehicles/fuel-guide
/vehicles/hotwire-cars
/guides/first-week
/locations/best-base-locations
```

## Multiplayer pages should link to:
```txt
/mods/best-multiplayer-mods
/vehicles/overview
/guides/infection
/traits/smoker
/guides/first-week
```

## Mod pages should link to:
```txt
/multiplayer/best-server-settings
/mods/mod-load-order
/mods/best-multiplayer-mods
```

## Build 42 pages should link to:
```txt
/build42/overview
/build42/animals
/build42/crafting
/skills/carpentry
/skills/farming
```

---

# 16. Sitemap Update Requirements

Update `sitemap.xml` with all new pages.

Add at least:

```txt
https://projectzomboid.gamewikihub.com/vehicles/overview
https://projectzomboid.gamewikihub.com/vehicles/hotwire-cars
https://projectzomboid.gamewikihub.com/vehicles/best-vehicles
https://projectzomboid.gamewikihub.com/vehicles/vehicle-maintenance
https://projectzomboid.gamewikihub.com/vehicles/fuel-guide
https://projectzomboid.gamewikihub.com/vehicles/towing-guide

https://projectzomboid.gamewikihub.com/mods/overview
https://projectzomboid.gamewikihub.com/mods/best-essential-mods
https://projectzomboid.gamewikihub.com/mods/best-multiplayer-mods
https://projectzomboid.gamewikihub.com/mods/mod-load-order
https://projectzomboid.gamewikihub.com/mods/server-mods

https://projectzomboid.gamewikihub.com/multiplayer/overview
https://projectzomboid.gamewikihub.com/multiplayer/best-server-settings
https://projectzomboid.gamewikihub.com/multiplayer/co-op-survival
https://projectzomboid.gamewikihub.com/multiplayer/pvp-guide
https://projectzomboid.gamewikihub.com/multiplayer/server-admin-tips
https://projectzomboid.gamewikihub.com/multiplayer/etiquette
```

---

# 17. Visual Style Improvements

Keep the existing dark survival theme, but make content feel more like a field manual.

## Suggested components

- torn-paper source note card
- warning callouts
- survival tip cards
- mistake cards
- route breadcrumb
- last updated badge
- build warning badge
- related page cards
- image caption component

## Callout styles

```txt
Survivor Tip
Beginner Mistake
Build 42 Warning
Long-Term Survival
Do Not Do This
```

Example:

```txt
Survivor Tip:
A working car is not a luxury. It is your backup plan when the neighborhood stops being worth defending.
```

---

# 18. Final Instruction To Claude

Implement the dev changes without rewriting the entire visual identity. Preserve the existing site style and data-driven structure where possible, but make the site more SEO-ready and content-rich.

Priority order:
1. Add metadata system.
2. Add source/update note system.
3. Add image support with local `/assets/images/...` paths.
4. Expand Vehicles, Mods, and Multiplayer pages using the content in this file.
5. Update sitemap.
6. Add static HTML generation if feasible.
7. Keep Cloudflare deployment working.

Do not:
- remove existing pages
- break current routes
- hotlink random images
- copy external text directly
- add fake sources
- make Build 42 exact-stat claims without update notes
