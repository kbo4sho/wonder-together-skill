---
name: wonder-together
description: Create Wonder Together parent-mediated learning packets, parent guides, visual explainers, and shared learning moments from a child's question or topic. Use when the user asks for Wonder Together output, child-question packets, parent-led explanations, family activities, gentle scripts for hard questions, visual section prompts, or creator-facing Wonder Together materials.
---

# Wonder Together

Use this skill to turn a child's question into a parent-led learning packet that a grownup can read, explain, draw, act out, or play through with the child.

This is a creator-facing production workflow. The audience of the output is the adult, not an unsupervised child.

## Core Workflow

1. Gather missing essentials before writing:
   - child's question or topic
   - child's age
   - child's name only if the parent wants personalization
   - parent context that changes the answer
2. If the request already has enough context, produce the packet immediately.
3. Always include story and explanation.
4. Add visuals, activities, games, diagrams, history, or misconception notes only when they help the question.
5. Keep the parent in control of what is shared.
6. For tender or hazardous topics, read [references/safety-and-tenderness.md](references/safety-and-tenderness.md) before drafting.
7. For image or diagram work, read [references/visual-language.md](references/visual-language.md) before drafting visual prompts.
8. When a request needs consistent characters across visuals, read [references/character-system.md](references/character-system.md) and use `Big Wonderer` plus `Little Wonderer`.

## Packet Contract

Follow [references/packet-contract.md](references/packet-contract.md) for the full contract.

Use this output shape:

```markdown
# Wonder Together Packet

## Core idea

## Story to read together

## Explain it simply

## Visuals

## Try it together

## Parent note

## Follow-up questions
```

The packet should feel warm, concrete, and useful in the next five minutes. Avoid generic lectures, cute stand-ins that replace the real concept, and long adult-only explanations.

## Visual Policy

Use original Wonder Together visual language:

- grounded child-and-grownup scenes
- optional consistent `Big Wonderer` and `Little Wonderer` minimal diagram actors
- simple inspectable diagrams
- soft field-guide colors
- hand-drawn linework
- everyday objects and body-scale comparisons
- no copied Xiaohei character, blob mascot, or direct visual imitation

For ordinary topics, include a small useful image set in the `Visuals` section. Pick one best first visual, usually an explanation diagram, then list short commands for optional follow-up visuals.

For tender topics, skip generated images unless one gentle symbolic visual truly helps the parent.

## Safety Defaults

- Do not suggest real-world testing with outlets, plugs, cords, sockets, switches, breaker boxes, fire, chemicals, choking risks, sharp tools, heights, roads, or water.
- Use drawings, pretend paths, adult-only context, or conversation instead.
- Do not give medical, legal, financial, or emergency advice.
- For death, grief, illness, fear, bodies, identity, or conflict, be direct, gentle, and parent-facing. Do not turn the topic into a game unless the parent explicitly asks and it remains kind.

## Examples

Use examples only as references, not as templates to copy word-for-word:

- Ordinary science with a useful visual: [examples/moon-packet.md](examples/moon-packet.md)
- Tender question with no forced image or game: [examples/death-question.md](examples/death-question.md)

## Platform Notes

This repository keeps the distribution skill source at `skills/wonder-together/`.

- Codex: use the repo-local skill directly.
- Claude: copy or symlink this folder to `.claude/skills/wonder-together/`.
- Cursor: copy or symlink this folder to `.cursor/skills/wonder-together/`, or import it from GitHub where available.

Keep platform copies temporary. Update `skills/wonder-together/` first in the distribution repo.
