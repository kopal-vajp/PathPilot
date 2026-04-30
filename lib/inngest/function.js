import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { generateWithRetry } from "@/lib/ai-helper";

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // every Sunday
  async ({ step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
        Analyze the current state of the ${industry} industry and return ONLY JSON:

        {
          "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
          ],
          "growthRate": number,
          "demandLevel": "LOW" | "MEDIUM" | "HIGH",
          "topSkills": ["skill1", "skill2"],
          "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
          "keyTrends": ["trend1", "trend2"],
          "recommendedSkills": ["skill1", "skill2"]
        }

        Rules:
        - No markdown
        - No explanation
        - At least 5 roles
        - At least 5 skills and trends
      `;

      try {
        const text = await generateWithRetry(prompt);

        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

        let insights;
        try {
          insights = JSON.parse(cleanedText);
        } catch (err) {
          console.error("AI JSON parse failed:", cleanedText);
          continue; // skip instead of crashing cron
        }

        await step.run(`Update ${industry} insights`, async () => {
          await db.industryInsight.update({
            where: { industry },
            data: {
              ...insights,
              lastUpdated: new Date(),
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        });
      } catch (error) {
        console.error(`Failed for industry ${industry}:`, error.message);
        continue; // don't break whole job
      }
    }
  }
);