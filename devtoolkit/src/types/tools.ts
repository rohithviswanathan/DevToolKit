export type ToolCategory =
  | "JSON"
  | "Encoding"
  | "Utilities"
  | "Regex";

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  icon: string;
  route: string;
  keywords: string[];
  related: string[];
}