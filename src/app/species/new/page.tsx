
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import PhotoCapture from '@/components/PhotoCapture';
import AudioCapture from '@/components/AudioCapture';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import type { Observation } from '@/lib/observations-data';

function NewSpeciesPageContent() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const [commonName, setCommonName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Não autenticado',
        description: 'Você precisa estar logado para adicionar uma espécie.',
      });
      return;
    }

    if (!commonName || !scientificName || !location) {
      toast({
        variant: 'destructive',
        title: 'Campos em falta',
        description: 'Por favor, preencha os campos obrigatórios.',
      });
      return;
    }

    setIsSubmitting(true);

    const newObservation: Observation = {
      userId: user.uid,
      commonName,
      scientificName,
      location,
      observationDate: new Date().toISOString(),
      notes: notes || '',
      // photoUrl and audioUrl will be handled later, e.g., after uploading to Firebase Storage
    };

    try {
      const docRef = await addDoc(collection(firestore, 'observations'), newObservation);
      console.log('Observation added with ID: ', docRef.id);
      
      toast({
        title: 'Observação Adicionada!',
        description: `${commonName} foi registado com sucesso.`,
      });
      
      router.push('/explore'); 

    } catch (error) {
      console.error('Error adding observation: ', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Submeter',
        description: 'Não foi possível guardar a sua observação. Por favor, tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6">
       <section className="text-left my-8">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                <ChevronLeft className="h-4 w-4" />
                Voltar à Página Principal
            </Link>
            <h1 className="text-4xl font-bold mb-2">Adicionar Nova Observação</h1>
            <p className="text-muted-foreground text-lg">
                Contribua para a ciência cidadã partilhando as suas descobertas.
            </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Espécie</CardTitle>
          <CardDescription>Preencha os detalhes abaixo para submeter a sua observação.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="commonName">Nome Comum</Label>
                <Input
                  id="commonName"
                  placeholder="Ex: Pisco-de-peito-ruivo"
                  value={commonName}
                  onChange={(e) => setCommonName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scientificName">Nome Científico</Label>
                <Input
                  id="scientificName"
                  placeholder="Ex: Erithacus rubecula"
                  value={scientificName}
                  onChange={(e) => setScientificName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="Ex: Parque da Cidade, Luanda, Angola"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas da Observação</Label>
              <Textarea
                id="notes"
                placeholder="Descreva o comportamento, habitat, ou outras características que observou..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-32"
              />
            </div>
            <div className="space-y-4">
                <Label>Fotografia (Opcional)</Label>
                <PhotoCapture onImageCapture={setImageDataUri} />
            </div>
             <div className="space-y-4">
                <Label>Gravação de Áudio (Opcional)</Label>
                <AudioCapture onAudioCapture={setAudioBlob} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || userLoading}>
                {isSubmitting ? 'A submeter...' : 'Submeter Observação'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewSpeciesPage() {
  return (
    <AppLayout>
      <NewSpeciesPageContent />
    </AppLayout>
  );
}
