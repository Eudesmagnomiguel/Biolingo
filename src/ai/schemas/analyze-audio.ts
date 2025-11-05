
import { z } from 'zod';

/**
 * @fileOverview Esquemas e tipos para o fluxo de análise de áudio.
 *
 * - AnalyzeAudioInputSchema - Esquema de entrada para a análise de áudio.
 * - AnalyzeAudioInput - Tipo de entrada para a análise de áudio.
 * - AnalyzeAudioOutputSchema - Esquema de saída para a análise de áudio.
 * - AnalyzeAudioOutput - Tipo de saída para a análise de áudio.
 */

export const AnalyzeAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "O áudio de um animal, como um URI de dados que deve incluir um tipo MIME e usar codificação Base64. Formato esperado: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeAudioInput = z.infer<typeof AnalyzeAudioInputSchema>;

export const AnalyzeAudioOutputSchema = z.object({
  species: z.string().describe('A espécie do animal identificada no áudio.'),
  cantoMeaning: z
    .string()
    .describe(
      'O significado do canto ou vocalização (ex: Acasalamento, Alarme, Alimentação, Territorial).'
    ),
  ecologicalImportance: z
    .string()
    .describe(
      'Uma explicação sobre a importância ecológica daquele animal para o seu ecossistema.'
    ),
});
export type AnalyzeAudioOutput = z.infer<typeof AnalyzeAudioOutputSchema>;
