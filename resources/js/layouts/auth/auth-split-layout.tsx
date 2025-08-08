import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid min-h-screen lg:grid-cols-2">
            {/* Panel izquierdo con imagen de fondo */}
            <div className="relative hidden flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                {/* Imagen de fondo */}
                <div className="absolute inset-0">
                    <img src="/storage/login.avif" alt="Construcción" className="h-full w-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-zinc-900/50" />
                </div>

                {/* Header: Logo */}
                <div className="relative z-10">
                    <Link href={route('login')} className="flex items-center text-lg font-medium">
                        <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                        {name}
                    </Link>
                </div>

                {/* Footer: Cita */}
                {quote && (
                    <div className="relative z-10 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>

            {/* Panel derecho: formulario */}
            <div className="flex w-full items-center justify-center p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('login')} className="flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>

                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
