# Loadout Forge ⚡

### A JSON-driven form builder with a gaming-inspired UI

Loadout Forge is a dynamic form builder where you design forms visually, watch them serialize to JSON in real time, and render a live, fully-validated form — all in the browser. Built with React and styled with a vibrant, rarity-tiered gaming aesthetic.

---

## Demo

<!--
  To add a demo:
  - Record a short screen capture of building a form + submitting it
  - Upload to YouTube (Unlisted) and paste the link here, OR
  - Drag a short .gif/.mp4 (under 10MB) into this README on GitHub
-->

*Screen recording coming soon.*

---

## What It Does

Loadout Forge has three live, connected panels:

- **Builder** — Add, edit, reorder, and delete form fields (text, email, phone, dropdown, checkbox, date, number, textarea). Each field has a label, name, required toggle, placeholder, validation rules, and a rarity tier (Common, Rare, Epic, Legendary) that color-codes its card.
- **Live JSON Schema** — The form serializes to JSON in real time as you build. The panel is also editable — type valid JSON and the form updates instantly; invalid JSON surfaces an inline error. This two-way binding is the core of the app.
- **Live Preview** — Renders a working form from the current schema with real validation: required fields, email format, number min/max, and inline error messages on submit.

Successful submissions are saved and displayed in a **leaderboard-style table** with rarity-colored rows.

A pre-loaded **"Squad Tournament Signup"** template demonstrates the full system: Epic Username, Platform, Region, Squad Size (with min/max), and a rules-agreement checkbox.

---

## Why I Built This

I built Loadout Forge to go deep on **schema-driven form rendering** — the pattern where a single JSON config drives both the UI and its validation logic, rather than hardcoding each form. It's a common need in real products (custom form tooling, internal admin builders, no-code platforms), and building the two-way JSON ↔ form binding was the most interesting engineering challenge: keeping the visual builder, the editable JSON, and the rendered preview all in sync from one source of truth.

I developed it using **Cursor** as an AI-assisted coding workflow — scaffolding the architecture, then iterating feature by feature.

---

## Tech Stack

| | |
|---|---|
| **Framework** | React + Vite |
| **Icons** | lucide-react |
| **Styling** | Custom CSS (dark theme, gradient accents, rarity tiers) |
| **State** | React hooks (single source of truth, no backend) |
| **Built with** | Cursor (AI-assisted development) |

---

## Run Locally

```bash
git clone https://github.com/Galactic-Avenger/loadout-forge.git
cd loadout-forge
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

---

## Author

Built by Abdulla Saleh — [GitHub](https://github.com/Galactic-Avenger) · [LinkedIn](https://www.linkedin.com/in/abdulla-saleh-10)
