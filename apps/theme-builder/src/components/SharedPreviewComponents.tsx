import {
  Badge,
  BarChart,
  Button,
  Card,
  Checkbox,
  Code,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DonutChart,
  Field,
  FieldLabel,
  Heading,
  Input,
  InputGroup,
  Label,
  ProgressBar,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
} from "@ubento/bento.arlo-core";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  ExternalLink,
  Fingerprint,
  Globe,
  Lock,
  Plus,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  UserPlus,
} from "lucide-react";

export interface SwatchCardProps {
  themeName: string;
  setThemeName: (v: string) => void;
}

export function SwatchCard({ themeName, setThemeName }: SwatchCardProps) {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div className="flex items-center justify-between">
        <Heading level="h2">{themeName} - Space Grotesk</Heading>
        <Badge variant="secondary">Active</Badge>
      </div>
      <Text shade="muted">Space Grotesk typography, color grid.</Text>

      <div className="grid grid-cols-5 gap-2">
        <div className="h-8 rounded-lg bg-accent" title="Accent" />
        <div
          className="h-8 rounded-lg bg-neutral-border"
          title="Neutral Border"
        />
        <div
          className="h-8 rounded-lg bg-neutral-surface-hover"
          title="Neutral Hover"
        />
        <div
          className="h-8 rounded-lg bg-neutral-surface"
          title="Neutral Surface"
        />
        <div className="h-8 rounded-lg bg-destructive" title="Destructive" />
      </div>

      <div className="flex gap-2">
        <Button
          variant={themeName === "Rhea" ? "primary" : "outline"}
          onClick={() => setThemeName("Rhea")}
        >
          Rhea
        </Button>
        <Button
          variant={themeName === "Inherit" ? "primary" : "outline"}
          onClick={() => setThemeName("Inherit")}
        >
          Inherit
        </Button>
        <Button
          variant={themeName === "Lyra" ? "primary" : "outline"}
          onClick={() => setThemeName("Lyra")}
        >
          Lyra
        </Button>
      </div>

      <Code>{`--font-sans: 'Space Grotesk', sans-serif;`}</Code>
    </Card>
  );
}

export function TypographyCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h3">Inherit - Space Grotesk</Heading>
        <Text shade="muted">Typography testing container</Text>
      </div>
      <Text size="md" shade="default">
        The quick brown fox jumps over the lazy dog. Testing weights:{" "}
        <span className="font-semibold">bold</span>,{" "}
        <span className="font-medium">medium</span>, and{" "}
        <span className="font-light">light</span> text styles.
      </Text>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Apply Style</Button>
      </div>
    </Card>
  );
}

export function InvoiceCard() {
  return (
    <Card variant="outline" gap={12} padding="none" className="overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <Heading level="h3">Invoice #INV-2847</Heading>
          <Badge variant="outline">Paid</Badge>
        </div>
        <Text shade="muted">Standard transaction summary.</Text>
      </div>

      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Item</TableHeaderCell>
              <TableHeaderCell className="text-right">Price</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Bento SaaS Pro</TableCell>
              <TableCell className="text-right font-medium">$29.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Addon: AI Copilot</TableCell>
              <TableCell className="text-right font-medium">$15.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableRoot>

      <div className="space-y-1 border-t bg-neutral-surface/10 p-4 text-sm">
        <div className="flex justify-between text-neutral-content-muted">
          <span>Subtotal</span>
          <span>$44.00</span>
        </div>
        <div className="flex justify-between font-bold text-neutral-content">
          <span>Total Paid</span>
          <span>$44.00</span>
        </div>
      </div>

      <div className="flex justify-between border-t p-4">
        <Button variant="ghost">Download PDF</Button>
        <Button variant="primary">Pay Now</Button>
      </div>
    </Card>
  );
}

export function IconsCard() {
  return (
    <Card variant="outline" gap={12} padding="md">
      <div>
        <Heading level="h2">Icons Catalog</Heading>
        <Text shade="muted">Selected utility icons</Text>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Fingerprint className="size-5 text-neutral-content" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Activity className="size-5 text-accent" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <AlertTriangle className="size-5 text-neutral-content-muted" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Sparkles className="size-5 text-accent" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Lock className="size-5 text-destructive" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Globe className="size-5 text-neutral-content" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Settings className="size-5" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border bg-neutral-surface p-2 hover:bg-neutral-surface-hover">
          <Bell className="size-5" />
        </div>
      </div>
    </Card>
  );
}

export interface SandboxCardProps {
  sliderVal: number[];
  setSliderVal: (v: number[]) => void;
  is2FAEnabled: boolean;
  setIs2FAEnabled: (v: boolean) => void;
  paymentOption: string;
  setPaymentOption: (v: string) => void;
  marketingCheck: boolean;
  setMarketingCheck: (v: boolean) => void;
}

export function SandboxCard({
  sliderVal,
  setSliderVal,
  is2FAEnabled,
  setIs2FAEnabled,
  paymentOption,
  setPaymentOption,
  marketingCheck,
  setMarketingCheck,
}: SandboxCardProps) {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Interactive Sandbox</Heading>
        <Text shade="muted">Live form fields & inputs</Text>
      </div>

      <Field>
        <FieldLabel>Search Query</FieldLabel>
        <InputGroup>
          <Input placeholder="Search records..." />
        </InputGroup>
      </Field>

      <Field>
        <FieldLabel>Limit range ({sliderVal[0]}%)</FieldLabel>
        <Slider
          defaultValue={[45]}
          value={sliderVal}
          onValueChange={setSliderVal}
          min={0}
          max={100}
        />
      </Field>

      <div className="flex items-center justify-between border rounded-xl p-3 bg-neutral-surface/20">
        <div className="space-y-0.5">
          <Label className="font-semibold text-sm flex items-center gap-2">
            <Shield size={16} className="text-accent" /> Two-Factor
            Authentication
          </Label>
          <span className="text-xs text-neutral-content-muted">
            Secure account access.
          </span>
        </div>
        <Switch checked={is2FAEnabled} onCheckedChange={setIs2FAEnabled} />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-xs font-semibold tracking-wider text-neutral-content-muted uppercase">
          Notification Mode
        </Label>
        <RadioGroup
          value={paymentOption}
          onValueChange={setPaymentOption}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="stripe" id="rad-stripe" />
            <Label
              htmlFor="rad-stripe"
              className="text-sm select-none cursor-pointer"
            >
              Email
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="paypal" id="rad-paypal" />
            <Label
              htmlFor="rad-paypal"
              className="text-sm select-none cursor-pointer"
            >
              Slack
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={marketingCheck}
          onCheckedChange={(checked) => setMarketingCheck(checked === true)}
          id="marketing-check"
        />
        <Label
          htmlFor="marketing-check"
          className="text-sm select-none cursor-pointer"
        >
          Subscribe to updates
        </Label>
      </div>
    </Card>
  );
}

export function AddressCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Shipping Address</Heading>
        <Text shade="muted">Enter destination details.</Text>
      </div>
      <Field>
        <FieldLabel>Street Address</FieldLabel>
        <Input placeholder="123 Bento Lane" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>City</FieldLabel>
          <Input placeholder="San Francisco" />
        </Field>
        <Field>
          <FieldLabel>Postal Code</FieldLabel>
          <Input placeholder="94103" />
        </Field>
      </div>
      <div className="flex justify-end border-t pt-4">
        <Button variant="primary">Save Address</Button>
      </div>
    </Card>
  );
}

export function ObservabilityCard() {
  return (
    <Card variant="outline" gap={16} padding="none" className="overflow-hidden">
      <div className="relative flex aspect-video items-center justify-center bg-neutral-surface-hover/80 text-neutral-content">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute start-4 bottom-4 z-20 space-y-1">
          <Badge variant="destructive">Alert</Badge>
          <h4 className="text-sm font-bold text-neutral-content">
            System Alert Level 2
          </h4>
        </div>
        <div className="z-10 flex items-center gap-2 text-neutral-content-muted">
          <Activity className="size-8 animate-pulse text-destructive" />
        </div>
      </div>
      <div className="p-6 space-y-2">
        <Heading level="h3">Observability Plus</Heading>
        <Text shade="muted">Monitoring service upgrade notification.</Text>
        <Text size="sm" shade="subtle">
          Monitoring is deprecated in favor of Observability Plus. Upgrade by
          November 2025 for continued analytics.
        </Text>
      </div>
      <div className="flex justify-end gap-2 p-6 border-t">
        <Button variant="outline">Dismiss</Button>
        <Button variant="primary">Upgrade</Button>
      </div>
    </Card>
  );
}

export function EnvironmentsCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Workspace Environments</Heading>
        <Text shade="muted">Choose how you want to compile</Text>
      </div>

      <Tabs defaultValue="codespaces">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="codespaces">Codespaces</TabsTrigger>
          <TabsTrigger value="local">Local Dev</TabsTrigger>
        </TabsList>

        <TabsContent value="codespaces" className="space-y-3 pt-2">
          <div className="flex items-center justify-between rounded-xl border p-3 bg-neutral-surface">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-neutral-content-muted" />
              <div>
                <div className="text-sm font-medium">ubento-sandbox-alpha</div>
                <div className="text-xs text-neutral-content-muted">
                  Paid by shadcn
                </div>
              </div>
            </div>
            <Badge variant="secondary">Ready</Badge>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-3 bg-neutral-surface">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-neutral-content-muted" />
              <div>
                <div className="text-sm font-medium">ubento-sandbox-beta</div>
                <div className="text-xs text-neutral-content-muted">
                  Paid by user
                </div>
              </div>
            </div>
            <Badge variant="outline">Stopped</Badge>
          </div>
        </TabsContent>

        <TabsContent
          value="local"
          className="py-6 text-center text-sm text-neutral-content-muted"
        >
          <div className="flex flex-col items-center gap-2">
            <Globe className="size-8 text-neutral-content-muted/50" />
            <span>No local dev environments found.</span>
            <Button variant="outline" className="mt-2">
              Connect Local
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export interface InviteCardProps {
  roleOption: string;
  setRoleOption: (v: string) => void;
}

export function InviteCard({ roleOption, setRoleOption }: InviteCardProps) {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Invite Team</Heading>
        <Text shade="muted">Send collaboration link</Text>
      </div>
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <Input placeholder="collaborator@example.com" />
      </Field>
      <Field>
        <FieldLabel>Role</FieldLabel>
        <Select value={roleOption} onValueChange={setRoleOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="member">Workspace Member</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="billing">Billing Manager</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="border-t pt-4">
        <Button variant="primary" className="w-full">
          Send Invitation
        </Button>
      </div>
    </Card>
  );
}

export function VariablesCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h2">Environment Variables</Heading>
          <Text shade="muted">Configuration variables for this service.</Text>
        </div>
        <Button variant="outline">
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <div className="font-mono text-sm font-medium">DATABASE_URL</div>
            <div className="text-xs text-neutral-content-muted">
              postgresql://user:pass@host/db
            </div>
          </div>
          <Badge variant="outline">Secret</Badge>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <div className="font-mono text-sm font-medium">NEXTAUTH_SECRET</div>
            <div className="text-xs text-neutral-content-muted">
              ************************
            </div>
          </div>
          <Badge variant="outline">Secret</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-sm font-medium">NODE_ENV</div>
            <div className="text-xs text-neutral-content-muted">production</div>
          </div>
          <Badge variant="secondary">Public</Badge>
        </div>
      </div>
    </Card>
  );
}

export function TrafficCard({ trafficData }: { trafficData: any[] }) {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Traffic Channels</Heading>
        <Text shade="muted">Total visits by source channel.</Text>
      </div>
      <div className="h-80 flex items-center justify-center">
        <BarChart
          data={trafficData}
          index="name"
          categories={["value"]}
          colors={["blue"]}
          className="h-full w-full"
        />
      </div>
    </Card>
  );
}

export function AgentCard() {
  return (
    <Card
      variant="outline"
      gap={16}
      padding="md"
      className="border-accent/20 bg-accent/5"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="size-5 text-accent" />
        <Heading level="h3">Vercel Agent</Heading>
      </div>
      <Text shade="muted">AI-powered deployment companion.</Text>
      <Text size="sm">
        Ship faster and safer with codebase context, preview sandboxes, and
        root-cause production analysis.
      </Text>
      <div className="flex items-center justify-between rounded-xl border bg-neutral-surface p-3">
        <span className="text-xs font-semibold">Vercel AI Trial</span>
        <Badge variant="accent">Active</Badge>
      </div>
      <div className="pt-2">
        <Button variant="outline" className="w-full">
          Get Started
        </Button>
      </div>
    </Card>
  );
}

export function LoadersCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Component Loaders</Heading>
        <Text shade="muted">Skeleton state placeholders</Text>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-3 w-[50%]" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
      </div>
    </Card>
  );
}

export function BrowserCard({ browserData }: { browserData: any[] }) {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Browser Share</Heading>
        <Text shade="muted">Audience distribution</Text>
      </div>
      <div className="h-36 flex items-center justify-center">
        <DonutChart
          data={browserData}
          category="name"
          value="value"
          colors={["blue", "cyan", "emerald", "amber", "gray"]}
          variant="donut"
          showLabel={true}
          className="h-full w-full"
        />
      </div>
    </Card>
  );
}

export function EmptyCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div className="py-8 text-center space-y-4">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-neutral-surface">
          <UserPlus className="size-6 text-neutral-content-muted" />
        </div>
        <div className="space-y-1">
          <Heading level="h3">No Team Members</Heading>
          <Text size="sm" shade="muted">
            You haven't invited any collaborators to this team workspace.
          </Text>
        </div>
        <Button variant="outline">Invite Member</Button>
      </div>
    </Card>
  );
}

export interface BugReportCardProps {
  ticketTopic: string;
  setTicketTopic: (v: string) => void;
}

export function BugReportCard({
  ticketTopic,
  setTicketTopic,
}: BugReportCardProps) {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Report Bug</Heading>
        <Text shade="muted">Describe the issue you encountered.</Text>
      </div>

      <Field>
        <FieldLabel>Topic</FieldLabel>
        <Select value={ticketTopic} onValueChange={setTicketTopic}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="billing">Billing & Subscriptions</SelectItem>
            <SelectItem value="deploy">Deployments</SelectItem>
            <SelectItem value="account">Account Access</SelectItem>
            <SelectItem value="other">Other issue</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea placeholder="Describe the issue here..." rows={4} />
      </Field>

      <div className="flex justify-between border-t pt-4">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Submit Ticket</Button>
      </div>
    </Card>
  );
}

export function ContributorsCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Contributors</Heading>
        <Text shade="muted">Top codebase contributors this week.</Text>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-1">
          <div className="size-8 rounded-full bg-neutral-surface border flex items-center justify-center text-xs font-semibold">
            JD
          </div>
          <div>
            <div className="text-sm font-semibold">Jane Doe</div>
            <div className="text-xs text-neutral-content-muted">
              42 commits • JaneDoe
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1">
          <div className="size-8 rounded-full bg-neutral-surface border flex items-center justify-center text-xs font-semibold">
            JS
          </div>
          <div>
            <div className="text-sm font-semibold">John Smith</div>
            <div className="text-xs text-neutral-content-muted">
              28 commits • jsmith
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1">
          <div className="size-8 rounded-full bg-neutral-surface border flex items-center justify-center text-xs font-semibold">
            AM
          </div>
          <div>
            <div className="text-sm font-semibold">Alex Morgan</div>
            <div className="text-xs text-neutral-content-muted">
              15 commits • alexm
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SystemStatusCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">System Status</Heading>
        <Text shade="muted">Live operational metrics</Text>
      </div>

      <div className="flex gap-3 border rounded-xl p-3 bg-emerald-500/10 border-emerald-500/20">
        <CheckCircle className="size-5 text-emerald-600 shrink-0" />
        <div className="space-y-1">
          <Heading level="h4" className="text-emerald-800">
            All Services Operational
          </Heading>
          <Text size="sm" className="text-emerald-700">
            System response times are normal.
          </Text>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span>API Latency</span>
          <span>24ms</span>
        </div>
        <ProgressBar value={24} variant="success" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span>Database Load</span>
          <span>38%</span>
        </div>
        <ProgressBar value={38} variant="neutral" />
      </div>
    </Card>
  );
}

export function DialogsCard() {
  return (
    <Card variant="outline" gap={16} padding="md">
      <div>
        <Heading level="h2">Quick Dialogs</Heading>
        <Text shade="muted">Overlay components preview</Text>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Open Custom Dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
            <DialogDescription>
              Update your personal details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Field>
              <FieldLabel>Display Name</FieldLabel>
              <Input placeholder="John Doe" />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="primary">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" tone="destructive" className="w-full">
            Destructive Action
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              database instance and backups.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="primary" tone="destructive">
                Confirm Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export function FeedbackCard() {
  return (
    <Card variant="outline" gap={12} padding="md" className="border-dashed">
      <div className="text-center space-y-2">
        <Heading level="h2">Feedback</Heading>
        <Text shade="muted">Share your thoughts about this design system.</Text>
        <Button variant="outline" className="mt-2">
          Share Feedback <ExternalLink className="ml-2 size-3" />
        </Button>
      </div>
    </Card>
  );
}
