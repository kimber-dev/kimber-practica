import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactElement } from 'react';
import Swal from 'sweetalert2';

interface Foto {
    id: number;
    ruta: string;
    descripcion?: string;
}

interface GalleryModalProps {
    isOpen: boolean;
    transferId: number;
    entidad: string;
    subtitle?: string;
    onClose: () => void;
}

export default function GalleryModal({ isOpen, entidad, transferId, subtitle = '', onClose }: GalleryModalProps): ReactElement {
    const { data, setData, post, processing, errors, reset, progress } = useForm<{
        ruta: File[];
        descripcion: string;
    }>({
        ruta: [],
        descripcion: '',
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setData('ruta', Array.from(e.target.files));
        }
    };
    const tipoEntidad = entidad; // transfer o 'gasto'
    const entidadId = transferId; // o gastoId

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        post(route('fotos.store', { tipo: tipoEntidad, id: entidadId }), {
            onSuccess: () => {
                reset();
                onClose();

                Swal.fire({
                    title: 'Éxito',
                    text: 'Fotos subidas correctamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al subir las fotos',
                    icon: 'error',
                });
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">📸 Subir fotos</DialogTitle>
                    <DialogDescription>
                        <span className="text-blue-600">{subtitle}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ruta">Selecciona las fotos</Label>
                        <Input type="file" id="ruta" name="ruta" multiple accept="image/*" onChange={handleFileChange} disabled={processing} />
                        {errors.ruta && <p className="text-sm text-red-500">{errors.ruta}</p>}
                        <p className="text-xs text-muted-foreground">Formatos soportados: JPG, PNG, GIF</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción (opcional)</Label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            rows={3}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Ej: Comprobante de pago, voucher bancario..."
                            disabled={processing}
                        />
                    </div>

                    {progress && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>Progreso:</span>
                                <span>{progress.percentage}%</span>
                            </div>
                            <div className="h-2 w-full rounded bg-gray-200">
                                <div className="h-full rounded bg-blue-600 transition-all" style={{ width: `${progress.percentage}%` }} />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing || data.ruta.length === 0}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Subiendo...
                                </>
                            ) : (
                                'Subir foto'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
