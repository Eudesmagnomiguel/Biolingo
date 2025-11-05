
'use server';
/**
 * @fileOverview Fluxo de análise de áudio de animais.
 *
 * - analyzeAudio - Uma função que lida com o processo de análise de áudio.
 */

import { ai } from '@/ai/genkit';
import {
  AnalyzeAudioInputSchema,
  AnalyzeAudioOutputSchema,
  type AnalyzeAudioInput,
  type AnalyzeAudioOutput,
} from '@/ai/schemas/analyze-audio';

export async function analyzeAudio(
  input: AnalyzeAudioInput
): Promise<AnalyzeAudioOutput> {
  return analyzeAudioFlow(input);
}

const analyzeAudioFlow = ai.defineFlow(
  {
    name: 'analyzeAudioFlow',
    inputSchema: AnalyzeAudioInputSchema,
    outputSchema: AnalyzeAudioOutputSchema,
  },
  async (input) => {
    const prompt = `Você é um especialista em bioacústica e ecologia. A sua tarefa é analisar a gravação de áudio de uma ave ou outro animal.
    Com base no áudio, identifique:
    1. A espécie do animal.
    2. O significado do canto ou vocalização (ex: acasalamento, alarme, alimentação, territorial).
    3. A importância ecológica daquele animal para o seu ecossistema.

    Responda de forma concisa e direta, focando-se nestes três pontos.

    Áudio: {{media url=audioDataUri}}`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: AnalyzeAudioOutputSchema,
      },
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ]
      }
    });

    return llmResponse.output!;
  }
);
