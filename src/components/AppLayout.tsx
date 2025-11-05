
'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, Home, LogOut, Mic, User, Map, Sun, Moon, Bell, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import { getInitials } from '@/lib/utils';
import { signOut } from 'firebase/auth';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useUser();
  const auth = useAuth();
  
  const isAdmin = user?.email === 'adminbio@biolingo.com';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const menuItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/explore', icon: Compass, label: 'Explorar' },
    { href: '/travel', icon: Map, label: 'Viagem' },
    { href: '/profile', icon: User, label: 'Perfil' },
    ...(isAdmin ? [{ href: '/admin', icon: Shield, label: 'Admin' }] : []),
  ];

  const settingsMenuContent = (
    <>
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
            <Label htmlFor="theme-switch" className="flex items-center gap-2 font-normal cursor-pointer">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>Modo {theme === 'dark' ? 'Noturno' : 'Claro'}</span>
            </Label>
            <Switch
                id="theme-switch"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Mudar tema"
            />
            </div>
        </DropdownMenuItem>
    </>
  )

  const notificationMenuContent = (
    <>
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <div className="text-center text-muted-foreground p-4 text-sm">
                Ainda não há notificações.
            </div>
        </DropdownMenuItem>
    </>
  )

  const renderThemeIcon = () => {
    if (!mounted) {
        return <div className="h-5 w-5" />; // Placeholder or null
    }
    return theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
  }

  if (isMobile) {
    return (
      <div className="pb-20 pt-16">
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
             <Link href="/" className="flex items-center gap-2">
                <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/kudiapp-9b6c9.firebasestorage.app/o/Foto%20default-alimento%2FBiolingo-removebg-preview.png?alt=media&token=f52022e0-49e0-424e-9b43-e8ac9fe1c1db" 
                    alt="BioLingo Logo" 
                    width={80} 
                    height={20} 
                    className='object-contain'
                />
            </Link>
            <div className='flex items-center gap-1'>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  {notificationMenuContent}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {renderThemeIcon()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {settingsMenuContent}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user ? getInitials(user.displayName || user.email || '') : ''}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {user ? (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.displayName || user.email}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem asChild>
                          <Link href="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Perfil</span>
                          </Link>
                       </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                       <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Entrar</span>
                       </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">{children}</main>
        <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border/50">
          <nav className="container flex justify-around h-20 items-center">
            {menuItems.slice(0,2).map(item => (
                 <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  } hover:text-primary`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className={`text-xs mt-1 ${pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                </Link>
            ))}
            <Link href={{ pathname: '/', query: { action: 'record' } }} className="-mt-12 z-10">
              <div className="bg-primary text-primary-foreground h-20 w-20 flex flex-col items-center justify-center rounded-full shadow-lg ring-4 ring-background shadow-primary/30">
                <Mic className="h-8 w-8" />
              </div>
            </Link>
            {menuItems.slice(2).map(item => (
                 <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'
                  } hover:text-primary`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className={`text-xs mt-1 ${pathname.startsWith(item.href) ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                </Link>
            ))}
          </nav>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-6 text-sm">
             <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                BioLingo
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? 'text-foreground font-semibold'
                    : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                   {notificationMenuContent}
                </DropdownMenuContent>
              </DropdownMenu>

             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {renderThemeIcon()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                   {settingsMenuContent}
                </DropdownMenuContent>
              </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full p-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user ? getInitials(user.displayName || user.email || '') : ''}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {user ? (
                    <>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {user.displayName || user.email}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/profile">
                            <User className="mr-2 h-4 w-4" />
                            <span>Perfil</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sair</span>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem asChild>
                       <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Entrar</span>
                       </Link>
                    </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
