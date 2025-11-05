'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { AnimalContributor } from '@/lib/animal-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getInitials } from '@/lib/utils';

interface AnimalCardProps {
  animal: AnimalContributor;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
  };

  return (
    <Link href={`/explore/${animal.id}`}>
      <Card className="bg-secondary border-0 rounded-2xl overflow-hidden flex flex-col h-full">
        <div className="relative h-40 w-full">
          <Image
            src={getImage(animal.mainImageId)}
            alt={animal.mainImageHint}
            fill
            className="object-cover"
            data-ai-hint={animal.mainImageHint}
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h2 className="text-lg font-bold mb-2">{animal.funFact.title}</h2>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(animal.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{animal.name}</p>
              <p className="text-xs text-muted-foreground">{animal.levelName}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
