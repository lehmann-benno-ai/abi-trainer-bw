# Abi-Trainer BW – Security model

Written from the code at commit a9a79c6 (PR #1, the deployed site). Facts marked **(owner)** come from the site owner; the rest is read from the code.

## System overview
Free, login-free static study site for Abitur students in Baden-Württemberg. Pure client-side HTML/CSS/vanilla JS, no backend, no build step. Hosted as a Render static site (https://abi-trainer-bw.onrender.com) and on GitHub Pages; both serve the repository files as-is. Render config lives in the Render dashboard (no IaC repository).

Trust boundaries:
- Student's browser ↔ site origin (all logic runs in the browser).
- Site ↔ third-party CDN `cdn.jsdelivr.net` (KaTeX 0.16.11 CSS/JS and auto-render, loaded with `crossorigin` but no `integrity` hashes) in `index.html`.
- Site ↔ external links to `iqb.hu-berlin.de` and `km.baden-wuerttemberg.de` (opened with `target=_blank rel=noopener`).
- Maintainer workstation / Devin ↔ IQB website (`scripts/fetch_iqb_index.py` scrapes IQB pages into `data/iqb-*.json`).

## Components
| Component | Code |
|---|---|
| App UI | `index.html`, `style.css`, `js/app.js` (hash router, views, `innerHTML` rendering, `esc()` helper, localStorage store) |
| Task engine | `js/generators.js`, `js/bank.js`, `js/mathparse.js` (answer parser), `js/tutor.js` (Abi-Tutor) |
| Subject content | `js/subjects.js` (subjects, flashcards, source links) |
| IQB catalog | `data/iqb-*.json`, `scripts/fetch_iqb_index.py` |
| Third-party scripts | KaTeX from jsDelivr referenced in `index.html`, `tests/selftest.html` |
| Hosting & deploy | Render static site, GitHub Pages, GitHub repo `lehmann-benno-ai/abi-trainer-bw` |
| Tests | `tests/selftest.html` |

## Entry points (who can reach them)
- URL hash routes and query params (`#/ueben?typ=…&thema=…&topic=…&year=…&page=…`) parsed by `params()` in `js/app.js` — anyone who can make a student click a link.
- Answer input fields parsed by `MathParse.evaluate` and shown back by the tutor — the student themself.
- `localStorage` keys `abiTrainerBW.v1` and `abiTrainerBW.theme` — same-origin scripts or the student; parsed with `JSON.parse` and merged with `Object.assign`.
- `data/iqb-*.json` fetched at runtime and rendered (titles, labels, file URLs into `href`) — whoever can change the repo or the IQB pages at regeneration time.
- KaTeX rendering of generated/IQB text (auto-render on `\( … \)`).

## Assets
- Integrity of the site and the student's browser session on its origin (low sensitivity: no accounts, no personal data, no cookies).
- Students' learning progress in localStorage (low: per-browser, not graded).
- Trust in the site's content and outbound links (students follow links to PDFs).
- Maintainer's GitHub and Render accounts / deploy pipeline (highest impact: control of the published site).

## Attacker profiles
**(owner)** Top priorities: (1) someone sending students a malicious link that runs code on the site; (2) someone defacing the site or taking over the GitHub/Render accounts. CDN compromise and tampered data were not picked as top priorities, but nothing is ruled out.

- Remote attacker sending students a crafted link (XSS/HTML injection via hash params or rendered data).
- Compromised or malicious third-party CDN (jsDelivr/npm package) — supply chain.
- Tampered upstream data (IQB pages scraped into JSON; malicious `javascript:` or phishing URLs).
- Attacker with access to the maintainer's accounts (out of the code's control).

## Existing controls
- `esc()` HTML-escapes most dynamic strings in templates; outbound links use `rel="noopener"`.
- No backend, no auth, no secrets in the repo; nothing server-side to attack.
- Progress is local only.

## Out of scope / accepted risk
- **(owner)** Nothing is out of scope: report everything. No accepted risks.

## Open questions
- No infrastructure repository exists (owner confirmed); Render/GitHub Pages settings (headers such as CSP, branch protection, account 2FA) are not visible to the scan.
