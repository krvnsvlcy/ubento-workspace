import { useUbento } from "@/hooks/app-engine";
import { useCallback, useEffect, useRef, useState } from "react";

export function useModuleSource({
  moduleId,
  versionId,
  filename = "index.tsx",
}: {
  moduleId: string;
  versionId: string;
  filename?: string;
}) {
  const lastFetchedKey = useRef<string | null>(null);
  const ubento = useUbento();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const currentKey = `${moduleId}:${versionId}:${filename}`;

  useEffect(() => {
    if (!moduleId || !versionId) {
      return;
    }
    if (lastFetchedKey.current === currentKey) {
      return;
    }
    lastFetchedKey.current = currentKey;

    setStatus("loading");
    ubento.module
      .readModuleVersionFile(moduleId, versionId, filename)
      .then((res) => {
        setContent(res);
        setStatus("success");
      })
      .catch((e) => {
        setError(e.message);
        setStatus("error");
      });
  }, [moduleId, versionId, filename, currentKey, ubento]);

  const update = useCallback(
    (content: string) => {
      setStatus("loading");
      ubento.module
        .updateModuleVersion(moduleId, content)
        .then(() => {
          setStatus("success");
        })
        .catch((e) => {
          setError(e.message);
          setStatus("error");
        });
    },
    [moduleId, versionId, filename, ubento],
  );

  return {
    content,
    setContent,
    status,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    update,
  };
}
