import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router, useForm } from '@inertiajs/react';
import { PencilIcon, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
// import 'swiper/css';
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
    remitente: string;
    transferId: number;
}

export default function SliderModal({ isOpen, onClose, fotos, initialIndex = 0, remitente, transferId }: SliderModalProps) {
    const [showUpload, setShowUpload] = useState(false);
    const [editFotoId, setEditFotoId] = useState<number | null>(null);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
        reset,
        progress,
    } = useForm({
        ruta: [] as File[],
        descripcion: '',
    });

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editFotoId ? route('transfers.fotos.update', [transferId, editFotoId]) : route('transfers.fotos.store', transferId);

        post(url, {
            onSuccess: () => {
                reset();
                setShowUpload(false);
                setEditFotoId(null);
            },
        });
    };

    const handleDelete = (fotoId: number) => {
        if (confirm('¿Estás seguro de eliminar esta foto?')) {
            router.delete(route('transfers.fotos.destroy', fotoId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Opcional: mostrar mensaje o actualizar lista si no usas Inertia visit
                    console.log('Foto eliminada');
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>📸 Subir fotos</DialogTitle>
                    <DialogDescription>
                        {/* Título remitente */}
                        📁 Transferencia de: <span className="text-blue-600">{remitente}</span>
                    </DialogDescription>
                </DialogHeader>

                {/* Swiper de imágenes */}
                {fotos.length > 0 && (
                    <Swiper navigation modules={[Navigation]} initialSlide={initialIndex} className="mb-4 h-[550px] rounded">
                        {fotos.map((foto) => (
                            <SwiperSlide key={foto.id}>
                                <div className="relative">
                                    <img
                                        src={`/storage/${foto.ruta}`}
                                        className="mx-auto max-h-[500px] w-full rounded-lg object-contain"
                                        alt="Foto"
                                    />
                                    {foto.descripcion && <p className="mt-2 text-center text-gray-700">{foto.descripcion}</p>}

                                    <div className="mt-2 flex justify-center gap-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setEditFotoId(foto.id);
                                                setData('descripcion', foto.descripcion || '');
                                                setShowUpload(true);
                                            }}
                                        >
                                            <PencilIcon size={16} /> Editar
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(foto.id)}>
                                            <Trash2 size={16} /> Eliminar
                                        </Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* Botón para agregar nueva foto */}
                <div className="flex justify-center">
                    <Button
                        variant="default"
                        onClick={() => {
                            setShowUpload(true);
                            setEditFotoId(null);
                            reset();
                        }}
                    >
                        <PlusCircle className="mr-2" size={18} />
                        Agregar nueva foto
                    </Button>
                </div>

                {/* Formulario subir/editar */}

                <DialogFooter className="flex justify-end gap-3"></DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
