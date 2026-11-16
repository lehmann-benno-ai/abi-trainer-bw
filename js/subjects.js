// Subject menu. Mathe is the main subject (generated tasks + test); the others offer Lernkarten and the IQB original tasks.
(function () {
  const cards = (id, list) => list.map(([topic, front, back], i) => ({ id: id + '-' + i, topic, front, back }));
  const iqb = slug => 'https://www.iqb.hu-berlin.de/de/schule/aufgaben/sekii/' + slug + '/';
  window.Subjects = [
    { id: 'mathe', name: 'Mathe', icon: '∫', main: true, source: iqb('abiturpruefungsaufgaben-mathematik'), cards: window.Flashcards },
    {
      id: 'deutsch', name: 'Deutsch', icon: 'D', source: iqb('abiturprüfungsaufgaben-deutsch'), cards: cards('deutsch', [
        ['Aufgabenarten', 'Interpretation eines literarischen Textes – Aufbau', 'Einleitung (Autor, Titel, Gattung, Jahr, Thema, Deutungshypothese) → Inhalt/Aufbau → Analyse von Inhalt, Form und Sprache am Text → Deutung/Einordnung → Schluss mit Rückbezug auf die Deutungshypothese.'],
        ['Aufgabenarten', 'Analyse eines pragmatischen Textes (Sachtext)', 'Thema und Position benennen, Argumentationsgang nachzeichnen, sprachlich-rhetorische Mittel und ihre Wirkung untersuchen, Intention des Autors herausarbeiten.'],
        ['Aufgabenarten', 'Erörterung eines pragmatischen Textes', 'Erst Position und Argumentation des Textes knapp wiedergeben, dann sich kritisch damit auseinandersetzen (zustimmen, einschränken, widersprechen) und zu einem begründeten eigenen Urteil kommen.'],
        ['Aufgabenarten', 'Materialgestütztes Schreiben', 'Aus mehreren Materialien (Texte, Grafiken, Tabellen) Informationen auswählen und zu einem eigenen, adressatengerechten Text verarbeiten – informierend oder argumentierend. Materialien nicht einzeln nacherzählen.'],
        ['Aufgabenarten', 'Aufbau eines Arguments', 'These (Behauptung) → Begründung → Beleg/Beispiel → ggf. Folgerung.'],
        ['Stilmittel', 'Metapher', 'Bildhafter Ausdruck ohne Vergleichswort, z. B. „ein Meer von Menschen“.'],
        ['Stilmittel', 'Anapher', 'Wiederholung desselben Wortes am Anfang aufeinanderfolgender Sätze oder Verse.'],
        ['Stilmittel', 'Antithese', 'Gegenüberstellung gegensätzlicher Begriffe oder Gedanken, z. B. „Friede den Hütten, Krieg den Palästen“.'],
        ['Stilmittel', 'Personifikation', 'Etwas Unbelebtes oder Abstraktes erhält menschliche Eigenschaften, z. B. „die Sonne lacht“.'],
        ['Stilmittel', 'Ellipse', 'Unvollständiger Satz, in dem Satzteile ausgelassen sind, z. B. „Je früher, desto besser.“'],
        ['Stilmittel', 'Parataxe und Hypotaxe', 'Parataxe: Reihung von Hauptsätzen. Hypotaxe: Gefüge aus Haupt- und Nebensätzen.'],
        ['Stilmittel', 'Enjambement', 'Zeilensprung im Gedicht: Der Satz läuft über das Versende hinaus in den nächsten Vers.'],
        ['Literatur', 'Erzählformen', 'Ich-Erzähler oder Er-/Sie-Erzähler.'],
        ['Literatur', 'Erzählverhalten', 'Auktorial (allwissend, kommentierend), personal (aus der Sicht einer Figur), neutral (ohne Innensicht und Wertung).'],
        ['Literatur', 'Erlebte Rede', 'Gedanken einer Figur in der 3. Person und meist im Präteritum, ohne Redeeinleitung, z. B. „Morgen würde alles anders sein.“'],
        ['Literatur', 'Aufbau des klassischen Dramas (fünf Akte)', 'Exposition → steigende Handlung → Höhepunkt/Wendepunkt (Peripetie) → fallende Handlung mit retardierendem Moment → Katastrophe bzw. Lösung.'],
      ])
    },
    {
      id: 'englisch', name: 'Englisch', icon: 'E', source: iqb('abiturprüfungsaufgaben-englisch'), cards: cards('englisch', [
        ['Writing', 'Summary – rules', 'Present tense, own words, no quotations, no personal opinion; first sentence names author, title, text type and topic.'],
        ['Writing', 'Comment – structure', 'Introduction (topic, your thesis) → arguments with examples, strongest last → conclusion with your clear opinion.'],
        ['Writing', 'Analysis – what to do', 'Explain how language, structure and stylistic devices create an effect; give evidence with line references.'],
        ['Writing', 'Mediation (Sprachmittlung)', 'Pass on only the information the addressee needs, in the target language. Do not translate word for word; explain culture-specific terms.'],
        ['Writing', 'Characterisation – direct vs. indirect', 'Direct: the narrator or a character states traits. Indirect: traits are shown through actions, speech, thoughts and appearance.'],
        ['Stylistic devices', 'Alliteration', 'Repetition of the same initial consonant sound in neighbouring words, e.g. “wild and windy”.'],
        ['Stylistic devices', 'Simile vs. metaphor', 'Simile: comparison with “like” or “as”. Metaphor: comparison without “like” or “as”.'],
        ['Stylistic devices', 'Irony', 'Saying the opposite of what is meant, often to criticise or amuse.'],
        ['Stylistic devices', 'Rhetorical question', 'A question that expects no answer and is used to make the reader think or agree.'],
        ['Stylistic devices', 'Enumeration', 'Listing several items to emphasise quantity or variety.'],
        ['Narrative', 'Point of view', 'First-person narrator; third-person limited (one character’s view); third-person omniscient (knows everything).'],
        ['Linking words', 'Contrast', 'however, nevertheless, on the other hand, whereas, although, in contrast'],
        ['Linking words', 'Adding and concluding', 'Adding: moreover, furthermore, in addition. Concluding: to sum up, all in all, in conclusion.'],
        ['Grammar', 'If-clauses type 1, 2, 3', 'Type 1: if + simple present, will. Type 2: if + simple past, would. Type 3: if + past perfect, would have + past participle.'],
      ])
    },
    {
      id: 'franzoesisch', name: 'Französisch', icon: 'F', source: iqb('abiturprüfungsaufgaben-französisch'), cards: cards('franzoesisch', [
        ['Écrire', 'Le résumé – règles', 'Au présent, avec ses propres mots, sans citations et sans opinion personnelle ; la première phrase présente l’auteur, le titre, le type de texte et le sujet.'],
        ['Écrire', 'Le commentaire personnel – structure', 'Introduction (sujet, thèse) → arguments avec exemples → conclusion avec son opinion.'],
        ['Écrire', 'La médiation (Sprachmittlung)', 'Transmettre en français seulement les informations utiles au destinataire ; ne pas traduire mot à mot.'],
        ['Connecteurs', 'Opposition', 'mais, pourtant, cependant, en revanche, par contre, bien que (+ subjonctif)'],
        ['Connecteurs', 'Cause et conséquence', 'Cause : parce que, car, puisque, comme, à cause de. Conséquence : donc, c’est pourquoi, par conséquent.'],
        ['Connecteurs', 'Structurer un texte', 'd’abord, ensuite, de plus, enfin, en conclusion'],
        ['Grammaire', 'Le subjonctif – après quoi ?', 'Après la volonté, le sentiment, le doute et la nécessité : il faut que, je veux que, je suis content que, je doute que ; aussi après bien que, pour que, avant que.'],
        ['Grammaire', 'La phrase conditionnelle (si)', 'si + présent → futur simple ; si + imparfait → conditionnel présent ; si + plus-que-parfait → conditionnel passé.'],
        ['Grammaire', 'Passé composé ou imparfait ?', 'Passé composé : actions uniques et terminées, suite d’actions. Imparfait : descriptions, habitudes, actions en cours dans le passé.'],
        ['Grammaire', 'Le gérondif', 'en + participe présent (en lisant) : exprime la simultanéité, la manière ou la condition ; même sujet que le verbe principal.'],
        ['Analyse', 'Le narrateur', 'Narrateur à la première personne (je) ou à la troisième personne ; point de vue interne, externe ou omniscient.'],
        ['Analyse', 'La métaphore et la comparaison', 'Comparaison : avec « comme ». Métaphore : image sans mot de comparaison.'],
      ])
    },
    {
      id: 'physik', name: 'Physik', icon: 'P', source: iqb('abiturprüfungsaufgaben-physik'), cards: cards('physik', [
        ['Felder', 'Elektrische Feldstärke (Definition)', '\\(E = \\dfrac{F}{q}\\), Einheit \\(\\mathrm{N/C} = \\mathrm{V/m}\\)'],
        ['Felder', 'Feldstärke im Plattenkondensator', '\\(E = \\dfrac{U}{d}\\)'],
        ['Felder', 'Kapazität eines Kondensators', '\\(C = \\dfrac{Q}{U}\\); Plattenkondensator: \\(C = \\varepsilon_0\\varepsilon_r\\dfrac{A}{d}\\)'],
        ['Felder', 'Lorentzkraft auf eine bewegte Ladung', '\\(F_L = q\\cdot v\\cdot B\\) (für \\(\\vec v \\perp \\vec B\\)); sie steht senkrecht auf \\(\\vec v\\) und \\(\\vec B\\).'],
        ['Felder', 'Kreisbahn einer Ladung im Magnetfeld', 'Lorentzkraft = Zentripetalkraft: \\(qvB = \\dfrac{mv^2}{r}\\Rightarrow r = \\dfrac{mv}{qB}\\)'],
        ['Felder', 'Induktionsgesetz', '\\(U_{ind} = -N\\cdot\\dfrac{\\Delta\\Phi}{\\Delta t}\\) mit dem magnetischen Fluss \\(\\Phi = B\\cdot A\\)'],
        ['Felder', 'Energie nach Beschleunigungsspannung', '\\(q\\cdot U = \\tfrac12 m v^2\\)'],
        ['Schwingungen und Wellen', 'Periodendauer des Federpendels', '\\(T = 2\\pi\\sqrt{\\dfrac{m}{D}}\\)'],
        ['Schwingungen und Wellen', 'Thomsonsche Schwingungsgleichung (Schwingkreis)', '\\(T = 2\\pi\\sqrt{L\\cdot C}\\)'],
        ['Schwingungen und Wellen', 'Wellengleichung', '\\(c = \\lambda\\cdot f\\)'],
        ['Schwingungen und Wellen', 'Maxima am Doppelspalt / Gitter', '\\(d\\cdot\\sin\\alpha_k = k\\cdot\\lambda\\) mit \\(k = 0, 1, 2, \\dots\\)'],
        ['Quantenphysik', 'Energie eines Photons', '\\(E = h\\cdot f = \\dfrac{h\\cdot c}{\\lambda}\\)'],
        ['Quantenphysik', 'Fotoeffekt (Einstein-Gleichung)', '\\(E_{kin,max} = h\\cdot f - W_A\\)'],
        ['Quantenphysik', 'De-Broglie-Wellenlänge', '\\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{m\\cdot v}\\)'],
      ])
    },
    {
      id: 'chemie', name: 'Chemie', icon: 'C', source: iqb('abiturprüfungsaufgaben-chemie'), cards: cards('chemie', [
        ['Gleichgewicht', 'Prinzip von Le Chatelier', 'Übt man auf ein System im Gleichgewicht einen Zwang aus (Temperatur, Druck, Konzentration), verschiebt sich das Gleichgewicht so, dass der Zwang vermindert wird.'],
        ['Gleichgewicht', 'Massenwirkungsgesetz für \\(a\\,A + b\\,B \\rightleftharpoons c\\,C + d\\,D\\)', '\\(K_c = \\dfrac{c^c(C)\\cdot c^d(D)}{c^a(A)\\cdot c^b(B)}\\)'],
        ['Gleichgewicht', 'Wirkung eines Katalysators', 'Senkt die Aktivierungsenergie und beschleunigt Hin- und Rückreaktion; die Lage des Gleichgewichts ändert sich nicht.'],
        ['Säure-Base', 'Säure und Base nach Brønsted', 'Säure: Protonendonator. Base: Protonenakzeptor.'],
        ['Säure-Base', 'pH-Wert', '\\(pH = -\\lg c(H_3O^+)\\); bei 25 °C gilt \\(pH + pOH = 14\\).'],
        ['Säure-Base', 'pH einer schwachen Säure (Näherung)', '\\(pH \\approx \\tfrac12\\big(pK_S - \\lg c_0(HA)\\big)\\)'],
        ['Säure-Base', 'Puffergleichung (Henderson-Hasselbalch)', '\\(pH = pK_S + \\lg\\dfrac{c(A^-)}{c(HA)}\\)'],
        ['Redox', 'Oxidation und Reduktion', 'Oxidation: Elektronenabgabe (Oxidationszahl steigt). Reduktion: Elektronenaufnahme (Oxidationszahl sinkt).'],
        ['Redox', 'Galvanische Zelle: Anode und Kathode', 'Anode: Oxidation, Minuspol. Kathode: Reduktion, Pluspol. \\(\\Delta E = E(\\text{Kathode}) - E(\\text{Anode})\\)'],
        ['Redox', 'Elektrolyse', 'Durch elektrische Energie erzwungene Redoxreaktion; Umkehrung der Vorgänge in der galvanischen Zelle.'],
        ['Energetik', 'Gibbs-Helmholtz-Gleichung', '\\(\\Delta G = \\Delta H - T\\cdot\\Delta S\\); exergonisch (freiwillig) für \\(\\Delta G < 0\\).'],
        ['Organik', 'Kunststoffe: drei Gruppen', 'Thermoplaste (unvernetzt, schmelzbar), Duroplaste (engmaschig vernetzt, nicht schmelzbar), Elastomere (weitmaschig vernetzt, gummielastisch).'],
        ['Organik', 'Veresterung', 'Carbonsäure + Alkohol ⇌ Ester + Wasser (säurekatalysierte Gleichgewichtsreaktion, Kondensation).'],
      ])
    },
    {
      id: 'biologie', name: 'Biologie', icon: 'B', source: iqb('abiturprüfungsaufgaben-biologie'), cards: cards('biologie', [
        ['Leben und Energie', 'Bruttogleichung der Fotosynthese', '\\(6\\,CO_2 + 6\\,H_2O \\xrightarrow{\\text{Licht}} C_6H_{12}O_6 + 6\\,O_2\\)'],
        ['Leben und Energie', 'Bruttogleichung der Zellatmung', '\\(C_6H_{12}O_6 + 6\\,O_2 \\rightarrow 6\\,CO_2 + 6\\,H_2O\\) (Energie wird als ATP nutzbar)'],
        ['Leben und Energie', 'Abschnitte der Zellatmung', 'Glykolyse (Zellplasma) → oxidative Decarboxylierung → Citratzyklus (Mitochondrienmatrix) → Atmungskette (innere Mitochondrienmembran).'],
        ['Leben und Energie', 'Enzyme: Wirkungsweise', 'Biokatalysatoren, senken die Aktivierungsenergie; substrat- und wirkungsspezifisch (Schlüssel-Schloss-Prinzip).'],
        ['Leben und Energie', 'Kompetitive Hemmung', 'Der Hemmstoff ähnelt dem Substrat und konkurriert um das aktive Zentrum; durch hohe Substratkonzentration aufhebbar.'],
        ['Informationsverarbeitung', 'Ruhepotenzial', 'Membranspannung der nicht erregten Nervenzelle, etwa −70 mV (innen negativ); beruht auf ungleicher Ionenverteilung und selektiver Durchlässigkeit, vor allem für K⁺.'],
        ['Informationsverarbeitung', 'Phasen des Aktionspotenzials', 'Depolarisation (Na⁺-Einstrom) → Repolarisation (K⁺-Ausstrom) → Hyperpolarisation → Ruhepotenzial; es gilt das Alles-oder-Nichts-Gesetz.'],
        ['Informationsverarbeitung', 'Erregungsübertragung an der chemischen Synapse', 'Aktionspotenzial am Endknöpfchen → Ca²⁺-Einstrom → Transmitter werden in den synaptischen Spalt ausgeschüttet → Bindung an Rezeptoren der postsynaptischen Membran → Ionenkanäle öffnen sich.'],
        ['Vielfalt des Lebens', 'Proteinbiosynthese', 'Transkription: DNA → mRNA (im Zellkern). Translation: mRNA → Aminosäurekette (am Ribosom).'],
        ['Vielfalt des Lebens', 'Evolutionsfaktoren', 'Mutation, Rekombination, Selektion, Gendrift, Isolation.'],
        ['Vielfalt des Lebens', 'Homologie und Analogie', 'Homologie: gleicher Grundbauplan durch gemeinsame Abstammung. Analogie: ähnliche Funktion ohne gemeinsame Abstammung (konvergente Entwicklung).'],
        ['Umwelt', 'Ökologische Nische', 'Gesamtheit aller biotischen und abiotischen Umweltfaktoren, die eine Art zum Überleben nutzt und braucht.'],
        ['Umwelt', 'Konkurrenzausschlussprinzip', 'Zwei Arten mit gleicher ökologischer Nische können nicht dauerhaft im selben Lebensraum nebeneinander bestehen.'],
      ])
    },
  ];
})();
