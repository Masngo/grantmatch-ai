import { NextResponse } from "next/server";
import { generateMatches } from "@/services/matchService";
import { getAllItems } from "@/aws/dynamodbClient";

export async function POST(req: Request) {
  try {
    // 1. Get user input
    const user = await req.json();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Missing user data" },
        { status: 400 }
      );
    }

    // 2. Fetch funding listings from DynamoDB
    const listingsResponse = await getAllItems();
    const listings = listingsResponse.Items || [];

    // 3. Run AI matching engine
    const result = await generateMatches(user, listings);

    // 4. Return response to frontend
    return NextResponse.json({
      success: true,
      matches: result,
    });

  } catch (error: any) {
    console.error("Match API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}