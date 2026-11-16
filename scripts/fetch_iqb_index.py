"""Builds data/iqb-mathe.json: index (metadata + links) of the IQB Abitur pool tasks for Mathematik."""
import html, json, re, sys, time, urllib.request

BASE = "https://www.iqb.hu-berlin.de"
LIST = BASE + "/de/schule/aufgaben/sekii/abiturpruefungsaufgaben-mathematik/?page={}"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (abi-trainer-bw index)"})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")


def parse(page):
    items = []
    for block in page.split('<div class="ce-exercise-item')[1:]:
        title = html.unescape(re.search(r"<h2[^>]*>(.*?)</h2>", block, re.S).group(1).strip())
        links = [(html.unescape(t.strip()), BASE + h) for h, t in re.findall(r'<a href="([^"]+)"[^>]*>\s*([^<]+?)\s*</a>', block, re.S) if h.startswith("/media/")]
        parts = [p.strip() for p in title.split(" - ")]
        items.append({"title": title, "parts": parts, "files": [{"label": l, "url": u} for l, u in links]})
    return items


def main():
    seen, tasks, n = set(), [], 1
    while n < 200:
        new = [it for it in parse(get(LIST.format(n))) if it["title"] not in seen]
        if not new:  # past the last page the site repeats the final page
            break
        for it in new:
            seen.add(it["title"])
            tasks.append(compact(it))
        print(n, len(tasks), file=sys.stderr, flush=True)
        n += 1
        time.sleep(0.3)
    json.dump(tasks, open(sys.argv[1], "w"), ensure_ascii=False, separators=(",", ":"))
    print(len(tasks), "tasks", file=sys.stderr)


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
