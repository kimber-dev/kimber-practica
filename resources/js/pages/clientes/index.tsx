import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

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

export default function Index({ clientes }) {
    console.log(clientes);
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

            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombres
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Apellidos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefono
                            </th>
                            <th scope="col text-left" className="px-6 py-3">
                                Accion
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente: any, key: number) => (
                            <tr key={key} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    {cliente.nombre}
                                </th>
                                <td className="px-6 py-4">{cliente.apellido}</td>
                                <td className="px-6 py-4">{cliente.email}</td>
                                <td className="px-6 py-4">{cliente.telefono}</td>
                                <td>
                                    <button onClick={() => handleDelete(cliente.id)} className="rounded bg-red-500 px-2 py-1 text-white">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
function handleDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
        router.delete(route('clientes.destroy', id));
    }
}
