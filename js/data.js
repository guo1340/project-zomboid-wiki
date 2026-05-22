/* ============================================================
   Project Zomboid Wiki — Data
   ------------------------------------------------------------
   A practical survival manual for Knox Country. Everything the
   wiki renders lives in this file. To add a trait / skill /
   weapon / guide, append a new object to the relevant array.
   Cross-links resolve through the `id` field — ids must match.

   Tone rule: every entry leads with a practical opinion, explains
   WHY something matters, names beginner mistakes, and keeps a
   long-term survival perspective. Content reflects Build 42 and
   community survival consensus; update numbers as patches land.
   ============================================================ */

window.WikiData = {

  /* ---------------------------------------------------------- */
  /*                      BEGINNER + ADVANCED GUIDES            */
  /* ---------------------------------------------------------- */
  guides: [
    {
      id: 'first-day-survival',
      category: 'beginner',
      title: 'First Day Survival Guide',
      tagline: 'Your first mistake is thinking food matters more than safety.',
      summary: 'Noise management and escape routes keep you alive on Day One. Canned beans do not.',
      sections: [
        {
          h: 'What Actually Matters On Day One',
          body: `<p>New survivors burn their first day looting kitchens for food. That is the wrong instinct. On Day One you are not going to starve — the hunger system is slow, and almost every house has enough food to carry you through the first week. What kills you on Day One is noise, panic, and getting cornered.</p>
          <p>Treat the first day as a reconnaissance run. Learn which direction the zombie density increases, find a house with two exits, and avoid drawing a crowd you cannot out-walk. A quiet, boring first day is a successful first day.</p>`
        },
        {
          h: 'Immediate Priorities',
          list: ['A reliable melee weapon — even a kitchen knife or a sturdy branch beats bare hands', 'A water bottle you can refill before the water shuts off', 'A backpack or bag so you are not click-juggling loot', 'A safe temporary shelter with at least two ways out'],
          body: `<p>Notice what is <em>not</em> on that list: guns, cars, skill books. Those are Week One problems. Day One is about being mobile, hydrated, and armed enough to handle a single zombie without a fight becoming an event.</p>`
        },
        {
          h: 'Combat Basics',
          list: ['Shove to create space, then stomp downed zombies — this is your safest damage', 'Fight along fences so zombies funnel to you one at a time', 'Watch your endurance moodle; a tired survivor swings slow and misses', 'Never sprint unless you are already committed to running'],
          body: `<p>Experienced players repeat the same advice for a reason: walk, do not run. Sprinting drains endurance fast, makes noise, and turns a manageable group into a chase. Multi-hit (a sandbox option) is worth enabling while you learn — it lets one swing connect with a small cluster instead of getting you swarmed mid-animation.</p>`
        },
        {
          h: 'Common Beginner Deaths',
          list: ['Panic sprinting into a second group while fleeing the first', 'Fighting indoors where you cannot back up or see flankers', 'Letting the exhaustion moodle stack until swings whiff', 'Over-looting — staying in a building long after it stopped being worth it', 'Standing in the open during the helicopter event'],
          body: `<p>Almost every Day One death traces back to one of these. None of them are about bad luck. They are about staying somewhere too long or moving too fast.</p>`
        },
        {
          h: 'Recommended Sandbox Settings',
          list: ['Lower zombie population while you learn the combat rhythm', 'Multi-hit enabled so clusters are survivable', 'Easier car spawns and condition if you want early mobility', 'Bite-only infection so scratches stop ending runs you could have saved'],
          body: `<p>There is no shame in customising sandbox settings. Apocalypse difficulty is a specific, punishing experience — it is not the "correct" way to learn the game. Dial population and infection down, master shove-stomp and fence-fighting, then ramp the difficulty back up once the fundamentals are automatic.</p>`
        }
      ]
    },
    {
      id: 'how-infection-works',
      category: 'beginner',
      title: 'How Infection Actually Works',
      tagline: 'The game lies to you constantly. A nervous wreck moodle does not mean you are dead. A bite usually does.',
      summary: 'Scratches, lacerations and bites carry very different risk. Learn to read real symptoms from fake ones.',
      sections: [
        {
          h: 'Scratch vs Laceration vs Bite',
          body: `<p>Not all zombie wounds are equal, and conflating them gets survivors killed — emotionally if not literally. A <strong>bite</strong> is, under default settings, a death sentence: effectively a 100% transmission chance. A <strong>laceration</strong> carries a moderate chance. A <strong>scratch</strong> carries a low chance. The wound is rolled the moment you take it; nothing you do afterward changes the result.</p>
          <p>This is why bite-only infection is a kinder sandbox setting for new players — it removes the runs that end to a single unlucky scratch you never had a chance to prevent.</p>`
        },
        {
          h: 'Fake Symptoms vs Real Infection',
          body: `<p>The game floods you with moodles that <em>look</em> like infection but are not. Panic, nausea, anxiety and a "nervous wreck" status can all come from stress, a foul mood, bad food, or simply seeing too many zombies. Beginners feel one queasy moodle, assume they are turning, and throw the run away.</p>
          <p>Real Knox infection follows a timeline. If you were never bitten or wounded, those moodles are stress and exhaustion — manageable, not terminal.</p>`
        },
        {
          h: 'Moodles Explained',
          body: `<p>Moodles are status icons in the top-right. The ones that matter for infection are the sickness moodle progressing through queasy, nauseous and then sick. But the same icons appear from food poisoning and from being near corpses too long. Context is everything: a clean survivor who ate questionable food is sick, not infected.</p>`
        },
        {
          h: 'How Long Infection Takes',
          body: `<p>Knox infection is not instant. After an infecting wound there is a delay — often a couple of days — before symptoms appear, then a further decline before death. That window is enough time to get home, secure your base, write down your stash locations, and set up your next character so the bloodline of progress continues.</p>`
        },
        {
          h: 'Can You Survive It?',
          body: `<p>Under default rules: no. Once the Knox infection is rolled in, it does not break. Antibiotics, rest and good food slow generic illness, not the zombie virus. Some players run sandbox settings that make infection survivable or disable it — that is a legitimate choice, not cheating. But on default settings, an infected character's job changes from "survive" to "set up the next one."</p>`
        }
      ]
    },
    {
      id: 'first-week',
      category: 'beginner',
      title: 'How To Survive The First Week',
      tagline: 'The first week is where overconfidence quietly signs your death warrant.',
      summary: 'Establish a base near water, secure a working car, stock skill books, and resist the urge to push your luck.',
      sections: [
        {
          h: 'Establishing A Temporary Base',
          body: `<p>Your first base does not need to be your forever base. It needs to be defensible, near supplies, and somewhere you can sleep without a wandering horde finding you. A single-storey house with a fenced yard on the edge of town is worth ten "perfect" houses deep in a zombie-dense neighbourhood.</p>`
        },
        {
          h: 'Water Shutdown Preparation',
          body: `<p>Roughly two weeks in, the water and power infrastructure fails. Survivors who ignore this are suddenly very thirsty. Within the first week, start filling every container you own, and ideally relocate near a permanent water source — a river, lake, or a spot you can place rain collector barrels once your carpentry is up.</p>`
        },
        {
          h: 'Food Priorities',
          body: `<p>Eat the food that spoils first. Once power dies, fridges stop working and perishables rot fast. Burn through fresh and frozen food early; save canned goods, dried pasta and rice for later. A freezer full of meat is worthless the day the grid goes down.</p>`
        },
        {
          h: 'Skill Books',
          body: `<p>Skill books multiply XP gain for their skill and tier. Carpentry, cooking, farming and electrical books are the ones that pay you back. Loot bookstores, schools and houses for them in Week One and read them <em>before</em> grinding the skill — reading after the fact wastes the multiplier.</p>`
        },
        {
          h: 'Vehicle Priorities',
          body: `<p>A working car changes the entire game. It is storage, a mobile safe room, an escape tool and a way to reach loot you would never walk to. Prioritise a vehicle with a healthy engine and enough fuel to matter. You do not need a fast car — you need a running one.</p>`
        },
        {
          h: 'Avoiding Overconfidence',
          body: `<p>Week One survivors get comfortable. They clear a few houses, win a few fights, and decide they are ready for the town centre or a gun store. That decision ends most promising runs. The first week should end with you <em>more</em> cautious than you started — you now have something to lose.</p>`
        }
      ]
    },
    {
      id: 'surviving-winter',
      category: 'advanced',
      title: 'How To Survive Winter',
      tagline: 'Winter does not chase you. It just waits for the unprepared to run out of calories.',
      summary: 'Cold raises your calorie burn, farming stalls, and fuel planning becomes a survival skill in its own right.',
      sections: [
        {
          h: 'Calories',
          body: `<p>Cold weather increases how fast you burn calories. A survivor who maintained weight comfortably in autumn can slide into underweight territory in winter doing the same activities. Going into the cold months you want a calorie surplus banked as body weight and a deep pantry of shelf-stable food.</p>`
        },
        {
          h: 'Insulation',
          body: `<p>Layered, warm clothing is not cosmetic. The cold moodle slows you, hurts your mood, and at the extreme end causes real harm. Hats, gloves, a warm jacket and proper trousers should be assembled long before the first frost — looting for a coat while already freezing is a bad position to be in.</p>`
        },
        {
          h: 'Farming Problems',
          body: `<p>Most crops will not grow through winter, so the farm that fed you all autumn goes quiet. Plan for that gap. Either bank a preserved-food reserve from your autumn harvest or lean on winter-viable food sources rather than expecting the garden to carry you.</p>`
        },
        {
          h: 'Fishing And Foraging Changes',
          body: `<p>Foraging yields drop sharply in winter and the forage categories shift. Fishing remains one of the more reliable cold-weather protein sources if you set up near water. Build 42's expanded wilderness systems make hunting a genuine winter food strategy — see the Animals &amp; Hunting page.</p>`
        },
        {
          h: 'Generator Usage',
          body: `<p>A generator keeps a chest freezer running, which means a stored winter's worth of meat stays edible. But generators are loud and thirsty. Run one in a sealed room away from your sleeping area, keep the noise consequence in mind, and never let fuel planning become an afterthought.</p>`
        },
        {
          h: 'Fuel Planning',
          body: `<p>Winter fuel demand is real: generators, vehicle heating, and the simple need to drive to distant loot. Siphon and stockpile fuel through autumn. Running dry in February, miles from a pump, with a freezer full of thawing meat, is a self-inflicted disaster.</p>`
        }
      ]
    },
    {
      id: 'long-term-survival',
      category: 'advanced',
      title: 'Long-Term Survival Strategy',
      tagline: 'Most runs do not end because of zombies. They end because players stop respecting routine.',
      summary: 'Months-long survival is about boredom, renewable resources and discipline — not combat.',
      sections: [
        {
          h: 'Boredom Management',
          body: `<p>Once your base is secure, the threat shifts from zombies to your own psychology — both the character's and yours. Unhappiness and boredom moodles tank your mood, which tanks everything else. Keep books, a radio, hobbies and variety in your routine. A bored survivor makes reckless decisions just to feel something.</p>`
        },
        {
          h: 'Food Sustainability',
          body: `<p>Looted food runs out. A run that intends to last must transition to renewable food: farming, fishing, trapping, foraging and — in Build 42 — animal husbandry. The day you stop depending on cans is the day the run becomes genuinely stable.</p>`
        },
        {
          h: 'Renewable Resources',
          body: `<p>Water from rain collectors, food from the farm, planks from a sustainable cutting routine, and a base layout that does not need constant repair. Build systems, not stockpiles. A stockpile is a countdown timer; a system is a survivor.</p>`
        },
        {
          h: 'Ammo Conservation',
          body: `<p>Firearms are finite. Treat every round as irreplaceable. Late-game survival runs almost entirely on melee, with guns reserved for emergencies — a horde at the base, a helicopter event gone wrong, a rescue. Burning ammo on routine clearing is borrowing against a debt you cannot repay.</p>`
        },
        {
          h: 'Base Migration',
          body: `<p>Sometimes the smart move is to abandon a base. Loot in the surrounding area gets exhausted, a horde event reshapes the neighbourhood, or you simply outgrow the original spot. Plan migrations deliberately — scout the destination, move in stages, and never burn the old base until the new one is genuinely livable.</p>`
        }
      ]
    },
    {
      id: 'helicopter-event',
      category: 'advanced',
      title: 'Helicopter Event Guide',
      tagline: 'The helicopter event punishes players who settled too early and too loudly.',
      summary: 'A roaming helicopter drags every nearby zombie toward your position. Survive it by moving, not hiding in place.',
      sections: [
        {
          h: 'Timing',
          body: `<p>The helicopter event triggers within the first week or two of the in-game timeline. It is not random punishment — it is a scheduled stress test of your base and your routine. Knowing it is coming means you can be somewhere defensible, or somewhere far from the herds, when it starts.</p>`
        },
        {
          h: 'How Zombies React',
          body: `<p>The helicopter is an enormous, mobile noise source. It draws zombies toward wherever it is, and it tends to track <em>you</em>. The result is that every zombie within earshot of the chopper starts converging on your location. A base that felt safe can be surrounded within in-game hours.</p>`
        },
        {
          h: 'Hiding Strategies',
          body: `<p>You cannot out-quiet the helicopter, but you can avoid being its anchor. Get indoors, away from windows, stay still and stay quiet once it is overhead — your own noise stacks on top of it. The goal is to not be the loudest interesting thing once the chopper moves on.</p>`
        },
        {
          h: 'Mobile Survival',
          body: `<p>Many veterans prefer to simply not be home. If you have a car and fuel, the event is far easier to ride out on the move, well away from town density, than barricaded inside a base that is about to become a zombie magnet.</p>`
        },
        {
          h: 'Common Panic Mistakes',
          list: ['Sprinting outside to "see" the helicopter — you just announced yourself', 'Opening fire on the approaching horde and tripling the noise', 'Abandoning a perfectly defensible base mid-event and getting caught in the open', 'Forgetting the event ends — you only have to outlast it, not win a war'],
          body: `<p>The helicopter event feels like an emergency. It is really an endurance check. Stay calm, stay quiet, and let it pass.</p>`
        }
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                          TRAITS                            */
  /* ---------------------------------------------------------- */
  traits: [
    {
      id: 'smoker', name: 'Smoker', polarity: 'negative', cost: '+4', difficulty: 'Easy',
      tone: 'Smoker is practically free points once you understand cigarette spawns. The stress-management bonus is more useful than most beginners realise.',
      whyPlayersTake: 'It hands you 4 points for a downside that barely exists in practice. Cigarettes are extremely common loot — gas stations, bedside tables, corpses, shops — so the "need" the trait creates is one the world keeps satisfying for free.',
      earlyImpact: 'Negligible. You will trip over cigarettes before stress from nicotine withdrawal ever becomes a problem. Pick up every pack you see and the trait is invisible.',
      midImpact: 'Slightly positive, oddly enough. Smoking a cigarette actively reduces stress and unhappiness, so a Smoker has an on-demand mood tool that a non-smoker does not.',
      lateImpact: 'Stays neutral-to-positive as long as you keep a carton in reserve. The only real failure case is a long isolated run where you never restock — and even then, withdrawal stress is survivable.',
      hidden: 'The trait is less "a smoking addiction" and more "access to a consumable stress reducer." Veterans treat the 4 points as the real product and the cigarettes as a minor logistics line.',
      worthIt: 'Yes, on almost every build. It is one of the most efficient negative traits in the game.',
      occupationPairings: ['unemployed', 'burglar', 'veteran'],
      communityVerdict: 'Widely considered one of the best value negative traits — close to free points for experienced players.'
    },
    {
      id: 'athletic', name: 'Athletic', polarity: 'positive', cost: '-6', difficulty: 'Easy',
      tone: 'Athletic quietly carries bad players harder than almost any trait in the game. Fitness decides whether you survive your own mistakes.',
      whyPlayersTake: 'It starts you with high Fitness, and Fitness is one of the slowest, most painful skills to raise from scratch. Buying it at character creation skips dozens of hours of jogging in circles.',
      earlyImpact: 'Enormous. Higher endurance means you can fight longer, run further and recover faster — exactly the margin that turns a fatal swarm into a clean escape on Day One.',
      midImpact: 'Still strong. Endurance underpins every melee fight, and Fitness gates how hard your character can push before exhaustion makes swings miss.',
      lateImpact: 'A non-Athletic survivor can eventually grind Fitness up, so the gap narrows over a very long run — but the early survival it buys is what gets you to "late game" at all.',
      hidden: 'Fitness levels up far slower than Strength. That asymmetry is the entire reason Athletic costs more in practical terms than its point value suggests.',
      worthIt: 'Yes. For new players it is arguably the single best survivability purchase available.',
      occupationPairings: ['fire-officer', 'police-officer', 'veteran'],
      communityVerdict: 'Consistently rated a top-tier positive trait, especially for beginners who lean on it to survive bad decisions.'
    },
    {
      id: 'strong', name: 'Strong', polarity: 'positive', cost: '-10', difficulty: 'Easy',
      tone: 'Strong is the most expensive positive trait, and it earns the price tag in knockback, carry weight and stamina efficiency.',
      whyPlayersTake: 'High starting Strength boosts melee damage, push/shove effectiveness and how much you can carry without slowing down. It makes the entire early game less fragile.',
      earlyImpact: 'Major. More melee damage and stronger shoves mean fights end faster and you knock zombies down more reliably — the safest possible combat outcome.',
      midImpact: 'Carry weight becomes the standout benefit. A Strong survivor hauls loot, builds bases and travels armed without constantly fighting the encumbrance moodle.',
      lateImpact: 'Strength can be trained over time, so the gap closes — but it scales smoothly with everything you do, so the value never disappears.',
      hidden: 'Strength governs stamina efficiency in melee. A Strong survivor tires slower in a fight, which compounds with endurance and quietly prevents exhaustion deaths.',
      worthIt: 'Yes, if your point budget allows it. The 10-point cost is steep, but the survivability is real.',
      occupationPairings: ['lumberjack', 'fire-officer', 'veteran'],
      communityVerdict: 'Rated alongside Athletic as a premier beginner-friendly positive trait; the only argument against it is the point cost.'
    },
    {
      id: 'keen-hearing', name: 'Keen Hearing', polarity: 'positive', cost: '-6', difficulty: 'Easy',
      tone: 'Keen Hearing saves more runs than armour ever will.',
      whyPlayersTake: 'It widens your awareness bubble — the cone in which zombies are detected and shown to you. More warning means fewer ambushes, and ambushes are what kill careful players.',
      earlyImpact: 'Quietly huge. Most early deaths come from a zombie you did not know was there. Keen Hearing turns those flank attacks into "noticed in time" moments.',
      midImpact: 'Pairs beautifully with stealthy play. Better detection lets you route around groups instead of fighting through them, conserving endurance and durability.',
      lateImpact: 'Never stops mattering. Information is the resource that prevents the surprise death, and surprise deaths happen at every stage of the game.',
      hidden: 'The benefit is psychological as much as mechanical — knowing what is behind you lets you commit to fights and movement with confidence instead of constant nervous turning.',
      worthIt: 'Yes. Many veterans consider it close to mandatory on cautious, long-term builds.',
      occupationPairings: ['burglar', 'police-officer', 'veteran'],
      communityVerdict: 'Frequently called an underrated must-have; the awareness it grants prevents exactly the deaths that feel "unfair."'
    },
    {
      id: 'weak-stomach', name: 'Weak Stomach', polarity: 'negative', cost: '+3', difficulty: 'Easy',
      tone: 'Weak Stomach sounds terrifying until you realise most experienced players avoid dangerous food entirely anyway.',
      whyPlayersTake: 'It increases the chance of getting sick from questionable food — but if your food discipline is good, that chance rarely gets a chance to fire.',
      earlyImpact: 'Low, provided you do not eat rotten or borderline food. Early on you usually have fresh loot, so the downside almost never triggers.',
      midImpact: 'Manageable. Once you cook properly and keep an eye on freshness, the trait is mostly theoretical. Good cooking practice neutralises it.',
      lateImpact: 'Effectively free on a disciplined run. A survivor who never gambles on sketchy food never pays the Weak Stomach tax.',
      hidden: 'The trait punishes a behaviour good players already avoid. You are essentially being paid 3 points to keep a habit you should keep regardless.',
      worthIt: 'Yes for experienced players. Risky for brand-new players who have not built food discipline yet.',
      occupationPairings: ['unemployed', 'carpenter', 'engineer'],
      communityVerdict: 'Considered near-free points by veterans; the consensus caveat is that beginners should learn food management first.'
    },
    {
      id: 'lucky', name: 'Lucky', polarity: 'positive', cost: '-4', difficulty: 'Easy',
      tone: 'Lucky is a small, quiet trait that improves the texture of every loot run you ever do.',
      whyPlayersTake: 'It nudges loot tables and foraging in your favour. No single pickup feels different, but the cumulative effect over hundreds of containers is genuine.',
      earlyImpact: 'Subtle. You will not notice it on any one house, but a slightly better stream of useful loot helps the fragile early game.',
      midImpact: 'Pairs well with foraging and scavenging playstyles where you open a large number of loot sources and small probability shifts add up.',
      lateImpact: 'Marginal but never negative. It is points spent on consistency rather than power.',
      hidden: 'Because the effect is statistical and invisible, players routinely under- or over-rate it. Treat it as a cheap consistency tax, not a power pick.',
      worthIt: 'Situational. Fine as a points filler; never a priority over survivability traits.',
      occupationPairings: ['burglar', 'unemployed'],
      communityVerdict: 'Generally seen as a low-impact but harmless filler trait — pleasant, not transformative.'
    },
    {
      id: 'brave', name: 'Brave', polarity: 'positive', cost: '-4', difficulty: 'Easy',
      tone: 'Brave does not make you stronger — it stops fear from making you weaker.',
      whyPlayersTake: 'It reduces panic. Panic hurts your combat accuracy and clouds the screen, so a calmer survivor simply fights better when surrounded.',
      earlyImpact: 'Useful. Beginners spend a lot of the early game panicking, and panic-induced misses cause exactly the swarm deaths they fear.',
      midImpact: 'Steady value. As you face larger groups intentionally, keeping accuracy under pressure is worth real points.',
      lateImpact: 'Less critical once you naturally desensitise to zombies through experience, but it never becomes a liability.',
      hidden: 'Panic resistance also smooths your mood and decision-making. A non-panicking survivor makes fewer frantic, fatal choices.',
      worthIt: 'Yes for nervous or newer players; optional for veterans who have learned to stay calm anyway.',
      occupationPairings: ['fire-officer', 'police-officer', 'veteran'],
      communityVerdict: 'Solid mid-tier pick — especially recommended to beginners who notice panic wrecking their fights.'
    },
    {
      id: 'fast-learner', name: 'Fast Learner', polarity: 'positive', cost: '-6', difficulty: 'Moderate',
      tone: 'Fast Learner is an investment trait — it pays nothing today and a great deal six weeks from now.',
      whyPlayersTake: 'It boosts XP gain across all skills. Every hour of carpentry, cooking, farming and combat XP arrives faster for the entire run.',
      earlyImpact: 'Low. On Day One you have no XP to multiply, so the trait feels dead.',
      midImpact: 'Where it shines. As you grind skills, the multiplier compounds and you hit useful skill breakpoints noticeably sooner.',
      lateImpact: 'Strong on long runs and weaker on short ones. The longer you survive, the more total XP it has accelerated.',
      hidden: 'It multiplies skill-book bonuses too, so a Fast Learner with the right books levels key skills dramatically faster than the point cost implies.',
      worthIt: 'Yes for players who commit to long runs; skippable for short, combat-focused playthroughs.',
      occupationPairings: ['carpenter', 'engineer', 'unemployed'],
      communityVerdict: 'Respected on long-term builds; the common note is that its value is entirely back-loaded.'
    },
    {
      id: 'outdoorsman', name: 'Outdoorsman', polarity: 'positive', cost: '-2', difficulty: 'Easy',
      tone: 'Outdoorsman is cheap insurance against the wilderness quietly killing you.',
      whyPlayersTake: 'It reduces the damage and chill from moving through trees and bushes, and softens cold-weather penalties. For two points, it removes a steady stream of small annoyances.',
      earlyImpact: 'Modest in town, larger if your start involves forest travel or a rural base.',
      midImpact: 'Grows in value as you forage, hunt and travel cross-country. Less scratching through brush means less infection-risk exposure under non-bite settings.',
      lateImpact: 'Significant for wilderness-leaning Build 42 playstyles built around hunting and foraging.',
      hidden: 'The cold-resistance component makes it a stealth winter trait — it takes some of the edge off the cold moodle before you even own warm clothing.',
      worthIt: 'Yes. At two points it is one of the best value positive traits in the game for any nature-adjacent build.',
      occupationPairings: ['lumberjack', 'veteran'],
      communityVerdict: 'Considered excellent value, particularly with Build 42 pushing players toward wilderness systems.'
    },
    {
      id: 'wakeful', name: 'Wakeful', polarity: 'positive', cost: '-2', difficulty: 'Easy',
      tone: 'Wakeful buys you more usable hours in every single day of the run.',
      whyPlayersTake: 'Your character needs less sleep. Less time unconscious means more time looting, building and travelling — and fewer vulnerable sleep windows.',
      earlyImpact: 'Useful immediately. Sleep is dead time and a danger window; cutting it down is pure tempo.',
      midImpact: 'Consistent value. More waking hours means faster base-building and skill grinding across the whole run.',
      lateImpact: 'Steady. The benefit is the same on Day 200 as on Day 2 — a quietly efficient trait.',
      hidden: 'Sleeping is when a base breach becomes lethal. Less required sleep is a small but real safety improvement, not just a productivity one.',
      worthIt: 'Yes. Two points for permanently more daytime is an easy purchase.',
      occupationPairings: ['carpenter', 'engineer', 'mechanic'],
      communityVerdict: 'Widely liked as cheap, reliable value with effectively no downside.'
    },
    {
      id: 'cats-eyes', name: "Cat's Eyes", polarity: 'positive', cost: '-2', difficulty: 'Easy',
      tone: "Cat's Eyes turns the most dangerous part of the day — night — into something survivable.",
      whyPlayersTake: 'It improves night vision. After the power fails, nights are near-total darkness, and being able to see in them is a genuine capability upgrade.',
      earlyImpact: 'Limited while the power is still on and streetlights work.',
      midImpact: 'Large once the grid fails. Night travel and night defence become realistic options instead of blind gambles.',
      lateImpact: 'Permanently useful. Every night of a long run is a little safer and a little more usable.',
      hidden: 'It effectively extends your productive day into the night, indirectly giving you more time much like Wakeful does — the two stack into a serious tempo build.',
      worthIt: 'Yes. Two points for meaningfully safer nights is excellent value.',
      occupationPairings: ['burglar', 'police-officer'],
      communityVerdict: 'Regarded as strong cheap value, especially for players who refuse to waste the night hours.'
    },
    {
      id: 'dextrous', name: 'Dextrous', polarity: 'positive', cost: '-2', difficulty: 'Easy',
      tone: 'Dextrous is a quality-of-life trait that pays you back every time you open an inventory.',
      whyPlayersTake: 'It speeds up transferring items between inventories. Across a full run you move thousands of items, and faster transfers mean less standing-still time.',
      earlyImpact: 'Minor but constant. Looting is faster, which means less time exposed in dangerous buildings.',
      midImpact: 'Consistent. Base organisation, vehicle loading and big loot hauls all happen quicker.',
      lateImpact: 'Stable. It never gets stronger, but it never stops paying out either.',
      hidden: 'The real benefit is reduced time-standing-still in unsafe places. Faster looting is faster leaving, and leaving is survival.',
      worthIt: 'Yes. A cheap, painless efficiency pick with no real downside.',
      occupationPairings: ['burglar', 'unemployed'],
      communityVerdict: 'Seen as low-drama, reliably good value — rarely a regret pick.'
    },
    {
      id: 'slow-healer', name: 'Slow Healer', polarity: 'negative', cost: '+6', difficulty: 'Moderate',
      tone: 'Slow Healer is a gamble that pays well if you simply refuse to get hurt.',
      whyPlayersTake: 'It grants 6 points for slower recovery from injuries. If your playstyle avoids damage in the first place, you rarely feel the cost.',
      earlyImpact: 'Risky. Beginners take a lot of incidental damage, and slow healing turns a minor injury into a long-term liability.',
      midImpact: 'Manageable for cautious players who fight carefully and rely on First Aid and rest.',
      lateImpact: 'Near-free for disciplined veterans who go weeks without a serious wound; punishing for anyone who fights sloppily.',
      hidden: 'It interacts badly with deep wounds and fractures — a single bad fight can sideline you for a very long time. The trait rewards consistency and punishes one mistake hard.',
      worthIt: 'Situational. Good points for experienced careful players; a trap for beginners.',
      occupationPairings: ['burglar', 'engineer'],
      communityVerdict: 'Polarising — veterans treat it as cheap points, while the common warning is that it can snowball a single injury into a crisis.'
    },
    {
      id: 'prone-to-illness', name: 'Prone To Illness', polarity: 'negative', cost: '+4', difficulty: 'Moderate',
      tone: 'Prone To Illness is mostly a cold-weather and corpse-management problem disguised as a scary name.',
      whyPlayersTake: 'It grants 4 points for an increased chance of generic (non-zombie) sickness. With good clothing and base hygiene, that chance has few openings to trigger.',
      earlyImpact: 'Low in mild weather, higher if you are cold, wet, or living surrounded by corpses.',
      midImpact: 'Manageable. Warm clothes, a dry base and clearing bodies away from your living space keep it suppressed.',
      lateImpact: 'Mostly neutral on a well-run base; spikes in winter if you neglect insulation.',
      hidden: 'Players confuse it with infection vulnerability — it is not. It affects ordinary illness, which is preventable through habits you should have anyway.',
      worthIt: 'Yes for players with solid clothing and base discipline; risky otherwise.',
      occupationPairings: ['carpenter', 'unemployed'],
      communityVerdict: 'Considered reasonable value once players understand it is about cold and hygiene, not the Knox virus.'
    },
    {
      id: 'high-thirst', name: 'High Thirst', polarity: 'negative', cost: '+6', difficulty: 'Moderate',
      tone: 'High Thirst is generous points for a problem that water solves — until water stops being free.',
      whyPlayersTake: 'It grants 6 points for needing to drink more often. Water is everywhere early, so the cost feels imaginary at first.',
      earlyImpact: 'Almost zero. Taps run, bottles are everywhere, and drinking is trivial.',
      midImpact: 'Rises after the water shutoff. You now manage a faster-draining thirst bar against rain collectors and stored water.',
      lateImpact: 'Fully manageable with rain collectors and a riverside base — the infrastructure makes the trait a non-issue.',
      hidden: 'The trait is really a test of whether you prepared for the water shutoff. Prepared survivors barely notice it; unprepared ones get a harsh reminder.',
      worthIt: 'Yes if you commit to a proper water setup; otherwise it can bite mid-game.',
      occupationPairings: ['carpenter', 'engineer'],
      communityVerdict: 'Seen as good value for players who build rain collectors early, and a nuisance for those who do not.'
    },
    {
      id: 'hearty-appetite', name: 'Hearty Appetite', polarity: 'negative', cost: '+4', difficulty: 'Moderate',
      tone: 'Hearty Appetite is fine while the cans last and a real cost once they do not.',
      whyPlayersTake: 'It grants 4 points for needing more food. With looted food piled up, the early downside is barely visible.',
      earlyImpact: 'Low. Houses are full of food and your hunger system is not yet under pressure.',
      midImpact: 'Noticeable. As looted food depletes, eating more means farming, fishing and hunting harder to keep pace.',
      lateImpact: 'Real, but solvable with a strong renewable food base. Winter is when the trait stings most.',
      hidden: 'It quietly raises the bar for how productive your farm and food systems must be — a self-sufficiency tax, not a survival sentence.',
      worthIt: 'Situational. Fine for players who build serious food production; risky for those who do not.',
      occupationPairings: ['lumberjack', 'unemployed'],
      communityVerdict: 'Considered acceptable points for self-sufficient players, with the standard warning that it punishes weak food planning.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                        OCCUPATIONS                         */
  /* ---------------------------------------------------------- */
  occupations: [
    {
      id: 'fire-officer', name: 'Fire Officer', beginnerFriendly: 'High', cost: '0',
      tone: 'Fire Officer is one of the most forgiving combat occupations in the game. Faster movement and fitness bonuses cover up mistakes beginners do not even realise they are making.',
      summary: 'A combat-leaning occupation with movement and fitness bonuses that smooth over beginner errors.',
      bonuses: ['Bonus to Axe skill', 'Movement and fitness perks that improve combat survivability', 'Strong synergy with the most common early-game weapons'],
      sections: [
        { h: 'Why It Works For Beginners', body: '<p>The Fire Officer leans into the two things that actually keep new players alive: moving well and not running out of endurance. The Axe bonus aligns with the most accessible powerful melee weapons, so your damage output is high from the first fight.</p>' },
        { h: 'Long-Term Outlook', body: '<p>Combat occupations like this one front-load their value. The bonuses matter most while you are still learning, then blend into the background as your own skills catch up. That is fine — surviving the learning curve is the whole point.</p>' }
      ],
      verdict: 'Repeatedly recommended by experienced players as a top-tier beginner occupation.'
    },
    {
      id: 'burglar', name: 'Burglar', beginnerFriendly: 'High', cost: '0',
      tone: 'Burglar is the cheat code for mobility. It lets you hotwire any car from the start without a single point in Electrical or Mechanics.',
      summary: 'The mobility occupation — hotwire vehicles immediately, with stealth and lock-handling perks on top.',
      bonuses: ['Can hotwire vehicles without Electrical or Mechanical skill', 'Bonus to Sneak and lightfoot-style stealth', 'Better at dealing with locked doors and windows'],
      sections: [
        { h: 'The Hotwiring Advantage', body: '<p>Normally, hotwiring a car requires investment in both Electrical and Mechanical skill. The Burglar skips that entirely. From the first minute of the run, every car with a healthy engine and fuel is potentially yours — and a working car changes the entire game.</p>' },
        { h: 'Stealth Viability', body: '<p>The sneaking bonuses make Burglar a strong fit for a cautious, avoid-the-fight playstyle. Pair it with Keen Hearing and you route around hordes instead of grinding through them.</p>' },
        { h: 'Beginner Friendliness', body: '<p>Because early mobility is one of the biggest survivability multipliers in the game, Burglar is extremely beginner-friendly. Get a car early, and escape stops being a gamble.</p>' }
      ],
      verdict: 'Considered one of the strongest occupations for mobility-focused and beginner runs precisely because it removes the hotwiring skill tax.'
    },
    {
      id: 'carpenter', name: 'Carpenter', beginnerFriendly: 'High', cost: '0',
      tone: 'Carpenter is the base-builder pick — it makes the single most important survival skill cheaper to develop.',
      summary: 'Starts with a Carpentry bonus, accelerating barricades, walls and base construction.',
      bonuses: ['Significant head start in Carpentry', 'Faster, stronger early barricades and base building'],
      sections: [
        { h: 'Why Carpentry First', body: '<p>Carpentry underpins base defence. Barricades, walls, stairs and rain collectors all run through it. Starting with the skill means your first base is genuinely defensible instead of theoretically defensible.</p>' },
        { h: 'Long-Term Outlook', body: '<p>Carpentry never stops being useful — base expansion, repairs and furniture all draw on it. A Carpenter front-loads that value and keeps benefiting from it for the entire run.</p>' }
      ],
      verdict: 'A reliable, low-risk pick that experienced base-builders rate highly.'
    },
    {
      id: 'veteran', name: 'Veteran', beginnerFriendly: 'Medium', cost: '0',
      tone: 'Veteran trades raw skill bonuses for something rarer: a character who simply does not panic.',
      summary: 'A combat occupation built around panic immunity and firearm competence.',
      bonuses: ['Greatly reduced or negated panic', 'Bonuses to firearm-related skills', 'Steady accuracy under pressure'],
      sections: [
        { h: 'The Panic Advantage', body: '<p>Panic degrades accuracy and clutters the screen. A Veteran fights at full effectiveness while surrounded — which makes large fights, and firearm use specifically, far more reliable.</p>' },
        { h: 'Who It Suits', body: '<p>Veteran rewards players who intend to use guns and face crowds deliberately. It is less beginner-oriented than Fire Officer or Burglar because it does not fix mobility or base-building — it fixes composure.</p>' }
      ],
      verdict: 'Strong for combat- and firearm-focused builds; less essential for cautious avoidance playstyles.'
    },
    {
      id: 'police-officer', name: 'Police Officer', beginnerFriendly: 'Medium', cost: '0',
      tone: 'Police Officer is the firearms occupation — useful, but only if you actually have ammunition.',
      summary: 'Starts with aiming and reloading bonuses geared toward effective gunplay.',
      bonuses: ['Bonus to Aiming', 'Bonus to Reloading', 'Faster, more accurate firearm use'],
      sections: [
        { h: 'Firearm Focus', body: '<p>The Police Officer makes guns viable earlier by raising the two skills that govern hit chance and reload speed. With a pistol and ammo, an early Police Officer can handle threats a melee character would have to flee.</p>' },
        { h: 'The Ammo Caveat', body: '<p>Firearms are loud and ammunition is finite. This occupation is only as good as your ammo supply and your discipline in not wasting it. As a long-term survivor you will still fight mostly with melee.</p>' }
      ],
      verdict: 'Good for players who prioritise gunplay; weaker for runs that lean on stealth and melee.'
    },
    {
      id: 'lumberjack', name: 'Lumberjack', beginnerFriendly: 'Medium', cost: '0',
      tone: 'Lumberjack is part combat occupation, part resource engine — the Axe bonus does double duty.',
      summary: 'Axe skill bonus plus carry-weight and outdoor benefits for a resource-gathering combat build.',
      bonuses: ['Bonus to Axe skill', 'Improved carry capacity and outdoor efficiency', 'Strong at cutting wood for fuel and construction'],
      sections: [
        { h: 'Axes Do Everything', body: '<p>The Axe is both a top-tier melee weapon and the tool for felling trees. A Lumberjack is therefore good at killing zombies <em>and</em> at producing the planks and firewood a long-term base needs.</p>' },
        { h: 'Wilderness Synergy', body: '<p>With Build 42 pushing wilderness survival and crafting depth, a resource-oriented occupation like Lumberjack has aged well. Pair it with Outdoorsman for a self-sufficient rural build.</p>' }
      ],
      verdict: 'A solid hybrid pick for players who want combat capability and renewable resources in one package.'
    },
    {
      id: 'mechanic', name: 'Mechanic', beginnerFriendly: 'Medium', cost: '0',
      tone: 'Mechanic is the occupation that keeps your cars alive — and a dead car is a dead escape plan.',
      summary: 'Starts with a Mechanics bonus for repairing, maintaining and upgrading vehicles.',
      bonuses: ['Head start in Mechanics', 'Better vehicle repair, part swapping and maintenance'],
      sections: [
        { h: 'Why Vehicle Skill Matters', body: '<p>Cars are storage, shelter and escape. Keeping one running means repairing engines, swapping parts and managing condition — all gated behind Mechanics. A Mechanic keeps the fleet healthy without a long grind.</p>' },
        { h: 'Pairing Note', body: '<p>Mechanic does not let you hotwire on its own — that needs Electrical too, or the Burglar occupation. Plan your build accordingly if mobility from minute one is the goal.</p>' }
      ],
      verdict: 'Valuable for vehicle-centric runs; less impactful for players who barely drive.'
    },
    {
      id: 'engineer', name: 'Engineer', beginnerFriendly: 'Medium', cost: '0',
      tone: 'Engineer is the explosives-and-electronics specialist — niche, but unmatched in its niche.',
      summary: 'Bonuses to Electrical and the knowledge to craft traps and explosive devices.',
      bonuses: ['Bonus to Electrical skill', 'Access to crafting traps and explosive devices', 'Synergy with generators and hotwiring (with Mechanics)'],
      sections: [
        { h: 'Electrical As A Foundation', body: '<p>Electrical underpins generators, hotwiring and advanced crafting. An Engineer gets a head start on the skill that keeps the lights and freezers on after the grid fails.</p>' },
        { h: 'Traps And Crowd Control', body: '<p>The crafting knowledge lets an Engineer build noise traps and explosives to thin hordes without melee — a genuinely different way to handle large groups, and one that shines in base defence.</p>' }
      ],
      verdict: 'A specialist pick that rewards players who want generators, traps and a tech-heavy base.'
    },
    {
      id: 'unemployed', name: 'Unemployed', beginnerFriendly: 'High', cost: '+8',
      tone: 'Unemployed is not a weakness — it is 8 free points and total freedom to design the survivor you actually want.',
      summary: 'No occupation bonus, but the largest trait-point budget in the game.',
      bonuses: ['+8 trait points to spend however you choose', 'No skill bonuses, no fixed identity — full customisation'],
      sections: [
        { h: 'Why Veterans Pick It', body: '<p>An occupation bonus is just pre-spent points in a fixed direction. Unemployed hands you those points raw, so you can build precisely the trait spread your playstyle needs — combat, stealth, crafting, or a balanced generalist.</p>' },
        { h: 'Suggested Spends', body: '<p>A common, strong package: Athletic, Strong and Keen Hearing for survivability, partly funded by efficient negative traits like Smoker and Weak Stomach. The result outperforms many fixed occupations for players who know what they want.</p>' }
      ],
      verdict: 'Excellent for players who understand the trait system; the 8 points are worth more than most occupation bonuses.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                          SKILLS                            */
  /* ---------------------------------------------------------- */
  skills: [
    {
      id: 'carpentry', name: 'Carpentry',
      overview: 'Carpentry governs barricades, walls, floors, stairs, furniture and rain collectors — the entire physical fabric of a base.',
      whyItMatters: 'A base is only as safe as its construction skill. Higher Carpentry means stronger barricades and walls that take more hits before a horde breaks through. It is the difference between a base and a building you happen to be standing in.',
      fastestXP: 'Dismantle furniture for early XP and free materials, then build and disassemble simple structures like crates and walls in a loop. Reading the Carpentry skill books first multiplies every point of XP you earn.',
      bestBooks: 'The Carpentry book series, tiered 1 through 5. Always read the next tier before grinding into its level range.',
      vhsPriority: 'Carpentry-related home-improvement VHS tapes give a one-time XP boost — useful but secondary to the books.',
      commonMistakes: 'Grinding Carpentry XP before reading the books and wasting the multiplier; building a base before the skill is high enough for the walls to actually hold.',
      build42Changes: 'Build 42 reworks crafting broadly. Verify exact recipes and material costs against your current build rather than trusting older guides.',
      pairings: ['strength', 'fitness']
    },
    {
      id: 'mechanics', name: 'Mechanics',
      overview: 'Mechanics covers vehicle repair, part removal and installation, engine maintenance and towing.',
      whyItMatters: 'Cars are storage, shelter and escape. Without Mechanics you cannot reliably keep one running — and a vehicle that dies on you mid-trip can end a run.',
      fastestXP: 'Repeatedly remove and reinstall vehicle parts. Each successful operation grants XP, so a steady loop of part-swapping levels the skill efficiently. Higher-tier parts require higher skill to handle.',
      bestBooks: 'The Mechanics book series, tiered 1 through 5. Read before grinding to keep the multiplier.',
      vhsPriority: 'Mechanics-themed VHS tapes provide bonus XP and are worth watching when you find them.',
      commonMistakes: 'Trying to remove high-tier parts at low skill and failing repeatedly; ignoring engine quality when picking a car to invest in.',
      build42Changes: 'Vehicle and crafting systems see adjustments across builds — confirm part requirements against your current version.',
      pairings: ['electrical']
    },
    {
      id: 'electrical', name: 'Electrical',
      overview: 'Electrical governs generators, hotwiring, electronics dismantling and a range of advanced crafting recipes.',
      whyItMatters: 'After the grid fails, Electrical is what keeps freezers, lights and tools running via a generator. It also enables hotwiring (alongside Mechanics) for anyone who did not take the Burglar occupation.',
      fastestXP: 'Dismantle electronic items — radios, televisions, watches — for steady XP and useful components. Skill magazines unlock the ability to actually connect a generator to a building.',
      bestBooks: 'The Electrical book series, tiered 1 through 5, plus the generator magazine that teaches generator connection specifically.',
      vhsPriority: 'Electrical VHS tapes give bonus XP; the generator magazine is the genuine priority pickup.',
      commonMistakes: 'Finding a generator but never reading the magazine that lets you hook it up; scrapping electronics for XP without keeping the components you will need later.',
      build42Changes: 'Build 42 expands crafting and lighting systems; recheck which recipes depend on Electrical in your build.',
      pairings: ['mechanics']
    },
    {
      id: 'aiming', name: 'Aiming',
      overview: 'Aiming determines firearm accuracy and how reliably your shots connect at range.',
      whyItMatters: 'A low-Aiming survivor misses badly, wasting irreplaceable ammunition and generating noise for nothing. Aiming is what turns a gun from a panic button into a tool.',
      fastestXP: 'Carefully fire on isolated zombies from a safe distance. The Aiming skill rises through use; controlled, deliberate shooting beats panicked spraying for both XP and ammo economy.',
      bestBooks: 'Firearm-focused skill books raise the XP multiplier for Aiming and Reloading.',
      vhsPriority: 'Some VHS content boosts firearm skills; books are the steadier investment.',
      commonMistakes: 'Treating guns as a primary weapon at low Aiming and burning through ammo; shooting in crowded areas and pulling a horde with the noise.',
      build42Changes: 'Firearm handling receives tuning across builds; verify behaviour against your current version.',
      pairings: ['strength']
    },
    {
      id: 'fitness', name: 'Fitness',
      overview: 'Fitness governs endurance — how long you can fight, run and work before exhaustion sets in.',
      whyItMatters: 'Endurance is the hidden survival stat. An exhausted survivor swings slowly, misses and cannot flee. Fitness is the buffer that lets you survive a fight going wrong.',
      fastestXP: 'Fitness rises through sustained exertion — running and combat — and through deliberate exercise routines. It levels notoriously slowly, which is exactly why the Athletic trait is so valued.',
      bestBooks: 'Fitness is trained primarily through activity rather than books; exercise consistency matters more than reading.',
      vhsPriority: 'Exercise VHS tapes can be followed for genuine Fitness gains and are worth collecting.',
      commonMistakes: 'Neglecting Fitness because it has no flashy output, then dying to exhaustion in a fight that endurance would have won; over-exercising into injury.',
      build42Changes: 'Exercise and fatigue systems are periodically tuned; check current behaviour in your build.',
      pairings: ['strength']
    },
    {
      id: 'strength', name: 'Strength',
      overview: 'Strength governs melee damage, knockback, carry weight and melee stamina efficiency.',
      whyItMatters: 'Strength makes fights end faster and safer — more damage and stronger shoves mean more zombies on the ground. It also decides how much loot you can carry without the encumbrance moodle crippling you.',
      fastestXP: 'Strength rises through melee combat and through exercise routines. Unlike Fitness it levels comparatively faster, but it is still a long-term project worth a head start.',
      bestBooks: 'Like Fitness, Strength is built through activity and exercise rather than reading.',
      vhsPriority: 'Strength-oriented exercise VHS tapes provide real training value.',
      commonMistakes: 'Ignoring carry weight and constantly fighting the encumbrance moodle; assuming Strength alone wins fights without the endurance to back it up.',
      build42Changes: 'Melee and exercise tuning shifts between builds; verify against your version.',
      pairings: ['fitness']
    },
    {
      id: 'cooking', name: 'Cooking',
      overview: 'Cooking improves the quality, safety and nutrition of prepared food, and unlocks better recipes.',
      whyItMatters: 'Good cooking stretches your food supply, improves mood through tastier meals, and reduces the risk of food-borne illness. On long runs, a skilled cook turns marginal ingredients into reliable nutrition.',
      fastestXP: 'Prepare meals constantly — even simple ones. Cooking on a stove or campfire grants XP, and skill books multiply it. Higher levels let you safely use ingredients a beginner would have to discard.',
      bestBooks: 'The Cooking book series, tiered 1 through 5. Read before grinding meals.',
      vhsPriority: 'Cooking-themed VHS tapes give bonus XP and are a pleasant supplement to the books.',
      commonMistakes: 'Not cooking enough early to bank XP while ingredients are plentiful; eating food raw or spoiled and getting sick when a cooked meal was an option.',
      build42Changes: 'Build 42 adjusts food and crafting systems; confirm recipes in your build.',
      pairings: ['farming', 'foraging']
    },
    {
      id: 'farming', name: 'Farming',
      overview: 'Farming covers planting, tending and harvesting crops — the backbone of renewable food.',
      whyItMatters: 'Looted food is a countdown timer. Farming converts that timer into a renewable supply, and a productive farm is what makes a multi-month run genuinely stable.',
      fastestXP: 'Plant and tend crops actively — watering, removing pests and disease, harvesting. Each stage grants XP, and farming books multiply it. Start a farm early so it is producing before looted food runs low.',
      bestBooks: 'Farming skill books raise the XP multiplier and improve your ability to manage crop disease.',
      vhsPriority: 'Gardening VHS content gives bonus XP and is worth watching.',
      commonMistakes: 'Starting a farm too late and facing a food gap; ignoring crop disease and losing a whole harvest; forgetting that most crops stall through winter.',
      build42Changes: 'Build 42 revisits farming and seasons; verify crop behaviour and timings in your build.',
      pairings: ['cooking', 'foraging']
    },
    {
      id: 'foraging', name: 'Foraging',
      overview: 'Foraging (the wilderness/scavenging skill) governs finding food, materials and useful items in nature.',
      whyItMatters: 'Foraging is free food and free materials from the wilderness, and it is one of the more winter-resilient food strategies. It pairs naturally with a rural base and hunting.',
      fastestXP: 'Forage actively in varied terrain. The skill rises with searches, and higher levels reveal rarer and more valuable finds. Outdoorsman and Lucky both improve the experience.',
      bestBooks: 'Foraging and herbalist-style books raise yields and unlock the ability to identify more categories of finds.',
      vhsPriority: 'Nature and survival VHS content can supplement foraging-related knowledge.',
      commonMistakes: 'Ignoring foraging entirely and over-relying on looted food; foraging in dangerous wilderness without checking for zombies first.',
      build42Changes: 'Build 42 significantly expands wilderness survival; foraging and its interactions with hunting are worth re-learning in the current build.',
      pairings: ['cooking', 'farming']
    },
    {
      id: 'first-aid', name: 'First Aid',
      overview: 'First Aid governs treating wounds — cleaning, bandaging, stitching and speeding recovery.',
      whyItMatters: 'First Aid does not cure the Knox infection, but it manages everything else: bleeding, deep wounds, fractures and infection of ordinary wounds. Good First Aid keeps a survivable injury from snowballing.',
      fastestXP: 'The skill rises through actually treating injuries, which is hard to farm safely. Skill books multiply what XP you do earn, so read them early.',
      bestBooks: 'First Aid skill books raise the XP multiplier and improve treatment effectiveness.',
      vhsPriority: 'Medical VHS content is rare; books are the reliable route.',
      commonMistakes: 'Expecting First Aid to cure zombie infection — it cannot; leaving wounds dirty and letting an ordinary wound become infected; not keeping bandages and disinfectant stocked.',
      build42Changes: 'Health and injury systems are periodically tuned; verify treatment behaviour in your build.',
      pairings: ['foraging']
    }
  ],

  /* ---------------------------------------------------------- */
  /*                          WEAPONS                           */
  /* ---------------------------------------------------------- */
  weapons: [
    {
      id: 'crowbar', name: 'Crowbar', weaponType: 'melee', class: 'Blunt',
      tone: 'The Crowbar is less flashy than the Axe, but it survives long enough to become your retirement plan.',
      overview: 'A long, durable blunt weapon and the textbook choice for long-term survival. It trades burst damage for reliability you can count on for months.',
      durability: 'Exceptional. The Crowbar lasts far longer than most melee weapons and rarely breaks mid-fight — the single biggest reason veterans favour it.',
      damage: 'Moderate. It will not delete zombies the way an axe does, but it kills consistently and knocks targets down reliably.',
      noise: 'Low. As a melee weapon it draws no extra attention beyond the fight itself.',
      endurance: 'Efficient. It does not drain stamina as aggressively as heavy weapons, so you fight longer before exhaustion.',
      multiTarget: 'Decent. With multi-hit enabled it handles small clusters acceptably, though it is not a dedicated crowd-clearer.',
      repairability: 'Rarely an issue — it lasts so long that repair almost never comes up. It is also extremely common loot.',
      skillSynergies: ['strength', 'fitness'],
      bestSituations: 'Long-term survival, sustained fighting, players who want one weapon they never have to think about replacing.',
      worstSituations: 'Moments that demand burst damage to drop a threat instantly — an axe or blade does that job better.'
    },
    {
      id: 'axe', name: 'Axe', weaponType: 'melee', class: 'Axe',
      tone: 'Axes are incredible until exhaustion turns your character into a walking corpse.',
      overview: 'The premier high-damage melee weapon. An axe drops zombies in very few hits — but every swing costs real endurance.',
      durability: 'Good, though not Crowbar-tier. It will need repair or replacement over a long run.',
      damage: 'Excellent — among the best melee damage available. It frequently one-shots or two-shots ordinary zombies.',
      noise: 'Low as a melee weapon; the fights it ends quickly are quieter than drawn-out brawls with a weaker weapon.',
      endurance: 'Heavy. Axe swings drain stamina fast, and a tired survivor with an axe is in real danger.',
      multiTarget: 'Strong burst on single targets; with multi-hit it clears clusters fast, but the endurance cost compounds.',
      repairability: 'Repairable, and the related occupations (Fire Officer, Lumberjack) make it even more effective.',
      skillSynergies: ['strength', 'fitness'],
      bestSituations: 'Clearing fights quickly, dangerous single targets, players with high Fitness to pay the endurance bill.',
      worstSituations: 'Long grinding fights on low endurance — that is where the axe gets you killed.'
    },
    {
      id: 'spear', name: 'Spear', weaponType: 'melee', class: 'Spear',
      tone: 'Spears are terrifyingly efficient once you understand spacing. They are also one of the easiest ways to get overconfident and die.',
      overview: 'A reach weapon capable of instant-kill attacks on properly positioned zombies. High skill ceiling, high reward.',
      durability: 'Poor to moderate — many spears, especially crafted ones, break quickly. Carry spares.',
      damage: 'Very high, with access to instant-kill attacks when a zombie is lined up correctly.',
      noise: 'Low as a melee weapon.',
      endurance: 'Reasonable for the damage output, though spamming attacks still tires you.',
      multiTarget: 'Weak. The spear is a precise single-target tool, not a crowd weapon.',
      repairability: 'Limited; the fragility is the trade-off for the kill power. Treat spears as semi-disposable.',
      skillSynergies: ['strength', 'fitness'],
      bestSituations: 'Controlled fights with room to space zombies out; experienced players who respect the weapon.',
      worstSituations: 'Tight crowds and panic situations — the spacing requirement collapses and so does the spear.'
    },
    {
      id: 'baseball-bat', name: 'Baseball Bat', weaponType: 'melee', class: 'Blunt',
      tone: 'The Baseball Bat is the crowd-pleaser — strong knockback, satisfying swings, and easy to find.',
      overview: 'A long blunt weapon with excellent knockback. It does not kill especially fast, but it controls space superbly.',
      durability: 'Moderate. It will wear down over time but is common enough that replacement is easy.',
      damage: 'Moderate. Its strength is control, not raw killing speed.',
      noise: 'Low as a melee weapon.',
      endurance: 'Reasonable — lighter on stamina than an axe, heavier than a short weapon.',
      multiTarget: 'Good. Strong knockback plus multi-hit makes it effective at keeping a small group off you.',
      repairability: 'Easy to simply replace given how common bats are.',
      skillSynergies: ['strength', 'fitness'],
      bestSituations: 'Crowd control, creating space, beginners who value knockback safety over kill speed.',
      worstSituations: 'When you specifically need a target dead immediately — the bat keeps zombies down, not dead.'
    },
    {
      id: 'hand-axe', name: 'Hand Axe', weaponType: 'melee', class: 'Axe',
      tone: 'The Hand Axe is the axe you can actually afford to swing all day.',
      overview: 'A short axe that delivers strong damage at a far lower endurance cost than a full-size axe.',
      durability: 'Good. It holds up well and is a dependable mid-term weapon.',
      damage: 'High for its weight class — not full-axe burst, but well above most short weapons.',
      noise: 'Low as a melee weapon.',
      endurance: 'Efficient. This is the headline feature — strong damage without the exhaustion tax of a long axe.',
      multiTarget: 'Modest. It is a single-target tool that happens to be very stamina-friendly.',
      repairability: 'Repairable and reasonably common.',
      skillSynergies: ['strength', 'fitness'],
      bestSituations: 'Players who want axe-class damage without exhaustion deaths; sustained day-to-day clearing.',
      worstSituations: 'Large crowds where reach and knockback matter more than per-hit damage.'
    },
    {
      id: 'machete', name: 'Machete', weaponType: 'melee', class: 'Blade',
      tone: 'The Machete is the all-rounder veterans reach for when they want one weapon that does everything well.',
      overview: 'A long blade with strong damage, good durability and solid handling — one of the best-balanced melee weapons in the game.',
      durability: 'Good. Better than most blades and dependable across a long run.',
      damage: 'High. It kills quickly without the extreme endurance cost of an axe.',
      noise: 'Low as a melee weapon.',
      endurance: 'Efficient relative to its damage — a key reason it is so highly rated.',
      multiTarget: 'Good with multi-hit; the long blade handles small groups capably.',
      repairability: 'Repairable, though machetes are rarer loot than crowbars or bats.',
      skillSynergies: ['strength', 'fitness'],
      bestSituations: 'Players who want a single reliable weapon for nearly every situation.',
      worstSituations: 'There are few — its main weakness is simply that it is harder to find than common weapons.'
    },
    {
      id: 'hunting-knife', name: 'Hunting Knife', weaponType: 'melee', class: 'Blade',
      tone: 'The Hunting Knife is a finisher, not a fighter — devastating from stealth, fragile in a brawl.',
      overview: 'A short blade with powerful instant-kill potential against unaware or downed zombies.',
      durability: 'Poor. Knives break quickly under sustained use — carry several.',
      damage: 'Low in a stand-up fight; extremely high as a stealth or finishing attack.',
      noise: 'Low as a melee weapon.',
      endurance: 'Very efficient — light and quick to swing.',
      multiTarget: 'Effectively none. This is a strict single-target tool.',
      repairability: 'Poor; treat hunting knives as consumables and keep spares.',
      skillSynergies: ['strength'],
      bestSituations: 'Stealth kills, finishing downed zombies, conserving endurance on isolated targets.',
      worstSituations: 'Open fights against multiple standing zombies — the knife will break and leave you exposed.'
    },
    {
      id: 'pistol', name: 'Pistol', weaponType: 'ranged', class: 'Firearm',
      tone: 'The Pistol is an emergency tool. Treat it like one and it saves runs; treat it like a primary weapon and it ends them.',
      overview: 'A common handgun — manageable recoil, moderate ammo availability, and the most beginner-accessible firearm.',
      durability: 'Good as a mechanism; the real limit is ammunition, not the gun.',
      damage: 'Solid per hit, but accuracy at low Aiming is poor — early shots miss often.',
      noise: 'Very high. A gunshot is one of the loudest things you can do and pulls every zombie in earshot.',
      endurance: 'Minimal physical cost, but the noise cost is enormous.',
      multiTarget: 'Single-target per shot; useful against a line of zombies only if you can manage the horde the noise summons.',
      repairability: 'The firearm itself is durable; ammunition is the finite, irreplaceable resource.',
      skillSynergies: ['aiming'],
      bestSituations: 'Emergencies — a base breach, a rescue, a threat melee cannot safely handle.',
      worstSituations: 'Routine clearing. Every shot spends finite ammo and advertises your position for free.'
    },
    {
      id: 'shotgun', name: 'Shotgun', weaponType: 'ranged', class: 'Firearm',
      tone: 'The Shotgun is the loudest decision in the game — it clears a room and announces it to the whole map.',
      overview: 'A devastating short-range firearm that can drop multiple zombies per shot and is forgiving of low Aiming.',
      durability: 'Durable mechanically; ammunition is the constraint.',
      damage: 'Extremely high at close range, with the spread hitting multiple targets at once.',
      noise: 'The highest in the game. A shotgun blast can pull zombies from a vast radius.',
      endurance: 'Low physical cost; catastrophic noise cost.',
      multiTarget: 'Excellent — the spread is genuine crowd-clearing power.',
      repairability: 'The weapon lasts; shells are scarce and precious.',
      skillSynergies: ['aiming', 'strength'],
      bestSituations: 'Last-ditch defence of a base, breaking out of a surround when you have already accepted the noise.',
      worstSituations: 'Anywhere you do not want a horde. The shotgun does not solve a zombie problem so much as relocate the entire county to you.'
    },
    {
      id: 'hunting-rifle', name: 'Hunting Rifle', weaponType: 'ranged', class: 'Firearm',
      tone: 'The Hunting Rifle reaches out and ends threats — and Build 42 finally gives it a job beyond zombies.',
      overview: 'A high-damage long-range firearm. With Build 42 hunting systems it doubles as a genuine food-gathering tool.',
      durability: 'Durable mechanically; ammunition is rare and worth hoarding.',
      damage: 'Very high per shot, with the range to engage threats long before they reach you.',
      noise: 'Very high — a rifle shot travels far and draws a wide response.',
      endurance: 'Low physical cost; high noise cost.',
      multiTarget: 'Single-target precision; not a crowd tool.',
      repairability: 'The rifle lasts; rifle ammunition is among the scarcer firearm resources.',
      skillSynergies: ['aiming'],
      bestSituations: 'Long-range threats, defending open ground, and — in Build 42 — hunting animals for meat.',
      worstSituations: 'Close quarters and crowds, where the noise and slow handling work against you.'
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       MAPS & LOCATIONS                     */
  /* ---------------------------------------------------------- */
  maps: [
    {
      id: 'rosewood', name: 'Rosewood', dangerRating: 'Low', beginnerViable: true, lootQuality: 'Good',
      tone: 'Rosewood is where most survivors should start, and there is no shame in that.',
      sections: [
        { h: 'Why Beginners Start Here', body: '<p>Rosewood is a small, low-density town surrounded by forest. Fewer zombies means more room to learn combat, manage noise and recover from mistakes. It is forgiving in exactly the ways a new survivor needs.</p>' },
        { h: 'Police Station Loot', body: '<p>The Rosewood police station is a well-known firearm and ammunition source. It is guarded by zombies and should not be your Day One target — but it is a realistic Week One or Week Two goal once you have a weapon and an escape plan.</p>' },
        { h: 'Fire Station Loot', body: '<p>The fire station offers useful tools, axes and protective clothing. Like the police station, treat it as a planned objective rather than an impulse raid.</p>' },
        { h: 'Safe Base Locations', body: '<p>The edges of Rosewood, where houses back onto forest, make excellent starter bases — low zombie traffic, quick access to wilderness, and natural escape routes. A fenced-yard house on the town periphery is close to ideal.</p>' },
        { h: 'Nearby Warehouses', body: '<p>Industrial and storage buildings near Rosewood hold construction materials and bulk supplies. Reaching them comfortably is a strong argument for securing a car early.</p>' }
      ]
    },
    {
      id: 'muldraugh', name: 'Muldraugh', dangerRating: 'Moderate', beginnerViable: true, lootQuality: 'Strong',
      tone: 'Muldraugh is the classic survival proving ground — strung along a highway, generous with loot, unforgiving of laziness.',
      sections: [
        { h: 'Town Layout', body: '<p>Muldraugh stretches along a main road, which means loot is plentiful but so is exposure. Buildings cluster near the highway, and the road itself funnels both you and the zombies.</p>' },
        { h: 'Loot Quality', body: '<p>Muldraugh is rich in warehouses, stores and industrial sites. The famous large warehouse is a serious supply haul — and a serious zombie commitment. Plan the approach and the exit before you go.</p>' },
        { h: 'Base Locations', body: '<p>Side streets set back from the highway offer quieter base options. The trade-off is constant: proximity to loot versus proximity to zombie density. Pick the quiet street and drive to the loot.</p>' },
        { h: 'Beginner Viability', body: '<p>Muldraugh is survivable for newer players who stay disciplined, but it punishes over-looting and noise harder than Rosewood does. Treat it as the step up after a Rosewood run, not a first attempt.</p>' }
      ]
    },
    {
      id: 'west-point', name: 'West Point', dangerRating: 'High', beginnerViable: false, lootQuality: 'Excellent',
      tone: 'West Point is loot heaven and a beginner graveyard in the same breath.',
      sections: [
        { h: 'The Density Problem', body: '<p>West Point packs an enormous amount of high-value loot into a dense town centre — and a correspondingly enormous number of zombies. The reward is real; so is the risk.</p>' },
        { h: 'Loot Quality', body: '<p>Grocery stores, gun shops, restaurants and dense housing make West Point one of the best-stocked towns in Knox County. A successful run here sets a base up for a long time.</p>' },
        { h: 'How To Approach It', body: '<p>Veterans treat West Point as a series of surgical raids: park on the outskirts, clear one building, leave before the noise compounds. Trying to "clear" West Point as a beginner is how promising runs end.</p>' },
        { h: 'Base Locations', body: '<p>The outskirts and the residential fringe offer the only sane base options. Living in the dense centre means living inside the problem.</p>' }
      ]
    },
    {
      id: 'riverside', name: 'Riverside', dangerRating: 'Low', beginnerViable: true, lootQuality: 'Moderate',
      tone: 'Riverside is the quiet, water-adjacent town that rewards survivors who think in months, not days.',
      sections: [
        { h: 'Why It Is Underrated', body: '<p>Riverside is small and relatively calm, which makes it a strong, low-pressure start similar to Rosewood. Its standout feature is right there in the name — immediate access to the river.</p>' },
        { h: 'Water Access', body: '<p>A base near the river solves the water-shutoff problem before it begins and supports fishing as a long-term food source. For a self-sufficient run, that location advantage is hard to overstate.</p>' },
        { h: 'Loot And Layout', body: '<p>Riverside has fewer dense commercial buildings than the bigger towns, so it favours survivors who farm, fish and forage over those who plan to loot their way through. Pair it with nearby travel for harder-to-find supplies.</p>' },
        { h: 'Base Locations', body: '<p>Riverside houses backing onto the water or onto forest make excellent long-term bases — quiet, defensible and resource-adjacent.</p>' }
      ]
    },
    {
      id: 'louisville', name: 'Louisville', dangerRating: 'Extreme', beginnerViable: false, lootQuality: 'Unmatched',
      tone: 'Louisville is where overconfidence goes to die.',
      sections: [
        { h: 'Danger Rating', body: '<p>Louisville is the largest city in the game and by far the most dangerous. Zombie density is extreme, sightlines are short, and the sheer scale means a fight that goes wrong has nowhere to go. It is endgame content, not a destination.</p>' },
        { h: 'Loot Quality', body: '<p>The reward matches the risk: Louisville holds the densest, highest-value loot in Knox County — malls, gun stores, countless commercial buildings. A well-run Louisville raid can supply a base for a very long time.</p>' },
        { h: 'Best Neighbourhoods', body: '<p>The city outskirts and suburban fringe are the only realistic entry points. Survivors stage from the edges, raid inward in small bites, and never let themselves get pulled deep into the urban core.</p>' },
        { h: 'Gun Store And Hospital Locations', body: '<p>Louisville gun stores are premier firearm hauls and premier death traps — high zombie density guards every one. The hospitals hold valuable medical supplies under the same condition. Both demand a plan, a car and a clear exit.</p>' },
        { h: 'Escape Routes', body: '<p>Never enter Louisville without a mapped way out. The bridges and main arteries are chokepoints that can fill with zombies; identify your exit before you commit, and leave the moment a raid stops going to plan.</p>' },
        { h: 'Beginner Viability', body: '<p>None. Louisville should be attempted only by survivors with strong skills, good equipment, a reliable vehicle and the discipline to retreat. It is the final exam of Knox County.</p>' }
      ]
    },
    {
      id: 'best-base-locations', name: 'Best Base Locations', dangerRating: 'Varies', beginnerViable: true, lootQuality: 'Varies',
      tone: 'A great base is not the prettiest house — it is the one with water, fuel, fences and a way out.',
      sections: [
        { h: 'What Actually Makes A Base Good', body: '<p>Forget aesthetics. A long-term base needs four things: a water source, nearby fuel, defensibility, and escape routes. Survivors who choose a base for its looks rather than its logistics tend to relocate in a panic later.</p>' },
        { h: 'Riverside Houses', body: '<p>A house on or near a river solves water permanently and enables fishing. Water access is the single most valuable base feature for a run that intends to last, which is why riverside property is so prized.</p>' },
        { h: 'Warehouses', body: '<p>Warehouses offer huge interior space, few windows and strong walls. They are excellent fortress bases — but they are loud locations to reach and often sit in zombie-dense areas. Clear thoroughly before moving in.</p>' },
        { h: 'Gas Stations', body: '<p>Basing at or near a gas station puts fuel — for vehicles and generators — directly under your control. The trade-off is that gas stations sit on busy roads with steady zombie traffic.</p>' },
        { h: 'Fenced Compounds', body: '<p>Properties with existing fencing give you a defensive perimeter for free. A fenced yard turns a house into a base and is one of the most beginner-friendly features to look for.</p>' },
        { h: 'Remote Cabins', body: '<p>Forest cabins are the safest possible bases — minimal zombie traffic, total privacy. The cost is isolation: loot runs are long, and you must be genuinely self-sufficient through farming, foraging and hunting to make a remote cabin work.</p>' }
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       BUILD 42 HUB                         */
  /* ---------------------------------------------------------- */
  build42: [
    {
      id: 'build-42-overview', name: 'Build 42 Overview',
      intro: 'Build 42 is the largest update in Project Zomboid history — close to a small expansion. It reframes the game around long-term survival depth rather than short, combat-driven runs.',
      sections: [
        { h: 'Crafting Overhaul', body: '<p>Build 42 rebuilds crafting from the ground up, adding far more depth and many new recipes and material chains. Self-sufficiency — making what you need instead of looting it — becomes a central pillar of survival rather than a side activity.</p>' },
        { h: 'Animals', body: '<p>Animals arrive as a major new system. Wildlife and the option of raising livestock add a renewable food and resource layer that did not exist before, and reshape what a sustainable base looks like.</p>' },
        { h: 'Hunting', body: '<p>With animals comes hunting — tracking, trapping and shooting wildlife for meat. It is a genuine alternative food strategy, especially valuable in winter when farming stalls.</p>' },
        { h: 'Lighting Changes', body: '<p>Build 42 overhauls lighting. Nights and dark interiors are handled more realistically, which raises the value of light sources and of night-vision traits like Cat’s Eyes.</p>' },
        { h: 'Animation Updates', body: '<p>New and improved animation systems make movement and combat read more clearly and feel more grounded.</p>' },
        { h: 'Wilderness Systems', body: '<p>Expanded wilderness survival mechanics make living off the land — foraging, hunting, basic processing — a complete and viable playstyle rather than a fallback.</p>' },
        { h: 'Multiplayer Changes', body: '<p>Build 42’s multiplayer arrives after the initial single-player release. Official communications also emphasise improved UI support and official mod management as part of the update’s scope.</p>' }
      ]
    },
    {
      id: 'animals-hunting', name: 'Animals & Hunting',
      intro: 'The animal system is the headline feature of Build 42, turning the wilderness into a renewable pantry for survivors who learn to read it.',
      sections: [
        { h: 'Hunting Basics', body: '<p>Hunting means locating wildlife, closing the distance without spooking it, and killing it cleanly for meat and materials. A rifle reaches out at range; traps work while you do other things. Either way, hunting is a real, repeatable food source.</p>' },
        { h: 'Tracking', body: '<p>Animals leave signs. Learning to read tracks and movement turns aimless wandering into a directed hunt — the difference between hoping to find food and going to get it.</p>' },
        { h: 'Traps', body: '<p>Traps catch small game passively. They are low-effort, low-risk food that keeps producing while you build, farm or sleep — an ideal complement to active hunting.</p>' },
        { h: 'Meat Preservation', body: '<p>Fresh meat spoils. Preserving it — through curing, smoking or freezing on a generator-backed freezer — is what converts a successful hunt into a winter food reserve instead of a meal that rots.</p>' },
        { h: 'Danger Levels', body: '<p>Not all wildlife is harmless. Some animals can hurt you, and the wilderness still hides zombies. Treat a hunt as a trip into dangerous ground: stay aware, and do not tunnel-vision on the prey.</p>' }
      ]
    },
    {
      id: 'blacksmithing', name: 'Blacksmithing Guide',
      intro: 'Blacksmithing is one of Build 42’s flagship new crafting paths — the route to forging your own tools and weapons when looting is no longer an option.',
      sections: [
        { h: 'Forge Setup', body: '<p>Blacksmithing begins with a working forge and the right station equipment. Establishing that setup is an investment, but it unlocks genuine independence from looted metal tools.</p>' },
        { h: 'Material Gathering', body: '<p>Forging consumes metal, fuel for the forge, and time. A blacksmithing operation needs a steady materials pipeline — scrap metal, fuel — feeding it, so plan the supply chain alongside the forge itself.</p>' },
        { h: 'Crafting Priorities', body: '<p>Early on, prioritise forging tools and durable melee weapons that directly extend your survival. Decorative or marginal items can wait until the core toolkit is secure.</p>' },
        { h: 'Repair Economy', body: '<p>The deeper value of blacksmithing is repair and renewal. A survivor who can forge and refurbish metal gear is no longer on a countdown timer toward broken tools — the run becomes genuinely self-sustaining.</p>' }
      ]
    },
    {
      id: 'crafting-overhaul', name: 'Crafting Overhaul',
      intro: 'Build 42’s crafting overhaul is the connective tissue of the whole update — the system that ties wilderness, animals, blacksmithing and base-building into one self-sufficiency loop.',
      sections: [
        { h: 'What Changed', body: '<p>Crafting is dramatically deeper and broader. There are more recipes, more material chains, and far more that you can produce yourself rather than scavenge. The intended arc of a run shifts from "loot until it runs out" to "build something that does not run out."</p>' },
        { h: 'Why It Matters For Survival', body: '<p>Old runs ended when supplies dried up. The overhaul makes long-term self-sufficiency a real, reachable goal — crafted food, tools, materials and repairs replace a dependence on finite loot.</p>' },
        { h: 'Learning The New System', body: '<p>Because the overhaul is so extensive, older guides and old muscle memory will mislead you. Treat crafting as something to relearn in the current build — check recipes, stations and material requirements in-game rather than assuming.</p>' }
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                          VEHICLES                          */
  /* ---------------------------------------------------------- */
  vehicles: [
    {
      id: 'how-to-hotwire-cars', name: 'How To Hotwire Cars',
      intro: 'A working car changes the entire game — and hotwiring is how you get one without keys. Knowing the requirements turns "I found a car" into "I have transport."',
      sections: [
        { h: 'Requirements', body: '<p>Hotwiring a car needs either the Burglar occupation, or investment in both Mechanical and Electrical skill. Without one of those, the car you found is just scenery. The vehicle also needs a healthy enough engine and some fuel to be worth the effort.</p>' },
        { h: 'The Burglar Advantage', body: '<p>The Burglar occupation can hotwire any vehicle from the very start of a run, with no skill investment at all. That is why Burglar is so strongly associated with mobility-focused and beginner play — it removes the entire skill tax on transport.</p>' },
        { h: 'Skill Requirements', body: '<p>For non-Burglars, hotwiring becomes possible with sufficient combined Mechanical and Electrical skill. Until you reach that threshold, prioritise finding car keys — they spawn on corpses, in nearby houses and in the car itself.</p>' },
        { h: 'Fuel Management', body: '<p>A hotwired car with an empty tank is a dead end. Learn to siphon fuel from other vehicles and from pumps while power lasts, and keep spare fuel cans. Fuel planning is a survival skill in its own right.</p>' },
        { h: 'Dashboard Indicators', body: '<p>Before committing to a vehicle, check the dashboard: engine condition, fuel level and battery charge. A car that will not hold a charge or has a wrecked engine is not worth the noise of trying to start it.</p>' },
        { h: 'Avoiding Noisy Mistakes', body: '<p>Engines are loud, and a failed or repeated start attempt draws zombies. Pick your vehicle deliberately, attempt the start when the area is clear, and be ready to either drive off immediately or abandon the attempt.</p>' }
      ]
    },
    {
      id: 'best-vehicles', name: 'Best Vehicles',
      intro: 'There is no single "best" car — there is the best car for the job. Rank vehicles by what your run actually needs.',
      sections: [
        { h: 'Cargo', body: '<p>Large vans and heavy vehicles carry the most. For base relocation, bulk looting and hauling construction materials, cargo capacity beats every other stat. A survivor who moves a lot of supplies should prize a big trunk over a fast engine.</p>' },
        { h: 'Speed', body: '<p>Sports and lighter cars accelerate and travel faster, which is excellent for outrunning trouble and covering distance. The trade-off is small storage and often worse durability — speed is an escape tool, not a hauler.</p>' },
        { h: 'Durability', body: '<p>Heavier vehicles shrug off zombie impacts and minor collisions better. A durable car can push through a thin crowd; a fragile one stalls and traps you. For survival, durability often matters more than raw speed.</p>' },
        { h: 'Fuel Efficiency', body: '<p>Fuel is finite once the pumps stop. An efficient vehicle stretches every can further, which matters enormously on long runs and far-flung loot trips. A thirsty car can become a liability the day fuel gets scarce.</p>' },
        { h: 'Off-Road Viability', body: '<p>Some vehicles handle rough terrain and forest tracks better than others. For rural bases and wilderness-leaning Build 42 playstyles, an off-road-capable vehicle reaches places a road car cannot.</p>' },
        { h: 'The Practical Answer', body: '<p>Most long-term survivors settle on a sturdy, roomy vehicle with a healthy engine — durability and cargo over flash. The "best" vehicle is the reliable one you can keep fuelled and repaired, not the fastest one you found.</p>' }
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                            MODS                            */
  /* ---------------------------------------------------------- */
  mods: [
    {
      id: 'best-essential-mods', name: 'Best Essential Mods',
      intro: 'Project Zomboid has an enormous, long-lived modding community. These are the categories and well-known mods survivors most often reach for. Always confirm a mod supports your current build before installing — Build 42 broke compatibility for many older mods.',
      sections: [
        { h: 'A Note On Compatibility', body: '<p>Mods are community-made and version-sensitive. A mod built for an older build may not work, or may behave unpredictably, on Build 42. Check the mod page, read recent comments, and back up your save before adding mods to an existing run.</p>' }
      ],
      modList: [
        { name: "Brita's Weapons", why: 'A massive expansion of firearms and melee weapons, hugely popular with players who want a far deeper combat arsenal.' },
        { name: 'Common Sense', why: 'Adds intuitive interactions the base game lacks — sensible little "why can’t I just do that?" actions that make the world feel more logical.' },
        { name: 'Authentic Z', why: 'Expands clothing, cosmetics and character customisation for far more visual variety.' },
        { name: 'True Actions', why: 'Adds immersive actions and animations such as sitting and lying down, deepening roleplay and base life.' },
        { name: "Filibuster Rhymes' Used Cars", why: 'Greatly expands the variety of vehicles spawning in the world, making car hunting more interesting.' }
      ]
    },
    {
      id: 'best-multiplayer-mods', name: 'Best Multiplayer Mods',
      intro: 'Multiplayer servers live and die on their mod lists. The right mods smooth the experience, protect players from griefers and keep performance stable as a server grows.',
      sections: [
        { h: 'Quality-Of-Life Mods', body: '<p>QoL mods reduce friction — better inventory handling, clearer UI, smoother interactions. On a server where many people share a world, these small improvements add up to a much less frustrating experience for everyone.</p>' },
        { h: 'Anti-Grief Mods', body: '<p>Anti-grief mods add base protection, claim systems and safe zones so players cannot trivially destroy each other’s work. For any server that wants a stable community, this category is close to mandatory.</p>' },
        { h: 'Server Optimisation', body: '<p>Performance and optimisation mods help a server stay stable as player count and built structures grow. A laggy server loses players fast, so admins prioritise this category heavily.</p>' },
        { h: 'Immersion Mods', body: '<p>Immersion mods — expanded interactions, roleplay tools, world detail — give a community shared things to do beyond raw survival. They are what turn a server into a place people return to.</p>' },
        { h: 'Keep The List Lean', body: '<p>Every mod is a potential compatibility and performance cost. Successful servers curate a focused, tested mod list rather than stacking everything available. More mods is not better; the right mods is better.</p>' }
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                         MULTIPLAYER                        */
  /* ---------------------------------------------------------- */
  multiplayer: [
    {
      id: 'best-server-settings', name: 'Best Server Settings',
      intro: 'Server settings define the entire feel of a multiplayer world. There is no universally "best" configuration — only the right one for the community you want.',
      sections: [
        { h: 'Beginner-Friendly Settings', body: '<p>For a welcoming server, lower zombie population, enable multi-hit, ease infection rules toward bite-only, and keep loot reasonably generous. The goal is a world where new players can learn without a single mistake ending their run.</p>' },
        { h: 'Hardcore Settings', body: '<p>For a survival-focused community, raise zombie population, tighten infection, reduce loot abundance and consider sprinter or tougher zombie options. Hardcore servers attract players who want every decision to carry weight.</p>' },
        { h: 'Loot Balance', body: '<p>Loot rarity is one of the most impactful settings. Too generous and the game has no tension; too scarce and new players bounce off. Most healthy servers sit slightly below default abundance and tune from there based on feedback.</p>' },
        { h: 'Respawn Settings', body: '<p>Zombie respawn rate decides whether cleared areas stay clear. Disabling or heavily reducing respawns rewards methodical clearing; leaving it on keeps the world permanently dangerous. Match this to your community’s appetite.</p>' },
        { h: 'PvP Balance', body: '<p>Decide early and clearly whether the server is PvP, PvE or zoned. Safe zones, base protection and clear rules prevent the player conflict that quietly kills server populations. Ambiguity here is what causes the worst drama.</p>' }
      ]
    },
    {
      id: 'multiplayer-etiquette', name: 'Multiplayer Etiquette',
      intro: 'Most multiplayer servers do not collapse because of zombies. They collapse because of how players treat each other.',
      sections: [
        { h: 'Base Trust', body: '<p>Entering another player’s base uninvited — even just to look — destroys trust fast. Respect claimed territory, ask before visiting, and never treat someone’s base as a free loot source. Trust is the rarest resource on any server.</p>' },
        { h: 'Vehicle Ownership', body: '<p>A car someone has fuelled, repaired and parked is theirs. Taking it is theft, full stop, and it is one of the most common causes of server conflict. If transport is shared, agree the rules openly and in advance.</p>' },
        { h: 'Loot Etiquette', body: '<p>When looting alongside others, do not strip every container before teammates arrive. Share fairly, especially scarce medical supplies and ammunition. A reputation as a loot hog follows you across a whole server.</p>' },
        { h: 'Grief Prevention', body: '<p>Griefing — destroying bases, killing new players for no reason, hoarding to deny others — kills server populations. Good communities self-police it, support new players, and make clear that griefers are not welcome. Be the player others are glad to see online.</p>' }
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       SURVIVOR TIPS                        */
  /* ---------------------------------------------------------- */
  survivorTips: [
    'Walk, do not run. Exhaustion kills more survivors than zombies.',
    'Clear your escape route before looting any building.',
    'The helicopter event punishes players who settle too early and too loudly.',
    'A working car changes the entire game — make finding one an early priority.',
    'Fitness is harder to level than Strength, which is why Athletic is so valuable.',
    'Mechanics XP gets much easier once you understand repetitive part removal.',
    'Read skill books before grinding the skill, not after — the multiplier is the point.',
    'Burn through fresh and frozen food first; the power will not last.',
    'Fight along fences so zombies reach you one at a time.',
    'Do not trust a single queasy moodle. Stress feels a lot like infection.',
    'Fill every water container before the water shutoff arrives.',
    'A bored survivor makes reckless decisions. Keep books, a radio and a routine.'
  ],

  /* ---------------------------------------------------------- */
  /*                  BUILD NEWS / PATCH NOTES                  */
  /* ---------------------------------------------------------- */
  patches: [
    {
      version: 'Build 42 — Unstable',
      date: '2024-12-17',
      changes: [
        'Build 42 entered unstable/beta release, beginning the largest content update in the game’s history.',
        'Crafting overhaul: dramatically expanded recipes, material chains and self-sufficiency systems.',
        'Animals added as a major new system, including wildlife and the foundations of animal husbandry.',
        'New wilderness survival depth: hunting, expanded foraging and living off the land.',
        'Blacksmithing and other deep crafting professions introduced.',
        'Overhauled lighting and improved animation systems.',
        'Multiplayer to follow the initial single-player release in a later phase.'
      ]
    },
    {
      version: 'Build 42 — Roadmap Note',
      date: '2025-02-01',
      changes: [
        'Official communications emphasise improved UI support and official mod management as part of Build 42.',
        'Community discussion centres on long-term survival depth: crafting overhaul, animals and wilderness systems.',
        'Players are advised that many older mods need updating for Build 42 compatibility.',
        'Balance and systems are still in flux during the unstable period — verify numbers against your current build.'
      ]
    }
  ],

  /* ---------------------------------------------------------- */
  /*                       STATIC PAGES                         */
  /* ---------------------------------------------------------- */
  pages: {
    'getting-started': {
      title: 'Getting Started',
      body: `
        <p>Project Zomboid is a survival game with one famous tagline: <em>this is how you died</em>. It is not a game you win. It is a game you survive, for as long as your discipline holds out. This wiki is built around that reality.</p>
        <h3>The survival mindset</h3>
        <p>Most beginner deaths are not bad luck. They are predictable consequences of moving too fast, fighting in bad positions, or staying somewhere too long. The survivors who last are not the bravest — they are the most patient.</p>
        <h3>Your first hour</h3>
        <ol>
          <li>Find a melee weapon. Anything beats bare hands.</li>
          <li>Grab a bag and a water container.</li>
          <li>Locate a quiet house with two exits to use as a temporary base.</li>
          <li>Learn the shove-and-stomp combat rhythm on isolated zombies.</li>
          <li>Note which direction zombie density increases — and avoid it.</li>
        </ol>
        <div class="callout">The goal of your first day is not progress. It is to still be alive, calm, and informed when night falls.</div>
        <h3>Where to read next</h3>
        <p>Start with the <a href="/guides/first-day-survival">First Day Survival Guide</a>, then <a href="/guides/how-infection-works">How Infection Actually Works</a>, then <a href="/guides/first-week">How To Survive The First Week</a>. After that, the <a href="/traits">Traits</a> and <a href="/occupations">Occupations</a> sections will help you build a stronger survivor next time.</p>
      `
    },
  },

  /* ---------------------------------------------------------- */
  /*                          SOURCES                           */
  /* ---------------------------------------------------------- */
  sources: [
    { name: 'Project Zomboid Official Site', url: 'https://projectzomboid.com/', note: 'Official Build 42 announcements and feature information.' },
    { name: 'The Indie Stone — Official Blog', url: 'https://projectzomboid.com/blog/', note: 'Developer updates, roadmap and Build 42 development notes.' },
    { name: 'Project Zomboid Wiki (community)', url: 'https://pzwiki.net/wiki/Main_Page', note: 'Community reference for traits, skills, weapons and map data.' },
    { name: 'r/projectzomboid', url: 'https://www.reddit.com/r/projectzomboid/', note: 'Community survival advice, beginner discussion and strategy threads.' }
  ]
};
