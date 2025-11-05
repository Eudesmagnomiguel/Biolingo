
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { animalContributors } from '@/lib/animal-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Settings, Mic, Users, ChevronLeft, MoreVertical, History, Star, Award, Sprout, Target, Sun, Moon } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { getInitials } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnalysisHistory from '@/components/AnalysisHistory';
import { type AnalyzeAudioOutput } from '@/ai/schemas/analyze-audio';
import { type AnalyzeImageOutput } from '@/ai/schemas/analyze-image';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type AnalysisResultType = AnalyzeAudioOutput | AnalyzeImageOutput;


function ProfileContent() {
  const { user, loading } = useUser();

  const userProfile = {
    ...animalContributors[0],
    name: user?.displayName || 'Utilizador BioLingo',
    email: user?.email || '',
    level: 2,
    levelName: 'Explorador Iniciante',
    xp: 170,
    nextLevelXp: 300,
  };
  const stats = [
    { value: '24', label: 'Gravações' },
    { value: '12', label: 'Espécies' },
    { value: '1.2K', label: 'Seguidores' },
  ];

  const badges = [
    { name: 'Primeira Gravação', icon: Mic, description: 'Fez a sua primeira contribuição sonora.'},
    { name: 'Naturalista', icon: Sprout, description: 'Identificou 5 espécies diferentes.' },
    { name: 'Pioneiro', icon: Award, description: 'Chegou ao nível 2.' },
    { name: 'Frequente', icon: Target, description: 'Contribuiu por 3 dias seguidos.' },
  ]

  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
  };

  const savedAnalyses: AnalysisResultType[] = [
    {
        species: 'Pisco-de-peito-ruivo-da-floresta (Stiphrornis erythrothorax)',
        cantoMeaning: 'Canto territorial para demarcar a sua área.',
        ecologicalImportance: 'Dispersor de sementes e controlador de insetos.',
    },
    {
        common_name: 'Pica-pau-malhado-maior',
        scientific_name: 'Dendrocopos major',
        observation_date: '2024-05-10',
        location: 'Parque da Cidade, Luanda',
        conservation_status: 'Pouco Preocupante',
        identification_level: 'Visão Computacional',
        imageUrl: 'https://images.unsplash.com/photo-1599427382236-9b04d1f1b3d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        cantoMeaning: 'Tamborilar para comunicação e escavação.',
        ecologicalImportance: 'Controla populações de insetos e cria cavidades para outras espécies.',
    },
    {
        species: 'Canário-da-terra (Sicalis flaveola)',
        cantoMeaning: 'Chamado de acasalamento para atrair fêmeas.',
        ecologicalImportance: 'Polinizador e parte da cadeia alimentar.',
    }
  ];

  const levelProgress = (userProfile.xp / userProfile.nextLevelXp) * 100;

  if (loading) {
    return (
        <div className="bg-background">
        <header className="relative h-40">
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
            <Link href="/">
              <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
  
        <main className="container -mt-16 pb-8">
          <div className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full mb-2"/>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
  
            <div className="flex gap-4 mt-4">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
  
          <Card className="mt-8 bg-secondary rounded-2xl">
            <CardContent className="p-4 flex justify-around">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <Skeleton className="h-6 w-10 mx-auto mb-1" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <header className="relative h-40">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container -mt-16 pb-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-background mb-2">
            <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className="text-muted-foreground text-sm">Explorador da Natureza</p>

          <div className="flex gap-4 mt-4">
            <Button>Seguir</Button>
          </div>
        </div>

        <Card className="mt-8 bg-secondary rounded-2xl">
          <CardContent className="p-4 flex justify-around">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-8 bg-secondary rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Nível {userProfile.level}: {userProfile.levelName}</span>
              <span className='text-sm font-normal text-muted-foreground'>{userProfile.xp} / {userProfile.nextLevelXp} XP</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={levelProgress} className="h-2"/>
          </CardContent>
        </Card>

        <section className="mt-8">
          <Tabs defaultValue="contributions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary mb-4">
              <TabsTrigger value="contributions">Contribuições</TabsTrigger>
              <TabsTrigger value="achievements">
                <Star className="h-4 w-4 mr-2"/>
                Conquistas
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2"/>
                Histórico
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contributions">
              <div className="grid grid-cols-3 gap-1">
                {userProfile.galleryImageIds.slice(0, 6).map((img) => (
                  <div key={img.id} className="relative aspect-square w-full rounded-md overflow-hidden">
                    <Image
                      src={getImage(img.id)}
                      alt={img.hint}
                      fill
                      className="object-cover"
                      data-ai-hint={img.hint}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="achievements">
               <TooltipProvider>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 text-center">
                    {badges.map(badge => (
                      <Tooltip key={badge.name}>
                        <TooltipTrigger>
                          <div className='flex flex-col items-center gap-2'>
                            <div className='bg-background/50 rounded-full p-4 border-2 border-primary/30'>
                                <badge.icon className='w-8 h-8 text-primary'/>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className='font-bold'>{badge.name}</p>
                          <p>{badge.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                </div>
              </TooltipProvider>
            </TabsContent>
            <TabsContent value="history">
                <AnalysisHistory analyses={savedAnalyses} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

export default function ProfilePage() {
    return (
      <AppLayout>
        <ProfileContent />
      </AppLayout>
    );
}
