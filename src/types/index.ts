export interface DateTimeToolInput {
  format?: "iso" | "local" | "utc" | "timestamp" | "relative";
  timezone?: string;
}

export interface DateTimeResult {
  datetime: string;
  format: string;
  timezone?: string;
  timestamp: number;
}
