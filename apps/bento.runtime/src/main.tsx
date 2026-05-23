import {
  Accordion,
  Alert,
  AreaChart,
  Avatar,
  Badge,
  BarChart,
  BarList,
  Button,
  Calendar,
  Card,
  Carousel,
  CategoryBar,
  Checkbox,
  CodeBlock,
  Collapsible,
  Combobox,
  ComboChart,
  ContextMenu,
  DataTable,
  DatePicker,
  Dialog,
  Divider,
  DonutChart,
  Drawer,
  DropdownMenu,
  Empty,
  FileDropzone,
  Grid,
  HoverCard,
  Icon,
  Input,
  Label,
  LayoutContext,
  LineChart,
  ListView,
  ObjectViewer,
  Pagination,
  Paragraph,
  Popover,
  Progress,
  ProgressCircle,
  RadioCardGroup,
  RadioGroup,
  Resizable,
  ScrollArea,
  Select,
  Separator,
  Skeleton,
  Slider,
  SparkChart,
  Spinner,
  Stack,
  Surface,
  Switch,
  Table,
  TabNavigation,
  Tabs,
  Textarea,
  TextLine,
  Toggle,
  ToggleGroup,
  Tracker,
} from "@ubento/bento.arlo";
import type { Component } from "@ubento/bento.core";
import { BentoRuntimeView, createBentoRuntime } from "@ubento/bento.runtime";
import "@ubento/bento.style/css/fonts.css";
import "@ubento/bento.style/css/themes.css";
import "@ubento/bento.style/dist/uno.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./modules.js";
import { rpc } from "./rpc.js";

rpc.run();

let connected = false;
while (!connected) {
  try {
    console.log("[bento.runtime] connecting...");
    const { initialState } = await rpc.egress.connect({}, { timeout: 1000 });
    console.log("[bento.runtime] connected", initialState);
    connected = true;
    const runtime = createBentoRuntime({
      rpc,
      initialState,
      components: {
        Accordion,
        Alert,
        Avatar,
        Badge,
        Button,
        Card,
        Checkbox,
        Grid,
        TextLine,
        Paragraph,
        CodeBlock,
        Icon,
        Input,
        Label,
        Progress,
        RadioGroup,
        Select,
        Separator,
        Divider,
        Skeleton,
        Slider,
        Stack,
        Surface,
        Switch,
        Tabs,
        Textarea,
        ObjectViewer,
        Table,
        Carousel,
        Collapsible,
        ContextMenu,
        Dialog,
        Drawer,
        Empty,
        HoverCard,
        Pagination,
        Popover,
        ScrollArea,
        Spinner,
        TabNavigation,
        DataTable,
        ListView,
        Resizable,
        Combobox,
        DropdownMenu,
        FileDropzone,
        ToggleGroup,
        Toggle,
        RadioCardGroup,
        Calendar,
        DatePicker,
        ProgressCircle,
        Tracker,
        CategoryBar,
        BarList,
        BarChart,
        LineChart,
        AreaChart,
        DonutChart,
        ComboChart,
        SparkChart,
      } as unknown as Record<string, Component>,
    });
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <LayoutContext value={"column"}>
          <BentoRuntimeView runtime={runtime} />
        </LayoutContext>
      </StrictMode>,
    );
    rpc.egress.ready({});
  } catch (err) {
    console.error("[bento.runtime] failed to connect", err);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
