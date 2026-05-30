import { Badge, Heading } from "@ubento/bento.arlo-core";
import { Activity } from "lucide-react";
import {
  BrowserCard,
  DialogsCard,
  FeedbackCard,
  InvoiceCard,
  SystemStatusCard,
  TrafficCard,
} from "../SharedPreviewComponents";
import { type PreviewProps } from "./BentoSandboxPreview";

export default function ExecutiveAnalyticsPreview({
  trafficData,
  browserData,
}: PreviewProps) {
  return (
    <div className="space-y-8 w-[1140px] md:w-[1280px]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Executive Analytics</Heading>
          <p className="text-neutral-content-muted mt-1">
            Data metrics, latency progress bars, and audience traffic distribution.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="accent">
            <Activity size={14} className="mr-2 inline" /> Analytics View
          </Badge>
        </div>
      </div>

      {/* 3-Column Layout with Intrinsic Width to Prevent Cramping */}
      <div className="grid grid-cols-3 items-start gap-6">
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <TrafficCard trafficData={trafficData} />
          <BrowserCard browserData={browserData} />
        </div>
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <SystemStatusCard />
          <InvoiceCard />
        </div>
        <div className="flex flex-col gap-6 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <DialogsCard />
          <FeedbackCard />
        </div>
      </div>
    </div>
  );
}
