import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { CircleDollarSign, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Foto {
    id: number;
    ruta: string;
    descripcion?: string;
}

interface SliderModalProps {
    isOpen: boolean;
    onClose: () => void;
    fotos: Foto[];
    initialIndex?: number;
    titleModal: string;
    transferId: number;
}

export default function SliderModal({ isOpen, onClose, fotos: initialFotos, initialIndex = 0, titleModal, transferId }: SliderModalProps) {
    // Estado local para las fotos
    const [fotos, setFotos] = useState<Foto[]>(initialFotos);

    // Actualizar fotos cuando las props cambien (por si hay cambios externos)
    useEffect(() => {
        setFotos(initialFotos);
    }, [initialFotos]);

    const handleDelete = (fotoId: number) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la foto permanentemente.',
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

                router.delete(route('fotos.destroy', fotoId), {
                    preserveScroll: true,
                    onSuccess: () => {
                        // Eliminar la foto del estado local
                        setFotos(fotos.filter((foto) => foto.id !== fotoId));

                        Swal.fire({
                            title: '¡Eliminada!',
                            text: 'La foto se eliminó correctamente.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        });

                        // Cerrar el modal si no hay más fotos (opcional)
                        if (fotos.length === 1) {
                            onClose();
                            setShowGalleryModal(false);
                        }
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

    const [showGalleryModal, setShowGalleryModal] = useState(false);

    if (!isOpen) return null;
    return (
        // <Dialog open={isOpen} onOpenChange={onClose}>
        //     </Dialog>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80">
            <div className="relative w-[50%] max-w-4xl rounded-xl bg-white p-4 dark:bg-black/50">
                {/* Botón cerrar */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-600">
                    <X />
                </button>

                {/* Título remitente */}
                <div className="dark: mb-4 flex items-center text-center text-lg font-semibold text-blue-900 dark:text-indigo-300">
                    <CircleDollarSign className="mr-2" />
                    {titleModal}
                </div>

                {fotos.length > 0 ? (
                    <Swiper navigation modules={[Navigation]} initialSlide={initialIndex} className="mb-4 rounded" key={fotos.length}>
                        {fotos.map((foto) => (
                            <SwiperSlide key={foto.id}>
                                <div className="flex h-[550px] flex-col items-center justify-center">
                                    <img
                                        src={`/storage/${foto.ruta}`}
                                        className="mx-auto max-h-[500px] w-full rounded-lg object-contain"
                                        alt="Foto"
                                    />
                                    {foto.descripcion && <p className="mt-2 text-center text-gray-800 dark:text-blue-200">{foto.descripcion}</p>}

                                    <div className="mt-2 flex justify-center gap-4">
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(foto.id)}>
                                            <Trash2 size={16} /> Eliminar
                                        </Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="mb-4 text-center text-gray-600">No hay fotos disponibles.</div>
                )}
            </div>
        </div>
    );
}
