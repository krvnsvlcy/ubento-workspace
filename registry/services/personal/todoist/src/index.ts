import { TodoistApi } from "@doist/todoist-api-typescript";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  const todoist = new TodoistApi(token);
  return {
    tasks: createResourceProxy("todoist", todoist, "getTasks"),
    projects: createResourceProxy("todoist", todoist, "getProjects"),
    sections: createResourceProxy("todoist", todoist, "getSections"),
    labels: createResourceProxy("todoist", todoist, "getLabels")
  };
}
