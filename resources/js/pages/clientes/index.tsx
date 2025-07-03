import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clientes',
    },
];
type RegisterForm = {
    nombre: string;
    apellidos: string;
    email: string;
};

export default function Index() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nombre: '',
        apellidos: '',
        email: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // post(route('register'), {
        //     onFinish: () => reset('password', 'password_confirmation'),
        // });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombres</Label>
                            <Input
                                id="nombre"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.nombre} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="apellidos">Apellidos</Label>
                            <Input
                                id="apellidos"
                                type="apellidos"
                                required
                                tabIndex={2}
                                autoComplete="apellidos"
                                value={data.apellidos}
                                onChange={(e) => setData('apellidos', e.target.value)}
                                disabled={processing}
                                placeholder="Apellidos completo"
                            />
                            <InputError message={errors.apellidos} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
