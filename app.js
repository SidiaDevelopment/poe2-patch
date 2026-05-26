/* ============================================================
   Return of the Ancients — codex renderer (v2)
   ============================================================ */

(function () {
  const D = window.PATCH_DATA;

  // ---------- icon URL builder ----------
  // Resolves icon tokens to local images/ paths (downloaded from poe2db).
  function iconUrl(icon) {
    if (!icon) return null;
    if (icon.startsWith("http")) return icon;
    if (icon.startsWith("4k/"))  return "images/skill-4k/" + icon.slice(3) + ".webp";
    if (icon.startsWith("s/"))   return "images/support/" + icon.slice(2) + "support.webp";
    if (icon.startsWith("ui/"))  return "images/ui/" + icon.slice(3) + ".webp";
    if (icon.startsWith("gem/")) return "images/gem/" + icon.slice(4) + ".webp";
    return "images/skill/" + icon + ".webp";
  }

  const POE2DB = "https://poe2db.tw/us/";
  const POEWIKI = "https://www.poewiki.net/wiki/";

  function poe2dbLink(name) {
    return POE2DB + encodeURIComponent(name.replace(/ /g, "_"));
  }
  function poewikiLink(name) {
    return POEWIKI + encodeURIComponent(name.replace(/ /g, "_"));
  }

  // Map external poecdn URLs to bundled local copies under images/poe1/.
  function localizeLegacyImage(url) {
    if (!url) return null;
    const m = url.match(/^https?:\/\/web\.poecdn\.com\/image\/Art\/2DItems\/(.+)$/);
    return m ? "images/poe1/" + m[1] : url;
  }

  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null) continue;
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const child of children.flat()) {
      if (child == null || child === false) continue;
      if (typeof child === "string") e.appendChild(document.createTextNode(child));
      else e.appendChild(child);
    }
    return e;
  }

  // Render a trailing "[25 May]"-style marker in a string as a small dated tag.
  // Returns an array of children (text + optional <span class="upd-tag">) that
  // el() flattens. Strings without a marker pass through unchanged.
  function tagText(str) {
    if (typeof str !== "string") return [str];
    const m = str.match(/^(.*?)\s*\[([^\]]+)\]\s*$/);
    return m ? [m[1], el("span", { class: "upd-tag" }, m[2])] : [str];
  }

  // ---------- KIND BADGE (single overall indicator per card) ----------
  // Maps `kind` to a glyph and CSS class.
  function kindMark(kind, opts = {}) {
    if (!kind) return null;
    const map = {
      buff:    { glyph: "▲", title: "Overall buff"   },
      nerf:    { glyph: "▼", title: "Overall nerf"   },
      mixed:   { glyph: "✦", title: "Mixed changes"  },
      rework:  { glyph: "↻", title: "Reworked"       },
      neutral: { glyph: "↻", title: "Reworked / changed" },
      flag:    { glyph: "⚑", title: "Flagged · verify" },
    };
    const m = map[kind] || map.neutral;
    return el("span", { class: "kind-mark " + kind, title: opts.title || m.title }, m.glyph);
  }

  // ---------- AUTO-GENERATED change lines from chips ----------
  // For each chip we render either:
  //   "<tag>label</tag> <was>X</was> → <new>Y</new>"   (from/to present)
  //   "+ <new>text</new>"                              (kind=buff, no from/to)
  //   "− <new>text</new>"                              (kind=nerf, no from/to)
  //   "↻ <text>"                                       (kind=neutral, no from/to)
  function changeLines(chips, opts = {}) {
    if (!chips || !chips.length) return null;
    const ul = el("ul", { class: "changes" });
    chips.forEach(c => {
      if (!c) return;
      if (c.kind === "flag") return;  // flags surface separately
      const li = document.createElement("li");
      if (c.from && c.to) {
        if (c.text) li.appendChild(el("span", { class: "val-tag" }, c.text));
        // Old value: struck-through only for buff/nerf (something IS replaced).
        // For a rework, both sides are "current state, different angle" — old is just muted.
        const oldCls = (c.kind === "buff" || c.kind === "nerf") ? "val val-was" : "val val-mute";
        li.appendChild(el("span", { class: oldCls }, c.from));
        li.appendChild(el("span", { class: "val-arrow" }, " → "));
        const newCls = c.kind === "buff" ? "val val-up"
                     : c.kind === "nerf" ? "val val-down"
                     :                     "val val-rework";
        li.appendChild(el("span", { class: newCls }, c.to));
      } else {
        const text = c.text || "";
        const lossClass = c.removed ? " ch-loss" : "";
        if (c.kind === "buff") {
          li.className = "ch-add" + lossClass;
          li.appendChild(el("span", { class: "val val-up" }, text));
        } else if (c.kind === "nerf") {
          li.className = "ch-rem" + lossClass;
          li.appendChild(el("span", { class: "val val-down" }, text));
        } else {
          li.className = "ch-rework" + lossClass;
          // "reworked" text is now redundant with the REWORKED badge — skip it.
          if (text.toLowerCase() !== "reworked") {
            li.appendChild(el("span", { class: "val val-mute" }, text));
          }
        }
      }
      ul.appendChild(li);
    });
    return ul.children.length ? ul : null;
  }

  // legacy chip() helper - used in legend & modals only
  function chip(c) {
    if (!c) return null;
    if (c.kind === "flag") return el("span", { class: "chip chip-flag" }, c.text || "⚑ flagged");
    if (c.from && c.to) {
      const dir = c.kind === "buff" ? "▲" : c.kind === "nerf" ? "▼" : "→";
      const cls =
        c.kind === "buff" ? "chip chip-buff" :
        c.kind === "nerf" ? "chip chip-nerf" :
        "chip chip-neutral";
      return el("span", { class: cls, title: c.text || "" },
        el("span", { class: "arr" }, dir),
        c.text ? document.createTextNode(c.text + " ") : null,
        document.createTextNode(`${c.from} → ${c.to}`)
      );
    }
    const cls =
      c.kind === "buff" ? "chip chip-buff" :
      c.kind === "nerf" ? "chip chip-nerf" :
      "chip chip-neutral";
    const arr = c.kind === "buff" ? "▲" : c.kind === "nerf" ? "▼" : null;
    return el("span", { class: cls },
      arr ? el("span", { class: "arr" }, arr) : null,
      c.text || ""
    );
  }

  function cardKindClass(chips) {
    if (!chips || !chips.length) return "has-neutral";
    const kinds = new Set(chips.map(c => c.kind));
    kinds.delete("flag");
    if (kinds.size === 0) return "has-neutral";
    if (kinds.size === 1) return "has-" + [...kinds][0];
    if (kinds.has("buff") && kinds.has("nerf")) return "has-mixed";
    return "has-neutral";
  }

  function flagIcon(text) {
    return text
      ? el("div", { style: "margin-top:8px;" }, chip({ kind: "flag", text: "⚑ " + text }))
      : null;
  }

  // ---------- HERO STATS ----------
  const heroStatsRoot = document.getElementById("hero-stats");
  D.heroStats.forEach(s => {
    heroStatsRoot.appendChild(
      el("div", { class: "hero-stat" },
        el("span", { class: "hero-stat-num" }, s.num),
        el("span", { class: "hero-stat-label" }, s.label)
      )
    );
  });

  // ---------- HERO COUNTDOWN ----------
  const cdRoot = document.getElementById("hero-countdown");
  if (cdRoot && D.launch && D.launch.iso) {
    const target = new Date(D.launch.iso).getTime();
    const launchDate = new Date(D.launch.iso);
    const localHint = launchDate.toLocaleString(undefined, {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
      hour: "numeric", minute: "2-digit", timeZoneName: "short"
    });

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function renderCountdown() {
      const now = Date.now();
      const diff = target - now;
      cdRoot.innerHTML = "";
      cdRoot.appendChild(el("div", { class: "hero-countdown-label" },
        D.launch.label + "  ·  " + localHint
      ));

      if (diff <= 0) {
        cdRoot.classList.add("live");
        cdRoot.appendChild(el("div", { class: "hero-countdown-live" }, "Live now"));
        const since = Math.abs(diff);
        const sd = Math.floor(since / 86400000);
        const sh = Math.floor((since % 86400000) / 3600000);
        cdRoot.appendChild(el("div", { class: "hero-countdown-since" },
          sd > 0 ? `Released ${sd} day${sd === 1 ? "" : "s"} ${sh} hour${sh === 1 ? "" : "s"} ago` : `Released ${sh} hour${sh === 1 ? "" : "s"} ago`
        ));
        return;
      }
      cdRoot.classList.remove("live");
      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff % 3600000) / 60000);
      const secs  = Math.floor((diff % 60000) / 1000);
      const grid = el("div", { class: "hero-countdown-grid" });
      [["days", days], ["hours", hours], ["minutes", mins], ["seconds", secs]].forEach(([u, v]) => {
        grid.appendChild(
          el("div", { class: "hero-countdown-cell" },
            el("span", { class: "hero-countdown-num" }, pad(v)),
            el("span", { class: "hero-countdown-unit" }, u)
          )
        );
      });
      cdRoot.appendChild(grid);
    }

    renderCountdown();
    setInterval(renderCountdown, 1000);
  }

  // ---------- PILLARS ----------
  const pillarsRoot = document.getElementById("content-pillars");
  D.pillars.forEach(p => {
    pillarsRoot.appendChild(
      el("div", { class: "pillar" + (p.image ? " has-img" : "") },
        p.image ? el("div", { class: "pillar-img" },
          el("img", { src: "images/" + p.image, alt: p.name, loading: "lazy", fetchpriority: "low" })
        ) : null,
        el("span", { class: "pillar-tag" }, p.tag),
        el("h3", null, p.name),
        el("p", null, p.body)
      )
    );
  });

  // ---------- LEAGUES ----------
  const leagueRoot = document.getElementById("league-grid");
  D.leagues.forEach(l => {
    const ul = el("ul", null, ...l.bullets.map(b => el("li", null, b)));
    leagueRoot.appendChild(
      el("article", { class: "league-card" + (l.featured ? " featured" : "") + (l.image ? " has-img" : "") + (l.isNew ? " is-new" : "") },
        l.image ? el("div", { class: "league-img" },
          el("img", { src: "images/" + l.image, alt: l.name, loading: "lazy", fetchpriority: "low" })
        ) : null,
        el("div", { class: "league-body" },
          el("div", { class: "league-banner" },
            el("span", { class: "league-tag" }, l.tag),
            l.isNew ? el("span", { class: "league-new-tag" }, "New") : null,
            el("a", { class: "league-tag", href: poe2dbLink(l.name), target: "_blank", rel: "noopener" }, "poe2db ↗")
          ),
          el("h3", { class: "league-name" }, l.name),
          l.hub ? el("div", { class: "league-hub" }, l.hub) : null,
          ul
        )
      )
    );
  });

  // ---------- ASCENDANCIES ----------
  const ascRoot = document.getElementById("ascendancy-grid");

  // Small qualitative tags that we still surface as a badge after the change name.
  // Anything with from/to gets inlined inside the description instead.
  function ascBadge(c) {
    if (!c || !c.text || c.from) return null;
    const kindCls =
      c.kind === "buff" ? "asc-badge buff" :
      c.kind === "nerf" ? "asc-badge nerf" :
      "asc-badge rework";
    return el("span", { class: kindCls }, c.text);
  }

  function ascDesc(c) {
    const node = el("div", { class: "asc-change-desc" });
    node.appendChild(document.createTextNode(c.desc));
    if (c.chip && c.chip.from && c.chip.to) {
      node.appendChild(document.createTextNode("  "));
      node.appendChild(el("span", { class: "val val-was" }, c.chip.from));
      node.appendChild(el("span", { class: "val-arrow" }, " → "));
      const k = c.chip.kind;
      const cls = k === "buff" ? "val val-up" : k === "nerf" ? "val val-down" : "val val-rework";
      node.appendChild(el("span", { class: cls }, c.chip.to));
    }
    return node;
  }

  // Layout order: regular cards first, then a forced Blood Mage + Witchhunter
  // pair wrapper, then any wide cards (Chronomancer) on their own full row.
  const isPair = (a) => a.name === "Blood Mage" || a.name === "Witchhunter";
  const isWide = (a) => a.changes.length >= 5;
  const ascSorted = [
    ...D.ascendancies.filter(a => !isPair(a) && !isWide(a)),
    ...D.ascendancies.filter(isPair),
    ...D.ascendancies.filter(isWide),
  ];
  const pairWrap = el("div", { class: "asc-pair" });
  let pairAppended = false;
  ascSorted.forEach(a => {
    const list = el("ul", { class: "asc-changes" },
      ...a.changes.map(c =>
        el("li", { class: "asc-change" },
          el("div", { class: "asc-change-row" },
            el("div", { class: "asc-change-name" }, c.name),
            ascBadge(c.chip)
          ),
          ascDesc(c)
        )
      )
    );
    // overall kind for an ascendancy: derive from its child chips
    const allKinds = a.changes.map(c => c.chip && c.chip.kind).filter(Boolean);
    let overall = "neutral";
    if (allKinds.length) {
      const buff = allKinds.filter(k => k === "buff").length;
      const nerf = allKinds.filter(k => k === "nerf").length;
      if (buff && nerf) overall = "mixed";
      else if (buff) overall = "buff";
      else if (nerf) overall = "nerf";
      else overall = "neutral";
    }
    if (a.isNew) overall = "buff";
    const classIconUrl = iconUrl(a.classIcon);
    const markEl = classIconUrl
      ? el("span", { class: "asc-mark asc-mark-img" },
          el("img", { src: classIconUrl, alt: a.cls, loading: "eager", fetchpriority: "high",
            onerror: function () {
              const p = this.parentNode;
              if (!p) return;
              p.classList.remove("asc-mark-img");
              p.textContent = a.mark;
            }
          })
        )
      : el("span", { class: "asc-mark" }, a.mark);
    const wide = isWide(a);
    const card = el("article", { class: "asc-card" + (a.isNew ? " new" : "") + (wide ? " asc-card-wide" : "") + (a.splash ? " has-splash" : "") },
      kindMark(overall),
      a.splash ? el("div", { class: "asc-splash" },
        el("img", { src: "images/" + a.splash, alt: a.name, loading: "lazy", fetchpriority: "low" })
      ) : null,
      el("div", { class: "asc-header" },
        markEl,
        el("div", null,
          el("h3", { class: "asc-name" }, a.name),
          el("div", { class: "asc-class" }, a.cls)
        ),
        a.isNew ? el("span", { class: "asc-new-tag" }, "New") : null
      ),
      list
    );
    if (isPair(a)) {
      pairWrap.appendChild(card);
      if (!pairAppended) { ascRoot.appendChild(pairWrap); pairAppended = true; }
    } else {
      ascRoot.appendChild(card);
    }
  });

  // ---------- SKILLS ----------
  const skillRoot = document.getElementById("skill-grid");
  let skillSort = "alpha";

  function renderSkills() {
    skillRoot.innerHTML = "";
    let list = [...D.skills];
    const q = (document.getElementById("skills-search").value || "").toLowerCase().trim();

    if (q) list = list.filter(s => s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q));


    if (skillSort === "alpha") list.sort((a, b) => a.name.localeCompare(b.name));
    if (skillSort === "buffs") {
      list.sort((a, b) => countKind(b.chips, "buff") - countKind(a.chips, "buff"));
    }
    if (skillSort === "nerfs") {
      list.sort((a, b) => countKind(b.chips, "nerf") - countKind(a.chips, "nerf"));
    }

    list.forEach(s => skillRoot.appendChild(skillCard(s)));
    if (!list.length) {
      skillRoot.appendChild(el("div", { class: "list-row" }, "No skills match the current filters."));
    }
  }

  function countKind(chips, kind) {
    return (chips || []).filter(c => c.kind === kind).length;
  }

  function skillCard(s) {
    const card = el("article", { class: "skill-card " + cardKindClass(s.chips), tabindex: "0" });
    const iconBox = el("div", { class: "skill-icon" });
    const iurl = iconUrl(s.icon);
    if (iurl) {
      const img = el("img", {
        src: iurl,
        alt: s.name,
        loading: "eager",
        fetchpriority: "high",
        referrerpolicy: "no-referrer",
        onerror: function () { this.style.display = "none"; iconBox.appendChild(el("span", { class: "icon-fallback" }, s.name[0])); }
      });
      iconBox.appendChild(img);
    } else {
      iconBox.appendChild(el("span", { class: "icon-fallback" }, s.name[0]));
    }

    const head = el("div", { class: "skill-card-head" },
      iconBox,
      el("div", { class: "skill-info" },
        el("h3", { class: "skill-name" }, s.name),
        el("div", { class: "skill-tag" }, s.tag)
      )
    );

    card.appendChild(kindMark(s.kind));
    card.appendChild(head);
    const cl = changeLines(s.chips);
    if (cl) card.appendChild(cl);
    card.appendChild(el("span", { class: "skill-expand-hint" }, "click for verbatim"));
    card.addEventListener("click", () => openModal({
      title: s.name,
      sub: s.tag,
      bullets: s.notes,
      links: [
        { href: poe2dbLink(s.name), label: "poe2db ↗" },
      ]
    }));
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); } });
    return card;
  }

  renderSkills();
  document.getElementById("skills-search").addEventListener("input", renderSkills);
  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      skillSort = btn.dataset.sort;
      renderSkills();
    });
  });

  // ---------- SUPPORTS ----------
  const supRoot = document.getElementById("support-grid");
  D.supports.forEach(s => {
    const overall = s.kind || cardKindClass(s.chips).replace("has-", "");
    const iconBox = el("div", { class: "skill-icon support-icon" });
    const iurl = iconUrl(s.icon);
    if (iurl) {
      const img = el("img", {
        src: iurl, alt: s.name, loading: "eager", fetchpriority: "high", referrerpolicy: "no-referrer",
        onerror: function () { this.style.display = "none"; iconBox.appendChild(el("span", { class: "icon-fallback" }, s.name[0])); }
      });
      iconBox.appendChild(img);
    } else {
      iconBox.appendChild(el("span", { class: "icon-fallback" }, s.name[0]));
    }
    supRoot.appendChild(
      el("article", { class: "support-card " + cardKindClass(s.chips) },
        kindMark(overall),
        el("div", { class: "skill-card-head" },
          iconBox,
          el("div", { class: "skill-info" },
            el("h4", { class: "support-name" }, s.name)
          )
        ),
        s.desc ? el("p", null, tagText(s.desc)) : null,
        changeLines(s.chips)
      )
    );
  });

  // ---------- PASSIVES ----------
  const calloutRoot = document.getElementById("passive-callouts");
  D.passiveCallouts.forEach(c => {
    calloutRoot.appendChild(
      el("article", { class: "passive-callout " + c.kind },
        el("div", { class: "callout-tag" }, c.tag),
        el("h3", { class: "callout-title" }, c.title),
        el("p", { class: "callout-body" }, c.body)
      )
    );
  });
  const passiveRoot = document.getElementById("passive-grid");
  D.passives.forEach(p => {
    const overall = p.kind || cardKindClass(p.chips).replace("has-", "");
    passiveRoot.appendChild(
      el("article", { class: "passive-card " + cardKindClass(p.chips) },
        kindMark(overall),
        el("h4", { class: "passive-name" }, p.name),
        p.desc ? el("p", { class: "passive-desc" }, p.desc) : null,
        changeLines(p.chips)
      )
    );
  });

  // ---------- UNIQUES ----------
  const uniquesRoot = document.getElementById("uniques-content");
  function renderUniques(tab) {
    uniquesRoot.innerHTML = "";
    if (tab === "reworks") {
      D.uniqueReworks.forEach(u => {
        const overall = cardKindClass(u.chips).replace("has-", "");
        uniquesRoot.appendChild(reworkCard(u, overall));
      });
    } else if (tab === "vaal") {
      D.vaalRolls.forEach(u => {
        const overall = cardKindClass(u.chips).replace("has-", "");
        uniquesRoot.appendChild(reworkCard(u, overall));
      });
    } else if (tab === "new") {
      renderNewUniques();
    }
  }

  function reworkCard(u, overall) {
    const card = el("article", { class: "unique-card " + cardKindClass(u.chips) + (u.image ? " has-img" : "") },
      kindMark(overall)
    );
    if (u.image) {
      const imgUrl = "images/item/" + u.image + ".webp";
      const imgBox = el("div", { class: "unique-img" },
        el("img", {
          src: imgUrl,
          alt: u.name,
          loading: "eager",
          fetchpriority: "high",
          referrerpolicy: "no-referrer",
          onerror: function () { this.parentNode.style.display = "none"; card.classList.remove("has-img"); }
        })
      );
      card.appendChild(imgBox);
    }
    const body = el("div", { class: "unique-body" },
      el("h3", { class: "unique-name" }, u.name),
      u.desc ? el("p", null, tagText(u.desc)) : null,
      changeLines(u.chips)
    );
    card.appendChild(body);
    return card;
  }

  function renderNewUniques() {
    const items = D.newUniques;
    const matched   = items.filter(u => u.legacy);
    const unmatched = items.filter(u => !u.legacy);

    const intro = el("div", { class: "legacy-tile new", style: "grid-column: 1/-1; padding: 14px 18px;" },
      el("p", { class: "legacy-note", style: "margin:0;" },
        "Forty-two new uniques were enumerated by name only — no mod text was published. Items below are grouped by whether a PoE1 ancestor with the exact same name exists on the legacy wiki. The PoE2 modifiers will surface on poe2db once the patch is live."
      )
    );
    uniquesRoot.appendChild(intro);

    uniquesRoot.appendChild(renderBucket({
      title: "Found in PoE1",
      desc: "Exact name match on the PoE1 wiki. The PoE1 entry is linked as the legacy variant; the PoE2 0.5.0 mods are still unknown.",
      count: matched.length,
      items: matched,
      bucketClass: "high"
    }));
    uniquesRoot.appendChild(renderBucket({
      title: "No PoE1 match — info unknown",
      desc: "These names do not match an existing PoE1 unique. They may be new PoE2 designs or renamed transfers — no assumption is made.",
      count: unmatched.length,
      items: unmatched,
      bucketClass: "new"
    }));
  }

  function renderBucket({ title, desc, count, items, bucketClass }) {
    const wrap = el("div", { class: "unique-bucket", style: "grid-column: 1/-1;" },
      el("div", { class: "unique-bucket-header" },
        el("h3", null, title),
        el("span", { class: "unique-bucket-count" }, count + " items"),
        el("span", { class: "unique-bucket-desc" }, desc)
      )
    );
    const grid = el("div", { class: "unique-bucket-grid" });
    items.forEach(u => grid.appendChild(legacyTile(u, bucketClass)));
    wrap.appendChild(grid);
    return wrap;
  }

  function legacyTile(u, bucketClass) {
    const isLegacy = !!u.legacy;
    // Image only when explicitly known (probed via poecdn). No guessing.
    const imgUrl = isLegacy && u.legacy.image ? localizeLegacyImage(u.legacy.image) : null;
    const tile = el("article", { class: "unique-card unique-legacy " + bucketClass + (imgUrl ? " has-img" : "") },
      imgUrl
        ? el("div", { class: "unique-img" },
            el("img", {
              src: imgUrl,
              alt: u.name,
              loading: "eager",
              fetchpriority: "high",
              referrerpolicy: "no-referrer",
              onerror: function () { this.parentNode.style.display = "none"; tile.classList.remove("has-img"); }
            })
          )
        : null,
      el("div", { class: "unique-body" },
        el("h3", { class: "unique-name" }, u.name),
        isLegacy && u.legacy.slot ? el("div", { class: "legacy-slot" }, u.legacy.slot) : null,
        u.legacy && u.legacy.note ? el("p", { class: "legacy-note" }, u.legacy.note) : null,
        el("div", { class: "legacy-links" },
          el("a", { href: poe2dbLink(u.name), target: "_blank", rel: "noopener" }, "poe2db ↗"),
          isLegacy
            ? el("a", { class: "lnk-poe1", href: poewikiLink(u.name), target: "_blank", rel: "noopener" }, "poe1 entry ↗")
            : null
        )
      )
    );
    return tile;
  }

  // Fill the count badges inside each uniques tab.
  const UNIQUE_COUNTS = {
    reworks: (D.uniqueReworks || []).length,
    "new":   (D.newUniques || []).length,
    vaal:    (D.vaalRolls || []).length,
  };
  document.querySelectorAll(".uniques-tab-count").forEach(s => {
    const k = s.dataset.count;
    if (UNIQUE_COUNTS[k] != null) s.textContent = UNIQUE_COUNTS[k];
  });

  renderUniques("reworks");
  document.querySelectorAll(".uniques-tab").forEach(t => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".uniques-tab").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      renderUniques(t.dataset.tab);
    });
  });

  // ---------- ENDGAME (full-width sections with top-left fading photo) ----------
  const ENDGAME_SUB = {
    "Atlas":                          "Fixed points of interest. Quest-driven mechanic intros. 30 new map areas. Reset, but tablets and waystones carry over.",
    "Waystones & Tablets":            "Identification required. Tablet stacking. Empty slots seed random content. Many prefix/suffix flips. New art.",
    "Pinnacle Bosses":                "Each Pinnacle now has a Quest version and an Infinite Farm version. Calamity Fragments retired.",
    "Fortress / Origins of Divinity": "300+ new Atlas Tree nodes. Fully allocatable. New Gateway, Citadel, and Arbiter encounters.",
    "Masters of the Atlas":           "Doryani · Hilda · Jado. Twelve nodes each, four active at once. Re-pick at will.",
    "Other Endgame":                  "Shrine, omen and precursor tablet rebalances. New Omen of Chaotic Effectiveness. Map UI polish.",
  };
  // Press-kit photo per endgame section. Generic atlas/UI shots stand in
  // where there is no direct thematic match (Waystones, Other Endgame).
  const ENDGAME_IMG = {
    "Atlas":                          "presskit-web/Atlas_Regions_1.jpg",
    "Waystones & Tablets":            "presskit-web/Atlas_Search_QoL.jpg",
    "Pinnacle Bosses":                "presskit-web/Vaal_Atziri_Cinematic2.jpg",
    "Fortress / Origins of Divinity": "presskit-web/Fortress_Atlas_2.jpg",
    "Masters of the Atlas":           "presskit-web/Master_Doryani.jpg",
    "Other Endgame":                  "presskit-web/Atlas_Passive_Tree.jpg",
  };
  const eg = document.getElementById("endgame-grid");
  eg.className = "endgame-features";
  D.endgame.forEach(group => {
    const imgPath = ENDGAME_IMG[group.title];
    eg.appendChild(
      el("article", { class: "endgame-feature" },
        imgPath ? el("img", { class: "endgame-photo", src: "images/" + imgPath, alt: group.title, loading: "lazy", fetchpriority: "low" }) : null,
        el("div", { class: "endgame-body" },
          el("h3", null, group.title),
          el("div", { class: "endgame-sub" }, ENDGAME_SUB[group.title] || ""),
          el("ul", null, ...group.items.map(i => el("li", null, tagText(i))))
        )
      )
    );
  });

  // ---------- CURRENCY ----------
  const cur = document.getElementById("currency-grid");
  D.currency.forEach(g => {
    cur.appendChild(
      el("article", { class: "currency-card" + (g.image ? " has-img" : "") + (g.cols2 ? " cols-2" : "") },
        g.image ? el("div", { class: "currency-img" },
          el("img", { src: "images/" + g.image, alt: g.title, loading: "lazy", fetchpriority: "low" })
        ) : null,
        el("h3", null, g.title),
        g.sub ? el("div", { class: "currency-sub" }, g.sub) : null,
        el("ul", null, ...g.items.map(i => el("li", null, tagText(i))))
      )
    );
  });

  // ---------- MONSTERS / CAMPAIGN / REMOVED ----------
  function listRow(row, asRemoved) {
    const overall = row.kind || "neutral";
    return el("div", { class: "list-row has-" + overall },
      kindMark(overall),
      el("div", { class: "list-text" }, tagText(row.text))
    );
  }

  const mon = document.getElementById("monster-list");
  D.monsters.forEach(m => mon.appendChild(listRow(m)));

  const cmp = document.getElementById("campaign-list");
  D.campaign.forEach(c => cmp.appendChild(listRow(c)));

  const rem = document.getElementById("removed-list");
  D.removed.forEach(r => rem.appendChild(listRow(r, true)));

  // ---------- PATCH NOTE UPDATES + SITE CHANGELOG ----------
  // Both render the same shape: dated groups, each with a bulleted item list.
  function renderLog(containerId, groups) {
    const root = document.getElementById(containerId);
    if (!root || !groups) return;
    groups.forEach(g => {
      root.appendChild(
        el("article", { class: "log-group" },
          el("div", { class: "log-head" },
            el("span", { class: "log-date" }, g.date),
            el("span", { class: "log-count" }, g.items.length + (g.items.length === 1 ? " change" : " changes"))
          ),
          el("ul", { class: "log-items" }, ...g.items.map(t => {
            const sub = t.startsWith("— ");
            return el("li", { class: sub ? "sub" : null }, sub ? t.slice(2) : t);
          }))
        )
      );
    });
  }
  renderLog("updates-log", D.patchUpdates);
  renderLog("changelog-log", D.siteChangelog);

  // ---------- MODAL ----------
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  function openModal({ title, sub, bullets, links }) {
    modalContent.innerHTML = "";
    modalContent.appendChild(el("h2", null, title));
    if (sub) modalContent.appendChild(el("div", { class: "modal-sub" }, sub));
    if (bullets && bullets.length) {
      modalContent.appendChild(el("ul", null, ...bullets.map(b => el("li", null, tagText(b)))));
    }
    if (links && links.length) {
      modalContent.appendChild(
        el("div", { class: "modal-links" },
          ...links.map(l => el("a", { href: l.href, target: "_blank", rel: "noopener" }, l.label))
        )
      );
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  modal.addEventListener("click", e => { if (e.target.dataset.close !== undefined) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // ---------- SVG sigils ----------
  function svgWrap(inner) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
    return wrapper.firstChild;
  }
  function svgCompass() {
    return svgWrap(`
      <circle cx="50" cy="50" r="36" />
      <circle cx="50" cy="50" r="28" stroke-opacity="0.45" />
      <path d="M50 14 L50 26 M50 74 L50 86 M14 50 L26 50 M74 50 L86 50" />
      <path d="M28 28 L34 34 M66 28 L72 22 M28 72 L34 66 M66 72 L72 78" stroke-opacity="0.55" />
      <path d="M50 30 L58 50 L50 70 L42 50 Z" fill="currentColor" fill-opacity="0.12" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />`);
  }
  function svgTablet() {
    return svgWrap(`
      <path d="M28 18 L72 18 L78 26 L78 82 L22 82 L22 26 Z" />
      <path d="M28 18 L28 82 M72 18 L72 82" stroke-opacity="0.35" />
      <path d="M34 36 L66 36 M34 44 L60 44 M34 52 L66 52 M34 60 L58 60 M34 68 L66 68" stroke-opacity="0.7" />
      <circle cx="50" cy="26" r="2" fill="currentColor" />`);
  }
  function svgCrown() {
    return svgWrap(`
      <path d="M16 70 L26 30 L40 56 L50 24 L60 56 L74 30 L84 70 Z" fill="currentColor" fill-opacity="0.08" />
      <path d="M16 78 L84 78" />
      <circle cx="26" cy="30" r="3" fill="currentColor" />
      <circle cx="50" cy="24" r="3" fill="currentColor" />
      <circle cx="74" cy="30" r="3" fill="currentColor" />
      <path d="M22 70 L78 70" stroke-opacity="0.4" />`);
  }
  function svgTower() {
    return svgWrap(`
      <path d="M30 86 L30 38 L26 38 L26 28 L34 28 L34 22 L42 22 L42 28 L58 28 L58 22 L66 22 L66 28 L74 28 L74 38 L70 38 L70 86 Z" />
      <path d="M30 86 L70 86" stroke-width="2" />
      <path d="M36 38 L36 86 M50 38 L50 86 M64 38 L64 86" stroke-opacity="0.35" />
      <rect x="42" y="48" width="16" height="20" fill="currentColor" fill-opacity="0.12" />
      <path d="M42 48 L58 48 M42 56 L58 56" stroke-opacity="0.6" />
      <path d="M38 18 L38 14 L34 14 L34 10 L38 10 L38 6" stroke-opacity="0.5" stroke-width="1.0" />
      <path d="M62 18 L62 14 L66 14 L66 10 L62 10 L62 6" stroke-opacity="0.5" stroke-width="1.0" />`);
  }
  function svgTrio() {
    return svgWrap(`
      <circle cx="26" cy="36" r="10" />
      <circle cx="50" cy="28" r="10" />
      <circle cx="74" cy="36" r="10" />
      <path d="M14 84 L14 76 Q14 56 26 54 Q38 56 38 76 L38 84 Z" fill="currentColor" fill-opacity="0.1" />
      <path d="M38 84 L38 76 Q38 50 50 48 Q62 50 62 76 L62 84 Z" fill="currentColor" fill-opacity="0.1" />
      <path d="M62 84 L62 76 Q62 56 74 54 Q86 56 86 76 L86 84 Z" fill="currentColor" fill-opacity="0.1" />`);
  }
  function svgEye() {
    return svgWrap(`
      <path d="M10 50 Q50 18 90 50 Q50 82 10 50 Z" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      <path d="M50 28 L50 18 M50 72 L50 82 M28 50 L18 50 M72 50 L82 50" stroke-opacity="0.5" />`);
  }
  function svgRune() {
    return svgWrap(`
      <circle cx="50" cy="50" r="36" />
      <path d="M50 22 L50 78 M30 32 L70 68 M30 68 L70 32" />`);
  }

  // ---------- PASSIVE SKILL TREE RENDERER ----------
  // ---------- PASSIVE SKILL TREE — canvas renderer ----------
  // One <canvas> drawing sprite crops from the official GGG atlases (the
  // maxroll/poeplanner approach) — far faster than the old ~20k-element SVG.
  (function initPassiveTree() {
    const viewport = document.getElementById("tree-viewport");
    const status = document.getElementById("tree-status");
    const tooltip = document.getElementById("tree-tooltip");
    if (!viewport || !status) return;
    const tree = window.TREE_DATA, SP = window.TREE_SPRITES;
    if (!tree || !tree.nodes || !SP) { status.textContent = "Could not load the tree"; return; }
    status.classList.add("hidden");

    const S = 2; // atlases exported at scale 0.5 → draw sprites at native × 2
    const groups = tree.groups || {};
    const ASC_RING = 4000, ASC_ART = 2900;   // ascendancy centre: ring frame + illustration (origin-centred)

    // ----- atlas images (lazy; redraw as they load) -----
    const atlasImg = {};
    for (const k in SP) {
      atlasImg[k] = null;
      const im = new Image();
      im.onload = ((kk, img) => () => { atlasImg[kk] = img; requestDraw(); })(k, im);
      im.onerror = ((kk) => () => { atlasImg[kk] = false; })(k);
      im.src = SP[k].img;
    }
    const frameOf = (atlas, key) => { const a = SP[atlas]; const fr = a && a.frames[key]; return fr ? fr.frame : null; };
    function sprite(atlas, key, x, y, mul, alpha) {  // centred, sized native×S×mul
      const im = atlasImg[atlas]; if (!im) return;
      const f = frameOf(atlas, key); if (!f) return;
      const w = f.w * S * (mul || 1), h = f.h * S * (mul || 1);
      if (alpha != null) ctx.globalAlpha = alpha;
      ctx.drawImage(im, f.x, f.y, f.w, f.h, x - w / 2, y - h / 2, w, h);
      if (alpha != null) ctx.globalAlpha = 1;
    }
    function spriteBox(atlas, key, cx, cy, w, h, alpha) {  // centred, explicit size
      const im = atlasImg[atlas]; if (!im) return;
      const f = frameOf(atlas, key); if (!f) return;
      if (alpha != null) ctx.globalAlpha = alpha;
      ctx.drawImage(im, f.x, f.y, f.w, f.h, cx - w / 2, cy - h / 2, w, h);
      if (alpha != null) ctx.globalAlpha = 1;
    }

    // ----- node + edge draw lists -----
    // Ascendancy nodes (n.a) are NOT drawn in place — they're pulled out into
    // per-ascendancy wheels, re-centred at origin when one is picked.
    const nodes = Object.entries(tree.nodes).map(([id, n]) => {
      const fr = n.fr && frameOf("frame", n.fr);
      const ic = n.ic && frameOf("skills", n.ic);
      return { id, x: n.x, y: n.y, n, r: (fr ? fr.w : ic ? ic.w : 20) * S / 2 };
    });
    const byId = {}; for (const o of nodes) byId[o.id] = o;
    const ascNodes = {};                                  // ascId -> [node obj]
    for (const o of nodes) if (o.n.a) (ascNodes[o.n.a] = ascNodes[o.n.a] || []).push(o);
    // Main tree, split: drawable/hittable nodes vs mastery fx-hubs (not drawn).
    const mainNodes = nodes.filter(o => !o.n.a && !o.n.m);
    const fxNodes = nodes.filter(o => !o.n.a && o.n.fx);   // masteries: cluster patterns
    const tfxNodes = nodes.filter(o => !o.n.a && o.n.tfx); // master-less notables: themed backdrops

    // Edge geometry: an edge with an explicit centre (ox,oy from the export) is drawn
    // as an arc through both endpoints. The export sometimes omits the centre for
    // same-orbit edges, so we fall back to arcing around the group centre when both
    // nodes share a group AND orbit (the canonical PoE rule — doesn't over-curve).
    function arcAround(a, b, ox, oy) {
      const rr = Math.hypot(a.x - ox, a.y - oy);
      let a1 = Math.atan2(a.y - oy, a.x - ox), a2 = Math.atan2(b.y - oy, b.x - ox), da = a2 - a1;
      while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
      const N = Math.max(2, Math.ceil(Math.abs(da) / 0.12)), pts = [];   // fine sampling → smooth arcs
      for (let i = 0; i <= N; i++) { const ang = a1 + da * i / N; pts.push(ox + Math.cos(ang) * rr, oy + Math.sin(ang) * rr); }
      return pts;
    }
    function arc(a, b, ox, oy) {
      if (ox != null) return arcAround(a, b, ox, oy);
      if (a.g === b.g && a.o === b.o && a.o > 0 && groups[a.g]) return arcAround(a, b, groups[a.g].x, groups[a.g].y);
      return [a.x, a.y, b.x, b.y];
    }
    const edgesN = [], edgesC = [], ascEdges = {};        // ascId -> [polyline]
    for (const e of tree.edges) {
      const na = byId[e[0]], nb = byId[e[1]]; if (!na || !nb) continue;
      const pts = arc(na.n, nb.n, e[3], e[4]);            // e[3],e[4] = arc centre (optional)
      if (na.n.a) (ascEdges[na.n.a] = ascEdges[na.n.a] || []).push(pts);
      else (e[2] ? edgesC : edgesN).push(pts);
    }

    // ----- canvas + view transform (screen_css = world*scale + t) -----
    const [minX, minY, maxX, maxY] = tree.bounds;
    let scale = 1, tx = 0, ty = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const canvas = document.createElement("canvas");
    canvas.className = "tree-canvas";
    viewport.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let vpW = 0, vpH = 0;
    function resize() {
      const r = viewport.getBoundingClientRect(); vpW = r.width; vpH = r.height;
      canvas.width = Math.round(vpW * dpr); canvas.height = Math.round(vpH * dpr);
      canvas.style.width = vpW + "px"; canvas.style.height = vpH + "px";
      requestDraw();
    }
    const s2wx = sx => (sx - tx) / scale, s2wy = sy => (sy - ty) / scale;

    // ----- draw -----
    let hoverId = null, rafPending = false, selectedAsc = null;
    const ascMeta = tree.ascMeta || {};
    // Oracle (Druid1) "paths not taken" (blue) only render when Oracle is selected.
    const ORACLE = Object.keys(ascMeta).find(k => ascMeta[k].name === "Oracle") || "Druid1";
    // Translate so the start node lands at the wheel's class offset (-ox,-oy) — the
    // start sits off-centre exactly as it does behind its in-game ascendancy art.
    // (The export's offset is background→wheel, so the wheel centre is the negation.)
    const ascOffset = id => { const m = ascMeta[id]; return m ? [-m.ox - m.sx, -m.oy - m.sy] : [0, 0]; };
    // lazy image cache (circular ascendancy illustrations + centre portrait; redraw on load)
    const imgCache = {};
    function loadImg(src) {
      if (!src) return null;
      let e = imgCache[src];
      if (!e) { e = imgCache[src] = { img: null }; const im = new Image(); im.onload = () => { e.img = im; requestDraw(); }; im.src = src; }
      return e.img;
    }
    const ascIllustration = id => { const m = ascMeta[id]; return m ? loadImg(m.img) : null; };
    function requestDraw() { if (rafPending) return; rafPending = true; requestAnimationFrame(draw); }
    function strokePolys(list, vx0, vy0, vx1, vy1) {
      ctx.beginPath();
      for (const p of list) {
        if (p[0] < vx0 && p[2] < vx0 || p[0] > vx1 && p[2] > vx1 || p[1] < vy0 && p[3] < vy0 || p[1] > vy1 && p[3] > vy1) continue;
        ctx.moveTo(p[0], p[1]); for (let i = 2; i < p.length; i += 2) ctx.lineTo(p[i], p[i + 1]);
      }
      ctx.stroke();
    }
    // Connectors are drawn as a single continuous stroke per polyline (one piece, no
    // sprite seams), layered to mimic the cord cross-section sampled from PoB's
    // LineConnector: a dark olive body with a lighter core. lineJoin/cap 'round' +
    // fine arc sampling keep curves smooth.
    const LINE_W = 16;
    function cordPolys(list, baseW, stops, vx0, vy0, vx1, vy1) {
      for (const s of stops) { ctx.lineWidth = baseW * s[0]; ctx.strokeStyle = s[1]; strokePolys(list, vx0, vy0, vx1, vy1); }
    }
    const CORD = [[1, "rgba(34,28,17,0.95)"], [0.42, "rgba(98,89,70,0.92)"]];
    const CORD_BLUE = [[1, "rgba(18,44,82,0.9)"], [0.42, "rgba(96,170,255,0.95)"]];
    function draw() {
      rafPending = false;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, vpW, vpH);
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * tx, dpr * ty);
      const pad = 600;
      const vx0 = s2wx(0) - pad, vy0 = s2wy(0) - pad, vx1 = s2wx(vpW) + pad, vy1 = s2wy(vpH) + pad;
      const inView = (x, y, r) => x + r > vx0 && x - r < vx1 && y + r > vy0 && y - r < vy1;

      // centre, anchored on the tree origin (0,0): one circular illustration —
      // the picked ascendancy's, or the base class portrait when none — inside the
      // ornate ring frame with the active ring on top.
      if (tree.centre) {
        const il = selectedAsc ? ascIllustration(selectedAsc) : loadImg(tree.centre.img);
        if (il) ctx.drawImage(il, -ASC_ART / 2, -ASC_ART / 2, ASC_ART, ASC_ART);
        spriteBox("groupBg", tree.centre.ring, 0, 0, ASC_RING, ASC_RING, 0.95);
        if (tree.centre.ringActive) spriteBox("groupBg", tree.centre.ringActive, 0, 0, ASC_RING, ASC_RING, 0.9);
      }
      // Oracle "paths not taken" (blue) — nodes AND their cluster backgrounds are
      // hidden unless the Oracle is selected
      const oracleOn = selectedAsc === ORACLE;
      // mastery fx patterns (faint cluster backdrop; lit when a notable in the
      // same group is hovered — the mastery hub itself is never drawn)
      const hn = hoverId && byId[hoverId];
      const litGroup = hn && hn.n.nt ? hn.n.g : null;
      for (const o of fxNodes) {
        if (o.n.cond && !oracleOn) continue;          // skip Oracle cluster backdrops when not selected
        if (!inView(o.x, o.y, 760)) continue;
        sprite("fx", o.n.fx, o.x, o.y, 1.45, litGroup && o.n.g === litGroup ? 0.9 : 0.14);
      }
      // isolated master-less notables (e.g. Echoing Thunder/Flames): own themed
      // backdrop behind the notable, faint always, brightened when it's hovered
      for (const o of tfxNodes) {
        if (o.n.cond && !oracleOn) continue;
        if (!inView(o.x, o.y, 760)) continue;
        sprite("fx", o.n.tfx, o.x, o.y, 1.45, o.id === hoverId ? 0.9 : 0.14);
      }
      // edges: continuous cord strokes (smooth, one piece)
      ctx.lineJoin = "round"; ctx.lineCap = "round";
      cordPolys(edgesN, LINE_W, CORD, vx0, vy0, vx1, vy1);
      if (oracleOn) cordPolys(edgesC, LINE_W, CORD_BLUE, vx0, vy0, vx1, vy1);
      // main nodes (cull + LOD: tiny → batched dots)
      const lod = scale < 0.06;
      if (lod) {
        for (const cond of [0, 1]) {
          if (cond && !oracleOn) continue;
          ctx.beginPath(); ctx.fillStyle = cond ? "rgba(90,160,240,0.85)" : "rgba(196,172,120,0.75)";
          for (const o of mainNodes) { if (!!o.n.cond !== !!cond || !inView(o.x, o.y, o.r)) continue; ctx.moveTo(o.x + 24, o.y); ctx.arc(o.x, o.y, 24, 0, 6.283); }
          ctx.fill();
        }
      } else {
        for (const o of mainNodes) {
          if (o.n.cond && !oracleOn) continue;
          if (!inView(o.x, o.y, o.r)) continue;
          if (o.n.ic) sprite("skills", o.n.ic, o.x, o.y);
          if (o.n.fr) sprite("frame", o.n.fr, o.x, o.y);
        }
      }
      // selected ascendancy wheel: edges + nodes over the centred illustration above
      if (selectedAsc && ascNodes[selectedAsc]) {
        const [dx, dy] = ascOffset(selectedAsc);
        ctx.save(); ctx.translate(dx, dy);
        cordPolys(ascEdges[selectedAsc] || [], LINE_W, CORD, -Infinity, -Infinity, Infinity, Infinity);
        for (const o of ascNodes[selectedAsc]) {
          if (o.n.ic) sprite("skills", o.n.ic, o.x, o.y);
          if (o.n.fr) sprite("frame", o.n.fr, o.x, o.y);
        }
        ctx.restore();
      }
    }

    // ----- interaction -----
    const clampScale = s => Math.max(0.02, Math.min(50, s));
    function zoomAt(sx, sy, f) { const ns = clampScale(scale * f); const wx = (sx - tx) / scale, wy = (sy - ty) / scale; tx = sx - ns * wx; ty = sy - ns * wy; scale = ns; requestDraw(); }
    const rectOf = () => viewport.getBoundingClientRect();
    viewport.addEventListener("wheel", e => { e.preventDefault(); const r = rectOf(); zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY > 0 ? 0.85 : 1.18); }, { passive: false });
    const pointers = new Map(); let pinch = null;
    viewport.addEventListener("pointerdown", e => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
      viewport.classList.add("dragging");
      if (pointers.size === 2) { const p = [...pointers.values()]; pinch = { d: Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y), s: scale }; }
    });
    viewport.addEventListener("pointermove", e => {
      const r = rectOf();
      if (pointers.has(e.pointerId)) {
        const last = pointers.get(e.pointerId); pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.size === 2 && pinch) {
          const p = [...pointers.values()], nd = Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y);
          if (nd > 0) { const mx = (p[0].x + p[1].x) / 2 - r.left, my = (p[0].y + p[1].y) / 2 - r.top, ns = clampScale(pinch.s * nd / pinch.d); tx = mx - ns * ((mx - tx) / scale); ty = my - ns * ((my - ty) / scale); scale = ns; requestDraw(); }
        } else if (pointers.size === 1) { tx += e.clientX - last.x; ty += e.clientY - last.y; requestDraw(); }
      } else hover(e.clientX - r.left, e.clientY - r.top, e.clientX, e.clientY);
    });
    const up = e => { try { viewport.releasePointerCapture(e.pointerId); } catch (_) {} pointers.delete(e.pointerId); if (pointers.size < 2) pinch = null; if (pointers.size === 0) viewport.classList.remove("dragging"); };
    viewport.addEventListener("pointerup", up);
    viewport.addEventListener("pointercancel", up);
    viewport.addEventListener("pointerleave", () => { if (hoverId) { hoverId = null; tooltip.hidden = true; requestDraw(); } });

    function hover(sx, sy, cx, cy) {
      const wx = (sx - tx) / scale, wy = (sy - ty) / scale;
      let best = null, bd = Infinity;
      // selected ascendancy nodes (drawn on top, offset to centre) win ties
      if (selectedAsc && ascNodes[selectedAsc]) {
        const [ox, oy] = ascOffset(selectedAsc);
        for (const o of ascNodes[selectedAsc]) { const dx = o.x + ox - wx, dy = o.y + oy - wy, d = dx * dx + dy * dy; if (d < o.r * o.r && d < bd) { bd = d; best = o; } }
      }
      if (!best) { const oracleOn = selectedAsc === ORACLE; for (const o of mainNodes) { if (o.n.cond && !oracleOn) continue; const dx = o.x - wx, dy = o.y - wy, d = dx * dx + dy * dy; if (d < o.r * o.r && d < bd) { bd = d; best = o; } } }
      const id = best ? best.id : null;
      if (id !== hoverId) { hoverId = id; if (id) showTooltip(best.n, cx, cy); else tooltip.hidden = true; requestDraw(); }
      else if (id) positionTooltip(cx, cy);
    }
    const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // PoE inline loca tokens → styled keywords:
    //   [Key|Display] / [Key]  → keyword (the Display text, or Key)
    //   <underline>{Text} / {Text} → underlined (e.g. granted skill names)
    //   any other <…> directive → stripped
    // Definitions behind the keywords aren't in the tree export, so no nested hover.
    function loca(raw) {
      let s = String(raw)
        .replace(/\[([^\]|]+)(?:\|([^\]]+))?\]/g, (m, a, b) => "\u0001" + (b || a) + "\u0002")
        .replace(/<underline>\s*\{([^}]*)\}/g, "\u0003$1\u0004")
        .replace(/\{([^}]*)\}/g, "\u0003$1\u0004")
        .replace(/<[^>]*>/g, "");
      return esc(s)
        .replace(/\u0001/g, '<span class="tt-kw">').replace(/\u0002/g, "</span>")
        .replace(/\u0003/g, '<span class="tt-ul">').replace(/\u0004/g, "</span>");
    }
    const locaPlain = raw => loca(raw).replace(/<\/?span[^>]*>/g, "");        // tokens resolved, no keyword styling (for titles)
    function showTooltip(n, cx, cy) {
      const kind = n.a ? "Ascendancy" : n.cond ? "Conditional · Oracle" : "";
      const ascName = n.a ? (ascMeta[n.a] ? ascMeta[n.a].name : n.a) : "";   // "Deadeye", not "Ranger1"
      const stats = (n.d || []).map(s => `<div class="tt-line">${loca(s)}</div>`).join("");
      const flav = n.f ? `<div class="tt-flav">${loca(n.f)}</div>` : "";
      tooltip.innerHTML = `${kind ? `<div class="tt-kind">${kind}${n.a ? " · " + esc(ascName) : ""}</div>` : ""}<div class="tt-name">${locaPlain(n.n || "")}</div>${stats}${flav}`;
      tooltip.hidden = false; positionTooltip(cx, cy);
    }
    function positionTooltip(cx, cy) {
      const r = rectOf(); let x = cx - r.left + 18, y = cy - r.top + 18;
      const tw = tooltip.offsetWidth || 320, th = tooltip.offsetHeight || 80;
      if (x + tw > r.width) x = cx - r.left - tw - 18;
      if (y + th > r.height) y = cy - r.top - th - 18;
      tooltip.style.left = x + "px"; tooltip.style.top = y + "px";
    }
    // ----- ascendancy selector -----
    // "Home" view = the ascendancy ring centred on origin (used on start + reset).
    function homeView() {
      scale = clampScale(0.92 * Math.min(vpW, vpH) / (ASC_RING * 1.04));
      tx = vpW / 2; ty = vpH / 2; requestDraw();
    }
    // Selecting an ascendancy swaps the centre wheel WITHOUT moving the view.
    function selectAsc(id) {
      selectedAsc = (id && ascNodes[id]) ? id : null;
      hoverId = null; tooltip.hidden = true; requestDraw();
    }
    const DEFAULT_ASC = "Monk1";   // Martial Artist — shown selected on load
    const ascSel = document.getElementById("tree-asc-select");
    if (ascSel && tree.asc) {
      ascSel.innerHTML = '<option value="">None — class portrait</option>' +
        tree.asc.map(g => `<optgroup label="${g.cls}">` +
          g.items.map(it => `<option value="${it.id}">${it.name}</option>`).join("") + "</optgroup>").join("");
      ascSel.addEventListener("change", () => selectAsc(ascSel.value));
      if (ascNodes[DEFAULT_ASC]) { ascSel.value = DEFAULT_ASC; selectedAsc = DEFAULT_ASC; }
    }

    viewport.closest(".tree-shell").querySelectorAll(".tree-btn").forEach(btn => btn.addEventListener("click", () => {
      const a = btn.dataset.tree;
      if (a === "zoom-in") zoomAt(vpW / 2, vpH / 2, 1.3);
      else if (a === "zoom-out") zoomAt(vpW / 2, vpH / 2, 0.77);
      else if (a === "reset") homeView();   // recentre on the ring; keep the current selection
      else if (a === "fullscreen") { const sh = viewport.closest(".tree-shell"); if (!document.fullscreenElement) (sh.requestFullscreen || sh.webkitRequestFullscreen || (() => {})).call(sh); else document.exitFullscreen && document.exitFullscreen(); }
    }));
    window.addEventListener("resize", resize);
    document.addEventListener("fullscreenchange", resize);
    resize(); homeView();
  })();

  // ---------- MOBILE NAV TOGGLE ----------
  const navEl = document.querySelector(".codex-nav");
  const navToggle = navEl && navEl.querySelector(".nav-toggle");
  if (navEl && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = navEl.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the drawer when a nav link is tapped.
    navEl.querySelectorAll(".nav-links a").forEach(a => {
      a.addEventListener("click", () => {
        navEl.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

})();
