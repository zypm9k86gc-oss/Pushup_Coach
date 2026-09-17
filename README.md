# 356 Coach – iPhone Web-App (PWA)

## Funktionen
- Startwert: 80 Liegestütze + 70 Sekunden Plank
- Ziel: 356 Liegestütze/Tag + 5:00 Min Plank am 31.10.2026
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
5. Öffne danach „356 Coach“ über das neue App-Symbol.

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
