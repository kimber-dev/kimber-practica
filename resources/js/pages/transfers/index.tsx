import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tranferencias',
        href: '/Transfers',
    },
];
type RegisterForm = {
    remitente: string;
    destinatario: string;
    fecha: string;
    agente: string;
    monto: string;
    estado: string;
    observacion: string;
    foto: string;
};

export default function Index({ transfers }: { transfers: any }) {
    console.log(transfers);
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
                                Remitente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Destinatario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Agente
                            </th>
                            <th scope="col text-left" className="px-6 py-3">
                                Monto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Observación
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Accion
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transfers.map((transfers: any, key: number) => (
                            <tr key={key} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    {transfers.remitente}
                                </th>
                                <td className="px-6 py-4">{transfers.destinatario}</td>
                                <td className="px-6 py-4">{transfers.fecha}</td>
                                <td className="px-6 py-4">{transfers.agente}</td>
                                <td className="px-6 py-4">{transfers.monto}</td>
                                <td className="px-6 py-4">{transfers.estado}</td>
                                <td className="px-6 py-4">{transfers.observacion}</td>
                                {/* <td className="px-6 py-4">{transfers.foto}</td> */}

                                <td>
                                    <button onClick={() => handleDelete(transfers.id)} className="rounded bg-red-500 px-2 py-1 text-white">
                                        Eliminar
                                    </button>
                                    <button onClick={() => handleDelete(transfers.id)} className="rounded bg-blue-500 px-2 py-1 text-white">
                                        Editar
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
    if (confirm('¿Estás seguro de eliminar esta tranferencia?')) {
        router.delete(route('transfers.destroy', id));
    }
}
