import type { BoardSpec } from "@ubento/bento.core";

export const DEFAULT_SPEC: BoardSpec = {
  params: {},
  state: {
    userName: { type: "string", value: "Jane Doe" },
    userEmail: { type: "string", value: "jane@ubento.com" },
    notifications: { type: "boolean", value: true },
    theme: { type: "string", value: "system" },
    progress: { type: "number", value: 65 },
  },
  style: {
    direction: "column",
    gap: 40,
    padding: { top: 64, right: 64, bottom: 64, left: 64 },
    flow: "scroll",
  },
  children: ["header", "main_content"],
  elements: {
    header: {
      component: "Stack",
      inputs: {
        direction: "row",
        justify: "space-between",
        align: "center",
        padding: 24,
        tone: "neutral",
        border: true,
        radius: 12,
      },
      children: ["header_left", "header_right"],
    },
    header_left: {
      component: "Stack",
      inputs: { direction: "row", gap: 12, align: "center" },
      children: ["logo", "header_title"],
    },
    logo: {
      component: "Avatar",
      inputs: { fallback: "A", tone: "accent", size: 32 },
    },
    header_title: {
      component: "Heading",
      inputs: { text: "Arlo Design System", level: "h4", weight: 700 },
    },
    header_right: {
      component: "Stack",
      inputs: { direction: "row", gap: 16, align: "center" },
      children: ["status_badge", "profile_avatar"],
    },
    status_badge: {
      component: "Badge",
      inputs: { label: "Live Preview", tone: "success", variant: "surface" },
    },
    profile_avatar: {
      component: "Avatar",
      inputs: {
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        alt: "Jane Doe",
      },
    },
    main_content: {
      component: "Grid",
      inputs: { columns: 2, gap: 32 },
      children: ["form_section", "visuals_section"],
    },
    form_section: {
      component: "Card",
      inputs: { padding: 32, gap: 24 },
      children: [
        "form_heading",
        "field_name",
        "field_email",
        "field_bio",
        "field_options",
        "form_footer",
      ],
    },
    form_heading: {
      component: "Stack",
      inputs: { direction: "column", gap: 4 },
      children: ["form_title", "form_subtitle"],
    },
    form_title: {
      component: "Heading",
      inputs: { text: "User Profile", level: "h3" },
    },
    form_subtitle: {
      component: "Text",
      inputs: {
        text: "Manage your account settings and preferences.",
        subtle: true,
        size: 14,
      },
    },
    field_name: {
      component: "Stack",
      inputs: { direction: "column", gap: 8 },
      children: ["label_name", "input_name"],
    },
    label_name: {
      component: "Label",
      inputs: { text: "Full Name", htmlFor: "name" },
    },
    input_name: {
      component: "Input",
      inputs: { value: "Jane Doe", placeholder: "Enter name", tone: "neutral" },
    },
    field_email: {
      component: "Stack",
      inputs: { direction: "column", gap: 8 },
      children: ["label_email", "input_email"],
    },
    label_email: {
      component: "Label",
      inputs: { text: "Email Address", htmlFor: "email" },
    },
    input_email: {
      component: "Input",
      inputs: { type: "email", value: "jane@ubento.com", tone: "neutral" },
    },
    field_bio: {
      component: "Stack",
      inputs: { direction: "column", gap: 8 },
      children: ["label_bio", "textarea_bio"],
    },
    label_bio: {
      component: "Label",
      inputs: { text: "Short Biography", htmlFor: "bio" },
    },
    textarea_bio: {
      component: "Textarea",
      inputs: { placeholder: "Tell us about yourself...", rows: 4 },
    },
    field_options: {
      component: "Stack",
      inputs: {
        direction: "row",
        gap: 24,
        align: "center",
        padding: { top: 12, bottom: 12 },
      },
      children: ["theme_select_field", "notification_switch_field"],
    },
    theme_select_field: {
      component: "Stack",
      inputs: { direction: "column", gap: 8, width: { value: 1, unit: "fr" } },
      children: ["label_theme", "select_theme"],
    },
    label_theme: {
      component: "Label",
      inputs: { text: "UI Theme" },
    },
    select_theme: {
      component: "Select",
      inputs: {
        value: "system",
        options: [
          { label: "System", value: "system" },
          { label: "Light", value: "light" },
          { label: "Dark", value: "dark" },
        ],
      },
    },
    notification_switch_field: {
      component: "Stack",
      inputs: { direction: "column", gap: 8, align: "start" },
      children: ["label_notif", "switch_notif"],
    },
    label_notif: {
      component: "Label",
      inputs: { text: "Notifications" },
    },
    switch_notif: {
      component: "Switch",
      inputs: { checked: true, tone: "success" },
    },
    form_footer: {
      component: "Stack",
      inputs: {
        direction: "row",
        justify: "end",
        gap: 12,
        padding: { top: 16 },
      },
      children: ["btn_cancel", "btn_save"],
    },
    btn_cancel: {
      component: "Button",
      inputs: { label: "Reset", variant: "ghost" },
    },
    btn_save: {
      component: "Button",
      inputs: { label: "Save Changes", variant: "primary", tone: "accent" },
    },
    visuals_section: {
      component: "Stack",
      inputs: { direction: "column", gap: 32 },
      children: ["feedback_card", "skeleton_card"],
    },
    feedback_card: {
      component: "Card",
      inputs: { padding: 32, gap: 20 },
      children: [
        "feedback_heading",
        "progress_field",
        "feedback_separator",
        "alert_stack",
      ],
    },
    feedback_heading: {
      component: "Heading",
      inputs: { text: "Feedback & Status", level: "h4" },
    },
    progress_field: {
      component: "Stack",
      inputs: { direction: "column", gap: 12 },
      children: ["label_progress", "progress_bar"],
    },
    label_progress: {
      component: "Label",
      inputs: { text: "System Integrity" },
    },
    progress_bar: {
      component: "Progress",
      inputs: { value: 85, tone: "info" },
    },
    feedback_separator: {
      component: "Separator",
      inputs: { tone: "neutral" },
    },
    alert_stack: {
      component: "Stack",
      inputs: { direction: "row", gap: 12 },
      children: ["checkbox_alert", "label_alert"],
    },
    checkbox_alert: {
      component: "Checkbox",
      inputs: { checked: true, tone: "destructive" },
    },
    label_alert: {
      component: "Label",
      inputs: {
        text: "Critical updates available",
        tone: "destructive",
        weight: 600,
      },
    },
    skeleton_card: {
      component: "Card",
      inputs: { padding: 32, gap: 16, tone: "neutral", border: true },
      children: ["skel_title", "skel_line_1", "skel_line_2"],
    },
    skel_title: {
      component: "Skeleton",
      inputs: {
        height: { value: 24, unit: "px" },
        width: { value: 200, unit: "px" },
        radius: 4,
      },
    },
    skel_line_1: {
      component: "Skeleton",
      inputs: {
        height: { value: 16, unit: "px" },
        width: { value: 1, unit: "fr" },
        radius: 4,
      },
    },
    skel_line_2: {
      component: "Skeleton",
      inputs: {
        height: { value: 16, unit: "px" },
        width: { value: 0.7, unit: "fr" },
        radius: 4,
      },
    },
  },
};
