# 356 Coach v14 – sichere Push-Einrichtung

Die öffentliche PWA enthält **keinen API-Schlüssel und keinen Scheduler** mehr.

## Öffentliche App
Diese Dateien bleiben im öffentlichen `Pushup_Coach`-Repository / auf GitHub Pages.

1. 356 Coach auf dem iPhone vom Home-Bildschirm aus öffnen.
2. `Trainingserinnerungen` → `Erinnerungen aktivieren`.
3. iOS-Mitteilungen erlauben.
4. Die App zeigt danach die **persönliche OneSignal Subscription-ID dieses iPhones**.
5. Auf `Kopieren` tippen.

Die Subscription-ID ist kein API-Schlüssel, wird für das private Zielgerät aber trotzdem nicht ins öffentliche Repository geschrieben.

## Privater Scheduler
Das separate Paket `356_Coach_v14_PrivatePush_Scheduler.zip` in ein **neues privates GitHub-Repository** hochladen.

Dort unter:
`Settings → Secrets and variables → Actions`

diese drei Repository Secrets anlegen:

- `ONESIGNAL_APP_ID`
- `ONESIGNAL_APP_API_KEY`
- `ONESIGNAL_SUBSCRIPTION_ID`

`ONESIGNAL_SUBSCRIPTION_ID` ist die ID, die die 356-Coach-App nach der Push-Aktivierung anzeigt.

Der Scheduler sendet ausschließlich an diese einzelne Subscription-ID.
