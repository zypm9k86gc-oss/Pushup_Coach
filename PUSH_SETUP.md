# 356 Coach – Push-Erinnerungen einrichten

Die App ist für zwei Erinnerungen an Trainingstagen vorbereitet:

- 18:00 Uhr
- 18:55 Uhr

Die PWA bleibt auf GitHub Pages. OneSignal übernimmt nur Web Push; GitHub Actions plant die Nachrichten.

## 1. OneSignal Web Push App anlegen

In OneSignal eine Web-Push-App für diese URL anlegen:

`https://zypm9k86gc-oss.github.io/Pushup_Coach/`

Custom Code / Web SDK verwenden.

## 2. App ID in die Website eintragen

In `push-config.js`:

`YOUR_ONESIGNAL_APP_ID`

durch die öffentliche OneSignal App ID ersetzen.

Die App ID ist kein Geheimnis.

## 3. GitHub Secrets hinterlegen

Repository → Settings → Secrets and variables → Actions → New repository secret

Zwei Secrets anlegen:

- `ONESIGNAL_APP_ID` = OneSignal App ID
- `ONESIGNAL_REST_API_KEY` = OneSignal REST API Key

Den REST API Key niemals in HTML, JavaScript oder GitHub-Dateien eintragen.

## 4. Dateien veröffentlichen

Alle Dateien und Ordner aus diesem Paket ins Repository übernehmen, einschließlich:

- `.github/workflows/training-reminders.yml`
- `scripts/send_training_reminders.py`
- `push/onesignal/OneSignalSDKWorker.js`

## 5. Auf dem iPhone

356 Coach muss als Web-App auf dem Home-Bildschirm installiert und von dort geöffnet werden.

Dann in 356 Coach:

`Trainingserinnerungen → Erinnerungen aktivieren`

und die iOS-Mitteilungsabfrage erlauben.

## 6. Test

GitHub → Actions → `356 Coach Trainingserinnerungen` → Run workflow.

Das Skript plant nur an Trainingstagen automatisch die 18:00- und 18:55-Nachrichten.
