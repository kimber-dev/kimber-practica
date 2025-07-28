import { Card, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
export default function Dashboard({
    totalGastos,
    totalTransferencias,
    saldoActual,
    gastosPorMesYTipo,
    transferenciasPorEstado,
    gastosPorTipo,
    transferenciasPorMes,
}) {
    // Formatear datos para el gráfico de barras apiladas
    const dataBar = Object.entries(gastosPorMesYTipo).map(([mes, gastos]) => {
        const entrada: any = { mes };
        gastos.forEach((g: any) => {
            entrada[g.tipo] = parseFloat(g.total);
        });
        return entrada;
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent>
                            <h2 className="text-lg font-bold">Total Gastos</h2>
                            <p>
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    minimumFractionDigits: 2,
                                }).format(totalGastos)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h2 className="text-lg font-bold">Total Transferencias</h2>
                            <p>
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    minimumFractionDigits: 2,
                                }).format(totalTransferencias)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <h2 className="text-lg font-bold">Saldo Actual</h2>
                            <p>
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    minimumFractionDigits: 2,
                                }).format(saldoActual)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardTitle>
                            <h2 className="ml-4 font-bold">Transferencias por mes</h2>
                        </CardTitle>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={transferenciasPorMes}>
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardTitle className="ml-3"> Gastos por tipo </CardTitle>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={gastosPorTipo} dataKey="total" nameKey="tipo" cx="50%" cy="50%" outerRadius={100} label>
                                        {gastosPorTipo.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardContent className="p-4">
                        <h2 className="mb-2 text-lg font-bold">Gastos por tipo y mes</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dataBar}>
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {
                                    // Crear una <Bar> por tipo de gasto
                                    Array.from(new Set(dataBar.flatMap((item) => Object.keys(item).filter((k) => k !== 'mes')))).map(
                                        (tipo, index) => (
                                            <Bar key={tipo} dataKey={tipo} stackId="a" fill={COLORS[index % COLORS.length]} />
                                        ),
                                    )
                                }   
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
