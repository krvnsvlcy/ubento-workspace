export type Agent = {
  name: string;
  description: string;
  instructions: string;
  communicationInterface: "message" | "response";
  tools?: string[];
  agents?: string[];
};
