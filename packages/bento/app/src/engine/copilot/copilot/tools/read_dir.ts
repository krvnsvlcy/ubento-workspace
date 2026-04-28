import { Elll } from "@elllphnt/elll-engine";
import { z } from "zod";
import { AgentAction } from "~/lib/agents/message.js";
import { directoryResource } from "../resources/directory.js";
import { isFileReadAllowed } from "../utils/deny_list.js";
import { EditorTool } from "./editor_tool.js";

export const readDirToolSchema = z.object({
  path: z.string().describe("Path to the directory to read"),
});

export class ReadDirTool extends EditorTool<
  typeof readDirToolSchema,
  {
    entries: { name: string; type: string }[];
  }
> {
  static readonly toolName = "read_dir";

  constructor({ elll }: { elll: Elll }) {
    super({
      elll,
      name: ReadDirTool.toolName,
      description: "Read the contents of a directory.",
      args: readDirToolSchema,
    });
  }

  async run(args: z.infer<typeof readDirToolSchema>, action: AgentAction) {
    if (!isFileReadAllowed(args.path)) {
      return {
        content: [
          {
            type: "text" as const,
            text: "Directory is not allowed to be read.",
          },
        ],
      };
    }

    await action.message.execution.thread.setResource({
      type: directoryResource.type,
      key: args.path,
      data: directoryResource.data({ path: args.path }),
    });

    return {
      content: [
        {
          type: "text" as const,
          text: `Directory loaded.`,
        },
      ],
    };
  }
}
