"""Point every import inside a package at the module that DEFINES what it asks for.

A barrel re-exports a whole directory, so importing one class through one drags in everything beside
it — including the services that import the very file doing the importing. That is a cycle, and a
data module that calls `new Region(...)` at load time is exactly where a cycle shows: whether the
class is defined yet depends on which door the graph was entered by.

Nothing here changes what any module means. The barrels are pure re-exports, so a symbol reached
through one and a symbol reached directly are the same binding. Only the path changes, and with it
what has to be loaded to get there.

Anything ambiguous — a name two files both export, or one no file appears to define — is LEFT ALONE
and reported, because guessing which of two same-named classes was meant is how a silent behaviour
change gets into a thousand files.
"""
import os
import re
import sys
from collections import defaultdict

SRC = "src"
DEFINITION = re.compile(
    r"^export\s+(?:declare\s+)?(?:abstract\s+)?(?:class|interface|enum|function|const|let|var|type)\s+([A-Za-z_$][\w$]*)",
    re.M)
IMPORT = re.compile(r'^import\s+(type\s+)?\{([^}]*)\}\s+from\s+"([^"]+)"', re.M)


def definitions():
    """Every exported name, and the file that declares it."""
    homes = defaultdict(set)
    for root, _, files in os.walk(SRC):
        for name in files:
            if not name.endswith((".ts", ".mts")) or name.endswith((".test.ts", ".test.mts")):
                continue
            path = os.path.join(root, name)
            if os.path.basename(path).startswith("index."):
                continue
            for match in DEFINITION.finditer(open(path, encoding="utf-8").read()):
                homes[match.group(1)].add(path)
    return homes


def resolve(from_dir, specifier):
    """The file a specifier names, or None."""
    target = os.path.normpath(os.path.join(from_dir, specifier))
    for candidate in (target[:-3] + ".ts", target[:-3] + ".mts", target, target + ".ts"):
        if os.path.isfile(candidate):
            return candidate
    return None


def module_path(from_dir, target):
    """How `from_dir` should spell `target`, as a relative import with a .js extension."""
    relative = os.path.relpath(target, from_dir)
    if not relative.startswith("."):
        relative = "./" + relative
    return re.sub(r"\.m?ts$", ".js", relative)


def rewrite(path, homes, notes):
    source = open(path, encoding="utf-8").read()
    from_dir = os.path.dirname(path)
    out = []
    last = 0
    changed = 0
    for match in IMPORT.finditer(source):
        specifier = match.group(3)
        if not specifier.startswith("."):
            continue
        target = resolve(from_dir, specifier)
        if target is None or not os.path.basename(target).startswith("index."):
            continue  # not a barrel
        names = [n.strip() for n in match.group(2).split(",") if n.strip()]
        if any(" as " in n for n in names):
            notes.append(f"{path}: renamed import, left alone — {match.group(0)[:70]}")
            continue
        by_home = defaultdict(list)
        for name in names:
            home = homes.get(name)
            if not home:
                notes.append(f"{path}: no module defines {name!r}, left alone")
                by_home = None
                break
            if len(home) > 1:
                notes.append(f"{path}: {name!r} is defined in {len(home)} modules, left alone")
                by_home = None
                break
            by_home[next(iter(home))].append(name)
        if by_home is None:
            continue
        if len(by_home) == 1 and next(iter(by_home)) == target:
            continue
        kind = "import type " if match.group(1) else "import "
        lines = [f'{kind}{{ {", ".join(sorted(n))} }} from "{module_path(from_dir, home)}"'
                 for home, n in sorted(by_home.items())]
        out.append(source[last:match.start()])
        out.append("\n".join(lines))
        last = match.end()
        changed += 1
    if not changed:
        return 0
    out.append(source[last:])
    if "--apply" in sys.argv:
        open(path, "w", encoding="utf-8").write("".join(out))
    return changed


def main():
    homes = definitions()
    notes = []
    files = 0
    statements = 0
    for root, _, names in os.walk(SRC):
        for name in names:
            if name.endswith((".ts", ".mts")):
                changed = rewrite(os.path.join(root, name), homes, notes)
                if changed:
                    files += 1
                    statements += changed
    print(f"{'rewrote' if '--apply' in sys.argv else 'would rewrite'} {statements} imports in {files} files")
    if notes:
        print(f"\nleft alone ({len(notes)}):")
        seen = set()
        for note in notes:
            key = note.split(":", 1)[1][:60]
            if key not in seen:
                seen.add(key)
                print(" ", note)


main()
