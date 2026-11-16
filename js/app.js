(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app');
  const TOPICS = ['Analysis', 'Geometrie', 'Stochastik'];
  const KEY = 'abiTrainerBW.v1';
  const store = Object.assign({ cards: {}, stats: {}, orig: {}, tests: [] }, JSON.parse(localStorage.getItem(KEY) || '{}'));
  const save = () => localStorage.setItem(KEY, JSON.stringify(store));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const math = el => { if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false }); };
  const fmt = x => String(Math.round(x * 10000) / 10000).replace('.', ',');

  function params() { const q = location.hash.split('?')[1] || ''; return Object.fromEntries(new URLSearchParams(q)); }
  function setParams(p) { const base = location.hash.split('?')[0]; const q = new URLSearchParams(Object.entries(p).filter(([, v]) => v !== '' && v != null)).toString(); location.hash = base + (q ? '?' + q : ''); }
  function chips(name, options, current, labelAll = 'Alle') {
    return `<button class="chip" data-f="${name}" data-v="" aria-pressed="${!current}">${labelAll}</button>` +
      options.map(([v, l]) => `<button class="chip" data-f="${name}" data-v="${esc(v)}" aria-pressed="${current === String(v)}">${esc(l)}</button>`).join('');
  }
  function bindChips(root) {
    root.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { const p = params(); p[b.dataset.f] = b.dataset.v; delete p.page; setParams(p); }));
  }
  function stat(id, ok) { const s = store.stats[id] || (store.stats[id] = { r: 0, w: 0 }); ok ? s.r++ : s.w++; save(); }

  // ---------- Problem rendering (shared by Üben + Test) ----------
  function check(answers, inputs) {
    const vals = inputs.map(i => { try { return MathParse.evaluate(i.value); } catch (e) { return NaN; } });
    const tolOf = a => a.tol ?? Math.max(0.005, Math.abs(a.value) * 1e-4);
    const used = new Set();
    const res = answers.map((a, k) => {
      if (!a.group) return Math.abs(vals[k] - a.value) <= tolOf(a);
      const j = answers.findIndex((b, jj) => b.group === a.group && !used.has(jj) && Math.abs(vals[k] - b.value) <= tolOf(b));
      if (j < 0) return false;
      used.add(j); return true;
    });
    return { res, vals };
  }

  function problemHTML(p, meta, idx) {
    return `<div class="card problem" data-idx="${idx}">
      <div class="row" style="justify-content:space-between"><div>
        <span class="badge">${esc(meta.topic)}</span>${meta.tools ? '<span class="badge tools">mit Hilfsmitteln (WTR)</span>' : '<span class="badge">ohne Hilfsmittel</span>'}<span class="badge">${meta.level === 'LF' ? 'Leistungsfach' : 'Basis- & Leistungsfach'}</span>
      </div><span class="muted" style="font-size:.85rem">${esc(meta.title)}</span></div>
      ${p.intro ? `<p class="prompt">${p.intro}</p>` : ''}
      <p class="prompt">${p.prompt}</p>
      <div class="answers">${p.answers.map((a, i) => `<label>${esc(a.label)}<input inputmode="text" autocomplete="off" data-i="${i}" aria-label="${esc(a.label)}"></label>`).join('')}</div>
      <p class="hint">Eingabe: Zahl, Bruch (3/4), Dezimalzahl mit Komma oder Punkt, auch sqrt(2), ln(3), pi, e^2.</p>
      <div class="row"><button class="btn" data-act="check">Prüfen</button><button class="btn ghost" data-act="solve">Lösung zeigen</button></div>
      <div class="feedback" aria-live="polite"></div>
      <ol class="steps" hidden>${p.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>`;
  }

  function bindProblem(el, p, onResult) {
    const inputs = [...el.querySelectorAll('input')];
    let done = false;
    const fb = $('.feedback', el), steps = $('.steps', el);
    const finish = ok => { if (!done) { done = true; onResult && onResult(ok); } };
    $('[data-act=check]', el).addEventListener('click', () => {
      if (inputs.some(i => !i.value.trim())) { fb.className = 'feedback bad'; fb.textContent = 'Bitte alle Felder ausfüllen.'; return; }
      const { res, vals } = check(p.answers, inputs);
      inputs.forEach((i, k) => { i.classList.toggle('right', res[k]); i.classList.toggle('wrong', !res[k]); });
      const ok = res.every(Boolean);
      if (vals.some(isNaN)) { fb.className = 'feedback bad'; fb.textContent = 'Eingabe nicht lesbar – bitte Schreibweise prüfen.'; return; }
      fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
      fb.textContent = ok ? 'Richtig! ✓' : 'Noch nicht ganz – versuch es nochmal oder sieh dir die Lösung an.';
      if (ok) { steps.hidden = false; finish(true); }
    });
    $('[data-act=solve]', el).addEventListener('click', () => {
      steps.hidden = false;
      fb.className = 'feedback'; fb.innerHTML = 'Lösung: ' + p.answers.map(a => `${esc(a.label)} = ${fmt(a.value)}`).join(', ');
      finish(false);
    });
    inputs.forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') $('[data-act=check]', el).click(); }));
    math(el);
  }

  function pool(f) {
    const gens = Generators.list.filter(g => (!f.topic || g.topic === f.topic) && (f.tools === undefined || f.tools === '' || String(g.tools) === f.tools) && (f.level !== 'BF' || g.level === 'BF'));
    const longs = LongTasks.filter(g => (!f.topic || g.topic === f.topic) && (f.tools === undefined || f.tools === '' || String(g.tools) === f.tools) && (f.level !== 'BF' || g.level === 'BF'));
    return { gens, longs };
  }

  // ---------- Views ----------
  const views = {};

  views[''] = () => {
    const total = Object.values(store.stats).reduce((a, s) => a + s.r + s.w, 0);
    const right = Object.values(store.stats).reduce((a, s) => a + s.r, 0);
    const known = Object.values(store.cards).filter(b => b >= 2).length;
    app.innerHTML = `<h1>Mathe-Abi Baden-Württemberg trainieren</h1>
      <p class="muted">Für die Kursstufe (Klasse 11 und 12, G8): Grundwissen mit Lernkarten wiederholen, unbegrenzt neue Aufgaben auf Abitur-Niveau rechnen und echte Prüfungsaufgaben aus dem gemeinsamen Abituraufgabenpool bearbeiten.</p>
      <div class="grid">
        <a class="tile" href="#/karten"><div class="big">▦</div><h3>Lernkarten</h3><p>${Flashcards.length} Karten zu Formeln & Regeln – umdrehen, merken, wiederholen.</p></a>
        <a class="tile" href="#/ueben"><div class="big">✎</div><h3>Üben</h3><p>${Generators.list.length} Aufgabentypen mit immer neuen Zahlen + ${LongTasks.length} Wahlteil-Aufgaben, mit Lösungsweg.</p></a>
        <a class="tile" href="#/test"><div class="big">◷</div><h3>Test</h3><p>10 gemischte Aufgaben wie im Abi – mit Punkten am Ende.</p></a>
        <a class="tile" href="#/original"><div class="big">§</div><h3>Original-Abi</h3><p>Echte Abituraufgaben aus dem Länder-Pool (IQB), die auch in BW eingesetzt werden.</p></a>
      </div>
      <h2>Dein Stand</h2>
      <div class="card"><div class="row" style="gap:2rem">
        <div><b>${right}</b> / ${total} Aufgaben richtig</div>
        <div><b>${known}</b> / ${Flashcards.length} Karten gelernt</div>
        <div><b>${Object.values(store.orig).filter(v => v === 'done').length}</b> Original-Aufgaben erledigt</div>
      </div></div>`;
  };

  views.karten = () => {
    const f = params();
    let deck = Flashcards.filter(c => !f.topic || c.topic === f.topic);
    if (f.mode === 'neu') deck = deck.filter(c => (store.cards[c.id] || 0) < 2);
    deck = shuffle(deck).sort((a, b) => (store.cards[a.id] || 0) - (store.cards[b.id] || 0));
    let i = 0;
    app.innerHTML = `<h1>Lernkarten</h1>
      <div class="filters">${chips('topic', TOPICS.map(t => [t, t]), f.topic)}
        <span style="flex:1"></span><button class="chip" data-f="mode" data-v="${f.mode === 'neu' ? '' : 'neu'}" aria-pressed="${f.mode === 'neu'}">Nur noch nicht gelernte</button></div>
      <div id="fc"></div>`;
    bindChips(app);
    const box = $('#fc');
    function show() {
      if (!deck.length) { box.innerHTML = '<div class="card">Alle Karten in diesem Stapel sitzen! <a href="#/karten">Alle Karten anzeigen</a></div>'; return; }
      if (i >= deck.length) { box.innerHTML = `<div class="card"><h2>Runde geschafft!</h2><p>${deck.filter(c => (store.cards[c.id] || 0) >= 2).length} von ${deck.length} Karten sitzen.</p><button class="btn" id="again">Neue Runde</button></div>`; $('#again').onclick = () => views.karten(); return; }
      const c = deck[i], level = store.cards[c.id] || 0;
      box.innerHTML = `<div class="progressbar" aria-hidden="true"><i style="width:${(i / deck.length) * 100}%"></i></div>
        <p class="muted" style="font-size:.9rem">Karte ${i + 1} von ${deck.length} · ${'★'.repeat(level)}${'☆'.repeat(Math.max(0, 3 - level))}</p>
        <div class="flash-wrap"><button class="flash" aria-label="Karte umdrehen"><div class="face front"><span class="tag">${c.topic} · Begriff</span><div>${c.front}</div></div><div class="face back"><span class="tag">Antwort</span><div>${c.back}</div></div></button></div>
        <div class="row" style="justify-content:center"><button class="btn bad" data-k="0">Nochmal ✗</button><button class="btn ghost" data-k="flip">Umdrehen (Leertaste)</button><button class="btn ok" data-k="1">Kann ich ✓</button></div>`;
      const card = $('.flash', box);
      card.onclick = () => card.classList.toggle('flipped');
      box.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
        if (b.dataset.k === 'flip') return card.classList.toggle('flipped');
        store.cards[c.id] = b.dataset.k === '1' ? Math.min(3, level + 1) : 0; save();
        if (b.dataset.k === '0') deck.push(c);
        i++; show();
      });
      math(box);
    }
    document.onkeydown = e => {
      if (!location.hash.startsWith('#/karten')) return;
      if (e.key === ' ' && e.target.tagName !== 'BUTTON') { e.preventDefault(); $('.flash')?.classList.toggle('flipped'); }
      if (e.key === 'ArrowRight') $('[data-k="1"]')?.click();
      if (e.key === 'ArrowLeft') $('[data-k="0"]')?.click();
    };
    show();
  };

  views.ueben = () => {
    const f = params();
    const { gens, longs } = pool(f);
    app.innerHTML = `<h1>Üben</h1>
      <div class="filters">${chips('topic', TOPICS.map(t => [t, t]), f.topic)}</div>
      <div class="filters">${chips('tools', [['false', 'ohne Hilfsmittel (Pflichtteil)'], ['true', 'mit WTR (Wahlteil)']], f.tools, 'Alle Teile')}
        ${chips('level', [['BF', 'nur Basisfach']], f.level, 'Leistungsfach (alles)')}</div>
      <div class="filters"><label class="muted" for="typ">Aufgabentyp:</label>
        <select id="typ" class="chip"><option value="">Zufällig mischen</option>
          <optgroup label="Neue Aufgaben (immer andere Zahlen)">${gens.map(g => `<option value="${g.id}" ${f.typ === g.id ? 'selected' : ''}>${esc(g.topic + ': ' + g.title)}</option>`).join('')}</optgroup>
          <optgroup label="Wahlteil-Aufgaben">${longs.map(g => `<option value="${g.id}" ${f.typ === g.id ? 'selected' : ''}>${esc(g.topic + ': ' + g.title)}</option>`).join('')}</optgroup>
        </select></div>
      <div id="task"></div>`;
    bindChips(app);
    $('#typ').onchange = e => setParams(Object.assign(params(), { typ: e.target.value }));
    const box = $('#task');
    function next() {
      let meta = f.typ ? gens.concat(longs).find(t => t.id === f.typ) : null;
      if (!meta) { const all = gens.concat(longs.length && Math.random() < 0.2 ? longs : []); meta = all[Math.floor(Math.random() * all.length)]; }
      if (!meta) { box.innerHTML = '<div class="card">Keine Aufgaben für diese Filter.</div>'; return; }
      const parts = meta.parts ? meta.parts.map((p, k) => Object.assign({}, p, k === 0 ? { intro: `<b>${esc(meta.title)}</b><br>${meta.intro}` } : {})) : [meta.make()];
      box.innerHTML = parts.map((p, k) => problemHTML(p, meta, k)).join('') + '<div class="row"><button class="btn" id="next">Nächste Aufgabe →</button></div>';
      parts.forEach((p, k) => bindProblem(box.querySelector(`.problem[data-idx="${k}"]`), p, ok => stat(meta.id, ok)));
      $('#next').onclick = () => { next(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
      box.querySelector('input')?.focus({ preventScroll: true });
    }
    next();
  };

  views.test = () => {
    const f = params();
    if (!f.start) {
      app.innerHTML = `<h1>Test</h1><div class="card"><p>10 zufällige neue Aufgaben aus Analysis, Geometrie und Stochastik – jeweils 2 Punkte. Lösungen gibt es erst am Ende.</p>
        <div class="filters">${chips('level', [['BF', 'Basisfach']], f.level, 'Leistungsfach (alles)')}</div>
        <button class="btn" id="go">Test starten</button></div>
        ${store.tests.length ? `<h2>Letzte Ergebnisse</h2><div class="list">${store.tests.slice(-5).reverse().map(t => `<div class="item"><span>${new Date(t.d).toLocaleDateString('de-DE')}</span><b>${t.p} / ${t.m} Punkte</b></div>`).join('')}</div>` : ''}`;
      bindChips(app);
      $('#go').onclick = () => setParams(Object.assign(params(), { start: Date.now() }));
      return;
    }
    const { gens } = pool({ level: f.level });
    const byTopic = TOPICS.map(t => shuffle(gens.filter(g => g.topic === t)));
    const chosen = []; let k = 0;
    while (chosen.length < 10) { const list = byTopic[k % 3]; if (list.length) chosen.push(list[Math.floor(chosen.length / 3) % list.length]); k++; }
    const probs = chosen.map(m => ({ meta: m, p: m.make() }));
    app.innerHTML = `<h1>Test</h1><p class="muted">Rechne alle Aufgaben und klicke unten auf „Abgeben“.</p>` +
      probs.map(({ meta, p }, i) => `<div class="card tq" data-i="${i}"><div><span class="badge">${i + 1}</span><span class="badge">${meta.topic}</span>${meta.tools ? '<span class="badge tools">WTR</span>' : ''}</div>
        <p class="prompt">${p.prompt}</p><div class="answers">${p.answers.map((a, j) => `<label>${esc(a.label)}<input data-j="${j}" autocomplete="off"></label>`).join('')}</div>
        <div class="feedback"></div><ol class="steps" hidden>${p.steps.map(s => `<li>${s}</li>`).join('')}</ol></div>`).join('') +
      `<div class="row"><button class="btn" id="submit">Abgeben</button></div><div id="result"></div>`;
    math(app);
    $('#submit').onclick = () => {
      let pts = 0;
      probs.forEach(({ meta, p }, i) => {
        const el = app.querySelector(`.tq[data-i="${i}"]`), inputs = [...el.querySelectorAll('input')];
        const { res } = check(p.answers, inputs);
        inputs.forEach((inp, j) => { inp.classList.toggle('right', res[j]); inp.classList.toggle('wrong', !res[j]); inp.disabled = true; });
        const n = res.filter(Boolean).length, got = res.every(Boolean) ? 2 : n > 0 ? 1 : 0;
        pts += got; stat(meta.id, got === 2);
        const fb = $('.feedback', el); fb.className = 'feedback ' + (got === 2 ? 'ok' : 'bad');
        fb.textContent = `${got} / 2 Punkte – Lösung: ` + p.answers.map(a => `${a.label} = ${fmt(a.value)}`).join(', ');
        $('.steps', el).hidden = false;
      });
      store.tests.push({ d: Date.now(), p: pts, m: 20 }); save();
      const np = Math.max(0, Math.min(15, Math.round((pts / 20) * 100 / 100 * 15 + (pts >= 9 ? 0 : -1))));
      $('#result').innerHTML = `<div class="card"><h2>${pts} von 20 Punkten (${Math.round(pts / 20 * 100)} %)</h2><p class="muted">Grobe Einordnung: ca. ${np} Notenpunkte. Die Lösungswege stehen jetzt bei jeder Aufgabe.</p><button class="btn" id="newtest">Neuer Test</button></div>`;
      $('#submit').disabled = true;
      $('#newtest').onclick = () => setParams({ level: f.level, start: Date.now() });
      $('#result').scrollIntoView({ behavior: 'smooth' });
    };
  };

  let IQB = null;
  views.original = async () => {
    const f = params();
    app.innerHTML = '<h1>Original-Abituraufgaben</h1><p class="muted">Lade Aufgabenliste …</p>';
    if (!IQB) IQB = await fetch('data/iqb-mathe.json').then(r => r.json());
    const years = [...new Set(IQB.map(t => t.year))].sort().reverse();
    const list = IQB.filter(t => (!f.year || t.year === f.year) && (!f.topic || t.topic === f.topic) && (!f.level || t.level === f.level) && (!f.part || t.part === f.part) && (!f.status || (store.orig[t.id] || 'open') === f.status));
    const per = 30, pages = Math.max(1, Math.ceil(list.length / per)), page = Math.min(pages, Math.max(1, +f.page || 1));
    app.innerHTML = `<h1>Original-Abituraufgaben</h1>
      <div class="card"><p style="margin:0">Das sind die echten Prüfungsaufgaben aus dem <b>gemeinsamen Abituraufgabenpool der Länder</b> (IQB). Baden-Württemberg verwendet Aufgaben aus diesem Pool im Mathe-Abitur. Jede PDF enthält die Aufgabe und am Ende den <b>Erwartungshorizont (Lösung)</b> – erst selbst rechnen, dann vergleichen und hier abhaken.
      <br><span class="hint">„grundlegend“ ≈ Basisfach, „erhöht“ ≈ Leistungsfach · Teil A = ohne Hilfsmittel, Teil B = mit Hilfsmitteln. Für BW wichtig: Analysis, Analytische Geometrie, Stochastik; im BW-Abi rechnet man mit WTR (nicht CAS). Die Dateien liegen beim IQB und werden nur verlinkt.</span></p></div>
      <div class="filters"><select class="chip" id="year" aria-label="Jahr"><option value="">Alle Jahre</option>${years.map(y => `<option ${f.year === y ? 'selected' : ''}>${y}</option>`).join('')}</select>
        ${chips('topic', [...new Set(IQB.map(t => t.topic))].map(t => [t, t]), f.topic, 'Alle Gebiete')}</div>
      <div class="filters">${chips('level', [['grundlegend', 'Basisfach (grundlegend)'], ['erhöht', 'Leistungsfach (erhöht)']], f.level, 'Beide Niveaus')}
        ${chips('part', [['A', 'Teil A ohne Hilfsmittel'], ['B', 'Teil B mit Hilfsmitteln']], f.part, 'Beide Teile')}</div>
      <div class="filters">${chips('status', [['open', 'Offen'], ['again', 'Nochmal'], ['done', 'Erledigt']], f.status, 'Alle')}
        <span style="flex:1"></span><button class="btn ghost" id="rnd">Zufällige Aufgabe</button></div>
      <p class="muted">${list.length} Aufgaben</p>
      <div class="list">${list.slice((page - 1) * per, page * per).map(t => {
        const st = store.orig[t.id] || 'open';
        return `<div class="item ${st}" data-id="${esc(t.id)}"><div><div class="t">${esc(t.year)} · ${esc(t.topic)}</div><div class="muted" style="font-size:.85rem">${esc(t.detail)}</div></div>
          <div class="row">${t.files.map(fl => `<a class="btn" href="${esc(fl.url)}" target="_blank" rel="noopener">${esc(fl.label)} (PDF)</a>`).join('')}
          <button class="chip" data-s="again" aria-pressed="${st === 'again'}">Nochmal</button><button class="chip" data-s="done" aria-pressed="${st === 'done'}">Erledigt ✓</button></div></div>`;
      }).join('')}</div>
      <div class="row" style="justify-content:center;margin-top:1rem">${page > 1 ? `<button class="btn ghost" data-p="${page - 1}">← Zurück</button>` : ''}<span class="muted">Seite ${page} / ${pages}</span>${page < pages ? `<button class="btn ghost" data-p="${page + 1}">Weiter →</button>` : ''}</div>`;
    bindChips(app);
    $('#year').onchange = e => setParams(Object.assign(params(), { year: e.target.value, page: '' }));
    app.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { setParams(Object.assign(params(), { page: b.dataset.p })); window.scrollTo(0, 0); });
    app.querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
      const id = b.closest('.item').dataset.id; store.orig[id] = store.orig[id] === b.dataset.s ? 'open' : b.dataset.s; save(); views.original();
    });
    $('#rnd').onclick = () => { const open = list.filter(t => store.orig[t.id] !== 'done'); const t = (open.length ? open : list)[Math.floor(Math.random() * (open.length || list.length))]; if (t) window.open(t.files[0].url, '_blank', 'noopener'); };
  };

  views.fortschritt = () => {
    const rows = TOPICS.map(t => {
      const ids = Generators.list.filter(g => g.topic === t).map(g => g.id).concat(LongTasks.filter(g => g.topic === t).map(g => g.id));
      const r = ids.reduce((a, id) => a + (store.stats[id]?.r || 0), 0), w = ids.reduce((a, id) => a + (store.stats[id]?.w || 0), 0);
      const cards = Flashcards.filter(c => c.topic === t), known = cards.filter(c => (store.cards[c.id] || 0) >= 2).length;
      return { t, r, w, cards: cards.length, known };
    });
    const weak = Generators.list.concat(LongTasks).map(g => ({ g, s: store.stats[g.id] })).filter(x => x.s && x.s.w > 0).sort((a, b) => (b.s.w / (b.s.r + b.s.w)) - (a.s.w / (a.s.r + a.s.w))).slice(0, 5);
    app.innerHTML = `<h1>Fortschritt</h1>
      <div class="card"><h2 style="margin-top:0">Aufgaben richtig gelöst</h2>${rows.map(x => `<div class="stat"><span>${x.t}</span><div class="progressbar"><i style="width:${x.r + x.w ? x.r / (x.r + x.w) * 100 : 0}%"></i></div><span>${x.r}/${x.r + x.w}</span></div>`).join('')}</div>
      <div class="card"><h2 style="margin-top:0">Lernkarten gelernt</h2>${rows.map(x => `<div class="stat"><span>${x.t}</span><div class="progressbar"><i style="width:${x.known / x.cards * 100}%"></i></div><span>${x.known}/${x.cards}</span></div>`).join('')}</div>
      ${weak.length ? `<div class="card"><h2 style="margin-top:0">Hier solltest du noch üben</h2><div class="list">${weak.map(x => `<div class="item"><span>${esc(x.g.topic)}: ${esc(x.g.title)}</span><a class="btn" href="#/ueben?typ=${x.g.id}">Üben</a></div>`).join('')}</div></div>` : ''}
      <p class="hint">Dein Fortschritt wird nur in diesem Browser gespeichert.</p>
      <button class="btn ghost" id="reset">Fortschritt zurücksetzen</button>`;
    $('#reset').onclick = () => { if (confirm('Wirklich den gesamten Fortschritt löschen?')) { localStorage.removeItem(KEY); location.reload(); } };
  };

  function route() {
    const name = (location.hash.replace(/^#\/?/, '').split('?')[0]) || '';
    document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + name));
    (views[name] || views[''])();
    app.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('load', route);
})();
