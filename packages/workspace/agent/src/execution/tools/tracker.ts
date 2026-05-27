import z from "zod";
import { AgentTool } from "../tool/tool.js";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "blocked" | "closed";
  parentId?: string;
  dependencies: string[];
}

function getTasks(thread: any): Task[] {
  const resource = thread.context.getResource("tasks");
  return resource?.data?.tasks || [];
}

async function saveTasks(thread: any, tasks: Task[]): Promise<void> {
  await thread.context.addResource({
    key: "tasks",
    type: "tasks",
    label: "Task Tracker Tasks",
    data: { tasks },
  });
}

function buildTasksDisplay(tasks: Task[]): string {
  if (tasks.length === 0) {
    return "No tasks in the tracker.";
  }

  const statusSymbols: Record<Task["status"], string> = {
    open: "⭕",
    in_progress: "🚧",
    blocked: "⛔",
    closed: "✅",
  };

  const childrenMap = new Map<string, Task[]>();
  const roots: Task[] = [];

  for (const task of tasks) {
    if (task.parentId) {
      if (!childrenMap.has(task.parentId)) {
        childrenMap.set(task.parentId, []);
      }
      childrenMap.get(task.parentId)!.push(task);
    } else {
      roots.push(task);
    }
  }

  let output = "Task Graph:\n";
  const visited = new Set<string>();

  const renderTask = (task: Task, depth: number) => {
    if (visited.has(task.id)) {
      output += `${"  ".repeat(depth)}[CYCLE DETECTED: ${task.id}]\n`;
      return;
    }
    visited.add(task.id);

    const indent = "  ".repeat(depth);
    output += `${indent}${statusSymbols[task.status]} ${task.id}: ${task.title}\n`;
    if (task.description) {
      output += `${indent}   Description: ${task.description}\n`;
    }
    if (task.dependencies.length > 0) {
      output += `${indent}   Depends on: ${task.dependencies.join(", ")}\n`;
    }

    const children = childrenMap.get(task.id) || [];
    for (const child of children) {
      renderTask(child, depth + 1);
    }
    visited.delete(task.id);
  };

  for (const root of roots) {
    renderTask(root, 0);
  }

  return output;
}

// ── create_task ─────────────────────────────────────────────────────────────

const createTaskArgs = z.object({
  title: z.string().describe("The title of the task"),
  description: z.string().describe("Detailed technical description of the task"),
  parentId: z.string().optional().describe("Optional ID of the parent task"),
  dependencies: z.array(z.string()).optional().describe("Optional list of task IDs this task depends on"),
});

export const createTaskTool: AgentTool<typeof createTaskArgs> = {
  name: "create_task",
  description: "Create a new task in the task tracker to organize work.",
  args: createTaskArgs,
  run: async ({ args, thread }) => {
    const tasks = getTasks(thread);
    const nextNum = tasks.length + 1;
    const id = `TASK-${nextNum}`;

    const newTask: Task = {
      id,
      title: args.title,
      description: args.description,
      status: "open",
      parentId: args.parentId,
      dependencies: args.dependencies || [],
    };

    tasks.push(newTask);
    await saveTasks(thread, tasks);

    return {
      content: [
        {
          type: "text",
          text: `Created task ${id}: "${args.title}"\n\n${buildTasksDisplay(tasks)}`,
        },
      ],
      structuredContent: newTask as any,
    };
  },
};

// ── update_task ─────────────────────────────────────────────────────────────

const updateTaskArgs = z.object({
  id: z.string().describe("The ID of the task to update (e.g. TASK-1)"),
  status: z.enum(["open", "in_progress", "blocked", "closed"]).optional().describe("New status of the task"),
  title: z.string().optional().describe("New title of the task"),
  description: z.string().optional().describe("New description of the task"),
  dependencies: z.array(z.string()).optional().describe("New list of task IDs this task depends on"),
});

export const updateTaskTool: AgentTool<typeof updateTaskArgs> = {
  name: "update_task",
  description: "Update the status, title, description, or dependencies of a task.",
  args: updateTaskArgs,
  run: async ({ args, thread }) => {
    const tasks = getTasks(thread);
    const task = tasks.find((t) => t.id === args.id);

    if (!task) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error: Task "${args.id}" not found.` }],
      };
    }

    if (args.status !== undefined) task.status = args.status;
    if (args.title !== undefined) task.title = args.title;
    if (args.description !== undefined) task.description = args.description;
    if (args.dependencies !== undefined) task.dependencies = args.dependencies;

    await saveTasks(thread, tasks);

    return {
      content: [
        {
          type: "text",
          text: `Updated task ${args.id}.\n\n${buildTasksDisplay(tasks)}`,
        },
      ],
      structuredContent: task as any,
    };
  },
};

// ── list_tasks ──────────────────────────────────────────────────────────────

const listTasksArgs = z.object({
  status: z.enum(["open", "in_progress", "blocked", "closed"]).optional().describe("Filter tasks by status"),
});

export const listTasksTool: AgentTool<typeof listTasksArgs> = {
  name: "list_tasks",
  description: "List all tasks in the task tracker, optionally filtered by status.",
  args: listTasksArgs,
  run: async ({ args, thread }) => {
    let tasks = getTasks(thread);
    if (args.status) {
      tasks = tasks.filter((t) => t.status === args.status);
    }

    return {
      content: [
        {
          type: "text",
          text: buildTasksDisplay(tasks),
        },
      ],
    };
  },
};

// ── add_task_dependency ──────────────────────────────────────────────────────

const addTaskDependencyArgs = z.object({
  taskId: z.string().describe("The ID of the task that has a dependency (e.g. TASK-2)"),
  dependencyId: z.string().describe("The ID of the task it depends on (e.g. TASK-1)"),
});

export const addTaskDependencyTool: AgentTool<typeof addTaskDependencyArgs> = {
  name: "add_task_dependency",
  description: "Mark that taskId depends on dependencyId.",
  args: addTaskDependencyArgs,
  run: async ({ args, thread }) => {
    const tasks = getTasks(thread);
    const task = tasks.find((t) => t.id === args.taskId);
    const dep = tasks.find((t) => t.id === args.dependencyId);

    if (!task) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error: Task "${args.taskId}" not found.` }],
      };
    }
    if (!dep) {
      return {
        isError: true,
        content: [{ type: "text", text: `Error: Dependency task "${args.dependencyId}" not found.` }],
      };
    }
    if (args.taskId === args.dependencyId) {
      return {
        isError: true,
        content: [{ type: "text", text: "Error: A task cannot depend on itself." }],
      };
    }

    if (!task.dependencies.includes(args.dependencyId)) {
      task.dependencies.push(args.dependencyId);
      await saveTasks(thread, tasks);
    }

    return {
      content: [
        {
          type: "text",
          text: `Dependency added: ${args.taskId} -> ${args.dependencyId}.\n\n${buildTasksDisplay(tasks)}`,
        },
      ],
    };
  },
};

// ── visualize_tasks ─────────────────────────────────────────────────────────

const visualizeTasksArgs = z.object({});

export const visualizeTasksTool: AgentTool<typeof visualizeTasksArgs> = {
  name: "visualize_tasks",
  description: "Show a beautiful, structured ASCII task graph showing hierarchy and dependencies.",
  args: visualizeTasksArgs,
  run: async ({ thread }) => {
    const tasks = getTasks(thread);
    return {
      content: [
        {
          type: "text",
          text: buildTasksDisplay(tasks),
        },
      ],
    };
  },
};
