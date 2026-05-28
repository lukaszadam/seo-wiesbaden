---
title: "Warum Google nur einen Bruchteil Ihrer Seiten indexiert – und was jetzt hilft"
slug: "google-indexiert-nur-wenige-seiten"
description: "Neue Website, aber Google indexiert nur 5 von 30 Seiten? Erfahren Sie die häufigsten Ursachen und konkrete Lösungen für bessere Indexierung."
pubDate: "2026-05-28"
updatedDate: "2026-05-28"
draft: false
researchSources:
  - title: "Perfume Bar"
    subreddit: "smallbusiness"
    url: "https://www.reddit.com/r/smallbusiness/comments/1tpxfvn/perfume_bar/"
  - title: "A lot of local service business owners hit a revenue wall. Want to scale your local service business?"
    subreddit: "smallbusiness"
    url: "https://www.reddit.com/r/smallbusiness/comments/1tpxdm7/a_lot_of_local_service_business_owners_hit_a/"
  - title: "[ Removed by Reddit ]"
    subreddit: "smallbusiness"
    url: "https://www.reddit.com/r/smallbusiness/comments/1tpww66/removed_by_reddit/"
  - title: "I need a cold outrea h salesman for my agency"
    subreddit: "smallbusiness"
    url: "https://www.reddit.com/r/smallbusiness/comments/1tpwnz3/i_need_a_cold_outrea_h_salesman_for_my_agency/"
  - title: "Am I going to lose my job? Bossman discovered AI"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1tpwb58/am_i_going_to_lose_my_job_bossman_discovered_ai/"
  - title: "Am I going to lose my job? Bossman discovered AI"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1tpwb58/am_i_going_to_lose_my_job_bossman_discovered_ai/"
  - title: "New site, Google only indexed 5 of my 30 pages after 1 month"
    subreddit: "bigseo"
    url: "https://www.reddit.com/r/bigseo/comments/1tpwe5n/new_site_google_only_indexed_5_of_my_30_pages/"
  - title: "New site, Google only indexed 5 of my 30 pages after 1 month"
    subreddit: "bigseo"
    url: "https://www.reddit.com/r/bigseo/comments/1tpwe5n/new_site_google_only_indexed_5_of_my_30_pages/"
---

Sie haben eine neue Website mit 30 sorgfältig erstellten Seiten veröffentlicht, aber nach einem Monat zeigt die Google Search Console nur 5 indexierte Seiten an. Dieses Phänomen ist frustrierend, aber keineswegs selten – besonders bei neuen Websites ohne etablierte Autorität.

Die gute Nachricht: In den meisten Fällen lässt sich das Problem systematisch beheben. Die Ursachen reichen von technischen Blockaden über fehlende interne Verlinkung bis hin zu Qualitätssignalen, die Google davon abhalten, Ihre Inhalte in den Index aufzunehmen. Dieser Artikel zeigt Ihnen die häufigsten Gründe und konkrete Maßnahmen.

## Ausgangslage verstehen

Bevor Google eine Seite indexieren kann, muss sie überhaupt zugänglich sein. Überprüfen Sie zunächst Ihre **robots.txt-Datei** unter `ihredomain.de/robots.txt`. Achten Sie darauf, dass keine wichtigen Verzeichnisse oder Seiten durch `Disallow`-Anweisungen blockiert werden.

Kontrollieren Sie anschließend die **Meta-Robots-Tags** im Quellcode Ihrer Seiten. Ein `<meta name="robots" content="noindex">` verhindert die Indexierung vollständig. Entwickler setzen diese Tags oft während der Bauphase und vergessen sie zu entfernen. In der Google Search Console finden Sie unter "Seiten" > "Warum Seiten nicht indexiert sind" konkrete Hinweise zu blockierten Seiten.

Prüfen Sie auch Ihre **XML-Sitemap**. Sie sollte alle wichtigen Seiten enthalten und korrekt in der Search Console eingereicht sein. Fehlende Seiten in der Sitemap werden deutlich langsamer entdeckt, besonders wenn die interne Verlinkung schwach ist.

## Wichtige Grundlagen

Google weist jeder Website ein bestimmtes **Crawl-Budget** zu – die Anzahl der Seiten, die der Googlebot innerhalb eines bestimmten Zeitraums besucht. Neue Websites ohne etablierte Backlinks und Traffic-Historie erhalten ein sehr begrenztes Budget. Das bedeutet: Google crawlt Ihre Seiten langsamer und selektiver.

Bei einer neuen Website mit 30 Seiten ist es durchaus normal, dass nach vier Wochen erst ein Teil indexiert ist. Google testet zunächst, ob Ihre Inhalte relevant sind und Nutzer sie finden. Erhält Google positive Signale (Klicks aus der Suche, geringe Absprungraten, Verweildauer), steigt das Crawl-Budget schrittweise.

Sie können den Prozess beschleunigen, indem Sie die **URL-Prüfung** in der Search Console nutzen und einzelne Seiten manuell zur Indexierung anfordern. Nutzen Sie diese Funktion jedoch strategisch für Ihre wichtigsten Seiten – eine massenhafte Nutzung bringt keinen Vorteil. Konzentrieren Sie sich auf Seiten mit kommerziellem Wert oder hohem Informationsgehalt.

## Praktische Umsetzung

Eine der am häufigsten übersehenen Ursachen für schlechte Indexierung ist **schwache interne Verlinkung**. Wenn eine Seite nur über die XML-Sitemap erreichbar ist, aber nicht über natürliche Links von anderen Seiten Ihrer Website, sendet das ein schwaches Signal an Google.

Stellen Sie sicher, dass jede wichtige Seite von Ihrer Startseite aus in maximal 3 Klicks erreichbar ist. Setzen Sie thematisch passende interne Links in Ihren Texten. Eine Unterseite über "Keyword-Recherche für lokale Dienstleister" sollte beispielsweise von Ihrer Hauptseite zu lokalem Marketing verlinkt sein – und umgekehrt.

Verwenden Sie aussagekräftige **Ankertexte** statt generischer Formulierungen wie "hier klicken". Ein Link mit dem Text "Technische Anforderungen für schnelle Ladezeiten" gibt Google deutlich mehr Kontext als "mehr erfahren". Eine durchdachte interne Verlinkungsstruktur beschleunigt nicht nur die Indexierung, sondern verbessert auch die Verteilung der Link-Autorität über Ihre gesamte Website.

## Haeufige Fehler

Google indexiert nicht automatisch jede Seite – der Algorithmus bewertet, ob Inhalte einen **Mehrwert** bieten. Dünne Seiten mit wenig Text, generischen Formulierungen oder duplizierten Inhalten werden häufig nicht aufgenommen oder als "Entdeckt – zurzeit nicht indexiert" markiert.

Überprüfen Sie Ihre nicht indexierten Seiten kritisch: Bieten sie substanzielle Informationen? Eine Produktseite mit 150 Wörtern Standardtext wird schwerer indexiert als eine mit 600 Wörtern, die häufige Kundenfragen beantwortet, technische Details nennt und Anwendungsbeispiele liefert.

Vermeiden Sie **Duplicate Content** zwischen ähnlichen Seiten. Wenn Sie mehrere Standorte bedienen und für jeden eine fast identische Unterseite erstellen, wertet Google das als geringen Mehrwert. Besser: Individuelle Inhalte mit lokalen Bezügen, spezifischen Anfahrtsbeschreibungen, regionalen Besonderheiten und echten Kundenstimmen aus dem jeweiligen Gebiet. Qualität schlägt Quantität – lieber 15 exzellente Seiten als 30 mittelmäßige.

## Prioritaeten setzen

Das **E-E-A-T-Konzept** (Experience, Expertise, Authoritativeness, Trustworthiness) spielt eine wachsende Rolle bei der Indexierungsentscheidung. Google bevorzugt Inhalte von Websites, die Vertrauen und Fachkompetenz ausstrahlen – eine Herausforderung für neue Domains ohne Historie.

Stärken Sie Vertrauenssignale durch vollständiges **Impressum**, **Datenschutzerklärung** und eine **Über-uns-Seite** mit echten Gesichtern und Qualifikationen. Nennen Sie Autoren bei Fachartikeln und verlinken Sie auf deren Profilseiten oder externe Nachweise ihrer Expertise (LinkedIn, Fachverbände).

Erstellen Sie Inhalte, die Ihre praktische Erfahrung demonstrieren: Fallbeispiele, konkrete Messwerte, Screenshots aus echten Projekten. Eine Seite über Ladezeit-Optimierung mit Before-After-Vergleichen echter PageSpeed-Scores wirkt authentischer als allgemeine Ratschläge. Externe Backlinks von lokalen Branchenverzeichnissen, der IHK oder Fachmedien beschleunigen den Vertrauensaufbau erheblich.

## Ergebnisse messen

Langsame Websites belasten das Crawl-Budget und können die Indexierung verzögern. Wenn der Googlebot 5 Sekunden auf jede Seite warten muss, schafft er in der gleichen Zeit deutlich weniger Seiten als bei einer Website mit unter 1 Sekunde Ladezeit.

Optimieren Sie die **Core Web Vitals**: Largest Contentful Paint (LCP) sollte unter 2,5 Sekunden liegen, First Input Delay (FID) unter 100 Millisekunden, Cumulative Layout Shift (CLS) unter 0,1. Die Google Search Console zeigt unter "Core Web Vitals" problematische Seiten an.

Komprimieren Sie Bilder konsequent (WebP-Format, maximal 100-200 KB für Headerbilder), nutzen Sie **Browser-Caching**, aktivieren Sie **Gzip-Komprimierung** auf Serverebene und minimieren Sie CSS und JavaScript. Ein Content Delivery Network (CDN) beschleunigt die Auslieferung zusätzlich. Mobile Performance ist dabei besonders wichtig, da Google primär die mobile Version Ihrer Website indexiert.

## Naechste Schritte

Während Backlinks klassischerweise als Ranking-Faktor gelten, beeinflussen sie auch die Indexierungsgeschwindigkeit. Eine neue Website ohne externe Links wird von Google als weniger relevant eingestuft – mit entsprechend niedrigerem Crawl-Budget.

Setzen Sie auf **lokale Erwähnungen**: Tragen Sie Ihr Unternehmen in Google Business Profile, Bing Places, lokale Branchenverzeichnisse und die Gelben Seiten ein. Diese Links signalisieren Google, dass Ihr Unternehmen real existiert und lokal verankert ist.

Knüpfen Sie Beziehungen zu lokalen Medien, Bloggern oder Geschäftspartnern. Ein Gastbeitrag auf einem regionalen Blog, ein Interview in der Lokalzeitung oder eine Erwähnung auf der Website eines Kooperationspartners beschleunigt die Indexierung merklich. Qualität schlägt auch hier Quantität: 3 thematisch passende Links von vertrauenswürdigen lokalen Quellen bringen mehr als 50 generische Verzeichniseinträge.

## FAQ

### Wie lange dauert es normalerweise, bis Google neue Seiten indexiert?

Bei etablierten Websites mit gutem Crawl-Budget oft wenige Tage. Neue Websites ohne Backlinks benötigen durchschnittlich 4-8 Wochen für die vollständige Indexierung aller Seiten. Mit aktiver Unterstützung (manuelle Indexierungsanfragen, interne Verlinkung, erste Backlinks) lässt sich der Prozess auf 2-4 Wochen verkürzen.

### Sollte ich alle Seiten gleichzeitig zur Indexierung einreichen?

Nein, das ist kontraproduktiv. Konzentrieren Sie sich auf Ihre 5-10 wichtigsten Seiten und reichen Sie diese über die URL-Prüfung in der Search Console ein. Lassen Sie Google dann organisch weitere Seiten über Ihre Sitemap und interne Links entdecken. Massenhafte manuelle Anfragen bringen keinen Vorteil.

### Was bedeutet der Status 'Entdeckt – zurzeit nicht indexiert'?

Google hat die Seite gefunden, aber noch nicht indexiert – meist aufgrund begrenzten Crawl-Budgets oder wahrgenommener geringer Priorität. Das ist bei neuen Websites normal. Verbessern Sie die interne Verlinkung zur betroffenen Seite, erhöhen Sie die Content-Qualität und bauen Sie externe Signale auf. Mit Geduld werden diese Seiten meist nach einigen Wochen indexiert.

## Fazit

Dass Google nur einen Teil Ihrer neuen Seiten indexiert, ist frustrierend, aber in der Regel lösbar. Prüfen Sie systematisch technische Blockaden, stärken Sie Ihre interne Verlinkungsstruktur und optimieren Sie die Content-Qualität. Neue Websites brauchen Geduld und erste Vertrauenssignale durch lokale Backlinks und konsistente Unternehmensdaten. Mit den richtigen Maßnahmen beschleunigen Sie die Indexierung deutlich – oft innerhalb weniger Wochen sichtbar in der Search Console.
