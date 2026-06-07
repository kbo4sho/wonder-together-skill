# Wonder Together Skill

This folder is the portable Wonder Together Agent Skill source.

Use it to create parent-mediated learning packets from a child's question.

## Codex

Install this repo as the `wonder-together-skill` plugin, or copy this folder into a Codex skill location such as `.agents/skills/wonder-together/` or `~/.agents/skills/wonder-together/`.

Invoke explicitly:

```text
$wonder-together
```

Or ask for a Wonder Together packet, parent guide, visual explainer, or shared learning moment from a child question.

## Claude

Use a temporary copy or symlink:

```bash
mkdir -p .claude/skills
cp -R skills/wonder-together .claude/skills/
```

Invoke with:

```text
/wonder-together
```

## Cursor

Use a temporary copy or symlink:

```bash
mkdir -p .cursor/skills
cp -R skills/wonder-together .cursor/skills/
```

If using Cursor's remote skill import, import this repository and choose `skills/wonder-together/` when supported.

## Maintenance

- Update `skills/wonder-together/` first.
- Keep platform copies temporary.
- Keep v1 instruction-only unless the project explicitly chooses a generator-backed skill later.
