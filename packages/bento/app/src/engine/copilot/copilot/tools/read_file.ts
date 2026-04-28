import { Elll } from "@elllphnt/elll-engine";
import { z } from "zod";
import { AgentAction } from "~/lib/agents/message.js";
import { fileResource } from "../resources/file.js";
import { isFileReadAllowed } from "../utils/deny_list.js";
import { EditorTool } from "./editor_tool.js";

export const readFileToolSchema = z.object({
  path: z.string().describe("Path to the file to read"),
});

export class ReadFileTool extends EditorTool<
  typeof readFileToolSchema,
  {
    content: string;
  }
> {
  static readonly toolName = "read_file";

  constructor({ elll }: { elll: Elll }) {
    super({
      elll,
      name: ReadFileTool.toolName,
      description: "Read the contents of a file.",
      args: readFileToolSchema,
    });
  }

  async run(args: z.infer<typeof readFileToolSchema>, action: AgentAction) {
    if (!isFileReadAllowed(args.path)) {
      return {
        content: [
          {
            type: "text" as const,
            text: "File is not allowed to be read.",
          },
        ],
      };
    }

    await action.message.execution.thread.setResource({
      type: fileResource.type,
      key: args.path,
      data: fileResource.data({ path: args.path }),
    });

    return {
      content: [
        {
          type: "text" as const,
          text: "File loaded.",
        },
      ],
    };
  }
}
