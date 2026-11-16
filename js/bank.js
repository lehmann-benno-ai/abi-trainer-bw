// Hand-written content: Lernkarten (Grundwissen) and longer Wahlteil-style tasks with Erwartungshorizont.
window.Flashcards = [
  // Analysis
  ['Analysis', 'Produktregel', "\\((u\\cdot v)' = u'\\cdot v + u\\cdot v'\\)"],
  ['Analysis', 'Quotientenregel', "\\(\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}\\)"],
  ['Analysis', 'Kettenregel', "\\(\\big(u(v(x))\\big)' = u'(v(x))\\cdot v'(x)\\)"],
  ['Analysis', "Ableitung von \\(e^{kx}\\)", "\\(k\\cdot e^{kx}\\)"],
  ['Analysis', "Ableitung von \\(\\ln(x)\\)", "\\(\\dfrac{1}{x}\\) (für \\(x>0\\))"],
  ['Analysis', "Ableitung von \\(\\sin(x)\\) und \\(\\cos(x)\\)", "\\(\\sin' = \\cos\\), \\(\\cos' = -\\sin\\)"],
  ['Analysis', "Stammfunktion von \\(x^n\\) (\\(n\\neq -1\\))", "\\(\\dfrac{1}{n+1}x^{n+1} + C\\)"],
  ['Analysis', "Stammfunktion von \\(\\dfrac1x\\)", "\\(\\ln|x| + C\\)"],
  ['Analysis', "Stammfunktion von \\(e^{ax+b}\\)", "\\(\\dfrac1a e^{ax+b} + C\\)"],
  ['Analysis', 'Notwendige Bedingung für Extremstelle', "\\(f'(x_0) = 0\\)"],
  ['Analysis', 'Hinreichende Bedingung für Hochpunkt', "\\(f'(x_0) = 0\\) und \\(f''(x_0) < 0\\) (oder VZW von \\(f'\\) von + nach −)"],
  ['Analysis', 'Hinreichende Bedingung für Wendestelle', "\\(f''(x_0) = 0\\) und \\(f'''(x_0) \\neq 0\\) (oder VZW von \\(f''\\))"],
  ['Analysis', 'Tangentengleichung in \\(x_0\\)', "\\(t(x) = f'(x_0)(x - x_0) + f(x_0)\\)"],
  ['Analysis', 'Normale in \\(x_0\\)', "Steigung \\(m_n = -\\dfrac{1}{f'(x_0)}\\)"],
  ['Analysis', 'Mittlere Änderungsrate auf \\([a;b]\\)', "\\(\\dfrac{f(b)-f(a)}{b-a}\\) (Sekantensteigung)"],
  ['Analysis', 'Mittelwert einer Funktion auf \\([a;b]\\)', "\\(\\bar m = \\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,dx\\)"],
  ['Analysis', 'Hauptsatz der Differential- und Integralrechnung', "\\(\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)\\), wobei \\(F' = f\\)"],
  ['Analysis', 'Fläche zwischen zwei Graphen', "\\(A = \\displaystyle\\int_a^b |f(x) - g(x)|\\,dx\\) (an Schnittstellen aufteilen)"],
  ['Analysis', 'Periode von \\(a\\sin(b(x-c))+d\\)', "\\(p = \\dfrac{2\\pi}{b}\\); Amplitude \\(|a|\\), Mittellinie \\(y=d\\)"],
  ['Analysis', 'Achsensymmetrie zur y-Achse', "\\(f(-x) = f(x)\\) (ganzrational: nur gerade Exponenten)"],
  ['Analysis', 'Punktsymmetrie zum Ursprung', "\\(f(-x) = -f(x)\\) (ganzrational: nur ungerade Exponenten)"],
  ['Analysis', 'Verdopplungszeit bei \\(N(t)=N_0e^{kt}\\)', "\\(T_D = \\dfrac{\\ln 2}{k}\\)"],
  ['Analysis', 'Begrenztes Wachstum', "\\(f(t) = S - (S - f(0))\\,e^{-kt}\\), DGL \\(f' = k(S - f)\\)"],
  ['Analysis', 'Rotationsvolumen um die x-Achse (LF)', "\\(V = \\pi\\displaystyle\\int_a^b \\big(f(x)\\big)^2\\,dx\\)"],
  // Geometrie
  ['Geometrie', 'Betrag (Länge) eines Vektors', "\\(|\\vec a| = \\sqrt{a_1^2 + a_2^2 + a_3^2}\\)"],
  ['Geometrie', 'Skalarprodukt', "\\(\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 + a_3b_3\\); orthogonal ⇔ \\(\\vec a\\cdot\\vec b = 0\\)"],
  ['Geometrie', 'Winkel zwischen zwei Vektoren', "\\(\\cos\\alpha = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\cdot|\\vec b|}\\)"],
  ['Geometrie', 'Vektorprodukt', "\\(\\vec a\\times\\vec b = \\begin{pmatrix}a_2b_3-a_3b_2\\\\a_3b_1-a_1b_3\\\\a_1b_2-a_2b_1\\end{pmatrix}\\), steht senkrecht auf \\(\\vec a, \\vec b\\)"],
  ['Geometrie', 'Parameterform einer Geraden', "\\(g: \\vec x = \\vec p + t\\cdot\\vec u\\)"],
  ['Geometrie', 'Koordinatenform einer Ebene', "\\(E: n_1x_1 + n_2x_2 + n_3x_3 = d\\) mit Normalenvektor \\(\\vec n\\)"],
  ['Geometrie', 'Abstand Punkt–Ebene (Hesse)', "\\(d = \\dfrac{|n_1q_1 + n_2q_2 + n_3q_3 - d|}{|\\vec n|}\\)"],
  ['Geometrie', 'Lagebeziehungen zweier Geraden', 'identisch, parallel, schneidend oder windschief (Richtungsvektoren kollinear? LGS lösbar?)'],
  ['Geometrie', 'Winkel zwischen Gerade und Ebene', "\\(\\sin\\alpha = \\dfrac{|\\vec u\\cdot\\vec n|}{|\\vec u|\\cdot|\\vec n|}\\)"],
  ['Geometrie', 'Winkel zwischen zwei Ebenen', "\\(\\cos\\alpha = \\dfrac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1|\\cdot|\\vec n_2|}\\)"],
  ['Geometrie', 'Mittelpunkt einer Strecke AB', "\\(\\vec m = \\tfrac12(\\vec a + \\vec b)\\)"],
  ['Geometrie', 'Flächeninhalt Dreieck ABC', "\\(F = \\tfrac12\\,|\\vec{AB}\\times\\vec{AC}|\\)"],
  ['Geometrie', 'Volumen einer Pyramide', "\\(V = \\tfrac13\\cdot G\\cdot h\\)"],
  // Stochastik
  ['Stochastik', 'Bernoulli-Formel', "\\(P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}\\)"],
  ['Stochastik', 'Erwartungswert Binomialverteilung', "\\(\\mu = n\\cdot p\\)"],
  ['Stochastik', 'Standardabweichung Binomialverteilung', "\\(\\sigma = \\sqrt{n\\cdot p\\cdot(1-p)}\\)"],
  ['Stochastik', 'Erwartungswert einer Zufallsgröße', "\\(E(X) = \\sum x_i\\cdot P(X = x_i)\\)"],
  ['Stochastik', 'Bedingte Wahrscheinlichkeit', "\\(P_B(A) = \\dfrac{P(A\\cap B)}{P(B)}\\)"],
  ['Stochastik', 'Stochastische Unabhängigkeit', "\\(P(A\\cap B) = P(A)\\cdot P(B)\\)"],
  ['Stochastik', '„Mindestens einmal“-Aufgabe', "\\(P(X\\geq1) = 1 - (1-p)^n\\); nach \\(n\\) mit \\(\\ln\\) auflösen"],
  ['Stochastik', 'Fehler 1. Art (Hypothesentest)', "\\(H_0\\) wird abgelehnt, obwohl sie wahr ist (Wahrscheinlichkeit ≤ α)"],
  ['Stochastik', 'Fehler 2. Art (Hypothesentest)', "\\(H_0\\) wird beibehalten, obwohl sie falsch ist"],
  ['Stochastik', 'Faires Spiel', 'Erwartungswert des Gewinns = 0 (Einsatz = erwarteter Auszahlungsbetrag)'],
  ['Stochastik', 'Anzahl Möglichkeiten: k aus n ohne Reihenfolge', "\\(\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}\\)"]
].map(([topic, front, back], i) => ({ id: 'fc' + i, topic, front, back }));

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
