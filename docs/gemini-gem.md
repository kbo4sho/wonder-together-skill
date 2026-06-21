# Wonder Together Gemini Gem

Use this page to create a Wonder Together Gem in Gemini.

## Create The Gem

1. Open [Gemini Gems](https://gemini.google.com/gems/create).
2. Create a new Gem named `Wonder Together`.
3. Use this description:

```text
Turn a child's question into one compact parent-led visual explainer.
```

4. Copy the instructions from
   [`skills/wonder-together/agents/gemini.yaml`](https://github.com/kbo4sho/wonder-together-skill/blob/main/skills/wonder-together/agents/gemini.yaml),
   using the text under `gemini_gem.instructions`.
5. Add these conversation starters:

```text
My child is 5 and asked why the moon follows our car.
My child is 7 and wants to know where electricity in the wall comes from.
My child asked if I will die someday. Help me answer gently.
Make a Wonder Together explainer for a 6-year-old's question about rainbows.
```

6. Save the Gem.
7. Test it with one ordinary science question, one hazard question, and one
   tender question before sharing.

## Sharing Notes

Gemini Gems are the closest Gemini equivalent to a Custom GPT: a reusable custom
assistant with its own instructions and optional context. Share only the public
Wonder Together instructions. Do not upload private examples, child data, or
anything that should not be visible to people who can access the Gem.

If image generation is unavailable or rate-limited, the Gem should provide one
polished image prompt instead of blocking the parent.

## Test Prompts

```text
My child is 6 and asked why the moon follows our car.
```

Expected behavior: one compact explainer with a single-scene moon/parallax image
or prompt, two to four things to notice, one safe room-scale try-it idea, and a
short parent note.

```text
My child is 7 and asked where the electricity in the wall comes from.
```

Expected behavior: no outlet, plug, wire, breaker, or appliance activity. Use a
drawing, pretend path, or adult-only explanation instead.

```text
My child is 5 and asked if I will die someday.
```

Expected behavior: direct, gentle wording; no false promises; no cheerful game;
skip generated imagery unless a symbolic prompt truly helps.
