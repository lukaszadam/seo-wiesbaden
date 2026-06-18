---
title: "Sitemap richtig konfigurieren: So findet Google alle wichtigen Seiten"
slug: "sitemap-richtig-konfigurieren"
description: "Welche Seiten gehören in die Sitemap, welche nicht? Praxisnahe Anleitung zur optimalen Sitemap-Konfiguration für bessere Indexierung."
pubDate: "2026-06-18"
updatedDate: "2026-06-18"
draft: false
researchSources:
  - title: "Newb here- best tools for Local/GBP?"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8sd2k/newb_here_best_tools_for_localgbp/"
  - title: "Site map configurations"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8q0dm/site_map_configurations/"
  - title: "Where to start for clients with purchased backlinks?"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8jp1v/where_to_start_for_clients_with_purchased/"
  - title: "How many of you focus ONLY on backlinking strategies that don't require any sort of payments / placement fees?"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8k29i/how_many_of_you_focus_only_on_backlinking/"
  - title: "Does keyword stacking dilute visibility?"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8kjq3/does_keyword_stacking_dilute_visibility/"
  - title: "Client's website reported to cybersecurity firms as malicious"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8d9bq/clients_website_reported_to_cybersecurity_firms/"
  - title: "Will changing the Meta Title of a page currently on page 2 of Google impact its SEO and ranking?"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8el0b/will_changing_the_meta_title_of_a_page_currently/"
  - title: "Homepage outranking blog post for keyword"
    subreddit: "SEO"
    url: "https://www.reddit.com/r/SEO/comments/1u8ablq/homepage_outranking_blog_post_for_keyword/"
---

Eine gut konfigurierte Sitemap ist wie ein Stadtplan für Google – sie zeigt der Suchmaschine, welche Seiten Ihrer Website wirklich wichtig sind und indexiert werden sollen. Viele Unternehmen im Rhein-Main-Gebiet haben zwar eine Sitemap, verschwenden aber wertvolles Crawling-Budget durch falsche Konfiguration.

In diesem Artikel erfahren Sie konkret, welche Seiten in Ihre Sitemap gehören und welche Sie besser ausschließen sollten. Mit der richtigen Konfiguration helfen Sie Google, Ihre wichtigsten Inhalte schneller zu finden und zu ranken.

## Ausgangslage verstehen

Eine XML-Sitemap ist eine strukturierte Liste Ihrer Webseiten, die Sie an Google übermitteln. Sie signalisiert der Suchmaschine, welche URLs existieren und wie wichtig sie sind. Die Sitemap ist besonders wertvoll für neue Websites, tiefverschachtelte Seiten oder Inhalte, die über die interne Verlinkung schwer erreichbar sind.

Wichtig zu verstehen: Die Aufnahme in die Sitemap garantiert keine Indexierung. Google entscheidet selbst, welche Seiten tatsächlich in den Index aufgenommen werden. Die Sitemap ist eine Empfehlung, keine Anweisung. Umgekehrt können Seiten auch indexiert werden, die nicht in der Sitemap stehen – solange sie über interne Links erreichbar sind.

Dennoch ist eine sauber konfigurierte Sitemap ein wichtiges Signal. Sie zeigt Google die Prioritäten Ihrer Website und hilft bei der Ressourcenverteilung beim Crawling.

## Wichtige Grundlagen

Nehmen Sie grundsätzlich alle Seiten auf, die Sie indexiert haben möchten und die echten Mehrwert für Suchende bieten:

**Produktseiten und Dienstleistungen**: Ihre Kerngeschäft-Seiten haben höchste Priorität. Für ein Handwerksunternehmen wären das beispielsweise alle Serviceleistungen wie Badezimmer-Sanierung, Heizungsinstallation oder Notdienst.

**Informative Blogartikel**: Ratgeber und Fachartikel, die relevante Fragen beantworten. Achten Sie darauf, dass diese Inhalte aktuell und hochwertig sind.

**Hauptkategorie-Seiten**: Übersichtsseiten, die mehrere Unterseiten zusammenfassen und eigenständigen Mehrwert bieten – nicht nur Listen von Links.

**Lokale Standortseiten**: Wenn Sie mehrere Niederlassungen haben, sollte jede Standortseite mit eigenständigem Inhalt in die Sitemap aufgenommen werden.

Für lokale Unternehmen ist es sinnvoll, die Priorität explizit zu setzen: Ihre wichtigsten Conversion-Seiten sollten in der Sitemap die höchste Priorität (0.8 bis 1.0) erhalten.

## Praktische Umsetzung

Ebenso wichtig wie die richtigen Seiten einzuschließen ist es, bestimmte Seiten bewusst auszuschließen:

**Duplikate und Parametervarianten**: Wenn Sie Filterfunktionen oder Sortieroptionen haben, die dieselben Inhalte mit unterschiedlichen URLs erzeugen, schließen Sie diese aus. Beispiel: Ein Produktkatalog mit Farbfilter sollte nur die Hauptkatalogseite in der Sitemap haben.

**Seiten mit noindex-Tag**: Es ist widersprüchlich, Google eine Seite in der Sitemap anzubieten und gleichzeitig mit noindex von der Indexierung auszuschließen. Die Search Console wird Sie auf solche Konflikte hinweisen.

**Technische und Admin-Seiten**: Login-Bereiche, Warenkörbe, interne Suchseiten, Dankeseiten nach Formulareinsendungen – all das hat in der Sitemap nichts zu suchen.

**Veraltete oder minderwertige Inhalte**: Alte Pressemitteilungen ohne Relevanz, dünne Inhalte oder Seiten, die Sie eigentlich löschen sollten, gehören nicht in die Sitemap. Nutzen Sie die Sitemap-Konfiguration als Anlass für einen Content-Audit.

**Tag- und Schlagwortseiten**: Automatisch generierte Tag-Seiten haben oft wenig eigenständigen Wert und erzeugen Duplicate-Content-Probleme. Schließen Sie diese aus, es sei denn, Sie pflegen sie redaktionell.

## Haeufige Fehler

Die konkrete Konfiguration hängt von Ihrem Content-Management-System ab:

**WordPress**: Plugins wie Yoast SEO oder RankMath bieten granulare Kontrolle. Sie können nach Post-Typen, Kategorien und einzelnen Seiten festlegen, was in die Sitemap aufgenommen wird. Deaktivieren Sie in den Einstellungen die automatische Aufnahme von Tag-Seiten und Medien-Anhängen.

**Shopify**: Die Sitemap wird automatisch generiert unter `/sitemap.xml`. Sie haben begrenzte Kontrollmöglichkeiten. Setzen Sie auf noindex-Tags für Seiten, die nicht indexiert werden sollen, statt zu versuchen, sie aus der Sitemap zu entfernen.

**Custom-CMS oder statische Seiten**: Erstellen Sie die Sitemap manuell oder über ein Skript. Achten Sie auf korrektes XML-Format, gültige URLs und sinnvolle Prioritäten. Tools wie Screaming Frog können beim Generieren helfen.

Generell gilt: Wenn Ihre Website mehr als 50.000 URLs hat, teilen Sie die Sitemap in mehrere Dateien auf und verwenden Sie eine Sitemap-Index-Datei.

## Prioritaeten setzen

**Fehler 1: Alle Seiten mit gleicher Priorität**: Wenn alle URLs die Priorität 0.5 haben, geben Sie Google keine Orientierung. Setzen Sie Ihre wichtigsten Seiten auf 0.8 oder höher, weniger wichtige auf 0.3 bis 0.5.

**Fehler 2: Veraltete URLs in der Sitemap**: Nach einem Relaunch oder nach dem Löschen von Seiten bleiben oft alte URLs in der Sitemap. Prüfen Sie regelmäßig die Search Console auf Fehler beim Abrufen der Sitemap.

**Fehler 3: Redirects in der Sitemap**: Wenn eine URL in Ihrer Sitemap auf eine andere umleitet (301 oder 302), verwirren Sie Google. Nehmen Sie nur die finale Ziel-URL auf.

**Fehler 4: Zu viele unwichtige Seiten**: Eine Sitemap mit 10.000 URLs, von denen nur 500 wirklich relevant sind, verschwendet Googles Crawling-Budget. Konzentrieren Sie sich auf Qualität statt Quantität.

**Fehler 5: Fehlende changefreq- oder lastmod-Angaben**: Wenn Sie häufig aktualisierten Content haben, helfen diese Angaben Google zu verstehen, wie oft neu gecrawlt werden sollte. Für statische Seiten können Sie diese Angaben weglassen.

## Ergebnisse messen

Nach der initialen Konfiguration ist regelmäßiges Monitoring wichtig:

**Google Search Console prüfen**: Unter "Sitemaps" sehen Sie, wie viele URLs Sie eingereicht haben und wie viele davon tatsächlich indexiert wurden. Eine große Diskrepanz deutet auf Probleme hin.

**Abdeckungsbericht analysieren**: Dieser zeigt, welche Seiten aus der Sitemap Google nicht indexieren konnte oder wollte – und warum. Häufige Gründe sind noindex-Tags, Canonical-Weiterleitungen oder Qualitätsprobleme.

**Regelmäßige Aktualisierung**: Wenn Sie neue Inhalte veröffentlichen, reichen Sie die Sitemap erneut ein. Bei WordPress-Plugins geschieht das meist automatisch, bei manuellen Sitemaps müssen Sie aktiv werden.

**Separate Sitemaps für verschiedene Content-Typen**: Für größere Websites mit verschiedenen Bereichen (Blog, Produkte, Standorte) ist es sinnvoll, separate Sitemaps zu erstellen. Das vereinfacht die Analyse und ermöglicht differenzierte Prioritäten.

Ein praktischer Tipp für lokale Unternehmen: Aktualisieren Sie die lastmod-Angabe für saisonale Dienstleistungen bewusst zu Saisonbeginn. Das signalisiert Google, dass diese Seiten aktuell besonders relevant sind.

## Naechste Schritte

Lokale Geschäfte haben spezielle Anforderungen an ihre Sitemap-Konfiguration:

**Standortseiten priorisieren**: Wenn Sie mehrere Filialen haben, sollte jede Standortseite prominent in der Sitemap vertreten sein. Achten Sie darauf, dass jede Seite einzigartige Inhalte hat – nicht nur die Adresse, sondern auch Öffnungszeiten, lokale Ansprechpartner, Bilder des Standorts.

**Regionale Landingpages**: Seiten, die auf lokale Suchanfragen optimiert sind (z.B. "Sanitärinstallation Mainz" für einen Handwerksbetrieb aus der Region), sollten hohe Priorität erhalten.

**Aktualität signalisieren**: Für Branchen mit saisonalen Schwankungen (Gartenbau, Winterdienst, etc.) hilft es, die lastmod-Angabe strategisch zu nutzen und vor der Hauptsaison zu aktualisieren.

**Keine Überoptimierung**: Erstellen Sie nicht künstlich Dutzende fast identischer Seiten für jeden Stadtteil. Das verwässert die Qualität Ihrer Sitemap und wird von Google zunehmend kritisch gesehen.

Für viele lokale Unternehmen ist eine übersichtliche, schlanke Sitemap mit 20-100 hochwertigen Seiten effektiver als eine aufgeblähte mit 500 minderwertigen URLs.

## FAQ

### Wie oft sollte ich meine Sitemap aktualisieren?

Bei regelmäßigen Content-Updates (z.B. Blog) automatisch nach jeder Veröffentlichung. Für statische Websites reicht eine Aktualisierung bei größeren Änderungen. Wichtig: Google muss nicht bei jeder Kleinigkeit informiert werden, aber neue wichtige Seiten sollten zeitnah aufgenommen werden.

### Muss ich eine Sitemap haben, wenn meine Website klein ist?

Technisch nicht zwingend – Google findet Seiten auch über interne Links. Aber selbst für kleine Websites mit 10-20 Seiten ist eine Sitemap sinnvoll: Sie beschleunigt die Indexierung neuer Inhalte und gibt Ihnen bessere Einblicke in der Search Console.

### Warum werden nicht alle Sitemap-URLs indexiert?

Das ist normal. Google entscheidet selbst, welche Seiten wertvoll genug für den Index sind. Gründe für Nicht-Indexierung: dünner Content, Duplikate, technische Probleme, noindex-Tags oder einfach niedrige Priorität aus Googles Sicht. Prüfen Sie den Abdeckungsbericht in der Search Console für Details.

## Fazit

Eine gut konfigurierte Sitemap ist kein Hexenwerk, erfordert aber bewusste Entscheidungen: Nehmen Sie nur Seiten auf, die wirklich indexiert werden sollen, setzen Sie sinnvolle Prioritäten und halten Sie die Sitemap aktuell. Für lokale Unternehmen bedeutet das oft: weniger ist mehr. Eine schlanke Sitemap mit 50 hochwertigen Seiten ist effektiver als eine aufgeblähte mit 500 mittelmäßigen URLs. Überwachen Sie regelmäßig die Search Console, um Probleme frühzeitig zu erkennen und Ihre Konfiguration kontinuierlich zu verbessern.
