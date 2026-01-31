import { build as viteBuild } from "vite";
import { rm } from "fs/promises";

async function buildFrontend() {
  // Limpar apenas a pasta dist/public
  await rm("dist/public", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("✅ Frontend build complete!");
}

buildFrontend().catch((err) => {
  console.error("❌ Frontend build failed:", err);
  process.exit(1);
});
