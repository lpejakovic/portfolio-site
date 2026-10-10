#!/usr/bin/env python3
"""Regenerate assets/vendor/bootstrap.trimmed.css from assets/vendor/bootstrap.min.css.

Loads index.html in headless Chromium (served straight from this repo, with the
full Bootstrap build swapped in and the portfolio cards rendered), finds which
Bootstrap rules have selectors matching an element on the page, and writes only
those rules - copied verbatim from bootstrap.min.css, so values keep their full
precision.

Pseudo-classes and pseudo-elements (:hover, :focus, ::before, :not(...), ...)
are ignored when matching, so a rule like `.card-link:hover` is kept whenever
a `.card-link` exists. Dark-theme rules and @keyframes are dropped.

Run it after adding Bootstrap classes to index.html or assets/js/projects.js.
Keep the virtualenv outside this folder - it is the web root, so anything here is served:

    python3 -m venv ~/.venvs/trim-bootstrap
    ~/.venvs/trim-bootstrap/bin/pip install playwright
    ~/.venvs/trim-bootstrap/bin/playwright install --with-deps chromium
    ~/.venvs/trim-bootstrap/bin/python tools/trim-bootstrap.py

Then bump the ?v= version of bootstrap.trimmed.css in index.html.
"""
import mimetypes
import os
import re
import sys
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FULL_CSS = os.path.join(REPO, 'assets/vendor/bootstrap.min.css')
OUT_CSS = os.path.join(REPO, 'assets/vendor/bootstrap.trimmed.css')
SITE = 'https://luka-pejakovic.from.hr'   # only used as a URL prefix; nothing is fetched from it

# Runs in the page: report every Bootstrap rule and which of its selectors match.
FIND_USED_RULES = r"""() => {
  const sheet = [...document.styleSheets].find(s => s.href && s.href.includes('vendor/bootstrap.min.css'));

  // Split a selector list on top-level commas only.
  const split = sel => {
    const out = []; let depth = 0, cur = '';
    for (const ch of sel) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    out.push(cur.trim());
    return out;
  };

  // Drop pseudo-classes/elements. This only broadens matching, so it never drops a needed rule.
  const strip = sel => {
    let s = sel, prev;
    do { prev = s; s = s.replace(/::?[a-zA-Z-]+\([^()]*\)/g, ''); } while (s !== prev);
    s = s.replace(/::?[a-zA-Z-]+/g, '').replace(/\s*([>+~])\s*/g, ' $1 ').trim();
    // A compound emptied by stripping (e.g. "a > :hover") becomes "*".
    return s.replace(/(^|[>+~])\s*(?=[>+~]|$)/g, '$1 * ').trim() || '*';
  };

  const matches = sel => {
    try { return !!document.querySelector(strip(sel)); } catch (e) { return true; }
  };

  const walk = rules => [...rules].map(r => {
    if (r instanceof CSSStyleRule) {
      const keep = r.selectorText.includes('data-bs-theme=dark') ? []
        : split(r.selectorText).map((sel, j) => matches(sel) ? j : -1).filter(j => j >= 0);
      return {sel: r.selectorText, keep};
    }
    if (r instanceof CSSMediaRule || r instanceof CSSSupportsRule) {
      const kind = r instanceof CSSMediaRule ? '@media ' : '@supports ';
      return {at: kind + r.conditionText, inner: walk(r.cssRules)};
    }
    if (r instanceof CSSKeyframesRule) return {at: '@keyframes ' + r.name};
    return {at: r.cssText.split('{')[0]};
  });

  return walk(sheet.cssRules);
}"""


def serve(route):
    """Serve repo files; index.html always gets the full Bootstrap build."""
    url = route.request.url
    if not url.startswith(SITE):
        return route.abort()
    path = urlparse(url).path.lstrip('/') or 'index.html'
    file = os.path.join(REPO, path)
    if path == 'index.html':
        html = re.sub(r'assets/vendor/bootstrap[^"]*\.css[^"]*', 'assets/vendor/bootstrap.min.css', open(file).read())
        return route.fulfill(body=html, content_type='text/html')
    if not os.path.isfile(file):
        return route.fulfill(status=404, body='')
    route.fulfill(path=file, content_type=mimetypes.guess_type(file)[0] or 'application/octet-stream')


def parse(text):
    """Parse minified CSS into [(prelude, body)], where @media/@supports bodies are nested lists."""
    items, i, n = [], 0, len(text)

    def block_end(j):
        depth, quote = 0, None
        while j < n:
            c = text[j]
            if quote:
                if c == '\\':
                    j += 1
                elif c == quote:
                    quote = None
            elif c in '"\'':
                quote = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return j
            j += 1
        raise ValueError('unbalanced braces')

    while i < n:
        if text[i].isspace():
            i += 1
            continue
        brace = text.index('{', i)
        prelude = text[i:brace].strip()
        end = block_end(brace)
        inner = text[brace + 1:end]
        items.append((prelude, parse(inner) if prelude.startswith(('@media', '@supports')) else inner))
        i = end + 1
    return items


def split_top(sel):
    out, depth, cur = [], 0, ''
    for ch in sel:
        if ch == '(':
            depth += 1
        if ch == ')':
            depth -= 1
        if ch == ',' and not depth:
            out.append(cur.strip())
            cur = ''
        else:
            cur += ch
    out.append(cur.strip())
    return out


def norm(sel):
    """Normalise selector text so the source and the browser's serialisation compare equal."""
    s = re.sub(r'\s+', '', sel).replace("'", '').replace('"', '').lower()
    return s.replace('(odd)', '(2n+1)').replace('(even)', '(2n)')


def emit(items, rules, skipped):
    """Walk browser rules and source rules together (matched by selector text), keeping used ones verbatim.

    The browser drops rules it can't parse (e.g. Firefox-only ::-moz-*), so source rules with no
    browser counterpart are skipped and recorded in `skipped`.
    """
    out, si = [], 0
    for rule in rules:
        key = norm(rule.get('sel') or rule['at'])
        while si < len(items) and norm(items[si][0]) != key:
            skipped.append(items[si][0])
            si += 1
        if si == len(items):
            raise ValueError(f'could not match browser rule to source: {key}')
        prelude, body = items[si]
        si += 1
        if 'inner' in rule:
            inner = emit(body, rule['inner'], skipped)
            if inner:
                out.append(prelude + '{' + inner + '}')
        elif rule.get('keep'):
            selectors = split_top(prelude)
            if len(selectors) != len(split_top(rule['sel'])):
                raise ValueError(f'selector lists differ: {prelude!r} vs {rule["sel"]!r}')
            out.append(','.join(selectors[j] for j in rule['keep']) + '{' + body + '}')
    skipped.extend(prelude for prelude, _ in items[si:])
    return ''.join(out)


def count_kept(rules):
    return sum(count_kept(r['inner']) if 'inner' in r else bool(r.get('keep')) for r in rules)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        context.route('**/*', serve)
        page = context.new_page()
        page.goto(SITE + '/', wait_until='load')
        page.wait_for_timeout(800)   # let projects.js render the portfolio cards
        rules = page.evaluate(FIND_USED_RULES)
        browser.close()

    source = open(FULL_CSS).read()
    header = source.split('*/', 1)[0].replace('@charset "UTF-8";', '') + '*/'
    body = re.sub(r'/\*.*?\*/', '', source, flags=re.S).replace('@charset "UTF-8";', '')
    skipped = []
    css = emit(parse(body), rules, skipped)

    note = ('/* Trimmed to the rules this site uses (copied verbatim from bootstrap.min.css).\n'
            '   Regenerate with tools/trim-bootstrap.py after adding Bootstrap classes. */')
    with open(OUT_CSS, 'w') as f:
        f.write('@charset "UTF-8";\n' + header + '\n' + note + '\n' + css + '\n')

    print(f'Kept {count_kept(rules)} rules -> {os.path.relpath(OUT_CSS, REPO)} ({os.path.getsize(OUT_CSS):,} bytes)')
    unexpected = [s for s in skipped if '-moz-' not in s]
    if unexpected:
        print('WARNING: source rules skipped that are not Firefox-only:', unexpected, file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
