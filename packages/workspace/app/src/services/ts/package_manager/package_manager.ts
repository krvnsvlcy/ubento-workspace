import { Logger, TypeDefStore } from "./typedef_store.js";

export type PackageInstallState =
  | "installed"
  | "installing"
  | "pending"
  | "failed";

export type PackageInstallStatus = {
  name: string;
  version: string;
  registry?: string;
  state: PackageInstallState;
  error?: string;
};

export type PackageData = {
  name: string;
  version: string;
  registry?: string;
};

export interface PackageFileWriter {
  writeFiles(files: Record<string, string>): Promise<void>;
}

export class TsPackageManager {
  readonly typeDefStore: TypeDefStore;
  readonly writer: PackageFileWriter;

  private _onStatusesChange: (
    statuses: Record<string, PackageInstallStatus>,
  ) => void;
  private _installedPackages: Record<string, PackageData> = {};
  private _installQueue: PackageData[] = [];
  private _installing = false;
  private _logger?: Logger;
  private _statuses: Record<string, PackageInstallStatus> = {};

  private updateStatus(name: string, update: Partial<PackageInstallStatus>) {
    const current = this._statuses[name] || {
      name,
      version: "unknown",
      state: "pending",
    };

    // GUARDRAIL 1: Prevent unnecessary state emissions to avoid UI infinite loops
    let hasChanges = false;
    for (const key in update) {
      if (
        update[key as keyof PackageInstallStatus] !==
        current[key as keyof PackageInstallStatus]
      ) {
        hasChanges = true;
        break;
      }
    }

    if (!hasChanges) return; // Exit early if the exact same values are passed

    this._statuses[name] = { ...current, ...update };
    this._onStatusesChange({ ...this._statuses });
  }

  constructor({
    typeDefStore,
    writer,
    logger,
    onStatusesChange,
  }: {
    typeDefStore: TypeDefStore;
    writer: PackageFileWriter;
    logger?: Logger;
    onStatusesChange?: (statuses: Record<string, PackageInstallStatus>) => void;
  }) {
    this.typeDefStore = typeDefStore;
    this.writer = writer;
    this._logger = logger;
    this._onStatusesChange = onStatusesChange || (() => {});
  }

  public async updatePackages(packages: PackageData[]) {
    const toRemove = { ...this._installedPackages };

    for (const pkg of packages) {
      const installed = this._installedPackages[pkg.name];

      // GUARDRAIL 2: Only install if it's completely missing OR the version has changed.
      const isSameVersionInstalled =
        installed && installed.version === pkg.version;

      if (!isSameVersionInstalled) {
        this.pushInstallQueue(pkg);
      }

      delete toRemove[pkg.name];
    }

    for (const leftover of Object.values(toRemove)) {
      this.uninstallPackage(leftover);
    }
  }

  private async runInstall() {
    if (this._installing) return;
    this._installing = true;

    try {
      while (this._installQueue.length > 0) {
        const pkg = this._installQueue.shift();

        // GUARDRAIL 3: Double check we didn't just install it as a dependency
        if (!pkg || this._installedPackages[pkg.name]?.version === pkg.version)
          continue;

        this.updateStatus(pkg.name, {
          state: "installing",
          version: pkg.version,
        });

        await this.installPackage(pkg);
      }
    } catch (e) {
      this._logger?.error("Install queue failed", {
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      // Ensure we always release the lock
      this._installing = false;
    }
  }

  private pushInstallQueue(pkg: PackageData) {
    const currentStatus = this._statuses[pkg.name];

    // GUARDRAIL 4: Prevent "In-Flight" dupes.
    // If it is already pending or actively installing the same version, ignore it.
    if (
      currentStatus &&
      currentStatus.version === pkg.version &&
      (currentStatus.state === "pending" ||
        currentStatus.state === "installing")
    ) {
      return;
    }

    if (
      this._installQueue.some(
        (p) => p.name === pkg.name && p.version === pkg.version,
      )
    )
      return;

    this._installQueue.push(pkg);

    this.updateStatus(pkg.name, {
      name: pkg.name,
      version: pkg.version,
      registry: pkg.registry,
      state: "pending",
      error: undefined,
    });

    this.runInstall();
  }

  private async installPackage(pkg: PackageData) {
    const startTime = performance.now();
    this._logger?.info(`Installing ${pkg.name}@${pkg.version}...`, {
      event: "package.install.started",
      packageName: pkg.name,
      version: pkg.version,
    });

    try {
      const definition = await this.typeDefStore.get(pkg.name, pkg.version, {
        registry: pkg.registry,
      });

      if (!definition) {
        this._logger?.warn(
          `Could not resolve types for ${pkg.name}@${pkg.version}`,
          {
            event: "package.install.completed",
            packageName: pkg.name,
            version: pkg.version,
            success: false,
            durationMs: performance.now() - startTime,
            error: "Could not resolve types",
          },
        );
        this.updateStatus(pkg.name, {
          state: "failed",
          error: `Could not resolve types for ${pkg.name}@${pkg.version}`,
        });
        return;
      }

      this._installedPackages[pkg.name] = pkg;

      const filesToWrite: Record<string, string> = {
        [`/node_modules/${pkg.name}/package.json`]: definition.packageJsonText,
      };

      for (const [relativePath, content] of Object.entries(
        definition.typeDefs,
      )) {
        filesToWrite[`/node_modules/${pkg.name}/${relativePath}`] = content;
      }

      await this.writer.writeFiles(filesToWrite);

      const fileCount = Object.keys(definition.typeDefs).length + 1;
      this._logger?.info(`Installed ${pkg.name}@${pkg.version}`, {
        event: "package.install.completed",
        packageName: pkg.name,
        version: pkg.version,
        success: true,
        durationMs: performance.now() - startTime,
        fileCount,
      });

      this.updateStatus(pkg.name, { state: "installed", error: undefined });

      for (const [depName, depVersion] of Object.entries(
        definition.dependencies,
      )) {
        // Clean version specifier
        const cleanVersion = depVersion.replace(/[\^~]/, "");

        // GUARDRAIL 5: Ensure we don't try to install a dependency that matches what we already have
        if (this._installedPackages[depName]?.version === cleanVersion)
          continue;

        this.pushInstallQueue({
          name: depName,
          version: cleanVersion,
          registry: pkg.registry,
        });
      }
    } catch (e) {
      this._logger?.error(`Failed to install ${pkg.name}@${pkg.version}`, {
        event: "package.install.completed",
        packageName: pkg.name,
        version: pkg.version,
        success: false,
        durationMs: performance.now() - startTime,
        error: e instanceof Error ? e.message : String(e),
      });
      this.updateStatus(pkg.name, {
        state: "failed",
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  private uninstallPackage(pkg: PackageData) {
    this._logger?.info(`Uninstalling ${pkg.name}...`, {
      event: "package.uninstall.completed",
      packageName: pkg.name,
    });
    delete this._installedPackages[pkg.name];
    delete this._statuses[pkg.name];
    this._onStatusesChange({ ...this._statuses });
  }

  public forceReinstall(packageName: string) {
    const status = this._statuses[packageName];
    if (status) {
      delete this._installedPackages[packageName];
      // GUARDRAIL: reset status immediately so it bypasses the "in-flight" check
      this.updateStatus(packageName, { state: "pending" });
      this.pushInstallQueue({
        name: status.name,
        version: status.version,
        registry: status.registry,
      });
    }
  }
}
