import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_OPENAI_API_KEY: z.string().min(10),
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(10),
});

export const env = envSchema.parse({
  EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
});
