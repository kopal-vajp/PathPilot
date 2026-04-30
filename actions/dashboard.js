"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithRetry } from "@/lib/ai-helper";

export const generateAIInsights = async (industry) => {
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
  - Return ONLY JSON
  - No markdown
  - At least 5 roles
  - At least 5 skills and trends
  `;

  try {
    const text = await generateWithRetry(prompt);

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.error("AI JSON parse failed:", cleanedText);
      throw new Error("Invalid AI response format");
    }

    return parsed;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error("Failed to generate AI insights");
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.upsert({
      where: { industry: user.industry },
      update: {},
      create: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}

export async function regenerateIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const insights = await generateAIInsights(user.industry);

  const industryInsight = await db.industryInsight.update({
    where: { industry: user.industry },
    data: {
      salaryRanges: insights.salaryRanges,
      growthRate: insights.growthRate,
      demandLevel: insights.demandLevel,
      topSkills: insights.topSkills,
      marketOutlook: insights.marketOutlook,
      keyTrends: insights.keyTrends,
      recommendedSkills: insights.recommendedSkills,
      lastUpdated: new Date(),
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return industryInsight;
}
