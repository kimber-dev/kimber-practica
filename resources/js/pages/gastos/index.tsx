import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { DeleteIcon, Edit, ImageOff, ImageUp, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import Swal from 'sweetalert2';
import GalleryModal from '../transfers/galleryModal';
import SliderModal from '../transfers/sliderModal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gastos',
        href: '/Gastos',
    },
];
type RegisterForm = {
    descripcion: string;
    monto: number;
    fecha: string;
    tipo: string;
    estado: boolean;
};

export default function Index({ gastos }: { gastos: any }) {
    console.log(gastos);
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        descripcion: '',
        monto: 0,
        fecha: '',
        tipo: '',
        estado: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (EditingGasto) {
            // Modo edición
            post(route('gastos.update', EditingGasto.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                },
            });
        } else {
            // Modo nuevo
            post(route('gastos.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                },
            });
        }
    };

    const [showModal, setShowModal] = useState(false); // controla apertura del modal
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [EditingGasto, setEditingGasto] = useState<any | null>(null); // null = nuevo
    const handleNew = () => {
        setData({
            descripcion: '',
            monto: 0,
            fecha: '',
            tipo: '',
            estado: true,
        });
        setEditingGasto(null);
        setShowModal(true);
    };
    const handleEdit = (gasto: any) => {
        setData({
            descripcion: gasto.descripcion,
            monto: gasto.monto,
            fecha: gasto.fecha,
            tipo: gasto.tipo,
            estado: gasto.estado,
        });
        setEditingGasto(gasto); // Carga datos
        setShowModal(true); // Abre el modal
    };
    const [openModal, setOpenModal] = useState(false);
    const [selectedFotos, setSelectedFotos] = useState([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [titleGasto, setTitleGasto] = useState('');
    const [selectedTransferId, setSelectedTransferId] = useState<number | null>(null);

    const handleOpenGallery = (fotos: any, index = 0, remitente = '', id: number) => {
        setSelectedFotos(fotos);
        setInitialIndex(index);
        setTitleGasto(remitente);
        setSelectedTransferId(id);
        setOpenModal(true);
    };
    let describeGasto = 'valor de prueba'; // Reemplazar con el valor r
    const handleOpenFotoForm = (descripcion: string, id: number) => {
        setTitleGasto(descripcion);
        setSelectedTransferId(id);
        setShowGalleryModal(true);
    };
    const columns: TableColumn<any>[] = [
        {
            name: 'Fecha',
            selector: (row) => row.fecha,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: (row) => row.descripcion,
            sortable: true,
        },
        {
            name: 'Monto',
            selector: (row) => row.monto,
            sortable: true,
        },
        {
            name: 'Tipo',
            selector: (row) => row.tipo,
            sortable: true,
        },
        {
            name: 'Estado',
            cell: (row) => (row.estado ? 'Ejecutado' : 'Pendiente'),
            sortable: true,
        },
        {
            name: 'Imagen',
            cell: (row) => (
                <div className="flex max-w-[200px] items-center space-x-2 overflow-x-auto">
                    {row.fotos?.length > 0 ? (
                        row.fotos.map((foto: any, index: number) => (
                            <img
                                key={foto.id}
                                src={`/storage/${foto.ruta}`}
                                onClick={() => handleOpenGallery(row.fotos, index, row.descripcion, row.id)}
                                className="h-10 w-10 shrink-0 cursor-pointer rounded-full border border-gray-300 object-cover"
                            />
                        ))
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100">
                            <ImageOff className="h-5 w-5 text-gray-400" />
                        </div>
                    )}
                </div>
            ),
        },
        {
            name: 'Acción',
            cell: (row) => (
                <div className="flex gap-2">
                    <button onClick={() => handleOpenFotoForm(row.descripcion, row.id)} className="rounded p-1 text-blue-700 hover:bg-blue-200">
                        <ImageUp />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="rounded p-1 text-red-600 hover:bg-red-200">
                        <DeleteIcon />
                    </button>
                    <button onClick={() => handleEdit(row)} className="rounded p-1 text-green-600 hover:bg-green-200">
                        <Edit size={20} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gastos" />
            <div className="flex justify-end">
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogTrigger asChild>
                        <DialogTrigger asChild className="m-2">
                            <Button onClick={handleNew}>Nuevo</Button>
                        </DialogTrigger>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{EditingGasto ? 'Editar gasto' : 'Nuevo gasto'}</DialogTitle>
                            <DialogDescription>
                                {EditingGasto ? 'Modifica los campos necesarios.' : 'Complete los datos para registrar un nuevo gasto.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="descripcion">Descripcion</Label>
                                    <Input
                                        id="descripcion"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="descripcion"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        disabled={processing}
                                        placeholder="descripcion"
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
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
                                        placeholder="fecha de gasto"
                                    />
                                    <InputError message={errors.fecha} />
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
                                        onChange={(e) => setData('monto', parseFloat(e.target.value))}
                                        disabled={processing}
                                        placeholder="Monto gasto"
                                    />
                                    <InputError message={errors.monto} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="estado">Estado</Label>
                                    <select
                                        id="estado"
                                        tabIndex={2}
                                        value={String(data.estado)} // convertir el valor booleano a string
                                        onChange={(e) => setData('estado', e.target.value === 'true')}
                                        disabled={processing}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">-- Seleccionar estado --</option>
                                        <option value="true">Confirmado</option>
                                        <option value="false">Pendiente</option>
                                    </select>
                                    <InputError message={errors.estado} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tipo">Tipo</Label>
                                    <select
                                        id="tipo"
                                        tabIndex={3}
                                        value={data.tipo}
                                        onChange={(e) => setData('tipo', e.target.value)}
                                        disabled={processing}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">-- Seleccionar tipo de gasto --</option>
                                        <option value="gastos comunes">Gastos comunes</option>
                                        <option value="personal">Personal</option>
                                        <option value="insumos">Insumos</option>
                                        <option value="otros">Otros</option>
                                    </select>
                                    <InputError message={errors.tipo} />
                                </div>

                                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    {EditingGasto ? 'Actualizar gasto' : 'Registrar gasto'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mt-4 w-full max-w-full px-4">
                <DataTable
                    title="Listado de Gastos"
                    columns={columns}
                    data={gastos}
                    pagination
                    highlightOnHover
                    responsive
                    persistTableHead
                    noDataComponent="No hay gastos registrados."
                />
            </div>

            <SliderModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                fotos={selectedFotos}
                initialIndex={initialIndex}
                titleModal={titleGasto}
                transferId={selectedTransferId!}
            />
            <GalleryModal
                isOpen={showGalleryModal}
                entidad="gasto"
                onClose={() => setShowGalleryModal(false)}
                transferId={selectedTransferId!}
                subtitle={'Fotos para gasto : ' + titleGasto}
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

            router.delete(route('gastos.destroy', id), {
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
