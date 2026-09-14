# 356 Coach v16 – OneSignal Worker im Hauptverzeichnis

Die öffentliche App erwartet den OneSignal Worker jetzt direkt hier:

`Pushup_Coach/OneSignalSDKWorker.js`

Öffentlich erreichbar muss er sein unter:

`https://zypm9k86gc-oss.github.io/Pushup_Coach/OneSignalSDKWorker.js`

Die Datei enthält nur:

`importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");`

Der OneSignal Worker nutzt einen eigenen Scope:

`/Pushup_Coach/onesignal-push-scope/`

Der normale PWA Worker `sw.js` behält weiterhin den App-Scope `/Pushup_Coach/`.

## Wichtig: alte öffentliche Scheduler-Dateien löschen

Im öffentlichen `Pushup_Coach`-Repository dürfen nicht mehr liegen:

- `send_training_reminders.py`
- `.github/workflows/training-reminders.yml`
- sonstige private Scheduler-/Secret-Dateien

Der Push-Scheduler gehört ausschließlich ins private Repository.
