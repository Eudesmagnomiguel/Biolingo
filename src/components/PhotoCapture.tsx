
'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, RefreshCcw, Wand2, Camera, CircleDotDashed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface PhotoCaptureProps {
  onImageCapture?: (imageDataUri: string | null) => void;
  onAnalyze?: (imageDataUri: string) => void;
  isAnalyzing?: boolean;
}

export default function PhotoCapture({ onImageCapture, onAnalyze, isAnalyzing }: PhotoCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (showCamera) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Acesso à câmara negado',
            description: 'Por favor, ative as permissões da câmara nas definições do seu navegador.',
          });
          setShowCamera(false);
        }
      };

      getCameraPermission();

      return () => {
        // Stop camera stream when component unmounts or camera is closed
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [showCamera, toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setCapturedImage(dataUrl);
        if (onImageCapture) onImageCapture(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        if (onImageCapture) onImageCapture(dataUrl);
      }
      setShowCamera(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    if (onImageCapture) onImageCapture(null);
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  const handleAnalyzeClick = () => {
    if (capturedImage && onAnalyze) {
      onAnalyze(capturedImage);
    }
  };
  
  if (showCamera) {
    return (
        <div className="space-y-4">
            <div className="relative w-full aspect-video bg-secondary rounded-md overflow-hidden flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            </div>
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Acesso à Câmara Necessário</AlertTitle>
                    <AlertDescription>
                        Por favor, permita o acesso à câmara para usar esta funcionalidade.
                    </AlertDescription>
                </Alert>
            )}
             <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleCapture} className="flex-1" size="lg" type="button" disabled={!hasCameraPermission}>
                    <CircleDotDashed className="mr-2 h-5 w-5" />
                    Capturar Foto
                </Button>
                <Button onClick={() => setShowCamera(false)} variant="outline" className="flex-1" type="button">
                    Cancelar
                </Button>
            </div>
        </div>
    );
  }


  return (
    <div className="space-y-4">
      {capturedImage && (
        <div className="relative w-full aspect-video bg-secondary rounded-md overflow-hidden flex items-center justify-center">
          <Image src={capturedImage} alt="Fotografia para carregar" layout="fill" objectFit="contain" />
        </div>
      )}

      {!capturedImage ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="flex-1" size="lg" type="button">
            <label htmlFor="image-upload" className='w-full cursor-pointer flex items-center justify-center'>
              <Upload className="mr-2 h-5 w-5" />
              Carregar Imagem
            </label>
          </Button>
          <input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileUpload} />
          
          <Button variant="outline" className="flex-1" size="lg" type="button" onClick={() => setShowCamera(true)}>
             <Camera className="mr-2 h-5 w-5" />
             Tirar Foto
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {onAnalyze && (
              <Button onClick={handleAnalyzeClick} disabled={isAnalyzing} className="flex-1" type="button">
                <Wand2 className="mr-2 h-4 w-4" />
                {isAnalyzing ? 'A analisar...' : 'Analisar Imagem'}
              </Button>
            )}
            <Button onClick={resetCapture} variant="outline" className="flex-1" type="button">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Remover Imagem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
