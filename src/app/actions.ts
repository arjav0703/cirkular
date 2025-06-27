"use server";

import {
  suggestLayout as suggestLayoutFlow,
  type SuggestLayoutInput,
  type SuggestLayoutOutput,
} from "@/ai/flows/suggest-layout";
import { z } from "zod";

// Input schema for validation, matches SuggestLayoutInput from the flow
const ActionInputSchema = z.object({
  text: z.string().min(1, { message: "Text cannot be empty." }),
  font: z.string().min(1, { message: "Font cannot be empty." }),
  spacing: z.number(),
});

export async function getAiSuggestionsAction(
  input: SuggestLayoutInput,
): Promise<SuggestLayoutOutput | { error: string }> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    const errorMessage = parsedInput.error.errors
      .map((e) => e.message)
      .join(" ");
    return { error: `Invalid input: ${errorMessage}` };
  }

  try {
    const result = await suggestLayoutFlow(parsedInput.data);
    if (!result) {
      return { error: "AI service returned an empty response." };
    }
    return result;
  } catch (error) {
    console.error("Error in getAiSuggestionsAction:", error);
    if (error instanceof Error) {
      return {
        error: `An error occurred while fetching AI suggestions: ${error.message}`,
      };
    }
    return {
      error:
        "An unexpected error occurred while fetching AI suggestions. Please try again.",
    };
  }
}
