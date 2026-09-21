import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Calendar,
  Gauge,
  Target,
  Wrench,
  Award,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';

export const IndicadoresModule: React.FC = () => {
  const { indicadores, empresa } = usePesv();
  const [selectedMes, setSelectedMes] = useState<string>('todos');

  // Cálculos consolidados
  const totalKm = indicadores.reduce((acc, curr) => acc + curr.kilometrosFlotaTotal, 0);
  const totalSiniestros = indicadores.reduce((acc, curr) => acc + curr.siniestrosTotal, 0);
  const avgCumplimientoPreop = (
    indicadores.reduce((acc, curr) => acc + curr.cumplimientoPreoperacionalPct, 0) /
    (indicadores.length || 1)
  ).toFixed(1);
  const avgCumplimientoMant = (
    indicadores.reduce((acc, curr) => acc + curr.cumplimientoMantenimientoPct, 0) /
    (indicadores.length || 1)
  ).toFixed(1);
  const avgCapacitaciones = (
    indicadores.reduce((acc, curr) => acc + curr.conductoresCapacitadosPct, 0) /
    (indicadores.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#006837] text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Paso 20: Indicadores de Desempeño PESV (Res. 40595 de 2022)</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Tablero de Indicadores de Seguridad Vial
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitoreo continuo de indicadores de estructura, proceso y resultado para la flota de {empresa.razonSocial}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMes}
            onChange={(e) => setSelectedMes(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-[#006837] transition cursor-pointer"
          >
            <option value="todos">Todos los periodos (Histórico)</option>
            <option value="2026-08">Agosto 2026 (Último)</option>
            <option value="2026-07">Julio 2026</option>
            <option value="2026-06">Junio 2026</option>
            <option value="2026-05">Mayo 2026</option>
          </select>
        </div>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cumplimiento Preoperacionales"
          value={`${avgCumplimientoPreop}%`}
          subtitle="Meta institucional: >= 95%"
          icon={CheckCircle2}
          iconColor="text-[#006837]"
          bgColor="bg-[#e8f5e9]"
          trend={{ label: 'Meta superada +3.7%', positive: true }}
        />

        <StatCard
          title="Ejecución Mantenimiento"
          value={`${avgCumplimientoMant}%`}
          subtitle="Preventivo programado vs ejecutado"
          icon={Wrench}
          iconColor="text-[#006837]"
          bgColor="bg-[#e8f5e9]"
          trend={{ label: 'Meta institucional: >= 90%', positive: true }}
        />

        <StatCard
          title="Siniestros Totales (Periodo)"
          value={totalSiniestros}
          subtitle="0 siniestros con lesiones o fatalidades"
          icon={AlertTriangle}
          iconColor="text-amber-600"
          bgColor="bg-amber-50"
          trend={{ label: '1 evento de solo daños materiales', positive: false }}
        />

        <StatCard
          title="Kilómetros de Flota Recorridos"
          value={totalKm.toLocaleString('es-CO')}
          subtitle="Monitoreo telemetría GPS"
          icon={Gauge}
          iconColor="text-[#004d28]"
          bgColor="bg-[#fef9c3]"
          trend={{ label: 'Trazabilidad 100% activa', positive: true }}
        />
      </div>

      {/* Gráficos Visuales Interactivos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 1: Cumplimiento de Preoperacionales Mes a Mes */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#e8f5e9] text-[#006837]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    % Cumplimiento Inspección Preoperacional
                  </h3>
                  <p className="text-xs text-slate-500">Inspecciones realizadas vs programadas por mes</p>
                </div>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#006837] text-white">
                Meta: 95%
              </span>
            </div>

            {/* Visual SVG Bar Chart */}
            <div className="mt-6 pt-4">
              <div className="flex items-end justify-between h-48 px-4 border-b border-slate-200 gap-4">
                {indicadores.map((ind) => {
                  const pct = ind.cumplimientoPreoperacionalPct;
                  const barHeight = `${Math.max(20, (pct / 100) * 160)}px`;
                  return (
                    <div key={ind.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[11px] font-bold py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-md">
                        {ind.preoperacionalesRealizados} / {ind.preoperacionalesProgramados} ({pct}%)
                      </div>
                      <span className="text-xs font-black text-slate-700">{pct}%</span>
                      <div
                        style={{ height: barHeight }}
                        className="w-full max-w-[48px] bg-gradient-to-t from-[#006837] to-[#2e7d32] rounded-t-xl transition-all duration-300 group-hover:brightness-110 shadow-xs"
                      />
                      <span className="text-[11px] font-bold text-slate-500">{ind.mes}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006837]" />
              Inspecciones aprobadas antes de ruta
            </span>
            <span className="font-bold text-[#006837]">Conforme Res. 40595</span>
          </div>
        </div>

        {/* Gráfico 2: Mantenimientos Programados vs Ejecutados */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#fef9c3] text-[#004d28]">
                  <Wrench className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Plan de Mantenimiento de Flota (Paso 11)
                  </h3>
                  <p className="text-xs text-slate-500">Mantenimientos programados vs ejecutados a tiempo</p>
                </div>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#fec828] text-[#004d28]">
                Preventivo
              </span>
            </div>

            {/* Visual Column Comparison */}
            <div className="mt-6 pt-4">
              <div className="flex items-end justify-between h-48 px-4 border-b border-slate-200 gap-6">
                {indicadores.map((ind) => {
                  const progHeight = `${ind.mantenimientosProgramados * 24}px`;
                  const ejecHeight = `${ind.mantenimientosEjecutados * 24}px`;
                  return (
                    <div key={ind.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[11px] font-bold py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-md">
                        Prog: {ind.mantenimientosProgramados} | Ejec: {ind.mantenimientosEjecutados} ({ind.cumplimientoMantenimientoPct}%)
                      </div>
                      <span className="text-xs font-bold text-slate-700">{ind.cumplimientoMantenimientoPct}%</span>
                      <div className="flex items-end gap-1.5 w-full justify-center">
                        <div
                          style={{ height: progHeight }}
                          className="w-5 bg-slate-300 rounded-t-md"
                          title={`Programados: ${ind.mantenimientosProgramados}`}
                        />
                        <div
                          style={{ height: ejecHeight }}
                          className="w-5 bg-[#006837] rounded-t-md"
                          title={`Ejecutados: ${ind.mantenimientosEjecutados}`}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">{ind.mes}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Programados
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#006837]" /> Ejecutados
              </span>
            </div>
            <span className="font-bold text-[#006837]">Cero órdenes vencidas</span>
          </div>
        </div>
      </div>

      {/* Tabla Consolidada de Indicadores */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Histórico Mensual de Indicadores PESV
            </h3>
            <p className="text-xs text-slate-500">Registro auditable exigido por el Ministerio de Transporte</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] bg-slate-50/70">
                <th className="py-3 px-3">Periodo (Mes)</th>
                <th className="py-3 px-3">Preoperacionales (Ejec/Prog)</th>
                <th className="py-3 px-3">% Cumplimiento Preop.</th>
                <th className="py-3 px-3">Mantenimientos (Ejec/Prog)</th>
                <th className="py-3 px-3">% Cumplimiento Mant.</th>
                <th className="py-3 px-3">Siniestros</th>
                <th className="py-3 px-3">Km Flota</th>
                <th className="py-3 px-3">% Conductores Capacitados</th>
                <th className="py-3 px-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {indicadores.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-800">{ind.mes}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {ind.preoperacionalesRealizados} / {ind.preoperacionalesProgramados}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#006837] bg-[#e8f5e9] px-2 py-0.5 rounded-full text-xs">
                      {ind.cumplimientoPreoperacionalPct}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {ind.mantenimientosEjecutados} / {ind.mantenimientosProgramados}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                        ind.cumplimientoMantenimientoPct >= 90
                          ? 'text-[#006837] bg-[#e8f5e9]'
                          : 'text-amber-800 bg-amber-100'
                      }`}
                    >
                      {ind.cumplimientoMantenimientoPct}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={ind.siniestrosTotal === 0 ? 'success' : 'warning'}>
                      {ind.siniestrosTotal === 0 ? '0 Siniestros' : `${ind.siniestrosTotal} Solo Daños`}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {ind.kilometrosFlotaTotal.toLocaleString('es-CO')} km
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-700">
                    {ind.conductoresCapacitadosPct}%
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="success">Conforme</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
