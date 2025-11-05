
'use server';
/**
 * @fileOverview A simple chat flow for BioLingo.
 *
 * - chat - A function that handles the chat interaction.
 */

import { ai } from '@/ai/genkit';
import {
  BioChatInputSchema,
  BioChatOutputSchema,
  type BioChatInput,
  type BioChatOutput,
} from '@/ai/schemas/chat';

export async function chat(input: BioChatInput): Promise<BioChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: BioChatInputSchema,
    outputSchema: BioChatOutputSchema,
  },
  async (input) => {
    const prompt = `You are an expert biologist and ecologist for an app called BioLingo.
The user is asking a question. Answer them in a helpful and friendly way.
Keep the answer concise and easy to understand for a general audience.
User question: ${input.message}`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
    });

    return {
        message: llmResponse.text,
    };
  }
);
