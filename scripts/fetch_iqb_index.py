"""Builds data/iqb-<fach>.json: index (metadata + links) of the IQB Abitur pool tasks.

Usage: fetch_iqb_index.py <fach> <out.json>, fach one of SUBJECTS.
"""
import html, json, re, sys, time, urllib.parse, urllib.request

BASE = "https://www.iqb.hu-berlin.de"
# slug on iqb.hu-berlin.de, info field used as "topic"
SUBJECTS = {
    "mathe": ("abiturpruefungsaufgaben-mathematik", None),
    "deutsch": ("abiturprüfungsaufgaben-deutsch", "Aufgabenarten"),
    "englisch": ("abiturprüfungsaufgaben-englisch", "Kompetenzbereich"),
    "franzoesisch": ("abiturprüfungsaufgaben-französisch", "Kompetenzbereich"),
    "physik": ("abiturprüfungsaufgaben-physik", "Themenfeld"),
    "chemie": ("abiturprüfungsaufgaben-chemie", "Themenfeld"),
    "biologie": ("abiturprüfungsaufgaben-biologie", "Themenfeld"),
}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (abi-trainer-bw index)"})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")


def parse(page):
    items = []
    for block in page.split('<div class="ce-exercise-item')[1:]:
        title = html.unescape(re.search(r"<h2[^>]*>(.*?)</h2>", block, re.S).group(1).strip())
        links = [(html.unescape(t.strip()), BASE + h) for h, t in re.findall(r'<a href="([^"]+)"[^>]*>\s*([^<]+?)\s*</a>', block, re.S) if h.startswith("/media/")]
        parts = [p.strip() for p in title.split(" - ")]
        cells = [html.unescape(re.sub(r"<[^>]+>", "", c)).strip() for c in re.findall(r'<div class="grid-item">(.*?)</div>', block, re.S)]
        info = dict(zip(cells[::2], cells[1::2]))
        items.append({"title": title, "parts": parts, "info": info, "files": [{"label": l, "url": u} for l, u in links]})
    return items


def main():
    slug, topic_key = SUBJECTS[sys.argv[1]]
    url = BASE + "/de/schule/aufgaben/sekii/" + urllib.parse.quote(slug) + "/?page={}"
    key = (lambda it: it["title"]) if topic_key is None else (lambda it: it["files"][0]["url"])
    seen, tasks, n = set(), [], 1
    while n < 200:
        new = [it for it in parse(get(url.format(n))) if it["files"] and key(it) not in seen]
        if not new:  # past the last page the site repeats the final page
            break
        for it in new:
            seen.add(key(it))
            tasks.append(compact(it) if topic_key is None else generic(it, topic_key))
        print(n, len(tasks), file=sys.stderr, flush=True)
        n += 1
        time.sleep(0.3)
    json.dump(tasks, open(sys.argv[2], "w"), ensure_ascii=False, separators=(",", ":"))
    print(len(tasks), "tasks", file=sys.stderr)


def generic(it, topic_key):
    info = dict(it["info"])
    level = info.pop("Anforderungsniveau", "")
    return {
        "id": it["files"][0]["url"].rsplit("/", 1)[-1].removesuffix(".pdf"),
        "title": it["title"],
        "year": info.pop("Prüfungsjahr", "") or "Beispiel",
        "topic": info.pop(topic_key, "") or "Sonstiges",
        "level": "erhöht" if level.startswith("erhöht") else "grundlegend" if level.startswith("grundlegend") else level,
        "detail": " · ".join(v for v in info.values() if v),
        "files": it["files"],
    }


def compact(it):
    p = it["parts"]
    year = "Beispiel" if p[0].startswith("Beispiel") else p[0]
    detail = " · ".join(x for x in p[3:])
    return {
        "id": it["title"],
        "year": year,
        "topic": p[1],
        "level": p[2],
        "part": "A" if "ohne" in it["title"] else "B",
        "detail": detail,
        "files": it["files"],
    }


if __name__ == "__main__":
    main()
