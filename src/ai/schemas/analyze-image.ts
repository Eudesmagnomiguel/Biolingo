
import { z } from 'zod';

/**
 * @fileOverview Schemas and types for the image analysis flow.
 *
 * - AnalyzeImageInputSchema - Input schema for image analysis.
 * - AnalyzeImageInput - Input type for image analysis.
 * - AnalyzeImageOutputSchema - Output schema for image analysis.
 * - AnalyzeImageOutput - Output type for image analysis.
 */

export const AnalyzeImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image of an animal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeImageInput = z.infer<typeof AnalyzeImageInputSchema>;

export const AnalyzeImageOutputSchema = z.object({
  common_name: z.string().describe('O nome popular da espécie.'),
  scientific_name: z.string().describe('O nome científico da espécie.'),
  observation_date: z.string().describe('A data e hora da observação.'),
  location: z.string().describe('A localização da observação (país, província, etc.).'),
  conservation_status: z.string().describe('O estado de conservação (nível de perigo).'),
  identification_level: z.string().describe('O nível de confiança da identificação.'),
  imageUrl: z.string().describe('URL da imagem da espécie.'),
  cantoMeaning: z.string().describe('O significado do canto ou vocalização da espécie.'),
  ecologicalImportance: z.string().describe('A importância ecológica da espécie.'),
});
export type AnalyzeImageOutput = z.infer<typeof AnalyzeImageOutputSchema>;
