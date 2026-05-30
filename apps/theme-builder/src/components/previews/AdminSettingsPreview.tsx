import { Badge, Heading } from "@ubento/bento.arlo-core";
import { Activity } from "lucide-react";
import {
  AddressCard,
  BugReportCard,
  ContributorsCard,
  EnvironmentsCard,
  InviteCard,
  SandboxCard,
  SwatchCard,
  TypographyCard,
} from "../SharedPreviewComponents";
import { type PreviewProps } from "./BentoSandboxPreview";

export default function AdminSettingsPreview({
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
}: PreviewProps) {
  return (
    <div className="space-y-8 w-[1140px] md:w-[1280px]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Admin Settings</Heading>
          <p className="text-neutral-content-muted mt-1">
            Configure user controls, invitations, theme swatches, and billing topic alerts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="accent">
            <Activity size={14} className="mr-2 inline" /> Admin Control
          </Badge>
        </div>
      </div>

      {/* 3-Column Layout with Intrinsic Width to Prevent Cramping */}
      <div className="grid grid-cols-3 items-start gap-6">
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <SwatchCard themeName={themeName} setThemeName={setThemeName} />
          <TypographyCard />
          <EnvironmentsCard />
        </div>
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
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
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <InviteCard roleOption={roleOption} setRoleOption={setRoleOption} />
          <BugReportCard ticketTopic={ticketTopic} setTicketTopic={setTicketTopic} />
          <ContributorsCard />
        </div>
      </div>
    </div>
  );
}
