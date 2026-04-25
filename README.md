# The Great Expedition Codex

BDO Sailing & Barter Companion — single-page app per capitani del Great Ocean.

**Live:** https://sailor.info-pixservice.workers.dev/ (Cloudflare Pages)

**Forged by Greamory · Gilda Lithium**

## Cosa include

- **Crew Browser** — 20 sailor filtrabili per razza, location, tipo, con benefit score SMH/Barter
- **Build Optimizer** — top 10 combo precalcolate per 10 o 30 cabin slots
- **Roll Tracker** — inserisci stats Lv.2–10, riconoscimento min/max roll, auto-save
- **Comparator** — confronto fianco a fianco fino a 4 sailor, preset Top 4 per obiettivo
- **Barter Calculator** — 60 item L1, mastery/VP/fame, Parley cost, Crow Coin calc
- **Carrack Builder** — tracker materiali per Advance/Balance/Volante/Valor con stock Illya/Epheria/Ancado
- **Guide & Ships** — patch notes 2025, First Mates, EXP table, tips

## Funzionalità extra

- **Export / Import JSON** — backup completo (sailor salvati + stock Carrack)
- **Scorciatoie tastiera:** `/` focus ricerca · `Esc` chiude modal · `1`–`7` cambia tab · `Ctrl+S` salva tracker · `Ctrl+E` esporta
- **Auto-save** del tracker 900ms dopo ogni modifica
- **Persistenza** via `localStorage` (dati restano sul tuo browser)
- **Sfondo Carrack** (Advance/Balance/Volante/Valor) — WebP ottimizzato + fallback JPEG

## Come usarlo

1. Apri https://sailor.info-pixservice.workers.dev/ nel browser
2. Nessuna installazione, nessun login
3. I dati sono salvati nel tuo browser — fai Export periodicamente per backup

## Stack

HTML + CSS + vanilla JS — zero dipendenze, zero build step. Un singolo file `index.html`.

Hosting: **Cloudflare Pages** — deploy automatico da `main`.

