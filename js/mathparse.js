// Small, safe expression evaluator for student answers: 3/4, -1,5, 2sqrt(3), ln(2), e^2, pi/3
(function (global) {
  const FUNCS = { sqrt: Math.sqrt, ln: Math.log, log: Math.log10, lg: Math.log10, exp: Math.exp, sin: Math.sin, cos: Math.cos, tan: Math.tan, abs: Math.abs };
  const CONSTS = { e: Math.E, pi: Math.PI };

  function tokenize(src) {
    const s = String(src).trim().toLowerCase()
      .replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/·|×/g, '*').replace(/÷|:/g, '/').replace(/−/g, '-')
      .replace(/(\d),(\d)/g, '$1.$2');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
      if (num) { out.push({ t: 'num', v: parseFloat(num[1]) }); i += num[1].length; continue; }
      const id = /^[a-z]+/.exec(s.slice(i));
      if (id) {
        let w = id[0];
        // split things like "pie" or "epi" greedily into known names
        while (w.length) {
          const m = Object.keys(FUNCS).concat(Object.keys(CONSTS)).sort((a, b) => b.length - a.length).find(k => w.startsWith(k));
          if (!m) throw new Error('Unbekannt: ' + w);
          out.push(FUNCS[m] ? { t: 'fn', v: m } : { t: 'num', v: CONSTS[m] });
          w = w.slice(m.length);
        }
        i += id[0].length; continue;
      }
      if ('+-*/^()'.includes(c)) { out.push({ t: c }); i++; continue; }
      throw new Error('Unerlaubtes Zeichen: ' + c);
    }
    // implicit multiplication: 2pi, 2(3), )(, 2sqrt(3)
    const res = [];
    out.forEach((tk, k) => {
      const prev = res[res.length - 1];
      if (prev && (prev.t === 'num' || prev.t === ')') && (tk.t === 'num' || tk.t === 'fn' || tk.t === '(')) res.push({ t: '*' });
      res.push(tk);
    });
    return res;
  }

  function evaluate(src) {
    const toks = tokenize(src);
    if (!toks.length) throw new Error('Leer');
    let p = 0;
    const peek = () => toks[p];
    const eat = t => { if (!toks[p] || toks[p].t !== t) throw new Error('Syntaxfehler'); p++; };
    function expr() {
      let v = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) { const o = toks[p++].t; const r = term(); v = o === '+' ? v + r : v - r; }
      return v;
    }
    function term() {
      let v = unary();
      while (peek() && (peek().t === '*' || peek().t === '/')) { const o = toks[p++].t; const r = unary(); v = o === '*' ? v * r : v / r; }
      return v;
    }
    function unary() {
      if (peek() && peek().t === '-') { p++; return -unary(); }
      if (peek() && peek().t === '+') { p++; return unary(); }
      return power();
    }
    function power() {
      const b = atom();
      if (peek() && peek().t === '^') { p++; return Math.pow(b, unary()); }
      return b;
    }
    function atom() {
      const tk = toks[p];
      if (!tk) throw new Error('Unvollständig');
      if (tk.t === 'num') { p++; return tk.v; }
      if (tk.t === 'fn') {
        p++;
        if (peek() && peek().t === '(') { eat('('); const v = expr(); eat(')'); return FUNCS[tk.v](v); }
        return FUNCS[tk.v](power());
      }
      if (tk.t === '(') { eat('('); const v = expr(); eat(')'); return v; }
      throw new Error('Syntaxfehler');
    }
    const v = expr();
    if (p !== toks.length) throw new Error('Syntaxfehler');
    if (!isFinite(v)) throw new Error('Kein gültiger Wert');
    return v;
  }

  global.MathParse = { evaluate };
})(window);
