
'use client';

import { Suspense, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronLeft, Calendar, User, BookOpen } from 'lucide-react';
import { scienceArticles } from '@/lib/science-data';
import AppLayout from '@/components/AppLayout';

function ScienceDetailContent({ articleId }: { articleId: string }) {
  const article = scienceArticles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
        <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
        <p className="text-muted-foreground mt-2">O artigo que procura não existe ou foi removido.</p>
        <Link href="/" passHref>
          <Button variant="outline" className="mt-4">Voltar à Página Principal</Button>
        </Link>
      </div>
    );
  }

  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <div className="relative h-80">
          <Image
            src={getImage(article.imageId)}
            alt={article.imageHint}
            fill
            className="object-cover"
            data-ai-hint={article.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-6 left-4 z-10">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-sm rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="container -mt-24 z-10 relative">
          <div className="bg-card p-6 rounded-t-2xl shadow-2xl">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-3xl font-bold mb-4">{article.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className='flex items-center gap-2'><User className='h-4 w-4'/>{article.author}</div>
                    <div className='flex items-center gap-2'><BookOpen className='h-4 w-4'/><i>{article.journal}</i></div>
                    <div className='flex items-center gap-2'><Calendar className='h-4 w-4'/>{article.year}</div>
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0 mt-6">
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    <p>{article.summary}</p>
                </div>
            </CardContent>
          </div>
        </div>
      </main>
    </div>
  );
}

function ScienceDetailPageWithLayout({ params }: { params: { id: string } }) {
    const resolvedParams = use(params);
    return (
      <AppLayout>
        <ScienceDetailContent articleId={resolvedParams.id} />
      </AppLayout>
    )
}

export default function ScienceDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>A carregar...</div>}>
      <ScienceDetailPageWithLayout params={params}/>
    </Suspense>
  )
}
