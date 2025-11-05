
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Upload, AlertTriangle, Square, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface AudioCaptureProps {
  onAudioCapture: (blob: Blob | null) => void;
}

export default function AudioCapture({ onAudioCapture }: AudioCaptureProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const resetState = useCallback(() => {
    setAudioURL('');
    onAudioCapture(null);
  }, [onAudioCapture]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    resetState();
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
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onAudioCapture(blob);
      };

      mediaRecorder.start();

    } catch (err) {
      console.error('Error starting recording:', err);
      setHasPermission(false);
      toast({
        variant: 'destructive',
        title: 'Acesso ao microfone negado',
        description: 'Por favor, ative as permissões do microfone nas definições do seu navegador.',
      });
    }
  }, [toast, onAudioCapture, resetState]);

   useEffect(() => {
    // Check permission on mount silently
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        // Important: stop the tracks immediately after checking permission
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        setHasPermission(false);
      }
    };
    checkPermission();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      resetState();
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      onAudioCapture(file);
    }
  };
  
  if (hasPermission === false) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Acesso ao microfone necessário</AlertTitle>
        <AlertDescription>
          Ative as permissões nas definições do seu navegador para gravar.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {!audioURL ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="button" onClick={isRecording ? stopRecording : startRecording} className="flex-1" size="lg">
            {isRecording ? <Square className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
            {isRecording ? 'Parar Gravação' : 'Gravar Áudio'}
          </Button>
          <Button asChild variant="outline" className="flex-1" size="lg">
            <label htmlFor="audio-upload-species" className="w-full cursor-pointer flex items-center justify-center">
              <Upload className="mr-2 h-5 w-5" />
              Carregar Ficheiro
            </label>
          </Button>
          <input id="audio-upload-species" type="file" accept="audio/*" className="sr-only" onChange={handleFileUpload} />
        </div>
      ) : (
        <div className="space-y-2">
            <audio controls src={audioURL} className="w-full" />
            <Button type="button" variant="outline" onClick={resetState} className="w-full">
                Remover Áudio
            </Button>
        </div>
      )}
    </div>
  );
}
