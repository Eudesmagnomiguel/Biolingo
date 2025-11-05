
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type AnalyzeAudioOutput } from '@/ai/schemas/analyze-audio';
import { type AnalyzeImageOutput } from '@/ai/schemas/analyze-image';
import { History, Bird, MessageCircle, Leaf, Siren, Heart, Shield, HelpCircle, Drumstick, Image as ImageIcon } from 'lucide-react';

type AnalysisResultType = AnalyzeAudioOutput | AnalyzeImageOutput;

interface AnalysisHistoryProps {
  analyses: AnalysisResultType[];
}

const cantoIcons: { [key: string]: React.ElementType } = {
    Alarme: Siren,
    Acasalamento: Heart,
    Territorial: Shield,
    Comunicação: MessageCircle,
    Alimentação: Drumstick,
    default: HelpCircle,
  };

const getCantoIcon = (cantoMeaning: string) => {
    return Heart; // Matching the new design
}

function isImageAnalysis(result: AnalysisResultType): result is AnalyzeImageOutput {
    return 'scientific_name' in result;
}

export default function AnalysisHistory({ analyses }: AnalysisHistoryProps) {
  return (
    <Card className="mt-8 bg-secondary border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <History className="h-6 w-6 text-primary" />
          Histórico de Análises
        </CardTitle>
      </CardHeader>
      <CardContent>
        {analyses.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {analyses.map((result, index) => {
              if (isImageAnalysis(result)) {
                 return (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                          <ImageIcon className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{result.common_name}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                       <div>
                        <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2 mb-1">
                            <Bird className="h-4 w-4" /> Nome Científico
                        </h3>
                        <p className="text-foreground italic">
                            {result.scientific_name}
                        </p>
                       </div>
                       <div>
                        <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2 mb-1">
                            <Shield className="h-4 w-4" /> Estado de Conservação
                        </h3>
                        <p className="text-muted-foreground">
                            {result.conservation_status}
                        </p>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              } else {
                const CantoIcon = getCantoIcon(result.cantoMeaning);
                return (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                          <Bird className="h-5 w-5 text-primary" />
                          <span className="font-semibold">{result.species}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      <div>
                        <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2 mb-1">
                          <CantoIcon className="h-4 w-4" /> Significado do Canto
                        </h3>
                        <p className="text-foreground">
                          {result.cantoMeaning}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2 mb-1">
                          <Leaf className="h-4 w-4" /> Importância Ecológica
                        </h3>
                        <p className="text-muted-foreground">
                          {result.ecologicalImportance}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              }
            })}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center">
            Ainda não há análises guardadas.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
