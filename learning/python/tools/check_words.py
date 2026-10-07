"""Check that every New-words card is actually taught in its section's text.

Rule (his request, 2026-10-05): a card is a RECAP. The word must first be used AND explained in the
section body above the box. A word that only appears in the box means the section has a gap.

Usage:  python tools/check_words.py lessons/0003-numbers.html   (or no args = every lesson)
Exit code 1 if any card's term is missing from its section body.
"""
import re
import sys
from html import unescape
from pathlib import Path


def text_of(html):
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", " ", html))).lower()


def term_variants(dt_html):
    """'PEMDAS / BODMAS' -> ['pemdas', 'bodmas']; 'Floor division (<code>//</code>)' -> ['floor division', '//']."""
    dt_html = re.sub(r'<span class="seen">.*?</span>', "", dt_html, flags=re.S)
    raw = text_of(dt_html)
    parts = re.split(r"\s*/\s*(?![/])|[()]|\s+vs\s+", raw)
    out = []
    for p in parts:
        p = p.strip(" .,:")
        if p and re.search(r"[a-z]", p):  # skip pure numbers/symbols like "8, 257, 20"
            out.append(p)
    if "//" in raw:
        out.append("//")
    return out


def check(path):
    html = Path(path).read_text(encoding="utf-8")
    sections = re.split(r"(?=<h2 )", html)
    problems = []
    for sec in sections:
        m = re.search(r'<h2 id="([^"]+)"', sec)
        if not m or 'class="words"' not in sec:
            continue
        sid = m.group(1)
        boxes = re.findall(r'<div class="words">.*?</dl>\s*</div>', sec, flags=re.S)
        body = text_of(re.sub(r'<div class="words">.*?</dl>\s*</div>', " ", sec, flags=re.S))
        for box in boxes:
            for dt in re.findall(r"<dt>(.*?)</dt>", box, flags=re.S):
                variants = term_variants(dt)
                missing = [v for v in variants if v not in body]
                if missing:
                    problems.append(f"  section {sid}: card '{text_of(dt).strip()}' -> not in section text: {missing}")
    return problems


if __name__ == "__main__":
    root = Path(__file__).resolve().parent.parent
    files = sys.argv[1:] or sorted(str(p) for p in (root / "lessons").glob("*.html"))
    bad = False
    for f in files:
        probs = check(f)
        print(f"{Path(f).name}: {'OK' if not probs else str(len(probs)) + ' gap(s)'}")
        for p in probs:
            print(p)
        bad = bad or bool(probs)
    sys.exit(1 if bad else 0)
