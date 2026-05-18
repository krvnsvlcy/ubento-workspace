import { useUbento } from "@/engine/app/engine";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Button, Text } from "@ubento/workspace.primitives";

export function ConnectionBlock({
  providerName,
  isMissing,
}: {
  providerName: string;
  isMissing: boolean;
}) {
  const ubento = useUbento();
  const { data: providerData } =
    ubento.vertex.useConnectionProviderByCode(providerName);

  if (!isMissing) return null;

  const config = (providerData as any)?.config as
    | ConnectionProviderConfig
    | undefined;

  const supportsOAuth2 = !!config?.auth.oauth2;
  const supportsToken = !!config?.auth.apiKey;

  return (
    <div className="p-4 bg-red-500/5 backdrop-blur-sm border border-red-500/10 rounded-xl w-72 transition-all hover:bg-red-500/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <p className="text-[11px] text-red-500 font-bold uppercase tracking-wider">
          Missing Connection
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-mono text-neutral-content-subtle truncate bg-black/20 px-2 py-1 rounded">
          {providerName}
        </span>
        <div className="flex gap-2 justify-end">
          {supportsToken && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] py-0 px-3 border-red-500/20 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              Add API Key
            </Button>
          )}
          {supportsOAuth2 && (
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] py-0 px-3 border-red-500/20 hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              Connect (OAuth)
            </Button>
          )}
          {!supportsToken && !supportsOAuth2 && (
            <div>
              <Text tone="subtle" className="text-[11px]">
                No connection method available
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
