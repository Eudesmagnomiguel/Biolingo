
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { useUser, useFirestore } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { collection, query, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UserProfile } from '@/lib/user-profile-data';
import type { Observation } from '@/lib/observations-data';
import UserForm from '@/components/UserForm';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const chartData = [
  { month: 'Jan', users: 12, observations: 30 },
  { month: 'Fev', users: 19, observations: 45 },
  { month: 'Mar', users: 25, observations: 60 },
  { month: 'Abr', users: 32, observations: 75 },
  { month: 'Mai', users: 45, observations: 90 },
];

function UserManagement({ users, loading, onUserUpdate }: { users: (UserProfile & { id: string })[] | undefined, loading: boolean, onUserUpdate: () => void }) {
  const [selectedUser, setSelectedUser] = useState<UserProfile & { id: string } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleEdit = (user: UserProfile & { id: string }) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  }

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    onUserUpdate();
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gestão de Utilizadores</CardTitle>
            <CardDescription>Gerir todos os utilizadores registados na plataforma.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>Adicionar Utilizador</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedUser ? 'Editar Utilizador' : 'Adicionar Novo Utilizador'}</DialogTitle>
            </DialogHeader>
            <UserForm user={selectedUser} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
        {loading ? <Skeleton className="h-60 w-full" /> :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map(user => (
                <TableRow key={user.uid}>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>Gerir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </CardContent>
    </Card>
  );
}

function ContentModeration({ observations, loading }: { observations: Observation[] | undefined, loading: boolean }) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleReview = async (observationId: string, status: 'approved' | 'rejected') => {
    if (!firestore || !observationId) return;
    try {
      if (status === 'rejected') {
        await deleteDoc(doc(firestore, 'observations', observationId));
         toast({ title: 'Observação Rejeitada', description: 'A observação foi removida.' });
      } else {
        await setDoc(doc(firestore, 'observations', observationId), { status: 'approved' }, { merge: true });
        toast({ title: 'Observação Aprovada', description: 'A observação está agora visível publicamente.' });
      }
    } catch(e) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Ocorreu um erro ao moderar a observação.' });
    }
  }

  if (loading) {
    return <Skeleton className="h-60 w-full" />
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderação de Conteúdo</CardTitle>
        <CardDescription>Rever e aprovar as observações submetidas pelos utilizadores.</CardDescription>
      </CardHeader>
      <CardContent>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Espécie</TableHead>
              <TableHead>Utilizador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {observations?.map((obs, i) => (
              <TableRow key={obs.id || i}>
                <TableCell>{obs.commonName}</TableCell>
                <TableCell>{obs.userId.substring(0,8)}...</TableCell>
                <TableCell>{new Date(obs.observationDate).toLocaleDateString()}</TableCell>
                <TableCell><Badge variant={(obs as any).status === 'approved' ? 'default' : 'secondary'}>{(obs as any).status === 'approved' ? 'Aprovado': 'Pendente'}</Badge></TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">Rever</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Rever Observação</AlertDialogTitle>
                        <AlertDialogDescription>
                          <p><strong>Espécie:</strong> {obs.commonName} ({obs.scientificName})</p>
                          <p><strong>Local:</strong> {obs.location}</p>
                          <p><strong>Notas:</strong> {obs.notes || 'N/A'}</p>
                          <p>Aprovar ou rejeitar esta submissão?</p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleReview(obs.id!, 'rejected')} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Rejeitar</AlertDialogAction>
                        <AlertDialogAction onClick={() => handleReview(obs.id!, 'approved')}>Aprovar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function UsageStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas de Utilização</CardTitle>
        <CardDescription>Visualizar o crescimento e atividade na plataforma.</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className='text-lg font-semibold mb-4'>Novos Utilizadores e Observações</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Legend />
              <Bar dataKey="users" fill="hsl(var(--primary))" name="Utilizadores" />
              <Bar dataKey="observations" fill="hsl(var(--secondary-foreground))" name="Observações" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


function AdminContent() {
  const { user, loading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  
  const [usersSnapshot, usersLoading, usersError, reloadUsers] = useCollection(
    firestore ? query(collection(firestore, 'users')) : null
  );
  const users = usersSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile & { id: string }));

  const [observationsSnapshot, observationsLoading, observationsError] = useCollection(
    firestore ? query(collection(firestore, 'observations')) : null
  );
  const observations = observationsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Observation));

  useEffect(() => {
    if (!loading && user?.email !== 'adminbio@biolingo.com') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== 'adminbio@biolingo.com') {
    return (
      <div className="py-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-6 w-1/2" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <section className="text-left my-8">
        <h1 className="text-4xl font-bold mb-2">Painel de Administração</h1>
        <p className="text-muted-foreground text-lg">
          Bem-vindo à área de administração do BioLingo.
        </p>
      </section>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Gestão de Utilizadores</TabsTrigger>
          <TabsTrigger value="content">Moderação de Conteúdo</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement users={users} loading={usersLoading} onUserUpdate={() => {
            if(usersSnapshot?.ref) {
                // This is a bit of a hack to force a reload
                // In a real app, you might want a more sophisticated state management
                (usersSnapshot.ref.firestore.app as any)._setSettings({host: usersSnapshot.ref.firestore.app.options.settings.host});
            }
          }} />
        </TabsContent>
        <TabsContent value="content">
          <ContentModeration observations={observations} loading={observationsLoading} />
        </TabsContent>
        <TabsContent value="stats">
          <UsageStatistics />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AppLayout>
      <AdminContent />
    </AppLayout>
  );
}
