import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  Heading,
  Input,
  Label,
  LayoutContext,
  ObjectViewer,
  Progress,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
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
  Toast,
  Tooltip,
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
} from "@ubento/bento.arlo";
import type { Component } from "@ubento/bento.core";
import { BentoRuntimeView, createBentoRuntime } from "@ubento/bento.runtime";
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
        Heading,
        Input,
        Label,
        Progress,
        RadioGroup,
        Select,
        Separator,
        Skeleton,
        Slider,
        Stack,
        Switch,
        Tabs,
        Text,
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
        Toast,
        Tooltip,
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
