
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mic, Upload, AlertTriangle, Wand2, Camera, Save, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Progress } from "@/components/ui/progress";
import PhotoCapture from './PhotoCapture';
import { analyzeAudio } from '@/ai/flows/analyze-audio-flow';
import type { AnalyzeAudioOutput } from '@/ai/schemas/analyze-audio';
import { analyzeImage } from '@/ai/flows/analyze-image-flow';
import type { AnalyzeImageOutput } from '@/ai/schemas/analyze-image';
import AnalysisResult from './AnalysisResult';
import AnalysisHistory from './AnalysisHistory';
import INaturalistResult from './iNaturalistResult';
import Link from 'next/link';

type AnalysisResultType = AnalyzeAudioOutput | AnalyzeImageOutput;

function isImageAnalysis(result: AnalysisResultType): result is AnalyzeImageOutput {
    return 'scientific_name' in result;
}

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<AnalysisResultType[]>([]);
  const [activeTab, setActiveTab] = useState('audio');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const handleAnalyzeAudio = useCallback(async (blob: Blob) => {
    if (!blob) {
        toast({
          variant: 'destructive',
          title: 'Nenhum áudio para analisar',
          description: 'Por favor, grave ou carregue um ficheiro de áudio primeiro.',
        });
        return;
    };
    
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const result = await analyzeAudio({ audioDataUri: base64Audio });
        setAnalysisResult(result);
      };
    } catch (error) {
        console.error('Error analyzing audio:', error);
        toast({
            variant: 'destructive',
            title: 'Erro na Análise',
            description: 'Não foi possível analisar o áudio. Tente novamente.',
        });
    } finally {
        setIsAnalyzing(false);
    }
  }, [toast]);
  
  const handleAnalyzeImage = useCallback(async (dataUri: string) => {
    if (!dataUri) {
        toast({
            variant: 'destructive',
            title: 'Nenhuma imagem para analisar',
            description: 'Por favor, carregue uma imagem primeiro.',
        });
        return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
        const result = await analyzeImage({ imageDataUri: dataUri });
        setAnalysisResult(result);
    } catch (error) {
        console.error('Error analyzing image:', error);
        toast({
            variant: 'destructive',
            title: 'Erro na Análise',
            description: 'Não foi possível identificar a espécie. Tente outra imagem.',
        });
    } finally {
        setIsAnalyzing(false);
    }
}, [toast]);

  const resetState = (tab: 'audio' | 'photo') => {
    if (tab === 'audio') {
        setAudioURL('');
        setAudioBlob(null);
    } else {
        setImageDataUri(null);
    }
    setAnalysisResult(null);
  };
  
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
       mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
     if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
    }
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    resetState('audio');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      setIsRecording(true);

      toast({
        title: 'A gravar...',
        description: 'O microfone está a captar o som ambiente.',
        icon: <Mic className="h-5 w-5 text-primary" />,
      });
      
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioURL(url);
        handleAnalyzeAudio(blob);
      };

      mediaRecorder.start();

      recordingTimeoutRef.current = setTimeout(() => {
          stopRecording();
      }, 30000);

    } catch (err) {
      console.error('Error starting recording:', err);
      setHasPermission(false);
      toast({
        variant: 'destructive',
        title: 'Acesso ao microfone negado',
        description: 'Por favor, ative as permissões do microfone nas definições do seu navegador.',
      });
    }
  }, [toast, handleAnalyzeAudio, stopRecording]);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error('Error checking microphone permission:', err);
        setHasPermission(false);
      }
    };
    checkPermission();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'record') {
        startRecording();
    }
  // The startRecording function is memoized, but its dependencies might change. 
  // To ensure the effect always has the latest version, we disable the exhaustive-deps rule.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      resetState('audio');
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      setAudioBlob(file);
    }
  };

  const handleSaveAnalysis = () => {
    if (analysisResult) {
      setSavedAnalyses(prev => [analysisResult, ...prev]);
      toast({
        title: 'Análise guardada!',
        description: 'A sua análise foi adicionada ao histórico.',
      });
    }
  };
  

  if (hasPermission === false) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Acesso ao microfone necessário</AlertTitle>
        <AlertDescription>
          O BioLingo precisa de acesso ao seu microfone para gravar sons. Por favor, ative as permissões nas definições do seu navegador.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (hasPermission === null) {
    return (
        <Card className="bg-secondary border-0">
            <CardContent className="p-6 flex items-center justify-center">
                <p>A verificar permissões do microfone...</p>
            </CardContent>
        </Card>
    )
  }

  const currentResult = analysisResult;

  return (
    <>
      <Card className="bg-secondary border-0">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Contribuir para a Ciência</CardTitle>
              <CardDescription>
                Grave um som ou tire uma foto para identificar uma espécie.
              </CardDescription>
            </div>
            <Link href="/species/new" passHref>
                <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Espécie
                </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
             <div className="flex space-x-2 mb-4">
                <Button 
                    variant={activeTab === 'audio' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setActiveTab('audio')}
                >
                    <Mic className="mr-2 h-4 w-4"/> Gravar Som
                </Button>
                <Button 
                    variant={activeTab === 'photo' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('photo')}
                    className="flex-1"
                >
                    <Camera className="mr-2 h-4 w-4"/> Análise de Foto
                </Button>
            </div>
            
            {activeTab === 'audio' && (
               <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button onClick={isRecording ? stopRecording : startRecording} className="flex-1" size="lg">
                    {isRecording ? <div className='flex items-center'><div className="w-2 h-2 mr-2 rounded-full bg-red-500 animate-pulse"></div>A gravar...</div> : <><Mic className="mr-2 h-5 w-5" />Gravar Áudio</>}
                  </Button>
                  <Button asChild variant="outline" className="flex-1" size="lg">
                      <label htmlFor="audio-upload" className="w-full cursor-pointer flex items-center justify-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Carregar Ficheiro
                      </label>
                  </Button>
                   <input id="audio-upload" type="file" accept="audio/*" className="sr-only" onChange={handleFileUpload} />
                  </div>
                  
                  {audioURL && (
                    <div className="space-y-4 pt-4">
                        <audio controls src={audioURL} className="w-full"></audio>
                    </div>
                  )}

                  {audioBlob && !isAnalyzing && !currentResult && (
                  <Button onClick={() => handleAnalyzeAudio(audioBlob)} disabled={isAnalyzing || !audioBlob} className="w-full mt-4">
                      <Wand2 className="mr-2 h-4 w-4" />
                      {isAnalyzing ? 'A analisar...' : 'Analisar Gravação'}
                  </Button>
                  )}
               </div>
            )}
            
            {activeTab === 'photo' && (
              <PhotoCapture onImageCapture={setImageDataUri} onAnalyze={handleAnalyzeImage} isAnalyzing={isAnalyzing}/>
            )}

            {isAnalyzing && <Progress value={undefined} className="w-full mt-4" />}

            {currentResult && (
                <div className="space-y-4 mt-4">
                    {isImageAnalysis(currentResult) ? (
                        <INaturalistResult result={currentResult} />
                    ) : (
                        <AnalysisResult result={currentResult} />
                    )}
                    <Button onClick={handleSaveAnalysis} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Análise
                    </Button>
                </div>
            )}

        </CardContent>
      </Card>

      {savedAnalyses.length > 0 && (
        <AnalysisHistory analyses={savedAnalyses} />
      )}
    </>
  );
}
