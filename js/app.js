(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app');
  const TOPICS = ['Analysis', 'Geometrie', 'Stochastik'];
  const KEY = 'abiTrainerBW.v1';
  const store = Object.assign({ subject: 'mathe', cards: {}, stats: {}, orig: {}, tests: [], last: {} }, JSON.parse(localStorage.getItem(KEY) || '{}'));
  const save = () => { localStorage.setItem(KEY, JSON.stringify(store)); paintDock(); };
  const subj = () => Subjects.find(s => s.id === store.subject) || Subjects[0];
  const cardTopics = () => [...new Set(subj().cards.map(c => c.topic))];
  const mainOnly = what => {
    const m = Subjects.find(s => s.main);
    app.innerHTML = `<h1>${what}</h1><div class="card"><p>${what} mit neuen Aufgaben gibt es im Moment nur für <b>${m.name}</b>. Für ${esc(subj().name)} findest du Lernkarten und die Original-Abituraufgaben.</p>
      <div class="row"><a class="btn" href="#/original">Original-Abi ${esc(subj().name)}</a><a class="btn ghost" href="#/karten">Lernkarten</a><button class="btn ghost" id="tomain">Zu ${m.name} wechseln</button></div></div>`;
    $('#tomain').onclick = () => setSubject(m.id);
  };
  const noCards = () => {
    app.innerHTML = `<h1>Lernkarten</h1><div class="card"><p>In ${esc(subj().name)} lernst du direkt mit Aufgaben: unbegrenzt neue Übungsaufgaben mit Lösungsweg, ein Test und die Original-Abituraufgaben.</p>
      <div class="row"><a class="btn" href="#/ueben">Aufgaben üben</a><a class="btn ghost" href="#/test">Test starten</a><a class="btn ghost" href="#/original">Original-Abi</a></div></div>`;
  };
  const subjVars = x => `--cl:${x.color[0]};--cld:${x.color[1]};--cdk:${x.color[2]};--cdl:${x.color[3]}`;
  function setSubject(id, to) { store.subject = id; save(); const h = to || location.hash.split('?')[0] || '#/start'; if (location.hash !== h) location.hash = h; else route(); }
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

  function askHTML(p, n) {
    return `<div class="ask"><div class="lbl">Aufgabe ${n}</div><div class="q">${p.prompt}</div>
      <div class="wanted"><span>Gesucht:</span> ${p.answers.map(a => `<b>${esc(a.label)}</b>`).join(' ')}</div></div>`;
  }
  function problemHTML(p, meta, idx) {
    return `<div class="card problem" data-idx="${idx}" data-id="${esc(meta.id)}">
      <div class="row" style="justify-content:space-between"><div>
        <span class="badge">${esc(meta.topic)}</span>${meta.tools ? '<span class="badge tools">mit Hilfsmitteln (WTR)</span>' : '<span class="badge">ohne Hilfsmittel</span>'}<span class="badge">${meta.level === 'LF' ? 'Leistungsfach' : 'Basis- & Leistungsfach'}</span>
      </div><span class="muted" style="font-size:.85rem">${esc(meta.title)}</span></div>
      ${p.intro ? `<div class="given"><div class="lbl">Gegeben</div><div>${p.intro}</div></div>` : ''}
      ${askHTML(p, idx + 1)}
      <div class="answers">${p.answers.map((a, i) => `<label>${esc(a.label)}<input inputmode="text" autocomplete="off" data-i="${i}" aria-label="${esc(a.label)}" placeholder="${esc(a.label)} = …"></label>`).join('')}</div>
      <p class="hint">Eingabe: Zahl, Bruch (3/4), Dezimalzahl mit Komma oder Punkt, auch sqrt(2), ln(3), pi, e^2.</p>
      <div class="row"><button class="btn" data-act="check">Prüfen</button><button class="btn ghost" data-act="solve">Lösung zeigen</button></div>
      <div class="feedback" aria-live="polite"></div>
      <ol class="steps" hidden>${p.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>`;
  }

  const tutor = (el, p, vals, res, done) => Tutor.open(el, p, vals, res, { math, fmt, esc, done });
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
      fb.innerHTML = ok ? 'Richtig! ✓' : 'Noch nicht ganz – versuch es nochmal oder lass dir den Fehler erklären. <button class="btn ghost" data-act="tutor">Tutor fragen</button>';
      if (ok) { steps.hidden = false; finish(true); }
      else $('[data-act=tutor]', fb).onclick = () => { finish(false); tutor(el, p, vals, res); };
    });
    $('[data-act=solve]', el).addEventListener('click', () => {
      steps.hidden = false;
      fb.className = 'feedback'; fb.innerHTML = 'Lösung: ' + p.answers.map(a => `${esc(a.label)} = ${fmt(a.value)}`).join(', ') + ' <button class="btn ghost" data-act="tutor">Tutor erklärt</button>';
      $('[data-act=tutor]', fb).onclick = () => tutor(el, p, null, null);
      math(fb); finish(false);
    });
    inputs.forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') $('[data-act=check]', el).click(); }));
    math(el);
  }

  const themeOf = id => Themes.find(t => t.ids.includes(id));
  function pool(f) {
    const th = f.thema && Themes.find(t => t.id === f.thema);
    const ok = g => (!f.topic || g.topic === f.topic) && (!th || th.ids.includes(g.id)) && (f.tools === undefined || f.tools === '' || String(g.tools) === f.tools) && (f.level !== 'BF' || g.level === 'BF');
    return { gens: Generators.list.filter(ok), longs: LongTasks.filter(ok) };
  }
  const uebenLink = o => '#/ueben?' + new URLSearchParams(Object.entries(o).filter(([, v]) => v !== '' && v != null)).toString();
  const examChips = f => `<div class="exam card"><div class="lbl">Deine Prüfung</div>
      <div class="filters">${chips('tools', [['false', 'Pflichtteil (ohne Hilfsmittel)'], ['true', 'Wahlteil (mit WTR)']], f.tools, 'Pflicht- & Wahlteil')}</div>
      <div class="filters">${chips('level', [['BF', 'Basisfach']], f.level, 'Leistungsfach')}</div></div>`;
  function themeOverview(f) {
    const { gens, longs } = pool(f), avail = gens.concat(longs), exam = { tools: f.tools, level: f.level };
    const card = t => {
      const tasks = avail.filter(g => t.ids.includes(g.id));
      const r = t.ids.reduce((a, id) => a + (store.stats[id]?.r || 0), 0), w = t.ids.reduce((a, id) => a + (store.stats[id]?.w || 0), 0);
      const parts = [...new Set(tasks.map(g => g.tools ? 'Wahlteil' : 'Pflichtteil'))].sort();
      if (!tasks.length) return `<div class="theme off"><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p><p class="hint">Kommt in dieser Prüfung nicht vor.</p></div>`;
      return `<a class="theme" href="${uebenLink(Object.assign({ thema: t.id }, exam))}">
        <div class="row">${parts.map(x => `<span class="badge ${x === 'Wahlteil' ? 'tools' : ''}">${x}</span>`).join('')}${tasks.some(g => g.level === 'LF') ? '<span class="badge">auch LF</span>' : ''}</div>
        <h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p>
        <ul>${tasks.map(g => `<li>${esc(g.title)}${g.parts ? ' <small>(Wahlteil-Aufgabe)</small>' : ''}</li>`).join('')}</ul>
        <div class="tfoot"><div class="progressbar"><i style="width:${r + w ? r / (r + w) * 100 : 0}%"></i></div><span>${r + w ? `${r}/${r + w} richtig` : 'noch nicht geübt'}</span><b>Üben →</b></div></a>`;
    };
    app.innerHTML = `<h1>Üben nach Themen</h1>
      <p class="muted">Wähle zuerst deine Prüfung und dann ein Thema. So übst du genau das, was bei dir drankommt – jede Aufgabe mit neuen Zahlen und Lösungsweg.</p>
      ${examChips(f)}
      ${TOPICS.map(T => `<h2 class="area">${T}</h2><div class="tgrid">${Themes.filter(t => t.topic === T).map(card).join('')}</div>`).join('')}
      <div class="row" style="margin-top:1.5rem"><a class="btn big" href="${uebenLink(Object.assign({ mix: 1 }, exam))}">Alle Themen gemischt üben →</a></div>`;
    bindChips(app);
  }

  // ---------- Views ----------
  const views = {};

  views[''] = () => {
    const M = Subjects.find(x => x.main), others = Subjects.filter(x => !x.main), orig = Subjects.reduce((a, x) => a + x.orig, 0);
    const tile = x => `<button class="stile" style="${subjVars(x)}" data-subject="${x.id}"><span class="sicon">${x.icon}</span><span><b>${esc(x.name)}</b><small>${x.main ? 'Neue Aufgaben · Test · Original-Abi' : `${x.cards.length} Lernkarten${x.orig ? ` · ${x.orig} Original-Aufgaben` : ' · Abitur-Infos'}`}</small></span><span class="go">→</span></button>`;
    const solved = Object.values(store.stats).reduce((a, x) => a + x.r + x.w, 0);
    const feat = (icon, title, text, to, cta) => `<button class="feat" data-subject="${M.id}" data-to="${to}"><span class="ficon">${icon}</span><h3>${title}</h3><p>${text}</p><span class="more">${cta} →</span></button>`;
    const demoIds = ['ana-tangente', 'ana-integral', 'geo-abstand-punkte', 'sto-urne', 'ana-extrem', 'sto-spiel'];
    app.innerHTML = `<section class="hero" style="${subjVars(M)}">
        <div class="htext">
          <p class="eyebrow">Baden-Württemberg · Kursstufe 11/12 (G8)</p>
          <h1>Dein Abi.<br>Gut vorbereitet.</h1>
          <p class="lead">Der kostenlose Abi-Trainer mit Schwerpunkt Mathe: unbegrenzt neue Aufgaben auf Abitur-Niveau, ein Tutor, der dir deine Fehler erklärt, und echte Prüfungsaufgaben aus dem Länder-Pool.</p>
          <div class="row"><button class="btn big light" data-subject="${M.id}" data-to="#/ueben">${solved ? 'Weiterlernen' : 'Mathe starten'} →</button><a class="btn big outline" href="#faecher">Fach wählen</a></div>
          <ul class="ticks"><li>Ohne Anmeldung</li><li>Komplett kostenlos</li><li>Auch am Handy</li></ul>
        </div>
        <div class="demo" id="demo"></div>
      </section>
      <section class="kpis">
        <div><b>${Generators.list.length + LongTasks.length}</b><span>Aufgabentypen in Mathe</span></div>
        <div><b>${Themes.length}</b><span>Mathe-Themen zum gezielten Üben</span></div>
        <div><b>${orig.toLocaleString('de-DE')}</b><span>Original-Abiaufgaben (2017–2026)</span></div>
        <div><b>${Subjects.length}</b><span>Abiturfächer</span></div>
      </section>
      ${solved ? `<div class="card resume"><div><b>Willkommen zurück!</b><br><span class="muted">Du hast schon ${solved} Mathe-Aufgabe${solved === 1 ? '' : 'n'} bearbeitet.</span></div><div class="row"><button class="btn" data-subject="${M.id}" data-to="#/ueben">Weiter üben</button><button class="btn ghost" data-subject="${M.id}" data-to="#/fortschritt">Mein Fortschritt</button></div></div>` : ''}
      <h2 class="center">Alles, was du fürs Mathe-Abi brauchst</h2>
      <p class="center sub">Vier Werkzeuge, die zusammenarbeiten – vom ersten Üben bis zur Generalprobe.</p>
      <div class="feats">
        ${feat('◎', 'Üben nach Themen', `Wähle Pflichtteil oder Wahlteil, Basis- oder Leistungsfach – und dann genau das Thema, das dir fehlt. Jede Aufgabe kommt mit neuen Zahlen.`, '#/ueben', 'Themen ansehen')}
        ${feat('✦', 'Abi-Tutor', 'Falsch gerechnet? Der Tutor erkennt typische Fehler wie Vorzeichen, Rundung oder Gegenwahrscheinlichkeit und erklärt den Lösungsweg Schritt für Schritt.', '#/ueben?mix=1', 'Ausprobieren')}
        ${feat('✓', 'Test wie im Abi', 'Zehn gemischte Aufgaben aus Analysis, Geometrie und Stochastik, 20 Punkte, Auswertung mit Notenpunkt-Schätzung.', '#/test', 'Test starten')}
        ${feat('§', 'Original-Abi', `${M.orig} echte Prüfungsaufgaben aus dem IQB-Pool mit Erwartungshorizont – nach Jahr, Gebiet und Niveau filterbar.`, '#/original', 'Aufgaben öffnen')}
      </div>
      <h2 class="center">Die Mathe-Themen im Überblick</h2>
      <p class="center sub">Klick auf ein Thema und leg direkt los.</p>
      <div class="topics">${TOPICS.map(tp => `<div class="card"><h3>${tp}</h3><div class="tchips">${Themes.filter(t => t.topic === tp).map(t => `<button class="chip" data-subject="${M.id}" data-to="${uebenLink({ thema: t.id })}">${esc(t.name)}</button>`).join('')}</div></div>`).join('')}</div>
      <h2 id="faecher" class="center">Wähle dein Fach</h2>
      <p class="center sub">Mathe ist der Schwerpunkt. Für ${others.length} weitere Fächer gibt es Lernkarten zum Wiederholen.</p>
      <div class="sgrid main1">${tile(M)}</div>
      <h3 class="center muted">Mit Original-Abiaufgaben aus dem Länder-Pool</h3><div class="sgrid">${others.filter(x => x.orig).map(tile).join('')}</div>
      <h3 class="center muted">Weitere Abiturfächer in Baden-Württemberg</h3><div class="sgrid">${others.filter(x => !x.orig).map(tile).join('')}</div>
      <h2 class="center">So lernst du mit dem Abi-Trainer</h2>
      <div class="steps3">
        <div class="card"><span class="num">1</span><h3>Üben</h3><p>Wähle deine Prüfung und genau die Themen, die du brauchst. Jede Aufgabe kommt mit neuen Zahlen, sofortiger Rückmeldung und Lösungsweg.</p></div>
        <div class="card"><span class="num">2</span><h3>Verstehen</h3><p>Bei Fehlern erklärt dir der Abi-Tutor, was schiefgelaufen ist, und zeigt dir die Regel hinter jedem Schritt.</p></div>
        <div class="card"><span class="num">3</span><h3>Testen</h3><p>Prüfe dich mit einem Test und mit echten Abituraufgaben. Dein Fortschritt zeigt dir, welche Themen noch fehlen.</p></div>
      </div>
      <h2 class="center">Häufige Fragen</h2>
      <div class="faq">
        <details><summary>Kostet der Abi-Trainer etwas?</summary><p>Nein. Die Seite ist kostenlos, ohne Werbung und ohne Anmeldung.</p></details>
        <details><summary>Wo wird mein Fortschritt gespeichert?</summary><p>Nur in deinem Browser auf diesem Gerät. Es gibt kein Konto und es werden keine Daten an einen Server geschickt. Auf einem anderen Gerät fängst du neu an.</p></details>
        <details><summary>Sind das echte Abituraufgaben?</summary><p>Unter „Original-Abi“ findest du echte Aufgaben aus dem gemeinsamen Aufgabenpool der Länder (IQB), aus dem auch Baden-Württemberg Aufgaben entnimmt. Die Übungsaufgaben unter „Üben“ und „Test“ sind eigene Aufgaben im Stil des Abiturs.</p></details>
        <details><summary>Für wen ist die Seite gedacht?</summary><p>Für Schülerinnen und Schüler der Kursstufe (Klasse 11 und 12, G8) in Baden-Württemberg – im Basisfach und im Leistungsfach.</p></details>
        <details><summary>Ist der Abi-Tutor eine KI?</summary><p>Nein. Der Tutor arbeitet mit festen Regeln: Er vergleicht deine Eingabe mit der Lösung, erkennt typische Fehler und erklärt die Schritte. Freie Fragen kann er nicht beantworten.</p></details>
      </div>
      <section class="cta" style="${subjVars(M)}"><h2>Bereit fürs Abi?</h2><p>Fang mit einem Thema an – fünf Minuten reichen.</p><button class="btn big light" data-subject="${M.id}" data-to="#/ueben">Jetzt üben →</button></section>`;
    const demo = () => {
      const g = Generators.byId(demoIds[Math.floor(Math.random() * demoIds.length)]), p = g.make(), d = $('#demo');
      d.innerHTML = `<div class="dhead"><span class="badge">Beispielaufgabe</span><span class="badge">${esc(g.topic)}</span></div><div class="dq">${p.prompt}</div>
        <ol class="steps" hidden>${p.steps.map(x => `<li>${x}</li>`).join('')}</ol>
        <div class="row"><button class="btn" id="dsol">Lösung zeigen</button><button class="btn ghost" id="dnew">Andere Aufgabe</button></div>`;
      $('#dsol').onclick = () => { const o = $('.steps', d); o.hidden = !o.hidden; $('#dsol').textContent = o.hidden ? 'Lösung zeigen' : 'Lösung ausblenden'; };
      $('#dnew').onclick = demo;
      math(d);
    };
    demo();
    app.querySelectorAll('[data-subject]').forEach(b => b.onclick = () => setSubject(b.dataset.subject, b.dataset.to || '#/start'));
  };

  views.start = () => {
    const total = Object.values(store.stats).reduce((a, s) => a + s.r + s.w, 0);
    const right = Object.values(store.stats).reduce((a, s) => a + s.r, 0);
    const S = subj(), cardsKnown = S.cards.filter(c => (store.cards[c.id] || 0) >= 2).length;
    const done = Object.keys(store.orig).filter(id => store.orig[id] === 'done').length;
    app.innerHTML = `<section class="banner"><span class="sicon">${S.icon}</span><div><p class="eyebrow">${S.main ? 'Schwerpunktfach' : 'Fach'}</p><h1>${esc(S.name)}</h1></div>
        <select class="chip" id="sw" aria-label="Fach wechseln">${Subjects.map(x => `<option value="${x.id}" ${x.id === S.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></section>
      <div class="grid">
        ${S.main ? `<a class="tile" href="#/ueben"><div class="big">✎</div><h3>Üben nach Themen</h3><p>${Themes.length} Themen für Pflicht- und Wahlteil, Basis- und Leistungsfach – immer neue Zahlen, mit Lösungsweg.</p></a>
        <a class="tile" href="#/test"><div class="big">◷</div><h3>Test</h3><p>10 gemischte Aufgaben wie im Abi – mit Punkten am Ende.</p></a>` : `<a class="tile" href="#/karten"><div class="big">▦</div><h3>Lernkarten</h3><p>${S.cards.length} Karten zum Grundwissen – umdrehen, merken, wiederholen.</p></a>`}
        <a class="tile" href="#/original"><div class="big">§</div><h3>${S.orig ? 'Original-Abi' : 'Abitur-Infos'}</h3><p>${S.orig ? `${S.orig} echte Abituraufgaben aus dem Länder-Pool (IQB), die auch in BW eingesetzt werden.` : 'Offizielle Informationen und Termine zum Abitur in Baden-Württemberg.'}</p></a>
        <a class="tile" href="#/fortschritt"><div class="big">▲</div><h3>Fortschritt</h3><p>Sieh, welche Themen sitzen und wo du noch üben solltest.</p></a>
      </div>
      <h2>Dein Stand</h2>
      <div class="kpis small">
        ${S.main ? `<div><b>${right} / ${total}</b><span>Aufgaben richtig</span></div>` : `<div><b>${cardsKnown} / ${S.cards.length}</b><span>Karten gelernt</span></div>`}
        <div><b>${done}</b><span>Original-Aufgaben erledigt (alle Fächer)</span></div>
      </div>`;
    $('#sw').onchange = e => setSubject(e.target.value, '#/start');
  };

  views.karten = () => {
    if (!subj().cards.length) return noCards();
    const f = params();
    let deck = subj().cards.filter(c => !f.topic || c.topic === f.topic);
    if (f.mode === 'neu') deck = deck.filter(c => (store.cards[c.id] || 0) < 2);
    deck = shuffle(deck).sort((a, b) => (store.cards[a.id] || 0) - (store.cards[b.id] || 0));
    let i = 0;
    app.innerHTML = `<h1>Lernkarten ${esc(subj().name)}</h1>
      <div class="filters">${chips('topic', cardTopics().map(t => [t, t]), f.topic)}
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
        <div class="flash-wrap"><button class="flash" aria-label="Karte umdrehen"><div class="face front"><span class="tag">${esc(c.topic)} · Begriff</span><div>${c.front}</div></div><div class="face back"><span class="tag">Antwort</span><div>${c.back}</div></div></button></div>
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
    if (!subj().main) return mainOnly('Üben');
    const f = params();
    if (!f.thema && !f.mix && !f.typ && !f.topic) return themeOverview(f);
    const { gens, longs } = pool(f), th = f.thema && Themes.find(t => t.id === f.thema);
    app.innerHTML = `<a class="back" href="${uebenLink({ tools: f.tools, level: f.level })}">← Alle Themen</a>
      <h1>${th ? esc(th.name) : 'Alle Themen gemischt'}</h1>
      ${th ? `<p class="muted">${esc(th.topic)} · ${esc(th.desc)}</p>` : `<div class="filters">${chips('topic', TOPICS.map(t => [t, t]), f.topic)}</div>`}
      ${examChips(f)}
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
      if (!meta) { const all = gens.length ? gens.concat(longs.length && Math.random() < 0.2 ? longs : []) : longs; meta = all[Math.floor(Math.random() * all.length)]; }
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
    if (!subj().main) return mainOnly('Test');
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
      probs.map(({ meta, p }, i) => `<div class="card tq" data-i="${i}" data-id="${esc(meta.id)}"><div><span class="badge">${meta.topic}</span>${meta.tools ? '<span class="badge tools">WTR</span>' : ''}</div>
        ${askHTML(p, i + 1)}<div class="answers">${p.answers.map((a, j) => `<label>${esc(a.label)}<input data-j="${j}" autocomplete="off" placeholder="${esc(a.label)} = …"></label>`).join('')}</div>
        <div class="feedback"></div><ol class="steps" hidden>${p.steps.map(s => `<li>${s}</li>`).join('')}</ol></div>`).join('') +
      `<div class="row"><button class="btn" id="submit">Abgeben</button></div><div id="result"></div>`;
    math(app);
    $('#submit').onclick = () => {
      let pts = 0;
      probs.forEach(({ meta, p }, i) => {
        const el = app.querySelector(`.tq[data-i="${i}"]`), inputs = [...el.querySelectorAll('input')];
        const { res, vals } = check(p.answers, inputs);
        inputs.forEach((inp, j) => { inp.classList.toggle('right', res[j]); inp.classList.toggle('wrong', !res[j]); inp.disabled = true; });
        const n = res.filter(Boolean).length, got = res.every(Boolean) ? 2 : n > 0 ? 1 : 0;
        pts += got; stat(meta.id, got === 2);
        const fb = $('.feedback', el); fb.className = 'feedback ' + (got === 2 ? 'ok' : 'bad');
        fb.textContent = `${got} / 2 Punkte – Lösung: ` + p.answers.map(a => `${a.label} = ${fmt(a.value)}`).join(', ');
        if (got < 2) { const b = document.createElement('button'); b.className = 'btn ghost'; b.textContent = 'Tutor erklärt den Fehler'; b.onclick = () => tutor(el, p, vals, res); fb.append(' ', b); }
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

  const IQBS = {};
  views.original = async () => {
    const f = params(), S = subj();
    if (!S.orig) {
      app.innerHTML = `<h1>Abitur ${esc(S.name)}</h1><div class="card"><p>Für ${esc(S.name)} gibt es keinen gemeinsamen Aufgabenpool der Länder (IQB). In Baden-Württemberg werden die Prüfungen vom Kultusministerium gestellt; Prüfungsaufgaben früherer Jahrgänge bekommst du über deine Schule oder aus Abitur-Trainingsbüchern.</p>
        <div class="row"><a class="btn" href="https://km.baden-wuerttemberg.de/de/schule/gymnasium/abitur-und-oberstufe" target="_blank" rel="noopener">Abitur und Oberstufe (Kultusministerium)</a><a class="btn ghost" href="https://km.baden-wuerttemberg.de/de/schule/gymnasium/termine-und-informationen-zum-abitur" target="_blank" rel="noopener">Termine und Infos zum Abitur</a><a class="btn ghost" href="#/karten">Lernkarten ${esc(S.name)}</a></div></div>`;
      return;
    }
    app.innerHTML = '<h1>Original-Abituraufgaben</h1><p class="muted">Lade Aufgabenliste …</p>';
    if (!IQBS[S.id]) {
      try { IQBS[S.id] = await fetch(`data/iqb-${S.id}.json`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }); }
      catch (e) { if (subj() === S) app.innerHTML = '<h1>Original-Abituraufgaben</h1><div class="card">Die Aufgabenliste konnte nicht geladen werden. Bitte Seite neu laden.</div>'; return; }
    }
    if (subj() !== S || !location.hash.startsWith('#/original')) return;
    const IQB = IQBS[S.id], topics = [...new Set(IQB.map(t => t.topic))].sort();
    const years = [...new Set(IQB.map(t => t.year))].sort().reverse();
    const list = IQB.filter(t => (!f.year || t.year === f.year) && (!f.topic || t.topic === f.topic) && (!f.level || t.level === f.level) && (!f.part || t.part === f.part) && (!f.status || (store.orig[t.id] || 'open') === f.status));
    const per = 30, pages = Math.max(1, Math.ceil(list.length / per)), page = Math.min(pages, Math.max(1, +f.page || 1));
    app.innerHTML = `<h1>Original-Abituraufgaben ${esc(S.name)}</h1>
      <div class="card"><p style="margin:0">Das sind die echten Prüfungsaufgaben aus dem <b>gemeinsamen Abituraufgabenpool der Länder</b> (IQB), aus dem sich auch Baden-Württemberg bedient. Jede PDF enthält die Aufgabe und am Ende den <b>Erwartungshorizont (Lösung)</b> – erst selbst rechnen, dann vergleichen und hier abhaken.
      <br><span class="hint">„grundlegend“ ≈ Basisfach, „erhöht“ ≈ Leistungsfach${S.main ? ' · Teil A = ohne Hilfsmittel, Teil B = mit Hilfsmitteln. Für BW wichtig: Analysis, Analytische Geometrie, Stochastik; im BW-Abi rechnet man mit WTR (nicht CAS)' : ''}. Die Dateien liegen beim IQB und werden nur verlinkt.</span></p></div>
      <div class="filters"><select class="chip" id="year" aria-label="Jahr"><option value="">Alle Jahre</option>${years.map(y => `<option ${f.year === y ? 'selected' : ''}>${y}</option>`).join('')}</select>
        ${S.main ? chips('topic', topics.map(t => [t, t]), f.topic, 'Alle Gebiete') : `<select class="chip" id="topic" aria-label="Bereich"><option value="">Alle Bereiche</option>${topics.map(t => `<option ${f.topic === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`}</div>
      <div class="filters">${chips('level', [['grundlegend', 'Basisfach (grundlegend)'], ['erhöht', 'Leistungsfach (erhöht)']], f.level, 'Beide Niveaus')}
        ${S.main ? chips('part', [['A', 'Teil A ohne Hilfsmittel'], ['B', 'Teil B mit Hilfsmitteln']], f.part, 'Beide Teile') : ''}</div>
      <div class="filters">${chips('status', [['open', 'Offen'], ['again', 'Nochmal'], ['done', 'Erledigt']], f.status, 'Alle')}
        <span style="flex:1"></span><button class="btn ghost" id="rnd">Zufällige Aufgabe</button></div>
      <p class="muted">${list.length} Aufgaben</p>
      <div class="list">${list.slice((page - 1) * per, page * per).map(t => {
        const st = store.orig[t.id] || 'open';
        return `<div class="item ${st}" data-id="${esc(t.id)}"><div><div class="t">${t.title ? esc(t.title) : esc(t.year) + ' · ' + esc(t.topic)}</div><div class="muted" style="font-size:.85rem">${esc(t.title ? [t.year, t.topic, t.level, t.detail].filter(Boolean).join(' · ') : t.detail)}</div></div>
          <div class="row">${t.files.map(fl => `<a class="btn" href="${esc(fl.url)}" target="_blank" rel="noopener">${esc(fl.label)}${/\.pdf$/i.test(fl.url) ? ' (PDF)' : ''}</a>`).join('')}
          <button class="chip" data-s="again" aria-pressed="${st === 'again'}">Nochmal</button><button class="chip" data-s="done" aria-pressed="${st === 'done'}">Erledigt ✓</button></div></div>`;
      }).join('')}</div>
      <div class="row" style="justify-content:center;margin-top:1rem">${page > 1 ? `<button class="btn ghost" data-p="${page - 1}">← Zurück</button>` : ''}<span class="muted">Seite ${page} / ${pages}</span>${page < pages ? `<button class="btn ghost" data-p="${page + 1}">Weiter →</button>` : ''}</div>`;
    bindChips(app);
    $('#year').onchange = e => setParams(Object.assign(params(), { year: e.target.value, page: '' }));
    if ($('#topic')) $('#topic').onchange = e => setParams(Object.assign(params(), { topic: e.target.value, page: '' }));
    app.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { setParams(Object.assign(params(), { page: b.dataset.p })); window.scrollTo(0, 0); });
    app.querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
      const id = b.closest('.item').dataset.id; store.orig[id] = store.orig[id] === b.dataset.s ? 'open' : b.dataset.s; save(); views.original();
    });
    $('#rnd').onclick = () => { const open = list.filter(t => store.orig[t.id] !== 'done'); const t = (open.length ? open : list)[Math.floor(Math.random() * (open.length || list.length))]; if (t) window.open(t.files[0].url, '_blank', 'noopener'); };
  };

  views.fortschritt = () => {
    const S = subj();
    const rows = (S.main ? TOPICS : cardTopics()).map(t => {
      const ids = !S.main ? [] : Generators.list.filter(g => g.topic === t).map(g => g.id).concat(LongTasks.filter(g => g.topic === t).map(g => g.id));
      const r = ids.reduce((a, id) => a + (store.stats[id]?.r || 0), 0), w = ids.reduce((a, id) => a + (store.stats[id]?.w || 0), 0);
      const cards = S.cards.filter(c => c.topic === t), known = cards.filter(c => (store.cards[c.id] || 0) >= 2).length;
      return { t, r, w, cards: cards.length, known };
    });
    const weak = !S.main ? [] : Generators.list.concat(LongTasks).map(g => ({ g, s: store.stats[g.id] })).filter(x => x.s && x.s.w > 0).sort((a, b) => (b.s.w / (b.s.r + b.s.w)) - (a.s.w / (a.s.r + a.s.w))).slice(0, 5);
    app.innerHTML = `<h1>Fortschritt ${esc(S.name)}</h1>
      ${S.main ? `<div class="card"><h2 style="margin-top:0">Nach Themen</h2>${Themes.map(t => { const r = t.ids.reduce((a, id) => a + (store.stats[id]?.r || 0), 0), w = t.ids.reduce((a, id) => a + (store.stats[id]?.w || 0), 0); return `<div class="stat wide"><a href="${uebenLink({ thema: t.id })}">${esc(t.name)}</a><div class="progressbar"><i style="width:${r + w ? r / (r + w) * 100 : 0}%"></i></div><span>${r}/${r + w}</span></div>`; }).join('')}</div>` : ''}
      ${S.main ? `<div class="card"><h2 style="margin-top:0">Aufgaben richtig gelöst</h2>${rows.map(x => `<div class="stat"><span>${x.t}</span><div class="progressbar"><i style="width:${x.r + x.w ? x.r / (x.r + x.w) * 100 : 0}%"></i></div><span>${x.r}/${x.r + x.w}</span></div>`).join('')}</div>` : ''}
      ${S.cards.length ? `<div class="card"><h2 style="margin-top:0">Lernkarten gelernt</h2>${rows.map(x => `<div class="stat"><span>${esc(x.t)}</span><div class="progressbar"><i style="width:${x.known / x.cards * 100}%"></i></div><span>${x.known}/${x.cards}</span></div>`).join('')}</div>` : ''}
      ${weak.length ? `<div class="card"><h2 style="margin-top:0">Hier solltest du noch üben</h2><div class="list">${weak.map(x => `<div class="item"><span>${esc(themeOf(x.g.id)?.name || x.g.topic)}: ${esc(x.g.title)}</span><a class="btn" href="#/ueben?typ=${x.g.id}">Üben</a></div>`).join('')}</div></div>` : ''}
      <p class="hint">Dein Fortschritt wird nur in diesem Browser gespeichert.</p>
      <button class="btn ghost" id="reset">Fortschritt zurücksetzen</button>`;
    $('#reset').onclick = () => { if (confirm('Wirklich den gesamten Fortschritt löschen?')) { localStorage.removeItem(KEY); location.reload(); } };
  };

  const sel = $('#subject');
  sel.innerHTML = Subjects.map(x => `<option value="${x.id}">${esc(x.name)}</option>`).join('');
  sel.onchange = () => setSubject(sel.value);
  const dock = $('#dock');
  // Share of a subject that is mastered: Mathe = themes with more right than wrong answers, others = cards that sit.
  const progressOf = x => x.main
    ? Themes.filter(t => { const r = t.ids.reduce((a, id) => a + (store.stats[id]?.r || 0), 0), w = t.ids.reduce((a, id) => a + (store.stats[id]?.w || 0), 0); return r > 0 && r >= w; }).length / Themes.length
    : x.cards.filter(c => (store.cards[c.id] || 0) >= 2).length / (x.cards.length || 1);
  function paintDock() {
    const S = subj();
    dock.innerHTML = Subjects.map(x => `<button style="${subjVars(x)}" data-id="${x.id}" class="${x === S ? 'on' : ''}" title="${esc(x.name)} – ${Math.round(progressOf(x) * 100)} % geschafft" aria-label="${esc(x.name)}" ${x === S ? 'aria-current="true"' : ''}><span class="sicon">${x.icon}</span><span class="dname">${esc(x.name)}</span><span class="dbar"><i style="width:${progressOf(x) * 100}%"></i></span></button>`).join('');
    dock.querySelectorAll('button').forEach(b => b.onclick = () => setSubject(b.dataset.id, store.last[b.dataset.id] || '#/start'));
    const on = dock.querySelector('.on'); if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  const themeBtn = $('#theme');
  const paintTheme = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeBtn.textContent = dark ? '☀' : '☾';
    themeBtn.setAttribute('aria-label', dark ? 'Helles Design einschalten' : 'Dunkles Design einschalten');
  };
  themeBtn.onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t; localStorage.setItem('abiTrainerBW.theme', t); paintTheme();
  };
  paintTheme();
  function route() {
    const name = (location.hash.replace(/^#\/?/, '').split('?')[0]) || '', S = subj();
    sel.value = S.id;
    document.querySelectorAll('nav [data-main]').forEach(a => a.hidden = !S.main);
    document.querySelectorAll('nav [data-cards]').forEach(a => a.hidden = !S.cards.length);
    document.documentElement.dataset.subject = S.id;
    document.documentElement.style.cssText = subjVars(S);
    document.body.classList.toggle('landing', !name);
    $('#src').href = S.source;
    document.title = `Abi-Trainer BW – ${S.name}`;
    document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + name));
    if (name && views[name]) { store.last[S.id] = location.hash; save(); }
    paintDock();
    (views[name] || views[''])();
    app.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('load', route);
})();
