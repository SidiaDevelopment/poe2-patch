/* ============================================================
   Patch 0.5.0 — structured data
   Source: https://www.pathofexile.com/forum/view-thread/3932540
   Date: 22 May 2026
   ============================================================ */

// Helper for poe2db links and icon URLs.
// Skill icon pattern: cdn.poe2db.tw/image/Art/2DArt/SkillIcons/<Name>.webp
// Skill page pattern: poe2db.tw/us/<Name with underscores>

window.PATCH_DATA = {

  // ---------- HERO STATS ----------
  heroStats: [
    { num: "42",   label: "New Uniques" },
    { num: "30",   label: "New Maps" },
    { num: "2",    label: "New Ascendancies" },
    { num: "300+", label: "Atlas Tree Nodes" },
    { num: "160+", label: "New Runes" },
    { num: "40+",  label: "Ancient Modifiers" },
    { num: "45",   label: "Skill Changes" },
    { num: "27",   label: "Support Changes" },
    { num: "50",   label: "Passive Reworks" },
    { num: "30",   label: "Unique Reworks" },
    { num: "21",   label: "Kalguuran Skills" },
    { num: "8",    label: "Kalguuran Supports" },
    { num: "13",   label: "Alloy Currencies" },
    { num: "6",    label: "Pinnacle Bosses" },
    { num: "7",    label: "Leagues Touched" },
    { num: "3",    label: "Atlas Masters" },
  ],

  // ---------- LAUNCH COUNTDOWN ----------
  // Launch: 2026-05-29 at 1 PM PDT (UTC-7) → 20:00 UTC.
  launch: {
    iso: "2026-05-29T20:00:00Z",
    label: "Runes of Aldur launches",
    localHint: "29 May 2026 · 1:00 PM PDT",
  },

  // ---------- MAJOR CONTENT PILLARS ----------
  pillars: [
    {
      tag: "New League",
      name: "Runes of Aldur",
      body: "An economy league of Remnants and Runic Recipes. Each runeshape adds a wave of enemies; Verisium metal is the new currency. Adds a defensive layer — Runic Ward — that activates at 1 life.",
      image: "presskit-web/Farrow_RunesofAldur.jpg"
    },
    {
      tag: "Endgame Overhaul",
      name: "Origins of Divinity",
      body: "The Atlas now has fixed points of interest, deterministic Pinnacle Boss access, 30 new maps, and a Fortress where map completion grants Atlas Passive Tree points. The Atlas Tree has been expanded with 300+ nodes.",
      image: "presskit-web/Fortress_Atlas.jpg"
    },
    {
      tag: "New Ascendancies",
      name: "Martial Artist & Spirit Walker",
      body: "The Monk gains the Martial Artist (illusions & hand-to-hand). The Huntress gains the Spirit Walker (commands Stag, Owl and Bear spirits).",
      image: "presskit-web/MartialArtist_Illusions_2.jpg"
    },
    {
      tag: "New System",
      name: "Masters of the Atlas",
      body: "Three masters — Doryani, Hilda, Jado — each offer 12 nodes with 4 simultaneously selectable. All three can be allocated at once; selections change at will.",
      image: "presskit-web/Masters_Cinematic.jpg"
    },
    {
      tag: "Defensive Layer",
      name: "Runic Ward",
      body: "Kicks in at 1 life and absorbs damage independently of life regen. Armours below level 55 gain Runic Ward for free; higher-level armours trade some defences for it.",
      image: "presskit-web/Aldur_Rune.jpg"
    },
    {
      tag: "Pinnacle",
      name: "Arbiter of Divinity",
      body: "A new Pinnacle Boss accessed through the Fortress. Maps in the Fortress can be skipped by killing the Arbiter five times.",
      image: "presskit-web/Bodach-Cinematic.jpg"
    },
  ],

  // ---------- LEAGUE MECHANIC REVAMPS ----------
  leagues: [
    {
      name: "Runes of Aldur",
      tag: "New Challenge League",
      hub: "Ruins of Kingsmarch · with NPC Farrow",
      featured: true,
      isNew: true,
      image: "presskit-web/Aldur_SpiderCinematic.jpg",
      bullets: [
        "Each area contains a Remnant; craft an item via Runic Recipes — additional runeshapes add enemy waves.",
        "Remnants start with between 2 and 10 slots.",
        "Verisium metal: a new currency drop from Remnant-raised monsters.",
        "13 Alloy currencies · 3 Fluxes · 13 Ancient Runes · 13 Mythical early runes · 15 Meta-crafting runes · 60+ Unique-destruction runes · 15+ Runic Ward runes.",
        "21 Kalguuran Skills and 8 Kalguuran Supports added.",
        "Unique Verisium Runeforging (Act 3) upgrades base types of Uniques dropped below level 55.",
        "Expedition's existing Remnants are replaced by the Runes of Aldur Remnants.",
        "Endgame Story: Set out with Farrow to explore the Ocean — new islands, underground areas, Grand Expeditions.",
        "Medved, Vorana and Uhtred join Olroth as the four Faction Leaders.",
        "Defeating Olroth grants a key to a new Pinnacle Boss.",
        "First-ever PoE 2 Challenge League: Knight of Aldur Armour Set at 2/4/6/8 challenges; Totem decoration from challenge 1."
      ]
    },
    {
      name: "Delirium",
      tag: "Revamped",
      hub: "The Withered Willow",
      image: "presskit-web/Delirium_RavenTricksterCinematic.jpg",
      bullets: [
        "Delirium Atlas Passive Tree completely revamped.",
        "New progress bar shows depth into the fog; new Delirium Encounters on the bar.",
        "Map bosses are always 100% delirious. Direction shown by fog effect.",
        "Damage and life bonus to monsters from Delirium has been reduced.",
        "5 new Elite Delirium Monsters · new sub-area Loathsome Mire with 2 new amulet bases.",
        "Liquid Emotions craft additional mods on Jewels.",
        "Grand Mirrors can spawn after completing Delirium Mirrors and duplicate the map boss.",
        "New Atlas Mechanic — Trial of Madness: fog spreads from a chosen map; reaching 100% Deliriousness unlocks Simulacrum (now a 7-wave encounter). Up to 200%.",
        "Simulacrum completion grants a key to the new Delirium Pinnacle Boss.",
        "10 new Ancient Emotions · 3 Ancient Potent emotions."
      ]
    },
    {
      name: "Breach",
      tag: "Revamped",
      hub: "Monastery of the Keepers",
      image: "presskit-web/Breach_EshCinematic.jpg",
      bullets: [
        "Breach Atlas Passive Tree completely revamped.",
        "Progress bar shows time until the breach closes; reaching 100% begins a Stabilised Breach with a new boss: Vruun, Marshal of Xesht.",
        "Genesis Tree — new crafting system. Consumes Wombgifts & Hiveblood to craft Rings, Amulets, Belts and Currency.",
        "6 new ring · 4 new amulet · 4 new belt base types exclusive to the Genesis Tree.",
        "Catalysts no longer drop from monsters — only from the Genesis Tree. 12 new Catalysts add quality mods to Jewels.",
        "Breachstone Splinters now drop in Breaches; full stacks become a special wombgift.",
        "New Breach Domains spawn on the Atlas: Breach Hives (burnable walls add monsters), Sky Hives (multi-wave defence of Ailith), Sky Fortresses (bosses Tul & Esh).",
        "Defeating Tul & Esh grants a key to the existing Breach Pinnacle Boss."
      ]
    },
    {
      name: "Ritual",
      tag: "Revamped",
      hub: "Caer Tarth · Aoife the restless spirit",
      image: "presskit-web/Aoife_Ritual.jpg",
      bullets: [
        "Ritual Atlas Passive Tree completely revamped.",
        "After completing a Ritual Altar, locusts point the way to the next.",
        "Endgame Ritual rewards are now only Uniques or Omens.",
        "Unspent tribute can be sacrificed to gain an Audience with the King.",
        "Killing the King in the Mists drops a new key: The Head of the King.",
        "Rite of the Nameless — choose 5 maps; ritual monsters reappear in each; boss only in the final map. Each map after the first has extra modifiers.",
        "New boss: The Queen in the Mists, dropping 3 new corrupted Idols.",
        "Freythorn Rituals can no longer show deferred items."
      ]
    },
    {
      name: "Fate of the Vaal",
      tag: "Moved to Core",
      hub: "Lira Vaal · Atziri's Temple",
      image: "presskit-web/Vaal_Atziri_Cinematic1.jpg",
      bullets: [
        "Fate of the Vaal added to the core game with its own Atlas Passive Tree.",
        "Six Ancient Beacons in Act 3 (then six more in Interludes). Atziri's Temple now sits in the north-east of the Atlas.",
        "Temple rooms upgradable to Tier 4. Reward rooms significantly improved. Restricted rooms always destabilise on exit.",
        "Default Energised Crystal cap increased to 60. Medallion cap increased to 6.",
        "Four Infusers added: Armourer's, Blacksmith's, Arcanist's, Catalysing — usable only on items ≥ 20% Quality.",
        "Fate of the Vaal currency now stacks to 5,000.",
        "Vaal Cultivation Orb pool rebalanced (see Vaal Cultivation tab in Uniques)."
      ]
    },
    {
      name: "Abyss",
      tag: "Revamped",
      hub: "Atlas Abyss Cracks",
      image: "presskit-web/Abyss_Cinematic.jpg",
      bullets: [
        "Large Abyss cracks now appear on the Atlas. Completing one always opens an Abyssal Depths with a boss fight.",
        "Abyss Atlas Tree revamped.",
        "Kulemak's Invitation now always goes to the map owner.",
        "Abyss Omens no longer drop below area level 65.",
        "Chest-count modifiers also apply to Abyss chests and the chance of finding Abyssal Depths.",
        "Meteoric Demise damage adjusted; Lithomantic Runes now activate after a longer delay."
      ]
    },
    {
      name: "Expedition",
      tag: "Temporarily Disabled on Standard",
      hub: "Returns after Runes of Aldur",
      image: "presskit-web/Uthred_the_Stardrinker.jpg",
      bullets: [
        "Expedition League temporarily disabled on Standard leagues.",
        "Recombinator disabled · Omen of Recombination removed (existing copies deleted on login).",
        "Forgotten By Time Expedition Precursor Tablet temporarily removed from drops.",
        "Expedition Explosives now wait for unearthed monsters to die before chaining.",
        "Stash currency now usable at Expedition Vendors."
      ]
    },
  ],

  // ---------- ASCENDANCY CHANGES ----------
  // classIcon resolves via iconUrl("ui/IconDexIntFourb_Monk2") etc.
  ascendancies: [
    {
      name: "Martial Artist",
      cls: "Monk",
      mark: "M",
      classIcon: "ui/IconDexIntFourb_Monk1",
      splash: "presskit-web/Martial_Artist_Ascendancy_Art.jpg",
      isNew: true,
      changes: [
        { name: "New Ascendancy", desc: "Specialises in illusions and hand-to-hand combat. Full node list not in the patch summary." }
      ]
    },
    {
      name: "Spirit Walker",
      cls: "Huntress",
      mark: "S",
      classIcon: "ui/IconDexFourb_Huntress2",
      splash: "presskit-web/Spiritwalker_Ascendancy_Art.jpg",
      isNew: true,
      changes: [
        { name: "New Ascendancy", desc: "Commands animal spirits — Stag, Owl and Bear. Full node list not in the patch summary." }
      ]
    },
    {
      name: "Acolyte of Chayula",
      cls: "Monk",
      mark: "A",
      classIcon: "ui/IconDexIntFourb_Monk2",
      changes: [
        { name: "Into the Breach (Waking Dream)", desc: "Leech 20% of max Life from Red Flames · 20% of max Mana from Blue Flames.", chip: { kind: "buff", from: "15%", to: "20%" } }
      ]
    },
    {
      name: "Blood Mage",
      cls: "Witch",
      mark: "B",
      classIcon: "ui/IconIntFour_Witch2",
      changes: [
        { name: "Vitality Siphon", desc: "Spell Damage leeched as Life.", chip: { kind: "buff", from: "10%", to: "20%" } }
      ]
    },
    {
      name: "Chronomancer",
      cls: "Sorceress",
      mark: "C",
      classIcon: "ui/IconIntFourb_Sorceress2",
      changes: [
        { name: "Rapid River", desc: "Removed; replaced by Now and Again.", chip: { kind: "neutral", text: "removed" } },
        { name: "Now and Again (reworked)", desc: "Cascadable Spells have a 20% chance to Echo. Repeatable Spells have a 20% chance to Repeat.", chip: { kind: "neutral", text: "reworked" } },
        { name: "Unbound Encore", desc: "Now occupies the old position of Now and Again.", chip: { kind: "neutral", text: "moved" } },
        { name: "Ultimate Command", desc: "Now requires Unbound Encore.", chip: { kind: "neutral", text: "moved" } },
        { name: "Phased Form (new)", desc: "Take 30% less Damage, but 4 seconds after being hit, take 30% of that hit's damage.", chip: { kind: "buff", text: "+ new" } },
        { name: "Temporal Rift (Footprints in the Sand)", desc: "Cast time 0.5s → 0.1s; also removes delayed damage from Phased Form.", chip: { kind: "buff", from: "0.5s", to: "0.1s" } },
        { name: "Inevitable Agony (Inevitability)", desc: "No longer a Curse. 2s cooldown. Debuff is now a Life Loss effect that culls at threshold. Debuff duration 12s. Hit Damage % reduced.", chip: { kind: "nerf", from: "50% hit dmg", to: "25% hit dmg" } },
        { name: "Inevitable Agony — Duration", desc: "Debuff duration extended.", chip: { kind: "buff", from: "6–8.6s", to: "12s" } },
        { name: "Sands of Time (Quicksand Hourglass)", desc: "Now grants Skill Speed (previously Cast Speed).", chip: { kind: "neutral", text: "reworked" } }
      ]
    },
    {
      name: "Gemling Legionnaire",
      cls: "Mercenary",
      mark: "G",
      classIcon: "ui/IconStrDexFourb_Mercenary3",
      changes: [
        { name: "Crystalline Potential", desc: "Removed.", chip: { kind: "nerf", text: "removed" } },
        { name: "Essence of Virtue (new)", desc: "Grants Virtuous Barrier — a glittering barrier accumulating gemstone Motes of each Attribute; loses a random Mote when hit.", chip: { kind: "buff", text: "+ new" } },
        { name: "Advanced Thaumaturgy", desc: "No longer grants Thaumaturgical Dynamism. Instead: socketed gems get an extra quality stat (Alt-hover).", chip: { kind: "neutral", text: "reworked" } }
      ]
    },
    {
      name: "Pathfinder",
      cls: "Ranger",
      mark: "P",
      classIcon: "ui/IconDexFour_Ranger3",
      changes: [
        { name: "Overwhelming Toxicity", desc: "Less Poison Duration.", chip: { kind: "nerf", from: "35% less", to: "50% less" } },
        { name: "Running Assault", desc: "Less Movement Speed Penalty from using Skills while moving.", chip: { kind: "nerf", from: "50% less", to: "30% less" } }
      ]
    },
    {
      name: "Witchhunter",
      cls: "Mercenary",
      mark: "W",
      classIcon: "ui/IconStrDexFourb_Mercenary2",
      changes: [
        { name: "Obsessive Rituals", desc: "Less Armour and Evasion Rating.", chip: { kind: "nerf", from: "35% less", to: "50% less" } }
      ]
    },
  ],

  // ---------- SKILL GEM CHANGES ----------
  // kind: buff | nerf | mixed | neutral
  skills: [
    { name: "Align Fate",      tag: "Spirit · Visage",     kind: "neutral", icon: "DruidOracleSpellfluxSkill", chips: [{kind:"neutral", text:"cooldown rate now scales visage"}], notes: ['"Modifiers to Cooldown Recovery Rate also apply to visage appearance frequency."'] },
    { name: "Ancestral Warrior Totem", tag: "Warrior · Totem", kind: "buff", icon: "BruteAncestralWarriorTotem", chips: [{kind:"buff", text:"hidden 0.6s delay", removed: true}, {kind:"neutral", text:"now 50% of skill's attack time"}], notes: ['"Removed hidden 0.6s delay; now 50% of skill\'s attack time."'] },
    { name: "Bonestorm",       tag: "Witch · Bone",         kind: "neutral", icon: "WitchBoneStorm", chips: [{kind:"neutral", text:"Sustained tag", removed: true}], notes: ['Removed Sustained tag.'] },
    { name: "Boneshatter",     tag: "Warrior · Mace",       kind: "nerf",    icon: "BruteBoneshatter", chips: [{kind:"nerf", text:"Quality AS", from:"0–30%", to:"0–20%"}], notes: ['Quality now grants 0–20% increased Attack Speed (was 0–30%).'] },
    { name: "Comet",           tag: "Sorceress · Cold",     kind: "nerf",    icon: "SorceressComet", chips: [{kind:"nerf", text:"Gem 11 dmg", from:"223–335", to:"212–318"}, {kind:"nerf", text:"Gem 20 dmg", from:"829–1243", to:"787–1181"}], notes: ['Gem 11 Cold Damage 223–335 → 212–318.', 'Gem 20 787–1181 (was 829–1243).', 'Fire-Infused variant adjusted similarly.'] },
    { name: "Cull the Weak",   tag: "Warrior", kind: "buff",    icon: "FrenziedLungeSkillIcon", chips: [{kind:"buff", text:"Attack Dmg", from:"60–156%", to:"109–281%"}, {kind:"buff", text:"Atk Speed", from:"60%", to:"75%"}, {kind:"buff", text:"Mana", from:"9–46", to:"8–42"}, {kind:"buff", text:"Dash range", from:"+0%", to:"+15%"}, {kind:"buff", text:"Can't be Evaded"}], notes: ['Now Can\'t be Evaded.', 'Damage 109–281% of Attack Damage (was 60–156%).', 'Attack speed 75% base (was 60%).', 'Mana cost 8–42 (was 9–46).', 'Dash range +15%.'] },
    { name: "Defiance / Dread / War Banner", tag: "Banner", kind: "buff", icon: "DefianceBannerSkill", chips: [{kind:"buff", text:"MS penalty", removed: true}, {kind:"buff", text:"Radius", from:"4.5m", to:"6m"}], notes: ['Removed Movement Speed penalty.', 'Banner radius 6m (was 4.5m).'] },
    { name: "Earthquake",      tag: "Warrior · Slam",       kind: "buff",    icon: "BruteEarthquake", chips: [{kind:"buff", text:"Aftershock", from:"160–580%", to:"184–666%"}], notes: ['Aftershock deals 184–666% of Attack Damage (was 160–580%).'] },
    { name: "Eternal Rage",    tag: "Buff",                  kind: "neutral", icon: "CeaselessRageSkill", chips: [{kind:"neutral", text:"must activate in both weapon sets"}], notes: ['Must activate in both weapon sets; fails if impossible.'] },
    { name: "Feral Invocation", tag: "Druid · Spirit",      kind: "nerf",    icon: "4k/druidferalinvocation", chips: [{kind:"nerf", text:"cooldown bypass", removed: true}], notes: ['No longer bypasses cooldown.'] },
    { name: "Flame Breath",    tag: "Druid · Fire",         kind: "nerf",    icon: "4k/druidflamebreath", chips: [{kind:"nerf", text:"Energy Gain penalty added"}], notes: ['Added Energy Gain penalty similar to Incinerate.'] },
    { name: "Fortifying Cry",  tag: "Warrior · Cry",        kind: "mixed",   icon: "WarriorShieldingCry", chips: [{kind:"nerf", text:"consumes 1 stack on detonate"}, {kind:"nerf", text:"no double-hit on same enemy"}, {kind:"nerf", text:"shield wave", from:"6–8", to:"5–7"}], notes: ['Consumes one stack when detonating.', 'Shockwaves don\'t hit the same enemy twice.', 'Shield wave: 5–7 Added Phys Dmg per 15 Armour (was 6–8).'] },
    { name: "Fragmentation Rounds", tag: "Mercenary · Crossbow", kind: "mixed", icon: "4k/burstshotphysical", chips: [{kind:"neutral", text:"Quality reworked"}, {kind:"nerf", text:"Quality % Phys", removed: true}], notes: ['Quality grants +0–2 Fragments per Shot (was 0–20% more Physical Damage).'] },
    { name: "Freezing Salvo",  tag: "Sorceress · Cold",     kind: "nerf",    icon: "4k/rangerfreezingsalvoskill", chips: [{kind:"nerf", text:"more Chill mag", from:"56–107%", to:"34–68%"}], notes: ['Provides 34–68% more Magnitude of Chill (was 56–107%).'] },
    { name: "Gathering Storm", tag: "Monk · Dash",          kind: "mixed",   icon: "4k/monkgatheringstorm", chips: [{kind:"buff", text:"Perfect Dash explodes Bells"}, {kind:"buff", text:"shockwave 564–869%"}, {kind:"neutral", text:"quality reworked"}, {kind:"nerf", text:"shockwave cap 50"}], notes: ['Perfect Dash explodes Tempest Bells, creating shockwave dealing 564–869% Attack Damage.', 'Shocked ground 3.2m radius.', '50 shockwave limit.', 'Quality grants 0–20% longer Perfect Timing window (was +0–8 max shockwaves).'] },
    { name: "Ghost Dance",     tag: "Evasion · Buff",       kind: "mixed",   icon: "MonkGhostDance", chips: [{kind:"buff", text:"cooldown rate now applies"}, {kind:"buff", text:"ES regen = 2% Evasion (if shroud lost recently)"}, {kind:"nerf", text:"shroud gain", from:"7.6–6.1s", to:"11.7–10.1s"}, {kind:"nerf", text:"loses shroud on hit"}], notes: ['Interval now uses Cooldown Recovery.', 'When Hit, lose a Ghost Shroud.', 'Regenerate Energy Shield equal to 2% of your Evasion Rating per second if you have lost a Ghost Shroud Recently. [22 May]', 'Gains a shroud every 11.7–10.1s (was 7.6–6.1s).'] },
    { name: "Grim Feast",      tag: "Spirit · ES",          kind: "nerf",    icon: "WitchGrimFeast", chips: [{kind:"nerf", text:"Grim Resurrection 1s CD"}], notes: ['Grim Resurrection has 1s cooldown.'] },
    { name: "Ice Shot",        tag: "Ranger · Cold",        kind: "nerf",    icon: "RangerIceShot", chips: [{kind:"nerf", text:"Ice Shards 25% more Freeze Buildup", removed: true}], notes: ['Ice Shards no longer have 25% more Freeze Buildup.'] },
    { name: "Ice Strike",      tag: "Monk · Combo",          kind: "nerf",    icon: "MonkComboAttack", chips: [{kind:"nerf", text:"Quality", from:"0–10% more AS", to:"0–20% increased AS"}], notes: ['Quality grants 0–20% increased Attack Speed (was 0–10% more) — "more" is multiplicative, so 10% more typically outvalues 20% increased once other AS sources are stacked.'] },
    { name: "Lightning Arrow", tag: "Ranger · Lightning",   kind: "nerf",    icon: "RangerLightningArrow", chips: [{kind:"nerf", text:"beams can't chain to same target"}], notes: ['Multiple beams can\'t chain to the same target.'] },
    { name: "Lunar Blessing",  tag: "Monk · Buff",          kind: "nerf",    icon: "DruidLunarBlessing", chips: [{kind:"nerf", text:"Moonbeams melee tag", removed: true}], notes: ['Triggered Moonbeams are no longer melee skills.'] },
    { name: "Magma Barrier",   tag: "Warrior · Fire",       kind: "nerf",    icon: "BruteMagmaBarrier", chips: [{kind:"nerf", text:"per 15 Armour&Evasion", from:"6–8", to:"5–7"}], notes: ['5–7 Added Fire Damage per 15 Armour and Evasion (was 6–8).'] },
    { name: "Mirage Archer / Deadeye", tag: "Ranger", kind: "buff", icon: "LingeringMirageSkill", chips: [{kind:"buff", text:"now supports Channelled Skills"}], notes: ['Now supports Channelled Skills.'] },
    { name: "Mirror of Refraction", tag: "Spirit",          kind: "neutral", icon: "AtzirisRule", chips: [{kind:"neutral", text:"cooldown rate scales mirror frequency"}], notes: ['Cooldown Recovery Rate also applies to mirror appearance frequency.'] },
    { name: "Oil Barrage",     tag: "Druid · Electric Spittle", kind: "buff", icon: "DruidElectricSpittle", chips: [{kind:"buff", text:"Mana cost", from:"100%", to:"−18%"}, {kind:"buff", text:"base dmg +10%"}, {kind:"nerf", text:"charge consumed", from:"every 2s", to:"every 1.5s"}], notes: ['Mana cost reduced by 18%.', 'Empowered variant costs per-second equivalent.', 'Base deals 10% more (Empowered 10% less).', 'Consumes charge every 1.5s (was 2s).'] },
    { name: "Parry",           tag: "Huntress · Buckler",   kind: "nerf",    icon: "HuntressBucklerParry", chips: [{kind:"nerf", text:"area adjusted"}, {kind:"nerf", text:"no bonus Attack Distance"}], notes: ['Area adjusted; removed bonus Attack Distance.'] },
    { name: "Poisonburst Arrow", tag: "Ranger · Poison",    kind: "nerf",    icon: "RangerPoisonBurstArrow", chips: [{kind:"nerf", text:"Duration", from:"3–4.9s", to:"3s fixed"}, {kind:"nerf", text:"Quality", from:"0–20% more poison", to:"0–10% more poison"}], notes: ['Duration fixed at 3s (was 3–4.9).', 'Quality grants 0–10% more Magnitude of Poison (was 0–20%).'] },
    { name: "Pounce",          tag: "Druid · Wolf",         kind: "nerf",    icon: "DruidWolfLeapAttack", chips: [{kind:"nerf", text:"Cooldown", from:"4.9–4s", to:"6–5.1s"}], notes: ['Cooldown 6–5.1 seconds (was 4.9–4).'] },
    { name: "Ravenous Swarm",  tag: "Spirit",                kind: "neutral", icon: "WitchRavenousSwarm", chips: [{kind:"neutral", text:"cooldown rate scales swarm spawning"}], notes: ['Cooldown Recovery Rate also applies to swarm spawning frequency.'] },
    { name: "Rend",            tag: "Warrior · Bleed",      kind: "mixed",   icon: "DruidWyvernSwipe", chips: [{kind:"neutral", text:"scaling bug fixed"}, {kind:"nerf", text:"Lightning-Charged dmg", from:"120–586%", to:"130–405%"}], notes: ['Fixed scaling bug.', 'Lightning-Charged deals 130–405% Attack Damage (was 120–586%).'] },
    { name: "Resonating Shield", tag: "Warrior · Shield",   kind: "nerf",    icon: "BruteResonatingShield", chips: [{kind:"nerf", text:"per 15 Armour", from:"6–8", to:"5–7"}], notes: ['5–7 Added Physical Damage per 15 Armour (was 6–8).'] },
    { name: "Rolling Magma",   tag: "Druid · Fire",         kind: "buff",    icon: "DruidRollingMagma", chips: [{kind:"buff", text:"Chains", from:"2–4 times", to:"3–5 times"}], notes: ['Chains 3–5 times (was 2–4).'] },
    { name: "Rolling Slam",    tag: "Warrior · Slam",       kind: "mixed",    icon: "BruteDoubleSlam", chips: [{kind:"buff", text:"Attack time", from:"+1.5s", to:"+1.0s"}, {kind:"nerf", text:"1st slam", from:"90–367%", to:"75–272%"}, {kind:"nerf", text:"2nd slam", from:"180–735%", to:"150–543%"}], notes: ['Attack time +1s (was +1.5).', 'First slam 75–272% Attack Dmg (was 90–367%).', 'Second slam 150–543% (was 180–735%).'] },
    { name: "Shattering Spite", tag: "Sorceress",            kind: "nerf",    icon: "4k/atziriscontempt", chips: [{kind:"nerf", text:"50% less Magnitude of Ailments"}, {kind:"nerf", text:"instant leech", removed: true}], notes: ['50% Less Magnitude of Damaging Ailments.', 'Removed instant leech.'] },
    { name: "Shield Wall",     tag: "Warrior · Shield",     kind: "nerf",    icon: "BruteShieldWall", chips: [{kind:"nerf", text:"per 15 Armour", from:"6–8", to:"5–7"}], notes: ['5–7 Added Physical Damage per 15 Armour (was 6–8).'] },
    { name: "Shred",           tag: "Ranger · Bleed",       kind: "nerf",    icon: "DruidFrozenClaws", chips: [{kind:"nerf", text:"Quality", from:"0–10% more AS", to:"0–20% increased AS"}], notes: ['Quality grants 0–20% increased Attack Speed (was 0–10% more) — "more" is multiplicative, so 10% more typically outvalues 20% increased once other AS sources are stacked.'] },
    { name: "Snipe",           tag: "Ranger · Bow",         kind: "mixed",   icon: "RangerSnipeShotArrow", chips: [{kind:"nerf", text:"Atk dmg", from:"133–343%", to:"121–312%"}, {kind:"buff", text:"Explosion", from:"454–1358%", to:"484–1449%"}, {kind:"nerf", text:"Icy Blast", from:"913–3062%", to:"764–3067%"}, {kind:"nerf", text:"vs Unique", from:"50% more", to:"33–50% more"}, {kind:"nerf", text:"Radius", from:"3.2m", to:"3m"}], notes: ['Attack Damage 121–312% (was 133–343%).', 'Explosion 484–1449% (was 454–1358%).', 'Icy Blast 764–3067% (was 913–3062%).', 'Unique-enemy bonus 33–50% more (was flat 50%).', 'Radius 3m (was 3.2).'] },
    { name: "Spell Totem",     tag: "Spell · Totem",        kind: "buff",    icon: "DruidSpellTotem", chips: [{kind:"buff", text:"can move while using"}, {kind:"neutral", text:"new animation"}], notes: ['Can move while using.', 'Updated animation.'] },
    { name: "Tame Beast",      tag: "Druid · Beasts",       kind: "buff",   icon: "HuntressTameBeast", chips: [{kind:"buff", text:"Beasts dmg", from:"baseline", to:"40–84% more (Lvl 9–20)"}, {kind:"buff", text:"summons immediately if spirit available"}, {kind:"buff", text:"Min gem level", from:"9", to:"7"}], notes: ['Summoned beasts deal 40–84% more damage (levels 9–20).', 'Summons immediately if spirit available.', 'Minimum Gem level lowered to 7 (was 9). [25 May]'] },
    { name: "Tempest Bell",    tag: "Monk · Bell",          kind: "mixed",   icon: "MonkTempestBell", chips: [{kind:"buff", text:"Max active bells", from:"1", to:"3"}, {kind:"buff", text:"Ancestrally Boostable"}, {kind:"nerf", text:"Shockwave dmg", from:"60–132%", to:"45–119%"}, {kind:"nerf", text:"Trigger interval", from:"0.25s", to:"0.3s"}], notes: ['Can be Ancestrally Boosted.', 'Max 3 active (was 1).', 'Shockwave 45–119% Attack Damage (was 60–132%).', 'Triggers every 0.3s (was 0.25).'] },
    { name: "Toxic Growth",    tag: "Ranger · Poison",      kind: "mixed",   icon: "RangerPoisonBloomSkill", chips: [{kind:"buff", text:"Pustules per cast", from:"4", to:"5"}, {kind:"nerf", text:"Pustule limit", from:"12", to:"5"}, {kind:"nerf", text:"Quality", from:"+0–2", to:"+0–1"}], notes: ['Fires 5 pustules (was 4).', 'Limit 5 (was 12).', 'Quality +0–1 Pustule and limit +0–1 (was +0–2 each).'] },
    { name: "Time of Need",    tag: "Buff · Heal",          kind: "nerf",    icon: "TimeOfNeedSkill", chips: [{kind:"nerf", text:"Duration tag", removed: true}, {kind:"buff", text:"Interval", from:"11.3–10.1s", to:"9.3–8.1s"}, {kind:"buff", text:"uses cooldown rate"}], notes: ['Lost Duration tag — no longer scaled by Skill Duration.', 'Uses Cooldown Recovery.', 'Interval 9.3–8.1s (was 11.3–10.1).'] },
    { name: "Volcano",         tag: "Druid · Fire",         kind: "buff",    icon: "DruidVolcano", chips: [{kind:"buff", text:"Base Crit", from:"5%", to:"8%"}], notes: ['Base critical 8% (was 5%).'] },
    { name: "Whirling Assault", tag: "Warrior · Movement",  kind: "nerf",    icon: "4k/monkwhirlingassault", chips: [{kind:"nerf", text:"Quality", from:"0–15% more AS", to:"0–20% increased AS"}], notes: ['Quality grants 0–20% increased Attack Speed (was 0–15% more) — "more" is multiplicative, so 15% more typically outvalues 20% increased once other AS sources are stacked.'] },
    { name: "Wing Blast",      tag: "Druid · AoE",          kind: "buff",    icon: "DruidWingBlast", chips: [{kind:"buff", text:"Shockwave dmg +25%"}], notes: ['Shockwave deals 25% more damage.'] },
    { name: "Ice Nova",        tag: "Sorceress · Cold",     kind: "nerf",    chips: [{kind:"nerf", text:"no sideways Frostbolt cascade"}], notes: ['Is no longer able to originate from Frostbolt while cascading sideways.'] },
    { name: "Primal Strikes",  tag: "Huntress · Spear",     kind: "nerf",    chips: [{kind:"nerf", text:"Min gem level", from:"7", to:"9"}], notes: ['Now has a minimum Gem level of 9 (previously 7).'] },
  ],

  // ---------- SUPPORT GEM CHANGES ----------
  supports: [
    { name: "Unleash / Expand / Salvo / Freezing Salvo", kind: "neutral", icon: "s/unleash", chips: [{kind:"neutral", text:"Seal mechanics standardised"}], desc: 'Standardised Seal mechanics across these supports.' },
    { name: "Salvo Support",        kind: "mixed",   icon: "s/salvo", chips: [{kind:"buff", text:"Seal gain", from:"every 2s", to:"every 1s"}, {kind:"buff", text:"Max seals", from:"3", to:"6"}, {kind:"nerf", text:"Projectiles per seal", from:"2", to:"1"}], desc: 'Gains a seal every 1s, max 6 (was every 2s, max 3); provides 1 projectile per seal (was 2).' },
    { name: "Advancing Storm",      kind: "buff",    icon: "gem/NewSupport/MovingStormSupportGem", chips: [{kind:"buff", text:"now supports all Storm Skills"}], desc: 'Supports all Storm Skills under any conditions.' },
    { name: "Arjun's Medal",        kind: "nerf",    icon: "s/chancetonotconsumeammo", chips: [{kind:"nerf", text:"chance to load bolts", from:"100%", to:"25%"}], desc: '25% chance to load bolts (was 100%).' },
    { name: "Atziri's Impatience",  kind: "nerf",    icon: "s/blankgreen", chips: [{kind:"nerf", text:"can't support Persistent Skills"}], desc: 'Can\'t support Persistent Skills.' },
    { name: "Bhatair's Vengeance",  kind: "nerf",    icon: "s/icebite", chips: [{kind:"nerf", text:"Rage scaling halved"}, {kind:"nerf", text:"Duration", from:"20s", to:"15s"}], desc: 'Per 2 Rage grants 1% Damage as Cold for 15s (was per 1 Rage, 20s).' },
    { name: "Brink I",              kind: "neutral", icon: "s/brink", chips: [{kind:"neutral", text:"Cut at level 1 (was 2)"}], desc: 'Cut at level 1 (was 2).' },
    { name: "Culmination II",       kind: "nerf",    icon: "s/culmination", chips: [{kind:"nerf", text:"Combo loss delay", from:"4s", to:"6s"}, {kind:"nerf", text:"Max combo", from:"20", to:"10"}, {kind:"buff", text:"More per combo", from:"2%", to:"4%"}], desc: '6s combo loss delay (was 4); max 10 combo (was 20); 4% more per combo (was 2%).' },
    { name: "Corrupting Cry I/II",  kind: "neutral", icon: "s/corruptingcry", chips: [{kind:"neutral", text:"triggers separate skill"}], desc: 'Triggers separate skill inflicting Corrupted Blood.' },
    { name: "Decaying Hex",         kind: "neutral", icon: "s/decayinghex", chips: [{kind:"neutral", text:"triggers separate skill"}], desc: 'Triggers separate skill inflicting Decay.' },
    { name: "Dialla's Desire",      kind: "nerf",    icon: "s/blankblue", chips: [{kind:"nerf", text:"Quality", from:"+10%", to:"+5%"}], desc: '+5% Quality (was +10%).' },
    { name: "Doedre's Undoing",     kind: "neutral", icon: "s/cursedground", chips: [{kind:"neutral", text:"Witchtoads instead of hazards"}], desc: 'Spawns Witchtoads on interval instead of hazards.' },
    { name: "Infernal Legion I",    kind: "nerf",    icon: "s/infernallegion", chips: [{kind:"nerf", text:"Minion ignite", from:"20%", to:"10%"}, {kind:"buff", text:"Life cost", from:"20%", to:"10%"}], desc: 'Minions now ignite for 10% of their Life (was 20%) — halving the aura damage to surrounding enemies. Takes 10% maximum Life as Fire (was 20%).' },
    { name: "Infernal Legion II",   kind: "nerf",    icon: "s/infernallegion", chips: [{kind:"nerf", text:"Minion ignite", from:"20%", to:"10%"}, {kind:"buff", text:"Life cost", from:"20%", to:"10%"}, {kind:"buff", text:"+20% Fire Res"}], desc: 'Minions now ignite for 10% of their Life (was 20%) — halving the aura damage to surrounding enemies. Takes 10% max Life (was 20%); +20% Fire Resistance.' },
    { name: "Infernal Legion III",  kind: "nerf",    icon: "s/infernallegion", chips: [{kind:"nerf", text:"removed from Uncut Gems", removed: true}], desc: 'Can no longer be cut from an Uncut Support Gem.' },
    { name: "Living Lightning",     kind: "buff",    icon: "s/livinglightning", chips: [{kind:"buff", text:"doesn't replace minions at cap"}], desc: 'Doesn\'t replace minions at cap.' },
    { name: "Morgana's Tempest",    kind: "buff",    icon: "s/blankblue", chips: [{kind:"buff", text:"supports all Storm Skills"}], desc: 'Supports all Storm Skills.' },
    { name: "Olroth's Hubris",      kind: "buff",    chips: [{kind:"buff", text:"new Lineage Support Gem"}], desc: 'New Lineage Support Gem. [25 May]' },
    { name: "Overabundance III",    kind: "neutral", icon: "s/increaselimit", chips: [{kind:"neutral", text:"wording clarified"}], desc: 'Properly describes can\'t support Persistent.' },
    { name: "Overextend",           kind: "nerf",    icon: "s/overextend", chips: [{kind:"nerf", text:"removed from Uncut Gems", removed: true}], desc: 'Can no longer be cut from an Uncut Support Gem.' },
    { name: "Paquate's Pact",       kind: "mixed",   icon: "s/corruptingcry", chips: [{kind:"neutral", text:"triggers separate skill"}, {kind:"nerf", text:"Cost", from:"2% per Corrupted Blood", to:"10% Life per recent use (cap 30%)"}], desc: 'Triggers separate skill; costs 10% max Life per recent use, max 30% (was 2% per Corrupted Blood).' },
    { name: "Rage I/II/III",        kind: "buff",    icon: "s/rage", chips: [{kind:"buff", text:"can support Minion Skills"}], desc: 'Can support Minion Skills.' },
    { name: "Ratha's Assault",      kind: "nerf",    icon: "s/combatreload", chips: [{kind:"nerf", text:"Bolts on dodge", from:"5", to:"4"}, {kind:"nerf", text:"Bonus bolts", from:"+4", to:"+3"}, {kind:"nerf", text:"AS", from:"20%", to:"10%"}], desc: 'Loads 4 bolts on dodge (was 5); +3 additional bolts (was 4); 10% increased Attack Speed (was 20%).' },
    { name: "Refraction I/II",      kind: "neutral", icon: "s/temperedvalour", chips: [{kind:"neutral", text:"banner Deflection rework"}], desc: 'Banners grant allies 15/20% Deflection Rating equal to 15/20% of Evasion.' },
    { name: "Shock Conduction II",  kind: "nerf",    icon: "s/conduction", chips: [{kind:"nerf", text:"removed from Uncut Gems", removed: true}], desc: 'Can no longer be cut from an Uncut Support Gem.' },
    { name: "Spell Cascade",        kind: "buff",    chips: [{kind:"buff", text:"supports others' spells"}], desc: 'Is no longer limited to supporting spells you use yourself. [25 May]' },
    { name: "Uhtred's Augury",      kind: "nerf",    icon: "s/blankred", chips: [{kind:"nerf", text:"Level bonus", from:"+3", to:"+2"}], desc: '+2 level if exactly two supports (was +3).' },
    { name: "Uhtred's Omen",        kind: "nerf",    icon: "s/blankred", chips: [{kind:"nerf", text:"Level bonus", from:"+3", to:"+2"}], desc: '+2 level if exactly one support (was +3).' },
    { name: "Volt",                 kind: "nerf",    icon: "s/volt", chips: [{kind:"nerf", text:"Voltaic / metre", from:"3", to:"2"}, {kind:"nerf", text:"Damage per charge", from:"5% per 10", to:"1% per charge consumed"}], desc: 'Gains 2 Voltaic Charge per metre (was 3); 1% Damage as Lightning per charge consumed (was 5% per ten).' },
  ],

  // ---------- PASSIVE TREE — TOP CALLOUTS ----------
  passiveCallouts: [
    { kind: "nerf",  tag: "Sweeping Nerf", title: "Energy Shield Recharge", body: "Small passives granting faster start of ES Recharge now give 6% (was 15%). Small passives that granted ES Recharge Rate are removed and replaced by faster start at lower values. Many notables dropped from 25–40% to 10–20%." },
    { kind: "buff",  tag: "Sweeping Buff", title: "Companion Theme", body: "19 new Companion-themed passives added. Trusted Kinship reworked to 30% more Companion / 20% less non-Companion reservation efficiency." },
    { kind: "neutral", tag: "Keystone Rework", title: "Vaal Pact", body: "Now: 50% more Leech amount, 67% slower Leech speed, no recovery besides leech, leech effects persist through full life. No longer instant. Life Flasks usable again." },
    { kind: "neutral", tag: "Keystone Rework", title: "Ancestral Bond", body: "Totems no longer have placement cost or charge consumption. Totem limit doubled (was removed entirely). Still reserves 75 spirit each." },
  ],

  // ---------- PASSIVE TREE — INDIVIDUAL NOTABLE / CLUSTER CHANGES ----------
  passives: [
    { name: "Adamant Recovery → Fortified Aegis", kind: "buff", chips: [{kind:"buff", text:"100% increased Armour/Eva/ES from Shield"}], desc: 'Notable replaced; new node grants 100% increased Armour, Evasion and Energy Shield from Equipped Shield.' },
    { name: "Arcane Mixtures", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '10% increased Cast Speed if you used a Mana Flask recently (was 25% increased ES Recharge Rate).' },
    { name: "Bastion of the Forest", kind: "nerf", chips: [{kind:"nerf", text:"ES start", from:"15%", to:"10%"}], desc: '10% faster start of ES Recharge (was 15%).' },
    { name: "Casting Cascade", kind: "buff", chips: [{kind:"buff", text:"Window", from:"4s", to:"8s"}], desc: '6% increased Cast Speed per different Spell cast in past 8 seconds (was 4).' },
    { name: "Chakra of Breathing", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '20% faster start of ES Recharge (was 1% ES Recharge Rate per 4 Dexterity).' },
    { name: "Commanding Rage", kind: "neutral", chips: [{kind:"neutral", text:"per-Rage to per-5-Rage"}], desc: '2% increased Minion Attack Speed per 5 Rage (was 1% per Rage).' },
    { name: "Convalescence", kind: "nerf", chips: [{kind:"nerf", text:"ES start", from:"40%", to:"20%"}, {kind:"buff", text:"ES Rate", from:"−15%", to:"−10%"}], desc: '20% faster start of ES Recharge (was 40%), 10% reduced ES Recharge Rate (was 15%).' },
    { name: "Core of the Guardian", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '30% increased Block chance and 20% reduced max ES (was 100% Armour/Eva/ES from Shield).' },
    { name: "Covering Ward", kind: "mixed", chips: [{kind:"buff", text:"ES on block", from:"20", to:"25"}, {kind:"buff", text:"+12% Block"}, {kind:"nerf", text:"25% ES Recharge Rate", removed: true}], desc: 'Gain 25 ES on block (was 20), 12% increased Block Chance. Removed 25% ES Recharge Rate.' },
    { name: "Craving Slaughter", kind: "buff", chips: [{kind:"buff", text:"reworked"}], desc: '+15 max Rage if you used a Glory skill in past 20s (was +8 per skill in past 6s, up to 5).' },
    { name: "Critical Overload", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '15% increased Critical Spell Damage Bonus (was 15% Spell Damage on recent crit).' },
    { name: "Cunning Fox → Quick Fox", kind: "neutral", chips: [{kind:"neutral", text:"replaced"}], desc: '20% increased Deflection Rating while moving. Prior small passives now grant 20% increased Evasion Rating while moving.' },
    { name: "Deadly Force", kind: "mixed", chips: [{kind:"buff", text:"Crit Chance", from:"10%", to:"15%"}, {kind:"nerf", text:"Damage", from:"25%", to:"15%"}], desc: '15% increased Crit Hit Chance (was 10%), 15% increased Damage on recent crit (was 25%).' },
    { name: "Dependable Ward", kind: "nerf", chips: [{kind:"nerf", text:"ES start", from:"25%", to:"12%"}, {kind:"buff", text:"+8% Chaos Res"}], desc: '+8% Chaos Res, 12% faster start of ES Recharge (was 25%).' },
    { name: "Devoted Protector", kind: "nerf", chips: [{kind:"nerf", text:"ES start", from:"15%", to:"10%"}], desc: '10% faster start of ES Recharge (was 15%).' },
    { name: "Echoing Pulse", kind: "neutral", chips: [{kind:"neutral", text:"now functions"}], desc: 'Echoed Spells have 25% increased AoE. Removed broken Final Repeat node.' },
    { name: "Effervescent", kind: "buff", chips: [{kind:"buff", text:"Window", from:"4s", to:"8s"}], desc: '4% increased Cast Speed per different Spell cast in past 8 seconds (was 4).' },
    { name: "Energising Archon", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '30% increased Archon Duration (was 40% ES Recharge Rate while Archon-buffed).' },
    { name: "Energising Deflection", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '12% faster start of ES Recharge (was 30% ES Recharge Rate).' },
    { name: "Essence Infusion", kind: "mixed", chips: [{kind:"buff", text:"Int", from:"+10", to:"+12"}, {kind:"nerf", text:"40% ES Recharge Rate", removed: true}], desc: '12% faster start of ES Recharge, +12 Int (was +10). Removed 40% ES Recharge Rate.' },
    { name: "Fast Metabolism", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '40% increased Damage while Leeching Life (was Leech effects persist through full life).' },
    { name: "Fortifying Blood", kind: "nerf", chips: [{kind:"nerf", text:"Leech amount", from:"20%", to:"15%"}], desc: '15% increased Life Leeched (was 20%).' },
    { name: "Goring", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '3% increased Max Life, 20% increased Life Leeched (was 3% reduced Max Life, 30% Leech, 40% Phys Dmg).' },
    { name: "Immortal Infamy", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '6% increased Life Recovery Rate (was 10% ES Recharge Rate).' },
    { name: "Lifelong Friend / Nurturing Guardian", kind: "neutral", chips: [{kind:"neutral", text:"positions swapped"}], desc: 'Notable positions swapped.' },
    { name: "Mystic Stance", kind: "nerf", chips: [{kind:"nerf", text:"ES start", from:"30%", to:"12%"}], desc: '12% faster start of ES Recharge (was 30%).' },
    { name: "Patient Barrier", kind: "nerf", chips: [{kind:"nerf", text:"Max ES", from:"60%", to:"50%"}], desc: '50% increased Max ES (was 60%).' },
    { name: "Quick Response", kind: "nerf", chips: [{kind:"nerf", text:"ES start", from:"20%", to:"10%"}, {kind:"nerf", text:"On not-full life", from:"30%", to:"20%"}], desc: '10% faster start of ES Recharge (was 20%); 20% faster on not-full life (was 30%).' },
    { name: "Rapid Recharge", kind: "nerf", chips: [{kind:"nerf", text:"Both", from:"25%", to:"12%"}], desc: '12% faster start, 12% increased ES Recharge Rate (both were 25%).' },
    { name: "Refocus", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '20% increased Mana Regen while stationary (was 30% ES Recharge Rate).' },
    { name: "Shatter Palm", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '20% increased Crit Damage Bonus (was 10% chance to Daze).' },
    { name: "Shimmering", kind: "mixed", chips: [{kind:"neutral", text:"reworked"}], desc: '10% faster start of ES Recharge, 20% increased Evasion if hit recently (was 20% ES Recovery Rate if not hit recently).' },
    { name: "Staggering Palm", kind: "buff", chips: [{kind:"buff", text:"Phys Dmg", from:"20%", to:"25%"}], desc: '25% increased Phys Dmg (was 20%); 10% Daze (was 20% Crit Dmg Bonus).' },
    { name: "Stormcharged", kind: "buff", chips: [{kind:"buff", text:"reworked"}], desc: 'Now: 8% Elemental Penetration, 5% Attack & Cast Speed with Elemental Skills. Replaced crit-based stats.' },
    { name: "Tempered Mind", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '15% increased Effect of Fully Broken Armour (was 20% Crit Damage Bonus).' },
    { name: "Voracious", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: '15% increased Attack Speed while Leeching (was 20% of Life Leech is Instant).' },
    { name: "Wide Barrier", kind: "mixed", chips: [{kind:"buff", text:"+30% Block"}, {kind:"nerf", text:"−20% Armour"}], desc: '30% increased Block chance, 20% reduced Armour (was 25% reduced Defences).' },
    { name: "Wyvern's Breath", kind: "buff", chips: [{kind:"buff", text:"now also Freeze Buildup"}], desc: '40% increased Elemental Ailment Application if shapeshifted to animal form recently. Now includes Freeze Buildup.' },
    { name: "Spell Damage (Witch/Sorc small)", kind: "buff", chips: [{kind:"buff", text:"Spell Dmg", from:"8%", to:"10%"}], desc: 'First two small Spell Damage passives near Witch/Sorc start: 10% (was 8%).' },
    { name: "Banner AoE (small)", kind: "nerf", chips: [{kind:"nerf", text:"AoE", from:"15%", to:"12%"}], desc: 'Small Banner AoE passives: 12% (was 15%).' },
    { name: "Banner Tactician (small)", kind: "nerf", chips: [{kind:"nerf", text:"AoE", from:"20%", to:"16%"}], desc: 'Tactician small node: 16% Banner AoE (was 20%).' },
    { name: "Life Leech (small)", kind: "nerf", chips: [{kind:"nerf", text:"Leech amount", from:"10%", to:"8%"}], desc: 'Small Life Leech amount passives: 8% (was 10%).' },
    { name: "Unsavored Feast (Timeless Jewel)", kind: "neutral", chips: [{kind:"neutral", text:"reworked"}], desc: 'Now: Leech Life 35% faster if you have ≥100 Tribute (was 20% Instant Leech at 200 tribute).' },
    { name: "Reformed Barrier cluster", kind: "nerf", chips: [{kind:"nerf", text:"cluster", removed: true}], desc: 'Removed.' },
    { name: "Warding Fetish cluster", kind: "neutral", chips: [{kind:"neutral", text:"moved, no jewel socket"}], desc: 'Cluster moved; no longer connects to a Jewel Socket.' },
    { name: "Stormcharged & Breaking Point cluster", kind: "neutral", chips: [{kind:"neutral", text:"no jewel socket"}], desc: 'Cluster no longer connects to a Jewel Socket.' },
    { name: "Archon of Undeath cluster", kind: "buff", chips: [{kind:"buff", text:"new cluster"}], desc: 'New cluster added to Witch / Sorceress area.' },
    { name: "Life Recoup Speed (×9 new)", kind: "buff", chips: [{kind:"buff", text:"+9 nodes"}], desc: '9 new Life Recoup Speed passives added.' },
    { name: "Companion-themed (×19 new)", kind: "buff", chips: [{kind:"buff", text:"+19 nodes"}], desc: '19 new Companion-themed passives added.' },
  ],

  // ---------- UNIQUES — REWORKS ----------
  uniqueReworks: [
    { name: "Ab Aeterno", image: "Armours/Boots/Uniques/AbAeterno", chips: [{kind:"buff", text:"AR/Ev/ES", from:"100–150%", to:"200–250%"}, {kind:"neutral", text:"reworked"}], desc: 'No longer 10% less Movement/Skill Speed per Dodge in past 20s. Now 200–250% AR/Ev/ES (was 100–150%), Speed unaffected by Slows while Sprinting, Gain Overencumbrance for 4s on Dodge Roll.' },
    { name: "Apep's Supremacy", image: "Offhand/Foci/Uniques/ApepsSupremacy", chips: [{kind:"nerf", text:"30–50% ES start", removed: true}], desc: 'No longer has 30–50% faster start of Energy Shield Recharge.' },
    { name: "Atziri's Acuity", image: "Armours/Gloves/Uniques/AtzirisAcuity", chips: [{kind:"neutral", text:"reworked"}], desc: 'Reworked: 150–200% Armour, +100–150 Max Life, Leech 10% Phys Attack Dmg as Life, 10% Phys Hits cause Blood Loss & Vaal Pact, grants Herald of the Royal Queen.' },
    { name: "Sierran Inheritance", image: "Armours/BodyArmours/Uniques/MutewindSail", chips: [{kind:"neutral", text:"reworked"}], desc: 'Now 15–30% increased ES Recharge Rate (was 30–50% faster ES start).' },
    { name: "Blackflame", image: "Rings/BlackFlameChaos", chips: [{kind:"buff", text:"Ignite Mag", from:"50%", to:"80–100%"}, {kind:"nerf", text:"Ignite Dur", from:"−50%", to:"−60 to −75%"}, {kind:"neutral", text:"reworked"}], desc: 'No longer "Ignites take Chaos instead of Fire". Now: Withers also increase Fire Dmg taken, Ignites deal Chaos instead of Fire, Withered doesn\'t expire on Ignited enemies. Ignite Magnitude 80–100% (was 50%), Ignite duration on enemies −60 to −75% (was −50%).' },
    { name: "Blistering Bond", image: "Rings/Uniques/BlisteringBond", chips: [{kind:"neutral", text:"reworked"}], desc: 'Fire Damage now contributes to Bleeding Magnitude; Bleeding deals Fire instead of Physical.' },
    { name: "Brass Dome", image: "Armours/BodyArmours/Uniques/BrassDome", chips: [{kind:"nerf", text:"Armour", from:"700–800%", to:"500–600%"}], desc: '500–600% increased Armour (was 700–800%).' },
    { name: "Carnage Heart", image: "Amulets/Uniques/CarnageHeart", chips: [{kind:"buff", text:"+25–50% Dmg while Leeching"}], desc: 'Now 25–50% increased Damage while Leeching.' },
    { name: "Chober Chaber", image: "Weapons/TwoHandWeapons/TwoHandMaces/Uniques/ChoberChaber", chips: [{kind:"buff", text:"+2–3 Minion Skill Levels"}], desc: 'Now +2–3 to Level of All Minion Skills.' },
    { name: "Collapsing Horizon", image: "Weapons/TwoHandWeapons/WarStaves/Uniques/CollapsingHorizon", chips: [{kind:"buff", text:"Ele Dmg now applies to all (not just Attacks)"}], desc: 'Unique Quarterstaff now grants 100% increased Elemental Damage (was 100% increased Elemental Damage with Attacks). [25 May]' },
    { name: "Death's Harp", image: "Weapons/TwoHandWeapons/Bows/Uniques/DeathsHarp", chips: [{kind:"neutral", text:"reworked"}], desc: 'Lost "Bow Attacks Fire 3 Additional Arrows". Now +250–330% Surpassing Chance to Fire an Additional Arrow.' },
    { name: "Elevore", image: "Armours/Helmets/Uniques/Elevore", chips: [{kind:"buff", text:"Charm Charges/s", from:"0.5", to:"1"}, {kind:"buff", text:"+Charm Slots", from:"+1", to:"+1–2"}], desc: 'Charms gain 1 Charge per second (was 0.5); +1–2 Charm Slots (was +1).' },
    { name: "Eshtera's Path", image: "Rings/Uniques/EmberheartSeal", chips: [{kind:"neutral", text:"reworked"}], desc: 'Renamed from Sekhema\'s Resolve (Lightning variant). No longer "Cold Resistance unaffected by Area Penalties". Now: +5–10% Fire & Cold Res per Equipped Item with a Lightning Res Modifier.' },
    { name: "Glowswarm", image: "Rings/Uniques/Glowswarm", chips: [{kind:"buff", text:"Mana Flask grants Guard"}], desc: 'Now: Using a Mana Flask grants Guard equal to 100% of the Flask\'s Recovery for 4 seconds.' },
    { name: "Guatelitzi's Thesis (Soul Core)", image: "Currency/PerfectSoulCores/SoulCoreBlood", chips: [{kind:"buff", text:"Helmet armour", from:"25%", to:"35%"}], desc: 'Soul Core: socketed in Helmets, now grants Armour equal to 35% of Life Lost from Hits in the past 8 seconds (was 25%). [25 May]' },
    { name: "Hollow Mask", image: "Armours/Helmets/Uniques/MaskOfTheHollow", chips: [{kind:"buff", text:"grants Wildwood's Gifts"}, {kind:"buff", text:"Remnants affect allies"}], desc: 'Grants Wildwood\'s Gifts; Azmerian spirits show nearby Ancient Blooms. Remnants you create affect allies in Presence. 80–100% Reservation Efficiency of Remnant Skills.' },
    { name: "Husk of Dreams → Reverie", image: "Armours/BodyArmours/Uniques/HuskOfDreams", chips: [{kind:"neutral", text:"renamed & reworked"}], desc: 'Renamed Reverie. No longer 20–30% increased Flask Charges or 50% less Flask Charges used. Now: grants Rite of Restoration. Non-Unique Life Flasks apply effects constantly. Cannot use Life Flasks, no instant recovery, recovery only to self, 40–60% less Life Flask Recovery.' },
    { name: "Hyrri's Ire", image: "Armours/BodyArmours/Uniques/HyrrisIre", chips: [{kind:"nerf", text:"Evasion", from:"200–250%", to:"100–150%"}, {kind:"nerf", text:"Cold Conv", from:"15–25%", to:"10–20%"}], desc: '100–150% increased Evasion (was 200–250%); Gain 10–20% Damage as Extra Cold (was 15–25%).' },
    { name: "Idol of Uldurn", image: "Amulets/Uniques/IdolOfUldurn", chips: [{kind:"buff", text:"+10–15% Spirit"}, {kind:"nerf", text:"−20–40% Presence AoE"}], desc: 'Unique Amulet now also has 20–40% reduced Presence Area of Effect and 10–15% increased Spirit. [25 May]' },
    { name: "Keeper of the Arc", image: "Armours/Helmets/Uniques/KeeperOfTheArc", chips: [{kind:"buff", text:"AR/ES", from:"150–250%", to:"240–340%"}], desc: '240–340% increased Armour and ES (was 150–250%).' },
    { name: "Levinstone", image: "Rings/Uniques/StoneOfOndar", chips: [{kind:"neutral", text:"reworked"}], desc: 'No longer +1 to all Lightning Skills. Now: Lightning Skills Chain +1 times.' },
    { name: "Megalomaniac", image: "Jewels/DeliriumJewel", chips: [{kind:"buff", text:"drops identified"}], desc: 'Now drops identified.' },
    { name: "Plaguefinger", image: "Armours/Gloves/Uniques/Plaguefinger", chips: [{kind:"neutral", text:"reworked"}], desc: 'Now: Cannot inflict Elemental Ailments.' },
    { name: "Prized Pain", image: "Rings/Uniques/PrizedPain", chips: [{kind:"neutral", text:"reworked"}], desc: 'No longer "deal Thorns to Stunned with Melee Attacks". Now 15–25% chance to deal Thorns to enemies Hit with Melee Attacks.' },
    { name: "Quipolatl's Thesis (Soul Core)", image: "Currency/PerfectSoulCores/SoulCoreScience", chips: [{kind:"neutral", text:"reworked"}], desc: 'Soul Core: in Helmets, a random Skill requiring Glory that generates 50% of its maximum Glory when your Mark activates (was 15%). In Gloves: Energy Shield Recharge starts when your Minions are Reformed (replacing the Curse mana-regen mod). In Body Armour: +75% of Armour also applies to Chaos Damage while on full Energy Shield (was +50%). [25 May]' },
    { name: "Radiant Grief", image: "Armours/Helmets/Uniques/RadiantGrief", chips: [{kind:"buff", text:"Ignite base", from:"100", to:"200"}], desc: 'Enemies in your Presence are Ignited as though dealt 200 Base Fire Damage (was 100).' },
    { name: "Safrin's Resolve", image: "Rings/Uniques/EmberheartSeal", chips: [{kind:"neutral", text:"reworked"}], desc: 'Renamed from Sekhema\'s Resolve (Fire variant). No longer "Lightning Res unaffected by Area Penalties". Now: +5–10% Cold & Lightning Res per Equipped Item with a Fire Res Modifier.' },
    { name: "Seed of Cataclysm", image: "Rings/Uniques/SeedOfCataclysm", chips: [{kind:"nerf", text:"30–50% Crit Spell Dmg Bonus", removed: true}, {kind:"buff", text:"Lucky Spell Crit Dmg"}], desc: 'No longer 30–50% increased Crit Spell Dmg Bonus. Now: 5% reduced Crit Spell Dmg Bonus per recent Spell crit; 15–30% chance for Spell Crit Damage to be Lucky.' },
    { name: "Sine Aequo", image: "Armours/Gloves/Uniques/SineAequo", chips: [{kind:"buff", text:"AR/Ev/ES", from:"100–150%", to:"150–200%"}, {kind:"neutral", text:"reworked"}], desc: 'Now 150–200% AR/Ev/ES (was 100–150%). Lost "20% more Damage to Immobilised". Now 30–50% increased Damage against Immobilised.' },
    { name: "Soul Mantle", image: "Armours/BodyArmours/Uniques/SoulMantle", chips: [{kind:"neutral", text:"reworked"}], desc: 'No longer 20–30% reduced Totem Life. Now +75 to Spirit.' },
    { name: "Svalinn", image: "Offhand/Shields/Uniques/Svalinn", chips: [{kind:"buff", text:"Cast on Block: 0 cost"}, {kind:"buff", text:"+50–100 Runic Ward"}], desc: 'Cast on Block: supported skills cost nothing. +50–100 Runic Ward (does not apply to existing items).' },
    { name: "Unborn Lich (Unique Staff)", image: "Weapons/TwoHandWeapons/Staves/Uniques/KulemaksBirth", chips: [{kind:"buff", text:"granted skills now cost 0 mana"}, {kind:"buff", text:"shorter cooldowns · more impale"}], desc: 'Granted skills reworked: Foul Emergence, Scattering Calamity, Vile Intrusion and Winnowing Flame now cost 0 Mana. Foul Emergence has an 8s cooldown at all levels (was 25–15.5s) with longer Wither and Withering Ground. Vile Intrusion now has 100% increased Impale Magnitude and inflicts 2–3 impales (was 1). Winnowing Flame cast time 0.7s (was 1s) with stronger Grisly Pyres. [25 May]' },
    { name: "Zaida's Longevity", image: "Rings/Uniques/EmberheartSeal", chips: [{kind:"neutral", text:"reworked"}], desc: 'Renamed from Sekhema\'s Resolve (Cold variant). No longer "Lightning Res unaffected by Area Penalties". Now: +5–10% Fire & Lightning Res per Equipped Item with a Cold Res Modifier.' },
    { name: "Zerphi's Genesis", image: "Belts/Uniques/ZerphisGenesis", chips: [{kind:"neutral", text:"reworked"}], desc: 'No longer 10–30% increased Charm Charges used. Now: 50% Charges from used Life Flasks granted to Charms, 15–25% Cost Efficiency on Corrupted-Gem Skills while a Flask Effect is active, 25–50% increased Corrupted Charms Effect Duration.' },
  ],

  // ---------- VAAL CULTIVATION ROLLS ----------
  vaalRolls: [
    { name: "Atziri's Rule (Unique Staff)", image: "Weapons/TwoHandWeapons/Staves/Uniques/AtziriStaff", chips: [{kind:"nerf", text:"Life Cost Eff", from:"20–40%", to:"10–20%"}], desc: 'Vaal-rolled Life Cost Efficiency: 10–20% (was 20–40%).' },
    { name: "Atziri's Splendour (Unique Body)", image: "Armours/BodyArmours/Uniques/AtzirisSplendour", chips: [{kind:"nerf", text:"Max ES", from:"+100–200", to:"+66–100"}], desc: 'Vaal-rolled +Max ES: +66–100 (was +100–200).' },
    { name: "The Covenant (Unique Body)", image: "Armours/BodyArmours/Uniques/TheCovenant", chips: [{kind:"nerf", text:"Life Cost Eff", from:"25–50%", to:"10–25%"}], desc: 'Vaal-rolled Life Cost Efficiency: 10–25% (was 25–50%).' },
    { name: "Hateforge (Unique Gloves)", image: "Armours/Gloves/Uniques/Hateforge", chips: [{kind:"buff", text:"new Vaal roll"}], desc: 'Vaal-rolled +16–30 Max Rage if you used a Glory skill in past 20s.' },
    { name: "Rathpith Globe (Unique Focus)", image: "Offhand/Foci/Uniques/RathpithGlobe", chips: [{kind:"nerf", text:"Life Cost Eff", from:"12–20%", to:"8–15%"}], desc: 'Vaal-rolled Life Cost Efficiency: 8–15% (was 12–20%).' },
    { name: "Shackles of the Wretched (Unique Gloves)", image: "Armours/Gloves/Uniques/ShacklesOfTheWretched", chips: [{kind:"neutral", text:"reworked"}], desc: 'No longer rolls Elemental Ailments other than Freeze. Now rolls 10–15% increased Damage per Curse on you.' },
    { name: "The Vertex (Unique Helmet)", image: "Armours/Helmets/Uniques/TheVertex", chips: [{kind:"neutral", text:"reworked"}], desc: 'No longer rolls +2–4 All Skill Gem Levels. Now rolls +3–5 to Level of All Curse Skill Gems.' },
  ],

  // ---------- NEW UNIQUES ----------
  // Strict policy: an item is classified as "Found in PoE1" ONLY when its
  // exact name resolves to a PoE1 unique-item page on poewiki.net.
  // Everything else goes into "no PoE1 match" — no theme assumptions made.
  newUniques: [
    // -- Found in PoE1 (exact-name PoE1 unique on poewiki.net) --
    // image: local images/poe1/<name>.png (sourced from web.poecdn.com or poewiki).
    { name: "Berek's Grip",           legacy: { slot: "Two-Stone Ring (Cold/Lightning)", note: "PoE1: Domination/Nemesis league-specific. Grants damage leech vs. Shocked/Frozen.", image: "https://web.poecdn.com/image/Art/2DItems/Rings/BereksGrip.png" } },
    { name: "Berek's Pass",           legacy: { slot: "Two-Stone Ring (Fire/Cold)", note: "PoE1: 5000 Armour while Frozen, damage while Ignited.", image: "https://web.poecdn.com/image/Art/2DItems/Rings/BereksPass.png" } },
    { name: "Berek's Respite",        legacy: { slot: "Two-Stone Ring (Fire/Lightning)", note: "PoE1: Killing Shocked/Ignited enemies spreads the ailment.", image: "https://web.poecdn.com/image/Art/2DItems/Rings/BereksRespite.png" } },
    { name: "Brutus' Lead Sprinkler", legacy: { slot: "Sceptre (Ritual)", note: "PoE1: Brutus-themed boss-drop.", image: "images/poe1/BrutusLeadSprinkler.png" } },
    { name: "Facebreaker",            legacy: { slot: "Gloves (Strapped Mitts)", note: "PoE1: classic unarmed-build staple.", image: "images/poe1/Facebreaker.png" } },
    { name: "Geofri's Sanctuary",     legacy: { slot: "Body Armour (Elegant Ringmail)", note: "PoE1: grants Zealot's Oath keystone.", image: "images/poe1/GeofrisSanctuary.png" } },
    { name: "Loreweave",              legacy: { slot: "Body Armour (Elegant Ringmail)", note: "PoE1: max-resists rolling unique.", image: "https://web.poecdn.com/image/Art/2DItems/Armours/BodyArmours/Loreweave.png" } },
    { name: "Mageblood",              legacy: { slot: "Heavy Belt", note: "PoE1: iconic top-tier belt; magic flask effects.", image: "https://web.poecdn.com/image/Art/2DItems/Belts/InjectorBelt.png" } },
    { name: "Split Personality",      legacy: { slot: "Crimson Jewel", note: "PoE1: attribute trade-off based on socket positioning.", image: "images/poe1/SplitPersonality.png" } },
    { name: "Voices",                 legacy: { slot: "Large Cluster Jewel", note: "PoE1: trades passive points for extra Jewel Sockets — far fewer passives, far more socket density.", image: "images/poe1/Voices.png" } },

    // -- No PoE1 entry found (poewiki returned 404 for the exact name) --
    // No assumption made about whether these are new or renamed.
    // "Duality" and "Redemption" share a name with a PoE1 divination card and
    // notable passive respectively — neither is a PoE1 unique ancestor.
    { name: "Duality" },
    { name: "Redemption" },
    { name: "Cat O' Nine Tails" },
    { name: "Decree of Acuity" },
    { name: "Decree of Flight" },
    { name: "Decree of Loyalty" },
    { name: "Eventide Petals" },
    { name: "Eyes of the Runefather" },
    { name: "Farrow's Gift" },
    { name: "Forgotten Warden" },
    { name: "Gatecrasher" },
    { name: "Horror's Flight" },
    { name: "Ironbound" },
    { name: "Liminal Coil" },
    { name: "Mastered Domain" },
    { name: "Nightfall" },
    { name: "Opportunity" },
    { name: "Periphery" },
    { name: "Sadist's Mercy" },
    { name: "Serle's Grit" },
    { name: "Spiteful Floret" },
    { name: "Surge of the Tide" },
    { name: "Sylvan's Effigy" },
    { name: "The Auspex" },
    { name: "The Hollow Mask" },
    { name: "The Ordained" },
    { name: "The Raven's Flock" },
    { name: "The Sunken Vessel" },
    { name: "The Unleashed" },
    { name: "Twisted Empyrean" },
    { name: "Veilpiercer" },
    { name: "Vestige of Darkness" },
  ],

  // ---------- ENDGAME ----------
  endgame: [
    { title: "Atlas", items: [
      "Fixed points of interest at specific locations.",
      "All league mechanics on the Atlas now have introduction quests.",
      "30 new Endgame Map Areas added.",
      "The Atlas has been reset; existing tablets/waystones still function.",
      "Atlas map now supports search; zoom-out range increased.",
      "Content indicators on the map are 50% larger.",
    ]},
    { title: "Waystones & Tablets", items: [
      "Waystones must now be identified before activation.",
      "Orbs of Chance can now be used on Tablets.",
      "Tablets cannot be used on maps without extra content.",
      "Same-type Tablets can stack to increase league content.",
      "Each empty Tablet slot now contributes random non-tablet spawned league content.",
      "Pack Size now also adds a chance for an additional Rare Monster.",
      "The 'of Overpowering' Waystone modifier now grants increased Elemental Ailment Application (was Freeze Buildup).",
      "Halved the Quantity / Experience bonus from increased Monster Effectiveness.",
      "Many modifiers moved between Prefix and Suffix.",
      "Various Waystone modifiers can no longer roll (Baron's, Beastly, Brambled, Doryani's, Enervating, Faridun's, Hallowed, of Nemeses, Perennial's, Rusted, Sacrificial).",
      "Waystones received new 2D art.",
      "Waystone modifiers that added Monster Damage, Penetrated Player Elemental Resistances, or reduced Player Maximum Resistances have had their values reduced across the board. [25 May]",
      "The Waystone modifier granting Extra Projectiles to Monsters has been disabled. [25 May]",
      "Tablet modifiers that are no longer functional have been disabled (e.g. extra Clasped Hands in Breaches, bonus Delirium reward chance). [25 May]",
    ]},
    { title: "Pinnacle Bosses", items: [
      "Two versions of each Pinnacle boss now exist: Quest and Infinite Farm.",
      "Primary, Secondary and Tertiary Calamity Fragments can no longer be obtained.",
      "Existing Calamity Fragments are converted to Crisis Fragments — Primary → Ancient, Secondary → Faded, Tertiary → Weathered. [25 May]",
    ]},
    { title: "Fortress / Origins of Divinity", items: [
      "Maps inside the Fortress grant Atlas Passive Tree points.",
      "Atlas Tree expanded with 300+ nodes; respec unnecessary (full allocation possible).",
      "Multi-choice nodes can be changed at any time.",
      "40+ Ancient Modifiers added that can appear on any map outside the Fortress.",
      "3 new Gateway maps with 2 new bosses · 2 new Citadel maps with 2 new bosses that drop keys.",
      "Added Arbiter of Divinity Pinnacle Boss; killing it 5× completes Fortress maps.",
      "Fixed location completion now shared with party members.",
    ]},
    { title: "Masters of the Atlas", items: [
      "Three masters (Doryani, Hilda, Jado), each with 12 nodes, 4 selectable simultaneously.",
      "All three can be allocated at once; selection changes at any time.",
      "Rows unlock by performing missions for the masters.",
    ]},
    { title: "Other Endgame", items: [
      "Lower base chances for Essences, Azmeri Spirits, Shrines, Strongboxes, Summoning Circles, Rogue Exiles in Maps.",
      "Atlas Passives referring to maps with Powerful Map Bosses now work with Overseer Precursor Tablets.",
      "Halved Damage as Extra from Freezing, Gloom, Meteoric, and Tempest Shrines.",
      "Omen of Chaotic Rarity, Quantity, and Monsters have inverted functionality.",
      "New Omen of Chaotic Effectiveness; up to 3 Chaotic omens may be used simultaneously.",
      "The base duration of all Shrines is now 45 seconds. [25 May]",
      "The 'Contains Identified Items' Strongbox modifier can no longer roll. [25 May]",
    ]},
  ],

  // ---------- CURRENCY ----------
  currency: [
    { title: "Currency Drop Rates", sub: "Greater Orbs scarcer · Divines easier · level gates loosened", image: "presskit-web/Inscribe_Runic_Symbols.jpg", items: [
      "Divine Orbs are now more common.",
      "Greater / Perfect currencies somewhat rarer; Transmutation & Augmentation significantly rarer.",
      "Greater Orbs of Transmutation/Augmentation: min mod level 44 (was 55); now drop from Act 4.",
      "Fate of the Vaal Currency items now stack to 5,000.",
      "Legacy Expedition Currency can now be sold to vendors for Gold. [25 May]",
    ]},
    { title: "Corruption", sub: "Value-aware randomisation · Omen of Corruption retired", image: "presskit-web/Vaal_CorruptionAltar_Cinematic.jpg", items: [
      "Corruption that randomises modifier values now multiplies each modifier based on current value.",
      "Sanctifying multiplies modifier value based on current value.",
      "Omen of Corruption can no longer be obtained.",
    ]},
    { title: "New Crafting Systems", sub: "Verisium Runeforging · Genesis Tree · Liquid Emotions · Catalysts", image: "presskit-web/GenesisTreeCinematic.jpg", items: [
      "Verisium Runeforging (Runes of Aldur) — upgrade Unique base types.",
      "Genesis Tree (Breach) — craft new ring/amulet/belt bases from Wombgifts and Hiveblood.",
      "Liquid Emotions (Delirium) — craft additional mods on Jewels.",
      "Potent Emotions and Ancient Emotions (Delirium) — for Timelost Jewels.",
      "Catalysts: no longer drop from monsters; 12 new Catalysts add quality mods to Jewels.",
      "Alternate Quality items now salvageable for partial Catalyst return.",
      "Remnants can now craft 21 Kalguuran Skills (Animus Exchange, Frostflame Nova, Skyfall, Voltaic Barrier, Wardbound Minions, and more). [25 May]",
      "All crafted modifiers are now guaranteed, but an item can hold only one at a time. [25 May]",
      "Desecrated modifiers no longer count as crafted modifiers; items are limited to one Desecrated modifier. [25 May]",
    ]},
    { title: "New Currency Items", sub: "Each new league mechanic brings its own currency stream", image: "presskit-web/Remnant.jpg", items: [
      "Verisium metal (Runes of Aldur).",
      "13 Alloy currencies (Runes of Aldur).",
      "3 Fluxes — transform resistances (Runes of Aldur).",
      "Hiveblood & Wombgifts (Breach).",
      "Breachstone Splinters now drop in Breaches.",
      "10 new Ancient Emotions, 3 Ancient Potent emotions (Delirium).",
    ]},
    { title: "Item Affix Changes", sub: "Leech & bleed suffixes rebalanced", cols2: true, items: [
      "Leech modifiers on Gloves and Rings (% of Physical Attack Damage leeched as Life/Mana) now roll from a lower level, and their first tiers were removed. [25 May]",
      "Bleed/leech suffixes — of the Locust, Remora, Lamprey, Vampire, Parched, Arid, Drought and Desperate — now roll from lower item levels. [25 May]",
      "'of the Vampire' and 'of the Desperate' can now also roll on Bows and Crossbows. [25 May]",
    ]},
  ],

  // ---------- MONSTER BALANCE ----------
  monsters: [
    { kind: "buff", text: "Culling Strike threshold for Normal enemies raised to 35% (was 30%) — easier to cull.", chips:[{kind:"buff", text:"30% → 35%"}] },
    { kind: "buff", text: "Monster Leech resistance starts at a later level and is lower at every level.", chips:[{kind:"buff", text:"easier to leech"}] },
    { kind: "buff", text: "Essence monster packs are now affected by Pack Size modifiers.", chips:[{kind:"buff", text:"Pack Size scales Essence"}] },
    { kind: "buff", text: "Azmeri Spirits released from monsters retain their power and empower other spirits.", chips:[{kind:"buff", text:"spirits compound"}] },
    { kind: "neutral", text: "Priest of the Sun beam no longer ignores walls.", chips:[{kind:"neutral", text:"clarity fix"}] },
    { kind: "neutral", text: "Viper Napuatzi arena refills flask charges when soldiers constrict space.", chips:[{kind:"buff", text:"flask refill"}] },
    { kind: "neutral", text: "Burning Dead deal partial Fire damage instead of pure Physical.", chips:[{kind:"neutral", text:"damage type split"}] },
    { kind: "neutral", text: "Lightning Doryani Elite Monster visuals improved.", chips:[{kind:"neutral", text:"vfx"}] },
    { kind: "nerf", text: "Culling Strike thresholds are no longer lowered in party play for non-unique monsters; unique monsters are still scaled by party size. [25 May]", chips:[{kind:"nerf", text:"no party culling (non-unique)"}] },
    { kind: "neutral", text: "Ignites reflected onto a player can no longer spread to other enemies from the player. [25 May]", chips:[{kind:"neutral", text:"reflected Ignite can't spread"}] },
    { kind: "neutral", text: "The Bogfelled Commoner now has a Spectre variant for its boss version. [25 May]", chips:[{kind:"neutral", text:"new Spectre"}] },
  ],

  // ---------- CAMPAIGN / UX ----------
  campaign: [
    { kind: "buff", text: "Replayability: directional visuals added to multiple areas to guide experienced players.", chips:[{kind:"buff", text:"directional cues"}] },
    { kind: "buff", text: "Some areas have been shortened.", chips:[{kind:"buff", text:"shorter campaign"}] },
    { kind: "buff", text: "Second Dreadnaught area removed; Act 2 boss is now in The Dreadnaught.", chips:[{kind:"buff", text:"fewer transitions"}] },
    { kind: "neutral", text: "Act 3 area order has been somewhat rearranged.", chips:[{kind:"neutral", text:"reordered"}] },
    { kind: "buff", text: "Waterways levers replaced with pressure pads; water pre-drained for final part.", chips:[{kind:"buff", text:"smoother flow"}] },
    { kind: "buff", text: "Monster density in second-half campaign reduced — particularly Interludes.", chips:[{kind:"buff", text:"density reduced"}] },
    { kind: "buff", text: "Popup size is now adjustable for accessibility.", chips:[{kind:"buff", text:"accessibility"}] },
    { kind: "buff", text: "Dedicated dodge-roll keybind added.", chips:[{kind:"buff", text:"new keybind"}] },
    { kind: "buff", text: "Controller: hideout top-down camera, quick currency switching.", chips:[{kind:"buff", text:"controller QoL"}] },
    { kind: "buff", text: "Trade: Shift-Alt click on items for quick-search.", chips:[{kind:"buff", text:"trade shortcut"}] },
    { kind: "buff", text: "Build guide support — downloadable .build files.", chips:[{kind:"buff", text:"build sharing"}] },
  ],

  // ---------- REMOVED ----------
  removed: [
    { kind: "nerf", text: "Expedition League temporarily disabled on Standard." },
    { kind: "nerf", text: "Recombinator disabled." },
    { kind: "nerf", text: "Omen of Recombination removed (existing copies deleted on login)." },
    { kind: "nerf", text: "Forgotten By Time Expedition Precursor Tablet temporarily removed from drops." },
    { kind: "nerf", text: "Omen of Corruption can no longer be obtained." },
    { kind: "nerf", text: "Infernal Legion III: can no longer be obtained." },
    { kind: "nerf", text: "Overextend: can no longer be obtained." },
    { kind: "nerf", text: "Shock Conduction II: can no longer be obtained." },
    { kind: "nerf", text: "Desecrated modifiers granting Instant Leech can no longer roll." },
    { kind: "nerf", text: "Desecrated Map Modifier 'of Union' is no longer functional." },
    { kind: "nerf", text: "Removed from the Currency Exchange: Black Scythe Artifact, Broken Circle Artifact, Exotic Coinage, Order Artifact, Petition Splinter, Runic Splinter, Sun Artifact. [25 May]" },
    { kind: "nerf", text: "Omen of Corruption and the Homogenising Coronation / Exaltation Omens now appear on the Currency Exchange only in Standard leagues. [25 May]" },
    { kind: "nerf", text: "Rog, Gwennen, Dannig and Tujen in existing hideouts are now non-interactable doodads — they can no longer be invited to your hideout. [25 May]" },
    { kind: "nerf", text: "Road Warrior Unique Body Armour can no longer be obtained. [25 May]" },
    { kind: "nerf", text: "The 'of the Parasite' and 'of the Thirsty' suffix modifiers can no longer roll. [25 May]" },
  ],

  // ---------- PATCH NOTE UPDATES (GGG's official post-release "Updates to Patch Notes") ----------
  // Verbatim from the official thread's "Updates to Patch Notes" section, newest first.
  patchUpdates: [
    {
      date: "25 May 2026",
      items: [
        `Added 21 Kalguuran Skills that can be crafted from Remnants: Animus Exchange, Animus Splinters, Bitter Dead, Conductive Runes, Detonate Living, Eternal March, Explosive Transmutation, Fragments of the Past, Frostflame Nova, Grim Pillars, Hollow Shell, Leylines, Powered by Verisium, Rain of Blades, Refutation, Remnants of Kalguur, Repulsion, Runic Reprieve, Skyfall, Triskelion Cascade, Verisium Manifestations, Voltaic Barrier, and Wardbound Minions.`,
        `The following items have been removed from the Currency Exchange: Black Scythe Artifact, Broken Circle Artifact, Exotic Coinage, Order Artifact, Petition Splinter, Runic Splinter, and Sun Artifact.`,
        `The following items only appear on the Currency Exchange in Standard Leagues: Omen of Corruption, Omen of Homogenising Coronation, and Omen of Homogenising Exaltation.`,
        `Legacy Expedition Currency can now be sold to vendors for Gold.`,
        `Rog, Gwennen, Dannig and Tujen in existing hideouts have been converted to non-interactable doodads. Speaking to these NPCs will no longer invite them to your hideout.`,
        `Existing Primary Calamity Fragments have been converted to Ancient Crisis Fragments.`,
        `Existing Secondary Calamity Fragments have been converted to Faded Crisis Fragments.`,
        `Existing Tertiary Calamity Fragments have been converted to Weathered Crisis Fragments.`,
        `Waystone Modifiers that added Damage to Monsters, Penetrated Player Elemental Resistances, or reduced the Players Maximum Resistances have had their values reduced across the board.`,
        `The Waystone Modifier that provided Extra Projectiles to Monsters has been disabled.`,
        `The base duration of all Shrines is now 45 seconds.`,
        `The "Contains Identified Items" modifier on Strongboxes can no longer roll.`,
        `Tablet Modifiers that are no longer functional have been disabled, such as Breaches in Map contain additional Clasped Hands, or Delirium Encounters in affected Map have a chance to generate an additional Reward.`,
        `Ignites that are reflected onto a player can no longer spread to other enemies from the player.`,
        `Culling strike thresholds are no longer lowered in party play for non-unique monsters. They are still lowered based on the number of players in the party for unique monsters.`,
        `New Lineage Support Gem, Olroth's Hubris.`,
        `Ice Nova: Is no longer able to originate from Frostbolt while cascading sideways.`,
        `Primal Strikes: Now has a minimum Gem level of 9 (previously 7).`,
        `Tame Beast: Summoned Beasts now deal 40% more damage at Gem Level 9 scaling up to 84% at Gem Level 20. Now immediately summons newly Tamed Beasts if you have enough spirit. Now has a minimum Gem level of 7 (previously 9).`,
        `Spell Cascade: Is no longer limited to supporting spells you use yourself.`,
        `The Collapsing Horizon Unique Quarterstaff now grants 100% increased Elemental Damage (previously 100% increased Elemental Damage with Attacks).`,
        `The Idol of Uldurn Unique Amulet now also has 20-40% reduced Presence Area of Effect, and 10-15% increased Spirit.`,
        `The Road Warrior Unique Body Armour can no longer be obtained.`,
        `The Skills granted by the Unborn Lich Unique Staff have received the following changes:`,
        `— His Foul Emergence now has a Mana Cost of 0 (previously 18-189 at gem levels 1-20) and a Cooldown Time of 8 seconds at all levels (previously 25-15.5 at Gem levels 1-20). Inflicted Wither now lasts 10 seconds (previously 8) and Withering Ground duration is now 8 seconds (previously 5).`,
        `— His Scattering Calamity now has a Mana Cost of 0 (previously 3-37 at Gem levels 1-20).`,
        `— His Vile Intrusion now has a Mana Cost of 0 (previously 8-83 at Gem levels 1-20). Now has 100% increased Impale Magnitude at all levels (previously 2-40% at Gem levels 1-20), and now inflicts 2 impales at Gem level 20 and 3 impales at Gem level 25 (previously 1 at all levels).`,
        `— His Winnowing Flame now has a Cast Time of 0.7 seconds (previously 1 second) and has a Mana Cost of 0 (previously 6-68). Grisly Pyres triggered by Consuming Ignites now have a radius of 2 metres (previously 1.5 metres), deal 30% of the highest expected remaining Damage of the Consumed Ignites (previously 25%) and have a shorter delay before dealing its damage.`,
        `All crafted modifiers are now guaranteed, but items can only have 1 crafted modifier at a time. Desecrated modifiers no longer count as crafted modifiers, but items are limited to 1 Desecrated modifier.`,
        `The Quipolatl's Thesis Soul Core is now a random Skill that requires Glory which generates 50% of its maximum Glory when your Mark Activates when socketed in Helmets (previously 15%). When socketed in Gloves, it now grants Your Energy Shield Recharge starts when your Minions are Reformed (previously Each Runic Inscription from your Curse Skills causes you to Regenerate Mana per second equal to 10% of that Skill's Mana Cost). When socketed in a Body Armour, it now grants +75% of Armour also applies to Chaos Damage while on full Energy Shield (previously +50%).`,
        `The Guatelitzi's Thesis Soul Core now grants Gain Armour equal to 35% of Life Lost from Hits in the past 8 seconds when socketed in Helmets (previously 25%).`,
        `Modifiers on Gloves and Rings granting Leech a percentage of Physical Attack Damage as Life/Mana have been adjusted to roll at a lower level, and the first tiers have been removed.`,
        `The "of the Parasite" and "of the Thirsty" Suffix Modifiers can no longer roll.`,
        `The "of the Locust" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 21 (previously 38).`,
        `The "of the Remora" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 38 (previously 54).`,
        `The "of the Lamprey" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 54 (previously 68).`,
        `The "of the Vampire" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 65 (previously 81).`,
        `The "of the Parched" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 21 (previously 38).`,
        `The "of the Arid" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 38 (previously 54).`,
        `The "of the Drought" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 54 (previously 68).`,
        `The "of the Desperate" Suffix Modifier now rolls on Gloves, Rings and Martial Weapons from Level 65 (previously 81).`,
        `The "of the Vampire" and "of the Desperate" Modifiers can now also roll on Bows and Crossbows.`,
        `The Bogfelled Commoner now has a Spectre variant for the boss version of the monster.`,
        `Fixed a bug where Arc would gain its Lightning Infused stats when not spending a Lightning Infusion.`,
        `Fixed a bug that could cause support gems that apply to "Skills you use yourself" to apply to skills being used by clones of you, such as Mirage Archer or Feral Invocation, or to minions you summon.`,
        `Fixed several bugs that prevented support gems from supporting Unearth.`,
        `Fixed various bugs that allowed disabled flasks to still be used by some effects.`,
        `Fixed various bugs with bleed modifiers not working on bleeds inflicted by Spell Hits.`,
        `Fixed a bug that caused Bone Constructs summoned by Unearth to stand still when summoned by a totem.`,
        `Fixed a bug that caused the Dialla's Desire Lineage Support Gem to still function when it was socketed but disabled.`,
        `Fixed a bug where some monsters in the Trial of the Sekhemas were not activating, preventing players from decreasing the timer in the Hourglass Trials.`,
        `Fixed a bug where modifiers to melee strike range were described in game units instead of metres. This results in the displayed values being 10 times smaller, but is not a functional change.`,
      ],
    },
    {
      date: "22 May 2026",
      items: [
        `After unlocking Unique Verisium Runeforging in Act 3 you can upgrade the base type of Unique Weapons and Armours that drop at levels lower than 55. Upgraded Unique Weapons will have higher damage, and Upgraded Armours will have increased base defences as well as Runic Ward, allowing them to be more competitive at higher levels. Unique Armours above level 55 can still be Runeforged to modify their defences to include Runic Ward at the cost of reducing their other defences similar to the base types.`,
        `Ghost Dance: The interval between gaining Ghost Shrouds is no longer a duration. It now has "Modifiers to Cooldown Recovery Rate also apply to Ghost Shroud gain frequency". It also now has "When Hit, lose a Ghost Shroud", and "Regenerate Energy Shield equal to 2% of your Evasion Rating per second if you have lost a Ghost Shroud Recently". Now gains a Ghost Shroud every 11.7-10.1 seconds at Gem levels 4-20 (previously 7.6-6.1).`,
      ],
    },
  ],

  // ---------- SITE CHANGELOG (changes to this codex page, newest first) ----------
  siteChangelog: [
    {
      date: "26 May 2026",
      items: [
        `Added a full interactive Passive Skill Tree — the complete PoE2 0.5 tree rendered on a single canvas, built from GGG's official skill-tree export, with drag-to-pan, scroll-to-zoom, fullscreen, and hover tooltips for every node, notable and keystone.`,
        `Added an ascendancy selector that centres any ascendancy's wheel over its official illustration — including the new Martial Artist and Spirit Walker — framed by the class ring, with themed cluster backgrounds that light up on hover and the Druid Oracle's conditional "paths not taken" shown in blue.`,
        `The tree's data and artwork (~2 MB) load on demand only when you scroll to that section, so the rest of the page stays light.`,
      ],
    },
    {
      date: "25 May 2026",
      items: [
        `Added a Patch Note Updates section carrying GGG's official post-release updates (22 & 25 May 2026).`,
        `Folded those updates into the relevant sections — Skills (Ice Nova, Primal Strikes, Tame Beast, Ghost Dance), Supports (Olroth's Hubris, Spell Cascade), Uniques (Collapsing Horizon, Idol of Uldurn, Unborn Lich, Quipolatl's & Guatelitzi's Soul Cores), Currency/Crafting, Endgame, Monsters and Removed — each marked with a dated update badge. Pure bug-fixes remain in the Patch Note Updates section.`,
        `Added this changelog to track changes made to this page going forward.`,
      ],
    },
  ],
};
