
import { z } from 'zod';

export const BioChatInputSchema = z.object({
  message: z.string().describe('The user message'),
});
export type BioChatInput = z.infer<typeof BioChatInputSchema>;

export const BioChatOutputSchema = z.object({
  message: z.string().describe('The AI response'),
});
export type BioChatOutput = z.infer<typeof BioChatOutputSchema>;
