import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sampleImagePath = "docs/assets/wonder-together-moon-explainer-single-scene.png";
const sampleWebpImagePath = "docs/assets/wonder-together-moon-explainer-single-scene.webp";
const supportImagePaths = [
  "docs/assets/wonder-together-wall-samples.png"
];
const supportWebpImagePaths = [
  "docs/assets/wonder-together-wall-samples.webp"
];

async function readJson(relativePath) {
  const fullPath = path.join(root, relativePath);
  try {
    return JSON.parse(await readFile(fullPath, "utf8"));
  } catch (error) {
    throw new Error(`${relativePath} is not valid JSON: ${error.message}`);
  }
}

async function requireFile(relativePath) {
  const fullPath = path.join(root, relativePath);
  const info = await stat(fullPath).catch(() => null);
  if (!info || !info.isFile()) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

async function requireContains(relativePath, snippets) {
  const content = await readFile(path.join(root, relativePath), "utf8");
  for (const snippet of snippets) {
    if (!content.includes(snippet)) {
      throw new Error(`${relativePath} must include: ${snippet}`);
    }
  }
}

async function requireNotContains(relativePath, snippets) {
  const content = await readFile(path.join(root, relativePath), "utf8");
  for (const snippet of snippets) {
    if (content.includes(snippet)) {
      throw new Error(`${relativePath} must not include: ${snippet}`);
    }
  }
}

async function requirePublicPromptTextBlock() {
  const markdown = await readFile(path.join(root, "docs/public-parent-prompt.md"), "utf8");
  const markdownMatch = markdown.match(/```text\n([\s\S]*?)\n```/);

  if (!markdownMatch) {
    throw new Error("docs/public-parent-prompt.md must include one text code block");
  }
}

async function requirePngDimensions(relativePath, expectedWidth, expectedHeight) {
  const image = await readFile(path.join(root, relativePath));
  const pngSignature = "89504e470d0a1a0a";

  if (image.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error(`${relativePath} must be a PNG image`);
  }

  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  if (width !== expectedWidth || height !== expectedHeight) {
    throw new Error(`${relativePath} must be ${expectedWidth}x${expectedHeight}px`);
  }
}

async function requireWebpFile(relativePath) {
  const image = await readFile(path.join(root, relativePath));
  if (image.subarray(0, 4).toString("ascii") !== "RIFF" || image.subarray(8, 12).toString("ascii") !== "WEBP") {
    throw new Error(`${relativePath} must be a WEBP image`);
  }
}

async function main() {
  const plugin = await readJson(".codex-plugin/plugin.json");
  if (plugin.name !== "wonder-together-skill") {
    throw new Error(".codex-plugin/plugin.json name must be wonder-together-skill");
  }
  if (plugin.skills !== "./skills/") {
    throw new Error(".codex-plugin/plugin.json skills must point to ./skills/");
  }

  const marketplace = await readJson(".agents/plugins/marketplace.json");
  const entry = marketplace.plugins?.find((candidate) => candidate.name === "wonder-together-skill");
  if (!entry) {
    throw new Error("marketplace.json must include wonder-together-skill");
  }
  if (entry.source?.source !== "url") {
    throw new Error("marketplace entry must use Git-backed url source");
  }

  const requiredFiles = [
    "skills/wonder-together/SKILL.md",
    "skills/wonder-together/agents/openai.yaml",
    "skills/wonder-together/agents/gemini.yaml",
    "skills/wonder-together/references/packet-contract.md",
    "skills/wonder-together/references/visual-language.md",
    "skills/wonder-together/references/safety-and-tenderness.md",
    "skills/wonder-together/references/character-system.md",
    "skills/wonder-together/examples/moon-packet.md",
    "skills/wonder-together/examples/death-question.md",
    "docs/.nojekyll",
    "docs/index.html",
    "docs/assets/style.css",
    "docs/assets/fonts/inter-latin-variable.woff2",
    "docs/assets/fonts/newsreader-latin-variable.woff2",
    "docs/assets/fonts/newsreader-latin-italic-variable.woff2",
    sampleImagePath,
    sampleWebpImagePath,
    ...supportImagePaths,
    ...supportWebpImagePaths,
    "docs/public-parent-prompt.md",
    "docs/gemini-gem.md",
    "docs/gemini-gem.html",
    "docs/what-the-skill-produces.md",
    "samples/moon-following-car/package.md",
    "samples/moon-following-car/character-sheet.png",
    "samples/moon-following-car/moon-parallax-explainer.png",
    "samples/moon-following-car/story-scene.png",
    "samples/moon-following-car/activity-thumb-test.png"
  ];

  await Promise.all(requiredFiles.map(requireFile));

  const skill = await readFile(path.join(root, "skills/wonder-together/SKILL.md"), "utf8");
  if (!skill.includes("name: wonder-together")) {
    throw new Error("SKILL.md must declare name: wonder-together");
  }
  if (!skill.includes("description:")) {
    throw new Error("SKILL.md must include a description");
  }

  await requireNotContains(".codex-plugin/plugin.json", [
    "learning packets"
  ]);

  await requireContains("README.md", [
    "docs/index.html",
    "docs/public-parent-prompt.md",
    "skills/wonder-together/agents/openai.yaml",
    "skills/wonder-together/agents/gemini.yaml",
    "docs/gemini-gem.md",
    "https://gemini.google.com/gem/afcecdbb8d18",
    "https://kbo4sho.github.io/wonder-together-skill/"
  ]);

  await requireContains("docs/index.html", [
    "Make every <span class=\"hand-underline\">&ldquo;why?&rdquo;</span> <span class=\"hero-line\">a moment together.</span>",
    "Type your child&rsquo;s age and question. Wonder Together gives you",
    "assets/wonder-together-moon-explainer-single-scene.png",
    "assets/wonder-together-moon-explainer-single-scene.webp",
    "codex plugin marketplace add kbo4sho/wonder-together-skill --ref main",
    "mkdir -p .claude/skills",
    "https://chatgpt.com/g/g-6a147d34e674819181c331f79c0e2e27-wonder-together",
    "Open in ChatGPT",
    "Gemini Gem",
    "https://gemini.google.com/gem/afcecdbb8d18",
    "Open in Gemini",
    "Open the Gemini Gem.",
    "Parent-led",
    "No child account needed",
    "Safety-aware activities",
    "Tender questions handled gently",
    "Three steps. No new app to learn.",
    "Use the GPT",
    "Copy the prompt",
    "For builders",
    "Why open source?",
    "https://github.com/kbo4sho/wonder-together-skill",
    "https://github.com/kbo4sho/wonder-together-skill/blob/main/LICENSE",
    "public-parent-prompt.md",
    "what-the-skill-produces.md",
    "Kevin Bolander 2026",
    "Recurring guides",
    "Big Wonderer and Little Wonderer make each explainer feel familiar.",
    "assets/wonder-together-wall-samples.png",
    "assets/wonder-together-wall-samples.webp",
    "loading=\"lazy\""
  ]);

  await requireNotContains("docs/index.html", [
    "promptText",
    "promptPreview",
    "#prompt",
    "Other agent",
    "Start using it",
    "Pick your platform",
    "data-platform-tabs",
    "platform-chatgpt",
    "activatePlatformTab",
    "assets/wonder-together-recurring-guides.png",
    "assets/wonder-together-visual-thread.png",
    "Set up Gemini",
    "gemini-gem.html",
    "Create the Gemini Gem."
  ]);

  await requireContains("docs/assets/style.css", [
    "@font-face",
    "fonts/inter-latin-variable.woff2",
    "fonts/newsreader-latin-variable.woff2",
    "fonts/newsreader-latin-italic-variable.woff2"
  ]);

  await requireNotContains("docs/assets/style.css", [
    "fonts.googleapis.com"
  ]);

  await requireContains("docs/public-parent-prompt.md", [
    "You are Wonder Together",
    "one compact single-scene visual explainer",
    "For tender topics",
    "For hazards",
    "Do not give medical, legal, financial, therapeutic, or emergency advice"
  ]);

  await requireContains("docs/gemini-gem.md", [
    "Wonder Together Gemini Gem",
    "https://gemini.google.com/gem/afcecdbb8d18",
    "https://gemini.google.com/gems/create",
    "skills/wonder-together/agents/gemini.yaml",
    "Gemini Gems are the closest Gemini equivalent to a Custom GPT",
    "Create image",
    "inline generated image",
    "cream-paper Pebble Guides visual recipe",
    "If image generation is unavailable or rate-limited"
  ]);

  await requireContains("docs/gemini-gem.html", [
    "Wonder Together Gemini Gem Setup",
    "https://gemini.google.com/gem/afcecdbb8d18",
    "https://gemini.google.com/gems/create",
    "Open the Wonder Together Gemini Gem.",
    "Open in Gemini",
    "Use Create image.",
    "Pebble Guides visual recipe",
    "Open instruction source",
    "skills/wonder-together/agents/gemini.yaml",
    "If Gemini cannot"
  ]);

  await requireContains("skills/wonder-together/agents/openai.yaml", [
    "custom_gpt:",
    "You are Wonder Together",
    "child's question or topic",
    "Generate exactly one single-scene image",
    "Big Wonderer and Little Wonderer",
    "Pebble Guides",
    "For tender topics",
    "For hazardous topics",
    "Do not give medical, legal, financial, therapeutic, or emergency advice",
    "Do not claim Wonder Together stores accounts"
  ]);

  await requireContains("skills/wonder-together/agents/gemini.yaml", [
    "gemini_gem:",
    "https://gemini.google.com/gems/create",
    "public_url: \"https://gemini.google.com/gem/afcecdbb8d18\"",
    "recommended_default_tool: \"Create image\"",
    "Turn a child's question into one compact parent-led visual explainer",
    "Style accuracy matters more than surrounding text",
    "Use the default Images / Create image tool whenever it is available",
    "First action: generate exactly one inline single-scene image",
    "Do not write an article, lesson, list, packet, or ordinary Gemini answer before the image",
    "Treat this recipe as the actual image prompt",
    "Warm hand-drawn field-guide illustration on cream paper; gentle illustrated diagram, not a photograph",
    "Hard negatives for every image",
    "realistic animal closeup",
    "You are Wonder Together",
    "child's question or topic",
    "Create a Wonder Together single-scene visual explainer about",
    "If the first generated image does not clearly show both Pebble Guides",
    "still create one image when image generation is available",
    "If Gemini cannot create an image",
    "Big Wonderer and Little Wonderer",
    "Pebble Guides",
    "For tender topics",
    "For hazardous topics",
    "Do not give medical, legal, financial, therapeutic, or emergency advice",
    "conversations happen inside Gemini under the user's Google account"
  ]);

  await requirePublicPromptTextBlock();
  await requirePngDimensions(sampleImagePath, 1536, 1024);
  await requireWebpFile(sampleWebpImagePath);
  await Promise.all(
    supportImagePaths.map((imagePath) => requirePngDimensions(imagePath, 1536, 1024))
  );
  await Promise.all(
    supportWebpImagePaths.map(requireWebpFile)
  );

  console.log("wonder-together-skill checks passed");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
