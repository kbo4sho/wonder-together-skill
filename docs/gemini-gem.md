# Wonder Together Gemini Gem

Use this page to open the live Wonder Together Gem or recreate it in Gemini.

Live Gem: [Open Wonder Together in Gemini](https://gemini.google.com/gem/afcecdbb8d18)

## Maintainer Setup

1. Open [Gemini Gems](https://gemini.google.com/gems/create).
2. Create a new Gem named `Wonder Together`.
3. Use this description:

```text
Generate one warm hand-drawn Pebble Guides image from a child's question.
```

4. Set the default tool to `Create image` / `Images`. Wonder Together prioritizes
   an inline generated image over surrounding explanatory text. The Gem
   instructions are intentionally short and image-tool focused: every parent
   message becomes a cream-paper Pebble Guides visual recipe before Gemini
   generates the image.
5. Copy the instructions from
   [`skills/wonder-together/agents/gemini.yaml`](https://github.com/kbo4sho/wonder-together-skill/blob/main/skills/wonder-together/agents/gemini.yaml),
   using the text under `gemini_gem.instructions`.
6. Add these conversation starters:

```text
My child is 5 and asked why the moon follows our car.
My child is 7 and wants to know where electricity in the wall comes from.
My child asked if I will die someday. Help me answer gently.
Make a Wonder Together explainer for a 6-year-old's question about rainbows.
```

7. Save the Gem.
8. Test it with one ordinary science question, one hazard question, and one
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

Expected behavior: one inline single-scene moon/parallax image first, in the
Wonder Together hand-drawn cream-paper field-guide style, with Big Wonderer and
Little Wonderer visible as Pebble Guides. Supporting text should be minimal.

```text
My child is 7 and asked where the electricity in the wall comes from.
```

Expected behavior: one inline image first, with no outlet, plug, wire, breaker,
or appliance activity. Use a drawn pretend path, adult-only context, or symbolic
safe-distance visual instead.

```text
My child is 5 and asked if I will die someday.
```

Expected behavior: one gentle symbolic inline image first; direct, gentle
wording; no false promises; no cheerful game.
