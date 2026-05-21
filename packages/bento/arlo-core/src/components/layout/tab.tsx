import * as TabsPrimitive from "@radix-ui/react-tabs";
import cn from "clsx";
import * as React from "react";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

type TabsListVariant = "line" | "solid";

const TabsListVariantContext = React.createContext<TabsListVariant>("solid");

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List> {
  variant?: TabsListVariant;
}

const variantStyles: Record<TabsListVariant, string> = {
  line: "flex items-center justify-start border-b border-neutral-border bg-transparent w-full",
  solid: "bg-neutral-surface/80 text-neutral-content-muted inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
};

function TabsList({
  className,
  variant = "solid",
  children,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      <TabsListVariantContext.Provider value={variant}>
        {children}
      </TabsListVariantContext.Provider>
    </TabsPrimitive.List>
  );
}

function getTriggerStyles(variant: TabsListVariant) {
  if (variant === "line") {
    return "-mb-px items-center justify-center border-b-2 border-transparent px-3 pb-2 text-sm font-medium whitespace-nowrap transition-all text-neutral-content-muted hover:text-neutral-content hover:border-neutral-border-hover data-[state=active]:border-accent data-[state=active]:text-accent data-disabled:pointer-events-none data-disabled:text-neutral-content-muted inline-flex h-9";
  }
  return "data-[state=active]:bg-neutral-surface dark:data-[state=active]:text-neutral-content focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:outline-pm dark:data-[state=active]:border dark:data-[state=active]:bg-neutral-surface/50/30 text-neutral-content dark:text-neutral-content-muted inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(TabsListVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(getTriggerStyles(variant), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
