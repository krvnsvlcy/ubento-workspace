export type Agent = {
  name: string;
  description: string;
  instructions: string;
  enableMessage?: boolean;
  tools?: string[];
  agents?: string[];
};
