
'use server';
/**
 * @fileOverview Image analysis flow to identify animal species using iNaturalist API.
 *
 * - analyzeImage - A function that handles the image analysis process.
 */

import { ai } from '@/ai/genkit';
import {
  AnalyzeImageInputSchema,
  AnalyzeImageOutputSchema,
  type AnalyzeImageInput,
  type AnalyzeImageOutput,
} from '@/ai/schemas/analyze-image';
import { z } from 'zod';

// Helper function to convert data URI to Blob
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const conservationStatusMap: { [key: string]: string } = {
  'not evaluated': 'Não Avaliado',
  'data deficient': 'Dados Insuficientes',
  'least concern': 'Pouco Preocupante',
  'near threatened': 'Quase Ameaçada',
  'vulnerable': 'Vulnerável',
  'endangered': 'Em Perigo',
  'critically endangered': 'Criticamente em Perigo',
  'extinct in the wild': 'Extinto na Natureza',
  'extinct': 'Extinto',
};

const translateConservationStatus = (status: string | undefined | null): string => {
  if (!status) return 'Não Avaliado';
  return conservationStatusMap[status.toLowerCase()] || status;
};

export async function analyzeImage(
  input: AnalyzeImageInput
): Promise<AnalyzeImageOutput> {
  const iNaturalistResult = await analyzeImageFlow(input);
  
  if (!iNaturalistResult || iNaturalistResult.results.length === 0) {
    throw new Error("Could not identify the species from the image.");
  }

  const bestMatch = iNaturalistResult.results[0];
  const speciesName = bestMatch.taxon.preferred_common_name || bestMatch.taxon.name;

  const enhancedInfo = await identificationEnhancerFlow({ speciesName });

  const output: AnalyzeImageOutput = {
    common_name: speciesName,
    scientific_name: bestMatch.taxon.name,
    observation_date: iNaturalistResult.observed_on || new Date().toISOString().split('T')[0],
    location: iNaturalistResult.geo_prior ? `${iNaturalistResult.geo_prior.name}` : 'Desconhecida',
    conservation_status: translateConservationStatus(bestMatch.taxon.conservation_status?.status_name),
    identification_level: 'Visão Computacional',
    imageUrl: bestMatch.taxon.default_photo?.medium_url || `https://picsum.photos/seed/${bestMatch.taxon.id}/600/400`,
    cantoMeaning: enhancedInfo.cantoMeaning,
    ecologicalImportance: enhancedInfo.ecologicalImportance,
  }

  return output;
}

const iNaturalistTool = ai.defineTool(
  {
    name: 'iNaturalistComputerVision',
    description: 'Get species identification from an image using iNaturalist Computer Vision API.',
    inputSchema: AnalyzeImageInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    const apiUrl = process.env.NEXT_PUBLIC_INATURALIST_API_URL;
    const apiToken = process.env.INATURALIST_API_TOKEN;

    if (!apiUrl) {
      throw new Error('iNaturalist API URL is not configured.');
    }
    
    const imageBlob = dataURItoBlob(input.imageDataUri);
    const formData = new FormData();
    formData.append('image', imageBlob);
    
    // Add observed_on and geo parameters for more context
    formData.append('observed_on', new Date().toISOString());
    // Note: Lat/Lng may need to be provided by the user in a real scenario
    // formData.append('lat', '-8.8368'); 
    // formData.append('lng', '13.2343');

    const response = await fetch(`${apiUrl}computervision/score_image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`iNaturalist API request failed with status ${response.status}: ${errorText}`);
    }

    return await response.json();
  }
);

const analyzeImageFlow = ai.defineFlow(
  {
    name: 'analyzeImageFlow',
    inputSchema: AnalyzeImageInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    return await iNaturalistTool(input);
  }
);


const identificationEnhancerFlow = ai.defineFlow(
    {
        name: 'identificationEnhancerFlow',
        inputSchema: z.object({ speciesName: z.string() }),
        outputSchema: z.object({
            cantoMeaning: z.string(),
            ecologicalImportance: z.string(),
        }),
    },
    async (input) => {
        const prompt = `Para a espécie "${input.speciesName}", descreva o seguinte em português:
        1.  **Significado do Canto**: Qual a principal função do seu canto ou vocalização? (ex: territorial, acasalamento, alarme). Responda de forma concisa.
        2.  **Importância Ecológica**: Qual o papel ecológico desta espécie no seu ecossistema? (ex: polinizador, controlo de pragas, etc.). Responda com um parágrafo curto.
        `;

        const llmResponse = await ai.generate({
            prompt: prompt,
            model: 'googleai/gemini-2.5-flash',
            output: {
                schema: z.object({
                    cantoMeaning: z.string().describe('O significado do canto ou vocalização da espécie.'),
                    ecologicalImportance: z.string().describe('A importância ecológica da espécie.'),
                }),
            },
        });
        
        return llmResponse.output!;
    }
)
