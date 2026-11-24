// Checks typed answers for the non-Mathe Übungen (no AI, tolerant to case, accents and small typos).
(function () {
  const STOP = new Set('der die das den dem des ein eine einer eines einem einen und oder the a an of le la les un une el los las lo del de du und mit von zu im in am an auf für bei als auch nicht ist sind wird werden wurde sich sie er es wie was wer dass durch nach über unter aus vor zum zur'.split(' '));
  const PREP = /^(?:mit|im|in|am|an|auf|aus|bei|vom|von|zum|zur|by|with|at|on)\s+(?:(?:der|die|das|den|dem|ein|eine|einen|einer|the|a|an)\s+)?/;
  const ARTICLES = /^(?:(?:der|die|das|den|dem|ein|eine|einen|einer|the|a|an|le|la|les|l|un|une|el|los|las)\s+)?/;
  const MONTHS = 'januar februar marz april mai juni juli august september oktober november dezember'.split(' ');
  const plain = s => String(s).replace(/\\\(.*?\\\)/gs, ' ').replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ');
  const norm = s => plain(s).toLowerCase().replace(/ß/g, 'ss').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\+/g, ' ').replace(/(^|[\s(])[−–-](?=\s*[\divx])/g, '$1 minus ')
    .replace(/[a-z]{3,}/g, w => { const i = MONTHS.findIndex(m => m === w || (w.length >= 5 && lev(w, m) <= 1)); return i < 0 ? w : ' ' + (i + 1) + ' '; })
    .replace(/[^a-z0-9]+/g, ' ').replace(/\b0+(\d)/g, '$1').trim().replace(ARTICLES, '').trim();
  function lev(a, b) {
    if (a === b) return 0;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[b.length];
  }
  const tol = n => n <= 5 ? 0 : n <= 11 ? 1 : 2;
  function variants(answer, given = '') {
    const s = plain(answer), out = new Set([s, s.replace(/\(.*?\)/g, ' ')]);
    (s.match(/\(([^)]*)\)/g) || []).forEach(p => out.add(p.slice(1, -1)));
    for (const v of [...out]) v.split(/\s*(?:\/|;|,|\s–\s|\soder\s|\sor\s|\sou\s|\so\s)\s*/).forEach(p => out.add(p));
    const names = s.replace(/\(.*?\)/g, ' ').trim().split(/\s+/);
    if (names.length >= 2 && names.length <= 4 && names.every(w => /^[A-ZÄÖÜ]/.test(w)) && names.at(-1).length >= 4) out.add(names.at(-1));
    const n = [...out].map(norm);
    n.forEach(v => n.push(v.replace(PREP, '')));
    const known = new Set(norm(given).match(/\d+/g) || []);
    if (known.size) n.forEach(v => n.push(v.replace(/\d+/g, d => known.has(d) ? ' ' : d).replace(/\s+/g, ' ').trim()));
    return [...new Set(n)].filter(v => v.length >= 2);
  }
  const digits = s => (s.match(/\d+/g) || []).join(' ');
  const dist = (x, answer, given) => Math.min(...variants(answer, given).filter(v => digits(v) === digits(x)).map(v => lev(x, v)), Infinity);
  // Accepts small typos, but never when the input is at least as close to one of the wrong answers.
  function accepts(input, answer, others = [], given = '') {
    const x = norm(input);
    if (!x) return false;
    const d = Math.min(...variants(answer, given).filter(v => digits(v) === digits(x)).map(v => lev(x, v) - tol(v.length)), Infinity);
    if (d > 0) return false;
    const own = dist(x, answer, given);
    return own === 0 || !others.some(o => norm(o) !== norm(answer) && dist(x, o, given) <= own);
  }
  // A card front can be typed when it is a short term or name, not a question or a heading like "Summary – rules".
  const isTerm = front => { const s = plain(front).replace(/\(.*?\)/g, '').trim(); return s.length >= 3 && s.length <= 28 && s.split(/\s+/).length <= 3 && !/[:?!=–]|\\\(|\bDefinition\b|\bRegel|\brules?\b|\bdrei\b|\bvier\b|\bzwei\b/i.test(front) && /[a-zäöüß]/i.test(s); };
  const shortAnswer = (q, a) => typeof a === 'string' && !/\\\(|<|\$/.test(a) && plain(a).length <= 26 && a.split(/\s+/).length <= 3 &&
    !/nicht|kein|falsch|aussage|trifft|folgend|stimmt|richtig|passt|beschreibt|gehört|not |true|which statement|correct|übersetz|translat|tradu|linker|connect|conector|konnektor/i.test(plain(q)) &&
    !/(…|\.\.\.)\s*$/.test(plain(q).trim()) && (!/_{2,}/.test(q) || /_{2,}[^(]*\([^)]+\)/.test(q));
  function mask(text, term) {
    let out = text;
    const base = plain(term).replace(/\(.*?\)/g, '').trim(), words = base.split(/\s+/).filter(w => w.length >= 4 && !STOP.has(w.toLowerCase()));
    for (const v of new Set([base, ...(plain(term).match(/\(([^)]*)\)/g) || []).map(p => p.slice(1, -1)), ...words].sort((a, b) => b.length - a.length))) {
      if (v.length < 3 || /^\d/.test(v)) continue;
      out = out.replace(new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '___');
    }
    return out;
  }
  // Key terms of a model answer: nouns and names first (capitalised in German), then the longest other words.
  function keywords(text) {
    const seen = new Set(), all = [];
    for (const w of plain(text).split(/[^A-Za-zÄÖÜäöüßÀ-ÿ0-9-]+/)) {
      const n = norm(w);
      if (n.length < 5 || STOP.has(n) || seen.has(n.slice(0, 6))) continue;
      seen.add(n.slice(0, 6)); all.push(w);
    }
    const caps = all.filter(w => /^[A-ZÄÖÜ]/.test(w));
    const pick = caps.length >= 3 ? caps : caps.concat(all.filter(w => !caps.includes(w)).sort((a, b) => b.length - a.length));
    return pick.slice(0, 6);
  }
  // A keyword counts as named when a written word shares its first letters (handles endings like "Selektion"/"selektiert").
  function hits(input, words) {
    const all = norm(input), typed = all.split(' ').filter(Boolean);
    return words.filter(w => { const k = norm(w); if (k.includes(' ') && (' ' + all + ' ').includes(' ' + k + ' ')) return true; const stem = k.slice(0, Math.max(5, Math.ceil(k.length * .7))); return typed.some(t => t.startsWith(stem) || (t.length >= 5 && lev(t, k) <= tol(k.length))); });
  }
  window.AnswerCheck = { norm, variants, accepts, isTerm, shortAnswer, mask, keywords, hits };
})();
