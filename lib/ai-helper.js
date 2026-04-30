import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateWithRetry = async (prompt, retries = 3) => {
  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];

  for (const model of models) {
    let attempts = retries;

    while (attempts >= 0) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        if (!response?.text) {
          throw new Error("Empty response from AI");
        }

        return response.text;
      } catch (error) {
        console.log(
          `Model ${model} failed (attempt ${retries - attempts + 1})`,
          error?.message
        );

        if (attempts === 0) break;

        // wait before retry (slightly increasing delay)
        await new Promise((res) => setTimeout(res, 1500 * (retries - attempts + 1)));
        attempts--;
      }
    }

    console.log(`Switching model → next fallback`);
  }

  throw new Error("All AI models failed");
};