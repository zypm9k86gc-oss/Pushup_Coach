import os, json, uuid, urllib.request, urllib.error
from datetime import datetime, date, time
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Europe/Berlin")
TODAY = datetime.now(TZ).date()

START = date(2026, 9, 14)
END = date(2026, 12, 31)
SPECIAL_TRAINING_DATES = {date(2026, 10, 31)}

def is_training_day(d):
    # Mo/Mi/Fr Stabilität + Kraft/Core; zusätzlich finales Push-up/Plank-Ziel am 31.10.
    return START <= d <= END and (d.weekday() in (0, 2, 4) or d in SPECIAL_TRAINING_DATES)

def weekday_program(d):
    if d == date(2026, 10, 31):
        return "Finaltag: 356 Liegestütze + 5:00 Plank."
    if d.weekday() == 0:
        return "Heute: Liegestütze, Plank + Kraft & Kniekontrolle A."
    if d.weekday() == 2:
        return "Heute: Liegestütze, Plank + leichte Stabilität & Balance."
    if d.weekday() == 4:
        return "Heute: Liegestütze, Plank + Kraft & Stabilität B."
    return "Heute steht dein 356-Coach-Training an."

def send(app_id, api_key, app_url, when_local, body, slot):
    payload = {
        "app_id": app_id,
        "filters": [
            {
                "field": "tag",
                "key": "training_reminders",
                "relation": "=",
                "value": "enabled"
            }
        ],
        "headings": {"de": "356 Coach", "en": "356 Coach"},
        "contents": {"de": body, "en": body},
        "url": app_url,
        "send_after": when_local.isoformat(),
        "idempotency_key": str(uuid.uuid5(uuid.NAMESPACE_URL, f"356-coach:{TODAY}:{slot}"))
    }
    req = urllib.request.Request(
        "https://api.onesignal.com/notifications",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Key {api_key}"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(slot, r.status, r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(slot, "HTTP", e.code, e.read().decode("utf-8"))
        raise

def main():
    if not is_training_day(TODAY):
        print(f"{TODAY}: kein Trainingstag – keine Pushes geplant.")
        return

    app_id = os.environ.get("ONESIGNAL_APP_ID", "").strip()
    api_key = os.environ.get("ONESIGNAL_REST_API_KEY", "").strip()
    app_url = os.environ.get("APP_URL", "").strip()

    if not app_id or not api_key:
        raise SystemExit("GitHub Secrets ONESIGNAL_APP_ID / ONESIGNAL_REST_API_KEY fehlen.")

    first = datetime.combine(TODAY, time(18, 0), TZ)
    second = datetime.combine(TODAY, time(18, 55), TZ)

    send(
        app_id, api_key, app_url, first,
        weekday_program(TODAY) + " Geplanter Start: 19:00 Uhr.",
        "18:00"
    )
    send(
        app_id, api_key, app_url, second,
        "In 5 Minuten geht’s los. Öffne 356 Coach und starte dein Training.",
        "18:55"
    )

if __name__ == "__main__":
    main()
