// Parametric problem generators in the style of the BW Abitur (Pflichtteil without, Wahlteil with tools).
// Each generator returns { prompt, answers:[{label, value, tol?, group?}], steps:[...], hint? }.
// Answers with the same `group` may be entered in any order.
(function (global) {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const nz = (a, b) => { let v; do { v = ri(a, b); } while (v === 0); return v; };
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };

  function frac(n, d = 1) {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d); n /= g; d /= g;
    if (d === 1) return String(n);
    return (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}';
  }
  // LaTeX for polynomial with integer/fraction-string coefficients [[coef, power], ...]
  function poly(terms, v = 'x') {
    let s = '';
    terms.forEach(([c, k]) => {
      if (c === 0) return;
      const sign = c < 0 ? '-' : '+';
      const a = Math.abs(c);
      const coef = (a === 1 && k !== 0) ? '' : String(a);
      const pow = k === 0 ? '' : k === 1 ? v : v + '^{' + k + '}';
      s += (s === '' ? (c < 0 ? '-' : '') : ' ' + sign + ' ') + coef + pow;
    });
    return s || '0';
  }
  const sgn = (c, txt) => (c < 0 ? ' - ' : ' + ') + (txt === undefined ? Math.abs(c) : txt);
  const vec = v => '\\begin{pmatrix}' + v.join('\\\\') + '\\end{pmatrix}';
  const pt = (name, v) => name + '(' + v.join('\\mid ') + ')';
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
  const binom = (n, p, k) => comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  const r4 = x => Math.round(x * 10000) / 10000;
  const dec = (x, d = 4) => String(Math.round(x * 10 ** d) / 10 ** d).replace('.', ',');
  const NICE = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [2, 1, 2, 3], [6, 2, 3, 7]];
  const niceVec = () => { const q = pick(NICE); const v = q.slice(0, 3).map(x => x * pick([1, -1])); return { v: v.sort(() => Math.random() - .5), len: q[3] }; };

  const G = [];
  const add = (meta, fn) => G.push(Object.assign(meta, { make: fn }));

  // ---------- Analysis ----------
  add({ id: 'ana-tangente', topic: 'Analysis', title: 'Tangentengleichung', tools: false, level: 'BF' }, () => {
    const a = nz(-2, 2), b = ri(-3, 3), c = ri(-4, 4), d = ri(-5, 5), x0 = nz(-2, 2);
    const f0 = a * x0 ** 3 + b * x0 ** 2 + c * x0 + d, m = 3 * a * x0 ** 2 + 2 * b * x0 + c, n = f0 - m * x0;
    return {
      prompt: `Gegeben ist \\(f(x) = ${poly([[a, 3], [b, 2], [c, 1], [d, 0]])}\\). Bestimmen Sie die Gleichung der Tangente an den Graphen von \\(f\\) im Punkt mit \\(x_0 = ${x0}\\) in der Form \\(y = mx + n\\).`,
      answers: [{ label: 'm', value: m }, { label: 'n', value: n }],
      steps: [`\\(f'(x) = ${poly([[3 * a, 2], [2 * b, 1], [c, 0]])}\\)`, `\\(f(${x0}) = ${f0}\\), \\(m = f'(${x0}) = ${m}\\)`, `\\(n = f(x_0) - m\\cdot x_0 = ${f0} - (${m})\\cdot(${x0}) = ${n}\\)`, `Tangente: \\(y = ${poly([[m, 1], [n, 0]])}\\)`]
    };
  });

  add({ id: 'ana-produktregel', topic: 'Analysis', title: 'Produkt- und Kettenregel', tools: false, level: 'BF' }, () => {
    const a = nz(-4, 4), b = nz(-5, 5), k = nz(-3, 3);
    const v = a + k * b, ek = k === 1 ? 'e^{x}' : k === -1 ? 'e^{-x}' : `e^{${k}x}`;
    return {
      prompt: `Gegeben ist \\(f(x) = (${poly([[a, 1], [b, 0]])})\\cdot e^{${k === 1 ? '' : k === -1 ? '-' : k}x}\\). Berechnen Sie \\(f'(0)\\).`,
      answers: [{ label: "f'(0)", value: v }],
      steps: [`Produktregel: \\(f'(x) = ${a}\\cdot ${ek} + (${poly([[a, 1], [b, 0]])})\\cdot (${k})${ek}\\)`, `\\(f'(x) = (${poly([[a * k, 1], [a + b * k, 0]])})\\,${ek}\\)`, `\\(f'(0) = ${a} + ${k}\\cdot(${b}) = ${v}\\)`]
    };
  });

  add({ id: 'ana-integral', topic: 'Analysis', title: 'Bestimmtes Integral', tools: false, level: 'BF' }, () => {
    const a = nz(-3, 3) * 3, b = ri(-4, 4) * 2, c = ri(-5, 5), p = ri(-2, 1), q = p + ri(1, 3);
    const F = x => (a / 3) * x ** 3 + (b / 2) * x ** 2 + c * x;
    const v = F(q) - F(p);
    return {
      prompt: `Berechnen Sie \\(\\displaystyle\\int_{${p}}^{${q}} \\left(${poly([[a, 2], [b, 1], [c, 0]])}\\right)\\,dx\\).`,
      answers: [{ label: 'Wert', value: v }],
      steps: [`Stammfunktion: \\(F(x) = ${poly([[a / 3, 3], [b / 2, 2], [c, 1]])}\\)`, `\\(F(${q}) = ${F(q)}\\), \\(F(${p}) = ${F(p)}\\)`, `\\(\\int = F(${q}) - F(${p}) = ${v}\\)`]
    };
  });

  add({ id: 'ana-expgleichung', topic: 'Analysis', title: 'Exponentialgleichung', tools: false, level: 'BF' }, () => {
    let m = ri(1, 6), n; do { n = ri(1, 7); } while (n === m);
    const s = m + n, pr = m * n;
    const ln = k => k === 1 ? '0' : `\\ln(${k})`;
    return {
      prompt: `Lösen Sie die Gleichung \\(e^{2x} - ${s}e^{x} + ${pr} = 0\\). (Eingabe z.&nbsp;B. <code>ln(3)</code>)`,
      answers: [{ label: 'x₁', value: Math.log(m), group: 1, tol: 0.002 }, { label: 'x₂', value: Math.log(n), group: 1, tol: 0.002 }],
      steps: ['Substitution \\(u = e^x\\): \\(u^2 - ' + s + 'u + ' + pr + ' = 0\\)', `pq-Formel / Vieta: \\(u_1 = ${m}\\), \\(u_2 = ${n}\\)`, `Rücksubstitution: \\(x_1 = ${ln(m)}\\), \\(x_2 = ${ln(n)}\\)`]
    };
  });

  add({ id: 'ana-extrem', topic: 'Analysis', title: 'Hochpunkt bestimmen', tools: false, level: 'BF' }, () => {
    const k = ri(1, 3), a = pick([1, -1, 2]), c = ri(-6, 6);
    const xH = a > 0 ? -k : k, yH = a * (xH ** 3 - 3 * k * k * xH) + c;
    return {
      prompt: `Gegeben ist \\(f(x) = ${poly([[a, 3], [-3 * a * k * k, 1], [c, 0]])}\\). Bestimmen Sie die Koordinaten des Hochpunkts.`,
      answers: [{ label: 'x_H', value: xH }, { label: 'y_H', value: yH }],
      steps: [`\\(f'(x) = ${poly([[3 * a, 2], [-3 * a * k * k, 0]])} = 0 \\Rightarrow x = \\pm ${k}\\)`, `\\(f''(x) = ${poly([[6 * a, 1]])}\\), \\(f''(${xH}) = ${6 * a * xH} < 0\\) ⇒ Hochpunkt`, `\\(H(${xH}\\mid ${yH})\\)`]
    };
  });

  add({ id: 'ana-wendepunkt', topic: 'Analysis', title: 'Wendepunkt', tools: false, level: 'BF' }, () => {
    const b = nz(-2, 2) * 3, c = ri(-5, 5), d = ri(-4, 4);
    const xw = -b / 3, yw = xw ** 3 + b * xw ** 2 + c * xw + d, mw = 3 * xw ** 2 + 2 * b * xw + c;
    return {
      prompt: `Gegeben ist \\(f(x) = ${poly([[1, 3], [b, 2], [c, 1], [d, 0]])}\\). Bestimmen Sie den Wendepunkt \\(W\\) und die Steigung des Graphen in \\(W\\).`,
      answers: [{ label: 'x_W', value: xw }, { label: 'y_W', value: yw }, { label: 'Steigung', value: mw }],
      steps: [`\\(f''(x) = ${poly([[6, 1], [2 * b, 0]])} = 0 \\Rightarrow x_W = ${xw}\\)`, `\\(f'''(x) = 6 \\neq 0\\) ⇒ Wendestelle`, `\\(y_W = f(${xw}) = ${yw}\\), \\(f'(${xw}) = ${mw}\\)`]
    };
  });

  add({ id: 'ana-aenderungsrate', topic: 'Analysis', title: 'Mittlere Änderungsrate', tools: false, level: 'BF' }, () => {
    const a = nz(-3, 3), b = ri(-5, 5), p = ri(-3, 2), q = p + ri(1, 4);
    const f = x => a * x * x + b * x, v = (f(q) - f(p)) / (q - p);
    return {
      prompt: `Berechnen Sie die mittlere Änderungsrate von \\(f(x) = ${poly([[a, 2], [b, 1]])}\\) im Intervall \\([${p};\\,${q}]\\).`,
      answers: [{ label: 'Rate', value: v }],
      steps: [`\\(f(${q}) = ${f(q)}\\), \\(f(${p}) = ${f(p)}\\)`, `\\(\\dfrac{f(${q}) - f(${p})}{${q} - (${p})} = \\dfrac{${f(q) - f(p)}}{${q - p}} = ${v}\\)`]
    };
  });

  add({ id: 'ana-stammfunktion', topic: 'Analysis', title: 'Stammfunktion mit Bedingung', tools: false, level: 'BF' }, () => {
    const a = nz(-2, 3), b = ri(-3, 3), c = ri(-4, 4), x1 = pick([1, -1, 2]), K = ri(-6, 6);
    const base = a * x1 ** 3 - b * x1 ** 2 + c * x1, C = K - base;
    return {
      prompt: `Bestimmen Sie diejenige Stammfunktion \\(F\\) von \\(f(x) = ${poly([[3 * a, 2], [-2 * b, 1], [c, 0]])}\\), für die \\(F(${x1}) = ${K}\\) gilt. Geben Sie die Konstante \\(C\\) an.`,
      answers: [{ label: 'C', value: C }],
      steps: [`\\(F(x) = ${poly([[a, 3], [-b, 2], [c, 1]])} + C\\)`, `\\(F(${x1}) = ${base} + C = ${K}\\)`, `\\(C = ${C}\\)`]
    };
  });

  add({ id: 'ana-trig', topic: 'Analysis', title: 'Trigonometrische Funktion', tools: false, level: 'BF' }, () => {
    const a = ri(1, 4), b = pick([1, 2, 3, 4, 0.5]), d = ri(-3, 3);
    const bTex = b === 0.5 ? '\\tfrac{1}{2}' : b === 1 ? '' : b;
    return {
      prompt: `Gegeben ist \\(f(x) = ${a === 1 ? '' : a}\\sin(${bTex}x)${d ? sgn(d) : ''}\\). Geben Sie die Periode \\(p\\) sowie den größten Funktionswert an. (Eingabe z.&nbsp;B. <code>pi/2</code>)`,
      answers: [{ label: 'Periode p', value: 2 * Math.PI / b, tol: 0.01 }, { label: 'Maximum', value: a + d }],
      steps: [`Periode: \\(p = \\dfrac{2\\pi}{${b}} = ${b === 0.5 ? '4\\pi' : b === 1 ? '2\\pi' : b === 2 ? '\\pi' : '\\frac{2\\pi}{' + b + '}'}\\)`, `Amplitude ${a}, Verschiebung um ${d} in y-Richtung ⇒ Maximum \\(${a} + (${d}) = ${a + d}\\)`]
    };
  });

  add({ id: 'ana-flaeche', topic: 'Analysis', title: 'Fläche Parabel – x-Achse', tools: false, level: 'BF' }, () => {
    const p = ri(-3, 1), q = p + ri(1, 4), a = pick([1, 1, 2, 3]);
    // f(x) = -a(x-p)(x-q)
    const A = a * (q - p) ** 3 / 6;
    return {
      prompt: `Der Graph von \\(f(x) = ${poly([[-a, 2], [a * (p + q), 1], [-a * p * q, 0]])}\\) schließt mit der x-Achse eine Fläche ein. Berechnen Sie ihren Inhalt.`,
      answers: [{ label: 'A', value: A }],
      steps: [`Nullstellen: \\(f(x) = ${-a === -1 ? '-' : -a}(x ${sgn(-p)})(x ${sgn(-q)})\\) ⇒ \\(x_1 = ${p}\\), \\(x_2 = ${q}\\)`, `\\(A = \\int_{${p}}^{${q}} f(x)\\,dx\\)`, `\\(A = ${frac(a * (q - p) ** 3, 6)}\\)`]
    };
  });

  add({ id: 'ana-wachstum', topic: 'Analysis', title: 'Exponentielles Wachstum (WTR)', tools: true, level: 'BF' }, () => {
    const N0 = pick([200, 500, 800, 1200]), k = pick([0.05, 0.08, 0.12, 0.15, 0.2, 0.035]), t = ri(3, 12), G = pick([2, 3]);
    const Nt = N0 * Math.exp(k * t), T = Math.log(G) / k;
    return {
      prompt: `Eine Bakterienkultur wird durch \\(N(t) = ${N0}\\cdot e^{${String(k).replace('.', '{,}')}t}\\) beschrieben (t in Stunden). a) Berechnen Sie \\(N(${t})\\) (gerundet auf ganze Zahlen). b) Nach welcher Zeit hat sich die Kultur ver${G === 2 ? 'doppelt' : 'dreifacht'}? (auf 2 Nachkommastellen)`,
      answers: [{ label: `N(${t})`, value: Math.round(Nt), tol: 1.01 }, { label: 't (h)', value: T, tol: 0.011 }],
      steps: [`\\(N(${t}) = ${N0}\\cdot e^{${k * t}} \\approx ${Math.round(Nt)}\\)`, `\\(${N0}e^{${k}t} = ${G}\\cdot ${N0} \\Rightarrow t = \\dfrac{\\ln ${G}}{${k}} \\approx ${dec(T, 2)}\\)`]
    };
  });

  add({ id: 'ana-optimierung', topic: 'Analysis', title: 'Extremwertproblem Rechteck', tools: false, level: 'LF' }, () => {
    const c = pick([3, 6, 12, 27, 48]); // f(x) = c - x^2 (x>0), rectangle under curve with corners (±x|0),(±x|f(x))
    const x = Math.sqrt(c / 3), A = 2 * x * (c - x * x);
    return {
      prompt: `Unter dem Graphen von \\(f(x) = ${c} - x^2\\) liegt ein Rechteck mit zwei Ecken auf der x-Achse und zwei Ecken auf dem Graphen (symmetrisch zur y-Achse). Für welches \\(u > 0\\) (halbe Breite) wird der Flächeninhalt maximal? Wie groß ist er?`,
      answers: [{ label: 'u', value: x, tol: 0.01 }, { label: 'A_max', value: A, tol: 0.05 }],
      steps: [`\\(A(u) = 2u\\cdot(${c} - u^2) = ${2 * c}u - 2u^3\\)`, `\\(A'(u) = ${2 * c} - 6u^2 = 0 \\Rightarrow u = \\sqrt{${frac(c, 3)}} = ${dec(x, 3)}\\)`, `\\(A''(u) = -12u < 0\\) ⇒ Maximum, \\(A_{max} = ${dec(A, 3)}\\)`]
    };
  });

  // ---------- Analytische Geometrie ----------
  add({ id: 'geo-abstand-punkte', topic: 'Geometrie', title: 'Abstand zweier Punkte', tools: false, level: 'BF' }, () => {
    const A = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], { v, len } = niceVec(), B = A.map((x, i) => x + v[i]);
    return {
      prompt: `Berechnen Sie den Abstand der Punkte \\(${pt('A', A)}\\) und \\(${pt('B', B)}\\).`,
      answers: [{ label: '|AB|', value: len }],
      steps: [`\\(\\vec{AB} = ${vec(v)}\\)`, `\\(|\\vec{AB}| = \\sqrt{${v.map(x => x * x).join('+')}} = \\sqrt{${len * len}} = ${len}\\)`]
    };
  });

  add({ id: 'geo-orthogonal', topic: 'Geometrie', title: 'Orthogonale Vektoren', tools: false, level: 'BF' }, () => {
    const u = [nz(-4, 4), nz(-4, 4), nz(-3, 3)], w = [nz(-4, 4), nz(-4, 4)];
    const t = -(u[0] * w[0] + u[1] * w[1]) / u[2];
    return {
      prompt: `Bestimmen Sie \\(t\\) so, dass \\(\\vec u = ${vec(u)}\\) und \\(\\vec v = ${vec([w[0], w[1], 't'])}\\) orthogonal sind.`,
      answers: [{ label: 't', value: t }],
      steps: [`Bedingung: \\(\\vec u \\cdot \\vec v = 0\\)`, `\\(${u[0] * w[0]} ${sgn(u[1] * w[1])} ${sgn(u[2], Math.abs(u[2]) + 't')} = 0\\)`, `\\(t = ${frac(-(u[0] * w[0] + u[1] * w[1]), u[2])}\\)`]
    };
  });

  add({ id: 'geo-ebene-spurpunkt', topic: 'Geometrie', title: 'Ebene durch drei Punkte', tools: false, level: 'BF' }, () => {
    let A, B, C, n;
    do {
      A = [ri(-3, 3), ri(-3, 3), ri(-3, 3)]; B = [ri(-3, 3), ri(-3, 3), ri(-3, 3)]; C = [ri(-3, 3), ri(-3, 3), ri(-3, 3)];
      n = cross(sub(B, A), sub(C, A));
    } while (n[2] === 0 || n.some(x => Math.abs(x) > 12) || dot(n, A) === 0);
    const g = gcd(gcd(n[0], n[1]), n[2]); n = n.map(x => x / g);
    const d = dot(n, A);
    return {
      prompt: `Die Ebene \\(E\\) enthält die Punkte \\(${pt('A', A)}\\), \\(${pt('B', B)}\\) und \\(${pt('C', C)}\\). Bestimmen Sie eine Koordinatengleichung von \\(E\\) und geben Sie den Schnittpunkt von \\(E\\) mit der \\(x_3\\)-Achse an (nur \\(x_3\\)-Koordinate).`,
      answers: [{ label: 'x₃', value: d / n[2] }],
      steps: [`\\(\\vec{AB} = ${vec(sub(B, A))}\\), \\(\\vec{AC} = ${vec(sub(C, A))}\\)`, `Normalenvektor \\(\\vec n = \\vec{AB}\\times\\vec{AC} \\sim ${vec(n)}\\)`, `\\(E: ${poly([[n[0], 1]], 'x_1')}${n[1] ? sgn(n[1], (Math.abs(n[1]) === 1 ? '' : Math.abs(n[1])) + 'x_2') : ''}${sgn(n[2], (Math.abs(n[2]) === 1 ? '' : Math.abs(n[2])) + 'x_3')} = ${d}\\)`, `\\(x_1 = x_2 = 0 \\Rightarrow x_3 = ${frac(d, n[2])}\\)`]
    };
  });

  add({ id: 'geo-abstand-ebene', topic: 'Geometrie', title: 'Abstand Punkt – Ebene', tools: false, level: 'BF' }, () => {
    const { v: n, len } = niceVec(), d = ri(-10, 10), Q = [ri(-5, 5), ri(-5, 5), ri(-5, 5)];
    const dist = Math.abs(dot(n, Q) - d) / len;
    const E = `${n[0]}x_1 ${sgn(n[1], Math.abs(n[1]) + 'x_2')} ${sgn(n[2], Math.abs(n[2]) + 'x_3')} = ${d}`;
    return {
      prompt: `Berechnen Sie den Abstand des Punktes \\(${pt('Q', Q)}\\) von der Ebene \\(E: ${E}\\).`,
      answers: [{ label: 'd', value: dist }],
      steps: [`\\(|\\vec n| = \\sqrt{${n.map(x => x * x).join('+')}} = ${len}\\)`, `Hesse: \\(d = \\dfrac{|${n[0]}\\cdot(${Q[0]}) + ${n[1]}\\cdot(${Q[1]}) + ${n[2]}\\cdot(${Q[2]}) - (${d})|}{${len}} = \\dfrac{${Math.abs(dot(n, Q) - d)}}{${len}}\\)`, `\\(d = ${frac(Math.abs(dot(n, Q) - d), len)}\\)`]
    };
  });

  add({ id: 'geo-schnitt-gerade-ebene', topic: 'Geometrie', title: 'Schnittpunkt Gerade – Ebene', tools: false, level: 'BF' }, () => {
    let A, u, n, t;
    do {
      A = [ri(-4, 4), ri(-4, 4), ri(-4, 4)]; u = [ri(-3, 3), ri(-3, 3), ri(-3, 3)]; n = [ri(-3, 3), ri(-3, 3), nz(-3, 3)]; t = nz(-3, 3);
    } while (dot(n, u) === 0);
    const S = A.map((x, i) => x + t * u[i]), d = dot(n, S);
    const E = [[n[0], 'x_1'], [n[1], 'x_2'], [n[2], 'x_3']].filter(([c]) => c).map(([c, x], i) => (i === 0 ? (c < 0 ? '-' : '') : (c < 0 ? ' - ' : ' + ')) + (Math.abs(c) === 1 ? '' : Math.abs(c)) + x).join('');
    return {
      prompt: `Bestimmen Sie den Schnittpunkt \\(S\\) der Geraden \\(g: \\vec x = ${vec(A)} + t\\cdot${vec(u)}\\) mit der Ebene \\(E: ${E} = ${d}\\).`,
      answers: [{ label: 's₁', value: S[0] }, { label: 's₂', value: S[1] }, { label: 's₃', value: S[2] }],
      steps: ['Geradengleichung koordinatenweise in \\(E\\) einsetzen', `\\(${dot(n, A)} ${sgn(dot(n, u), Math.abs(dot(n, u)) + 't')} = ${d} \\Rightarrow t = ${t}\\)`, `\\(${pt('S', S)}\\)`]
    };
  });

  add({ id: 'geo-spiegelpunkt', topic: 'Geometrie', title: 'Punktspiegelung', tools: false, level: 'BF' }, () => {
    const A = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], B = [ri(-5, 5), ri(-5, 5), ri(-5, 5)], R = B.map((x, i) => 2 * x - A[i]);
    return {
      prompt: `Der Punkt \\(${pt('A', A)}\\) wird am Punkt \\(${pt('Z', B)}\\) gespiegelt. Bestimmen Sie den Bildpunkt \\(A'\\).`,
      answers: [{ label: 'a₁', value: R[0] }, { label: 'a₂', value: R[1] }, { label: 'a₃', value: R[2] }],
      steps: [`\\(\\vec{OA'} = \\vec{OA} + 2\\cdot\\vec{AZ} = ${vec(A)} + 2\\cdot${vec(sub(B, A))}\\)`, `\\(${pt("A'", R)}\\)`]
    };
  });

  add({ id: 'geo-winkel', topic: 'Geometrie', title: 'Winkel zwischen Vektoren (WTR)', tools: true, level: 'BF' }, () => {
    const u = [ri(-4, 4), ri(-4, 4), nz(-4, 4)], v = [nz(-4, 4), ri(-4, 4), ri(-4, 4)];
    const cos = Math.max(-1, Math.min(1, dot(u, v) / Math.hypot(...u) / Math.hypot(...v))), w = Math.acos(cos) * 180 / Math.PI;
    return {
      prompt: `Berechnen Sie den Winkel zwischen \\(\\vec u = ${vec(u)}\\) und \\(\\vec v = ${vec(v)}\\) in Grad (auf eine Nachkommastelle).`,
      answers: [{ label: 'α (°)', value: w, tol: 0.06 }],
      steps: [`\\(\\cos\\alpha = \\dfrac{\\vec u\\cdot\\vec v}{|\\vec u|\\cdot|\\vec v|} = \\dfrac{${dot(u, v)}}{\\sqrt{${dot(u, u)}}\\cdot\\sqrt{${dot(v, v)}}}\\)`, `\\(\\alpha \\approx ${dec(w, 1)}^\\circ\\)`]
    };
  });

  add({ id: 'geo-dreieck', topic: 'Geometrie', title: 'Flächeninhalt Dreieck (WTR)', tools: true, level: 'LF' }, () => {
    const A = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], B = A.map(x => x + ri(-4, 4)), C = A.map(x => x + ri(-4, 4));
    const c = cross(sub(B, A), sub(C, A)), F = Math.hypot(...c) / 2;
    if (F < 0.5) return G.find(g => g.id === 'geo-dreieck').make();
    return {
      prompt: `Berechnen Sie den Flächeninhalt des Dreiecks mit \\(${pt('A', A)}\\), \\(${pt('B', B)}\\), \\(${pt('C', C)}\\) (auf 2 Nachkommastellen).`,
      answers: [{ label: 'F', value: F, tol: 0.011 }],
      steps: [`\\(\\vec{AB}\\times\\vec{AC} = ${vec(c)}\\)`, `\\(F = \\tfrac12\\,|\\vec{AB}\\times\\vec{AC}| = \\tfrac12\\sqrt{${dot(c, c)}} \\approx ${dec(F, 2)}\\)`]
    };
  });

  // ---------- Stochastik ----------
  add({ id: 'sto-binomial', topic: 'Stochastik', title: 'Binomialverteilung P(X = k)', tools: true, level: 'BF' }, () => {
    const n = ri(6, 20), p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.6, 0.7, 0.8]), k = ri(1, Math.min(n - 1, Math.round(n * p) + 2));
    const v = binom(n, p, k);
    return {
      prompt: `Bei einem Glücksrad gewinnt man mit Wahrscheinlichkeit \\(p = ${String(p).replace('.', '{,}')}\\). Es wird \\(${n}\\)-mal gedreht. Berechnen Sie die Wahrscheinlichkeit für genau \\(${k}\\) Gewinne (auf 4 Nachkommastellen).`,
      answers: [{ label: 'P', value: r4(v), tol: 0.00051 }],
      steps: [`\\(X\\sim B(${n};\\,${p})\\)`, `\\(P(X=${k}) = \\binom{${n}}{${k}}\\cdot ${p}^{${k}}\\cdot ${r4(1 - p)}^{${n - k}} \\approx ${dec(v)}\\)`]
    };
  });

  add({ id: 'sto-mindestens', topic: 'Stochastik', title: 'Mindestens einmal', tools: true, level: 'BF' }, () => {
    const p = pick([0.05, 0.1, 0.15, 0.2, 0.3]), q = pick([0.9, 0.95, 0.99]);
    const n = Math.ceil(Math.log(1 - q) / Math.log(1 - p));
    return {
      prompt: `Ein Los gewinnt mit Wahrscheinlichkeit \\(${String(p).replace('.', '{,}')}\\). Wie viele Lose muss man mindestens kaufen, um mit einer Wahrscheinlichkeit von mindestens \\(${q * 100}\\,\\%\\) mindestens einmal zu gewinnen?`,
      answers: [{ label: 'n', value: n }],
      steps: [`\\(P(X\\geq 1) = 1 - ${1 - p}^n \\geq ${q}\\)`, `\\(${1 - p}^n \\leq ${r4(1 - q)} \\Rightarrow n \\geq \\dfrac{\\ln ${r4(1 - q)}}{\\ln ${1 - p}} \\approx ${dec(Math.log(1 - q) / Math.log(1 - p), 2)}\\)`, `Also \\(n = ${n}\\)`]
    };
  });

  add({ id: 'sto-erwartung', topic: 'Stochastik', title: 'Erwartungswert & Standardabweichung', tools: true, level: 'BF' }, () => {
    const n = pick([20, 25, 40, 50, 80, 100, 200]), p = pick([0.1, 0.2, 0.25, 0.4, 0.5, 0.6]);
    const mu = n * p, s = Math.sqrt(n * p * (1 - p));
    return {
      prompt: `\\(X\\) ist binomialverteilt mit \\(n = ${n}\\) und \\(p = ${String(p).replace('.', '{,}')}\\). Berechnen Sie Erwartungswert \\(\\mu\\) und Standardabweichung \\(\\sigma\\) (2 Nachkommastellen).`,
      answers: [{ label: 'μ', value: mu }, { label: 'σ', value: s, tol: 0.011 }],
      steps: [`\\(\\mu = n\\cdot p = ${mu}\\)`, `\\(\\sigma = \\sqrt{n\\cdot p\\cdot(1-p)} = \\sqrt{${r4(n * p * (1 - p))}} \\approx ${dec(s, 2)}\\)`]
    };
  });

  add({ id: 'sto-urne', topic: 'Stochastik', title: 'Ziehen ohne Zurücklegen', tools: false, level: 'BF' }, () => {
    const r = ri(2, 6), b = ri(2, 6), N = r + b;
    return {
      prompt: `In einer Urne liegen ${r} rote und ${b} blaue Kugeln. Es werden zwei Kugeln ohne Zurücklegen gezogen. Berechnen Sie die Wahrscheinlichkeit, dass beide Kugeln dieselbe Farbe haben. (Bruch erlaubt)`,
      answers: [{ label: 'P', value: (r * (r - 1) + b * (b - 1)) / (N * (N - 1)), tol: 0.0005 }],
      steps: [`\\(P(rr) = \\frac{${r}}{${N}}\\cdot\\frac{${r - 1}}{${N - 1}}\\), \\(P(bb) = \\frac{${b}}{${N}}\\cdot\\frac{${b - 1}}{${N - 1}}\\)`, `\\(P = \\dfrac{${r * (r - 1)} + ${b * (b - 1)}}{${N * (N - 1)}} = ${frac(r * (r - 1) + b * (b - 1), N * (N - 1))}\\)`]
    };
  });

  add({ id: 'sto-bayes', topic: 'Stochastik', title: 'Vierfeldertafel / bedingte Wahrscheinlichkeit', tools: true, level: 'BF' }, () => {
    const pA = pick([0.01, 0.02, 0.05, 0.1, 0.2]), sens = pick([0.9, 0.95, 0.98, 0.99]), fp = pick([0.02, 0.05, 0.1]);
    const pB = pA * sens + (1 - pA) * fp, v = pA * sens / pB;
    return {
      prompt: `${pA * 100} % einer Bevölkerung haben eine Krankheit. Ein Test erkennt Kranke mit ${Math.round(sens * 100)} % Wahrscheinlichkeit, zeigt aber auch bei ${Math.round(fp * 100)} % der Gesunden ein positives Ergebnis. Mit welcher Wahrscheinlichkeit ist eine positiv getestete Person tatsächlich krank? (4 Nachkommastellen)`,
      answers: [{ label: 'P_T(K)', value: r4(v), tol: 0.00051 }],
      steps: [`\\(P(T) = ${pA}\\cdot ${sens} + ${r4(1 - pA)}\\cdot ${fp} = ${r4(pB)}\\)`, `\\(P_T(K) = \\dfrac{P(K\\cap T)}{P(T)} = \\dfrac{${r4(pA * sens)}}{${r4(pB)}} \\approx ${dec(v)}\\)`]
    };
  });

  add({ id: 'sto-spiel', topic: 'Stochastik', title: 'Faires Spiel', tools: false, level: 'BF' }, () => {
    const g6 = pick([5, 6, 10, 12]), g5 = pick([1, 2, 3]);
    const E = (g6 + g5) / 6;
    return {
      prompt: `Bei einem Würfelspiel erhält man bei einer 6 ${g6} €, bei einer 5 ${g5} €, sonst nichts. Wie hoch muss der Einsatz sein, damit das Spiel fair ist? (Bruch oder Dezimalzahl)`,
      answers: [{ label: 'Einsatz (€)', value: E, tol: 0.006 }],
      steps: [`\\(E(X) = \\tfrac16\\cdot ${g6} + \\tfrac16\\cdot ${g5} = ${frac(g6 + g5, 6)}\\)`, `Fair ⇔ Einsatz = Erwartungswert = ${frac(g6 + g5, 6)} € ≈ ${dec(E, 2)} €`]
    };
  });

  // ---------- Additional tasks for smaller themes ----------
  const P = p => String(p).replace('.', '{,}');
  const cdf = (n, p, k) => { let s = 0; for (let i = 0; i <= k; i++) s += binom(n, p, i); return s; };

  add({ id: 'ana-zaun', topic: 'Analysis', title: 'Extremwertproblem Gehege', tools: false, level: 'BF' }, () => {
    const L = pick([20, 24, 32, 40, 48, 60, 80, 100]);
    return {
      prompt: `Mit \\(${L}\\) m Zaun soll an einer geraden Mauer ein rechteckiges Gehege abgegrenzt werden (an der Mauer wird kein Zaun benötigt). Wie lang muss die Seite \\(x\\) senkrecht zur Mauer sein, damit die Fläche maximal wird? Wie groß ist diese Fläche?`,
      answers: [{ label: 'x (m)', value: L / 4 }, { label: 'A_max (m²)', value: L * L / 8 }],
      steps: [`Seite parallel zur Mauer: \\(${L} - 2x\\), also \\(A(x) = x(${L} - 2x) = ${L}x - 2x^2\\)`, `\\(A'(x) = ${L} - 4x = 0 \\Rightarrow x = ${frac(L, 4)}\\)`, `\\(A''(x) = -4 < 0\\) ⇒ Maximum, \\(A_{max} = ${frac(L, 4)}\\cdot ${frac(L, 2)} = ${frac(L * L, 8)}\\)`]
    };
  });

  add({ id: 'ana-zufluss', topic: 'Analysis', title: 'Zuflussrate & Bestand', tools: false, level: 'BF' }, () => {
    const k = pick([1, 2, 3, 4]), tm = ri(3, 8), c = k * tm, V0 = pick([50, 100, 120, 200]), T = ri(2, tm - 1);
    const V = V0 + c * T - k * T * T / 2;
    return {
      prompt: `In ein Becken fließt Wasser mit der Rate \\(r(t) = ${c} - ${k === 1 ? '' : k}t\\) (in m³/h, \\(t\\) in Stunden). Zu Beginn sind \\(${V0}\\) m³ im Becken. Wie viel Wasser ist nach \\(${T}\\) Stunden im Becken? Zu welchem Zeitpunkt ist die Wassermenge maximal?`,
      answers: [{ label: 'V (m³)', value: V }, { label: 't_max (h)', value: tm }],
      steps: [`\\(V(${T}) = ${V0} + \\int_0^{${T}} (${c} - ${k === 1 ? '' : k}t)\\,dt = ${V0} + \\left[${c}t - ${frac(k, 2)}t^2\\right]_0^{${T}} = ${frac(2 * V, 2)}\\)`, `Maximum, wenn die Zuflussrate das Vorzeichen von + nach − wechselt: \\(r(t) = 0 \\Rightarrow t = ${tm}\\)`]
    };
  });

  add({ id: 'geo-parallelogramm', topic: 'Geometrie', title: 'Vierter Punkt eines Parallelogramms', tools: false, level: 'BF' }, () => {
    const A = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], B = A.map(x => x + nz(-4, 4)), C = B.map(x => x + nz(-4, 4)), D = A.map((x, i) => x + C[i] - B[i]);
    if (dot(cross(sub(B, A), sub(C, B)), cross(sub(B, A), sub(C, B))) === 0) return G.find(g => g.id === 'geo-parallelogramm').make();
    return {
      prompt: `Die Punkte \\(${pt('A', A)}\\), \\(${pt('B', B)}\\) und \\(${pt('C', C)}\\) sind Eckpunkte des Parallelogramms \\(ABCD\\). Bestimmen Sie die Koordinaten von \\(D\\).`,
      answers: [{ label: 'd₁', value: D[0] }, { label: 'd₂', value: D[1] }, { label: 'd₃', value: D[2] }],
      steps: [`Im Parallelogramm gilt \\(\\vec{AD} = \\vec{BC} = ${vec(sub(C, B))}\\)`, `\\(\\vec{OD} = \\vec{OA} + \\vec{BC} = ${vec(D)}\\), also \\(${pt('D', D)}\\)`]
    };
  });

  add({ id: 'geo-pyramide-volumen', topic: 'Geometrie', title: 'Volumen einer Pyramide', tools: false, level: 'BF' }, () => {
    const a = ri(2, 6), b = ri(2, 6), h = ri(2, 9), x0 = ri(-2, 2), y0 = ri(-2, 2), sx = ri(0, a), sy = ri(0, b);
    const A = [x0, y0, 0], B = [x0 + a, y0, 0], C = [x0 + a, y0 + b, 0], D = [x0, y0 + b, 0], S = [x0 + sx, y0 + sy, h];
    return {
      prompt: `Die Punkte \\(${pt('A', A)}\\), \\(${pt('B', B)}\\), \\(${pt('C', C)}\\) und \\(${pt('D', D)}\\) bilden ein Rechteck in der \\(x_1x_2\\)-Ebene. Zusammen mit der Spitze \\(${pt('S', S)}\\) bilden sie eine Pyramide. Berechnen Sie ihr Volumen. (Bruch erlaubt)`,
      answers: [{ label: 'V', value: a * b * h / 3, tol: 0.005 }],
      steps: [`Grundfläche: \\(G = |\\vec{AB}|\\cdot|\\vec{AD}| = ${a}\\cdot ${b} = ${a * b}\\)`, `Höhe = Abstand von \\(S\\) zur \\(x_1x_2\\)-Ebene: \\(h = ${h}\\)`, `\\(V = \\tfrac13\\cdot G\\cdot h = \\tfrac13\\cdot ${a * b}\\cdot ${h} = ${frac(a * b * h, 3)}\\)`]
    };
  });

  add({ id: 'sto-verteilung', topic: 'Stochastik', title: 'Wahrscheinlichkeitsverteilung & Erwartungswert', tools: false, level: 'BF' }, () => {
    const xs = [0, ri(1, 3), ri(4, 6), ri(8, 12)], p1 = ri(1, 4), p2 = ri(1, 3), p3 = ri(1, 2), a = 10 - p1 - p2 - p3;
    const ps = [a, p1, p2, p3], E = xs.reduce((s, x, i) => s + x * ps[i], 0) / 10;
    return {
      prompt: `Die Zufallsgröße \\(X\\) hat die Verteilung \\(P(X=${xs[0]}) = a\\), \\(P(X=${xs[1]}) = ${P(p1 / 10)}\\), \\(P(X=${xs[2]}) = ${P(p2 / 10)}\\), \\(P(X=${xs[3]}) = ${P(p3 / 10)}\\). Bestimmen Sie \\(a\\) und den Erwartungswert \\(E(X)\\).`,
      answers: [{ label: 'a', value: a / 10 }, { label: 'E(X)', value: E, tol: 0.005 }],
      steps: [`Summe aller Wahrscheinlichkeiten ist 1: \\(a = 1 - ${P(p1 / 10)} - ${P(p2 / 10)} - ${P(p3 / 10)} = ${P(a / 10)}\\)`, `\\(E(X) = ${xs.map((x, i) => x + '\\cdot ' + P(ps[i] / 10)).join(' + ')} = ${P(Math.round(E * 100) / 100)}\\)`]
    };
  });

  add({ id: 'sto-mit-zuruecklegen', topic: 'Stochastik', title: 'Dreimal ziehen mit Zurücklegen', tools: false, level: 'BF' }, () => {
    const r = ri(1, 5), b = ri(1, 5), N = r + b, k = pick([1, 2]);
    const num = 3 * (k === 2 ? r * r * b : r * b * b), den = N ** 3;
    return {
      prompt: `In einer Urne liegen ${r} rote und ${b} blaue Kugeln. Es wird dreimal mit Zurücklegen gezogen. Berechnen Sie die Wahrscheinlichkeit, genau ${k === 2 ? 'zwei' : 'eine'} rote Kugel${k === 2 ? 'n' : ''} zu ziehen. (Bruch erlaubt)`,
      answers: [{ label: 'P', value: num / den, tol: 0.0005 }],
      steps: [`Es gibt 3 Pfade mit genau ${k} roten Kugeln (z. B. ${k === 2 ? 'rrb, rbr, brr' : 'rbb, brb, bbr'}).`, `Jeder Pfad: \\(${k === 2 ? `\\left(\\frac{${r}}{${N}}\\right)^2\\cdot\\frac{${b}}{${N}}` : `\\frac{${r}}{${N}}\\cdot\\left(\\frac{${b}}{${N}}\\right)^2`} = \\frac{${num / 3}}{${den}}\\)`, `\\(P = 3\\cdot\\frac{${num / 3}}{${den}} = ${frac(num, den)}\\)`]
    };
  });

  add({ id: 'sto-hyp-regel', topic: 'Stochastik', title: 'Entscheidungsregel (linksseitiger Test)', tools: true, level: 'LF' }, () => {
    const n = pick([50, 60, 80, 100]), p0 = pick([0.2, 0.3, 0.4, 0.5]);
    let k = -1; while (cdf(n, p0, k + 1) <= 0.05) k++;
    return {
      prompt: `Ein Anbieter behauptet, dass mindestens \\(${p0 * 100}\\,\\%\\) seiner Kunden zufrieden sind. Um das zu prüfen, werden \\(${n}\\) Kunden befragt. Getestet wird \\(H_0: p \\geq ${P(p0)}\\) auf dem Signifikanzniveau \\(5\\,\\%\\). \\(H_0\\) wird abgelehnt, wenn höchstens \\(k\\) Kunden zufrieden sind. Bestimmen Sie das größtmögliche \\(k\\).`,
      answers: [{ label: 'k', value: k }],
      steps: [`\\(X\\): Anzahl zufriedener Kunden, unter \\(H_0\\) gilt \\(X\\sim B(${n};\\,${p0})\\). Gesucht ist das größte \\(k\\) mit \\(P(X\\leq k)\\leq 0{,}05\\).`, `\\(P(X\\leq ${k}) \\approx ${dec(cdf(n, p0, k))} \\leq 0{,}05\\), aber \\(P(X\\leq ${k + 1}) \\approx ${dec(cdf(n, p0, k + 1))} > 0{,}05\\)`, `Also \\(k = ${k}\\): Ablehnungsbereich \\(\\{0;\\dots;${k}\\}\\)`]
    };
  });

  add({ id: 'sto-hyp-fehler', topic: 'Stochastik', title: 'Fehler 1. Art berechnen', tools: true, level: 'LF' }, () => {
    const n = pick([20, 25, 30, 40, 50]), p0 = pick([0.1, 0.2, 0.25, 0.3]), k = Math.round(n * p0) + ri(3, 5);
    const a = 1 - cdf(n, p0, k - 1);
    return {
      prompt: `Bei einem Spiel gewinnt man laut Hersteller mit Wahrscheinlichkeit \\(p = ${P(p0)}\\). Man vermutet, dass die Gewinnwahrscheinlichkeit höher ist, und spielt \\(${n}\\)-mal. Die Nullhypothese \\(H_0: p \\leq ${P(p0)}\\) wird abgelehnt, wenn man mindestens \\(${k}\\)-mal gewinnt. Berechnen Sie die Wahrscheinlichkeit für einen Fehler 1. Art (4 Nachkommastellen).`,
      answers: [{ label: 'α', value: r4(a), tol: 0.00051 }],
      steps: [`Fehler 1. Art: \\(H_0\\) wird abgelehnt, obwohl \\(p = ${P(p0)}\\) gilt.`, `\\(X\\sim B(${n};\\,${p0})\\): \\(P(X\\geq ${k}) = 1 - P(X\\leq ${k - 1}) \\approx ${dec(a)}\\)`]
    };
  });

  global.Generators = { list: G, byId: id => G.find(g => g.id === id) };
})(window);
