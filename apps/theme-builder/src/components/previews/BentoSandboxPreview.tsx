import { Badge, Heading } from "@ubento/bento.arlo-core";
import { Activity } from "lucide-react";
import {
  AddressCard,
  AgentCard,
  BrowserCard,
  BugReportCard,
  ContributorsCard,
  DialogsCard,
  EmptyCard,
  EnvironmentsCard,
  FeedbackCard,
  IconsCard,
  InvoiceCard,
  InviteCard,
  LoadersCard,
  ObservabilityCard,
  SandboxCard,
  SwatchCard,
  SystemStatusCard,
  TrafficCard,
  VariablesCard,
  TypographyCard,
} from "../SharedPreviewComponents";

export interface PreviewProps {
  themeName: string;
  setThemeName: (v: string) => void;
  sliderVal: number[];
  setSliderVal: (v: number[]) => void;
  is2FAEnabled: boolean;
  setIs2FAEnabled: (v: boolean) => void;
  paymentOption: string;
  setPaymentOption: (v: string) => void;
  marketingCheck: boolean;
  setMarketingCheck: (v: boolean) => void;
  roleOption: string;
  setRoleOption: (v: string) => void;
  ticketTopic: string;
  setTicketTopic: (v: string) => void;
  trafficData: any[];
  browserData: any[];
}

export default function BentoSandboxPreview({
  themeName,
  setThemeName,
  sliderVal,
  setSliderVal,
  is2FAEnabled,
  setIs2FAEnabled,
  paymentOption,
  setPaymentOption,
  marketingCheck,
  setMarketingCheck,
  roleOption,
  setRoleOption,
  ticketTopic,
  setTicketTopic,
  trafficData,
  browserData,
}: PreviewProps) {
  return (
    <div className="space-y-8 min-w-[2400px] md:min-w-[3000px]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Bento Sandbox</Heading>
          <p className="text-neutral-content-muted mt-1">
            A comprehensive playground demonstrating the Bento Design System
            components and active styles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="accent">
            <Activity size={14} className="mr-2 inline" /> Live Preview
          </Badge>
          <Badge variant="outline">v1.0.0</Badge>
        </div>
      </div>

      {/* 7-Column Responsive Layout */}
      <div
        className="grid grid-cols-7 items-start gap-6"
        data-slot="capture-target"
      >
        {/* COLUMN 1 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <SwatchCard themeName={themeName} setThemeName={setThemeName} />
          <TypographyCard />
          <InvoiceCard />
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <IconsCard />
          <SandboxCard
            sliderVal={sliderVal}
            setSliderVal={setSliderVal}
            is2FAEnabled={is2FAEnabled}
            setIs2FAEnabled={setIs2FAEnabled}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            marketingCheck={marketingCheck}
            setMarketingCheck={setMarketingCheck}
          />
          <AddressCard />
        </div>

        {/* COLUMN 3 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <ObservabilityCard />
          <EnvironmentsCard />
          <InviteCard roleOption={roleOption} setRoleOption={setRoleOption} />
        </div>

        {/* COLUMN 4 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <VariablesCard />
          <TrafficCard trafficData={trafficData} />
          <AgentCard />
        </div>

        {/* COLUMN 5 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <LoadersCard />
          <BrowserCard browserData={browserData} />
          <EmptyCard />
        </div>

        {/* COLUMN 6 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <BugReportCard ticketTopic={ticketTopic} setTicketTopic={setTicketTopic} />
          <ContributorsCard />
        </div>

        {/* COLUMN 7 */}
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <SystemStatusCard />
          <DialogsCard />
          <FeedbackCard />
        </div>
      </div>
    </div>
  );
}
