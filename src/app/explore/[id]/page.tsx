
'use client';

import { Suspense, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { animalContributors } from '@/lib/animal-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronLeft, Heart, Globe, ToyBrick, ShieldCheck, Sigma } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/AppLayout';
import { getInitials } from '@/lib/utils';

function ExploreDetailContent({ articleId }: { articleId: string }) {
  const article = animalContributors.find(c => c.id === articleId) || animalContributors[0];

  const getImage = (id: string) => {
    const image = PlaceHolderImages.find((img) => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/${id}/600/400`;
  };

  const conservationStats = [
    { label: 'Nível de Ameaça', value: 'Pouco Preocupante', icon: ShieldCheck },
    { label: 'População Estimada', value: '+5 Milhões', icon: Sigma },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <div className="relative h-80">
          <Image
            src={getImage(article.mainImageId)}
            alt={article.mainImageHint}
            fill
            className="object-cover"
            data-ai-hint={article.mainImageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-6 left-4 z-10">
            <Link href="/explore" passHref>
                <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            </Link>
          </div>
          <div className="absolute top-6 right-4">
            <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="container -mt-16 z-10 relative">
          <div className="bg-card p-6 rounded-t-2xl shadow-2xl">
            <h1 className="text-2xl font-bold mb-2">{article.funFact.title}</h1>
            <Link href="/profile">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Avatar className='h-6 w-6'>
                        <AvatarFallback>{getInitials(article.name)}</AvatarFallback>
                    </Avatar>
                    <span>Por {article.name}</span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </Link>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-secondary mb-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="album">Álbum</TabsTrigger>
                <TabsTrigger value="discussion">Discussão</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-bold text-lg mb-2 flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Habitat</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.funFact.fact.split('. ')[0]}. Estas criaturas adaptáveis são encontradas numa variedade de ambientes, desde florestas densas e áreas suburbanas a campos abertos e montanhas.
                    </p>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg mb-2 flex items-center gap-2"><ToyBrick className="h-5 w-5 text-primary" /> Comportamento</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.funFact.fact.split('. ').slice(1).join('. ')} São animais maioritariamente noturnos e solitários, exceto durante a época de acasalamento. Comunicam através de uma variedade de vocalizações, marcas de cheiro e linguagem corporal.
                    </p>
                  </div>

                  <Card className="bg-secondary/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Estado de Conservação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        {conservationStats.map(stat => (
                          <div key={stat.label}>
                            <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                            <p className="text-sm font-semibold">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="album">
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {article.galleryImageIds.map((img) => (
                      <div key={img.id} className="relative aspect-square w-full rounded-lg overflow-hidden">
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
              <TabsContent value="discussion">
                <p className="text-muted-foreground">A secção de discussão está a chegar em breve.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

function ExploreDetailPageWithLayout({ params }: { params: { id: string } }) {
  const resolvedParams = use(params);
  return (
    <AppLayout>
      <ExploreDetailContent articleId={resolvedParams.id} />
    </AppLayout>
  )
}

export default function ExploreDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExploreDetailPageWithLayout params={params}/>
    </Suspense>
  )
}
