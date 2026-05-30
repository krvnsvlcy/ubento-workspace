import { useState } from "react";
import AdminSettingsPreview from "./previews/AdminSettingsPreview";
import BentoSandboxPreview from "./previews/BentoSandboxPreview";
import ExecutiveAnalyticsPreview from "./previews/ExecutiveAnalyticsPreview";
import TypographyPreview from "./previews/TypographyPreview";

export default function PreviewDashboard({
  activePreview = "sandbox",
}: {
  activePreview?: string;
}) {
  const [themeName, setThemeName] = useState<string>("Rhea");
  const [paymentOption, setPaymentOption] = useState<string>("stripe");
  const [sliderVal, setSliderVal] = useState<number[]>([45]);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(true);
  const [marketingCheck, setMarketingCheck] = useState<boolean>(true);
  const [roleOption, setRoleOption] = useState<string>("member");
  const [ticketTopic, setTicketTopic] = useState<string>("billing");

  const trafficData = [
    { name: "Organic", value: 3450 },
    { name: "Direct", value: 2850 },
    { name: "Referral", value: 1620 },
    { name: "Social", value: 1210 },
  ];

  const browserData = [
    { name: "Chrome", value: 65 },
    { name: "Safari", value: 18 },
    { name: "Firefox", value: 9 },
    { name: "Edge", value: 5 },
    { name: "Other", value: 3 },
  ];

  const previewProps = {
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
  };

  return (
    <main className="flex-1 bg-surface overflow-auto p-8">
      {activePreview === "analytics" && (
        <ExecutiveAnalyticsPreview {...previewProps} />
      )}
      {activePreview === "admin" && <AdminSettingsPreview {...previewProps} />}
      {activePreview === "sandbox" && <BentoSandboxPreview {...previewProps} />}
      {activePreview === "typography" && <TypographyPreview />}
    </main>
  );
}
