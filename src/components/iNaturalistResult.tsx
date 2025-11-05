
'use client';

import Image from 'next/image';
import {
  Bird,
  Calendar,
  MapPin,
  ShieldCheck,
  BrainCircuit,
  User,
  Heart,
  Leaf,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type AnalyzeImageOutput } from '@/ai/schemas/analyze-image';
import { Badge } from './ui/badge';

interface iNaturalistResultProps {
  result: AnalyzeImageOutput;
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    'Criticamente em Perigo': 'destructive',
    'Em Perigo': 'destructive',
    'Vulnerável': 'destructive',
    'Quase Ameaçada': 'default',
    'Pouco Preocupante': 'secondary',
    'Não Avaliado': 'outline',
};

export default function INaturalistResult({ result }: iNaturalistResultProps) {
  
  const getStatusVariant = (status: string) => {
    return statusVariant[status] || 'outline';
  }

  return (
    <Card className="mt-6 border-primary/20 bg-secondary/50 overflow-hidden">
      <CardHeader className='p-0'>
        <div className="relative h-48 w-full">
            <Image
                src={result.imageUrl}
                alt={result.common_name}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
                <CardTitle className="text-2xl font-bold text-white">
                    {result.common_name}
                </CardTitle>
                <p className="text-md text-slate-300 italic">{result.scientific_name}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2">
            <Heart className="h-4 w-4" /> Significado do Canto
          </h3>
          <p className="text-foreground leading-relaxed mt-1">
            {result.cantoMeaning}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-primary tracking-wider flex items-center gap-2">
            <Leaf className="h-4 w-4" /> Importância Ecológica
          </h3>
          <p className="text-muted-foreground leading-relaxed mt-1">
            {result.ecologicalImportance}
          </p>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-6 border-t border-border">
            <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-foreground">Data da Observação</h3>
                    <p className="text-muted-foreground">{new Date(result.observation_date).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-foreground">Localização</h3>
                    <p className="text-muted-foreground">{result.location}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-foreground">Estado de Conservação</h3>
                    <Badge variant={getStatusVariant(result.conservation_status)}>{result.conservation_status}</Badge>
                </div>
            </div>
             <div className="flex items-start gap-3">
                <BrainCircuit className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-foreground">Nível de Identificação</h3>
                    <p className="text-muted-foreground">{result.identification_level}</p>
                </div>
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
