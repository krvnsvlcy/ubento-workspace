export type LanguageModelMessageRole = "system" | "user" | "assistant" | "tool";

export interface LanguageModelMessage {
  role: LanguageModelMessageRole;
  content: any;
}

export interface LanguageModelCallOptions {
  system?: string;
  messages: LanguageModelMessage[];
  abortSignal?: AbortSignal;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  seed?: number;
}

export interface LanguageModelUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface LanguageModelGenerateResult {
  text: string;
}

export interface LanguageModel {
  id: string;
  generateText(
    options: LanguageModelCallOptions,
  ): Promise<LanguageModelGenerateResult>;
}
