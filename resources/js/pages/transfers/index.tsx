import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { DeleteIcon, Edit, ImageOff, ImageUp, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import Swal from 'sweetalert2';
import GalleryModal from './galleryModal';
import SliderModal from './sliderModal';

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
    observacion?: string;
    cuenta: string;
    foto?: File | null;
};

export default function Index({ transfers }: { transfers: any }) {
    console.log(transfers);
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        remitente: '',
        destinatario: '',
        fecha: '',
        agente: '',
        monto: '',
        estado: 'pendiente',
        cuenta: 'Interbank', // Valor por defecto
        observacion: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (editingTransfer) {
            // Modo edición
            post(route('transfers.update', editingTransfer.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                },
            });
        } else {
            // Modo nuevo
            post(route('transfers.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                },
            });
        }
    };

    const [showModal, setShowModal] = useState(false); // controla apertura del modal
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [editingTransfer, setEditingTransfer] = useState<any | null>(null); // null = nuevo
    const handleNew = () => {
        setData({
            remitente: '',
            destinatario: '',
            fecha: '',
            agente: '',
            monto: '',
            estado: 'pendiente',
            cuenta: 'Interbank', // Valor por defecto
            observacion: '',
        });
        setEditingTransfer(null);
        setShowModal(true);
    };
    const handleEdit = (transfer: any) => {
        setData({
            remitente: transfer.remitente,
            destinatario: transfer.destinatario,
            fecha: transfer.fecha,
            agente: transfer.agente,
            monto: transfer.monto,
            estado: transfer.estado || 'pendiente',
            cuenta: transfer.cuenta, // Valor por defecto
            observacion: transfer.observacion || '',
        });
        setEditingTransfer(transfer); // Carga datos
        setShowModal(true); // Abre el modal
    };
    const [openModal, setOpenModal] = useState(false);
    const [selectedFotos, setSelectedFotos] = useState([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [transferRemitente, setTransferRemitente] = useState('');
    const [selectedTransferId, setSelectedTransferId] = useState<number | null>(null);

    const handleOpenGallery = (fotos: any, index = 0, remitente = '', id: number) => {
        setSelectedFotos(fotos);
        setInitialIndex(index);
        setTransferRemitente(remitente);
        setSelectedTransferId(id);
        setOpenModal(true);
    };
    const handleOpenFotos = (remitente: string, id: number) => {
        setTransferRemitente(remitente);
        setSelectedTransferId(id);
        setShowGalleryModal(true);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tranferencias" />
            <div className="flex justify-end">
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogTrigger asChild>
                        <DialogTrigger asChild className="m-2">
                            <Button onClick={handleNew}>Nuevo</Button>
                        </DialogTrigger>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingTransfer ? 'Editar Transferencia' : 'Nueva Transferencia'}</DialogTitle>
                            <DialogDescription>
                                {editingTransfer ? 'Modifica los campos necesarios.' : 'Complete los datos para registrar una nueva transferencia.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="remitente">Remitente</Label>
                                    <Input
                                        id="remitente"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="remitente"
                                        value={data.remitente}
                                        onChange={(e) => setData('remitente', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nombre remitente"
                                    />
                                    <InputError message={errors.remitente} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="destinatario">Destinatario</Label>
                                    <Input
                                        id="destinatario"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="destinatario"
                                        value={data.destinatario}
                                        onChange={(e) => setData('destinatario', e.target.value)}
                                        disabled={processing}
                                        placeholder="destinatarios "
                                    />
                                    <InputError message={errors.destinatario} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="fecha">fecha </Label>
                                    <Input
                                        id="fecha"
                                        type="date"
                                        required
                                        tabIndex={2}
                                        autoComplete="fecha"
                                        value={data.fecha}
                                        onChange={(e) => setData('fecha', e.target.value)}
                                        disabled={processing}
                                        placeholder="fecha de tranferencia"
                                    />
                                    <InputError message={errors.fecha} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="agente">Agente </Label>
                                    <Input
                                        id="agente"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="agente"
                                        value={data.agente}
                                        onChange={(e) => setData('agente', e.target.value)}
                                        disabled={processing}
                                        placeholder="agente tranferencia"
                                    />
                                    <InputError message={errors.agente} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="monto">Monto </Label>
                                    <Input
                                        id="monto"
                                        type="number"
                                        required
                                        tabIndex={2}
                                        autoComplete="monto"
                                        value={data.monto}
                                        onChange={(e) => setData('monto', e.target.value)}
                                        disabled={processing}
                                        placeholder="Monto tranferencia"
                                    />
                                    <InputError message={errors.monto} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="estado">Estado transferencia</Label>
                                    <Select value={data.estado} onValueChange={(value) => setData('estado', value)}>
                                        <SelectTrigger id="estado" disabled={processing}>
                                            <SelectValue placeholder="Selecciona un estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pendiente">Pendiente</SelectItem>
                                            <SelectItem value="completado">Completado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.estado} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cuenta">Cuenta destino</Label>
                                    <Select value={data.cuenta} onValueChange={(value) => setData('cuenta', value)}>
                                        <SelectTrigger id="cuenta" disabled={processing}>
                                            <SelectValue placeholder="Selecciona una cuenta" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Interbank">Cuenta de Interbank</SelectItem>
                                            <SelectItem value="BCP">BCP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.cuenta} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="observacion">Observacion </Label>
                                    <Input
                                        id="observacion"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="observacion"
                                        value={data.observacion}
                                        onChange={(e) => setData('observacion', e.target.value)}
                                        disabled={processing}
                                        placeholder="observacion tranferencia"
                                    />
                                    <InputError message={errors.observacion} />
                                </div>
                                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    {editingTransfer ? 'Actualizar transferencia' : 'Registrar transferencia'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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
                            <th scope="col" className="hidden px-6 py-3 sm:table-cell">
                                Agente
                            </th>
                            <th scope="col text-left" className="px-6 py-3">
                                Monto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cuenta
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Observación
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Imagen
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Accion
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transfers.length === 0 && (
                            <tr>
                                <td colSpan={8} className="py-6 text-center text-gray-500">
                                    No hay transferencias registradas.
                                </td>
                            </tr>
                        )}
                        {transfers.map((transfer: any, key: number) => (
                            <tr
                                key={key}
                                className={`border-b dark:border-gray-700 ${
                                    transfer.cuenta === 'BCP' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'
                                }`}
                            >
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    {transfer.remitente}
                                </th>
                                <td className="px-6 py-4">{transfer.destinatario}</td>
                                <td className="px-6 py-4">{new Date(transfer.fecha).toLocaleDateString('es-PE')}</td>
                                <td className="hidden px-6 py-4 sm:table-cell">{transfer.agente}</td>
                                <td className="px-6 py-4">{transfer.monto}</td>
                                <td className="px-6 py-4">{transfer.estado}</td>
                                <td className="px-6 py-4">{transfer.cuenta}</td>
                                <td className="px-6 py-4">{transfer.observacion}</td>
                                {/* <td className="px-6 py-4">{transfer.foto}</td> */}
                                <td className="px-6 py-4">
                                    <div className="flex max-w-[200px] items-center space-x-2 overflow-x-auto">
                                        {transfer.fotos?.length > 0 ? (
                                            transfer.fotos.map((foto: any, index: number) => (
                                                <img
                                                    key={foto.id}
                                                    src={`/storage/${foto.ruta}`}
                                                    onClick={() => handleOpenGallery(transfer.fotos, index, transfer.remitente, transfer.id)}
                                                    className="h-10 w-10 shrink-0 cursor-pointer rounded-full border border-gray-300 object-cover"
                                                    alt="Foto"
                                                />
                                            ))
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100">
                                                <ImageOff className="h-5 w-5 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="m-2 flex gap-2">
                                        <button
                                            onClick={() => handleOpenFotos(transfer.remitente, transfer.id)}
                                            className="cursor-pointer rounded p-1 text-blue-700 transition hover:bg-blue-200"
                                        >
                                            <ImageUp />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(transfer.id)}
                                            className="cursor-pointer rounded p-1 text-red-600 transition hover:bg-red-200 hover:text-red-800"
                                        >
                                            <DeleteIcon />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(transfer)}
                                            className="cursor-pointer rounded p-1 text-green-600 transition hover:bg-green-200 hover:text-green-800"
                                        >
                                            <Edit size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <SliderModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                fotos={selectedFotos}
                initialIndex={initialIndex}
                titleModal={'Transferencia de: ' + transferRemitente}
                transferId={selectedTransferId!}
            />
            <GalleryModal
                isOpen={showGalleryModal}
                entidad="transfer"
                onClose={() => setShowGalleryModal(false)}
                transferId={selectedTransferId!}
                subtitle={'Aqui puede subir fotos de transferencia de: ' + transferRemitente}
            />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}

const handleDelete = (id: number) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la trasferencia permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Eliminando...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            router.delete(route('transfers.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Eliminar la foto del estado local

                    Swal.fire({
                        title: '¡Eliminada!',
                        text: 'La foto se eliminó correctamente.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar la foto.',
                        icon: 'error',
                    });
                },
            });
        }
    });
};
