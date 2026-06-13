---
name: wonder-together
description: Create compact Wonder Together visual explainers from a child's question or topic. Use when the user asks for a Wonder Together output, child-question explainer, parent-led visual explanation, Big/Little Wonderer image prompt, family activity idea, or gentle parent-facing explanation for tender or hazardous topics.
---

# Wonder Together

Use this skill to turn a child's question into a parent-led visual explainer that
a grownup can show, read, and try with the child.

Default to less output. The main artifact is one strong single-scene explainer
image, with Big Wonderer and Little Wonderer reinforcing the parent-child
relationship when the topic can safely hold them.

## Core Workflow

1. Gather missing essentials before writing:
   - child's question or topic
   - child's age
   - child's name only if the parent wants personalization
   - parent context that changes the answer
2. If the request already has enough context, produce the visual explainer immediately.
3. For tender or hazardous topics, read [references/safety-and-tenderness.md](references/safety-and-tenderness.md) before drafting.
4. For image work, read [references/visual-language.md](references/visual-language.md).
5. Use Big Wonderer and Little Wonderer by default for ordinary visuals. Read [references/character-system.md](references/character-system.md) when the visual needs the recurring pair.
6. Generate exactly one image when image generation is available. If image generation is not available, provide one polished prompt instead.
7. Keep expanded stories, longer explanations, games, and full packets as an explicit follow-up path only.

## Output Shape

Follow [references/packet-contract.md](references/packet-contract.md) for the full contract.

Use this default shape:

```markdown
# Wonder Together Visual Explainer

## Core idea

## Explainer image

## What to notice

## Try it together

## Parent note

## Want more?
```

## Visual Policy

The image should carry the first impression. It should be a focused single
scene with light diagram cues embedded in that scene, not a poster, cover, title
card, worksheet, storyboard, multi-panel packet, brand image, or full answer
inside a picture. For ordinary explainers, a short hand-lettered question title
in the top paper margin is allowed when it orients the scene; keep it small and
integrated, not a poster or title-card treatment.

For ordinary questions:

- Make one explainer image first.
- Include Big Wonderer and Little Wonderer unless the concept is clearer without them.
- Show the parent-child relationship through scale, proximity, shared gaze, and Big Wonderer standing beside or slightly behind Little Wonderer.
- Keep the real concept central: the moon, circuit path, body signal, rainbow, map, timeline, object, or activity setup.
- Prefer one coherent scene over numbered steps, split panels, before/after
  layouts, or collage-like groups of ideas.
- When helpful, add one short centered explainer title plus two or three short
  mechanism labels inside the image.
- Use only a few short in-image labels, arrows, or sightlines when they help the
  scene explain itself. Put supporting parent guidance in normal text outside
  the image.

For tender topics, skip generated images unless one gentle symbolic visual helps
the parent. Do not force the recurring pair into literal grief, illness, medical,
violent, or frightening imagery.

## Safety Defaults

- Do not suggest real-world testing with outlets, plugs, cords, sockets, switches, breaker boxes, fire, chemicals, choking risks, sharp tools, heights, roads, or water.
- Use drawings, pretend paths, adult-only context, conversation, or other safe alternatives.
- Do not give medical, legal, financial, therapeutic, or emergency advice.
- For death, grief, illness, fear, bodies, identity, or conflict, be direct, gentle, and parent-facing. Do not turn the topic into a game unless the parent explicitly asks and it remains kind.

## Expansion Path

If the user asks for a fuller packet, story, game, lesson, or more sections,
expand from the same core idea. A full packet may include:

- story to read together
- longer explanation
- additional visual prompts
- parent-led activity or mini game
- parent note
- follow-up questions

Do not include the full packet by default.

## Examples

Use examples only as references, not as templates to copy word-for-word:

- Ordinary science visual explainer: [examples/moon-packet.md](examples/moon-packet.md)
- Tender question with image restraint: [examples/death-question.md](examples/death-question.md)

## Platform Notes

This repository keeps the distribution skill source at `skills/wonder-together/`.

- Codex: use the repo-local skill directly.
- Claude: copy or symlink this folder to `.claude/skills/wonder-together/`.
- Cursor: copy or symlink this folder to `.cursor/skills/wonder-together/`, or import it from GitHub where available.

Keep platform copies temporary. Update `skills/wonder-together/` first in the distribution repo.
