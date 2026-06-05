import { useUbento } from "@/hooks/app-engine";
import { useCallback, useEffect, useRef, useState } from "react";

export type ModuleSourceStatus =
  | "idle"
  | "loading"
  | "saving"
  | "success"
  | "error";

export function useModuleSource({
  moduleId,
  versionId,
  filename = "index.tsx",
}: {
  moduleId: string;
  versionId: string;
  filename?: string;
}) {
  const currentKey = `${moduleId}:${filename}`; // versionId not included because version changes on each save.
  const lastFetchedKey = useRef<string | null>(null);
  const persistedContent = useRef<string>("");
  const ubento = useUbento();
  const [savedContent, setSavedContent] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<ModuleSourceStatus>("idle");
  const [error, setError] = useState<string | null>(null);

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
        setSavedContent(res);
        persistedContent.current = res;
        setStatus("success");
      })
      .catch((e) => {
        setError(e.message);
        setStatus("error");
      });
  }, [moduleId, versionId, filename, currentKey, ubento]);

  const save = useCallback(async () => {
    setStatus("saving");
    try {
      setSavedContent(content);
      const res = await ubento.module.updateModuleVersion(moduleId, content);
      persistedContent.current = content;
      setStatus("success");
      return res;
    } catch (e) {
      setError(String(e));
      setStatus("error");
      throw e;
    }
  }, [moduleId, versionId, filename, ubento, content]);

  return {
    content,
    savedContent,
    setContent,
    status,
    error,
    isDirty: content !== persistedContent.current,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    save,
  };
}
