
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import type { UserProfile } from "@/lib/user-profile-data";
import { useState } from "react";

const formSchema = z.object({
  displayName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Por favor, insira um email válido."),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
    user: (UserProfile & { id: string }) | null;
    onSuccess: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: user?.displayName || '',
            email: user?.email || '',
            location: user?.location || '',
            phoneNumber: user?.phoneNumber || '',
        },
    });

    async function onSubmit(data: UserFormValues) {
        if (!firestore) return;
        setIsLoading(true);

        const usersCollection = collection(firestore, 'users');
        const userId = user?.id || doc(usersCollection).id;
        const userRef = doc(usersCollection, userId);

        const userData: Partial<UserProfile> = {
            displayName: data.displayName,
            email: data.email,
            location: data.location,
            phoneNumber: data.phoneNumber,
        };

        if (!user) { // Creating a new user, need UID
            (userData as UserProfile).uid = userId;
        }

        try {
            await setDoc(userRef, userData, { merge: true });
            toast({
                title: user ? 'Utilizador Atualizado' : 'Utilizador Criado',
                description: `Os dados de ${data.displayName} foram guardados.`,
            });
            onSuccess();
        } catch (error) {
            console.error("Error saving user:", error);
            toast({
                variant: 'destructive',
                title: 'Erro',
                description: 'Não foi possível guardar os dados do utilizador.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do utilizador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@exemplo.com" {...field} disabled={!!user} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Localização</FormLabel>
                            <FormControl>
                                <Input placeholder="Luanda, Angola" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nº de Telefone</FormLabel>
                            <FormControl>
                                <Input placeholder="+244..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>{isLoading ? "A guardar..." : "Guardar"}</Button>
            </form>
        </Form>
    );
}
