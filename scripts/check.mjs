import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

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

  console.log("wonder-together-skill checks passed");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
