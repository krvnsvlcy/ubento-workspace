import { EditorWorkspaceManager } from "@elllphnt/elll-editor-extension";
import { Elll } from "@elllphnt/elll-engine";
import { WorkspaceWorker } from "@elllphnt/workspace-worker-client";
import z from "zod";
import { Tool } from "~/lib/agents/tool.js";

export abstract class EditorTool<
  I extends z.ZodObject<any> = z.ZodObject<any>,
  O extends Record<string, unknown> = any,
> extends Tool<I, O> {
  private elll: Elll;

  get workspaceManager() {
    return EditorWorkspaceManager.instance(this.elll);
  }
  get workspaceWorker(): WorkspaceWorker | undefined {
    return this.workspaceManager?.worker;
  }

  constructor({
    elll,
    name,
    description,
    args,
    playable,
    example,
  }: {
    elll: Elll;
    name: string;
    description: string;
    args: I;
    example?: string;
    playable?: boolean;
  }) {
    super({
      name,
      description,
      args,
      playable,
    });
    this.elll = elll;
  }

  getWorkerOrThrow() {
    const worker = this.workspaceWorker;
    if (!worker) {
      throw new Error("No workspace worker available");
    }
    return worker;
  }
}
