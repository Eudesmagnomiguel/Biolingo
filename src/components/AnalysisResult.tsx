
'use client';

import {
  Bird,
  MessageCircle,
  Siren,
  Heart,
  Shield,
  HelpCircle,
  Leaf,
  Drumstick,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type AnalyzeAudioOutput } from '@/ai/schemas/analyze-audio';

interface AnalysisResultProps {
  result: AnalyzeAudioOutput;
}

const cantoIcons: { [key: string]: React.ElementType } = {
  Alarme: Siren,
  Acasalamento: Heart,
  Territorial: Shield,
  Comunicação: MessageCircle,
  Alimentação: Drumstick,
  default: HelpCircle,
};

export default function AnalysisResult({ result }: AnalysisResultProps) {
  const CantoIcon = cantoIcons['Acasalamento']; // Defaulting to Heart as per design.
  const EcoIcon = Leaf;

  return (
    <Card className="mt-6 border-primary/20 bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bird className="h-6 w-6 text-primary" />
          Resultado da Análise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2">
            Espécie
          </h3>
          <p className="text-lg font-medium text-foreground mt-1">
            {result.species}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2">
            <CantoIcon className="h-4 w-4" /> Significado do Canto
          </h3>
          <p className="text-foreground leading-relaxed mt-1">
            {result.cantoMeaning}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2">
            <EcoIcon className="h-4 w-4" /> Importância Ecológica
          </h3>
          <p className="text-muted-foreground leading-relaxed mt-1">
            {result.ecologicalImportance}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
