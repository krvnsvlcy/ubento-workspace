import path from "path";
import { Project } from "ts-morph";

function isRelativeImport(moduleSpecifier: string) {
  return moduleSpecifier.startsWith(".") || moduleSpecifier.startsWith("~");
}

/**
 * Fixes all relative import/export paths to end with ".js" (instead of ".ts"/".tsx"/nothing)
 * in all TypeScript files of a project.
 * @param rootDir - Path to the root directory (should contain tsconfig.json)
 */
export async function fixImports() {
  const tsConfigPath = path.join(".", "tsconfig.json");

  // Setup project
  const project = new Project({
    tsConfigFilePath: tsConfigPath,
    skipFileDependencyResolution: true,
  });

  const files = project.getSourceFiles();
  let updatedCount = 0;

  for (const sourceFile of files) {
    let modified = false;
    // Handle imports
    for (const importDecl of sourceFile.getImportDeclarations()) {
      const moduleSpec = importDecl.getModuleSpecifierValue();
      if (isRelativeImport(moduleSpec) && !moduleSpec.endsWith(".js")) {
        const updated = moduleSpec.replace(/(\.ts|\.tsx)$/, "") + ".js";
        if (moduleSpec !== updated) {
          importDecl.setModuleSpecifier(updated);
          modified = true;
        } else if (!moduleSpec.endsWith(".js")) {
          importDecl.setModuleSpecifier(moduleSpec + ".js");
          modified = true;
        }
      }
    }

    // Handle export ... from "..."
    for (const exportDecl of sourceFile.getExportDeclarations()) {
      const moduleSpec = exportDecl.getModuleSpecifierValue();
      if (
        moduleSpec &&
        isRelativeImport(moduleSpec) &&
        !moduleSpec.endsWith(".js")
      ) {
        const updated = moduleSpec.replace(/(\.ts|\.tsx)$/, "") + ".js";
        if (moduleSpec !== updated) {
          exportDecl.setModuleSpecifier(updated);
          modified = true;
        } else if (!moduleSpec.endsWith(".js")) {
          exportDecl.setModuleSpecifier(moduleSpec + ".js");
          modified = true;
        }
      }
    }

    if (modified) {
      await sourceFile.save();
      updatedCount++;
      console.log(`Updated: ${sourceFile.getFilePath()}`);
    }
  }

  console.log(`Done. Updated ${updatedCount} files.`);
}
