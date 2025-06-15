import OpenAI from "openai";
import { env } from "./env";

const client = new OpenAI({
  apiKey: env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export const openai = {
  explainMeme: async (base64: string) => {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Jesteś asystentem, który tłumaczy slang i memy starszym osobom w prosty, zabawny sposób. Pamiętaj żeby mówić jak najmniej, najlepiej max do 2-3 zdań.",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
            {
              type: "text",
              text: "Wytłumacz tego mema jak boomerowi.",
            },
          ],
        },
      ],
    });

    return completion.choices[0].message.content ?? "";
  },
  explainPhrase: async (phrase: string) => {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Jesteś asystentem, który tłumaczy slang i memy starszym osobom w prosty, zabawny sposób. Pamiętaj żeby mówić jak najmniej, najlepiej max do 2-3 zdań.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: phrase,
            },
            {
              type: "text",
              text: "Wytłumacz tego mema jak boomerowi.",
            },
          ],
        },
      ],
    });

    return completion.choices[0].message.content ?? "";
  },
};
