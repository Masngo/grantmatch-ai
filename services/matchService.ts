import { openai } from "@/lib/openai";
import { Listing } from "@/types/listing";
import { User } from "@/types/user";

export async function generateMatches(user: User, listings: Listing[]) {
  const prompt = `
You are an AI funding recommendation engine.

User Profile:
${JSON.stringify(user, null, 2)}

Available Funding Opportunities:
${JSON.stringify(listings, null, 2)}

TASK:
Return the TOP 5 best matches.

For each match return:
- listingId
- matchScore (0–100)
- explanation (why this matches the user)

Return in JSON format only.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
}