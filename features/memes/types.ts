export interface Meme {
  imageUri: string;
  explanation: string;
  timestamp: number;
}

export type ExplainMemeInput = {
  base64: string;
  imageUri: string;
};
