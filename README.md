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
