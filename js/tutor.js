// Built-in tutor: explains a wrong answer without an external AI service.
// diagnose() compares the input with the solution and names likely mistakes,
// why() explains the idea behind a solution step, open() runs the chat.
(function (global) {
  const close = (x, y, tol) => isFinite(x) && Math.abs(x - y) <= tol;
  const tolOf = a => a.tol ?? Math.max(0.005, Math.abs(a.value) * 1e-4);

  function diagnose(answers, vals, res) {
    const out = [];
    answers.forEach((a, k) => {
      if (res[k]) return;
      const v = vals[k], y = a.value, t = Math.max(tolOf(a), Math.abs(y) * 0.002), L = a.label;
      let m = null;
      const other = answers.findIndex((b, j) => j !== k && close(v, b.value, tolOf(b)));
      if (!isFinite(v)) m = `Deine Eingabe bei <b>${L}</b> konnte ich nicht lesen.`;
      else if (other >= 0) m = `Bei <b>${L}</b> steht der Wert, der zu <b>${answers[other].label}</b> gehört – hast du die Ergebnisse vertauscht?`;
      else if (y !== 0 && close(v, -y, t)) m = `Bei <b>${L}</b> stimmt der Betrag, aber das <b>Vorzeichen</b> ist falsch. Prüfe Minuszeichen beim Ausmultiplizieren, Ableiten oder in der Klammer.`;
      else if (y > 0 && y < 1 && close(v, 1 - y, t)) m = `Bei <b>${L}</b> hast du vermutlich die <b>Gegenwahrscheinlichkeit</b> berechnet (\\(1 - P\\)). Lies genau, welches Ereignis gefragt ist.`;
      else if (y !== 0 && (close(v, y * 100, t * 100) || close(v, y / 100, t / 100))) m = `Bei <b>${L}</b> liegst du um den Faktor 100 daneben – <b>Prozent und Dezimalzahl</b> verwechselt? (\\(23\\,\\% = 0{,}23\\))`;
      else if (y !== 0 && (close(v, 2 * y, 2 * t) || close(v, y / 2, t / 2))) m = `Bei <b>${L}</b> ist dein Ergebnis genau ${close(v, 2 * y, 2 * t) ? 'doppelt so groß' : 'halb so groß'} wie richtig. Typisch: Faktor \\(\\tfrac12\\) (Dreiecksfläche), Faktor 2 (Symmetrie, Kettenregel) oder zwei Pfade im Baumdiagramm.`;
      else if (y > 0 && (close(v, y * y, t * 2 * Math.abs(y) + t) || (v > 0 && close(Math.sqrt(v), y, t)))) m = `Bei <b>${L}</b> fehlt eine <b>Wurzel</b> – oder du hast einmal zu viel quadriert. Länge und Abstand: \\(\\sqrt{\\ldots}\\) nicht vergessen.`;
      else if (Number.isInteger(y) && Math.abs(v - y) === 1) m = `Bei <b>${L}</b> liegst du genau um 1 daneben. Prüfe die Grenze: „mindestens“ heißt \\(\\geq\\), „mehr als“ heißt \\(>\\) – und bei Ungleichungen immer aufrunden bzw. abrunden, wie es die Frage verlangt.`;
      else if (y !== 0 && Math.abs(v - y) / Math.abs(y) < 0.02) m = `Bei <b>${L}</b> bist du sehr nah dran – das ist ein <b>Rundungsfehler</b>. Runde erst ganz am Ende und gib genug Nachkommastellen an.`;
      else if (y !== 0 && v !== 0 && Math.sign(v) !== Math.sign(y)) m = `Bei <b>${L}</b> stimmt schon das Vorzeichen nicht. Prüfe den Ansatz – die einzelnen Schritte zeige ich dir gleich.`;
      else m = `Bei <b>${L}</b> liegt dein Ergebnis deutlich daneben. Vermutlich hakt es schon am Ansatz – lass uns die Schritte einzeln anschauen.`;
      out.push(m);
    });
    return out;
  }

  const WHY = [
    [/Hesse/, 'Hessesche Normalform: Abstand Punkt–Ebene \\(d = \\frac{|a p_1 + b p_2 + c p_3 - d|}{\\sqrt{a^2 + b^2 + c^2}}\\) – Punkt in die Ebenengleichung einsetzen und durch die Länge des Normalenvektors teilen.'],
    [/P\(X\\leq|P\(X\\geq/, 'Kumulierte Binomialverteilung: \\(P(X\\leq k)\\) liest man mit dem WTR (binomcdf) ab. \\(P(X\\geq k) = 1 - P(X\\leq k-1)\\).'],
    [/Summe aller Wahrscheinlichkeiten/, 'Die Wahrscheinlichkeiten aller möglichen Werte einer Zufallsgröße ergeben zusammen immer 1 – so findet man eine fehlende Wahrscheinlichkeit.'],
    [/\\tfrac13\\cdot G/, 'Volumen einer Pyramide: \\(V = \\tfrac13\\cdot G\\cdot h\\) mit Grundfläche \\(G\\) und Höhe \\(h\\) (Abstand der Spitze zur Grundfläche).'],
    [/Stammfunktion|F\(x\) =|F\(-?\d/, 'Stammfunktion: Potenzregel rückwärts, \\(x^n \\to \\frac{x^{n+1}}{n+1}\\). Ist ein Punkt vorgegeben, setzt man ihn ein und bestimmt so die Konstante \\(C\\). Kontrolle: \\(F\' = f\\).'],
    [/[Ss]ubstitution|pq-Formel|Vieta|u_1/, 'Bei Gleichungen mit \\(e^{2x}\\) und \\(e^x\\) substituiert man \\(u = e^x\\). Die entstehende quadratische Gleichung löst man mit pq-Formel oder Vieta, dann rücksubstituieren: \\(x = \\ln u\\) (nur für \\(u > 0\\)).'],
    [/Periode/, 'Bei \\(f(x) = a\\sin(bx)\\) ist die Periode \\(p = \\frac{2\\pi}{b}\\), die Amplitude ist \\(|a|\\).'],
    [/\\dfrac\{f\(/, 'Mittlere Änderungsrate = Steigung der Sekante: \\(\\frac{f(b) - f(a)}{b - a}\\) (Differenzenquotient).'],
    [/n = f\(x_0\)/, 'Den y-Achsenabschnitt \\(n\\) der Tangente bekommt man, indem man den Berührpunkt \\((x_0 \\mid f(x_0))\\) in \\(y = mx + n\\) einsetzt.'],
    [/A\([ux]\) =/, 'Modellieren: Erst die Zielfunktion (hier die Fläche) aufstellen und über die Nebenbedingung auf eine Variable bringen. Danach wie bei einer Kurvendiskussion das Maximum suchen.'],
    [/Geradengleichung|\d t = \d|- \d?t = -?\d+ \\Rightarrow/, 'Schnitt Gerade–Ebene: Die Koordinaten der Geraden (abhängig von \\(t\\)) in die Ebenengleichung einsetzen, nach \\(t\\) auflösen und \\(t\\) wieder in die Gerade einsetzen.'],
    [/\dt = 0|Skalarprodukt/, 'Zwei Vektoren sind orthogonal, wenn ihr Skalarprodukt 0 ist: \\(\\vec u\\cdot\\vec v = u_1v_1 + u_2v_2 + u_3v_3 = 0\\). Daraus bestimmt man den Parameter.'],
    [/H_0|Fehler 1\. Art|Ablehnungsbereich|Signifikanz/, 'Beim Hypothesentest nimmt man an, dass \\(H_0\\) gilt, und rechnet damit die Wahrscheinlichkeiten aus. Der Ablehnungsbereich enthält die Ergebnisse, die unter \\(H_0\\) höchstens mit Wahrscheinlichkeit \\(\\alpha\\) auftreten. Fehler 1. Art: \\(H_0\\) wird abgelehnt, obwohl sie stimmt.'],
    [/P_T|P\(T\)|Vierfeld/, 'Bedingte Wahrscheinlichkeit: \\(P_T(K) = \\frac{P(K\\cap T)}{P(T)}\\). \\(P(T)\\) bekommst du über alle Pfade, die zu \\(T\\) führen (Satz von der totalen Wahrscheinlichkeit).'],
    [/\\binom|B\(/, 'Bernoulli-Formel: \\(P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}\\). \\(\\binom{n}{k}\\) zählt die Pfade mit genau \\(k\\) Treffern, \\(p^k(1-p)^{n-k}\\) ist die Wahrscheinlichkeit eines solchen Pfads.'],
    [/\\sigma/, 'Für binomialverteilte \\(X\\) gilt \\(\\sigma = \\sqrt{n\\cdot p\\cdot(1-p)}\\) – die Wurzel nicht vergessen.'],
    [/E\(X\)|\\mu|Erwartungswert/, 'Erwartungswert = Summe aus „Wert mal Wahrscheinlichkeit“ über alle möglichen Werte. Bei der Binomialverteilung vereinfacht sich das zu \\(\\mu = n\\cdot p\\). Ein Spiel ist fair, wenn der Erwartungswert des Gewinns 0 ist.'],
    [/Pfad|\\frac\{\d+\}\{\d+\}\\cdot\\frac/, 'Pfadregeln: Entlang eines Pfades wird multipliziert, die Wahrscheinlichkeiten verschiedener Pfade werden addiert. Ohne Zurücklegen ändern sich Zähler und Nenner im zweiten Zug.'],
    [/1 - .*\^n|\\geq 1\)/, '„Mindestens einmal“ rechnet man über das Gegenereignis „keinmal“: \\(P(X\\geq 1) = 1 - P(X = 0)\\).'],
    [/\\times/, 'Das Kreuzprodukt zweier Vektoren steht senkrecht auf beiden – es ist ein Normalenvektor. Seine Länge ist die Fläche des aufgespannten Parallelogramms, die Dreiecksfläche ist die Hälfte davon.'],
    [/arccos|\\cos/, 'Winkel zwischen Vektoren: \\(\\cos\\alpha = \\frac{\\vec u\\cdot\\vec v}{|\\vec u|\\cdot|\\vec v|}\\). Zwischen Gerade und Ebene nimmt man den Sinus mit dem Normalenvektor.'],
    [/Ebene|Normal|x_1|x_2|x_3|Spur/, 'Eine Ebene in Koordinatenform \\(ax_1 + bx_2 + cx_3 = d\\) hat den Normalenvektor \\((a, b, c)\\). Für Spurpunkte setzt man zwei Koordinaten 0, für Schnittpunkte setzt man die Geradengleichung in die Ebene ein.'],
    [/\\vec|pmatrix/, 'Vektor von \\(A\\) nach \\(B\\): „Spitze minus Fuß“, also \\(\\vec{AB} = B - A\\). Länge: \\(|\\vec v| = \\sqrt{v_1^2 + v_2^2 + v_3^2}\\). Orthogonal heißt: Skalarprodukt \\(= 0\\).'],
    [/\\int|\\left\[/, 'Hauptsatz: \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\) mit einer Stammfunktion \\(F\\). Für Flächen mit Vorzeichenwechsel teilt man an den Nullstellen auf und nimmt Beträge.'],
    [/''|Wendepunkt|Maximum|Minimum|Hochpunkt|Tiefpunkt/, 'Hinreichende Bedingung: Ist \\(f\'(x_0) = 0\\) und \\(f\'\'(x_0) < 0\\), liegt ein Hochpunkt vor, bei \\(f\'\'(x_0) > 0\\) ein Tiefpunkt. Für Wendestellen: \\(f\'\'(x_0) = 0\\) und \\(f\'\'\'(x_0) \\neq 0\\).'],
    [/'\(.*\) *= *0|= 0 \\Rightarrow/, 'Notwendige Bedingung: An einer Extremstelle ist die Steigung 0, also \\(f\'(x) = 0\\). Diese Gleichung löst man nach \\(x\\).'],
    [/\\ln|\\log/, 'Steht die Unbekannte im Exponenten, logarithmiert man: \\(e^{x} = a \\Leftrightarrow x = \\ln a\\) und \\(q^n = a \\Leftrightarrow n = \\frac{\\ln a}{\\ln q}\\). Bei negativem \\(\\ln q\\) dreht sich das Ungleichheitszeichen.'],
    [/u'|Produktregel|v'/, 'Produktregel: \\((u\\cdot v)\' = u\'\\cdot v + u\\cdot v\'\\). Erst \\(u, v\\) und ihre Ableitungen aufschreiben, dann einsetzen.'],
    [/e\^/, 'Exponentialfunktion \\(f(t) = a\\cdot e^{kt}\\): \\(a\\) ist der Anfangswert, \\(k\\) die Wachstums- (\\(k>0\\)) bzw. Zerfallskonstante (\\(k<0\\)). Funktionswerte durch Einsetzen; beim Ableiten gilt \\((e^{kt})\' = k\\cdot e^{kt}\\) (Kettenregel), und \\(e^{kt}\\) wird nie 0.'],
    [/Tangente|y = /, 'Tangente in \\(x_0\\): \\(y = f\'(x_0)\\,(x - x_0) + f(x_0)\\). Steigung aus der Ableitung, Punkt aus dem Funktionswert.'],
    [/'\(/, 'Die Ableitung \\(f\'(x)\\) gibt die Steigung bzw. die momentane Änderungsrate an. Potenzregel: \\((x^n)\' = n\\,x^{n-1}\\).'],
  ];
  const why = step => (WHY.find(([re]) => re.test(step)) || [0, 'In diesem Schritt werden die Werte eingesetzt und die Gleichung umgeformt. Rechne ihn selbst nach – oft steckt der Fehler in einer kleinen Umformung.'])[1];

  const TIPS = {
    ableiten: 'Kettenregel beim inneren Term nicht vergessen; Tangente immer mit \\(f(x_0)\\) und \\(f\'(x_0)\\).',
    kurven: 'Nach \\(f\'(x) = 0\\) immer mit \\(f\'\'\\) prüfen und die y-Koordinate mit \\(f\\) (nicht \\(f\'\\)) berechnen.',
    integral: 'Stammfunktion durch Ableiten kontrollieren; bei Flächen Nullstellen beachten.',
    exp: 'Beim Logarithmieren beide Seiten gleich behandeln; Prozentangaben als Faktor \\(1 \\pm p\\) schreiben.',
    anwendung: 'Erst die Zielfunktion mit nur einer Variablen aufstellen, dann ableiten. Randwerte prüfen.',
    vektoren: '„Spitze minus Fuß“; Länge mit Wurzel; Winkel über Skalarprodukt.',
    ebenen: 'Normalenvektor aus der Koordinatenform ablesen; Abstand mit der Hesseschen Normalform (durch \\(|\\vec n|\\) teilen).',
    koerper: 'Dreieck = halbes Kreuzprodukt; Pyramide = \\(\\tfrac13\\cdot G\\cdot h\\).',
    binomial: 'Prüfe zuerst, ob \\(n\\), \\(p\\) und \\(k\\) richtig aus dem Text gelesen sind; „mindestens“ über das Gegenereignis.',
    erwartung: 'Alle Wahrscheinlichkeiten müssen zusammen 1 ergeben; beim Spiel den Einsatz abziehen.',
    baum: 'Ohne Zurücklegen ändern sich die Brüche im zweiten Zug; alle passenden Pfade addieren.',
    hypothese: 'Unter \\(H_0\\) rechnen; bei linksseitigem Test \\(P(X\\leq k)\\), bei rechtsseitigem \\(P(X\\geq k)\\) betrachten.',
  };

  function open(el, p, vals, res, h) {
    let box = el.querySelector('.tutor');
    if (box) { box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return; }
    box = document.createElement('div'); box.className = 'tutor';
    box.innerHTML = `<div class="thead"><span class="tav">T</span><b>Abi-Tutor</b><span class="muted">erklärt deinen Fehler</span></div><div class="tlog" aria-live="polite"></div><div class="tctl"></div>`;
    el.appendChild(box);
    const log = box.querySelector('.tlog'), ctl = box.querySelector('.tctl');
    const say = (html, cls = '') => { const d = document.createElement('div'); d.className = 'msg ' + cls; d.innerHTML = html; log.appendChild(d); h.math(d); d.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return d; };
    const buttons = list => { ctl.innerHTML = ''; list.forEach(([t, fn, ghost]) => { const b = document.createElement('button'); b.className = 'btn' + (ghost ? ' ghost' : ''); b.textContent = t; b.onclick = fn; ctl.appendChild(b); }); };
    const theme = (global.Themes || []).find(t => t.ids.includes(el.dataset.id));
    const tried = vals && vals.some(v => isFinite(v));
    say(tried ? 'Schauen wir uns an, was schiefgelaufen ist:' : 'Kein Problem – ich erkläre dir die Aufgabe Schritt für Schritt.');
    if (tried) diagnose(p.answers, vals, res).forEach(m => say(m));
    let i = 0;
    const next = () => {
      if (i < p.steps.length) {
        const s = p.steps[i], n = ++i;
        say(`<span class="lbl">Schritt ${n} von ${p.steps.length}</span>${s}`, 'step');
        buttons([[i < p.steps.length ? 'Nächster Schritt' : 'Zum Ergebnis', next], ['Warum?', () => say(why(s), 'why'), true]]);
      } else {
        say('<b>Ergebnis:</b> ' + p.answers.map((a, k) => `${h.esc(a.label)} = ${h.fmt(a.value)}${tried && isFinite(vals[k]) && !res[k] ? ` <span class="muted">(du: ${h.fmt(vals[k])})</span>` : ''}`).join(', '));
        if (theme && TIPS[theme.id]) say(`<b>Tipp für „${h.esc(theme.name)}“:</b> ${TIPS[theme.id]}`, 'why');
        buttons([]);
        h.done && h.done();
      }
    };
    buttons([['Schritt für Schritt erklären', next]]);
  }

  global.Tutor = { diagnose, why, open, TIPS };
})(window);
