# Wonder Together Skill

Wonder Together is a portable Agent Skill for turning a child's question into a parent-led learning packet: story, simple explanation, visual guidance, safe activity, parent note, and follow-up questions.

This repo is the distribution package. The skill itself lives in `skills/wonder-together/`, and Codex can install it as the `wonder-together-skill` plugin.

## What It Does

Use it when you want creator-facing Wonder Together output such as:

- parent packets from child questions
- visual explainer prompts
- gentle scripts for hard questions
- parent-led activities and mini games
- consistent `Big Wonderer` / `Little Wonderer` visual guidance

The packet shape is:

```markdown
Core idea
Story to read together
Explain it simply
Visuals
Try it together
Parent note
Follow-up questions
```

## Install In Codex

Add this repo as a Codex plugin marketplace:

```bash
codex plugin marketplace add kbo4sho/wonder-together-skill --ref main
```

Then open the Codex plugin directory, choose the `Wonder Together` marketplace, and install `Wonder Together`.

Invoke it explicitly with:

```text
$wonder-together
```

You can also ask for a Wonder Together packet, parent guide, visual explainer, or shared learning moment.

## Local Skill Copy

For Codex without plugin installation, copy or symlink the skill folder into a repo or user skill location:

```bash
mkdir -p .agents/skills
cp -R skills/wonder-together .agents/skills/
```

or:

```bash
mkdir -p ~/.agents/skills
cp -R skills/wonder-together ~/.agents/skills/
```

## Claude And Cursor

For Claude:

```bash
mkdir -p .claude/skills
cp -R skills/wonder-together .claude/skills/
```

For Cursor:

```bash
mkdir -p .cursor/skills
cp -R skills/wonder-together .cursor/skills/
```

Symlinks are fine during local development if your tool follows them.

## Sample

See `samples/moon-following-car/` for a full demo package:

- `package.md`: packet response, prompts, review notes, and limitations
- `character-sheet.png`: reusable character reference
- `moon-parallax-explainer.png`: diagram-first moon/parallax explainer
- `story-scene.png`: read-aloud companion scene
- `activity-thumb-test.png`: safe indoor parallax activity

## Development

Run the local checks:

```bash
npm run check
```

The check verifies the plugin manifest, marketplace metadata, required skill files, and sample files. It does not judge the quality of generated prose or images.

## Scope

This is an instruction-only skill/plugin package. It does not include a hosted generator, app routes, API routes, database code, auth, Stripe, or live GPT configuration.
