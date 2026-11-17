// Hand-written longer Wahlteil-style tasks with Erwartungshorizont.
window.LongTasks = [
  {
    id: 'lt-medikament', topic: 'Analysis', tools: true, level: 'BF', title: 'Medikamentenkonzentration im Blut',
    intro: 'Die Konzentration eines Medikaments im Blut wird modelliert durch \\(c(t) = 20t\\cdot e^{-0{,}5t}\\) (t in Stunden nach Einnahme, c in mg/l).',
    parts: [
      { prompt: 'a) Bestimmen Sie den Zeitpunkt der maximalen Konzentration und die maximale Konzentration (2 Nachkommastellen).', answers: [{ label: 't (h)', value: 2 }, { label: 'c_max', value: 14.72, tol: 0.011 }], steps: ["\\(c'(t) = 20e^{-0{,}5t}(1 - 0{,}5t) = 0 \\Rightarrow t = 2\\)", "VZW von \\(c'\\) von + nach − ⇒ Maximum", '\\(c(2) = 40/e \\approx 14{,}72\\) mg/l'] },
      { prompt: 'b) Zu welchem Zeitpunkt nimmt die Konzentration am stärksten ab?', answers: [{ label: 't (h)', value: 4 }], steps: ["\\(c''(t) = 20e^{-0{,}5t}(0{,}25t - 1) = 0 \\Rightarrow t = 4\\)", "Für \\(t>2\\) ist \\(c'<0\\); bei \\(t = 4\\) ist \\(c'\\) minimal ⇒ stärkste Abnahme"] },
      { prompt: 'c) Berechnen Sie die mittlere Konzentration in den ersten 6 Stunden (2 Nachkommastellen).', answers: [{ label: 'c̄', value: 10.68, tol: 0.011 }], steps: ['Stammfunktion: \\(C(t) = -40e^{-0{,}5t}(t+2)\\) (Kontrolle durch Ableiten)', '\\(\\int_0^6 c(t)\\,dt = 80 - 320e^{-3} \\approx 64{,}07\\)', '\\(\\bar c = \\tfrac16\\cdot 64{,}07 \\approx 10{,}68\\) mg/l'] }
    ]
  },
  {
    id: 'lt-pyramide', topic: 'Geometrie', tools: true, level: 'BF', title: 'Pyramide mit quadratischer Grundfläche',
    intro: 'Gegeben ist die Pyramide ABCDS mit \\(A(0\\mid0\\mid0)\\), \\(B(6\\mid0\\mid0)\\), \\(C(6\\mid6\\mid0)\\), \\(D(0\\mid6\\mid0)\\) und \\(S(3\\mid3\\mid4)\\).',
    parts: [
      { prompt: 'a) Berechnen Sie das Volumen der Pyramide.', answers: [{ label: 'V', value: 48 }], steps: ['Grundfläche \\(G = 6\\cdot6 = 36\\), Höhe \\(h = 4\\)', '\\(V = \\tfrac13\\cdot36\\cdot4 = 48\\)'] },
      { prompt: 'b) Berechnen Sie die Länge der Seitenkante AS (2 Nachkommastellen).', answers: [{ label: '|AS|', value: 5.83, tol: 0.011 }], steps: ['\\(\\vec{AS} = (3, 3, 4)\\)', '\\(|\\vec{AS}| = \\sqrt{34} \\approx 5{,}83\\)'] },
      { prompt: 'c) Die Seitenfläche BCS liegt in der Ebene \\(E: 4x_1 + a x_3 = 24\\). Bestimmen Sie \\(a\\).', answers: [{ label: 'a', value: 3 }], steps: ['\\(\\vec{BC}\\times\\vec{BS} = (24, 0, 18) \\sim (4, 0, 3)\\)', 'Punktprobe mit S: \\(4\\cdot3 + a\\cdot4 = 24 \\Rightarrow a = 3\\)'] },
      { prompt: 'd) Berechnen Sie den Abstand von A zur Ebene E.', answers: [{ label: 'd', value: 4.8 }], steps: ['\\(|\\vec n| = \\sqrt{16+9} = 5\\)', '\\(d = |0 - 24|/5 = 4{,}8\\)'] },
      { prompt: 'e) Unter welchem Winkel ist die Seitenfläche BCS gegen die Grundfläche geneigt? (Grad, 1 Nachkommastelle)', answers: [{ label: 'α (°)', value: 53.1, tol: 0.06 }], steps: ['Normalenvektoren \\((4,0,3)\\) und \\((0,0,1)\\)', '\\(\\cos\\alpha = 3/5 \\Rightarrow \\alpha \\approx 53{,}1^\\circ\\)'] }
    ]
  },
  {
    id: 'lt-qualitaet', topic: 'Stochastik', tools: true, level: 'BF', title: 'Qualitätskontrolle',
    intro: 'Ein Hersteller produziert Bauteile, von denen erfahrungsgemäß 4 % defekt sind. Die Anzahl X defekter Teile in einer Stichprobe von 50 Teilen ist binomialverteilt.',
    parts: [
      { prompt: 'a) Berechnen Sie P(X = 2) (4 Nachkommastellen).', answers: [{ label: 'P', value: 0.2762, tol: 0.00051 }], steps: ['\\(P(X=2) = \\binom{50}{2}\\cdot0{,}04^2\\cdot0{,}96^{48} \\approx 0{,}2762\\)'] },
      { prompt: 'b) Berechnen Sie die Wahrscheinlichkeit für höchstens 3 defekte Teile (4 Nachkommastellen).', answers: [{ label: 'P', value: 0.8609, tol: 0.00051 }], steps: ['\\(P(X\\leq3) = \\sum_{k=0}^{3}P(X=k) \\approx 0{,}8609\\) (WTR: binomcdf)'] },
      { prompt: 'c) Geben Sie den Erwartungswert von X an.', answers: [{ label: 'μ', value: 2 }], steps: ['\\(\\mu = 50\\cdot0{,}04 = 2\\)'] },
      { prompt: 'd) Wie viele Teile muss man mindestens prüfen, um mit mehr als 95 % Wahrscheinlichkeit mindestens ein defektes Teil zu finden?', answers: [{ label: 'n', value: 74 }], steps: ['\\(1 - 0{,}96^n > 0{,}95 \\Rightarrow n > \\dfrac{\\ln0{,}05}{\\ln0{,}96} \\approx 73{,}39\\)', 'Also mindestens 74 Teile'] }
    ]
  },
  {
    id: 'lt-hypothesentest', topic: 'Stochastik', tools: true, level: 'LF', title: 'Hypothesentest: Neue Maschine',
    intro: 'Eine alte Maschine produziert 10 % Ausschuss. Man vermutet, dass sie inzwischen mehr Ausschuss produziert. Getestet wird \\(H_0: p\\leq0{,}1\\) mit einer Stichprobe von 100 Teilen auf dem Signifikanzniveau 5 %.',
    parts: [
      { prompt: 'a) Bestimmen Sie die kleinste Zahl k, ab der H₀ abgelehnt wird (Ablehnungsbereich {k, …, 100}).', answers: [{ label: 'k', value: 16 }], steps: ['Rechtsseitiger Test: gesucht kleinstes k mit \\(P(X\\geq k)\\leq0{,}05\\) für \\(p = 0{,}1\\)', '\\(P(X\\geq15)\\approx0{,}0726 > 0{,}05\\), \\(P(X\\geq16)\\approx0{,}0399 \\leq 0{,}05\\)', 'Ablehnungsbereich \\(\\{16,\\dots,100\\}\\)'] },
      { prompt: 'b) Wie groß ist die Wahrscheinlichkeit für einen Fehler 1. Art? (4 Nachkommastellen)', answers: [{ label: 'α', value: 0.0399, tol: 0.00051 }], steps: ['\\(P(X\\geq16) \\approx 0{,}0399\\) für \\(p = 0{,}1\\)'] }
    ]
  },
  {
    id: 'lt-bruecke', topic: 'Analysis', tools: false, level: 'BF', title: 'Brückenbogen (ohne Hilfsmittel)',
    intro: 'Der Bogen einer Brücke wird beschrieben durch \\(f(x) = -\\tfrac{1}{8}x^2 + 8\\) (x und f(x) in Metern), der Boden liegt auf der x-Achse.',
    parts: [
      { prompt: 'a) Wie breit ist der Bogen am Boden?', answers: [{ label: 'Breite (m)', value: 16 }], steps: ['\\(f(x) = 0 \\Rightarrow x^2 = 64 \\Rightarrow x = \\pm8\\)', 'Breite: 16 m'] },
      { prompt: 'b) Unter welchem Steigungswert trifft der Bogen bei x = 8 auf den Boden?', answers: [{ label: "f'(8)", value: -2 }], steps: ["\\(f'(x) = -\\tfrac14x\\)", "\\(f'(8) = -2\\)"] },
      { prompt: 'c) Berechnen Sie den Inhalt der Fläche unter dem Bogen. (Bruch erlaubt)', answers: [{ label: 'A (m²)', value: 256 / 3, tol: 0.01 }], steps: ['\\(A = \\int_{-8}^{8}\\left(-\\tfrac18x^2 + 8\\right)dx = \\left[-\\tfrac{1}{24}x^3 + 8x\\right]_{-8}^{8}\\)', '\\(= 2\\cdot\\left(-\\tfrac{512}{24} + 64\\right) = \\tfrac{256}{3} \\approx 85{,}33\\)'] }
    ]
  }
];

// Lernthemen: every generator and long task belongs to exactly one theme (checked in tests/selftest.html).
window.Themes = [
  { id: 'ableiten', topic: 'Analysis', name: 'Ableiten & Tangenten', desc: 'Ableitungsregeln, Tangentengleichung, Änderungsraten', ids: ['ana-produktregel', 'ana-tangente', 'ana-aenderungsrate'] },
  { id: 'kurven', topic: 'Analysis', name: 'Kurvendiskussion', desc: 'Hoch-, Tief- und Wendepunkte, trigonometrische Funktionen', ids: ['ana-extrem', 'ana-wendepunkt', 'ana-trig'] },
  { id: 'integral', topic: 'Analysis', name: 'Integrale & Flächen', desc: 'Stammfunktionen, bestimmte Integrale, Flächeninhalte', ids: ['ana-stammfunktion', 'ana-integral', 'ana-flaeche'] },
  { id: 'exp', topic: 'Analysis', name: 'Exponentialfunktionen & Wachstum', desc: 'Exponentialgleichungen, Wachstum und Abnahme im Sachzusammenhang', ids: ['ana-expgleichung', 'ana-wachstum', 'lt-medikament'] },
  { id: 'anwendung', topic: 'Analysis', name: 'Modellieren & Optimieren', desc: 'Extremwertprobleme, Zuflussraten und Sachaufgaben', ids: ['ana-optimierung', 'ana-zaun', 'ana-zufluss', 'lt-bruecke'] },
  { id: 'vektoren', topic: 'Geometrie', name: 'Vektoren, Abstände & Winkel', desc: 'Länge, Orthogonalität, Winkel, Spiegelung', ids: ['geo-abstand-punkte', 'geo-orthogonal', 'geo-winkel', 'geo-spiegelpunkt'] },
  { id: 'ebenen', topic: 'Geometrie', name: 'Geraden & Ebenen', desc: 'Ebenengleichung, Spurpunkte, Schnittpunkte, Abstand Punkt–Ebene', ids: ['geo-ebene-spurpunkt', 'geo-schnitt-gerade-ebene', 'geo-abstand-ebene'] },
  { id: 'koerper', topic: 'Geometrie', name: 'Figuren & Körper', desc: 'Dreiecke, Parallelogramme und Pyramiden im Raum', ids: ['geo-dreieck', 'geo-parallelogramm', 'geo-pyramide-volumen', 'lt-pyramide'] },
  { id: 'binomial', topic: 'Stochastik', name: 'Binomialverteilung', desc: 'P(X = k), „mindestens einmal“, Qualitätskontrolle', ids: ['sto-binomial', 'sto-mindestens', 'lt-qualitaet'] },
  { id: 'erwartung', topic: 'Stochastik', name: 'Erwartungswert & Spiele', desc: 'Verteilungen, Erwartungswert, Standardabweichung, faire Spiele', ids: ['sto-erwartung', 'sto-spiel', 'sto-verteilung'] },
  { id: 'baum', topic: 'Stochastik', name: 'Baumdiagramm & bedingte Wahrscheinlichkeit', desc: 'Ziehen mit und ohne Zurücklegen, Vierfeldertafel', ids: ['sto-urne', 'sto-mit-zuruecklegen', 'sto-bayes'] },
  { id: 'hypothese', topic: 'Stochastik', name: 'Hypothesentest', desc: 'Entscheidungsregel, Fehler 1. und 2. Art', ids: ['sto-hyp-regel', 'sto-hyp-fehler', 'lt-hypothesentest'] },
];
