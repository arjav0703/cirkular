"use server";

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SuggestLayoutInputSchema = z.object({
  text: z.string().describe("The text to be laid out."),
  font: z.string().describe("The name of the font to be used."),
  spacing: z.number().describe("The current spacing between letters."),
});
export type SuggestLayoutInput = z.infer<typeof SuggestLayoutInputSchema>;

const SuggestLayoutOutputSchema = z.object({
  suggestedSpacing: z
    .number()
    .describe("The suggested spacing between letters."),
  layoutSuggestions: z.string().describe("Suggestions for the text layout."),
});
export type SuggestLayoutOutput = z.infer<typeof SuggestLayoutOutputSchema>;

export async function suggestLayout(
  input: SuggestLayoutInput,
): Promise<SuggestLayoutOutput> {
  return suggestLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: "suggestLayoutPrompt",
  input: { schema: SuggestLayoutInputSchema },
  output: { schema: SuggestLayoutOutputSchema },
  prompt: `You are an AI expert in typography and logo design.

You are given the following text, font and spacing:
Text: {{{text}}}
Font: {{{font}}}
Spacing: {{{spacing}}}

Based on these inputs, suggest an optimal spacing and some layout suggestions for the text.
Consider the legibility and visual appeal of the text when making your suggestions.

Output the suggested spacing as a number and the layout suggestions as a short paragraph.
`,
});

const suggestLayoutFlow = ai.defineFlow(
  {
    name: "suggestLayoutFlow",
    inputSchema: SuggestLayoutInputSchema,
    outputSchema: SuggestLayoutOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
