import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "PathPilot", // Unique app ID
  name: "PathPilot",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
