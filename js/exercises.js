// Practice questions for the subjects besides Mathe.
// Exercises: [topic, question, [correct, wrong, wrong, wrong] | true/false, explanation] – options are shuffled when shown.
// SubjectGens: calculation tasks with new numbers each time, same shape as the Mathe generators.
(function (global) {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const dec = (x, d = 2) => String(Math.round(x * 10 ** d) / 10 ** d).replace('.', ',');
  const rd = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
  const ex = (id, list) => list.map(([topic, q, a, explain], i) => typeof a === 'boolean'
    ? { id: `ex-${id}-${i}`, topic, q, options: ['Richtig', 'Falsch'], answer: a ? 0 : 1, explain, tf: true }
    : { id: `ex-${id}-${i}`, topic, q, options: a, answer: 0, explain });

  global.Exercises = {
    deutsch: ex('deutsch', [
      ['Stilmittel', '„Das Wasser rauscht’, das Wasser schwoll“ (Goethe) – welches Stilmittel liegt vor?', ['Anapher', 'Oxymoron', 'Chiasmus', 'Litotes'], 'Dasselbe Wort steht am Anfang aufeinanderfolgender Satzteile: Anapher.'],
      ['Stilmittel', '„bittersüß“, „beredtes Schweigen“ – welches Stilmittel ist das?', ['Oxymoron', 'Antithese', 'Euphemismus', 'Hyperbel'], 'Zwei sich widersprechende Begriffe werden direkt verbunden: Oxymoron. Bei der Antithese stehen Gegensätze in getrennten Satzteilen.'],
      ['Stilmittel', '„Er ist nicht unbegabt.“ – welches Stilmittel liegt vor?', ['Litotes', 'Ironie', 'Hyperbel', 'Klimax'], 'Litotes: Hervorhebung durch Verneinung des Gegenteils („nicht unbegabt“ = ziemlich begabt).'],
      ['Stilmittel', '„Die Kunst ist lang, und kurz ist unser Leben.“ (Goethe) – welches Stilmittel?', ['Chiasmus', 'Parallelismus', 'Anapher', 'Ellipse'], 'Kreuzstellung A–B / B–A (lang – Kunst … kurz – Leben): Chiasmus.'],
      ['Stilmittel', '„entschlafen“ statt „sterben“ – welches Stilmittel?', ['Euphemismus', 'Metapher', 'Personifikation', 'Neologismus'], 'Ein unangenehmer Sachverhalt wird beschönigend ausgedrückt: Euphemismus.'],
      ['Stilmittel', 'Eine Hyperbel ist eine starke Untertreibung.', false, 'Falsch: Die Hyperbel ist eine starke Übertreibung („tausendmal gesagt“). Die Untertreibung heißt Litotes bzw. Meiosis.'],
      ['Literatur', 'Welcher Erzähler kennt die Gedanken aller Figuren und kommentiert das Geschehen?', ['Auktorialer Erzähler', 'Personaler Erzähler', 'Neutraler Erzähler', 'Ich-Erzähler'], 'Auktorial = allwissend und wertend. Personal = aus der Sicht einer Figur, neutral = ohne Innensicht.'],
      ['Literatur', 'Woran erkennt man einen inneren Monolog?', ['Gedanken einer Figur in der 1. Person, meist im Präsens, ohne Redeeinleitung', 'Gedanken in der 3. Person im Präteritum ohne Redeeinleitung', 'Wörtliche Rede mit Anführungszeichen und Redeeinleitung', 'Ein Kommentar des Erzählers an den Leser'], 'Innerer Monolog: 1. Person, Präsens. Die 3. Person im Präteritum ohne Redeeinleitung ist die erlebte Rede.'],
      ['Literatur', 'Die Peripetie ist im klassischen Drama der Wendepunkt der Handlung.', true, 'Richtig: Im fünfaktigen Drama liegt die Peripetie meist im 3. Akt am Höhepunkt.'],
      ['Epochen', 'Welche Epoche stellt Gefühl, Genie und Auflehnung gegen Konventionen in den Mittelpunkt (ca. 1767–1785)?', ['Sturm und Drang', 'Aufklärung', 'Realismus', 'Expressionismus'], 'Sturm und Drang (z. B. Goethes „Werther“, Schillers „Die Räuber“) betont Gefühl und Genie gegen die Vernunftbetonung der Aufklärung.'],
      ['Epochen', 'Zu welcher Epoche passt Kants Leitspruch „Sapere aude!“ – „Habe Mut, dich deines eigenen Verstandes zu bedienen“?', ['Aufklärung', 'Romantik', 'Barock', 'Naturalismus'], 'Kant definiert damit 1784 die Aufklärung als „Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit“.'],
      ['Epochen', 'Welche Motive sind typisch für den Expressionismus (ca. 1910–1925)?', ['Großstadt, Ich-Zerfall und Weltuntergang', 'Harmonie, Maß und Humanität', 'Sehnsucht, Nacht und Wanderschaft', 'Detailgenaue Milieuschilderung mit Dialekt'], 'Expressionismus: Großstadt, Krieg, Ich-Dissoziation. Harmonie = Klassik, Sehnsucht/Nacht = Romantik, Milieu/Dialekt = Naturalismus.'],
      ['Aufgabenarten', 'Was gehört in die Einleitung einer Interpretation?', ['Autor, Titel, Textsorte, Erscheinungsjahr, Thema und Deutungshypothese', 'Eine ausführliche Nacherzählung des Inhalts', 'Die eigene Meinung zum Text', 'Möglichst viele Zitate'], 'Die Einleitung informiert knapp über den Text und formuliert eine Deutungshypothese, die im Hauptteil geprüft wird.'],
      ['Aufgabenarten', 'Beim materialgestützten Schreiben fasst man jedes Material der Reihe nach einzeln zusammen.', false, 'Falsch: Die Materialien werden ausgewählt und zu einem eigenen, adressatengerechten Text verarbeitet – nicht nacheinander nacherzählt.'],
      ['Aufgabenarten', 'Wozu verwendet man in einer Textanalyse den Konjunktiv I?', ['Zur Wiedergabe von Aussagen in indirekter Rede', 'Für irreale Wünsche', 'Für Höflichkeitsformen', 'Um Vermutungen des Analysierenden auszudrücken'], 'Konjunktiv I kennzeichnet indirekte Rede: „Der Autor behauptet, die Gesellschaft sei …“.'],
      ['Literatur', 'Was leistet die Exposition im Drama?', ['Sie führt in Figuren, Ort, Zeit und Grundkonflikt ein.', 'Sie bringt die Lösung des Konflikts.', 'Sie ist der Höhepunkt der Handlung.', 'Sie verzögert die Katastrophe.'], 'Exposition = 1. Akt bzw. Einleitung des Dramas. Die Verzögerung vor der Katastrophe ist das retardierende Moment.'],
      ['Literatur', 'Was kennzeichnet ein geschlossenes Drama?', ['Einheit von Ort, Zeit und Handlung, streng gebauter Aufbau in fünf Akten', 'Lose Szenenfolge mit vielen Schauplätzen', 'Offenes Ende ohne Lösung', 'Alltagssprache und viele Nebenhandlungen'], 'Geschlossen: z. B. Schillers „Maria Stuart“. Offen: z. B. Büchners „Woyzeck“ mit lockerer Szenenfolge.'],
      ['Epochen', 'Welche Epoche (ca. 1848–1890) will die Wirklichkeit möglichst genau, aber „poetisch verklärt“ darstellen?', ['Realismus', 'Naturalismus', 'Romantik', 'Barock'], 'Bürgerlicher/poetischer Realismus (z. B. Fontane, Storm). Der Naturalismus geht noch weiter und verzichtet auf jede Verklärung.'],
    ]),
    englisch: ex('englisch', [
      ['Grammar', 'If I ___ more time, I would travel more.', ['had', 'have', 'would have', 'will have'], 'Conditional type 2: if + simple past, would + infinitive.'],
      ['Grammar', 'If she had studied, she ___ the exam.', ['would have passed', 'would pass', 'will pass', 'passed'], 'Conditional type 3: if + past perfect, would have + past participle.'],
      ['Grammar', 'He has lived in London ___ 2015.', ['since', 'for', 'ago', 'during'], '“since” + point in time, “for” + period of time (for ten years).'],
      ['Grammar', 'Passive voice of “They are building a new bridge.”', ['A new bridge is being built.', 'A new bridge is built.', 'A new bridge was being built.', 'A new bridge has built.'], 'Present progressive passive: am/is/are + being + past participle.'],
      ['Grammar', 'She said, “I am tired.” – reported speech:', ['She said (that) she was tired.', 'She said (that) she is being tired.', 'She said (that) she has been tired.', 'She said (that) she were tired.'], 'Backshift after a past reporting verb: simple present → simple past.'],
      ['Linking words', 'Which linking word expresses a contrast?', ['nevertheless', 'furthermore', 'therefore', 'for instance'], 'nevertheless = trotzdem. furthermore adds, therefore shows a result, for instance gives an example.'],
      ['Linking words', 'What does “consequently” express?', ['a result', 'a contrast', 'an example', 'a condition'], 'consequently = folglich, like therefore or as a result.'],
      ['Stylistic devices', '“The wind whispered through the trees.” – which device?', ['personification', 'simile', 'alliteration', 'hyperbole'], 'Something non-human (the wind) is given a human action (whispering).'],
      ['Stylistic devices', '“I’ve told you a million times!” – which device?', ['hyperbole', 'irony', 'enumeration', 'metaphor'], 'Obvious exaggeration for emphasis: hyperbole.'],
      ['Writing', 'A summary should contain quotations from the text and your own opinion.', false, 'False: a summary uses your own words, no quotations and no opinion, in the present tense.'],
      ['Writing', 'In a mediation task you should …', ['pass on only the information the addressee needs, adapted to the situation', 'translate the text word for word', 'add your own opinion on the topic', 'summarise every paragraph in the same order'], 'Mediation is about the addressee’s needs, not a full translation.'],
      ['Narrative', 'A narrator who tells the story in the third person but only knows one character’s thoughts is …', ['a third-person limited narrator', 'an omniscient narrator', 'a first-person narrator', 'an unreliable narrator'], 'Third-person limited: “he/she”, inner view of one character only.'],
      ['Narrative', 'An unreliable narrator’s account cannot be fully trusted by the reader.', true, 'True: the narrator’s view is distorted, e.g. by lies, naivety or self-deception.'],
      ['Grammar', 'She asked, “Where do you live?” – reported speech:', ['She asked where I lived.', 'She asked where do I live.', 'She asked where did I live.', 'She asked where I live?'], 'Reported questions use statement word order (no do/did) and backshift.'],
      ['Grammar', 'The letter ___ yesterday.', ['was sent', 'has been sent', 'is sent', 'sent'], 'Simple past passive (was/were + past participle) with a past time expression like yesterday.'],
    ]),
    franzoesisch: ex('franzoesisch', [
      ['Grammaire', 'Il faut que tu ___ (venir) demain.', ['viennes', 'viens', 'viendras', 'venais'], '« il faut que » + subjonctif : que tu viennes.'],
      ['Grammaire', 'Si j’avais le temps, je ___ (voyager).', ['voyagerais', 'voyagerai', 'voyage', 'aurais voyagé'], 'si + imparfait → conditionnel présent.'],
      ['Grammaire', 'Si j’avais su, je ___ venu.', ['serais', 'suis', 'serai', 'étais'], 'si + plus-que-parfait → conditionnel passé : je serais venu.'],
      ['Grammaire', 'Hier, il ___ (pleuvoir) quand je suis sorti.', ['pleuvait', 'a plu', 'pleut', 'pleuvra'], 'Description d’une situation en cours dans le passé : imparfait. L’action ponctuelle (je suis sorti) est au passé composé.'],
      ['Grammaire', '« Tu parles à Marie ? – Oui, je ___ parle. »', ['lui', 'la', 'y', 'en'], 'parler à quelqu’un → pronom COI : lui.'],
      ['Grammaire', '« Tu as des frères ? – Oui, j’___ ai deux. »', ['en', 'y', 'les', 'leur'], 'Quantité (des …, deux) → pronom en.'],
      ['Grammaire', 'Après « bien que », on utilise …', ['le subjonctif', 'l’indicatif', 'le conditionnel', 'l’infinitif'], 'bien que, pour que, avant que, à condition que + subjonctif.'],
      ['Connecteurs', 'Le connecteur « en revanche » exprime …', ['une opposition', 'une cause', 'une conséquence', 'une addition'], 'en revanche = par contre = dagegen.'],
      ['Connecteurs', 'Le connecteur « par conséquent » exprime …', ['une conséquence', 'une opposition', 'une concession', 'un exemple'], 'par conséquent = donc = folglich.'],
      ['Écrire', 'Dans un résumé, on donne son opinion personnelle.', false, 'Faux : le résumé reste neutre, au présent, sans citations ni opinion.'],
      ['Analyse', '« Elle est belle comme le jour. » – quelle figure de style ?', ['une comparaison', 'une métaphore', 'une hyperbole', 'une antithèse'], 'Avec le mot de comparaison « comme » : comparaison.'],
      ['Grammaire', 'Le gérondif (« en travaillant ») exprime par exemple …', ['la simultanéité ou la manière', 'une action future', 'un ordre', 'une hypothèse irréelle'], 'Le gérondif exprime la simultanéité, la manière ou la condition, avec le même sujet que le verbe principal.'],
    ]),
    physik: ex('physik', [
      ['Felder', 'Wie ändert sich die Kapazität eines Plattenkondensators, wenn der Plattenabstand verdoppelt wird?', ['Sie halbiert sich.', 'Sie verdoppelt sich.', 'Sie bleibt gleich.', 'Sie vervierfacht sich.'], '\\(C = \\varepsilon_0\\varepsilon_r\\frac{A}{d}\\): \\(C\\) ist antiproportional zu \\(d\\).'],
      ['Felder', 'Ein Elektron fliegt senkrecht zu den Feldlinien in ein homogenes Magnetfeld. Welche Bahn hat es?', ['Eine Kreisbahn', 'Eine Parabel', 'Eine Gerade', 'Eine Spirale nach außen'], 'Die Lorentzkraft steht immer senkrecht zur Geschwindigkeit und wirkt als Zentripetalkraft.'],
      ['Felder', 'Ein Elektron fliegt senkrecht zu den Feldlinien in ein homogenes elektrisches Feld. Welche Bahn hat es?', ['Eine Parabel', 'Eine Kreisbahn', 'Eine Gerade', 'Eine Schraubenlinie'], 'Konstante Kraft quer zur Anfangsgeschwindigkeit – wie beim waagerechten Wurf: Parabel.'],
      ['Felder', 'Die Lorentzkraft verrichtet an einem bewegten Ladungsträger Arbeit und erhöht den Betrag seiner Geschwindigkeit.', false, 'Falsch: Die Lorentzkraft steht senkrecht zur Bewegung, ändert nur die Richtung und verrichtet keine Arbeit.'],
      ['Felder', 'Was besagt die Lenzsche Regel?', ['Der Induktionsstrom ist so gerichtet, dass er seiner Ursache entgegenwirkt.', 'Der Induktionsstrom verstärkt die Flussänderung.', 'Die Induktionsspannung ist proportional zur Stromstärke.', 'Ein Magnetfeld entsteht nur bei Wechselstrom.'], 'Lenz: Das Magnetfeld des induzierten Stroms wirkt der Flussänderung entgegen (Energieerhaltung).'],
      ['Schwingungen und Wellen', 'Wie ändert sich die Periodendauer eines Fadenpendels, wenn man die Länge vervierfacht?', ['Sie verdoppelt sich.', 'Sie vervierfacht sich.', 'Sie halbiert sich.', 'Sie bleibt gleich.'], '\\(T = 2\\pi\\sqrt{\\ell/g}\\): vierfache Länge → \\(\\sqrt 4 = 2\\)-fache Periodendauer.'],
      ['Schwingungen und Wellen', 'Wann tritt bei der Interferenz zweier Wellen konstruktive Interferenz (Maximum) auf?', ['Wenn der Gangunterschied ein ganzzahliges Vielfaches von \\(\\lambda\\) ist', 'Wenn der Gangunterschied \\(\\lambda/2\\) beträgt', 'Nur wenn beide Wellen verschiedene Frequenzen haben', 'Wenn die Amplituden verschieden sind'], 'Maximum: \\(\\Delta s = k\\cdot\\lambda\\). Minimum: \\(\\Delta s = (2k+1)\\cdot\\lambda/2\\).'],
      ['Schwingungen und Wellen', 'Beugung und Interferenz von Licht sprechen für das Wellenmodell des Lichts.', true, 'Richtig: Beide Effekte lassen sich nur mit Wellen erklären (z. B. Doppelspalt, Gitter).'],
      ['Quantenphysik', 'Photoeffekt: Was passiert, wenn man bei gleicher Frequenz die Intensität des Lichts erhöht?', ['Es werden mehr Elektronen ausgelöst; ihre maximale kinetische Energie bleibt gleich.', 'Die Elektronen werden schneller.', 'Es werden erst ab einer Mindestintensität Elektronen ausgelöst.', 'Die Austrittsarbeit sinkt.'], 'Mehr Photonen → mehr Elektronen. Die Energie pro Photon \\(E = h\\cdot f\\) hängt nur von der Frequenz ab.'],
      ['Quantenphysik', 'Was zeigt das Doppelspaltexperiment mit einzelnen Elektronen?', ['Das Interferenzmuster baut sich aus vielen einzelnen Treffern auf.', 'Elektronen treffen nur hinter den Spalten auf.', 'Elektronen werden am Spalt vernichtet.', 'Jedes Elektron erzeugt allein ein vollständiges Muster.'], 'Einzelne Elektronen landen punktförmig (Teilchen), ihre Verteilung zeigt Interferenz (Welle).'],
      ['Quantenphysik', 'Was besagt die Heisenbergsche Unbestimmtheitsrelation?', ['Ort und Impuls eines Quantenobjekts sind nicht gleichzeitig beliebig genau festgelegt.', 'Messgeräte sind grundsätzlich zu ungenau.', 'Die Energie eines Atoms ist unbestimmt.', 'Elektronen haben keinen Ort.'], '\\(\\Delta x\\cdot\\Delta p \\geq \\frac{h}{4\\pi}\\) – eine Eigenschaft der Natur, kein Messfehler.'],
      ['Quantenphysik', 'Was passiert, wenn ein Elektron im Atom von einem höheren auf ein niedrigeres Energieniveau wechselt?', ['Ein Photon mit \\(E = h\\cdot f = \\Delta E\\) wird ausgesandt.', 'Ein Photon wird absorbiert.', 'Das Atom wird ionisiert.', 'Die Kernladung ändert sich.'], 'Emission: Die Energiedifferenz der Niveaus wird als Photon abgegeben – das erklärt Linienspektren.'],
      ['Felder', 'Wann wird in einer Leiterschleife eine Spannung induziert?', ['Wenn sich der magnetische Fluss durch die Schleife ändert', 'Immer, wenn ein Magnetfeld vorhanden ist', 'Nur wenn ein Strom durch die Schleife fließt', 'Wenn die Schleife aus Eisen besteht'], 'Induktionsgesetz: \\(U_{ind} = -n\\cdot\\dot\\Phi\\) – entscheidend ist die Änderung des Flusses (Feld, Fläche oder Winkel).'],
      ['Felder', 'Ein konstantes Magnetfeld induziert in einer ruhenden Spule eine Spannung.', false, 'Falsch: Ohne Flussänderung keine Induktion.'],
    ]),
    chemie: ex('chemie', [
      ['Gleichgewicht', 'Bei einer exothermen Gleichgewichtsreaktion wird die Temperatur erhöht. Was passiert?', ['Das Gleichgewicht verschiebt sich zu den Edukten.', 'Das Gleichgewicht verschiebt sich zu den Produkten.', 'Nichts, nur die Geschwindigkeit ändert sich.', 'Die Reaktion stoppt.'], 'Le Chatelier: Temperaturerhöhung begünstigt die endotherme Richtung, hier die Rückreaktion.'],
      ['Gleichgewicht', 'Welche Wirkung hat ein Katalysator auf ein chemisches Gleichgewicht?', ['Es stellt sich schneller ein, die Lage bleibt gleich.', 'Es verschiebt sich zu den Produkten.', 'Es verschiebt sich zu den Edukten.', 'Die Gleichgewichtskonstante wird größer.'], 'Ein Katalysator senkt die Aktivierungsenergie für Hin- und Rückreaktion gleichermaßen.'],
      ['Gleichgewicht', 'Haber-Bosch: \\(\\mathrm{N_2 + 3\\,H_2 \\rightleftharpoons 2\\,NH_3}\\). Was bewirkt eine Druckerhöhung?', ['Mehr Ammoniak', 'Weniger Ammoniak', 'Keine Änderung', 'Zerfall von Ammoniak'], 'Druckerhöhung begünstigt die Seite mit weniger Gasteilchen: 4 → 2.'],
      ['Säure-Base', 'Eine Säure nach Brønsted ist ein …', ['Protonendonator', 'Protonenakzeptor', 'Elektronendonator', 'Elektronenakzeptor'], 'Brønsted-Säuren geben \\(\\mathrm{H^+}\\) ab, Basen nehmen sie auf.'],
      ['Säure-Base', 'Welche Teilchenart ist die korrespondierende Base zu \\(\\mathrm{NH_4^+}\\)?', ['\\(\\mathrm{NH_3}\\)', '\\(\\mathrm{NH_2^-}\\)', '\\(\\mathrm{OH^-}\\)', '\\(\\mathrm{H_3O^+}\\)'], 'Säure minus ein Proton = korrespondierende Base: \\(\\mathrm{NH_4^+ \\to NH_3 + H^+}\\).'],
      ['Säure-Base', 'Je kleiner der \\(pK_S\\)-Wert, desto stärker ist die Säure.', true, 'Richtig: Ein kleiner \\(pK_S\\) bedeutet eine große Säurekonstante, die Säure protolysiert stärker.'],
      ['Säure-Base', 'Essigsäure wird mit Natronlauge titriert. Welchen pH-Wert hat die Lösung am Äquivalenzpunkt?', ['Größer als 7', 'Genau 7', 'Kleiner als 7', 'Genau 14'], 'Am Äquivalenzpunkt liegt Acetat vor, eine schwache Base – die Lösung reagiert leicht basisch.'],
      ['Redox', 'Was ist eine Oxidation?', ['Elektronenabgabe', 'Elektronenaufnahme', 'Protonenabgabe', 'Protonenaufnahme'], 'Oxidation = Elektronenabgabe, die Oxidationszahl steigt. Reduktion = Elektronenaufnahme.'],
      ['Redox', 'Welche Rolle hat die Zinkelektrode im Daniell-Element (Zn/Cu)?', ['Minuspol, an dem Zink oxidiert wird', 'Pluspol, an dem Kupfer abgeschieden wird', 'Pluspol, an dem Zink reduziert wird', 'Sie ist nur Salzbrücke'], 'Zink ist unedler (\\(E^0 = -0{,}76\\) V) und gibt Elektronen ab: Anode, Minuspol.'],
      ['Redox', 'Welche Oxidationszahl hat Schwefel in \\(\\mathrm{H_2SO_4}\\)?', ['+VI', '+IV', '−II', '+II'], '2·(+I) + x + 4·(−II) = 0 → x = +VI.'],
      ['Energetik', 'Was bedeutet \\(\\Delta G < 0\\) für eine Reaktion?', ['Sie läuft freiwillig ab (exergonisch).', 'Sie ist zwingend exotherm.', 'Sie läuft sehr schnell ab.', 'Sie ist im Gleichgewicht.'], 'Gibbs-Helmholtz: \\(\\Delta G = \\Delta H - T\\Delta S\\). Negativ = freiwillig, sagt aber nichts über die Geschwindigkeit.'],
      ['Organik', 'Welche funktionelle Gruppe haben Alkohole?', ['Hydroxygruppe –OH', 'Carboxygruppe –COOH', 'Carbonylgruppe C=O', 'Aminogruppe –NH₂'], 'Alkohole (Alkanole) tragen eine Hydroxygruppe.'],
      ['Organik', 'Woraus entsteht ein Ester?', ['Aus Carbonsäure und Alkohol unter Wasserabspaltung', 'Aus zwei Alkoholen', 'Aus Alken und Wasser', 'Aus Carbonsäure und Base'], 'Veresterung: Kondensation von Carbonsäure und Alkohol, katalysiert durch Säure.'],
      ['Organik', 'Welchen Reaktionstyp zeigt Benzol bevorzugt?', ['Elektrophile Substitution', 'Elektrophile Addition', 'Radikalische Addition', 'Eliminierung'], 'Bei der Substitution bleibt das stabile aromatische System erhalten.'],
      ['Säure-Base', 'Welcher Indikator eignet sich für die Titration von Essigsäure mit Natronlauge?', ['Phenolphthalein (Umschlag ca. pH 8–10)', 'Methylorange (Umschlag ca. pH 3–4,4)', 'Methylrot (Umschlag ca. pH 4,4–6,2)', 'Kein Indikator ist geeignet'], 'Der Äquivalenzpunkt liegt im basischen Bereich – der Umschlagsbereich muss ihn enthalten.'],
    ]),
    biologie: ex('biologie', [
      ['Leben und Energie', 'Wo findet die Lichtreaktion der Fotosynthese statt?', ['An der Thylakoidmembran', 'Im Stroma', 'In der Mitochondrienmatrix', 'Im Cytoplasma'], 'Lichtreaktion: Thylakoidmembran (ATP, NADPH). Calvin-Zyklus: Stroma.'],
      ['Leben und Energie', 'Wie viel ATP gewinnt die Zelle netto in der Glykolyse pro Glucose?', ['2 ATP', '4 ATP', '36 ATP', '0 ATP'], '4 ATP werden gebildet, 2 eingesetzt: netto 2 ATP (plus 2 NADH).'],
      ['Leben und Energie', 'Wo läuft der Citratzyklus ab?', ['In der Mitochondrienmatrix', 'An der inneren Mitochondrienmembran', 'Im Cytoplasma', 'Im Chloroplasten'], 'Citratzyklus: Matrix. Atmungskette: innere Mitochondrienmembran.'],
      ['Leben und Energie', 'Was kennzeichnet eine kompetitive Hemmung eines Enzyms?', ['Der Hemmstoff konkurriert mit dem Substrat um das aktive Zentrum.', 'Der Hemmstoff bindet an ein allosterisches Zentrum.', 'Das Enzym wird durch Hitze zerstört.', 'Hohe Substratkonzentration verstärkt die Hemmung.'], 'Kompetitiv: Bindung im aktiven Zentrum, durch viel Substrat aufhebbar.'],
      ['Informationsverarbeitung', 'Wie groß ist das Ruhepotenzial einer Nervenzelle etwa?', ['−70 mV', '+30 mV', '0 mV', '−5 V'], 'Ca. −70 mV, vor allem durch \\(\\mathrm{K^+}\\)-Ausstrom und die Na-K-Pumpe.'],
      ['Informationsverarbeitung', 'Wodurch entsteht die Depolarisation beim Aktionspotenzial?', ['Einstrom von \\(\\mathrm{Na^+}\\) durch spannungsgesteuerte Kanäle', 'Ausstrom von \\(\\mathrm{K^+}\\)', 'Einstrom von \\(\\mathrm{Cl^-}\\)', 'Arbeit der Na-K-Pumpe'], 'Na⁺-Einstrom depolarisiert, K⁺-Ausstrom repolarisiert.'],
      ['Informationsverarbeitung', 'Was ist saltatorische Erregungsleitung?', ['Das Aktionspotenzial springt von Schnürring zu Schnürring.', 'Die Erregung läuft rückwärts zum Zellkörper.', 'Erregungsleitung ohne Ionenströme.', 'Erregung über chemische Synapsen.'], 'Bei myelinisierten Axonen entstehen APs nur an den Ranvierschen Schnürringen – das ist schneller.'],
      ['Informationsverarbeitung', 'Was löst an der Synapse die Ausschüttung des Transmitters aus?', ['Einstrom von \\(\\mathrm{Ca^{2+}}\\) ins Endknöpfchen', 'Einstrom von \\(\\mathrm{K^+}\\)', 'Abbau von Acetylcholin', 'Hyperpolarisation'], 'Das AP öffnet Ca²⁺-Kanäle; Ca²⁺ lässt die Vesikel mit der Membran verschmelzen.'],
      ['Vielfalt des Lebens', 'Was ist ein Codon?', ['Ein Basentriplett der mRNA, das eine Aminosäure codiert', 'Ein Abschnitt aus 10 Basen', 'Ein Protein', 'Ein Chromosomenabschnitt ohne Information'], 'Drei Basen der mRNA = ein Codon; das Anticodon der tRNA passt dazu.'],
      ['Vielfalt des Lebens', 'Wo findet die Transkription bei Eukaryoten statt?', ['Im Zellkern', 'An den Ribosomen', 'Im Golgi-Apparat', 'In den Lysosomen'], 'Transkription im Kern, Translation an den Ribosomen im Cytoplasma.'],
      ['Vielfalt des Lebens', 'Mutationen entstehen gezielt, weil ein Organismus sie zur Anpassung braucht.', false, 'Falsch: Mutationen sind ungerichtet und zufällig. Die Selektion entscheidet, welche sich durchsetzen.'],
      ['Vielfalt des Lebens', 'Wie entsteht nach Darwins Evolutionstheorie Angepasstheit?', ['Durch Variation und natürliche Selektion', 'Durch Vererbung im Leben erworbener Eigenschaften', 'Durch zielgerichtete Mutationen', 'Durch den Willen der Lebewesen'], 'Individuen variieren; die besser Angepassten haben mehr Nachkommen. Erworbene Eigenschaften vererben (Lamarck) gilt als widerlegt.'],
      ['Umwelt', 'Was beschreibt die ökologische Nische?', ['Die Gesamtheit der Beziehungen einer Art zu ihrer Umwelt', 'Den Wohnort einer Art', 'Ein kleines Versteck', 'Die Nahrungskette eines Ökosystems'], 'Die Nische ist ein Wirkungsgefüge (Ansprüche, Nahrung, Konkurrenz), kein Ort.'],
      ['Umwelt', 'Was sagt die 1. Lotka-Volterra-Regel?', ['Räuber- und Beutepopulation schwanken periodisch, die Räubermaxima folgen den Beutemaxima.', 'Die Räuberpopulation ist immer größer als die Beutepopulation.', 'Beide Populationen bleiben konstant.', 'Die Beute stirbt immer aus.'], 'Phasenverschobene Schwankung: erst mehr Beute, dann mehr Räuber.'],
      ['Informationsverarbeitung', 'Wie wirkt ein Hemmstoff der Acetylcholinesterase (z. B. das Insektizid E 605)?', ['Acetylcholin wird nicht abgebaut; die Dauererregung führt zu Krämpfen und Lähmung.', 'Acetylcholin wird nicht mehr ausgeschüttet.', 'Die Rezeptoren werden dauerhaft blockiert, ohne zu öffnen.', 'Das Ruhepotenzial wird positiver.'], 'Ohne Abbau bleibt der Transmitter im synaptischen Spalt und öffnet die Kanäle immer wieder.'],
    ]),
    gemeinschaftskunde: ex('gk', [
      ['Politisches System', 'Wer wählt den Bundeskanzler bzw. die Bundeskanzlerin?', ['Der Bundestag auf Vorschlag des Bundespräsidenten', 'Das Volk direkt', 'Die Bundesversammlung', 'Der Bundesrat'], 'Art. 63 GG: Der Bundestag wählt ohne Aussprache auf Vorschlag des Bundespräsidenten.'],
      ['Politisches System', 'Was ist das konstruktive Misstrauensvotum?', ['Der Bundestag kann den Kanzler nur abwählen, indem er zugleich einen Nachfolger wählt.', 'Der Bundespräsident entlässt den Kanzler.', 'Das Volk stimmt über die Regierung ab.', 'Der Bundesrat setzt die Regierung ab.'], 'Art. 67 GG – eine Lehre aus Weimar, um Regierungsstabilität zu sichern.'],
      ['Politisches System', 'Worüber entscheidet bei der Bundestagswahl vor allem die Zweitstimme?', ['Über die Sitzverteilung der Parteien im Bundestag', 'Über den Direktkandidaten im Wahlkreis', 'Über den Bundeskanzler', 'Über den Bundespräsidenten'], 'Die Zweitstimme (Landesliste) bestimmt die Stärke der Parteien.'],
      ['Politisches System', 'Welche Aufgabe hat der Bundesrat?', ['Er vertritt die Länder und wirkt an der Gesetzgebung des Bundes mit.', 'Er wählt den Bundeskanzler.', 'Er ist das höchste Gericht.', 'Er kontrolliert die EU-Kommission.'], 'Über den Bundesrat wirken die Länder bei Gesetzgebung und Verwaltung des Bundes mit (Art. 50 GG).'],
      ['Politisches System', 'Das Bundesverfassungsgericht kann Gesetze von sich aus überprüfen, ohne angerufen zu werden.', false, 'Falsch: Es wird nur auf Antrag tätig, z. B. durch Verfassungsbeschwerde oder Normenkontrollverfahren.'],
      ['Politisches System', 'Wer bildet die Exekutive?', ['Regierung und Verwaltung', 'Parlament', 'Gerichte', 'Parteien'], 'Exekutive = ausführende Gewalt. Legislative = Parlament, Judikative = Gerichte.'],
      ['Internationale Politik', 'Wer sind die ständigen Mitglieder des UN-Sicherheitsrats?', ['USA, Russland, China, Frankreich, Großbritannien', 'USA, Russland, China, Deutschland, Japan', 'USA, EU, China, Indien, Brasilien', 'Alle G7-Staaten'], 'Die fünf Siegermächte des Zweiten Weltkriegs, jeweils mit Vetorecht.'],
      ['Internationale Politik', 'Was bedeutet das Vetorecht im UN-Sicherheitsrat?', ['Jedes ständige Mitglied kann Beschlüsse in Sachfragen blockieren.', 'Jedes Mitglied der Generalversammlung kann Beschlüsse blockieren.', 'Der Generalsekretär kann Beschlüsse aufheben.', 'Beschlüsse brauchen Einstimmigkeit aller UN-Staaten.'], 'Deshalb ist der Sicherheitsrat bei Konflikten mit Beteiligung eines Veto-Staats oft handlungsunfähig.'],
      ['Internationale Politik', 'Welches EU-Organ wird direkt von den Bürgerinnen und Bürgern gewählt?', ['Das Europäische Parlament', 'Die Europäische Kommission', 'Der Rat der EU', 'Der Europäische Rat'], 'Das Europäische Parlament wird alle fünf Jahre direkt gewählt.'],
      ['Internationale Politik', 'Welcher Artikel des NATO-Vertrags regelt den Bündnisfall?', ['Artikel 5', 'Artikel 1', 'Artikel 20', 'Artikel 51'], 'Art. 5: Ein Angriff auf ein Mitglied gilt als Angriff auf alle.'],
      ['Gesellschaft', 'Was ist die Hauptursache des demografischen Wandels in Deutschland?', ['Niedrige Geburtenrate und steigende Lebenserwartung', 'Hohe Geburtenrate', 'Sinkende Lebenserwartung', 'Abwanderung aller jungen Menschen'], 'Die Bevölkerung altert: weniger Kinder, längeres Leben.'],
      ['Gesellschaft', 'In welchem Artikel des Grundgesetzes steht das Sozialstaatsprinzip?', ['Art. 20', 'Art. 1', 'Art. 5', 'Art. 79'], 'Art. 20 (1) GG: „Die Bundesrepublik Deutschland ist ein demokratischer und sozialer Bundesstaat.“'],
      ['Internationale Politik', 'Wer hat in der EU das Initiativrecht für Gesetze?', ['Die Europäische Kommission', 'Das Europäische Parlament', 'Der Europäische Gerichtshof', 'Die Europäische Zentralbank'], 'Die Kommission schlägt vor, Parlament und Rat entscheiden gemeinsam (ordentliches Gesetzgebungsverfahren).'],
    ]),
    geschichte: ex('geschichte', [
      ['Revolutionen & 19. Jh.', 'Welches Ereignis gilt als Beginn der Französischen Revolution?', ['Sturm auf die Bastille 1789', 'Hinrichtung Ludwigs XVI. 1793', 'Kaiserkrönung Napoleons 1804', 'Wiener Kongress 1815'], 'Am 14. Juli 1789 stürmten Pariser die Bastille.'],
      ['Revolutionen & 19. Jh.', 'Woran scheiterte die Paulskirchenverfassung 1849?', ['Der preußische König lehnte die Kaiserkrone ab.', 'Sie enthielt keine Grundrechte.', 'Österreich führte sie ein.', 'Napoleon verbot sie.'], 'Friedrich Wilhelm IV. lehnte eine Krone „aus der Gosse“ der Revolution ab.'],
      ['Revolutionen & 19. Jh.', 'Wann und wo wurde das Deutsche Kaiserreich gegründet?', ['18. Januar 1871 in Versailles', '9. November 1918 in Berlin', '1848 in Frankfurt', '1815 in Wien'], 'Proklamation Wilhelms I. im Spiegelsaal von Versailles.'],
      ['Revolutionen & 19. Jh.', 'Welches Ziel verfolgte Bismarck mit seiner Sozialgesetzgebung?', ['Die Arbeiter an den Staat binden und die Sozialdemokratie schwächen', 'Den Sozialismus einführen', 'Die Industrie verstaatlichen', 'Das Wahlrecht abschaffen'], '„Zuckerbrot und Peitsche“: Sozialversicherungen und Sozialistengesetz.'],
      ['Weimar & NS', 'Was regelte Artikel 48 der Weimarer Verfassung?', ['Das Notverordnungsrecht des Reichspräsidenten', 'Das Frauenwahlrecht', 'Das konstruktive Misstrauensvotum', 'Die Grundrechte'], 'Mit Art. 48 regierten die Präsidialkabinette ab 1930 am Reichstag vorbei.'],
      ['Weimar & NS', 'In welchem Jahr erreichte die Hyperinflation ihren Höhepunkt?', ['1923', '1918', '1929', '1933'], '1923, im Jahr der Ruhrbesetzung. Ende durch Währungsreform (Rentenmark).'],
      ['Weimar & NS', 'Hitler wurde 1933 Reichskanzler, weil die NSDAP bei freien Wahlen die absolute Mehrheit gewann.', false, 'Falsch: Hindenburg ernannte ihn am 30. Januar 1933. Die NSDAP erreichte in freien Reichstagswahlen nie die absolute Mehrheit.'],
      ['Weimar & NS', 'Was erlaubte das Ermächtigungsgesetz vom März 1933?', ['Die Regierung durfte Gesetze ohne den Reichstag erlassen.', 'Es verbot die NSDAP.', 'Es führte die Wehrpflicht ein.', 'Es stellte die Weimarer Verfassung wieder her.'], 'Damit war die Gewaltenteilung aufgehoben – ein Kernschritt der Machtergreifung.'],
      ['Weimar & NS', 'Worum ging es auf der Wannseekonferenz 1942?', ['Um die Organisation der Deportation und Ermordung der europäischen Juden', 'Um die Kriegserklärung an die USA', 'Um den Hitler-Stalin-Pakt', 'Um das Ende des Krieges'], 'Hohe NS-Beamte koordinierten die „Endlösung der Judenfrage“, den Holocaust.'],
      ['Nachkriegszeit & Kalter Krieg', 'Wie reagierten die Westmächte auf die Berlin-Blockade 1948/49?', ['Mit der Luftbrücke', 'Mit einem Krieg', 'Mit dem Mauerbau', 'Mit dem Rückzug aus Berlin'], 'Rund ein Jahr lang wurde West-Berlin aus der Luft versorgt.'],
      ['Nachkriegszeit & Kalter Krieg', 'Wann trat das Grundgesetz in Kraft?', ['23. Mai 1949', '7. Oktober 1949', '3. Oktober 1990', '8. Mai 1945'], 'Gründung der Bundesrepublik. Die DDR folgte am 7. Oktober 1949.'],
      ['Nachkriegszeit & Kalter Krieg', 'Wann wurde die Berliner Mauer gebaut?', ['13. August 1961', '17. Juni 1953', '9. November 1989', '1949'], 'Die DDR riegelte West-Berlin ab, um die Massenflucht zu stoppen.'],
      ['Nachkriegszeit & Kalter Krieg', 'Wofür stand Willy Brandts Neue Ostpolitik?', ['„Wandel durch Annäherung“ und die Ostverträge', 'Die Hallstein-Doktrin', 'Den NATO-Doppelbeschluss', 'Die Westintegration'], 'Ostverträge mit der UdSSR und Polen, Grundlagenvertrag mit der DDR (1970–72).'],
    ]),
    geographie: ex('geographie', [
      ['Geofaktoren', 'In welche Richtung lenkt die Corioliskraft Winde auf der Nordhalbkugel ab?', ['Nach rechts', 'Nach links', 'Gar nicht', 'Nach oben'], 'Nordhalbkugel: Rechtsablenkung, Südhalbkugel: Linksablenkung.'],
      ['Geofaktoren', 'Wohin wehen die Passatwinde?', ['Von den subtropischen Hochdruckgebieten zur äquatorialen Tiefdruckrinne (ITC)', 'Vom Äquator zu den Polen', 'Von den Polen zum Äquator in großer Höhe', 'Vom Meer aufs Land, nur nachts'], 'Bodennahe Passate strömen zur ITC und werden durch die Corioliskraft zu Nordost- bzw. Südostpassaten.'],
      ['Geofaktoren', 'Was passiert an einer Subduktionszone?', ['Eine ozeanische Platte taucht unter eine andere Platte ab.', 'Zwei Platten bewegen sich auseinander.', 'Zwei Platten gleiten aneinander vorbei.', 'Neue ozeanische Kruste entsteht.'], 'Folgen: Tiefseegraben, Vulkanismus und Erdbeben (z. B. Anden, Japan).'],
      ['Geofaktoren', 'Die Böden des tropischen Regenwalds sind meist sehr nährstoffreich.', false, 'Falsch: Die Nährstoffe stecken in der Biomasse; die alten, stark verwitterten Böden sind nährstoffarm (kurzgeschlossener Kreislauf).'],
      ['Geofaktoren', 'Was entsteht an einer divergierenden Plattengrenze im Ozean?', ['Ein mittelozeanischer Rücken', 'Ein Tiefseegraben', 'Ein Faltengebirge', 'Eine Transformstörung'], 'Magma steigt auf, neue Kruste entsteht (z. B. Mittelatlantischer Rücken).'],
      ['Bevölkerung & Stadt', 'Was kennzeichnet die frühtransformative Phase des demografischen Übergangs?', ['Die Sterberate sinkt stark, die Geburtenrate bleibt hoch.', 'Beide Raten sind niedrig.', 'Die Geburtenrate sinkt, die Sterberate steigt.', 'Beide Raten sind hoch und gleich.'], 'Die Schere öffnet sich – die Bevölkerung wächst stark.'],
      ['Bevölkerung & Stadt', 'Was zeigt eine Bevölkerungspyramide in Urnenform?', ['Eine schrumpfende, alternde Bevölkerung', 'Eine schnell wachsende Bevölkerung', 'Eine stabile junge Bevölkerung', 'Hohe Kindersterblichkeit'], 'Schmale Basis = wenige Geburten, z. B. Deutschland oder Japan.'],
      ['Bevölkerung & Stadt', 'Was versteht man unter Suburbanisierung?', ['Abwanderung von Bevölkerung und Betrieben aus der Kernstadt ins Umland', 'Zuwanderung in die Innenstadt', 'Verfall von Dörfern', 'Bau von Hochhäusern im Zentrum'], 'Typisch: Einfamilienhäuser und Gewerbegebiete am Stadtrand, mehr Pendlerverkehr.'],
      ['Bevölkerung & Stadt', 'Was bedeutet Gentrifizierung?', ['Aufwertung eines Viertels mit Verdrängung einkommensschwacher Bewohner', 'Verfall eines Stadtteils', 'Bau neuer Sozialwohnungen', 'Zusammenschluss zweier Städte'], 'Sanierung und Zuzug Wohlhabender lassen Mieten steigen.'],
      ['Wirtschaft & Globalisierung', 'Was ist Outsourcing?', ['Die Auslagerung von Unternehmensaufgaben an andere Firmen', 'Die Gründung einer Firma', 'Der Export von Rohstoffen', 'Ein Zoll auf Importe'], 'Oft ins Ausland (Offshoring), um Kosten zu sparen.'],
      ['Wirtschaft & Globalisierung', 'Welcher Wirtschaftssektor umfasst Dienstleistungen?', ['Der tertiäre Sektor', 'Der primäre Sektor', 'Der sekundäre Sektor', 'Der Agrarsektor'], 'Primär: Land- und Forstwirtschaft, Bergbau. Sekundär: Industrie. Tertiär: Dienstleistungen.'],
      ['Wirtschaft & Globalisierung', 'Welcher Strukturwandel prägt das Ruhrgebiet?', ['Von Kohle und Stahl zu Dienstleistungen und neuen Industrien', 'Von Dienstleistungen zur Landwirtschaft', 'Vom Tourismus zum Bergbau', 'Von der Industrie zur reinen Landwirtschaft'], 'Deindustrialisierung (Zechenschließungen) und Tertiärisierung.'],
      ['Wirtschaft & Globalisierung', 'Welche drei Bereiche fasst der Human Development Index (HDI) zusammen?', ['Lebenserwartung, Bildung und Einkommen', 'BIP, Export und Inflation', 'Bevölkerungsdichte, Fläche und Klima', 'Arbeitslosigkeit, Zinsen und Staatsschulden'], 'Der HDI der UN misst Gesundheit, Bildung und Lebensstandard (Bruttonationaleinkommen pro Kopf).'],
    ]),
    wirtschaft: ex('wirtschaft', [
      ['Markt', 'Der Staat setzt einen Höchstpreis unter dem Gleichgewichtspreis fest. Was folgt?', ['Ein Nachfrageüberhang (Knappheit)', 'Ein Angebotsüberhang', 'Der Markt bleibt im Gleichgewicht', 'Die Nachfrage sinkt auf null'], 'Zum niedrigen Preis wollen mehr Leute kaufen, als angeboten wird.'],
      ['Markt', 'Was folgt aus einem Mindestpreis über dem Gleichgewichtspreis?', ['Ein Angebotsüberhang', 'Ein Nachfrageüberhang', 'Steigende Nachfrage', 'Kein Effekt'], 'Beispiel: früher die „Butterberge“ bei EU-Agrarpreisen.'],
      ['Markt', 'Die Einkommen steigen. Was passiert mit der Nachfrage nach einem normalen Gut?', ['Die Nachfragekurve verschiebt sich nach rechts.', 'Bewegung entlang der Nachfragekurve nach oben', 'Die Angebotskurve verschiebt sich nach links.', 'Die Nachfragekurve verschiebt sich nach links.'], 'Bei jedem Preis wird mehr nachgefragt – Verschiebung, keine Bewegung entlang der Kurve.'],
      ['Markt', 'Bei einer Preiselastizität der Nachfrage mit \\(|\\varepsilon| > 1\\) ist die Nachfrage …', ['elastisch', 'unelastisch', 'vollkommen unelastisch', 'einkommensabhängig'], 'Die Menge reagiert prozentual stärker als der Preis.'],
      ['Wirtschaftspolitik', 'Was ist das vorrangige Ziel der Europäischen Zentralbank?', ['Preisniveaustabilität', 'Vollbeschäftigung', 'Hohes Wirtschaftswachstum', 'Ausgeglichene Staatshaushalte'], 'Die EZB strebt mittelfristig eine Inflationsrate von 2 % an.'],
      ['Wirtschaftspolitik', 'Was soll eine Leitzinserhöhung bewirken?', ['Die Inflation dämpfen, weil Kredite teurer werden', 'Die Inflation anheizen', 'Die Arbeitslosigkeit sofort senken', 'Die Staatsschulden erhöhen'], 'Teurere Kredite → weniger Nachfrage → sinkender Preisdruck.'],
      ['Wirtschaftspolitik', 'Welche Ziele bilden das magische Viereck?', ['Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, angemessenes Wachstum', 'Gewinn, Umsatz, Rendite, Liquidität', 'Umweltschutz, Bildung, Gesundheit, Sicherheit', 'Niedrige Steuern, hohe Löhne, hohe Zinsen, niedrige Preise'], 'Stabilitätsgesetz 1967. „Magisch“, weil nicht alle Ziele gleichzeitig erreichbar sind.'],
      ['Wirtschaftspolitik', 'Was empfiehlt antizyklische Fiskalpolitik (Keynes) in einer Rezession?', ['Staatsausgaben erhöhen bzw. Steuern senken', 'Staatsausgaben kürzen', 'Steuern erhöhen', 'Leitzins erhöhen'], 'Der Staat stützt die fehlende private Nachfrage, notfalls über Kredite (Deficit Spending).'],
      ['Kennzahlen', 'Was misst das Bruttoinlandsprodukt (BIP)?', ['Den Wert aller in einem Jahr im Inland produzierten Waren und Dienstleistungen (Endprodukte)', 'Das Vermögen aller Bürger', 'Die Staatsschulden', 'Die Summe aller Exporte'], 'Nur Endprodukte zählen, damit nichts doppelt gerechnet wird.'],
      ['Kennzahlen', 'Was unterscheidet das reale vom nominalen BIP?', ['Das reale BIP ist preisbereinigt.', 'Das reale BIP enthält auch Schwarzarbeit.', 'Das reale BIP gilt nur für Industrie.', 'Es gibt keinen Unterschied.'], 'Real = nominal ohne Inflation – zeigt das echte Mengenwachstum.'],
      ['Kennzahlen', 'Eine Inflationsrate von 3 % bedeutet, dass alle Preise um genau 3 % steigen.', false, 'Falsch: Sie ist ein Durchschnitt über einen Warenkorb; einzelne Preise steigen stärker, schwächer oder sinken.'],
      ['Kennzahlen', 'Was bedeutet ein Gini-Koeffizient von 0?', ['Vollkommen gleiche Verteilung', 'Vollkommen ungleiche Verteilung', 'Keine Inflation', 'Kein Wachstum'], '0 = alle haben gleich viel, 1 = eine Person hat alles.'],
    ]),
    ethik: ex('ethik', [
      ['Grundpositionen', 'Wie lautet Kants kategorischer Imperativ (Grundformel)?', ['Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.', 'Handle so, dass das größte Glück der größten Zahl entsteht.', 'Was du nicht willst, dass man dir tu, das füg auch keinem andern zu.', 'Handle so, dass die Wirkungen deiner Handlung verträglich sind mit der Permanenz echten menschlichen Lebens.'], 'Kant prüft die Maxime auf Verallgemeinerbarkeit. Das zweite ist Utilitarismus, das letzte Hans Jonas.'],
      ['Grundpositionen', 'Wonach bewertet der Utilitarismus Handlungen?', ['Nach ihren Folgen für das Wohl aller Betroffenen', 'Nach der Absicht des Handelnden', 'Nach göttlichen Geboten', 'Nach der Tradition'], 'Konsequentialismus: Gut ist, was den Gesamtnutzen maximiert.'],
      ['Grundpositionen', 'Wer begründete den klassischen Utilitarismus?', ['Jeremy Bentham', 'Immanuel Kant', 'Aristoteles', 'John Rawls'], 'Bentham (hedonistisches Kalkül), weiterentwickelt von John Stuart Mill.'],
      ['Grundpositionen', 'Was ist Tugend nach Aristoteles?', ['Die Mitte zwischen zwei Extremen (Mesotes)', 'Unbedingter Gehorsam', 'Die Maximierung von Lust', 'Die Befolgung des kategorischen Imperativs'], 'Mut ist z. B. die Mitte zwischen Feigheit und Tollkühnheit.'],
      ['Grundpositionen', 'Eine deontologische Ethik beurteilt Handlungen vor allem nach ihren Folgen.', false, 'Falsch: Deontologisch (Pflichtethik, z. B. Kant) heißt, die Handlung selbst bzw. die Pflicht zählt, nicht die Folgen.'],
      ['Gerechtigkeit', 'Was ist bei Rawls der „Schleier des Nichtwissens“?', ['Man wählt Gerechtigkeitsgrundsätze, ohne die eigene spätere Position in der Gesellschaft zu kennen.', 'Eine Regel, nach der Politiker nichts wissen dürfen.', 'Die Unwissenheit über Gottes Willen.', 'Ein Verbot, sich zu informieren.'], 'Unparteilichkeit im Urzustand: Niemand kann Regeln zum eigenen Vorteil wählen.'],
      ['Gerechtigkeit', 'Was besagt Rawls’ Differenzprinzip?', ['Ungleichheiten sind nur erlaubt, wenn sie den am schlechtesten Gestellten nützen.', 'Alle müssen genau gleich viel besitzen.', 'Leistung muss immer belohnt werden.', 'Der Markt verteilt automatisch gerecht.'], 'Das zweite Gerechtigkeitsprinzip bei Rawls (Maximin-Regel).'],
      ['Gerechtigkeit', 'Wie beschreibt Hobbes den Naturzustand?', ['Als Krieg aller gegen alle', 'Als friedliches Paradies', 'Als Herrschaft der Vernunft', 'Als Gemeinschaft freier Gleicher ohne Konflikte'], 'Aus Angst schließen die Menschen einen Gesellschaftsvertrag und unterwerfen sich dem Leviathan.'],
      ['Angewandte Ethik', 'Was versteht man unter passiver Sterbehilfe?', ['Verzicht auf oder Abbruch von lebensverlängernden Maßnahmen', 'Gezielte Tötung auf Verlangen', 'Beschaffung eines tödlichen Mittels', 'Schmerztherapie mit Lebensverlängerung'], 'In Deutschland bei Vorliegen des Patientenwillens erlaubt; Tötung auf Verlangen ist strafbar (§ 216 StGB).'],
      ['Angewandte Ethik', 'Peter Singers Präferenzutilitarismus bewertet Handlungen nach der Erfüllung der Interessen aller Betroffenen.', true, 'Richtig: Er bezieht auch leidensfähige Tiere ein (Prinzip der gleichen Interessenabwägung).'],
      ['Angewandte Ethik', 'Wofür steht Hans Jonas’ „Prinzip Verantwortung“?', ['Verantwortung für die Zukunft der Menschheit und der Natur', 'Verantwortung nur gegenüber der eigenen Familie', 'Gewinnmaximierung', 'Verzicht auf jede Technik'], 'Zukunftsethik angesichts der Macht moderner Technik.'],
    ]),
    religion: ex('religion', [
      ['Gott & Religionskritik', 'Was sagt Ludwig Feuerbachs Religionskritik?', ['Gott ist eine Projektion menschlicher Wünsche und Eigenschaften.', 'Religion ist das Opium des Volkes.', 'Gott ist tot.', 'Religion ist eine kollektive Zwangsneurose.'], 'Feuerbach: Projektionsthese. Opium = Marx, „Gott ist tot“ = Nietzsche, Zwangsneurose = Freud.'],
      ['Gott & Religionskritik', 'Was meint Marx mit „Religion ist das Opium des Volkes“?', ['Religion vertröstet auf ein Jenseits und stabilisiert ungerechte Verhältnisse.', 'Religion ist eine Droge, die verboten werden muss.', 'Religion macht reich.', 'Religion fördert die Revolution.'], 'Für Marx ist Religion Ausdruck und Folge sozialen Elends.'],
      ['Gott & Religionskritik', 'Was ist die Theodizee-Frage?', ['Wie ist ein allmächtiger und gütiger Gott mit dem Leid in der Welt vereinbar?', 'Gibt es mehrere Götter?', 'Wie alt ist die Welt?', 'Wer schrieb die Bibel?'], 'Theodizee = Rechtfertigung Gottes angesichts des Bösen (Leibniz).'],
      ['Gott & Religionskritik', 'Wer formulierte „Gott ist tot“?', ['Friedrich Nietzsche', 'Sigmund Freud', 'Karl Marx', 'Ludwig Feuerbach'], 'In „Die fröhliche Wissenschaft“ (1882).'],
      ['Jesus Christus', 'Wie verkündet Jesus in den Gleichnissen das Reich Gottes?', ['Es ist schon angebrochen und noch nicht vollendet.', 'Es ist ein politisches Königreich.', 'Es beginnt erst nach dem Weltende.', 'Es ist nur für Priester bestimmt.'], 'Spannung von „schon jetzt“ und „noch nicht“, z. B. im Senfkorngleichnis.'],
      ['Jesus Christus', 'Wo steht die Bergpredigt?', ['Matthäus 5–7', 'Markus 1', 'Johannes 3', 'Genesis 1'], 'Mt 5–7 mit Seligpreisungen, Feindesliebe und Vaterunser. Bei Lukas: Feldrede (Lk 6).'],
      ['Jesus Christus', 'Welche Evangelien nennt man synoptisch?', ['Matthäus, Markus und Lukas', 'Markus, Lukas und Johannes', 'Alle vier Evangelien', 'Nur Johannes'], 'Sie sind sich so ähnlich, dass man sie nebeneinander lesen kann (Synopse).'],
      ['Jesus Christus', 'Das Markusevangelium gilt als das älteste der vier Evangelien.', true, 'Richtig: um 70 n. Chr. Matthäus und Lukas nutzen Markus als Quelle (Zwei-Quellen-Theorie).'],
      ['Mensch & Ethik', 'Was folgt aus der Gottebenbildlichkeit des Menschen (Gen 1,27)?', ['Jeder Mensch hat eine unverlierbare Würde, unabhängig von seiner Leistung.', 'Der Mensch ist Gott.', 'Nur gläubige Menschen haben Würde.', 'Der Mensch darf über die Natur nach Belieben verfügen.'], 'Biblische Grundlage der Menschenwürde.'],
      ['Mensch & Ethik', 'Was ist das Doppelgebot der Liebe?', ['Gottesliebe und Nächstenliebe', 'Feindesliebe und Selbstliebe', 'Elternliebe und Kinderliebe', 'Die Zehn Gebote'], 'Mk 12,29–31: Gott lieben und den Nächsten wie dich selbst.'],
      ['Mensch & Ethik', 'Nach Luthers Rechtfertigungslehre wird der Mensch allein durch gute Werke vor Gott gerecht.', false, 'Falsch: allein aus Gnade, durch den Glauben (sola gratia, sola fide). Gute Werke sind Folge, nicht Voraussetzung.'],
      ['Jesus Christus', 'Was ist die Logienquelle Q?', ['Eine erschlossene Sammlung von Jesusworten, die Matthäus und Lukas neben Markus nutzten', 'Das älteste erhaltene Evangelium', 'Ein Brief des Paulus', 'Eine Schriftrolle aus Qumran'], 'Zwei-Quellen-Theorie: Mt und Lk benutzen Markus und Q sowie jeweils Sondergut.'],
      ["Weltbilder im Wandel", "Wie stellten sich die alten Ägypter den Aufbau der Welt vor?", ["Himmelsgöttin Nut oben, Erdgott Geb unten – ursprünglich vereint, dann vom Luftgott Schu getrennt", "Die Erde kreist als Planet um die Sonne.", "Die Welt entstand aus dem geteilten Körper der Tiamat.", "Sieben Kristallkugeln umgeben die Erde."], "Ägypten: Nut (Himmel, ihr Leib ist mit Sternen übersät), Geb (Erde), Schu (Luft) trennt beide. Tiamat gehört zum babylonischen Mythos, die Kristallkugeln zu Ptolemäus."],
      ["Weltbilder im Wandel", "Was geschieht nach ägyptischer Vorstellung jeden Tag mit der Sonne?", ["Sie wird morgens aus Nuts Schoß neu geboren und kehrt abends, alt geworden, in ihren Mund ein.", "Sie kreist auf einer Kristallsphäre um die ruhende Erde.", "Marduk setzt sie als Gott über den Tag ein.", "Sie steht still im Mittelpunkt, die Erde dreht sich um sie."], "Der tägliche Sonnenlauf wird als Geburt aus der Himmelsgöttin Nut und Rückkehr in ihren Mund gedeutet."],
      ["Weltbilder im Wandel", "Welches Zeitverständnis steht im Zentrum des altorientalischen (babylonischen) Weltbildes?", ["Ein zyklisches: Alles bewegt sich im Kreislauf von Sterben und Auferstehen, Neuschaffen und Vernichtetwerden.", "Ein lineares mit Anfang und Weltgericht", "Ein Weltbild ganz ohne Zeit", "Ein evolutives: Die Welt ist ein offener Prozess."], "Im Zentrum steht keine räumliche, sondern eine zeitliche Vorstellung: Alles lebt und bewegt sich zyklisch."],
      ["Weltbilder im Wandel", "Welche Aufgabe hat der Mensch im babylonischen Weltbild?", ["Durch Gebet und Opfer den Gang der Welt am Leben erhalten", "Als Ebenbild Gottes die Erde bebauen und bewahren", "Die Natur als „Herr und Eigentümer“ beherrschen", "Die Welt mit Naturgesetzen vorausberechnen"], "Der Mensch ist in die vorgegebene Ordnung eingegliedert und erhält sie durch Gebet und Opfer."],
      ["Weltbilder im Wandel", "Im babylonischen Weltbild gilt die Steppe als göttlich und das Gebirge als dämonisch.", false, "Falsch, umgekehrt: Die Steppe gilt als dämonisch, das Gebirge als göttlich, weil auf ihm der Himmel ruht. Zentrum ist Babylon mit dem Heiligen Hügel (Tempel und Königspalast)."],
      ["Weltbilder im Wandel", "Wie sieht das Weltbild des Ptolemäus (ca. 70–147 n. Chr.) aus?", ["Geozentrisch: Die Erde ist Mittelpunkt eines harmonischen, endlichen Systems aus sieben Kristallkugeln und der Fixsternsphäre.", "Heliozentrisch mit Ellipsenbahnen", "Ein unendlicher Raum mit unzähligen Sonnen", "Ein Uhrwerk, das keinen Beweger braucht"], "Die sieben konzentrischen Kristallkugeln tragen die Planeten, die äußere Sphäre die Fixsterne."],
      ["Weltbilder im Wandel", "Welche Rolle hat Gott im Weltbild des Ptolemäus?", ["Er ist der letzte, unbewegte Beweger, der das ganze Weltsystem in Bewegung hält.", "Er schafft die Welt am Anfang und beendet sie am Tag des Gerichts.", "Er ist eine überflüssige Hypothese.", "Er ist die überlegene Vernunft, die sich in der Welt offenbart."], "Das zweite ist das mittelalterliche Gottesbild, das dritte Laplace, das vierte Einstein."],
      ["Weltbilder im Wandel", "Nach griechischer Vorstellung (Ptolemäus) ist die Welt entstanden und wird einmal vergehen.", false, "Falsch: Die Welt ist nicht entstanden, sondern unwandelbar und von unendlicher Dauer. Die Zeit ist zyklisch, ohne Anfang und Ende – es gibt nie etwas Neues."],
      ["Weltbilder im Wandel", "Was kennzeichnet das Weltbild des Mittelalters?", ["Erde und Mensch im Mittelpunkt einer dreigeteilten, endlichen Welt; jenseits des Feuerhimmels thront der personhaft gedachte Gott.", "Die Sonne im Mittelpunkt, Gott als bloße Hypothese", "Eine unendliche Welt, in der Gott keinen Ort mehr hat", "Eine zyklische Welt ohne Anfang und Ende"], "Gott schafft die Welt am Anfang und bereitet am Tag des Gerichts ihr Ende; alles hat seinen gottgewollten Platz."],
      ["Weltbilder im Wandel", "Wodurch wird im Mittelalter die gottgewollte Ordnung der Welt erkannt?", ["Durch das Studium der Bibel und der Schriften der Naturkundigen des Altertums", "Durch Experimente und Messungen", "Durch Psychoanalyse", "Durch Beobachtungen mit dem Fernrohr"], "Der Mensch hat sich der ewigen, universalen Ordnung einzufügen."],
      ["Weltbilder im Wandel", "Was bedeutet das heliozentrische Weltbild des Kopernikus (1543) für den Menschen?", ["Erde und Mensch verlieren ihre zentrale Stellung im Weltall.", "Der Mensch wird als triebgesteuertes Wesen entdeckt.", "Der Mensch stammt vom Tierreich ab.", "Raum und Zeit werden relativ."], "Kopernikus: Die Sonne steht im Mittelpunkt, die Erde ist ein Planet wie die anderen."],
      ["Weltbilder im Wandel", "Wofür steht Galileo Galilei (1590/91) in der Zeitleiste?", ["Experimente zu den Fallgesetzen – die moderne naturwissenschaftliche Forschung entsteht", "Die Ellipsenbahnen der Planeten", "Die Doppel-Helix-Struktur der DNA", "Die Unendlichkeit des Raumes"], "Galilei (1564–1642) steht für den Beginn der modernen, experimentellen Naturwissenschaft."],
      ["Weltbilder im Wandel", "Was leistete Johannes Kepler (1609/19)?", ["Mit seinen Gesetzen wurde das kopernikanische Weltbild mathematisch berechenbar; die Planeten kreisen auf Ellipsen.", "Er zerbrach die Kristallschale des Fixsternhimmels.", "Er trennte Geist und Materie radikal.", "Er kam ohne die Hypothese Gott aus."], "Keplersche Gesetze: Kepler (1571–1630) beschrieb die Welt als kunstvolle, berechenbare Harmonie."],
      ["Weltbilder im Wandel", "Kepler wollte in der Schöpfung den Schöpfungsgedanken Gottes wiederentdecken.", true, "Richtig: Für Kepler ist die berechenbare Harmonie der Welt Ausdruck von Gottes Schöpfungsgedanken."],
      ["Weltbilder im Wandel", "Wer zerbrach die Kristallschale des Fixsternhimmels und lehrte die Unendlichkeit des Raumes mit vielen Sonnen?", ["Giordano Bruno", "Nikolaus Kopernikus", "René Descartes", "Pierre Simon Laplace"], "Bruno (1548–1600): Das endliche, dreistöckige Welthaus zerbrach – Gott verlor seine Wohnstatt."],
      ["Weltbilder im Wandel", "Wie sah Isaac Newton (1687) das Verhältnis von Gott und Welt?", ["Das „himmlische Uhrwerk“ braucht keinen ständigen Beweger, verweist durch Bewegung und Zweckmäßigkeit aber auf einen intelligenten Schöpfergott.", "Gott ist eine überflüssige Hypothese.", "Gott ist der unbewegte Beweger an der Fixsternsphäre.", "Gott ist die überlegene Vernunft in der Welt (Pantheismus)."], "Newton verstand Gott noch als Hypothese zur Erklärung der Weltwirklichkeit; erst Laplace kam ohne sie aus."],
      ["Weltbilder im Wandel", "Was kennzeichnet das einheitliche physikalische Weltbild nach Newton?", ["Gesetzlichkeit, Objektivität und Determinismus: Bewegungen werden auf Grundkräfte (v. a. Gravitation) zurückgeführt.", "Komplementarität und Unschärfe", "Zyklische Zeit ohne Anfang und Ende", "Jedes Gehirn konstruiert seine eigene Wirklichkeit."], "1687 gilt als Höhepunkt der klassischen Physik: Alles wird berechenbar und vorhersagbar."],
      ["Weltbilder im Wandel", "Wofür steht René Descartes (1596–1650)?", ["Subjekt-Objekt-Dualismus: Trennung von Geist und Materie; der Mensch als „Herr und Eigentümer der Natur“", "Die These, der Mensch sei eine Maschine", "Die Deszendenztheorie", "Die Unschärferelation"], "„maîtres et possesseurs de la nature“. Die Maschinen-These stammt von Lamettrie."],
      ["Weltbilder im Wandel", "Wie unterscheidet sich Laplace (1749–1827) von Newton?", ["Newton brauchte Gott noch als Hypothese zur Erklärung der Welt, Laplace kam ohne diese Hypothese aus.", "Laplace setzte die Erde wieder in den Mittelpunkt.", "Laplace entdeckte die Ellipsenbahnen.", "Laplace begründete die Psychoanalyse."], "Im 18./19. Jahrhundert wird Gott zur Erklärung der Welt nicht mehr gebraucht."],
      ["Weltbilder im Wandel", "Was gilt im Weltbild des 18. und 19. Jahrhunderts?", ["Die Welt ist ein durchschaubares Uhrwerk: Aus dem Augenblickszustand lässt sich die Zukunft mit Bestimmtheit vorausberechnen.", "Naturerkenntnis ist immer standortgebunden.", "Elektronen sind zugleich Teilchen und Welle.", "Es gibt kein allgemein gültiges Weltbild mehr."], "Die Welt besteht aus Atomen, die ewigen Naturgesetzen gehorchen. „Was man nicht weiß, weiß man noch nicht.“"],
      ["Weltbilder im Wandel", "Wer behauptete, der Mensch sei eine Maschine?", ["Julien Offray de Lamettrie", "René Descartes", "Karl Barth", "Konrad Lorenz"], "Lamettrie (1709–1751) übertrug das mechanistische Weltbild auf den Menschen."],
      ["Weltbilder im Wandel", "Was erklärt Darwins Deszendenztheorie (1859/71)?", ["Entstehung und Entwicklung der Lebewesen durch einfache Naturgesetze – auch der Mensch ist Glied der Abstammungskette.", "Die Bewegung der Planeten durch Gravitation", "Den Menschen als triebbeherrschtes Wesen", "Die Struktur der DNA"], "Der Mensch verliert damit seine absolute Sonderstellung."],
      ["Weltbilder im Wandel", "Welche Kränkung der Menschheit verbindet Freud mit Kopernikus?", ["Die kosmologische: Die Erde ist nicht der Mittelpunkt des Weltalls.", "Die biologische", "Die psychologische", "Die ökologische"], "Die Erde ist nur ein winziges Teilchen in einem kaum vorstellbaren Weltsystem."],
      ["Weltbilder im Wandel", "Worin besteht nach Freud die biologische Kränkung?", ["Die Forschung (Darwin, Wallace) nimmt dem Menschen sein Schöpfungsvorrecht und verweist auf die Abstammung vom Tierreich.", "Das Ich ist nicht Herr im eigenen Haus.", "Die Erde ist ein winziges Teilchen im Weltall.", "Raum und Zeit sind relativ."], "Die drei Kränkungen: kosmologisch (Kopernikus), biologisch (Darwin), psychologisch (Psychoanalyse)."],
      ["Weltbilder im Wandel", "Was meint die psychologische Kränkung?", ["Das Ich ist nicht Herr im eigenen Haus, sondern auf kärgliche Nachrichten aus dem Unbewussten angewiesen.", "Der Mensch stammt vom Tierreich ab.", "Der Mensch ist eine Maschine.", "Die Sonne steht im Mittelpunkt."], "Freud (1856–1939), Begründer der Psychoanalyse, Hauptwerk „Die Traumdeutung“ (um 1900)."],
      ["Weltbilder im Wandel", "Welches Weltbild ersetzte nach Karl Barth im 18. Jahrhundert das geozentrische?", ["Das anthropozentrische: Der Mensch stellt sich selbstbewusst in den Mittelpunkt, weil er die Wahrheit mit eigenen Mitteln erkennt.", "Das heliozentrische, das der Mensch als Demütigung erlebt", "Das zyklische", "Das ägyptische"], "Die Einsicht des Kopernikus führte nicht zur Demut, sondern zu einem neuen Selbstbewusstsein (Rationalismus, Empirismus, Skeptizismus)."],
      ["Weltbilder im Wandel", "Karl Barth wurde 1934 aus dem Dienst entlassen, weil er den Eid auf den Führer verweigerte.", true, "Richtig: Danach lehrte Barth (1886–1968) als Professor in Basel."],
      ["Weltbilder heute", "Heute gibt es ein allgemein gültiges wissenschaftliches Weltbild.", false, "Falsch: Manche Naturwissenschaftler begnügen sich mit Teilerklärungen, andere suchen weiter nach einem einheitlichen Weltbild."],
      ["Weltbilder heute", "Was ist ein Paradigma im Sinne des Materials?", ["Eine „Super-Theorie“, die einzelne Theorien zu einem Teil-Weltbild verbindet (z. B. Relativitäts- oder Quantentheorie)", "Ein Gleichnis aus der Bibel", "Eine einzelne Messung", "Ein Mythos über die Entstehung der Welt"], "Ob sich ein Paradigma durchsetzt, zeigt sich oft erst im Nachhinein."],
      ["Weltbilder heute", "Was besagt das kosmologische Weltbild der Gegenwart?", ["Die Erde gehört zu einem von etwa hundert Milliarden Sonnensystemen der Milchstraße, daneben gibt es Milliarden Galaxien – der Mensch erscheint als Randerscheinung.", "Die Erde ist Mittelpunkt des Universums.", "Das Universum ist eine endliche Kristallkugel.", "Die Milchstraße ist das ganze Universum."], "Weltbild im engeren Sinne = das kosmologische."],
      ["Weltbilder heute", "Was ergänzt der Neo-Darwinismus gegenüber Darwin?", ["Die Mutation (zufällige Veränderung der Gene) als Ergänzung zur Selektion", "Die Schöpfung in sechs Tagen", "Den Kampf ums Dasein", "Die Ellipsenbahnen"], "Darwin: Variation, Überschuss an Nachkommen, Selektion („survival of the fittest“). Neo-Darwinismus: + Mutation."],
      ["Weltbilder heute", "Welche drei Phasen der Evolution unterscheidet das evolutive Weltbild?", ["Kosmische, chemische und biologische Evolution", "Antike, Mittelalter und Neuzeit", "Kosmologische, biologische und psychologische Kränkung", "Konflikt, Dialog und Integration"], "Das evolutive Weltbild reicht von der Entstehung des Kosmos bis zur Entwicklung des menschlichen Geistes."],
      ["Weltbilder heute", "Welche Gegenposition zur Urknall-Theorie nennt das Material?", ["Die Steady-state-Hypothese", "Die Deszendenztheorie", "Den Konstruktivismus", "Das Dialogmodell"], "Die Urknall-Theorie folgt aus der Ausdehnung des Weltalls, ist aber nicht unumstritten."],
      ["Weltbilder heute", "Was besagt die evolutionäre Erkenntnistheorie (im Anschluss an Konrad Lorenz)?", ["Auch der menschliche Geist bildete sich durch Mutation und Selektion als Anpassung an die Umwelt.", "Erkenntnis kommt nur aus der Bibel.", "Der Mensch ist eine Maschine.", "Wahrheit ist nur durch Offenbarung erreichbar."], "Fazit: Die Welt ist ein offener Prozess, der Mensch Teil der Natur."],
      ["Weltbilder heute", "Wofür steht der Club of Rome (1972)?", ["„Die Grenzen des Wachstums“: Die ökologische Krise tritt ins Bewusstsein; die Natur ist ein sensibles System, zu dem auch der Mensch gehört.", "Die Entdeckung der DNA-Doppelhelix", "Die Kopenhagener Deutung der Quantentheorie", "Ein Konzil über die Schöpfung"], "Weitere Stationen: 1953 Crick und Watson (DNA), 1927 Bohr und Heisenberg (Kopenhagener Deutung)."],
      ["Weltbilder heute", "Was entdeckten Crick und Watson 1953?", ["Die Doppel-Helix-Struktur der DNA", "Die Relativität von Raum und Zeit", "Die Unschärferelation", "Die Fallgesetze"], "Grundlage der Genforschung."],
      ["Weltbilder heute", "Was ist Einsteins Gottesbegriff?", ["Die Überzeugung von einer überlegenen Vernunft, die sich in der erfahrbaren Welt offenbart – „pantheistisch“ (Spinoza)", "Ein persönlicher Gott, der in die Welt eingreift", "Gott als überflüssige Hypothese", "Gott als unbewegter Beweger"], "Einstein, „Mein Weltbild“."],
      ["Weltbilder heute", "Was folgt aus Einsteins Relativitätstheorie (1905/15) für das Weltbild?", ["Raum und Zeit sind relative, vom Beobachter abhängige Größen – Naturerkenntnis ist standortgebunden.", "Die Welt ist vollständig berechenbar.", "Die Erde steht im Mittelpunkt.", "Der Mensch ist eine Maschine."], "Spezielle (1905) und allgemeine (1915) Relativitätstheorie."],
      ["Weltbilder heute", "Was kann wissenschaftliche Forschung nach Einstein bewirken?", ["Durch Förderung des kausalen Denkens den Aberglauben vermindern", "Gott beweisen", "Alle Fragen endgültig beantworten", "Religion vollständig ersetzen"], "Was „wissenschaftliche Wahrheit“ heißt, hängt davon ab, ob es um ein Erlebnis, einen mathematischen Satz oder eine Theorie geht."],
      ["Weltbilder heute", "Was versteht Niels Bohr unter Komplementarität?", ["Zwei Beschreibungen (Elektron als Teilchen und als Welle) schließen sich aus, geben aber nur zusammen die vollständige Information.", "Zwei Theorien sind identisch.", "Eine Theorie widerlegt die andere endgültig.", "Wissen und Glauben sind dasselbe."], "Um das Ganze zu verstehen, braucht man beide Seiten, auch wenn sie sich nicht in einem Bild darstellen lassen."],
      ["Weltbilder heute", "Wer formulierte im Rahmen der Kopenhagener Deutung (1927) die Unschärferelation?", ["Werner Heisenberg", "Niels Bohr", "Stephen Hawking", "Albert Einstein"], "Bohr steht für die Komplementarität, Heisenberg für die Unschärferelation."],
      ["Weltbilder heute", "Welches Ziel der Wissenschaft beschreibt Stephen Hawking?", ["Eine einzige Theorie, die das gesamte Universum beschreibt – eine Quantentheorie der Gravitation", "Die Rückkehr zum geozentrischen Weltbild", "Die Trennung von Geist und Materie", "Den Beweis, dass es keine Naturgesetze gibt"], "Gelänge sie, wäre das der Triumph der Vernunft: „Gottes Plan kennen“."],
      ["Weltbilder heute", "Nach Hawking sind allgemeine Relativitätstheorie und Quantenmechanik bisher nicht miteinander im Einklang.", true, "Richtig: Die Relativitätstheorie beschreibt Schwerkraft und das Universum im Großen, die Quantenmechanik das sehr Kleine."],
      ["Weltbilder heute", "Was unterscheidet laut Material Realität und Wirklichkeit?", ["Realität ist die objektive, bewusstseinsunabhängige Welt; Wirklichkeit ist die wahrgenommene, vom Gehirn konstruierte Welt.", "Beide Begriffe bedeuten dasselbe.", "Realität ist die Traumwelt, Wirklichkeit die Welt im Wachzustand.", "Wirklichkeit ist objektiv, Realität subjektiv."], "Realität: transphänomenal (z. B. „elektromagnetische Welle“). Wirklichkeit: phänomenal, bewusstseinsabhängig."],
      ["Weltbilder heute", "„Hell“ ist keine reale Eigenschaft der Außenwelt. Was steckt dahinter?", ["Das Gehirn legt Wellen bestimmter Länge als „hell“ aus – es bildet die Außenwelt nicht ab, sondern deutet sie.", "Licht existiert nicht.", "Nur Tiere nehmen Helligkeit wahr.", "Helligkeit ist eine Eigenschaft der Gegenstände selbst."], "Unser Erleben ist nicht ohne Weiteres eine reale Eigenschaft der Außenwelt."],
      ["Weltbilder heute", "Es gibt reale Eigenschaften der Außenwelt, die wir nicht als solche wahrnehmen, z. B. elektromagnetische Wellen.", true, "Richtig: Wir nehmen nicht alles wahr, was real ist."],
      ["Weltbilder heute", "Was besagt der Konstruktivismus?", ["Jedes Gehirn konstruiert aufgrund seiner Voraussetzungen und Kenntnisse eine eigene Wirklichkeit.", "Die Welt wurde von Menschen gebaut.", "Die Wahrnehmung bildet die Welt exakt ab.", "Nur die Naturwissenschaft erkennt die Wirklichkeit."], "Wir sind an Raum und Zeit gebunden; deshalb kann es Missverständnisse geben, wenn Menschen dieselbe Begebenheit verschieden deuten."],
      ["Weltbilder heute", "Was soll das Beispiel der Blume zeigen?", ["Wie wir etwas deuten, hängt vom Kontext und unserem Vorwissen ab (Dank, Geburtstag, Beerdigung …).", "Blumen haben in jeder Kultur dieselbe Bedeutung.", "Pflanzen nehmen Menschen wahr.", "Die Biologie erklärt alles an einer Blume."], "Jede und jeder nimmt anders wahr und konstruiert eine eigene Wirklichkeit."],
      ["Weltbilder heute", "Was veranschaulicht Platons Höhlengleichnis im Unterricht?", ["Wir nehmen oft nur „Schatten“ – Oberflächliches – wahr und halten es für die ganze Wahrheit.", "Höhlen waren die ersten Tempel.", "Die Erde ist innen hohl.", "Licht ist eine Welle."], "Einflüsse wie Eltern, Medien, Social Media, Bildung oder Emotionen prägen, was wir für wahr halten; aus Angst oder Bequemlichkeit will man manchmal nicht die ganze Wahrheit sehen."],
      ["Weltbilder heute", "Was zeigen die beiden Liebesbriefe von Sina und Lukas?", ["Dieselbe Wirklichkeit lässt sich auf mehreren Ebenen beschreiben, ohne dass eine die andere widerlegt.", "Die biologische Erklärung widerlegt Gefühle.", "Gefühle sind nicht wirklich.", "Nur die gefühlte Sicht ist wahr."], "Vieldimensionalität der Wirklichkeit: Sina beschreibt Gefühle, Lukas die Biologie – und bleibt ihr trotzdem zugetan."],
      ["Schöpfung & Naturwissenschaft", "Was steht sich im Konfliktmodell gegenüber?", ["Biblizismus (Absolutsetzung der Bibel) und Szientismus (Absolutsetzung der Naturwissenschaft)", "Kopernikus und Ptolemäus", "Realität und Wirklichkeit", "Gen 1 und Gen 2"], "Im Konfliktmodell erhebt jede Seite einen absoluten Anspruch."],
      ["Schöpfung & Naturwissenschaft", "Was besagt das Unabhängigkeitsmodell?", ["Zwei getrennte Bereiche: Naturwissenschaft fragt „Wie?“, Theologie fragt „Warum?“", "Theologie und Naturwissenschaft verschmelzen.", "Die Naturwissenschaft muss der Bibel folgen.", "Beide sprechen ständig über ethische Fragen."], "Beide Bereiche beantworten verschiedene Fragen."],
      ["Schöpfung & Naturwissenschaft", "Wofür steht das Dialogmodell?", ["Gegenseitiges Gespräch und Bereicherung, vor allem bei ethischen Fragestellungen", "Absolutsetzung der Naturwissenschaft", "Vollständige Trennung der Bereiche", "Vermischung der Wissenschaftsbereiche"], "Beispiel: gemeinsame Diskussion über Gentechnik oder Umweltfragen."],
      ["Schöpfung & Naturwissenschaft", "Welche Gefahr nennt das Material beim Integrationsmodell?", ["Die Vermischung der Wissenschaftsbereiche", "Dass nie miteinander gesprochen wird", "Dass die Bibel absolut gesetzt wird", "Dass ethische Fragen ausgeklammert werden"], "Integration = Verbindung von Theologie und Naturwissenschaft."],
      ["Schöpfung & Naturwissenschaft", "Szientismus bedeutet, dass die Bibel absolut gesetzt wird.", false, "Falsch: Szientismus = Absolutsetzung der Naturwissenschaft; Biblizismus = Absolutsetzung der Bibel."],
      ["Schöpfung & Naturwissenschaft", "Wann und von wem wurde die 1. Schöpfungsgeschichte (Gen 1,1–2,4a) laut Material verfasst?", ["Ca. 500 v. Chr. von jüdischen Priestern im babylonischen Exil (Priesterschrift)", "Ca. 1000 v. Chr. am Königshof", "Im 1. Jh. n. Chr. von den Evangelisten", "Im Mittelalter von Mönchen"], "Die 2. Schöpfungsgeschichte (Gen 2,4 ff.) ist älter: ca. 1000 v. Chr."],
      ["Schöpfung & Naturwissenschaft", "Wie schafft Gott in Gen 1?", ["Durch sein Wort in einem Sechs-Tage-Werk; der 7. Tag ist Ruhetag. Refrain: „Und Gott sah, dass es gut war.“", "Aus dem Körper eines besiegten Ungeheuers", "Er formt den Menschen aus Ackerboden und haucht ihm Atem ein.", "Durch einen Kampf gegen andere Götter"], "Das Formen aus Ackerboden gehört zu Gen 2, der Kampf zum babylonischen Mythos."],
      ["Schöpfung & Naturwissenschaft", "Was wird am 4. Schöpfungstag geschaffen?", ["Sonne, Mond und Sterne als Zeichen für Zeiten, Tage und Jahre", "Licht und Finsternis", "Landtiere und der Mensch", "Wassertiere und Vögel"], "1 Licht, 2 Himmelsfeste, 3 Land, Meer, Pflanzen, 4 Gestirne, 5 Wassertiere und Vögel, 6 Landtiere und Mensch, 7 Ruhe."],
      ["Schöpfung & Naturwissenschaft", "Was geschieht am 2. Schöpfungstag?", ["Gott schafft die Himmelsfeste und trennt die Wasser.", "Gott schafft Pflanzen und Bäume.", "Gott ruht.", "Gott schafft das Licht."], "Die Himmelsfeste trennt die Wasser oben von den Wassern unten."],
      ["Schöpfung & Naturwissenschaft", "Was kennzeichnet die 2. Schöpfungsgeschichte (Gen 2,4 ff.)?", ["Gott macht den Menschen aus Ackerboden (Adam aus Adama), haucht ihm Lebensatem ein und setzt ihn in den Garten Eden.", "Ein Sechs-Tage-Werk mit Ruhetag", "Sonne und Mond werden als Götter verehrt.", "Der Mensch wird geschaffen, um den Göttern zu dienen."], "Nur vom Baum der Erkenntnis darf nicht gegessen werden."],
      ["Schöpfung & Naturwissenschaft", "In Gen 2 benennt der Mensch die Tiere, sie sind aber kein passendes Gegenüber; deshalb wird die Frau geschaffen.", true, "Richtig: Mann und Frau sind einander das passende Gegenüber."],
      ["Schöpfung & Naturwissenschaft", "Was bedeutet „Ebenbild Gottes“ laut Material?", ["Würde, Verstand, Stellvertreter Gottes auf Erden und Verantwortung, die Erde zu bebauen und zu bewahren", "Der Mensch sieht äußerlich aus wie Gott.", "Der Mensch ist selbst göttlich und unsterblich.", "Der Mensch darf die Natur nach Belieben ausbeuten."], "„Herrschen“ heißt: die Erde gut regieren."],
      ["Schöpfung & Naturwissenschaft", "Wie entsteht die Welt im babylonischen Mythos?", ["Marduk teilt den Körper der Tiamat: aus einer Hälfte den Himmel, aus der anderen die Erde.", "Gott spricht, und es wird Licht.", "Schu trennt Nut und Geb.", "Aus einer Ursuppe entsteht der erste Einzeller."], "Marduk teilt den Himmel in zwölf Zonen (zwölf Monate); Mond- und Sonnengott ordnen Nacht und Tag. Nach dem Kampf ruht Marduk."],
      ["Schöpfung & Naturwissenschaft", "Wozu wird der Mensch im babylonischen Mythos geschaffen – und wozu in der Bibel?", ["Babylon: um den Göttern zu dienen; Bibel: als Ebenbild und Stellvertreter Gottes, der die Erde bebaut und bewahrt", "In beiden Texten, um die Götter zu ernähren", "Babylon: als Herr der Welt; Bibel: als Diener", "In beiden Texten ohne besonderen Zweck"], "Ein zentraler Unterschied im Menschenbild."],
      ["Schöpfung & Naturwissenschaft", "Welche Funktion hatte Gen 1 für die Gläubigen im babylonischen Exil?", ["Sie vergewisserte, dass der biblische Gott größer ist als die babylonischen Götter, auch im Exil da ist und alles gut und sinnvoll ist.", "Sie sollte die babylonischen Götter loben.", "Sie war ein naturwissenschaftlicher Bericht.", "Sie diente als Gesetzbuch für den König."], "Der Text wurde im Gottesdienst gesungen."],
      ["Schöpfung & Naturwissenschaft", "Im babylonischen Mythos wird die Schöpfung – wie in der Bibel – als gut bewertet.", false, "Falsch: Nur die Bibel bewertet die Schöpfung als gut. Außerdem sind Sonne, Mond und Sterne dort keine Götter, sondern Geschöpfe Gottes."],
    ]),
    informatik: ex('informatik', [
      ['Algorithmen', 'Welche Laufzeit hat die binäre Suche in einer sortierten Liste mit \\(n\\) Elementen?', ['\\(O(\\log n)\\)', '\\(O(n)\\)', '\\(O(n^2)\\)', '\\(O(1)\\)'], 'Bei jedem Schritt halbiert sich der Suchbereich.'],
      ['Algorithmen', 'Welche Laufzeit hat Bubblesort im schlechtesten Fall?', ['\\(O(n^2)\\)', '\\(O(n\\log n)\\)', '\\(O(n)\\)', '\\(O(\\log n)\\)'], 'Bis zu \\(n\\) Durchläufe mit je bis zu \\(n\\) Vergleichen.'],
      ['Algorithmen', 'Welcher Sortieralgorithmus teilt die Liste und fügt sortierte Teillisten wieder zusammen?', ['Mergesort', 'Bubblesort', 'Selectionsort', 'Insertionsort'], 'Teile und herrsche mit Merge-Schritt, Laufzeit \\(O(n\\log n)\\).'],
      ['Algorithmen', 'Nach welchem Prinzip arbeitet ein Stack (Stapel)?', ['LIFO – last in, first out', 'FIFO – first in, first out', 'Sortiert nach Größe', 'Zufällig'], 'push legt oben auf, pop nimmt oben weg. Eine Queue arbeitet nach FIFO.'],
      ['Daten & Datenbanken', 'Wozu dient ein Primärschlüssel?', ['Er identifiziert jeden Datensatz einer Tabelle eindeutig.', 'Er verschlüsselt die Datenbank.', 'Er sortiert die Tabelle alphabetisch.', 'Er verweist auf eine andere Tabelle.'], 'Der Verweis auf eine andere Tabelle ist ein Fremdschlüssel.'],
      ['Daten & Datenbanken', 'Mit welcher SQL-Klausel filtert man Zeilen nach einer Bedingung?', ['WHERE', 'ORDER BY', 'GROUP BY', 'FROM'], 'SELECT … FROM … WHERE Bedingung. ORDER BY sortiert, GROUP BY gruppiert.'],
      ['Daten & Datenbanken', 'Was liefert SELECT COUNT(*) FROM Schueler?', ['Die Anzahl der Datensätze in der Tabelle Schueler', 'Alle Spalten der Tabelle', 'Die Summe aller Zahlen', 'Den ersten Datensatz'], 'COUNT(*) zählt Zeilen.'],
      ['Daten & Datenbanken', 'Ein Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle.', true, 'Richtig: So werden Tabellen verknüpft, z. B. bei 1:n-Beziehungen.'],
      ['Theorie & Netze', 'Welche Sprachen erkennen endliche Automaten?', ['Reguläre Sprachen', 'Alle kontextfreien Sprachen', 'Alle entscheidbaren Sprachen', 'Nur endliche Sprachen'], 'Zum Beispiel lässt sich \\(a^nb^n\\) nicht mit einem endlichen Automaten erkennen.'],
      ['Theorie & Netze', 'Womit verschlüsselt man bei RSA eine Nachricht an Bob?', ['Mit Bobs öffentlichem Schlüssel', 'Mit Bobs privatem Schlüssel', 'Mit dem eigenen privaten Schlüssel', 'Mit einem gemeinsamen geheimen Schlüssel'], 'Nur Bob kann mit seinem privaten Schlüssel entschlüsseln.'],
      ['Theorie & Netze', 'Eine IPv4-Adresse besteht aus 32 Bit.', true, 'Richtig: vier Oktette zu je 8 Bit, z. B. 192.168.0.1.'],
      ['Theorie & Netze', 'Was unterscheidet TCP von UDP?', ['TCP ist verbindungsorientiert und sichert vollständige Übertragung in richtiger Reihenfolge.', 'TCP ist schneller und verzichtet auf Bestätigungen.', 'UDP verschlüsselt alle Daten.', 'UDP arbeitet nur im lokalen Netz.'], 'UDP ist verbindungslos und ohne Garantie, dafür schneller (Streaming, Spiele).'],
    ]),
    spanisch: ex('spanisch', [
      ['Gramática', 'Espero que tú ___ (venir) mañana.', ['vengas', 'vienes', 'vendrás', 'venías'], '„esperar que“ + subjuntivo.'],
      ['Gramática', 'Si tuviera dinero, ___ (viajar) por el mundo.', ['viajaría', 'viajaré', 'viajo', 'he viajado'], 'si + imperfecto de subjuntivo → condicional.'],
      ['Gramática', 'Cuando ___ (llegar) a casa, te llamaré.', ['llegue', 'llego', 'llegaré', 'llegaba'], '„cuando“ con referencia al futuro + subjuntivo.'],
      ['Gramática', 'Ayer ___ (ir, yo) al cine con mis amigos.', ['fui', 'voy', 'iré', 'he ido'], 'Acción terminada en un momento concreto del pasado (ayer) → pretérito indefinido.'],
      ['Gramática', 'La sopa ___ fría.', ['está', 'es', 'son', 'están'], 'Estado pasajero → estar.'],
      ['Gramática', 'Estudio mucho ___ aprobar el examen.', ['para', 'por', 'de', 'en'], 'Finalidad → para.'],
      ['Escribir', 'El conector „sin embargo“ expresa …', ['un contraste', 'una causa', 'una consecuencia', 'un ejemplo'], 'sin embargo = trotzdem / jedoch.'],
      ['Escribir', 'En un resumen se usan citas largas del texto.', false, 'Falso: el resumen usa palabras propias, en presente y sin opinión personal.'],
      ['Cultura e historia', '¿Cuándo tuvo lugar la Guerra Civil Española?', ['1936–1939', '1914–1918', '1975–1978', '1898'], 'Terminó con la victoria de Franco y el comienzo de la dictadura.'],
      ['Cultura e historia', '¿Cuándo terminó la dictadura de Franco?', ['Con su muerte en 1975', 'En 1939', 'En 1992', 'En 1953'], 'Después comenzó la Transición a la democracia.'],
      ['Cultura e historia', '¿Qué se aprobó en 1978 en España?', ['La Constitución democrática', 'La entrada en la OTAN', 'El euro', 'La independencia de Cataluña'], 'La Constitución de 1978 es la base de la monarquía parlamentaria.'],
      ['Cultura e historia', '¿Qué lengua es cooficial en Cataluña además del castellano?', ['el catalán', 'el gallego', 'el euskera', 'el portugués'], 'Gallego en Galicia, euskera en el País Vasco y Navarra.'],
    ]),
    latein: ex('latein', [
      ['Grammatik', 'Wie übersetzt man den Ablativus absolutus „urbe capta“?', ['Nachdem die Stadt erobert worden war', 'Während die Stadt erobert wird', 'Um die Stadt zu erobern', 'Die Stadt muss erobert werden'], 'PPP im Abl. abs. drückt Vorzeitigkeit aus.'],
      ['Grammatik', 'Wie übersetzt man „Scio te venire.“?', ['Ich weiß, dass du kommst.', 'Ich weiß, dass du gekommen bist.', 'Ich weiß, ob du kommst.', 'Ich will, dass du kommst.'], 'AcI mit Infinitiv Präsens: gleichzeitig.'],
      ['Grammatik', 'Wie übersetzt man „Carthago delenda est.“?', ['Karthago muss zerstört werden.', 'Karthago ist zerstört worden.', 'Karthago zerstört.', 'Karthago wird zerstören.'], 'Gerundivum + esse drückt Notwendigkeit aus.'],
      ['Grammatik', 'Wie übersetzt man „cum“ mit Konjunktiv Plusquamperfekt meist?', ['nachdem', 'weil immer', 'obwohl nie', 'damit'], 'cum narrativum/historicum: als / nachdem. Ebenso möglich: kausal oder konzessiv.'],
      ['Grammatik', '„Gaudeamus!“ – welche Funktion hat der Konjunktiv hier?', ['Aufforderung: „Lasst uns fröhlich sein!“', 'Irrealis der Gegenwart', 'Indirekte Rede', 'Frage'], 'Hortativ: Aufforderung an die 1. Person Plural.'],
      ['Stilmittel & Metrik', '„Veni, vidi, vici.“ – welches Stilmittel?', ['Asyndeton', 'Polysyndeton', 'Chiasmus', 'Hyperbaton'], 'Aneinanderreihung ohne Konjunktion (zugleich ein Trikolon).'],
      ['Stilmittel & Metrik', 'Woraus besteht ein daktylischer Hexameter?', ['Aus sechs Versfüßen (Daktylen oder Spondeen), der fünfte meist ein Daktylus', 'Aus fünf Jamben', 'Aus vier Trochäen', 'Aus sechs Silben'], 'Versmaß des Epos (Vergil, Ovid).'],
      ['Stilmittel & Metrik', 'Ein Chiasmus ist eine kreuzweise Stellung einander entsprechender Satzglieder (A–B–B–A).', true, 'Richtig, benannt nach dem griechischen Buchstaben Chi (χ).'],
      ['Autoren & Philosophie', 'Wer schrieb „De bello Gallico“?', ['Caesar', 'Cicero', 'Ovid', 'Seneca'], 'Caesars Bericht über den Gallischen Krieg (58–50 v. Chr.).'],
      ['Autoren & Philosophie', 'Worum geht es in Ovids „Metamorphosen“?', ['Um Verwandlungssagen aus dem Mythos', 'Um den Gallischen Krieg', 'Um die Stoa', 'Um Gerichtsreden'], 'Rund 250 Verwandlungssagen in Hexametern.'],
      ['Autoren & Philosophie', 'Was ist das Ziel der stoischen Philosophie (z. B. Seneca)?', ['Ein Leben im Einklang mit Natur und Vernunft, frei von Leidenschaften', 'Möglichst viel Lust', 'Politische Macht', 'Reichtum'], 'Apatheia und Tugend. Die Lust (als Seelenruhe) ist dagegen Epikurs Ziel.'],
      ['Autoren & Philosophie', 'Was versteht Epikur unter Lust (voluptas)?', ['Freiheit von Schmerz und Seelenruhe (Ataraxie)', 'Ausschweifende Feste', 'Ruhm und Ehre', 'Pflichterfüllung'], 'Epikur meint maßvolle, „ruhende“ Lust.'],
    ]),
  };

  // Themes inside each area (area = topic). Items: e<i> = Exercises[subject][i], k<i> = flashcard i, g:<id> = calculation task.
  const T = (subject, list) => list.map(([area, id, name, desc, items]) => ({ subject, area, id: subject + '-' + id, name, desc, items: items.split(' ') }));
  global.SubjectThemes = {
    deutsch: T('deutsch', [
      ['Stilmittel', 'bild', 'Bildliche Sprache', 'Metapher, Personifikation, Oxymoron, Euphemismus, Hyperbel', 'e1 e4 e5 k5 k8'],
      ['Stilmittel', 'satz', 'Wiederholung, Satzbau & Vers', 'Anapher, Chiasmus, Antithese, Litotes, Ellipse, Parataxe, Enjambement', 'e0 e2 e3 k6 k7 k9 k10 k11'],
      ['Literatur', 'erzaehl', 'Erzähltechnik', 'Erzählform, Erzählverhalten, erlebte Rede, innerer Monolog', 'e6 e7 k12 k13 k14'],
      ['Literatur', 'drama', 'Drama', 'Aufbau, Exposition, Peripetie, offenes und geschlossenes Drama', 'e8 e15 e16 k15'],
      ['Epochen', 'epochen', 'Literaturepochen', 'Aufklärung, Sturm und Drang, Realismus, Expressionismus', 'e9 e10 e11 e17'],
      ['Aufgabenarten', 'interpretation', 'Interpretation & Analyse', 'Aufbau, Einleitung, indirekte Rede', 'e12 e14 k0 k1'],
      ['Aufgabenarten', 'eroertern', 'Erörtern & materialgestützt schreiben', 'Argumente aufbauen, Materialien verarbeiten', 'e13 k2 k3 k4'],
    ]),
    englisch: T('englisch', [
      ['Grammar', 'tenses', 'Tenses & conditionals', 'if-clauses, since/for, present perfect', 'e0 e1 e2 k13'],
      ['Grammar', 'passive', 'Passive & reported speech', 'passive forms, backshift, reported questions', 'e3 e4 e13 e14'],
      ['Linking words', 'linking', 'Linking words', 'contrast, result, adding, concluding', 'e5 e6 k11 k12'],
      ['Stylistic devices', 'devices', 'Stylistic devices', 'personification, hyperbole, simile, irony …', 'e7 e8 k5 k6 k7 k8 k9'],
      ['Writing', 'summary', 'Summary, analysis & comment', 'rules and structure of the main text types', 'e9 k0 k1 k2'],
      ['Writing', 'mediation', 'Mediation & characterisation', 'Sprachmittlung, direct and indirect characterisation', 'e10 k3 k4'],
      ['Narrative', 'narrator', 'Narrative perspective', 'first person, limited, omniscient, unreliable', 'e11 e12 k10'],
    ]),
    franzoesisch: T('franzoesisch', [
      ['Grammaire', 'temps', 'Temps & subjonctif', 'subjonctif, phrases conditionnelles, passé composé / imparfait', 'e0 e1 e2 e3 e6 k6 k7 k8'],
      ['Grammaire', 'pronoms', 'Pronoms & gérondif', 'lui, en, y, gérondif', 'e4 e5 e11 k9'],
      ['Connecteurs', 'connecteurs', 'Connecteurs', 'opposition, cause, conséquence, structure', 'e7 e8 k3 k4 k5'],
      ['Écrire', 'ecrire', 'Résumé, commentaire & médiation', 'règles des types de texte', 'e9 k0 k1 k2'],
      ['Analyse', 'analyse', 'Narrateur & figures de style', 'point de vue, comparaison, métaphore', 'e10 k10 k11'],
    ]),
    physik: T('physik', [
      ['Felder', 'efeld', 'Elektrisches Feld & Kondensator', 'Feldstärke, Kapazität, Ladung, Bahn im E-Feld', 'e0 e2 k0 k1 k2 k6 g:phy-kondensator'],
      ['Felder', 'bfeld', 'Magnetfeld & Lorentzkraft', 'Lorentzkraft, Kreisbahn, Bahnradius', 'e1 e3 k3 k4 g:phy-lorentz'],
      ['Felder', 'induktion', 'Induktion', 'Flussänderung, Induktionsgesetz, Lenzsche Regel', 'e4 e12 e13 k5'],
      ['Schwingungen und Wellen', 'schwingung', 'Schwingungen', 'Faden- und Federpendel, Schwingkreis', 'e5 k7 k8 g:phy-federpendel'],
      ['Schwingungen und Wellen', 'wellen', 'Wellen & Interferenz', 'Wellengleichung, Gangunterschied, Gitter', 'e6 e7 k9 k10 g:phy-gitter'],
      ['Quantenphysik', 'photon', 'Photonen & Photoeffekt', 'Photonenenergie, Einstein-Gleichung', 'e8 k11 k12 g:phy-photoeffekt'],
      ['Quantenphysik', 'quanten', 'Quantenobjekte & Atom', 'De Broglie, Doppelspalt, Unbestimmtheit, Energieniveaus', 'e9 e10 e11 k13 g:phy-debroglie'],
    ]),
    chemie: T('chemie', [
      ['Gleichgewicht', 'gleichgewicht', 'Le Chatelier & MWG', 'Temperatur, Druck, Katalysator, Kc berechnen', 'e0 e1 e2 k0 k1 k2 g:che-mwg'],
      ['Säure-Base', 'broensted', 'Säuren, Basen & pKs', 'Brønsted, korrespondierende Paare, Säurestärke', 'e3 e4 e5 k3'],
      ['Säure-Base', 'ph', 'pH-Wert & Puffer', 'starke und schwache Säuren, Henderson-Hasselbalch', 'k4 k5 k6 g:che-ph-stark g:che-ph-schwach g:che-puffer'],
      ['Säure-Base', 'titration', 'Titration', 'Äquivalenzpunkt, Indikator, Konzentration', 'e6 e14 g:che-titration'],
      ['Redox', 'redox', 'Redoxreaktionen', 'Oxidation, Reduktion, Oxidationszahlen', 'e7 e9 k7'],
      ['Redox', 'elektrochemie', 'Elektrochemie', 'galvanische Zelle, Elektrolyse, Nernst-Gleichung', 'e8 k8 k9 g:che-nernst'],
      ['Energetik', 'energetik', 'Enthalpie, Entropie & ΔG', 'Gibbs-Helmholtz, freiwillige Reaktionen', 'e10 k10 g:che-gibbs'],
      ['Organik', 'organik', 'Stoffklassen & Reaktionen', 'funktionelle Gruppen, Ester, Aromaten, Kunststoffe', 'e11 e12 e13 k11 k12'],
    ]),
    biologie: T('biologie', [
      ['Leben und Energie', 'stoffwechsel', 'Fotosynthese & Zellatmung', 'Lichtreaktion, Glykolyse, Citratzyklus', 'e0 e1 e2 k0 k1 k2'],
      ['Leben und Energie', 'enzyme', 'Enzyme', 'Wirkungsweise, Hemmung', 'e3 k3 k4'],
      ['Informationsverarbeitung', 'neuron', 'Ruhe- & Aktionspotenzial', 'Ionenströme, Erregungsleitung', 'e4 e5 e6 k5 k6'],
      ['Informationsverarbeitung', 'synapse', 'Synapse', 'Transmitter, Calcium, synaptische Gifte', 'e7 e14 k7'],
      ['Vielfalt des Lebens', 'genetik', 'Proteinbiosynthese', 'Codon, Transkription, Translation', 'e8 e9 k8'],
      ['Vielfalt des Lebens', 'evolution', 'Evolution & Populationsgenetik', 'Mutation, Selektion, Homologie, Hardy-Weinberg', 'e10 e11 k9 k10 g:bio-hardy-weinberg'],
      ['Umwelt', 'oekologie', 'Ökologie & Populationen', 'Nische, Konkurrenz, Räuber-Beute, Wachstum', 'e12 e13 k11 k12 g:bio-wachstum'],
    ]),
    gemeinschaftskunde: T('gemeinschaftskunde', [
      ['Politisches System', 'grundgesetz', 'Grundgesetz & Gewaltenteilung', 'Staatsprinzipien, Ewigkeitsklausel, BVerfG, Parteien', 'e4 e5 k0 k1 k2 k6 k7'],
      ['Politisches System', 'wahl', 'Wahlen, Bundestag & Bundesrat', 'Kanzlerwahl, Misstrauensvotum, Erst- und Zweitstimme', 'e0 e1 e2 e3 k3 k4 k5'],
      ['Internationale Politik', 'un', 'UN, NATO & Sicherheit', 'Sicherheitsrat, Veto, Bündnisfall, Sicherheitsbegriff', 'e6 e7 e9 k8 k9 k10'],
      ['Internationale Politik', 'eu', 'Europäische Union', 'Organe, Gesetzgebung', 'e8 e12 k11'],
      ['Gesellschaft', 'gesellschaft', 'Sozialstaat & demografischer Wandel', 'Sozialstaatsprinzip, Alterung', 'e10 e11 k12'],
    ]),
    geschichte: T('geschichte', [
      ['Revolutionen & 19. Jh.', 'revolution', 'Revolutionen 1789 & 1848', 'Französische Revolution, Paulskirche', 'e0 e1 k0 k1'],
      ['Revolutionen & 19. Jh.', 'kaiserreich', 'Kaiserreich & Soziale Frage', 'Reichsgründung, Bismarck, Sozialgesetze', 'e2 e3 k2 k3'],
      ['Weimar & NS', 'weimar', 'Weimarer Republik', 'Verfassung, Art. 48, Krisenjahr 1923', 'e4 e5 k4 k5'],
      ['Weimar & NS', 'ns', 'Nationalsozialismus', 'Machtübernahme, Ermächtigungsgesetz, Verfolgung, Holocaust', 'e6 e7 e8 k6 k7'],
      ['Nachkriegszeit & Kalter Krieg', 'teilung', 'Besatzung & Teilung', 'Potsdam, Marshallplan, Berlin-Blockade, Staatsgründungen', 'e9 e10 k8 k9 k10'],
      ['Nachkriegszeit & Kalter Krieg', 'einheit', 'Mauer, Ostpolitik & Einheit', 'Mauerbau, Neue Ostpolitik, 1989/90', 'e11 e12 k11'],
    ]),
    geographie: T('geographie', [
      ['Geofaktoren', 'tektonik', 'Plattentektonik', 'Plattengrenzen, Subduktion, Rücken', 'e2 e4 k0'],
      ['Geofaktoren', 'klima', 'Klima, Böden & Karten', 'Coriolis, Passate, Treibhauseffekt, Regenwaldböden, Maßstab', 'e0 e1 e3 k1 k2 k3 g:gg-massstab'],
      ['Bevölkerung & Stadt', 'bevoelkerung', 'Bevölkerungsentwicklung', 'demographischer Übergang, Pyramiden, Wachstum, Dichte', 'e5 e6 k4 k5 g:gg-verdopplung g:gg-dichte'],
      ['Bevölkerung & Stadt', 'stadt', 'Stadtentwicklung', 'Suburbanisierung, Gentrifizierung, Phasen', 'e7 e8 k6 k7'],
      ['Wirtschaft & Globalisierung', 'standort', 'Standorte & Strukturwandel', 'Sektoren, Outsourcing, Standortfaktoren, Ruhrgebiet', 'e9 e10 e11 k8'],
      ['Wirtschaft & Globalisierung', 'entwicklung', 'Entwicklung & Nachhaltigkeit', 'HDI, Nachhaltigkeitsdreieck', 'e12 k9 k10'],
    ]),
    wirtschaft: T('wirtschaft', [
      ['Markt', 'preis', 'Preisbildung & Elastizität', 'Gleichgewicht, Höchst-/Mindestpreis, Elastizität', 'e0 e1 e2 e3 k0 g:wi-gleichgewicht g:wi-elastizitaet'],
      ['Markt', 'marktversagen', 'Marktversagen & Handel', 'Opportunitätskosten, externe Effekte, Ricardo', 'k1 k2 k3'],
      ['Wirtschaftspolitik', 'fiskal', 'Konjunktur & Fiskalpolitik', 'magisches Viereck, Keynes, Angebotspolitik', 'e6 e7 k4 k5 k6 k7'],
      ['Wirtschaftspolitik', 'geld', 'Geldpolitik', 'EZB, Leitzins, Preisniveaustabilität', 'e4 e5 k8'],
      ['Kennzahlen', 'kennzahlen', 'BIP, Inflation & Verteilung', 'nominal und real, Verbraucherpreise, Gini', 'e8 e9 e10 e11 k9 k10 g:wi-realwachstum'],
    ]),
    ethik: T('ethik', [
      ['Grundpositionen', 'pflicht', 'Pflicht- & Tugendethik', 'Kant, Deontologie, Aristoteles, Fehlschluss', 'e0 e3 e4 k0 k1 k3 k4'],
      ['Grundpositionen', 'nutzen', 'Utilitarismus', 'Bentham, Mill, Folgenethik', 'e1 e2 k2'],
      ['Gerechtigkeit', 'gerechtigkeit', 'Gesellschaftsvertrag & Gerechtigkeit', 'Hobbes, Rawls, Habermas', 'e5 e6 e7 k5 k6 k7'],
      ['Angewandte Ethik', 'angewandt', 'Bioethik & Verantwortung', 'Sterbehilfe, Singer, Jonas, Menschenwürde', 'e8 e9 e10 k8 k9'],
    ]),
    religion: T('religion', [
      ['Gott & Religionskritik', 'kritik', 'Religionskritik', 'Feuerbach, Marx, Freud, Nietzsche', 'e0 e1 e3 k1 k2 k3'],
      ['Gott & Religionskritik', 'gottesfrage', 'Gottesfrage & Theodizee', 'Leid, Exodus, Gottesbilder', 'e2 k0 k4'],
      ['Jesus Christus', 'reich', 'Reich Gottes & Bergpredigt', 'Gleichnisse, Bergpredigt, Doppelgebot', 'e4 e5 k5 k6 k7'],
      ['Jesus Christus', 'evangelien', 'Evangelien', 'Synoptiker, Markus, Logienquelle', 'e6 e7 e11'],
      ['Mensch & Ethik', 'mensch', 'Menschenbild & Rechtfertigung', 'Gottebenbildlichkeit, Nächstenliebe, Luther', 'e8 e9 e10 k8 k9'],
      ["Weltbilder im Wandel", "antike", "Antike & Mittelalter", "Ägypten (Nut, Geb, Schu), Babylon, Ptolemäus, Mittelalter", "e12 e13 e14 e15 e16 e17 e18 e19 e20 e21 k10 k11 k12 k13"],
      ["Weltbilder im Wandel", "neuzeit", "16. und 17. Jahrhundert", "Kopernikus, Galilei, Kepler, Bruno, Newton, Descartes", "e22 e23 e24 e25 e26 e27 e28 e29 k14 k15 k16 k17 k18"],
      ["Weltbilder im Wandel", "kraenkungen", "18./19. Jahrhundert & die drei Kränkungen", "Laplace, Lamettrie, Darwin, Freud, Karl Barth", "e30 e31 e32 e33 e34 e35 e36 e37 e38 k19 k20 k21"],
      ["Weltbilder heute", "gegenwart", "Weltbilder der Gegenwart", "Paradigmen, Kosmos, Evolution, Urknall, Konrad Lorenz", "e39 e40 e41 e42 e43 e44 e45 e46 e47 k22 k23 k24"],
      ["Weltbilder heute", "forscher", "Naturwissenschaftler über Wahrheit", "Einstein, Bohr, Heisenberg, Hawking", "e48 e49 e50 e51 e52 e53 e54 k25 k26 k27"],
      ["Weltbilder heute", "wirklichkeit", "Wahrnehmung & Wirklichkeit", "Realität und Wirklichkeit, Konstruktivismus, Höhlengleichnis", "e55 e56 e57 e58 e59 e60 e61 k28 k29 k30"],
      ["Schöpfung & Naturwissenschaft", "modelle", "Theologie & Naturwissenschaft", "Konflikt, Unabhängigkeit, Dialog, Integration", "e62 e63 e64 e65 e66 k31 k32"],
      ["Schöpfung & Naturwissenschaft", "schoepfung", "Schöpfungsgeschichten & Babylon", "Gen 1, Gen 2, sechs Tage, Ebenbild Gottes, Marduk", "e67 e68 e69 e70 e71 e72 e73 e74 e75 e76 e77 k33 k34 k35 k36"],
    ]),
    informatik: T('informatik', [
      ['Algorithmen', 'sortieren', 'Suchen & Sortieren', 'Laufzeiten, binäre Suche, Mergesort', 'e0 e1 e2 k0 k1 g:inf-binsuche'],
      ['Algorithmen', 'strukturen', 'Datenstrukturen & Rekursion', 'Stack, Queue, Binärbäume', 'e3 k2 k3 k4'],
      ['Daten & Datenbanken', 'zahlen', 'Zahlensysteme & Codierung', 'binär, hexadezimal, Bits', 'g:inf-binaer g:inf-hex g:inf-bits'],
      ['Daten & Datenbanken', 'db', 'Datenbanken & Modellierung', 'Schlüssel, SQL, Objektorientierung', 'e4 e5 e6 e7 k5 k6 k7'],
      ['Theorie & Netze', 'automaten', 'Automaten & Zahlendarstellung', 'endliche Automaten, Zweierkomplement', 'e8 k8 k9'],
      ['Theorie & Netze', 'netze', 'Netze & Kryptographie', 'IP, TCP/UDP, Subnetze, RSA', 'e9 e10 e11 k10 g:inf-subnetz'],
    ]),
    spanisch: T('spanisch', [
      ['Gramática', 'verbos', 'Tiempos y modos', 'subjuntivo, condicional, indefinido / imperfecto', 'e0 e1 e2 e3 k1 k2 k3'],
      ['Gramática', 'ser-estar', 'ser / estar & por / para', 'Unterschiede und typische Fehler', 'e4 e5 k0'],
      ['Escribir', 'escribir', 'Conectores & resumen', 'Konnektoren, Meinung äußern, Zusammenfassung', 'e6 e7 k4 k5'],
      ['Cultura e historia', 'historia', 'Historia y sociedad de España', '1492, Guerra Civil, Franco, Transición, lenguas', 'e8 e9 e10 e11 k6 k7 k8'],
    ]),
    latein: T('latein', [
      ['Grammatik', 'satzwertig', 'AcI, Abl. abs. & PC', 'satzwertige Konstruktionen', 'e0 e1 k0 k1 k2'],
      ['Grammatik', 'verben', 'Konjunktiv, cum & nd-Formen', 'Hortativ, cum-Sätze, Gerundium, Gerundivum', 'e2 e3 e4 k3 k4 k5'],
      ['Stilmittel & Metrik', 'stil', 'Stilmittel & Hexameter', 'Asyndeton, Chiasmus, Versmaß', 'e5 e6 e7 k6 k7'],
      ['Autoren & Philosophie', 'autoren', 'Autoren', 'Caesar, Ovid, Vergil', 'e8 e9 k10'],
      ['Autoren & Philosophie', 'philosophie', 'Stoa & Epikur', 'Seneca, Ataraxie, voluptas', 'e10 e11 k8 k9'],
    ]),
  };

  // ---------- Calculation tasks ----------
  const S = [];
  const add = (subject, meta, fn) => S.push(Object.assign(meta, { subject, make: fn }));
  const rel = (v, p = 0.01) => Math.abs(v) * p;

  add('physik', { id: 'phy-kondensator', topic: 'Felder', title: 'Plattenkondensator: Kapazität und Ladung' }, () => {
    const A = ri(10, 40) * 10, d = ri(2, 10) / 2, U = ri(2, 10) * 50, C = 8.854e-12 * A * 1e-4 / (d * 1e-3) * 1e12, Q = C * U / 1000;
    return {
      prompt: `Ein Plattenkondensator (Luft, \\(\\varepsilon_r = 1\\)) hat die Plattenfläche \\(A = ${A}\\,\\mathrm{cm^2}\\) und den Plattenabstand \\(d = ${dec(d, 1)}\\,\\mathrm{mm}\\). Er liegt an \\(U = ${U}\\,\\mathrm{V}\\). Berechnen Sie die Kapazität \\(C\\) in pF und die Ladung \\(Q\\) in nC.`,
      answers: [{ label: 'C (pF)', value: rd(C, 2), tol: rel(C) }, { label: 'Q (nC)', value: rd(Q, 3), tol: rel(Q) }],
      steps: [`\\(C = \\varepsilon_0\\cdot\\frac{A}{d} = 8{,}854\\cdot10^{-12}\\,\\frac{\\mathrm{F}}{\\mathrm{m}}\\cdot\\frac{${A}\\cdot10^{-4}\\,\\mathrm{m^2}}{${dec(d, 1)}\\cdot10^{-3}\\,\\mathrm{m}} \\approx ${dec(C)}\\,\\mathrm{pF}\\)`, `\\(Q = C\\cdot U \\approx ${dec(C)}\\,\\mathrm{pF}\\cdot ${U}\\,\\mathrm{V} \\approx ${dec(Q, 3)}\\,\\mathrm{nC}\\)`]
    };
  });
  add('physik', { id: 'phy-lorentz', topic: 'Felder', title: 'Elektron im Magnetfeld: Bahnradius' }, () => {
    const v = ri(10, 50) / 10, B = ri(1, 10), r = 9.109e-31 * v * 1e6 / (1.602e-19 * B * 1e-3) * 100;
    return {
      prompt: `Ein Elektron fliegt mit \\(v = ${dec(v, 1)}\\cdot 10^6\\,\\mathrm{\\tfrac{m}{s}}\\) senkrecht zu den Feldlinien in ein homogenes Magnetfeld mit \\(B = ${B}\\,\\mathrm{mT}\\). Berechnen Sie den Radius der Kreisbahn in cm. (\\(m_e = 9{,}109\\cdot10^{-31}\\,\\mathrm{kg}\\), \\(e = 1{,}602\\cdot10^{-19}\\,\\mathrm{C}\\))`,
      answers: [{ label: 'r (cm)', value: rd(r, 3), tol: rel(r) }],
      steps: [`Die Lorentzkraft ist die Zentripetalkraft: \\(e\\cdot v\\cdot B = \\frac{m\\cdot v^2}{r}\\)`, `\\(r = \\frac{m\\cdot v}{e\\cdot B} = \\frac{9{,}109\\cdot10^{-31}\\cdot ${dec(v, 1)}\\cdot10^{6}}{1{,}602\\cdot10^{-19}\\cdot ${B}\\cdot10^{-3}}\\,\\mathrm{m} \\approx ${dec(r, 3)}\\,\\mathrm{cm}\\)`]
    };
  });
  add('physik', { id: 'phy-federpendel', topic: 'Schwingungen und Wellen', title: 'Federpendel: Periodendauer und Frequenz' }, () => {
    const m = ri(2, 10) * 50, D = ri(2, 12) * 5, T = 2 * Math.PI * Math.sqrt(m / 1000 / D), f = 1 / T;
    return {
      prompt: `Ein Körper der Masse \\(m = ${m}\\,\\mathrm{g}\\) schwingt an einer Feder mit der Federkonstante \\(D = ${D}\\,\\mathrm{\\tfrac{N}{m}}\\). Berechnen Sie die Periodendauer \\(T\\) in s und die Frequenz \\(f\\) in Hz.`,
      answers: [{ label: 'T (s)', value: rd(T, 3), tol: rel(T) }, { label: 'f (Hz)', value: rd(f, 3), tol: rel(f) }],
      steps: [`\\(T = 2\\pi\\sqrt{\\frac{m}{D}} = 2\\pi\\sqrt{\\frac{${dec(m / 1000, 2)}\\,\\mathrm{kg}}{${D}\\,\\mathrm{N/m}}} \\approx ${dec(T, 3)}\\,\\mathrm{s}\\)`, `\\(f = \\frac{1}{T} \\approx ${dec(f, 3)}\\,\\mathrm{Hz}\\)`]
    };
  });
  add('physik', { id: 'phy-gitter', topic: 'Schwingungen und Wellen', title: 'Optisches Gitter: Winkel des Maximums' }, () => {
    const lam = ri(40, 70) * 10, N = ri(3, 6) * 100, k = pick([1, 1, 2]), s = k * lam * 1e-9 * N * 1e3, a = Math.asin(s) * 180 / Math.PI;
    return {
      prompt: `Licht der Wellenlänge \\(\\lambda = ${lam}\\,\\mathrm{nm}\\) fällt senkrecht auf ein Gitter mit \\(${N}\\) Strichen pro mm. Berechnen Sie den Winkel \\(\\alpha\\) (in Grad), unter dem das Maximum ${k}. Ordnung erscheint.`,
      answers: [{ label: 'α (°)', value: rd(a, 2), tol: 0.1 }],
      steps: [`Gitterkonstante: \\(g = \\frac{1\\,\\mathrm{mm}}{${N}} = ${dec(1e3 / N, 3)}\\,\\mathrm{\\mu m}\\)`, `\\(\\sin\\alpha = \\frac{k\\cdot\\lambda}{g} = \\frac{${k}\\cdot ${lam}\\cdot10^{-9}\\,\\mathrm{m}}{${dec(1e3 / N, 3)}\\cdot10^{-6}\\,\\mathrm{m}} \\approx ${dec(s, 4)}\\)`, `\\(\\alpha \\approx ${dec(a, 1)}^\\circ\\)`]
    };
  });
  add('physik', { id: 'phy-photoeffekt', topic: 'Quantenphysik', title: 'Photoeffekt: maximale kinetische Energie' }, () => {
    const [name, W] = pick([['Cäsium', 1.94], ['Kalium', 2.25], ['Natrium', 2.28], ['Calcium', 2.87]]), lam = ri(20, 35) * 10, Ef = 1239.84 / lam, E = Ef - W;
    return {
      prompt: `Licht der Wellenlänge \\(\\lambda = ${lam}\\,\\mathrm{nm}\\) fällt auf eine ${name}-Oberfläche (Austrittsarbeit \\(W_A = ${dec(W)}\\,\\mathrm{eV}\\)). Berechnen Sie die maximale kinetische Energie der Photoelektronen in eV. (\\(h\\cdot c = 1239{,}84\\,\\mathrm{eV\\,nm}\\))`,
      answers: [{ label: 'E_kin (eV)', value: rd(E, 3), tol: 0.02 }],
      steps: [`Photonenenergie: \\(E_{Ph} = \\frac{h\\cdot c}{\\lambda} = \\frac{1239{,}84}{${lam}}\\,\\mathrm{eV} \\approx ${dec(Ef)}\\,\\mathrm{eV}\\)`, `Einstein-Gleichung: \\(E_{kin} = E_{Ph} - W_A \\approx ${dec(Ef)} - ${dec(W)} = ${dec(E)}\\,\\mathrm{eV}\\)`]
    };
  });
  add('physik', { id: 'phy-debroglie', topic: 'Quantenphysik', title: 'De-Broglie-Wellenlänge eines Elektrons' }, () => {
    const U = ri(1, 20) * 50, lam = 6.626e-34 / Math.sqrt(2 * 9.109e-31 * 1.602e-19 * U) * 1e12;
    return {
      prompt: `Ein Elektron wird aus der Ruhe mit der Spannung \\(U = ${U}\\,\\mathrm{V}\\) beschleunigt. Berechnen Sie seine De-Broglie-Wellenlänge in pm (nicht relativistisch). (\\(h = 6{,}626\\cdot10^{-34}\\,\\mathrm{Js}\\), \\(m_e = 9{,}109\\cdot10^{-31}\\,\\mathrm{kg}\\), \\(e = 1{,}602\\cdot10^{-19}\\,\\mathrm{C}\\))`,
      answers: [{ label: 'λ (pm)', value: rd(lam, 2), tol: rel(lam) }],
      steps: [`Impuls aus \\(e\\cdot U = \\frac{p^2}{2m}\\): \\(p = \\sqrt{2\\,m\\,e\\,U}\\)`, `\\(\\lambda = \\frac{h}{p} = \\frac{6{,}626\\cdot10^{-34}}{\\sqrt{2\\cdot 9{,}109\\cdot10^{-31}\\cdot 1{,}602\\cdot10^{-19}\\cdot ${U}}}\\,\\mathrm{m} \\approx ${dec(lam, 1)}\\,\\mathrm{pm}\\)`]
    };
  });

  add('chemie', { id: 'che-ph-stark', topic: 'Säure-Base', title: 'pH-Wert einer starken Säure' }, () => {
    const a = pick([1, 2, 5]), b = ri(1, 4), c = a * 10 ** -b, pH = -Math.log10(c);
    return {
      prompt: `Berechnen Sie den pH-Wert von Salzsäure mit \\(c(\\mathrm{HCl}) = ${a === 1 ? '' : a + '\\cdot '}10^{-${b}}\\,\\mathrm{\\tfrac{mol}{L}}\\) (2 Nachkommastellen).`,
      answers: [{ label: 'pH', value: rd(pH, 2), tol: 0.011 }],
      steps: [`HCl ist eine starke Säure und protolysiert vollständig: \\(c(\\mathrm{H_3O^+}) = c(\\mathrm{HCl})\\)`, `\\(\\mathrm{pH} = -\\lg c(\\mathrm{H_3O^+}) = -\\lg(${dec(c, 5)}) \\approx ${dec(pH)}\\)`]
    };
  });
  add('chemie', { id: 'che-ph-schwach', topic: 'Säure-Base', title: 'pH-Wert einer schwachen Säure' }, () => {
    const [name, pKs] = pick([['Essigsäure', 4.75], ['Ameisensäure', 3.75], ['Benzoesäure', 4.2], ['Propansäure', 4.87]]), c = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1]), pH = 0.5 * (pKs - Math.log10(c));
    return {
      prompt: `Berechnen Sie den pH-Wert einer ${name}-Lösung mit \\(c_0 = ${dec(c)}\\,\\mathrm{\\tfrac{mol}{L}}\\) (\\(pK_S = ${dec(pKs)}\\)). Verwenden Sie die Näherung für schwache Säuren (2 Nachkommastellen).`,
      answers: [{ label: 'pH', value: rd(pH, 2), tol: 0.011 }],
      steps: [`Schwache Säure, geringe Protolyse: \\(\\mathrm{pH} = \\frac12\\,(pK_S - \\lg c_0)\\)`, `\\(\\mathrm{pH} = \\frac12\\,(${dec(pKs)} - \\lg ${dec(c)}) = \\frac12\\,(${dec(pKs)} - (${dec(Math.log10(c), 3)})) \\approx ${dec(pH)}\\)`]
    };
  });
  add('chemie', { id: 'che-puffer', topic: 'Säure-Base', title: 'Puffer: Henderson-Hasselbalch' }, () => {
    const pKs = 4.75, a = ri(1, 10) / 10, b = ri(1, 10) / 10, pH = pKs + Math.log10(b / a);
    return {
      prompt: `Ein Puffer enthält Essigsäure mit \\(c(\\mathrm{HA}) = ${dec(a, 1)}\\,\\mathrm{\\tfrac{mol}{L}}\\) und Natriumacetat mit \\(c(\\mathrm{A^-}) = ${dec(b, 1)}\\,\\mathrm{\\tfrac{mol}{L}}\\) (\\(pK_S = 4{,}75\\)). Berechnen Sie den pH-Wert (2 Nachkommastellen).`,
      answers: [{ label: 'pH', value: rd(pH, 2), tol: 0.011 }],
      steps: [`Henderson-Hasselbalch: \\(\\mathrm{pH} = pK_S + \\lg\\frac{c(\\mathrm{A^-})}{c(\\mathrm{HA})}\\)`, `\\(\\mathrm{pH} = 4{,}75 + \\lg\\frac{${dec(b, 1)}}{${dec(a, 1)}} \\approx ${dec(pH)}\\)`]
    };
  });
  add('chemie', { id: 'che-titration', topic: 'Säure-Base', title: 'Titration: Konzentration bestimmen' }, () => {
    const cb = pick([0.1, 0.2, 0.5]), Vb = ri(50, 250) / 10, Vs = pick([10, 20, 25]), c = cb * Vb / Vs;
    return {
      prompt: `\\(${Vs}\\,\\mathrm{mL}\\) Salzsäure werden mit Natronlauge (\\(c = ${dec(cb, 1)}\\,\\mathrm{\\tfrac{mol}{L}}\\)) titriert. Bis zum Äquivalenzpunkt werden \\(${dec(Vb, 1)}\\,\\mathrm{mL}\\) verbraucht. Berechnen Sie \\(c(\\mathrm{HCl})\\) in mol/L (4 Nachkommastellen).`,
      answers: [{ label: 'c (mol/L)', value: rd(c, 4), tol: 0.00051 }],
      steps: [`Am Äquivalenzpunkt gilt \\(n(\\mathrm{HCl}) = n(\\mathrm{NaOH})\\), also \\(c_S\\cdot V_S = c_B\\cdot V_B\\)`, `\\(c_S = \\frac{c_B\\cdot V_B}{V_S} = \\frac{${dec(cb, 1)}\\cdot ${dec(Vb, 1)}}{${Vs}}\\,\\mathrm{\\tfrac{mol}{L}} \\approx ${dec(c, 4)}\\,\\mathrm{\\tfrac{mol}{L}}\\)`]
    };
  });
  add('chemie', { id: 'che-mwg', topic: 'Gleichgewicht', title: 'Massenwirkungsgesetz: Kc berechnen' }, () => {
    const v = [0, 0, 0, 0].map(() => ri(1, 20) / 10), K = v[2] * v[3] / (v[0] * v[1]);
    return {
      prompt: `Für das Gleichgewicht \\(\\mathrm{A + B \\rightleftharpoons C + D}\\) werden die Gleichgewichtskonzentrationen gemessen: \\(c(\\mathrm{A}) = ${dec(v[0], 1)}\\), \\(c(\\mathrm{B}) = ${dec(v[1], 1)}\\), \\(c(\\mathrm{C}) = ${dec(v[2], 1)}\\), \\(c(\\mathrm{D}) = ${dec(v[3], 1)}\\) (jeweils in mol/L). Berechnen Sie \\(K_c\\) (3 Nachkommastellen).`,
      answers: [{ label: 'K_c', value: rd(K, 3), tol: Math.max(0.0011, rel(K, 0.002)) }],
      steps: [`MWG: \\(K_c = \\frac{c(\\mathrm{C})\\cdot c(\\mathrm{D})}{c(\\mathrm{A})\\cdot c(\\mathrm{B})}\\)`, `\\(K_c = \\frac{${dec(v[2], 1)}\\cdot ${dec(v[3], 1)}}{${dec(v[0], 1)}\\cdot ${dec(v[1], 1)}} \\approx ${dec(K, 3)}\\)`]
    };
  });
  add('chemie', { id: 'che-gibbs', topic: 'Energetik', title: 'Gibbs-Helmholtz: freie Enthalpie' }, () => {
    const H = ri(-30, 30) * 5 || -50, Sv = ri(-30, 30) * 10 || 100, T = pick([273, 298, 350, 400, 500]), G = H - T * Sv / 1000;
    return {
      prompt: `Für eine Reaktion gilt \\(\\Delta_r H = ${H}\\,\\mathrm{\\tfrac{kJ}{mol}}\\) und \\(\\Delta_r S = ${Sv}\\,\\mathrm{\\tfrac{J}{mol\\cdot K}}\\). Berechnen Sie \\(\\Delta_r G\\) bei \\(T = ${T}\\,\\mathrm{K}\\) in kJ/mol.`,
      answers: [{ label: 'ΔG (kJ/mol)', value: rd(G, 2), tol: 0.06 }],
      steps: [`Gibbs-Helmholtz: \\(\\Delta G = \\Delta H - T\\cdot\\Delta S\\) – \\(\\Delta S\\) in kJ umrechnen: \\(${Sv}\\,\\mathrm{J} = ${dec(Sv / 1000, 2)}\\,\\mathrm{kJ}\\)`, `\\(\\Delta G = ${H} - ${T}\\cdot(${dec(Sv / 1000, 2)}) \\approx ${dec(G)}\\,\\mathrm{\\tfrac{kJ}{mol}}\\) – ${G < 0 ? 'negativ: die Reaktion läuft freiwillig ab (exergonisch).' : 'positiv: die Reaktion läuft nicht freiwillig ab (endergonisch).'}`]
    };
  });
  add('chemie', { id: 'che-nernst', topic: 'Redox', title: 'Nernst-Gleichung: Elektrodenpotenzial' }, () => {
    const [ion, E0, z] = pick([['\\mathrm{Cu^{2+}/Cu}', 0.34, 2], ['\\mathrm{Zn^{2+}/Zn}', -0.76, 2], ['\\mathrm{Ag^{+}/Ag}', 0.8, 1]]), k = ri(1, 4), E = E0 + 0.059 / z * -k;
    return {
      prompt: `Berechnen Sie das Elektrodenpotenzial der Halbzelle \\(${ion}\\) (\\(E^0 = ${dec(E0)}\\,\\mathrm{V}\\)) bei einer Ionenkonzentration von \\(c = 10^{-${k}}\\,\\mathrm{\\tfrac{mol}{L}}\\) (25 °C, in V, 3 Nachkommastellen).`,
      answers: [{ label: 'E (V)', value: rd(E, 3), tol: 0.0021 }],
      steps: [`Nernst-Gleichung für Metallhalbzellen: \\(E = E^0 + \\frac{0{,}059\\,\\mathrm{V}}{z}\\cdot\\lg c(\\mathrm{Ion})\\) mit \\(z = ${z}\\)`, `\\(E = ${dec(E0)} + \\frac{0{,}059}{${z}}\\cdot(-${k}) \\approx ${dec(E, 3)}\\,\\mathrm{V}\\)`]
    };
  });

  add('biologie', { id: 'bio-hardy-weinberg', topic: 'Vielfalt des Lebens', title: 'Hardy-Weinberg: Allel- und Trägerfrequenz' }, () => {
    const N = pick([100, 400, 900, 1600, 2500, 2000, 5000, 10000]), q = Math.sqrt(1 / N), p = 1 - q, h = 2 * p * q;
    return {
      prompt: `Eine autosomal-rezessive Erbkrankheit tritt bei 1 von ${N.toLocaleString('de-DE')} Neugeborenen auf. Berechnen Sie nach Hardy-Weinberg die Frequenz \\(q\\) des Krankheitsallels und den Anteil \\(2pq\\) der heterozygoten Träger (je 4 Nachkommastellen).`,
      answers: [{ label: 'q', value: rd(q, 4), tol: 0.00051 }, { label: '2pq', value: rd(h, 4), tol: 0.00051 }],
      steps: [`Kranke sind homozygot rezessiv: \\(q^2 = \\frac{1}{${N}}\\) → \\(q = \\sqrt{\\frac{1}{${N}}} \\approx ${dec(q, 4)}\\)`, `\\(p = 1 - q \\approx ${dec(p, 4)}\\)`, `Träger: \\(2pq = 2\\cdot ${dec(p, 4)}\\cdot ${dec(q, 4)} \\approx ${dec(h, 4)}\\)`]
    };
  });
  add('biologie', { id: 'bio-wachstum', topic: 'Umwelt', title: 'Exponentielles Wachstum von Bakterien' }, () => {
    const N0 = pick([100, 200, 500, 1000]), g = pick([20, 30, 40, 60]), t = pick([2, 3, 4, 5]), n = t * 60 / g, N = N0 * 2 ** n;
    return {
      prompt: `Eine Bakterienkultur mit anfangs \\(${N0}\\) Zellen teilt sich unter optimalen Bedingungen alle \\(${g}\\) Minuten. Wie viele Zellen sind nach \\(${t}\\) Stunden vorhanden?`,
      answers: [{ label: 'N', value: N, tol: 0.5 }],
      steps: [`Anzahl der Generationen: \\(n = \\frac{${t}\\cdot 60\\,\\mathrm{min}}{${g}\\,\\mathrm{min}} = ${n}\\)`, `\\(N = N_0\\cdot 2^n = ${N0}\\cdot 2^{${n}} = ${N.toLocaleString('de-DE')}\\)`]
    };
  });

  add('informatik', { id: 'inf-binaer', topic: 'Daten & Datenbanken', title: 'Binärzahl in Dezimalzahl umrechnen' }, () => {
    const n = ri(17, 255), b = n.toString(2).padStart(8, '0');
    return {
      prompt: `Rechnen Sie die 8-Bit-Binärzahl \\(${b}_2\\) in eine Dezimalzahl um.`,
      answers: [{ label: 'Dezimalzahl', value: n }],
      steps: [`Stellenwerte von rechts: \\(1, 2, 4, 8, 16, 32, 64, 128\\)`, `\\(${[...b].map((c, i) => c === '1' ? 2 ** (7 - i) : null).filter(x => x !== null).join(' + ')} = ${n}\\)`]
    };
  });
  add('informatik', { id: 'inf-hex', topic: 'Daten & Datenbanken', title: 'Hexadezimalzahl umrechnen' }, () => {
    const n = ri(26, 4095), h = n.toString(16).toUpperCase(), L = h.length;
    return {
      prompt: `Rechnen Sie die Hexadezimalzahl \\(\\mathrm{${h}}_{16}\\) in eine Dezimalzahl um.`,
      answers: [{ label: 'Dezimalzahl', value: n }],
      steps: [`Ziffern: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15; Stellenwerte \\(16^0, 16^1, 16^2\\)`, `\\(${[...h].map((c, i) => parseInt(c, 16) + '\\cdot 16^{' + (L - 1 - i) + '}').join(' + ')} = ${n}\\)`]
    };
  });
  add('informatik', { id: 'inf-bits', topic: 'Daten & Datenbanken', title: 'Benötigte Bits für eine Codierung' }, () => {
    const N = ri(5, 3000), b = Math.ceil(Math.log2(N));
    return {
      prompt: `Es sollen \\(${N}\\) verschiedene Werte mit einem Binärcode fester Länge codiert werden. Wie viele Bits sind mindestens nötig?`,
      answers: [{ label: 'Bits', value: b }],
      steps: [`Mit \\(k\\) Bits lassen sich \\(2^k\\) Werte darstellen. Gesucht ist das kleinste \\(k\\) mit \\(2^k \\geq ${N}\\).`, `\\(2^{${b - 1}} = ${2 ** (b - 1)} < ${N} \\leq 2^{${b}} = ${2 ** b}\\) → \\(k = ${b}\\)`]
    };
  });
  add('informatik', { id: 'inf-binsuche', topic: 'Algorithmen', title: 'Binäre Suche: maximale Vergleiche' }, () => {
    const n = ri(10, 100000), k = Math.floor(Math.log2(n)) + 1;
    return {
      prompt: `Eine sortierte Liste enthält \\(${n.toLocaleString('de-DE')}\\) Elemente. Wie viele Vergleiche braucht die binäre Suche im schlechtesten Fall höchstens?`,
      answers: [{ label: 'Vergleiche', value: k }],
      steps: [`Jeder Vergleich halbiert den Suchbereich. Im schlechtesten Fall: \\(\\lfloor\\log_2 n\\rfloor + 1\\) Vergleiche.`, `\\(\\log_2 ${n} \\approx ${dec(Math.log2(n))}\\) → \\(${k - 1} + 1 = ${k}\\)`]
    };
  });
  add('informatik', { id: 'inf-subnetz', topic: 'Theorie & Netze', title: 'Subnetz: nutzbare Hostadressen' }, () => {
    const p = ri(20, 29), h = 2 ** (32 - p) - 2;
    return {
      prompt: `Ein IPv4-Netz hat das Präfix \\(/${p}\\). Wie viele Adressen können an Hosts vergeben werden?`,
      answers: [{ label: 'Hosts', value: h }],
      steps: [`Für Hosts bleiben \\(32 - ${p} = ${32 - p}\\) Bit, also \\(2^{${32 - p}} = ${h + 2}\\) Adressen.`, `Netz- und Broadcastadresse abziehen: \\(${h + 2} - 2 = ${h}\\)`]
    };
  });

  add('wirtschaft', { id: 'wi-gleichgewicht', topic: 'Markt', title: 'Marktgleichgewicht berechnen' }, () => {
    const p = ri(4, 20), x = ri(20, 80), b = ri(1, 4), d = ri(1, 4), a = x + b * p, c = x - d * p;
    return {
      prompt: `Auf einem Markt gilt die Nachfragefunktion \\(x_N = ${a} - ${b === 1 ? '' : b}p\\) und die Angebotsfunktion \\(x_A = ${c < 0 ? '-' + -c : c} + ${d === 1 ? '' : d}p\\) (\\(p\\) in €). Berechnen Sie den Gleichgewichtspreis \\(p^*\\) und die Gleichgewichtsmenge \\(x^*\\).`,
      answers: [{ label: 'p* (€)', value: p }, { label: 'x*', value: x }],
      steps: [`Im Gleichgewicht gilt \\(x_N = x_A\\): \\(${a} - ${b}p = ${c} + ${d}p\\)`, `\\(${a - c} = ${b + d}p\\) → \\(p^* = ${p}\\)`, `\\(x^* = ${a} - ${b}\\cdot ${p} = ${x}\\)`]
    };
  });
  add('wirtschaft', { id: 'wi-elastizitaet', topic: 'Markt', title: 'Preiselastizität der Nachfrage' }, () => {
    const p1 = ri(2, 10) * 5, dp = pick([-20, -10, 10, 20]), p2 = p1 * (1 + dp / 100), x1 = ri(10, 50) * 10, dx = pick([5, 10, 15, 25, 30, 40]) * -Math.sign(dp), x2 = x1 * (1 + dx / 100), e = (dx / 100) / (dp / 100);
    return {
      prompt: `Der Preis eines Gutes ändert sich von \\(${dec(p1)}\\,€\\) auf \\(${dec(p2)}\\,€\\). Die nachgefragte Menge ändert sich dadurch von \\(${x1}\\) auf \\(${dec(x2, 1)}\\) Stück. Berechnen Sie die Preiselastizität der Nachfrage (bezogen auf die Ausgangswerte).`,
      answers: [{ label: 'ε', value: e, tol: 0.011 }],
      steps: [`Relative Mengenänderung: \\(\\frac{${dec(x2, 1)} - ${x1}}{${x1}} = ${dec(dx / 100)}\\); relative Preisänderung: \\(\\frac{${dec(p2)} - ${dec(p1)}}{${dec(p1)}} = ${dec(dp / 100)}\\)`, `\\(\\varepsilon = \\frac{${dec(dx / 100)}}{${dec(dp / 100)}} = ${dec(e)}\\) – ${Math.abs(e) > 1 ? 'elastische' : Math.abs(e) < 1 ? 'unelastische' : 'proportional reagierende'} Nachfrage.`]
    };
  });
  add('wirtschaft', { id: 'wi-realwachstum', topic: 'Kennzahlen', title: 'Nominales und reales Wachstum' }, () => {
    const B1 = ri(30, 45) * 100, n = ri(10, 80) / 10, i = ri(5, 60) / 10, B2 = B1 * (1 + n / 100), r = ((1 + n / 100) / (1 + i / 100) - 1) * 100;
    return {
      prompt: `Das nominale BIP steigt von \\(${B1}\\) auf \\(${dec(B2, 1)}\\) Mrd. €. Die Inflationsrate (BIP-Deflator) beträgt \\(${dec(i, 1)}\\,\\%\\). Berechnen Sie das nominale und das reale Wachstum in % (2 Nachkommastellen).`,
      answers: [{ label: 'nominal (%)', value: rd(n, 2), tol: 0.011 }, { label: 'real (%)', value: rd(r, 2), tol: 0.011 }],
      steps: [`Nominal: \\(\\frac{${dec(B2, 1)} - ${B1}}{${B1}}\\cdot 100\\,\\% = ${dec(n)}\\,\\%\\)`, `Real (preisbereinigt): \\(\\left(\\frac{1 + ${dec(n / 100, 3)}}{1 + ${dec(i / 100, 3)}} - 1\\right)\\cdot 100\\,\\% \\approx ${dec(r)}\\,\\%\\) (Faustregel: nominal − Inflation \\(\\approx ${dec(n - i, 1)}\\,\\%\\))`]
    };
  });

  add('geographie', { id: 'gg-verdopplung', topic: 'Bevölkerung & Stadt', title: 'Verdopplungszeit einer Bevölkerung' }, () => {
    const r = ri(5, 35) / 10, T = Math.log(2) / Math.log(1 + r / 100);
    return {
      prompt: `Die Bevölkerung eines Landes wächst jährlich um \\(${dec(r, 1)}\\,\\%\\). Nach wie vielen Jahren hat sie sich verdoppelt (exakt berechnet, 1 Nachkommastelle)?`,
      answers: [{ label: 'Jahre', value: rd(T, 1), tol: 0.11 }],
      steps: [`\\(2 = (1 + ${dec(r / 100, 3)})^T\\) → \\(T = \\frac{\\ln 2}{\\ln(1{,}${String(Math.round(r * 10)).padStart(3, '0')})}\\)`, `\\(T \\approx ${dec(T, 1)}\\) Jahre (Faustregel: \\(70 : ${dec(r, 1)} \\approx ${dec(70 / r, 1)}\\))`]
    };
  });
  add('geographie', { id: 'gg-dichte', topic: 'Bevölkerung & Stadt', title: 'Bevölkerungsdichte' }, () => {
    const E = ri(5, 900) * 100000, A = ri(20, 900) * 1000, d = E / A;
    return {
      prompt: `Ein Staat hat \\(${E.toLocaleString('de-DE')}\\) Einwohner und eine Fläche von \\(${A.toLocaleString('de-DE')}\\,\\mathrm{km^2}\\). Berechnen Sie die Bevölkerungsdichte in Einwohnern pro km² (1 Nachkommastelle).`,
      answers: [{ label: 'E/km²', value: rd(d, 1), tol: 0.11 }],
      steps: [`Bevölkerungsdichte = Einwohner : Fläche`, `\\(${E.toLocaleString('de-DE')} : ${A.toLocaleString('de-DE')} \\approx ${dec(d, 1)}\\,\\mathrm{\\tfrac{E}{km^2}}\\)`]
    };
  });
  add('geographie', { id: 'gg-massstab', topic: 'Geofaktoren', title: 'Maßstab: Entfernung berechnen' }, () => {
    const M = pick([25000, 50000, 100000, 200000, 500000]), cm = ri(15, 150) / 10, km = cm * M / 100000;
    return {
      prompt: `Auf einer Karte im Maßstab \\(1 : ${M.toLocaleString('de-DE')}\\) sind zwei Orte \\(${dec(cm, 1)}\\,\\mathrm{cm}\\) voneinander entfernt. Wie groß ist die Entfernung in der Wirklichkeit in km?`,
      answers: [{ label: 'km', value: rd(km, 3), tol: 0.0051 }],
      steps: [`\\(1\\,\\mathrm{cm}\\) auf der Karte entspricht \\(${M.toLocaleString('de-DE')}\\,\\mathrm{cm} = ${dec(M / 100000, 2)}\\,\\mathrm{km}\\)`, `\\(${dec(cm, 1)}\\cdot ${dec(M / 100000, 2)}\\,\\mathrm{km} = ${dec(km, 3)}\\,\\mathrm{km}\\)`]
    };
  });

  global.SubjectGens = S;
})(window);
