import {
  App,
  createApp,
  createPage,
  PageRegistryProvider,
  stack,
  text,
} from "@hivary/engine";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const app = createApp({
  id: "tabula",
  routes: {
    "/": "home",
  },
});

const page = createPage({
  id: "home",
  rootId: "root",
  elements: {
    root: {
      component: stack.name,
      props: stack.props({ direction: "column", children: ["1"] }),
    },
    "1": {
      component: text.name,
      props: text.props({ text: "Hello, World!" }),
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageRegistryProvider registry={{ home: page }}>
      <div
        style={{
          padding: 100,
        }}
      >
        <button
          onClick={() => {
            const id = Date.now().toString();
            page.elements[id] = {
              component: text.name,
              props: text.props({ text: `Hello, World! ${id}` }),
            };
            page.elements.root.props.children.push(id);
          }}
        >
          Add
        </button>

        <App app={app} />
      </div>
    </PageRegistryProvider>
  </StrictMode>,
);
