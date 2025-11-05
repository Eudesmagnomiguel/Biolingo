
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
import type { TravelDiary } from '@/lib/travel-data';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import PhotoCapture from '@/components/PhotoCapture';

function NewTravelDiaryContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !summary) {
        toast({
            variant: 'destructive',
            title: 'Campos em falta',
            description: 'Por favor, preencha todos os campos do diário.',
        });
        return;
    }

    const newDiary: TravelDiary = {
      id: `diary-${Date.now()}`,
      title,
      authorId: 'tommy-west', // Hardcoded for current user
      location,
      mainImageId: `cangandala-park`, // Use a default image for now
      mainImageDataUri: imageDataUri || undefined,
      summary,
      speciesCount: Math.floor(Math.random() * 20),
      recordingsCount: Math.floor(Math.random() * 50),
    };

    try {
        const storedDiaries = window.localStorage.getItem('newTravelDiaries');
        const diaries = storedDiaries ? JSON.parse(storedDiaries) : [];
        diaries.push(newDiary);
        window.localStorage.setItem('newTravelDiaries', JSON.stringify(diaries));
    
        toast({
            title: 'Diário Publicado!',
            description: 'O seu diário de viagem foi publicado com sucesso.',
        });
    
        router.push('/travel');
    } catch (error) {
        console.error('Failed to save travel diary', error);
        toast({
            variant: 'destructive',
            title: 'Erro ao Publicar',
            description: 'Não foi possível guardar o seu diário. Por favor, tente novamente.',
        });
    }
  };

  return (
    <div className="py-6">
       <section className="text-left my-8">
            <Link href="/travel" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                <ChevronLeft className="h-4 w-4" />
                Voltar aos Diários de Viagem
            </Link>
            <h1 className="text-4xl font-bold mb-2">Publicar Novo Diário</h1>
            <p className="text-muted-foreground text-lg">
                Partilhe a sua aventura sonora com a comunidade BioLingo.
            </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Viagem</CardTitle>
          <CardDescription>Preencha os detalhes abaixo para criar o seu diário de viagem.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Diário</Label>
              <Input
                id="title"
                placeholder="Ex: Uma Manhã na Floresta do Maiombe"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                placeholder="Ex: Província de Cabinda, Angola"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Resumo da Experiência</Label>
              <Textarea
                id="summary"
                placeholder="Descreva a sua viagem, os sons que ouviu e as suas descobertas..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                className="min-h-32"
              />
            </div>
            <div className="space-y-4">
                <Label>Fotografia Principal</Label>
                <PhotoCapture onImageCapture={setImageDataUri} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Publicar Diário</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewTravelDiaryPage() {
  return (
    <AppLayout>
      <NewTravelDiaryContent />
    </AppLayout>
  );
}
    