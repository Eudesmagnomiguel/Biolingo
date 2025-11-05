
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, Bird, MapPin, PlusCircle } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { travelDiaries as initialTravelDiaries, type TravelDiary } from '@/lib/travel-data';
import { animalContributors } from '@/lib/animal-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function TravelContent() {
  const [diaries, setDiaries] = useState<TravelDiary[]>(initialTravelDiaries);

  useEffect(() => {
    let newDiaries: TravelDiary[] = [];
    if (typeof window !== 'undefined') {
      const storedDiaries = window.localStorage.getItem('newTravelDiaries');
      if (storedDiaries) {
        newDiaries = JSON.parse(storedDiaries);
      }
    }
    setDiaries([...initialTravelDiaries, ...newDiaries].sort((a,b) => Number(b.id.split('-')[1]) - Number(a.id.split('-')[1])));
  }, []);


  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
  };

  const getContributor = (authorId: string) => {
    return animalContributors.find(c => c.id === authorId);
  }

  return (
    <div className="py-6">
      <section className="text-left my-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold mb-2">Diários de Viagem</h1>
                <p className="text-muted-foreground text-lg">
                Explore as jornadas sonoras da nossa comunidade por Angola.
                </p>
            </div>
            <Link href="/travel/new" passHref>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Publicar Diário
                </Button>
            </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {diaries.map((diary) => {
          const contributor = getContributor(diary.authorId);
          const imageSrc = diary.mainImageDataUri || getImage(diary.mainImageId);
          return (
            <Card key={diary.id} className="bg-secondary border-0 rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={imageSrc}
                  alt={diary.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-sm text-primary font-semibold flex items-center gap-2"><MapPin className="h-4 w-4"/>{diary.location}</p>
                  <h2 className="text-xl font-bold mt-2 mb-2">{diary.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {diary.summary}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border/50 pt-4 mt-4">
                    <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        <span>{diary.recordingsCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bird className="h-4 w-4" />
                        <span>{diary.speciesCount} espécies</span>
                    </div>
                </div>

                <Link href="/profile">
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{contributor ? getInitials(contributor.name) : 'EU'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{contributor?.name || 'Eudesmagno Miguel'}</p>
                      <p className="text-xs text-muted-foreground">{contributor?.levelName || 'Explorador Iniciante'}</p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function TravelPage() {
  return (
    <AppLayout>
      <TravelContent />
    </AppLayout>
  );
}

    