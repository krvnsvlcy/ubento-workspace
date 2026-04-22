export async function clean() {
  const fs = await import("fs/promises");
  const dirs = ["dist", "build"];
  for (const dir of dirs) {
    try {
      await fs.rm(dir, { recursive: true, force: true });
      console.log(`Removed: ${dir}`);
    } catch {
      // ignore
    }
  }
}
