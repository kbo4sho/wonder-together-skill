# Wonder Together Skill

Wonder Together is a portable Agent Skill for turning a child's question into a
compact parent-led visual explainer: one single-scene explainer image or image
prompt, a core idea, a few things to notice, one tiny try-it idea, and a parent
note.

This repo is the distribution package. The skill itself lives in `skills/wonder-together/`, and Codex can install it as the `wonder-together-skill` plugin.

## Public Page

The canonical public page lives in this repo at [`docs/index.html`](docs/index.html)
and is intended to be published with GitHub Pages from the `main` branch
`/docs` folder:

```text
https://kbo4sho.github.io/wonder-together-skill/
```

It explains the problem Wonder Together solves, shows the primary single-scene
moon explainer image, links the Custom GPT and Gemini Gem setup path, and points
users toward supported platform paths. The portable prompt remains available for
maintainers at
[`docs/public-parent-prompt.md`](docs/public-parent-prompt.md).
The repo-side Custom GPT instruction source lives at
[`skills/wonder-together/agents/openai.yaml`](skills/wonder-together/agents/openai.yaml).
The repo-side Gemini Gem instruction source lives at
[`skills/wonder-together/agents/gemini.yaml`](skills/wonder-together/agents/gemini.yaml),
with maintainer setup notes at [`docs/gemini-gem.md`](docs/gemini-gem.md)
and a public setup page at [`docs/gemini-gem.html`](docs/gemini-gem.html).

## What It Does

Use it when you want creator-facing Wonder Together output such as:

- single-scene visual explainers from child questions
- Big/Little Wonderer explainer image prompts
- gentle scripts for hard questions
- tiny parent-led try-it ideas
- expanded packets only when the user asks for more

The default explainer shape is:

```markdown
# Wonder Together Visual Explainer

## Core idea
## Explainer image
## What to notice
## Try it together
## Parent note
## Want more?
```

For a fuller map of the current outputs, see
[`docs/what-the-skill-produces.md`](docs/what-the-skill-produces.md).
For the copyable assistant prompt, see
[`docs/public-parent-prompt.md`](docs/public-parent-prompt.md).

## Gemini Gem

Gemini Gems are the closest Gemini equivalent to a Custom GPT: a reusable custom
assistant with a name, description, instructions, and starters.

Create the Gem from [`docs/gemini-gem.html`](docs/gemini-gem.html), using the
public instruction source in
[`skills/wonder-together/agents/gemini.yaml`](skills/wonder-together/agents/gemini.yaml).
Publishing or sharing the Gem has to happen from the maintainer's Gemini account.

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

You can also ask for a Wonder Together visual explainer, parent guide, image
prompt, or shared learning moment. Ask for a fuller packet when you want a story,
longer explanation, game, or follow-up sections.

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

See `samples/moon-following-car/` for a demo package:

- `package.md`: visual explainer, prompts, review notes, and limitations
- `character-sheet.png`: reusable character reference
- `moon-parallax-explainer.png`: primary single-scene moon/parallax explainer
- `story-scene.png`: optional companion scene
- `activity-thumb-test.png`: optional safe indoor activity visual

## Development

Run the local checks:

```bash
npm run check
```

The check verifies the plugin manifest, marketplace metadata, required skill files, docs, and sample files. It does not judge the quality of generated prose or images.

## Product Wrapper Sync

This repo is the canonical source for the portable Agent Skill. The sibling
product repo lives at:

```text
/Users/kevinbolander/Docs/Workspace/super-dad
```

When changing output shape, safety/tender-topic policy, visual language,
examples, or any behavior that should also appear in the public Custom GPT
instructions or hosted lab generator, update `super-dad` in the same workstream.

Recommended local workflow:

```bash
cd /Users/kevinbolander/Docs/Workspace/wonder-together-skill
git checkout -b wt/<change-name>
npm run check

cd /Users/kevinbolander/Docs/Workspace/super-dad
git checkout -b wt/<change-name>
npm run check:skill-sync
```

In `super-dad`, product-facing updates usually land in `src/lib/toolkit.ts`,
`src/lib/orchestrator.ts`, `src/lib/generators/`, and `src/lib/output-lab.ts`,
depending on whether the change affects the public prompt, runtime generator, or
benchmark expectations. Do not copy the `super-dad` `.agent` pilot process into
this repo unless Kevin explicitly asks for that rollout.

## Scope

This is an instruction-only skill/plugin package. It does not include a hosted generator, app routes, API routes, database code, auth, Stripe, or live GPT configuration.
