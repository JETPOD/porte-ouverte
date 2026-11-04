/* Levée de précautions complémentaires : moteur du jeu. Aucune donnée stockée hors de la page. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const main = $("#main");
  const root = document.documentElement;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const track = (n) => window.poAnalytics && window.poAnalytics.track(n);
  const sent = new Set();
  const trackOnce = (n) => { if (!sent.has(n)) { sent.add(n); track(n); } };

  const state = { answers: {}, cur: null, order: {} };
  // answers["m-d-q"] = index of option chosen (in original order)

  let theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const applyTheme = () => { root.dataset.theme = theme; $("#theme").textContent = theme === "dark" ? "Clair" : "Sombre"; };
  $("#theme").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; applyTheme(); });
  applyTheme();

  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const mod = (id) => MODULES.find((m) => m.id === id);
  const key = (m, d, q) => `${m}-${d}-${q}`;
  const ans = (m, d, q) => state.answers[key(m, d, q)];
  const kindOf = (m, d, q) => { const a = ans(m, d, q); return a === undefined ? null : mod(m).dossiers[d].decisions[q].opts[a].k; };
  const dossierDone = (m, d) => mod(m).dossiers[d].decisions.every((_, q) => ans(m, d, q) !== undefined);
  const modDone = (m) => mod(m).dossiers.every((_, d) => dossierDone(m, d));
  const tally = (m) => {
    const t = { ok: 0, risk: 0, excess: 0, off: 0, n: 0 };
    mod(m).dossiers.forEach((dz, d) => dz.decisions.forEach((_, q) => { const k = kindOf(m, d, q); if (k) { t[k]++; t.n++; } }));
    return t;
  };
  const totalDecisions = (m) => mod(m).dossiers.reduce((s, dz) => s + dz.decisions.length, 0);

  function setNav(view) { document.querySelectorAll(".topnav .nav").forEach((b) => b.classList.toggle("active", b.dataset.view === view)); }
  function show(html, view, keepScroll) {
    main.innerHTML = html; setNav(view);
    if (!keepScroll) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
  }

  function confirmBox(title, text, okLabel, onOk) {
    const dlg = $("#dialog");
    $("#dialog-content").innerHTML = `<h3 id="dialog-title">${esc(title)}</h3><p>${esc(text)}</p>
      <div class="row end"><button class="btn ghost" data-dlg="no">Annuler</button><button class="btn" data-dlg="yes">${esc(okLabel)}</button></div>`;
    dlg.onclick = (e) => {
      const b = e.target.closest("[data-dlg]"); if (!b) return;
      dlg.close(); if (b.dataset.dlg === "yes") onOk();
    };
    dlg.showModal(); dlg.querySelector('[data-dlg="yes"]').focus();
  }

  const famTag = (f) => `<span class="fam fam-${f}">${esc(FAMILIES[f])}</span>`;
  const srcList = (keys) => `<ul class="srcs">${keys.map((k) => `<li><a href="${SOURCES[k].url}" target="_blank" rel="noopener">${esc(SOURCES[k].name)}</a></li>`).join("")}</ul>`;

  /* Accueil */
  function home() {
    const mods = MODULES.map((m) => {
      const t = tally(m.id), tot = totalDecisions(m.id);
      const dots = m.dossiers.map((_, d) => `<i class="${dossierDone(m.id, d) ? "on" : ""}"></i>`).join("");
      const status = t.n === 0 ? "Non commencé" : modDone(m.id) ? `Terminé · ${t.ok}/${tot}` : `En cours · ${t.n}/${tot} décisions`;
      return `<article class="module">
        <div class="mtop"><span class="code">${m.code}</span><span class="meta">${esc(m.audience)}</span></div>
        <h3>${esc(m.title)}</h3>
        <p class="muted">${esc(m.intro)}</p>
        <ul class="germs">${m.dossiers.map((dz) => `<li>${esc(dz.germ)}</li>`).join("")}</ul>
        <div class="mfoot"><div class="dots" aria-label="${status}">${dots}</div><span class="meta">${status}</span></div>
        <div class="row">
          <button class="btn" data-act="start" data-m="${m.id}">${t.n === 0 ? "Commencer" : modDone(m.id) ? "Voir le rapport" : "Reprendre"}</button>
          ${t.n > 0 ? `<button class="btn ghost" data-act="replay" data-m="${m.id}">Rejouer</button>` : ""}
        </div>
      </article>`;
    }).join("");
    show(`
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">Serious game · hygiène hospitalière</p>
          <h1>Levée de précautions complémentaires</h1>
          <p class="lede">Ni trop tôt, ni trop tard : décider au bon moment, sur le bon critère.</p>
          <p>15 dossiers patients, 45 décisions. Chaque réponse est classée : décision juste, risque de transmission (levée prématurée), précaution injustifiée (maintien trop long) ou écart de pratique. Les deux erreurs comptent : lever trop tôt expose les autres patients, maintenir trop longtemps a aussi un coût pour le patient isolé.</p>
          <div class="row"><button class="btn big" data-act="start" data-m="${firstOpen()}">Ouvrir le premier dossier</button><button class="btn ghost" data-view="memo">Aide-mémoire des critères</button></div>
        </div>
        <div class="door" aria-hidden="true">
          <div class="door-frame"><div class="door-leaf">
            <div class="sign sign-a"><b>Précautions</b><span>complémentaires</span></div>
            <div class="sign sign-b"><b>Levée</b><span>prescrite</span></div>
            <div class="knob"></div>
          </div></div>
        </div>
      </section>
      <section class="legend" aria-label="Classement des réponses">
        <div class="lg ok"><b>Décision juste</b><span>Conforme aux recommandations</span></div>
        <div class="lg risk"><b>Risque de transmission</b><span>Erreur critique : levée trop tôt, information manquante</span></div>
        <div class="lg excess"><b>Précaution injustifiée</b><span>Maintien trop long, examen inutile, parcours bloqué</span></div>
        <div class="lg off"><b>Écart de pratique</b><span>Traçabilité, prescription, organisation</span></div>
      </section>
      <h2 class="sec">Trois parcours par métier, environ 10 minutes chacun</h2>
      <section class="modules">${mods}</section>
    `, "home");
  }
  function firstOpen() { const m = MODULES.find((x) => !modDone(x.id)); return m ? m.id : 1; }

  function startModule(id) {
    trackOnce("Jeu démarré"); trackOnce(`Module ${id} démarré`);
    if (modDone(id)) return report(id);
    const m = mod(id);
    const d = m.dossiers.findIndex((_, k) => !dossierDone(id, k));
    openDossier(id, d < 0 ? 0 : d);
  }

  function optOrder(m, d, q) {
    const k = key(m, d, q);
    if (!state.order[k]) state.order[k] = shuffle(mod(m).dossiers[d].decisions[q].opts.map((_, i) => i));
    return state.order[k];
  }

  /* Dossier */
  function openDossier(m, d, keepScroll) {
    state.cur = { m, d };
    const M = mod(m), D = M.dossiers[d];
    const steps = M.dossiers.map((_, k) => `<i class="${dossierDone(m, k) ? "on" : ""} ${k === d ? "cur" : ""}"></i>`).join("");
    const firstOpenQ = D.decisions.findIndex((_, q) => ans(m, d, q) === undefined);
    const upto = firstOpenQ < 0 ? D.decisions.length - 1 : firstOpenQ;
    const decs = D.decisions.slice(0, upto + 1).map((dec, q) => {
      const a = ans(m, d, q);
      const opts = optOrder(m, d, q).map((i, n) => {
        const o = dec.opts[i];
        const chosen = a === i;
        const cls = a === undefined ? "" : chosen ? `chosen k-${o.k}` : (o.k === "ok" ? "reveal" : "dim");
        return `<button class="opt ${cls}" data-act="pick" data-q="${q}" data-i="${i}" ${a !== undefined ? "disabled" : ""}><span class="ol">${"ABCD"[n]}</span><span>${esc(o.t)}</span></button>`;
      }).join("");
      let fb = "";
      if (a !== undefined) {
        const o = dec.opts[a];
        const best = dec.opts.find((x) => x.k === "ok");
        fb = `<div class="fb k-${o.k}${q === state.freshFb ? " fresh" : ""}" role="status"><div class="badge k-${o.k}">${KINDS[o.k].label}</div><p>${esc(o.fb)}</p>
          ${o.k !== "ok" && best ? `<p class="best"><b>Décision attendue :</b> ${esc(best.t)}</p>` : ""}</div>`;
      }
      return `<article class="decision${q === state.fresh ? " fresh" : ""}" id="q${q}"><div class="qhead"><span class="qn">Décision ${q + 1}/${D.decisions.length}</span></div>
        <h3 class="q">${esc(dec.q)}</h3><div class="opts">${opts}</div>${fb}</article>`;
    }).join("");
    const ruleFresh = state.fresh === D.decisions.length;
    state.fresh = null; state.freshFb = null;
    const done = dossierDone(m, d);
    const isLast = d === M.dossiers.length - 1;
    const nextBtn = done ? `<div class="rule${ruleFresh ? " fresh" : ""}" id="rule">
        <p class="eyebrow">À retenir</p><h3>${esc(D.rule.title)}</h3>
        <ul class="points">${D.rule.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="srcbox"><div class="eyebrow">Sources</div>${srcList(D.src)}</div>
        <div class="row end"><button class="btn big" data-act="next">${isLast ? "Rapport du parcours" : "Dossier suivant"}</button></div>
      </div>` : "";
    const tl = D.timeline.map(([t, x]) => `<li><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join("");
    show(`
      <div class="crumbs"><button class="link" data-view="home">Parcours</button><span>/</span><span>${M.code} · ${esc(M.title)}</span><div class="steps" aria-label="Dossier ${d + 1} sur ${M.dossiers.length}">${steps}</div></div>
      <div class="dossier">
        <aside class="chart">
          <div class="chart-band band-${D.family}"><span>Dossier ${d + 1}/${M.dossiers.length}</span>${famTag(D.family)}</div>
          <div class="chart-body">
            <p class="unit">${esc(D.unit)}</p>
            <h2>${esc(D.title)}</h2>
            <p class="germ">${esc(D.germ)}</p>
            <ul class="facts">${D.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
            <div class="eyebrow">Chronologie</div>
            <ol class="tl">${tl}</ol>
          </div>
          <div class="chart-foot ${done ? "lifted" : ""}">${done ? "Dossier traité" : "Précautions en cours"}</div>
        </aside>
        <section class="decisions">${decs}${nextBtn}</section>
      </div>
    `, "home", keepScroll);
  }

  function pick(q, i) {
    const { m, d } = state.cur;
    if (ans(m, d, q) !== undefined) return;
    state.answers[key(m, d, q)] = i;
    state.fresh = q + 1; state.freshFb = q;
    openDossier(m, d, true);
    const D = mod(m).dossiers[d];
    const target = dossierDone(m, d) ? "#q" + q + " .fb" : "#q" + (q + 1);
    setTimeout(() => {
      const el = main.querySelector(target);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
      const f = main.querySelector(`#q${q} .fb`); if (f) { f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: true }); }
    }, 30);
    if (modDone(m)) trackOnce(`Module ${m} terminé`);
    if (MODULES.every((x) => modDone(x.id))) trackOnce("Parcours terminé");
    void D;
  }

  function next() {
    const { m, d } = state.cur;
    const M = mod(m);
    const n = M.dossiers.findIndex((_, k) => k > d && !dossierDone(m, k));
    const any = M.dossiers.findIndex((_, k) => !dossierDone(m, k));
    if (n >= 0) openDossier(m, n); else if (any >= 0) openDossier(m, any); else report(m);
  }

  /* Rapport */
  function report(id) {
    const M = mod(id), t = tally(id), tot = totalDecisions(id);
    const rows = M.dossiers.map((D, d) => {
      const cells = D.decisions.map((_, q) => { const k = kindOf(id, d, q); return `<span class="pill k-${k || "none"}" title="${k ? KINDS[k].label : "Non répondu"}">${k ? KINDS[k].short : "·"}</span>`; }).join("");
      return `<tr><td><button class="link" data-act="open" data-m="${id}" data-d="${d}">${esc(D.title)}</button><small>${esc(D.germ)}</small></td><td class="pills">${cells}</td></tr>`;
    }).join("");
    const risks = [];
    M.dossiers.forEach((D, d) => D.decisions.forEach((dec, q) => { if (kindOf(id, d, q) === "risk") risks.push(`<li><b>${esc(D.germ)} :</b> ${esc(dec.opts.find((o) => o.k === "ok").t)}</li>`); }));
    const others = MODULES.filter((x) => !modDone(x.id) && x.id !== id);
    const msg = t.risk === 0 && t.excess <= 1 ? "Aucun risque de transmission. Vos levées sont bien calées." : t.risk === 0 ? "Aucun risque de transmission, mais plusieurs précautions maintenues sans nécessité : revoyez les critères de levée." : "Au moins une décision aurait exposé d'autres patients. Reprenez les points ci-dessous.";
    show(`
      <div class="crumbs"><button class="link" data-view="home">Parcours</button><span>/</span><span>Rapport ${M.code}</span></div>
      <section class="report">
        <p class="eyebrow">${M.code} · ${esc(M.audience)}</p>
        <h1>${esc(M.title)} : rapport</h1>
        <p class="lede">${msg}</p>
        <div class="kpis">
          <div class="kpi ok"><b>${t.ok}<small>/${tot}</small></b><span>Décisions justes</span></div>
          <div class="kpi risk"><b>${t.risk}</b><span>Risques de transmission</span></div>
          <div class="kpi excess"><b>${t.excess}</b><span>Précautions injustifiées</span></div>
          <div class="kpi off"><b>${t.off}</b><span>Écarts de pratique</span></div>
        </div>
        <table class="rtable"><thead><tr><th>Dossier</th><th>Décisions</th></tr></thead><tbody>${rows}</tbody></table>
        ${risks.length ? `<div class="alert"><h3>Erreurs critiques à reprendre</h3><ul>${risks.join("")}</ul></div>` : ""}
        <p class="muted small">Score pédagogique, sans valeur d'évaluation ni d'attestation. Aucune réponse n'est enregistrée ni transmise.</p>
        <div class="row noprint">
          ${others.length ? `<button class="btn" data-act="start" data-m="${others[0].id}">Parcours suivant : ${esc(others[0].title)}</button>` : ""}
          <button class="btn ghost" data-act="print">Imprimer le rapport</button>
          <button class="btn ghost" data-act="replay" data-m="${id}">Rejouer ce parcours</button>
          <button class="btn ghost" data-view="memo">Aide-mémoire</button>
        </div>
      </section>
    `, "home");
  }

  function replay(id) {
    confirmBox("Rejouer ce parcours ?", "Les réponses de ce parcours seront effacées.", "Rejouer", () => {
      const M = mod(id);
      M.dossiers.forEach((D, d) => D.decisions.forEach((_, q) => { delete state.answers[key(id, d, q)]; delete state.order[key(id, d, q)]; }));
      openDossier(id, 0);
    });
  }

  /* Aide-mémoire */
  function memo() {
    const groups = MEMO.map((g) => `<section class="memo-g"><h2>${esc(g.group)}</h2>
      <div class="memo-rows">${g.rows.map(([a, b, s]) => `<div class="memo-row"><div class="memo-a">${esc(a)}</div><div class="memo-b">${esc(b)}<div class="memo-s">${s.map((k) => `<a href="${SOURCES[k].url}" target="_blank" rel="noopener">${esc(SOURCES[k].name.split(",")[0])}</a>`).join(" · ")}</div></div></div>`).join("")}</div></section>`).join("");
    show(`
      <section class="page">
        <p class="eyebrow">Aide-mémoire</p>
        <h1>Critères de levée</h1>
        <p class="lede">Synthèse des recommandations françaises utilisées dans le jeu. Toujours lever sur prescription, retirer la signalétique sur tous les supports et informer le patient et l'équipe.</p>
        <div class="row noprint"><button class="btn ghost" data-act="print">Imprimer l'aide-mémoire</button></div>
        ${groups}
        <p class="muted small">Chez l'immunodéprimé, les durées peuvent être prolongées avec réévaluation au cas par cas par l'EOH et les cliniciens. Les protocoles locaux validés par le CLIN priment pour l'organisation.</p>
      </section>`, "memo");
  }

  /* Animer */
  function guide() {
    const mods = MODULES.map((M) => `<article class="module"><div class="mtop"><span class="code">${M.code}</span><span class="meta">${esc(M.audience)}</span></div><h3>${esc(M.title)}</h3>
      <p><b>Dossiers :</b> ${M.dossiers.map((D) => esc(D.germ)).join(", ")}.</p>
      <div class="eyebrow">Questions de discussion</div><ol class="srcs">${GUIDE_QUESTIONS[M.id].map((q) => `<li>${esc(q)}</li>`).join("")}</ol></article>`).join("");
    show(`
      <section class="page">
        <p class="eyebrow">Animer une séance</p>
        <h1>Guide d'animation EOH et CLIN</h1>
        <p class="lede">Une séance de 30 à 45 minutes, projetée, pour un groupe de 6 à 15 professionnels.</p>
        <ol class="steps-list">
          <li><b>5 min · Ouverture.</b> Poser la question : « Dans notre unité, qui décide de lever les précautions, et sur quel critère ? » Noter les réponses sans les corriger.</li>
          <li><b>20 à 25 min · Dossiers.</b> Choisir le parcours du public présent. Pour chaque décision, faire voter à main levée avant de cliquer. Lire la correction à voix haute.</li>
          <li><b>5 min · Les deux erreurs.</b> Comparer le nombre de risques de transmission et de précautions injustifiées. Rappeler que le maintien inutile a aussi un coût pour le patient.</li>
          <li><b>5 à 10 min · Action.</b> Retenir une action concrète (modèle de prescription de levée, revue hebdomadaire des chambres signalées, affiche de l'aide-mémoire) avec un responsable nommé et une date.</li>
        </ol>
        <h2 class="sec">Par parcours</h2>
        <section class="modules">${mods}</section>
        <div class="alert soft"><h3>Règles pour l'animateur</h3><ul>
          <li>Les dossiers sont fictifs. Ne pas les rapprocher de patients réels.</li>
          <li>Les protocoles locaux validés par le CLIN priment pour l'organisation ; signaler tout écart entre le jeu et le protocole local.</li>
          <li>Le score est pédagogique : il ne sert ni à évaluer ni à attester une compétence.</li>
        </ul></div>
        <div class="row noprint"><button class="btn ghost" data-act="print">Imprimer le guide</button></div>
      </section>`, "guide");
  }

  function sources() {
    show(`
      <section class="page">
        <p class="eyebrow">Sources</p>
        <h1>Références utilisées</h1>
        <p class="lede">Recommandations françaises en vigueur à la date de rédaction (novembre 2026). Vérifier les mises à jour avant tout usage institutionnel.</p>
        ${srcList(Object.keys(SOURCES))}
        <div class="alert soft"><h3>Statut du prototype</h3><p>Prototype pédagogique v0.1, cas fictifs. Relecture par l'équipe opérationnelle d'hygiène requise avant usage institutionnel. Ce jeu n'est ni un protocole de soins, ni un examen validant, ni une attestation.</p></div>
      </section>`, "sources");
  }

  document.addEventListener("click", (e) => {
    const v = e.target.closest("[data-view]");
    if (v) { const view = v.dataset.view; ({ home, memo, guide, sources })[view](); return; }
    const b = e.target.closest("[data-act]"); if (!b) return;
    const a = b.dataset.act;
    if (a === "start") startModule(+b.dataset.m);
    else if (a === "replay") replay(+b.dataset.m);
    else if (a === "pick") pick(+b.dataset.q, +b.dataset.i);
    else if (a === "next") next();
    else if (a === "open") openDossier(+b.dataset.m, +b.dataset.d);
    else if (a === "print") window.print();
  });
  $("#brand").addEventListener("click", (e) => { e.preventDefault(); home(); });
  home();
})();
