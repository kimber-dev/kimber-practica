import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
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
    telefono: string;
};

export default function Index() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nombre: '',
        apellidos: '',
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
            <Head title="Clientes" />
            <div className="flex justify-end">
                <Link
                    className="m-2 inline-flex items-center rounded-2xl border bg-gradient-to-b from-red-600 to-violet-800 px-3 py-1 text-sm text-white"
                    href={route('clientes.create')}
                >
                    Nuevo
                </Link>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
