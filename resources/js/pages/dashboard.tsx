import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
const visibilityData = [
    { date: 'Jan 18', visibility: 6.8, presence: 68 },
    { date: 'Jan 19', visibility: 7.2, presence: 71 },
    { date: 'Jan 20', visibility: 6.9, presence: 69 },
    { date: 'Jan 21', visibility: 7.8, presence: 73 },
    { date: 'Jan 22', visibility: 8.1, presence: 76 },
    { date: 'Jan 23', visibility: 8.4, presence: 74 },
    { date: 'Jan 24', visibility: 8.4, presence: 74 },
];
const mentionsData = [
    { date: 'Jan 18', mentions: 156, citations: 89 },
    { date: 'Jan 19', mentions: 203, citations: 112 },
    { date: 'Jan 20', mentions: 178, citations: 95 },
    { date: 'Jan 21', mentions: 234, citations: 134 },
    { date: 'Jan 22', mentions: 289, citations: 167 },
    { date: 'Jan 23', mentions: 312, citations: 189 },
    { date: 'Jan 24', mentions: 298, citations: 172 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
export default function Dashboard({
    totalGastos,
    totalTransferencias,
    transferBcp,
    saldoActual,
    gastosPorMesYTipo,
    transferInterbank,
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
            {/* Charts Row */}

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="justify-center">
                        <CardContent className="mt-0">
                            <h2 className="text-lg font-bold">Total Transferencias</h2>
                            <p>
                                {' '}
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    minimumFractionDigits: 2,
                                }).format(totalTransferencias)}
                            </p>
                            <Separator className="my-2" />

                            <p className="text-sm text-blue-500">
                                BCP:{' '}
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    minimumFractionDigits: 2,
                                }).format(transferBcp)}
                            </p>
                            <p className="text-sm text-green-500">
                                Interbank:{' '}
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                    minimumFractionDigits: 2,
                                }).format(transferInterbank)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="justify-center">
                        <CardContent className="text-red-600">
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

                    <Card className="justify-center">
                        <CardContent className={saldoActual < 0 ? 'text-red-600' : 'text-green-600'}>
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
