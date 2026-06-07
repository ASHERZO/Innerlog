[README.md](https://github.com/user-attachments/files/28677969/README.md)
# Innerlog 🎙

**Tägliches Sprachtagebuch für mentales Wohlbefinden** — persönlich, privat, KI-gestützt.

Innerlog lässt dich jeden Tag 1–2 Minuten frei sprechen und analysiert deinen Eintrag mit GPT-4o mini: Energie, Fokus, Stimmung, offene Bedürfnisse, Muster und Achtsamkeits-Impulse — alles lokal auf deinem Gerät gespeichert.

🔗 **Live:** [asherzo.github.io/Innerlog](https://asherzo.github.io/Innerlog)

---

## Was Innerlog macht

Du sprichst — Innerlog hört zu und liefert:

- **Tägliche Affirmation** — spezifisch auf das was du heute erlebt hast, keine Floskeln
- **Awareness-Impuls** — was siehst du vielleicht selbst nicht? Max. 2 Sätze, klar und direkt
- **Energie & Fokus** — Scores 1–10, aus dem Gesprochenen abgeleitet
- **Stimm-Emotion** — primäre und sekundäre Emotion mit Valenz und Aktivierungsniveau
- **Bedürfnis-Analyse** — was war heute erfüllt, was ist offen? (basierend auf Deci & Ryan SDT)
- **Symptom-Muster** — Ungeduld, Grübeln, Erschöpfung, Antriebslosigkeit u.a. werden erkannt
- **Tipp für morgen** — ein konkreter sofort umsetzbarer Schritt
- **Achtsamkeitsübung** — nur wenn wirklich passend, mit Begründung (MBSR, ACT, RAIN u.a.)
- **Verlauf & Charts** — Energie, Fokus und emotionale Valenz über die letzten 90 Tage
- **Wöchentliche Insights** — Durchschnitte, Tiefstwerte, Korrelationen

---

## Wissenschaftlicher Hintergrund

Die KI-Analyse stützt sich auf:

- **MBSR** — Mindfulness-Based Stress Reduction (Kabat-Zinn)
- **ACT** — Acceptance and Commitment Therapy
- **Positive Psychologie** — PERMA-Modell (Seligman)
- **Selbstmitgefühl** — Kristin Neff
- **Polyvagal-Theorie** — Nervensystem-Regulation (Porges)
- **SDT** — Self-Determination Theory, Bedürfniskategorien (Deci & Ryan)

---

## Technische Architektur

```
Browser (IndexedDB + localStorage)
    ↓ fetch POST
Cloudflare Worker (CORS-Proxy)
    ↓ forward
OpenAI API
  ├── whisper-1      → Spracheingabe transkribieren (Deutsch)
  └── gpt-4o-mini    → Vollständige Analyse (Emotion, Bedürfnisse, Muster, Coaching)
```

**Kein Backend. Kein Account. Kein Tracking.**

| Schicht | Technologie |
|---|---|
| Hosting | GitHub Pages |
| CORS-Proxy | Cloudflare Worker (Free Tier) |
| Transkription | OpenAI Whisper (`whisper-1`) |
| Analyse | OpenAI GPT-4o mini |
| Datenspeicherung | IndexedDB (lokal, on-device) |
| API Key | localStorage (lokal, on-device) |

---

## Datenschutz

- Alle Einträge, Transkripte und Analysen bleiben **lokal auf dem Gerät** in IndexedDB
- Beim Analysieren wird nur das Transkript + die letzten 7 Eintrags-Zusammenfassungen an GPT-4o mini gesendet
- Der API Key liegt ausschließlich in localStorage — verlässt das Gerät nicht
- Kein Account bei Anthropic oder OpenAI wird angelegt
- Audio wird temporär an OpenAI Whisper gesendet und nicht gespeichert

---

## Features im Überblick

- 🎙 **Spracheingabe** — Browser MediaRecorder API, kein Plugin nötig
- 📊 **Charts** — Energie, Fokus, Valenz & Aktivierung über 90 Tage (Chart.js)
- 🗂 **Verlauf** — letzte Einträge, aufklappbar mit vollem Detail
- 💾 **Backup** — JSON Export/Import, manuell oder regelmäßig
- 🗑 **Datenkontrolle** — einzelne Einträge oder alle Daten löschbar
- 📱 **PWA-ready** — mobile-first, installierbar

---

## Selbst deployen

### 1. Cloudflare Worker

Neuen Worker unter [workers.cloudflare.com](https://workers.cloudflare.com) anlegen und den Worker-Code aus dem Repo einfügen. In Zeile 1 die eigene GitHub-Pages-URL eintragen:

```js
const ALLOWED_ORIGIN = 'https://DEIN_USERNAME.github.io';
```

### 2. App konfigurieren

In `index.html` die Worker-URL eintragen:

```js
const PROXY = 'https://DEIN_WORKER.workers.dev';
```

### 3. GitHub Pages

Repository erstellen → `index.html` pushen → Settings → Pages → Source: `main` / `root`.

---

## Kosten (Schätzung)

| Dienst | Kosten |
|---|---|
| GitHub Pages | kostenlos |
| Cloudflare Workers | kostenlos (100k Req/Tag) |
| OpenAI whisper-1 | ~$0.006 / Minute Audio |
| OpenAI gpt-4o-mini | ~$0.001–0.002 / Eintrag |

Ein täglicher Eintrag kostet ca. **1–2 Cent/Monat**.

---

## Lokale Entwicklung

```bash
git clone https://github.com/asherzo/Innerlog.git
cd Innerlog
python3 -m http.server 8080
# → http://localhost:8080
```

Für lokale Tests den Cloudflare Worker temporär mit `ALLOWED_ORIGIN = '*'` konfigurieren.

---

*Innerlog ist ein persönliches Spaßprojekt — kein kommerzielles Produkt.*
