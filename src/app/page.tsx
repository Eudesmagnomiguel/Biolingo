
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { animalContributors } from '@/lib/animal-data';
import { scienceArticles } from '@/lib/science-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Compass, BookOpen, Leaf, Flame, Wind, Droplets, MessageSquare, Send, Bot } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AudioRecorder from '@/components/AudioRecorder';
import { getInitials } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { chat } from '@/ai/flows/chat-flow';

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
};

function BioLingoHomeContent() {
  const { user, loading } = useUser();
  const router = useRouter();

  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
  };
  
  const articles = animalContributors.slice(0, 2);
  const recommendedArticles = animalContributors.slice(1);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Olá! Como posso ajudar a explorar o mundo natural hoje?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const environmentEcosystems = [
    {
      name: 'Kissama',
      imageId: 'kissama-park',
      imageHint: 'angola savanna',
    },
    {
      name: 'Tundavala',
      imageId: 'tundavala-fissure',
      imageHint: 'angola landscape',
    },
    {
      name: 'Cangandala',
      imageId: 'cangandala-park',
      imageHint: 'angola forest',
    },
  ];

  const [ecosystemStats, setEcosystemStats] = useState([
    { label: 'Poluição do Ar', value: '...', icon: Wind, color: 'text-muted-foreground' },
    { label: 'Risco de Incêndio', value: '...', icon: Flame, color: 'text-muted-foreground' },
    { label: 'Qualidade da Água', value: '...', icon: Droplets, color: 'text-muted-foreground' },
  ]);

  useEffect(() => {
    const airPollutionOptions = [
      { value: 'Baixa', color: 'text-green-400' },
      { value: 'Moderada', color: 'text-yellow-400' },
      { value: 'Alta', color: 'text-red-500' },
    ];
    const fireRiskOptions = [
      { value: 'Baixo', color: 'text-green-400' },
      { value: 'Moderado', color: 'text-orange-400' },
      { value: 'Alto', color: 'text-red-500' },
    ];
    const waterQualityOptions = [
      { value: 'Boa', color: 'text-blue-400' },
      { value: 'Razoável', color: 'text-yellow-400' },
      { value: 'Fraca', color: 'text-red-500' },
      { value: 'Excelente', color: 'text-blue-500' },
    ];

    const getRandomOption = (options: any[]) => options[Math.floor(Math.random() * options.length)];

    setEcosystemStats([
      { ...ecosystemStats[0], ...getRandomOption(airPollutionOptions) },
      { ...ecosystemStats[1], ...getRandomOption(fireRiskOptions) },
      { ...ecosystemStats[2], ...getRandomOption(waterQualityOptions) },
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMessage: ChatMessage = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setChatInput('');
    setIsChatting(true);

    try {
      const response = await chat({ message: chatInput });
      const newAiMessage: ChatMessage = { sender: 'ai', text: response.message };
      setChatMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error in chat flow:', error);
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Ocorreu um erro. Por favor, tente novamente.' };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatting(false);
    }
  };


  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        <div className="py-6">
           <section className="text-left my-8">
            <div className='flex items-center justify-between mb-2'>
                {loading ? (
                  <Skeleton className="h-10 w-1/3" />
                ) : (
                  <h1 className="text-4xl font-bold">Olá, {user?.displayName || 'Explorador'}</h1>
                )}
                <div className='hidden md:block'>
                  <Image 
                      src="https://firebasestorage.googleapis.com/v0/b/kudiapp-9b6c9.firebasestorage.app/o/Foto%20default-alimento%2FBiolingo-removebg-preview.png?alt=media&token=f52022e0-49e0-424e-9b43-e8ac9fe1c1db" 
                      alt="BioLingo Logo" 
                      width={120} 
                      height={30} 
                      className='object-contain'
                  />
                </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Explore os sons da natureza.
            </p>
          </section>

          <section className="mb-8">
            <AudioRecorder />
          </section>

          <section className="mb-8">
            <Carousel opts={{ loop: true }} plugins={[
                require('embla-carousel-autoplay')({ delay: 5000, stopOnInteraction: true }),
              ]}>
              <CarouselContent>
                {articles.map((article) => (
                  <CarouselItem key={article.id}>
                    <Link href={`/explore/${article.id}`}>
                      <div className="relative h-48 rounded-2xl overflow-hidden">
                        <Image
                          src={getImage(article.mainImageId)}
                          alt={article.mainImageHint}
                          fill
                          className="object-cover"
                          data-ai-hint={article.mainImageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">ANIMAIS</Badge>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>

          <section className="mb-8">
            <Tabs defaultValue="animals" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-secondary">
                <TabsTrigger value="chat">BioChat</TabsTrigger>
                <TabsTrigger value="science">Ciência</TabsTrigger>
                <TabsTrigger value="environment">Ambiente</TabsTrigger>
                <TabsTrigger value="animals">Animais</TabsTrigger>
                <TabsTrigger value="travel">Viagem</TabsTrigger>
              </TabsList>
               <TabsContent value="chat" className="pt-4">
                <Card className="bg-secondary border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="text-primary"/>
                      BioChat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex-grow p-4 space-y-4 bg-background/50 rounded-lg min-h-48 max-h-72 overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                          {msg.sender === 'ai' && (
                            <Avatar className="h-8 w-8">
                               <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                             <p className="text-sm">{msg.text}</p>
                          </div>
                          {msg.sender === 'user' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user ? getInitials(user.displayName || '') : 'U'}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                       {isChatting && (
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot /></AvatarFallback>
                          </Avatar>
                          <div className="bg-background p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                        <Input 
                          placeholder="Escreva a sua pergunta..." 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={isChatting}
                        />
                        <Button type="submit" disabled={isChatting || !chatInput.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="science" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {scienceArticles.map(article => (
                      <Link key={article.id} href={`/science/${article.id}`}>
                        <Card className="bg-secondary border-0 rounded-2xl">
                          <CardContent className="p-3">
                            <div className="flex gap-3">
                              <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                                <Image src={getImage(article.imageId)} alt={article.imageHint} fill className="object-cover" data-ai-hint={article.imageHint}/>
                              </div>
                              <div className="flex-1 space-y-2">
                                <p className="font-semibold text-sm leading-tight">{article.title}</p>
                                <p className="text-xs text-muted-foreground">{article.summary.substring(0,50)}...</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <BookOpen className="w-3 h-3" />
                                  <span>Ler artigo</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
              </TabsContent>
              <TabsContent value="environment" className="pt-4">
                <Carousel opts={{ loop: true }} plugins={[
                    require('embla-carousel-autoplay')({ delay: 5000, stopOnInteraction: true }),
                  ]}>
                  <CarouselContent>
                    {environmentEcosystems.map((eco) => (
                      <CarouselItem key={eco.name}>
                        <Card className="bg-secondary border-0 relative overflow-hidden rounded-2xl">
                           <div className='absolute inset-0'>
                            <Image
                              src={getImage(eco.imageId)}
                              alt={eco.imageHint}
                              fill
                              className="object-cover opacity-20"
                              data-ai-hint={eco.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          </div>
                          <div className="relative z-10 p-6">
                            <CardHeader className="p-0 mb-4">
                              <CardTitle className="flex items-center gap-2 text-foreground">
                                <Leaf className="text-primary"/> Estado do Ecossistema: {eco.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {ecosystemStats.map(stat => (
                                <Card key={stat.label} className="bg-background/50">
                                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <stat.icon className={`h-8 w-8 mb-2 ${stat.color}`} />
                                    <p className="text-xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                  </CardContent>
                                </Card>
                              ))}
                            </CardContent>
                          </div>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </TabsContent>
              <TabsContent value="animals" className="pt-4">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Artigos Recomendados</h2>
                    <Link href="/explore" className="text-sm text-primary font-semibold">Mostrar Tudo</Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {recommendedArticles.map(article => (
                      <Link key={article.id} href={`/explore/${article.id}`}>
                        <Card className="bg-secondary border-0 rounded-2xl">
                          <CardContent className="p-3">
                            <div className="flex gap-3">
                              <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                                <Image src={getImage(article.mainImageId)} alt={article.mainImageHint} fill className="object-cover" data-ai-hint={article.mainImageHint}/>
                              </div>
                              <div className="flex-1 space-y-2">
                                <p className="font-semibold text-sm leading-tight">{article.funFact.title}</p>
                                <p className="text-xs text-muted-foreground">{article.funFact.fact.substring(0,50)}...</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Compass className="w-3 h-3" />
                                  <span>Ler</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
              </TabsContent>
               <TabsContent value="travel" className="pt-4">
                <Card className="bg-secondary border-0">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Veja os <Link href="/travel" className='text-primary underline'>Diários de Viagem</Link> da comunidade.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
          
        </div>
      </main>
    </div>
  );
}


export default function BioLingoHome() {
  return (
    <AppLayout>
      <BioLingoHomeContent />
    </AppLayout>
  );
}

    