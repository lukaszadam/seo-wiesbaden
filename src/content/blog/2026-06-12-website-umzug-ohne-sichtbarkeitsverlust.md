---
title: "Website-Umzug ohne Sichtbarkeitsverlust: So gelingt die Migration"
slug: "website-umzug-ohne-sichtbarkeitsverlust"
description: "Website-Migration ohne Rankingverlust: Praktische Checkliste für Weiterleitungen, technische Planung und Sichtbarkeitserhalt bei Domainwechsel."
pubDate: "2026-06-12"
updatedDate: "2026-06-12"
draft: false
researchSources:
  - title: "Website Migration Seo Issue: Q/A"
    subreddit: "TechSEO"
    url: "https://www.reddit.com/r/TechSEO/comments/1u3mod4/website_migration_seo_issue_qa/"
  - title: "What do you think AI trusts most when deciding what to cite?"
    subreddit: "TechSEO"
    url: "https://www.reddit.com/r/TechSEO/comments/1u3l8qt/what_do_you_think_ai_trusts_most_when_deciding/"
  - title: "Quick pulse check with the community"
    subreddit: "TechSEO"
    url: "https://www.reddit.com/r/TechSEO/comments/1u3b0n7/quick_pulse_check_with_the_community/"
---

Ein Website-Umzug ist für viele Unternehmen ein kritischer Moment: Neue Plattform, moderneres Design, bessere Funktionen – doch was passiert mit der mühsam aufgebauten Sichtbarkeit in Suchmaschinen? Tatsächlich scheitern viele Migrationen an technischen Details, die zu massiven Rankingverlusten führen.

In diesem Artikel zeige ich Ihnen, wie Sie einen Website-Umzug strategisch planen und technisch sauber umsetzen, damit Ihre Rankings erhalten bleiben und Ihr organischer Traffic nicht einbricht. Die folgenden Schritte basieren auf bewährten Verfahren aus zahlreichen erfolgreichen Migrationsprojekten.

## Ausgangslage verstehen

Die meisten Probleme bei Website-Umzügen entstehen durch unzureichende Planung und fehlende Kommunikation zwischen Entwicklern, Designern und Online-Marketing-Verantwortlichen. Typische Fehlerquellen sind:

**Fehlende oder falsche Weiterleitungen**: Wenn alte URLs nicht korrekt auf die neuen Seiten umgeleitet werden, verlieren Sie nicht nur Rankings, sondern auch alle Backlinks, die auf diese Seiten verweisen. Google behandelt jede URL als eigenständige Entität – ohne 301-Weiterleitung ist die alte Seite verloren.

**Änderungen an der URL-Struktur ohne Notwendigkeit**: Manche Projekte ändern die komplette URL-Hierarchie, obwohl das bestehende System funktioniert. Jede URL-Änderung ist ein Risiko. Behalten Sie Ihre bewährte Struktur bei, wenn es keinen zwingenden Grund für eine Änderung gibt.

**Blockierte Ressourcen durch robots.txt**: Nicht selten wird die neue Website zunächst mit einer robots.txt-Sperre entwickelt und diese Sperre beim Go-Live vergessen. Das Ergebnis: Google kann die Seite nicht crawlen.

**Verlust von strukturierten Daten**: Schema-Markup, das Rich Snippets ermöglicht, geht bei Plattformwechseln häufig verloren, wenn es nicht explizit in die neue Umgebung übernommen wird.

## Wichtige Grundlagen

Bevor Sie auch nur eine Zeile Code ändern, brauchen Sie ein vollständiges Inventar Ihrer aktuellen Website:

**Crawlen Sie Ihre bestehende Website**: Nutzen Sie Tools wie Screaming Frog oder Sitebulb, um eine komplette Liste aller URLs, Meta-Daten, Überschriften und internen Verlinkungen zu erstellen. Diese Daten sind Ihre Referenz für den Vergleich nach dem Umzug.

**Dokumentieren Sie Ihre wichtigsten Landing Pages**: Welche Seiten generieren den meisten organischen Traffic? Welche ranken für Ihre wichtigsten Keywords? Diese Seiten benötigen besondere Aufmerksamkeit während der Migration.

**Exportieren Sie Ihre Rankings**: Dokumentieren Sie Ihre aktuellen Positionen für relevante Suchbegriffe. Das ermöglicht einen präzisen Vorher-Nachher-Vergleich.

**Analysieren Sie Ihre Backlink-Struktur**: Welche Seiten haben die wertvollsten eingehenden Links? Diese URLs müssen unbedingt korrekt weitergeleitet werden, um den Linkwert zu erhalten.

**Prüfen Sie Ihre Indexierung**: Wie viele Seiten hat Google tatsächlich im Index? Ein site:-Befehl gibt Ihnen eine Übersicht. Vergleichen Sie diese Zahl mit Ihrer tatsächlichen Seitenanzahl.

## Praktische Umsetzung

Weiterleitungen sind der wichtigste technische Aspekt einer Migration. Hier entscheidet sich, ob Ihre Rankings erhalten bleiben:

**Erstellen Sie eine vollständige Weiterleitungs-Tabelle**: Jede alte URL muss einer neuen URL zugeordnet werden. Das Format ist einfach: Spalte 1 = alte URL, Spalte 2 = neue URL, Spalte 3 = HTTP-Statuscode (in der Regel 301).

**Verwenden Sie 301-Weiterleitungen**: Ein 301-Status signalisiert Google, dass die Seite permanent umgezogen ist und die neue URL die alte ersetzt. Der Großteil des Linkwerts wird übertragen.

**Vermeiden Sie Weiterleitungsketten**: Eine URL sollte direkt zur finalen Zieladresse weiterleiten, nicht über mehrere Zwischenstationen. Jeder zusätzliche Schritt verdünnt den übertragenen Wert und verlangsamt die Ladezeit.

**Leiten Sie möglichst 1:1 weiter**: Die beste Weiterleitung führt zu einer thematisch identischen Seite. Wenn Sie eine Produktseite umziehen, sollte sie auf die entsprechende neue Produktseite zeigen, nicht auf eine Kategorieseite.

**Planen Sie für verwaiste Inhalte**: Wenn Sie Seiten nicht übernehmen wollen, leiten Sie sie auf die thematisch nächste relevante Seite weiter. Nur bei völlig irrelevanten Inhalten sollten Sie einen 410-Status (Gone) verwenden.

## Haeufige Fehler

Niemand sollte eine Migration direkt auf der Live-Website durchführen. Eine Staging-Umgebung ist unverzichtbar:

**Replizieren Sie die komplette neue Website**: Die Testumgebung sollte technisch identisch mit der späteren Live-Version sein – gleiche Serverumgebung, gleiches CMS, gleiche Plugins.

**Blockieren Sie die Staging-Umgebung für Suchmaschinen**: Verwenden Sie robots.txt oder HTTP-Authentifizierung, damit Google die Testversion nicht indexiert. Setzen Sie zusätzlich einen noindex-Meta-Tag.

**Führen Sie einen vollständigen Crawl durch**: Crawlen Sie die Staging-Website genau wie die alte Seite. Vergleichen Sie die Ergebnisse: Haben alle wichtigen Seiten die richtigen Titel und Beschreibungen? Sind strukturierte Daten vorhanden? Funktionieren interne Links?

**Testen Sie alle Weiterleitungen**: Implementieren Sie Ihre Weiterleitungs-Tabelle auf dem Staging-Server und prüfen Sie stichprobenartig, ob alte URLs korrekt zur neuen Adresse führen und den richtigen Statuscode liefern.

**Prüfen Sie die mobile Darstellung**: Google verwendet Mobile-First-Indexing. Ihre neue Website muss auf Smartphones einwandfrei funktionieren.

**Messen Sie die Ladezeit**: Core Web Vitals sind Rankingfaktoren. Wenn Ihre neue Website deutlich langsamer lädt als die alte, haben Sie ein Problem.

## Prioritaeten setzen

Der Moment des Umzugs erfordert besondere Aufmerksamkeit:

**Wählen Sie einen verkehrsarmen Zeitpunkt**: Ein Umzug am Sonntagabend verursacht weniger Störungen als einer am Montagmorgen. Vermeiden Sie Ihre Hauptgeschäftszeiten.

**Checken Sie die robots.txt**: Stellen Sie sicher, dass die neue Website nicht mehr für Crawler gesperrt ist. Dieser Fehler passiert erschreckend häufig.

**Entfernen Sie noindex-Tags**: Falls Sie auf der Staging-Umgebung noindex gesetzt haben, muss dieser Tag auf der Live-Site weg.

**Reichen Sie die neue Sitemap ein**: Laden Sie Ihre aktuelle XML-Sitemap in der Google Search Console hoch. Das beschleunigt das Crawling der neuen Struktur.

**Nutzen Sie das Adressänderungs-Tool**: Wenn Sie die Domain wechseln, informieren Sie Google über die Search Console mit dem Tool für Adressänderungen. Das hilft bei der Zuordnung der Signale.

**Überwachen Sie Fehlerseiten**: Checken Sie in der Search Console täglich die 404-Fehler. Jeder 404 ist eine fehlende oder falsche Weiterleitung, die Sie nachbessern sollten.

**Beobachten Sie die Indexierung**: Nutzen Sie den site:-Befehl, um zu sehen, wie schnell Google die neuen URLs aufnimmt und die alten aus dem Index entfernt.

## Ergebnisse messen

Nach dem Go-Live beginnt die intensive Überwachungsphase:

**Prüfen Sie täglich die Search Console**: Achten Sie auf Crawl-Fehler, Indexierungsprobleme und manuelle Maßnahmen. Die ersten 7-14 Tage sind kritisch.

**Vergleichen Sie Traffic-Daten**: Leichte Schwankungen sind normal, aber ein Einbruch von mehr als 20-30% deutet auf Probleme hin. Analysieren Sie, welche Seiten betroffen sind.

**Monitoren Sie Ihre Rankings**: Die wichtigsten Keywords sollten Sie täglich checken. Größere Verschiebungen zeigen, wo Weiterleitungen fehlen oder Inhalte verloren gingen.

**Dokumentieren Sie Auffälligkeiten**: Führen Sie ein Logbuch mit allen beobachteten Problemen und Ihren Lösungen. Das hilft bei zukünftigen Projekten.

**Behalten Sie die Ladezeiten im Blick**: Nutzen Sie PageSpeed Insights und die Core Web Vitals-Berichte in der Search Console, um sicherzustellen, dass die Performance stimmt.

**Korrigieren Sie Fehler schnell**: Jeder Tag mit fehlerhaften Weiterleitungen oder nicht erreichbaren Seiten schadet Ihren Rankings. Priorisieren Sie Fixes nach Traffic-Relevanz.

## Naechste Schritte

Manche Migrationen haben besondere Herausforderungen:

**Domainwechsel**: Wenn Sie die Domain ändern, behalten Sie die alte Domain mindestens ein Jahr und leiten Sie dauerhaft weiter. Aktualisieren Sie alle externen Verlinkungen, die Sie kontrollieren können – besonders in Ihrem Google Business Profil, auf Social-Media-Kanälen und in Verzeichnissen.

**Plattformwechsel** (z.B. von WordPress zu Shopify): Unterschiedliche CMS-Systeme haben oft völlig verschiedene URL-Strukturen. Hier ist eine saubere Mapping-Tabelle besonders wichtig. Prüfen Sie, ob sich Meta-Daten automatisch migrieren lassen oder ob Sie diese manuell übertragen müssen.

**HTTPS-Migration**: Wenn Sie von HTTP auf HTTPS umstellen, ist das technisch eine Migration. Leiten Sie alle HTTP-URLs per 301 auf die HTTPS-Variante weiter. Aktualisieren Sie interne Links auf das neue Protokoll. Reichen Sie die HTTPS-Version als neue Property in der Search Console ein.

**Mehrsprachige Websites**: Achten Sie darauf, dass hreflang-Tags korrekt implementiert sind. Jede Sprachversion sollte auf die entsprechende neue URL zeigen.

**Konsolidierung mehrerer Domains**: Wenn Sie mehrere Websites zusammenführen, vermeiden Sie Duplicate Content. Wählen Sie pro Thema eine primäre Seite und leiten Sie ähnliche Inhalte dorthin weiter.

## FAQ

### Wie lange dauert es, bis Google eine Website-Migration vollständig verarbeitet hat?

Google benötigt typischerweise 2-4 Wochen, um eine Migration zu verarbeiten, wobei die wichtigsten Seiten oft schon nach wenigen Tagen neu indexiert sind. Bei größeren Websites mit mehreren tausend Seiten kann der komplette Prozess auch 2-3 Monate dauern. Die Geschwindigkeit hängt von Ihrer Crawl-Rate und der Qualität Ihrer Weiterleitungen ab.

### Kann ich während einer Migration Rankings verlieren, auch wenn alles technisch korrekt läuft?

Leichte Schwankungen von 5-15% sind bei Migrationen normal und gleichen sich meist innerhalb weniger Wochen aus. Google benötigt Zeit, um die Signale der alten URLs auf die neuen zu übertragen. Größere oder dauerhafte Verluste deuten auf technische Probleme, fehlende Weiterleitungen oder Qualitätsverluste im Content hin.

### Sollte ich alte URLs auch Jahre nach einer Migration noch weiterleiten lassen?

Ja, idealerweise sollten Weiterleitungen permanent bestehen bleiben. Backlinks können noch Jahre später Traffic und Rankingwert liefern. Wenn Sie Weiterleitungen entfernen, verlieren Sie diesen Wert. Die technische Last ist minimal, der Nutzen kann erheblich sein – besonders für wichtige Seiten mit vielen eingehenden Links.

## Fazit

Eine erfolgreiche Website-Migration erfordert sorgfältige Planung, präzise technische Umsetzung und konsequentes Monitoring. Die drei Erfolgsfaktoren sind: eine vollständige Weiterleitungs-Tabelle, gründliches Testing in der Staging-Umgebung und tägliche Überwachung in den ersten Wochen nach dem Go-Live. Wer diese Grundlagen beachtet, kann einen Website-Umzug ohne nennenswerte Sichtbarkeitsverluste durchführen und die neue technische Basis für zukünftiges Wachstum nutzen.
