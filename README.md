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
