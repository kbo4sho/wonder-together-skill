import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sampleImagePath = "docs/assets/wonder-together-moon-explainer-single-scene.png";

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

async function requirePublicPromptMirrored() {
  const markdown = await readFile(path.join(root, "docs/public-parent-prompt.md"), "utf8");
  const page = await readFile(path.join(root, "docs/index.html"), "utf8");
  const markdownMatch = markdown.match(/```text\n([\s\S]*?)\n```/);
  const pageMatch = page.match(/<textarea class="prompt-box" id="promptText" readonly>\n([\s\S]*?)<\/textarea\s*>/);

  if (!markdownMatch) {
    throw new Error("docs/public-parent-prompt.md must include one text code block");
  }
  if (!pageMatch) {
    throw new Error("docs/index.html must include the copyable prompt textarea");
  }
  if (markdownMatch[1].trim() !== pageMatch[1].trim()) {
    throw new Error("docs/index.html prompt textarea must match docs/public-parent-prompt.md");
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
    "skills/wonder-together/references/packet-contract.md",
    "skills/wonder-together/references/visual-language.md",
    "skills/wonder-together/references/safety-and-tenderness.md",
    "skills/wonder-together/references/character-system.md",
    "skills/wonder-together/examples/moon-packet.md",
    "skills/wonder-together/examples/death-question.md",
    "docs/.nojekyll",
    "docs/index.html",
    "docs/assets/style.css",
    sampleImagePath,
    "docs/public-parent-prompt.md",
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

  await requireContains("README.md", [
    "docs/index.html",
    "docs/public-parent-prompt.md",
    "https://kbo4sho.github.io/wonder-together-skill/"
  ]);

  await requireContains("docs/index.html", [
    "Make every <span class=\"hand-underline\">&ldquo;why?&rdquo;</span><br />a moment together.",
    "assets/wonder-together-moon-explainer-single-scene.png",
    "codex plugin marketplace add kbo4sho/wonder-together-skill --ref main",
    "https://chatgpt.com/g/g-6a147d34e674819181c331f79c0e2e27-wonder-together",
    "promptText"
  ]);

  await requireContains("docs/public-parent-prompt.md", [
    "You are Wonder Together",
    "one compact single-scene visual explainer",
    "For tender topics",
    "For hazards"
  ]);

  await requirePublicPromptMirrored();
  await requirePngDimensions(sampleImagePath, 1536, 1024);

  console.log("wonder-together-skill checks passed");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
