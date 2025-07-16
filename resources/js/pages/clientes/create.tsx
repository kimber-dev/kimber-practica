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
        title: 'Crear cliente',
        href: '/clientes/create',
    },
];
type RegisterForm = {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
};

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
    });
    const submit: FormEventHandler = (e) => {
        console.log(e);
        e.preventDefault();
        post(route('clientes.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Cliente" />
            <div className="flex justify-end">
                <a
                    className="m-2 inline-flex items-center rounded-2xl border bg-gradient-to-b from-red-600 to-violet-800 px-3 py-1 text-sm text-white"
                    href={route('clientes.index')}
                >
                    Listar
                </a>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombres</Label>
                            <Input
                                id="nombre"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="nombre"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                disabled={processing}
                                placeholder="Nombre del cliente"
                            />
                            <InputError message={errors.nombre} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="apellido">Apellidos</Label>
                            <Input
                                id="apellido"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="apellido"
                                value={data.apellido}
                                onChange={(e) => setData('apellido', e.target.value)}
                                disabled={processing}
                                placeholder="Apellidos completo"
                            />
                            <InputError message={errors.apellido} />
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
                        <div className="grid gap-2">
                            <Label htmlFor="telefono">Telefono </Label>
                            <Input
                                id="telefono"
                                type="number"
                                required
                                tabIndex={2}
                                autoComplete="telefono"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                                disabled={processing}
                                placeholder="Numero de telefono"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Registrar cliente
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
