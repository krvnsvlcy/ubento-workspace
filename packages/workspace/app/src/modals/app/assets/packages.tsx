import { useWorkspaceEngine } from "@/contexts/workspace";
import { useDebounce } from "@/hooks/use-debouce.js";
import {
  Button,
  Card,
  Content,
  ContentBody,
  ContentHeader,
  ContentFooter,
  EmptyView,
  Heading,
  Input,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  ScrollArea,
  Spinner,
  Text,
} from "@ubento/bento.arlo-core";
import {
  Box,
  ExternalLink,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import React, { FC, useState, useEffect } from "react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../go-back.js";

// Basic markdown parser to render README without external package dependencies
function parseMarkdown(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  let inCodeBlock = false;
  let codeLines: string[] = [];

  return lines.map((line, idx) => {
    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const code = codeLines.join("\n");
        codeLines = [];
        return (
          <pre key={idx} className="bg-background/80 border border-border/40 p-4 rounded-xl font-mono text-xs overflow-x-auto my-3 text-content">
            <code>{code}</code>
          </pre>
        );
      } else {
        inCodeBlock = true;
        return null;
      }
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return null;
    }

    // Headers
    if (line.startsWith("# ")) {
      return (
        <h1 key={idx} className="text-2xl font-bold mt-6 mb-3 text-foreground border-b border-border/20 pb-1">
          {line.slice(2)}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-xl font-bold mt-5 mb-2 text-foreground border-b border-border/10 pb-1">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-lg font-bold mt-4 mb-2 text-foreground">
          {line.slice(4)}
        </h3>
      );
    }

    // Bullet list items
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <li key={idx} className="ml-4 list-disc text-sm text-content-muted my-1">
          {line.slice(2)}
        </li>
      );
    }

    // Empty lines
    if (!line.trim()) {
      return <div key={idx} className="h-2" />;
    }

    // Normal paragraph
    return (
      <p key={idx} className="text-sm text-content-muted leading-relaxed my-2">
        {line}
      </p>
    );
  }).filter(Boolean);
}

interface PackageCardProps {
  pkg: any;
  isInstalled: boolean;
  onSelect: (packageName: string) => void;
}

const PackageCard: FC<PackageCardProps> = ({
  pkg,
  isInstalled,
  onSelect,
}) => {
  return (
    <Card
      variant="surface-interactive"
      onClick={() => onSelect(pkg.name)}
      className="flex flex-col items-start text-left"
    >
      <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-background text-content-muted mb-3 overflow-hidden">
        <Box className="h-5 w-5" />
      </div>
      <div className="w-full flex items-center justify-between gap-2 mb-1">
        <h4 className="text-sm font-bold text-content group-hover:text-foreground transition-colors truncate">
          {pkg.name}
        </h4>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-content-muted font-mono">{pkg.version}</span>
          {isInstalled && (
            <span className="px-2 py-0.5 rounded-full bg-base/10 border border-border/20 text-base text-[9px] font-bold uppercase tracking-wider">
              Installed
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-content-muted line-clamp-2 mb-3">
        {pkg.description || "No description provided."}
      </p>
      {pkg.links?.npm && (
        <a
          href={pkg.links.npm}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-auto flex items-center gap-1 text-[10px] text-base hover:underline"
        >
          View on npm <ExternalLink size={10} />
        </a>
      )}
    </Card>
  );
};

interface PackageDetailsProps {
  name: string;
  onBack: () => void;
  onInstall: (pkg: any) => void;
  onUninstall: () => void;
  isInstalled: boolean;
}

export const PackageDetails: FC<PackageDetailsProps> = ({
  name,
  onBack,
  onInstall,
  onUninstall,
  isInstalled,
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://registry.npmjs.org/${name}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch details for package ${name}`);
        }
        const json = await res.json();
        if (active) {
          setData(json);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || String(err));
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    fetchDetails();
    return () => {
      active = false;
    };
  }, [name]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-12">
        <Spinner className="text-content-muted" />
        <span className="text-xs text-content-muted mt-2">Fetching package details...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-12 gap-4">
        <span className="text-sm text-content-muted">{error || "Failed to load package."}</span>
        <Button onClick={onBack} variant="primary">Go Back</Button>
      </div>
    );
  }

  const latestVersion = data["dist-tags"]?.latest || data.version || "0.0.0";
  const readmeText = data.readme || `No README provided for ${name}.`;

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentBody className="space-y-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs text-content-muted hover:text-content transition-colors font-medium border border-border/30 px-2.5 py-1 rounded-lg bg-surface/50 w-fit"
            >
              ← Back to search
            </button>

            {/* Package details */}
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-background border border-border/50 text-content-muted">
              <Box size={28} />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground truncate">{data.name}</h2>
              <p className="text-xs text-content-muted font-mono">v{latestVersion}</p>
            </div>

            {data.description && (
              <p className="text-xs text-content-muted leading-relaxed">
                {data.description}
              </p>
            )}

            <div className="border-t border-border/20 pt-3 space-y-2">
              {data.license && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-content-muted">License</span>
                  <span className="font-medium text-content">{data.license}</span>
                </div>
              )}
              {data.homepage && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-content-muted">Homepage</span>
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-base hover:underline truncate max-w-[120px]"
                  >
                    {data.homepage}
                  </a>
                </div>
              )}
            </div>
          </ContentBody>
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content>
          <ContentHeader>
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="flex-1 space-y-1">
                <Heading className="text-2xl font-bold tracking-tight">
                  {data.name}
                </Heading>
                <p className="text-xs text-content-muted">README.md</p>
              </div>
              <div className="flex items-center gap-2">
                {isInstalled ? (
                  <Button
                    onClick={onUninstall}
                    tone="destructive"
                    variant="primary"
                    className="gap-2"
                  >
                    <Trash2 size={16} /> Uninstall
                  </Button>
                ) : (
                  <Button
                    onClick={() => onInstall(data)}
                    variant="primary"
                    className="gap-2"
                  >
                    <Sparkles size={16} /> Install
                  </Button>
                )}
              </div>
            </div>
          </ContentHeader>
          <ContentBody paddingX={false} paddingY={false} className="overflow-hidden">
            <ScrollArea className="px-6 pb-6">
              <div className="space-y-1 pb-8">
                {parseMarkdown(readmeText)}
              </div>
            </ScrollArea>
          </ContentBody>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
};

export const PackagesBrowserModal: FC = () => {
  const activeWorkspaceEngine = useWorkspaceEngine();

  const specData = activeWorkspaceEngine?.useState((s) => (s.workspace as any)?.spec?.data) || {};
  const installedPackages = specData.packages || {};

  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 500);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([]);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(debouncedSearch)}&size=20`);
        if (res.ok) {
          const data = await res.json();
          const items = (data.objects || []).map((obj: any) => obj.package);
          setResults(items);
        }
      } catch (err) {
        console.error("NPM search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [debouncedSearch]);

  const handleInstall = (pkg: any) => {
    const latestVersion = pkg["dist-tags"]?.latest || pkg.version || "0.0.0";
    const currentPackages = { ...installedPackages };
    currentPackages[pkg.name] = `^${latestVersion}`;

    activeWorkspaceEngine.updateWorkspaceSpec({
      spec: {
        packages: currentPackages
      }
    });
  };

  const handleUninstall = (pkgName: string) => {
    const currentPackages = { ...installedPackages };
    delete currentPackages[pkgName];

    activeWorkspaceEngine.updateWorkspaceSpec({
      spec: {
        packages: currentPackages
      }
    });
  };

  if (selectedPackageName) {
    return (
      <PackageDetails
        name={selectedPackageName}
        onBack={() => setSelectedPackageName(null)}
        onInstall={handleInstall}
        onUninstall={() => handleUninstall(selectedPackageName)}
        isInstalled={!!installedPackages[selectedPackageName]}
      />
    );
  }

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <GoBack />
            <Heading>NPM Packages</Heading>
            <Text shade="subtle">Search and install npm packages to your workspace.</Text>
          </ContentHeader>
          <ContentBody>
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col gap-2">
              <span className="text-xs font-bold text-content">How it works</span>
              <p className="text-[11px] text-content-muted leading-relaxed">
                Installing npm packages adds them to your workspace spec file.
                These packages will be automatically resolved and imported in your boards, components, and modules.
              </p>
            </div>
          </ContentBody>
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content>
          <ContentHeader className="space-y-4">
            <Input
              prefix={<Search className="h-4 w-4 text-content-muted" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search packages on registry.npmjs.org..."
              className="w-full"
              autoFocus
            />
          </ContentHeader>
          <ContentBody
            paddingX={false}
            paddingY={false}
            className="overflow-hidden"
          >
            <Switch>
              <Case condition={isLoading}>
                <div className="flex justify-center p-12">
                  <Spinner className="text-content-muted" />
                </div>
              </Case>
              <Case condition={!results.length}>
                <EmptyView message={query ? "No matching packages found." : "Search for a package to get started."} />
              </Case>
              <Default>
                <ScrollArea>
                  <div className="px-6 grid grid-cols-2 gap-4 pb-6">
                    {results.map((pkg: any) => {
                      const isInstalled = !!installedPackages[pkg.name];
                      return (
                        <PackageCard
                          key={pkg.name}
                          pkg={pkg}
                          isInstalled={isInstalled}
                          onSelect={setSelectedPackageName}
                        />
                      );
                    })}
                  </div>
                </ScrollArea>
              </Default>
            </Switch>
          </ContentBody>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
};
