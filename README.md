# Super Paul – iPhone Web-App (PWA)

## Funktionen
- Startwert: 80 Liegestütze + 70 Sekunden Plank
- Ziel: 356 Liegestütze/Tag + 3:00 Min Plank am 31.12.2026
- automatische Zielprogression nach Datum
- Fortschrittsbalken zum Endziel
- Fortschrittsbalken für das heutige Training
- schnelle Erfassung von Liegestütz-Sätzen
- Plank-Timer
- Gesamtsumme aller abgeschlossenen Liegestütze
- Gesamtsumme aller abgeschlossenen Plank-Sekunden
- Bestwerte
- Kontrollpunkte und Historie
- lokale Speicherung im Browser
- Offline-Funktion über Service Worker

## Wichtig: So installierst du die PWA auf dem iPhone

Eine PWA muss über HTTPS ausgeliefert werden. Die Dateien nur direkt vom Mac zu öffnen reicht für die Installation/Offline-Funktion nicht aus.

### Einfachste Variante
1. Lade den Inhalt dieses Ordners bei einem statischen Webhoster hoch, z. B. GitHub Pages, Netlify oder Cloudflare Pages.
2. Öffne die HTTPS-Adresse auf deinem iPhone in Safari.
3. Tippe auf Teilen.
4. Wähle „Zum Home-Bildschirm“.
5. Öffne danach „Super Paul“ über das neue App-Symbol.

## Erinnerungen
Die bestehenden Kalender-Erinnerungen um 18:00 und 18:55 sind weiterhin die zuverlässigste Lösung für das iPhone.
Diese PWA selbst setzt absichtlich keine Web-Push-Benachrichtigungen voraus.

## Datenspeicherung
Die Trainingsdaten werden mit localStorage direkt auf dem Gerät gespeichert.
Wenn Safari-Website-Daten gelöscht werden, können auch diese App-Daten verloren gehen.

## Update v4 – GitHub-Seite
- Neues Trainingsniveau wird erst am tatsächlichen Fälligkeitstag angezeigt.
- Regenerationstage zeigen keine Wiederholungszahl des kommenden Trainings vorab.
- Liegestütz- und Plank-Tagesfortschritt als vertikal füllende Batterie.
- Push-up-Batterie orange, Plank-Batterie grün.
- Bestehende localStorage-Trainingsdaten bleiben erhalten.

## Update v5 – offene Trainings bleiben sichtbar
- Das zuletzt fällige Training bleibt nach seinem Fälligkeitstag sichtbar, solange es noch nicht vollständig erfüllt ist.
- Erfüllt bedeutet: sowohl Liegestütz-Ziel als auch Plank-Ziel wurden erreicht.
- Nach Erfüllung wird bis zum nächsten fälligen Training „Regenerationstag“ angezeigt.
- Fortschritt eines offenen Trainings kann über die Tage bis zum nächsten Trainingstermin weitergeführt werden.

## Update v6
- Liegestütze wieder frei manuell eintragbar.
- Plank zusätzlich manuell als Minuten + Sekunden eintragbar.
- Timer bleibt erhalten.
- Batterieanzeigen aktualisieren sich automatisch.

## Update v8 – Safari/PWA-Update-Fix
- Network-first für HTML und App-Assets.
- Versionierte Asset-URLs mit `?v=8`.
- Service-Worker-Update ohne HTTP-Cache.
- Sofortige Aktivierung und automatische Übernahme.
- Automatischer einmaliger Reload nach Worker-Wechsel.
- Alte PWA-Caches werden gelöscht.
- localStorage-Trainingsdaten bleiben erhalten.

## Update v9 – vergangene Trainings bearbeiten
- Jeder gespeicherte Historien-Eintrag besitzt jetzt eine Schaltfläche „Bearbeiten“.
- Datum, Liegestütze sowie Plank-Minuten und -Sekunden können nachträglich korrigiert werden.
- Ein falscher Eintrag kann vollständig gelöscht werden.
- Bereits vorhandene Historien-Einträge erhalten beim ersten Start automatisch interne IDs.
- Änderungen wirken sofort auf Gesamtwerte und den Status fälliger Trainings.
- Safari/PWA-Update-System auf Version 9 angehoben; bestehende `localStorage`-Daten bleiben erhalten.

## Update v10 – Backup / Restore
- Export aller lokal gespeicherten 356-Coach-Daten als JSON-Datei.
- Import eines zuvor erstellten Backups.
- Vor dem Import erfolgt eine Sicherheitsabfrage.
- Bestehende localStorage-Daten bleiben beim normalen App-Update erhalten.

## Update v11 – Knie/Stabilität
- Mo: Kraft & Kniekontrolle A.
- Mi: leichte Stabilität/Balance.
- Fr: Kraft & Stabilität B.
- Phasenprogression 15.09.–31.12.2026 integriert.
- Dynamische Übungen erst ab 09.11.; einbeinige Sprünge ab 07.12.
- Knieprogramm pro Tag als erledigt markierbar.
- Di/Do/Sa als Joggen/Ruhe, Sonntag als Erholung ausgewiesen.

## Update v12
- Stabilitäts-/Knieprogramm startet bereits am 14.09.2026.
- Montag 14.09. zeigt direkt Kraft & Kniekontrolle A.

## Update v13 – Push-Erinnerungen
- Zwei Erinnerungen an Trainingstagen: 18:00 und 18:55 Uhr.
- iPhone Web Push via OneSignal vorbereitet.
- Push-Ein/Aus direkt in der App.
- GitHub Action plant die täglichen Pushes in Europe/Berlin.
- Mo/Mi/Fr im Zeitraum 14.09.–31.12.2026; zusätzlich Finaltag 31.10.2026.
- OneSignal Worker verwendet einen separaten Scope und kollidiert nicht mit dem PWA-Cache-Worker.
- OneSignal App ID und REST API Key müssen einmalig eingerichtet werden; der REST API Key gehört ausschließlich in GitHub Secrets.

## OneSignal verbunden
- OneSignal App ID eingetragen: `d8303894-40e4-447a-88d9-253b5460b66b`
 
## Update v14 – Sicherheit + einzelne Übungssätze
- Öffentliche PWA und privater Push-Scheduler vollständig getrennt.
- Kein OneSignal API Key und kein GitHub-Actions-Scheduler mehr im öffentlichen Repository.
- App zeigt nach Push-Aktivierung die persönliche OneSignal Subscription-ID zum Kopieren.
- Knie-/Stabilitätsübungen können Satz für Satz abgehakt werden.
- Reihenfolge: zuerst Satz 1 aller Übungen, anschließend Satz 2 aller Übungen usw.
- Optionale Übungen/Sätze werden sichtbar gekennzeichnet und zählen nicht zur Pflichtsatz-Fortschrittsanzeige.
- Bestehende `kneeDone`-Daten werden beim ersten Öffnen in die neue Satzstruktur übernommen.
- Cache-Version auf v14 erhöht.

## Update v15 – OneSignal GitHub-Pages-Fix
- OneSignal-Service-Worker-Pfad berücksichtigt jetzt automatisch den GitHub-Pages-Unterordner `/Pushup_Coach/`.
- Worker-Scope wird dynamisch aus dem aktuellen App-Pfad gebildet.
- Subscription-ID wird nach Opt-in bis zu 20 Sekunden aktiv abgewartet.
- Subscription-Change-Event verwendet die von OneSignal gelieferte aktuelle ID direkt.
- Aussagekräftigere Statusmeldung bei Initialisierungsfehlern.

## Update v16 – GitHub-Upload-freundlicher OneSignal Worker
- `OneSignalSDKWorker.js` liegt direkt im Hauptverzeichnis von `Pushup_Coach`.
- Eigener OneSignal-Scope `/Pushup_Coach/onesignal-push-scope/`.
- Kein Konflikt mit dem PWA-Worker `sw.js`.
- Öffentliche Scheduler-Reste aus dem Paket entfernt.
- Cache-Version auf v16 erhöht.

## Update v17 – Test-Ready UI & horizontale Batterien
- Bereich umbenannt in **Stabilitätsübungen Beine**.
- Jede Übung hat zusätzlich eine horizontale Batterieanzeige.
- Die Batterie füllt sich je nach erledigten Sätzen:
  - 3 Sätze: 33% / 66% / 100%
  - 2 Sätze: 50% / 100%
- Die bisherigen Satz-Checkboxen bleiben erhalten.
- Version/Caches auf v17 angehoben.

## Update v18 – Satzbestätigung per Button
- Bei den Stabilitätsübungen Beine gibt es jetzt pro Übung genau einen Button **"Satz bestätigen"**.
- Jeder Klick bestätigt den nächsten Satz dieser Übung und erhöht die horizontale Batterie entsprechend.
- Die bisherige detaillierte Satz-/Hakenliste wurde entfernt.
- Die Batterie ist jetzt die zentrale Fortschrittsanzeige pro Übung.
- Cache-/Versionsnummer auf v18 erhöht.

## Update v19 – Kurzbeschreibung je Stabilitätsübung
- Unter jeder Stabilitätsübung steht jetzt zusätzlich eine kurze Erklärung.
- So ist direkt in der App ersichtlich, wie die jeweilige Übung ausgeführt werden soll.
- Cache-/Versionsnummer auf v19 erhöht.

## Update v20 – Ausklapp-Funktion
- Unter jeder Stabilitätsübung ist die Erklärung jetzt als **ausklappbare Kurzbeschreibung** eingebaut.
- Die Bereiche **Gesamt**, **Kontrollpunkte**, **Historie**, **Trainingserinnerungen** und **Datensicherung** sind jetzt ebenfalls als Ausklappbereiche organisiert.
- So bleibt die Oberfläche kompakter und übersichtlicher.
- Cache-/Versionsnummer auf v20 erhöht.

## Update v21 – Trainingseintrag speichert Abschlussstatus
- Mit **„Trainingseintrag speichern“** wird das aktuell fällige Training jetzt immer als **abgeschlossen** markiert,
  auch wenn Liegestütze oder Plank unter dem Sollwert liegen.
- Der gespeicherte Eintrag behält dabei weiterhin die tatsächlich eingetragenen Werte.
- Der Abschluss wird intern an das fällige Trainingsdatum gekoppelt, damit das Training am Folgetag nicht erneut als offen erscheint.
- Cache-/Versionsnummer auf v21 erhöht.

## Update v24 – offene Stabilitätsübungen bleiben sichtbar
- Das zuletzt fällige Stabilitätstraining bleibt auch an Folgetagen sichtbar, solange die Pflichtsätze noch nicht abgeschlossen sind.
- Fortschritt und Batteriestände bleiben dem ursprünglichen Fälligkeitstag zugeordnet.
- Auf Folgetagen erscheint zusätzlich **„Fällig seit …“**.
- Nach vollständigem Abschluss erscheint Regeneration bis zum nächsten Stabilitätstermin.
- Satz-Buttons arbeiten auch bei einem überfälligen Stabilitätstraining weiter auf dessen gespeichertem Fortschritt.
- Cache-/Versionsnummer auf v24 erhöht.

## Update v25 – Stabilitätsübungen nur komplett abgeschlossen + Historie
- Stabilitätsübungen gelten jetzt erst dann als abgeschlossen, wenn **alle Übungen mit allen Sätzen** erfüllt sind.
- Die Fortschrittsanzeige zählt jetzt alle Sätze der fälligen Übungen.
- Stabilitätsübungen werden jetzt in der **Historie** gespeichert.
- Historieneinträge der Stabilitätsübungen können nachträglich bearbeitet werden; die Satzanzahl je Übung ist korrigierbar.
- Änderungen in der Historie werden mit dem aktuellen Stabilitätsstatus synchronisiert.
- Cache-/Versionsnummer auf v25 erhöht.

## Update v26 – Erinnerungszeiten direkt am iPhone
- Zwei Erinnerungszeiten direkt in der PWA einstellbar.
- Beide Erinnerungen lassen sich einzeln aktivieren/deaktivieren.
- Einstellungen werden lokal gespeichert und als OneSignal-Tags synchronisiert.
- Standard bleibt 18:00 und 18:55 Uhr.
- Cache-/Versionsnummer auf v26 erhöht.


## Update v27 – neues Ziel bis Ende November
- Neues Enddatum: **30. November 2026**.
- Ziel: **356 Liegestütze + 4:00 Minuten Plank**.
- Trainingsprogression ab 21. September neu bis Ende November verteilt.
- **Trainingseintrag speichern** speichert nun zusätzlich den aktuellen Stand der fälligen Stabilitätsübungen in der Historie.
- Unvollständige Stabilitätsübungen werden dadurch **nicht** als erledigt markiert; sie bleiben offen, bis alle Sätze aller fälligen Übungen abgeschlossen sind.
- Bei mehreren offenen Stabilitätsterminen wird immer der älteste noch nicht vollständig erledigte Termin weiter angezeigt.
- Cache-/Versionsnummer auf v27 erhöht.

## Update v28 – Stabilität beim Speichern abschließen
- Mit **„Trainingseintrag speichern“** wird das aktuell offene Stabilitätstraining jetzt ebenfalls als **vollständig abgeschlossen** gespeichert.
- Das gilt unabhängig davon, wie viele Sätze zuvor einzeln bestätigt wurden.
- In der Historie wird der Stabilitätseintrag anschließend als komplett geführt.
- Cache-/Versionsnummer auf v28 erhöht.


## Update v29 – Drei Seiten & erweiterte Historie
- Neue Hauptnavigation mit **Training**, **Historie** und **Einstellungen**.
- Training enthält alle Übungs-, Ziel-, Eingabe- und Stabilitätsfunktionen.
- Historie enthält Gesamtübersicht, Kontrollpunkte, Historie in Zahlen und einen 8-Wochen-Verlauf für Liegestütze/Plank.
- „Längster Plank“ basiert nun auf dem längsten einzelnen Plank-Versuch statt der Tagessumme.
- Einzel-Planks werden ab v29 bei Timer und manueller Eingabe separat als Tagesbestwert erfasst; ältere Einträge können im Historien-Editor ergänzt werden.
- Einstellungen enthält Trainingserinnerungen und Datensicherung.
- Cache-/Versionsnummer auf v29 erhöht.


## Update v30 – Kalenderwochen & zusammengefasste Tageshistorie
- Die 8-Wochen-Grafik verwendet jetzt ISO-Kalenderwochen als `KWxx`.
- Die Historie zeigt pro Datum nur noch einen gemeinsamen Trainingstag mit Liegestützen, Plank und Stabilitätsübungen.
- Über **Bearbeiten** lassen sich alle Werte des Tages gemeinsam korrigieren: Liegestütze, Plank-Gesamtzeit, längster Plank am Stück und erledigte Stabilitätssätze je Übung.
- Beim Speichern einer Korrektur werden alte Mehrfacheinträge dieses Tages konsolidiert.
- **Trainingstag löschen** entfernt alle Trainings- und Stabilitätsdaten des gewählten Tages.
- Cache-/Versionsnummer auf v30 erhöht.


## Update v31 – komplettes Tagesprogramm nachträglich bearbeiten
- Auch an Tagen ohne regulär geplante Stabilitätseinheit wird in der Historie das zuletzt fällige Stabilitätsprogramm zur Bearbeitung angeboten.
- Nachgeholte Stabilitätsübungen können dem tatsächlichen Durchführungstag zugeordnet werden.
- „Trainingseintrag speichern“ speichert ein nachgeholtes Stabilitätsprogramm künftig im Historientag der tatsächlichen Durchführung, während der technische Fälligkeitsbezug erhalten bleibt.
- Liegestütze, Plank, längster Einzel-Plank und sämtliche Stabilitätssätze bleiben gemeinsam im Tageseditor bearbeitbar.
- Cache-/Versionsnummer auf v31 erhöht.


## Update v32 – Einheitliches Verhalten offener Trainings
- Liegestütze/Plank und Stabilitätsübungen verwenden jetzt dieselbe Nachhol-Logik.
- Ein fälliges Training bleibt an trainingsfreien Folgetagen sichtbar, solange es noch nicht erledigt ist.
- Sobald der nächste geplante Trainingstermin derselben Trainingsart fällig wird, ersetzt das neue Training das alte offene Training.
- Bereits dokumentierte Teilleistungen des ersetzten Trainings bleiben in der Historie erhalten.
- Cache-/Versionsnummer auf v32 erhöht.


## Update v33 – Jahresendziel, Pause/Fortsetzen und flexible Stabilität
- Zieltermin: **31.12.2026**, Ziel wurde mit v37 auf **356 Liegestütze + 3:00 Plank** angepasst.
- Ab 02.11. Neustart des aktuellen Aufbaus auf dem Stand von Anfang Oktober: **216 Liegestütze + 2:53 Plank**. Historische Einträge bleiben erhalten.
- „Trainingseintrag speichern“ übernimmt Liegestütze, Plank und den aktuellen Stabilitäts-Satzstand exakt wie eingetragen; fehlende Sätze werden nicht automatisch ergänzt.
- „Trainingsplan pausieren“ friert den aktuellen Zielwert ein und deaktiviert planmäßige Push-Erinnerungen. „Fortsetzen“ startet mit denselben Werten und baut von dort bis 31.12. neu auf.
- Stabilitätsübungen rotieren ab November in drei Varianten pro Wochentag für mehr Abwechslung.


## Update v34 – Startreihenfolge repariert
- Stabilitätsübungen, Historie und Reminder-Logik werden erst initialisiert, nachdem alle Module geladen sind.
- Verhindert den JavaScript-Abbruch, der in v33 die Stabilitätsanzeige, Historie und Reminder-Bedienung blockiert hat.
- Reminder-Zeiten sind wieder bearbeitbar und speicherbar; Push kann wieder aktiviert/deaktiviert werden.
- Cache-Version auf v34 erhöht.


## Update v35 – Super Paul und Halbmarathon-Aufbau
- App-Name und SP-Superheldenwappen auf **Super Paul** umgestellt.
- Krafttraining (Liegestütze, Plank und Beinstabilität) und Laufen auf getrennte Seiten aufgeteilt.
- 19-Wochen-Laufplan vom 24.11.2026 bis zum Halbmarathon am 04.04.2027: Dienstag optional locker, Donnerstag Qualität, Sonntag Longrun; Samstag bleibt frei.
- Ziel: Halbmarathon unter 1:40 h (4:44 min/km). Der Zeitplan ist angesichts des aktuellen 10-km-Tempos von 6:00 min/km ambitioniert; der 10-km-Formtest Ende Februar dient zur Neubewertung.
- Dehnroutine für Hüfte, Quadrizeps, Beinrückseite, Gesäß und Waden; Fortschritt je Lauf lokal gespeichert.
- Kraft- und Laufeinheiten können verschoben oder abgesagt werden. Der Grund ist verpflichtend per Button: Keine Zeit, Krank/schlapp oder Keine Lust. Beim Verschieben wird eine bereits belegte Einheit am Zieltag als ersetzt markiert (keine doppelten Trainings am selben Tag).
- Bestehender localStorage-Schlüssel und bisherige Trainingshistorie bleiben erhalten; neue Lauf- und Aktionsdaten werden ergänzt.

- Backup-Import akzeptiert weiterhin ältere „356 Coach“-Backups; neue Exporte heißen „Super Paul“.


## Update v36 – Logo- und Navigationskorrektur
- Das App-Icon wurde durch eine geprüfte, vollständige PNG-Datei mit deckendem Hintergrund ersetzt.
- Desktop-Favicon und App-Logo nutzen jetzt das SP-Wappen; das Logo im App-Kopf ist als Inline-SVG eingebettet.
- Apple-Touch-Icon und Web-App-Manifest zeigen auf das neue App-Icon.
- Navigation erhält zusätzlich einen unabhängigen Fallback; Kraft, Laufen, Historie und Einstellungen können direkt umgeschaltet werden.
- Service-Worker-Cache und Asset-Version auf v36 angehoben.


## Update v37 – vier sichtbare Seiten und 3:00-Minuten-Plankziel
- Die schmale untere Navigationsleiste wurde durch eine gut sichtbare, sticky 2×2-Auswahl mit Kraft, Laufen, Historie und Einstellungen direkt unter dem Logo ersetzt.
- Plank-Endziel auf 180 Sekunden (3:00 Minuten) geändert; Liegestütze bleiben bei 356/Tag.
- Offene Plantermine ab 23.11.2026 steigen schrittweise von 173 Sekunden auf 180 Sekunden am 31.12.2026.
- Bereits vergangene Sollwerte und gespeicherte Ist-Trainingsdaten bleiben erhalten.
- Vorhandene Pause-/Fortsetzen-Werte und Remote-Planwerte werden beim Laden auf maximal 180 Sekunden begrenzt, ohne den Pausenzustand zurückzusetzen.
- Backup bleibt kompatibel; neuer Exportstand v37.


## Update v38 – Kalenderübersicht und intensiverer Laufaufbau
- Neue Start-/Übersichtsseite mit Monatskalender, Tagesdetails, Status (geplant, offen, erledigt, verschoben/abgesagt) und Vorschau der nächsten Termine.
- Kalender zeigt Kraft, Beinstabilität und Laufeinheiten; Monatswechsel und Tagesauswahl sind direkt bedienbar.
- Standardansicht nach Update ist einmalig die Kalenderübersicht; die Nutzerauswahl wird danach lokal gespeichert.
- Laufaufbau auf Basis 10 km bei ca. 6:00 min/km in Zone 2 angepasst: Dienstag optional Zone 2, Donnerstag strukturierte Schwellen-/Intervallarbeit, Sonntag Longrun.
- Progression mit Entlastungswochen, langen Läufen bis 19 km und 10-km-Formtest Ende Februar; Samstag bleibt frei.
- 1:40 h bleibt Stretch-Ziel; spezifische Wettkampfpace wird erst anhand des Formtests bewertet.


## Update v39 – Laufplan mit Pace- und Pulszonen
- RPE-Vorgaben aus dem gesamten Laufplan entfernt.
- Schnelle Einheiten nennen konkrete Pace-Bereiche (Schwelle, 10-km-Intervalle, kurze Steigerungen und HM-spezifische Abschnitte).
- Lockere Dienstagseinheiten und Sonntagsläufe werden nach der persönlichen Herzfrequenzzone 2 gesteuert; Einlaufen und Trabpausen in HF-Zone 1–2.
- 6:00 min/km bleibt der vom Nutzer genannte aktuelle Zone-2-Referenzwert, nicht die vorgeschriebene Pace der lockeren Einheiten.
- Pace-Bereiche sind vorläufig und werden nach dem 10-km-Formtest Ende Februar anhand des Ergebnisses angepasst.


## Update v40 – Herzfrequenzzonen und erster Lauf-Zwischentest
- HF-Zonen auf Basis der vorgegebenen HFmax von 195 bpm berechnet und auf der Laufseite ergänzt: Zone 1 98–116, Zone 2 117–136, Zone 3 137–155, Zone 4 156–175 und Zone 5 176–195 bpm.
- Überschneidungsfreie Ganzzahlbereiche: Grenzwerte werden jeweils der höheren Zone zugeordnet.
- Am 13.12.2026 ersetzt ein 5-km-Zwischentest den regulären Sonntagslauf. Inklusive Ein- und Auslaufen beträgt der geplante Umfang 9 km.
- Der 10-km-Formtest Ende Februar bleibt Teil des Plans.
- Service-Worker-Cache und Asset-Version auf v40 angehoben.


## Update v41 – Dehnillustrationen und zweiwöchentliche Lauf-Bestandsaufnahme
- Zu jeder der fünf Dehnübungen nach dem Laufen ist eine eigene, offline verfügbare Übungsillustration ergänzt: Wade, Quadrizeps, Beinrückseite, Hüftbeuger und Gesäß/Figure-4.
- Standardisierte Lauf-Bestandsaufnahme alle 14 Tage am Sonntag, beginnend am 13.12.2026: 10 Minuten Einlaufen, danach 30 Minuten gleichmäßig in HF-Zone 2 (117–136 bpm). Der Messabschnitt wird in den geplanten Longrun integriert; der Longrun-Gesamtumfang bleibt bestehen.
- Geplante Termine: 13.12.2026, 27.12.2026, 10.01.2027, 24.01.2027, 07.02.2027, 21.02.2027, 07.03.2027 und 21.03.2027.
- In der Historie können je Messung Datum, Zeit, Distanz, durchschnittliche Herzfrequenz und durchschnittliche Pace gespeichert, bearbeitet und gelöscht werden.
- Ergebnisse liegen im bestehenden localStorage und sind im vollständigen JSON-Backup enthalten.
- Der 10-km-Formtest Ende Februar bleibt zusätzlich im Laufplan.
