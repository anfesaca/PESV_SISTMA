import React, { useState } from 'react';
import {
  Truck,
  Users,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  FileSpreadsheet,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BarChart3,
  PieChart,
  Activity,
  TrendingUp
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { TrafficLightBadge } from '../common/TrafficLightBadge';
import { ActiveTab } from '../layout/Sidebar';
import { exportFullPesvExcel } from '../../utils/excelExport';

interface DashboardOverviewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveTab }) => {
  const {
    empresa,
    vehiculos,
    conductores,
    inspecciones,
    matrizRiesgos,
    mantenimientos,
    estandares,
    alertasVehiculos,
    alertasConductores,
    autoevaluacionScore,
    indicadores
  } = usePesv();

  const vehiculosOperativos = vehiculos.filter(v => v.estadoOperativo === 'OPERATIVO').length;
  const vehiculosEnTaller = vehiculos.filter(v => v.estadoOperativo === 'EN_TALLER').length;
  const vehiculosNoAptos = vehiculos.filter(v => v.estadoOperativo === 'NO_APTO').length;
  const conductoresAptos = conductores.filter(c => c.estadoAptitudMedica === 'APTO').length;
  const riesgosCriticos = matrizRiesgos.filter(r => r.clasificacion === 'CRITICO').length;
  const riesgosAltos = matrizRiesgos.filter(r => r.clasificacion === 'ALTO').length;
  const riesgosMedios = matrizRiesgos.filter(r => r.clasificacion === 'MEDIO').length;
  const riesgosBajos = matrizRiesgos.filter(r => r.clasificacion === 'BAJO').length;

  const totalVehiculos = vehiculos.length || 1;
  const pctOperativo = Math.round((vehiculosOperativos / totalVehiculos) * 100);

  // Fases del PESV
  const fasePlanificacion = estandares.filter(e => e.fase === 'PLANIFICACION');
  const faseImplementacion = estandares.filter(e => e.fase === 'IMPLEMENTACION');
  const faseSeguimiento = estandares.filter(e => e.fase === 'SEGUIMIENTO');
  const faseMejora = estandares.filter(e => e.fase === 'MEJORA');

  const pctPlan = Math.round((fasePlanificacion.filter(e => e.cumple === 'CUMPLE').length / (fasePlanificacion.length || 1)) * 100);
  const pctImp = Math.round((faseImplementacion.filter(e => e.cumple === 'CUMPLE').length / (faseImplementacion.length || 1)) * 100);
  const pctSeg = Math.round((faseSeguimiento.filter(e => e.cumple === 'CUMPLE').length / (faseSeguimiento.length || 1)) * 100);
  const pctMej = Math.round((faseMejora.filter(e => e.cumple === 'CUMPLE').length / (faseMejora.length || 1)) * 100);

  const hoyStr = new Date().toISOString().split('T')[0];
  const inspeccionesHoy = inspecciones.filter(i => i.fechaHora.startsWith(hoyStr));
  const rechazosHoy = inspeccionesHoy.filter(i => i.decision === 'RECHAZADO_CRITICO').length;

  return (
    <div className="space-y-6">
      {/* Banner Hero Característico de Seguros Bolívar (Copiado de la captura) */}
      <div className="bg-[#006837] rounded-3xl text-white shadow-xl overflow-hidden relative">
        {/* Adorno Gráfico: Bucle / Curva Dorada Seguros Bolívar */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full border-[18px] border-[#fec828]/25 pointer-events-none" />
        <div className="absolute right-36 -top-20 w-80 h-80 rounded-full border-[10px] border-[#fec828]/15 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 sm:p-10 relative z-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#fec828] text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan Estratégico de Seguridad Vial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-white leading-tight">
              Gestión Integral de Seguridad Vial &amp; Movilidad Segura
            </h1>

            <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
              Cuidando cada vida en las vías de Colombia. Plataforma automatizada de cumplimiento legal bajo la <strong className="text-white">Resolución 40595 de 2022</strong> y <strong className="text-white">Circular 0034</strong> del Ministerio de Transporte.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('inspecciones')}
                className="px-6 py-2.5 rounded-full bg-[#fec828] hover:bg-[#f0b500] text-[#004d28] font-black text-xs transition shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Iniciar Inspección Diaria</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => exportFullPesvExcel(empresa, vehiculos, conductores, inspecciones, matrizRiesgos, mantenimientos, estandares)}
                className="px-6 py-2.5 rounded-full border-2 border-white/80 hover:bg-white hover:text-[#006837] text-white font-bold text-xs transition cursor-pointer flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Descargar Libro Excel</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
            <div className="w-14 h-14 rounded-full bg-[#fec828] text-[#004d28] flex items-center justify-center font-black text-xl mb-2 shadow-md">
              {autoevaluacionScore.puntaje}%
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Cumplimiento Circular 0034
            </h4>
            <p className="text-xs text-emerald-200 mt-1">
              Nivel: <strong className="text-white uppercase">{autoevaluacionScore.nivelAlcanzado}</strong>
            </p>
            <span className="mt-3 text-[11px] px-3 py-1 rounded-full bg-white text-[#006837] font-black">
              {autoevaluacionScore.cumplidos} de {autoevaluacionScore.aplicables} pasos aprobados
            </span>
          </div>
        </div>
      </div>

      {/* Métricas Principales (Tarjetas de Control) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Flota Vehicular"
          value={`${vehiculosOperativos} / ${vehiculos.length}`}
          subtitle={`${vehiculosNoAptos} inmovilizados / taller`}
          icon={Truck}
          iconColor="text-[#006837]"
          bgColor="bg-[#e8f5e9]"
          trend={{ label: `${vehiculosOperativos} listos para ruta`, positive: true }}
        />

        <StatCard
          title="Conductores"
          value={conductores.length}
          subtitle={`${conductoresAptos} con aptitud médica 100%`}
          icon={Users}
          iconColor="text-[#006837]"
          bgColor="bg-[#e8f5e9]"
          trend={{ label: `${alertasConductores.length} licencias por revisar`, positive: alertasConductores.length === 0 }}
        />

        <StatCard
          title="Inspecciones Hoy"
          value={inspeccionesHoy.length}
          subtitle={rechazosHoy > 0 ? `${rechazosHoy} RECHAZADAS por fallas` : '0 novedades críticas'}
          icon={ClipboardCheck}
          iconColor="text-[#006837]"
          bgColor="bg-[#e8f5e9]"
          trend={{ label: rechazosHoy > 0 ? 'Falla en frenos/llantas' : '100% aprobado hoy', positive: rechazosHoy === 0 }}
        />

        <StatCard
          title="Nivel de Diseño"
          value={empresa.nivelPesv}
          subtitle="Clasificación Resolución 40595"
          icon={ShieldCheck}
          iconColor="text-[#004d28]"
          bgColor="bg-[#fef9c3]"
          trend={{ label: 'Vigilado Mintransporte', positive: true }}
        />
      </div>

      {/* Sección: Gráficos Visuales de Gestión y Seguridad Vial (Requisito 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico 1: Tendencia Mensual de Inspecciones & Siniestros (Bar Visual) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#e8f5e9] text-[#006837]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Tendencia de Inspecciones Preoperacionales &amp; Seguridad Vial
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evolución mensual de revisiones en patio vs cero siniestros con lesiones
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-md bg-[#006837]" /> Aprobadas
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-md bg-[#fec828]" /> Cumplimiento %
                </span>
              </div>
            </div>

            {/* Visual Bar Chart SVG */}
            <div className="mt-6">
              <div className="flex items-end justify-between h-44 px-4 border-b border-slate-200 gap-4">
                {indicadores.map((ind) => {
                  const pct = ind.cumplimientoPreoperacionalPct;
                  const barHeight = `${Math.round((ind.preoperacionalesRealizados / 320) * 140)}px`;
                  return (
                    <div key={ind.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-2.5 rounded-xl pointer-events-none whitespace-nowrap z-30 shadow-lg flex flex-col items-center">
                        <span>{ind.preoperacionalesRealizados} inspecciones</span>
                        <span className="text-[#fec828] text-[10px]">{pct}% cumplimiento</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-black text-slate-700">
                        <span>{ind.preoperacionalesRealizados}</span>
                      </div>
                      <div
                        style={{ height: barHeight }}
                        className="w-full max-w-[52px] bg-gradient-to-t from-[#006837] to-[#1e824c] rounded-t-xl transition-all duration-300 group-hover:brightness-110 shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">
                        {ind.mes === '2026-05' ? 'May' : ind.mes === '2026-06' ? 'Jun' : ind.mes === '2026-07' ? 'Jul' : 'Ago'} 2026
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Badges footer de tendencia */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-2">
                <div className="bg-[#f8fafc] p-2.5 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold block">Total Inspecciones</span>
                  <span className="text-sm font-black text-[#006837]">
                    {indicadores.reduce((a, b) => a + b.preoperacionalesRealizados, 0)}
                  </span>
                </div>
                <div className="bg-[#f8fafc] p-2.5 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold block">Promedio Mensual</span>
                  <span className="text-sm font-black text-slate-700">
                    {Math.round(indicadores.reduce((a, b) => a + b.preoperacionalesRealizados, 0) / indicadores.length)}
                  </span>
                </div>
                <div className="bg-[#f8fafc] p-2.5 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold block">Siniestros Lesión</span>
                  <span className="text-sm font-black text-emerald-600">0 (Cero)</span>
                </div>
                <div className="bg-[#f8fafc] p-2.5 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-500 font-semibold block">Tasa Cumplimiento</span>
                  <span className="text-sm font-black text-[#004d28]">98.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico 2: Donut Chart de Estado de la Flota */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#fef9c3] text-[#004d28]">
                  <PieChart className="w-5 h-5 text-[#004d28]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Disponibilidad de la Flota
                  </h3>
                  <p className="text-xs text-slate-500">{vehiculos.length} vehículos monitoreados</p>
                </div>
              </div>
            </div>

            {/* SVG Donut Chart */}
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    className="stroke-slate-100"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* Operativos Slice (#006837) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#006837"
                    strokeWidth="12"
                    strokeDasharray="238.76"
                    strokeDashoffset={238.76 - (238.76 * vehiculosOperativos) / totalVehiculos}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                  {/* En Taller / Preventivo Slice (#fec828) */}
                  {vehiculosEnTaller > 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#fec828"
                      strokeWidth="12"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - (238.76 * vehiculosEnTaller) / totalVehiculos}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  )}
                  {/* No Aptos Slice (#ef4444) */}
                  {vehiculosNoAptos > 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#ef4444"
                      strokeWidth="12"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - (238.76 * vehiculosNoAptos) / totalVehiculos}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  )}
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#006837] leading-none">
                    {pctOperativo}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">
                    Operativos
                  </span>
                </div>
              </div>

              {/* Leyenda Detallada */}
              <div className="w-full mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#e8f5e9]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006837]" />
                    <span className="font-bold text-slate-700">Operativos en Ruta</span>
                  </div>
                  <span className="font-black text-[#006837]">{vehiculosOperativos}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fec828]" />
                    <span className="font-bold text-slate-700">En Mantenimiento</span>
                  </div>
                  <span className="font-black text-amber-700">{vehiculosEnTaller}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/70">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="font-bold text-slate-700">Inmovilizados / No Apto</span>
                  </div>
                  <span className="font-black text-rose-600">{vehiculosNoAptos}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('vehiculos')}
            className="w-full mt-4 py-2 px-3 rounded-xl border border-slate-200 hover:border-[#006837] hover:bg-[#e8f5e9] text-[#006837] text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Ver Inventario de Vehículos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fila Adicional: Avance por las 4 Fases del PESV (Res. 40595 & Circular 0034) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#e8f5e9] text-[#006837]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Progreso por Fases del Ciclo PHVA - Resolución 40595 de 2022
              </h3>
              <p className="text-xs text-slate-500">
                Autoevaluación de estándares y pasos normativos obligatorios
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('autoevaluacion')}
            className="text-xs font-bold text-[#006837] hover:text-[#004d28] flex items-center gap-1 cursor-pointer"
          >
            <span>Detalle 24 Pasos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fase 1: Planificación */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#f8fafc] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Fase 1: Planificar</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#006837] text-white">
                {pctPlan}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${pctPlan}%` }}
                className="bg-[#006837] h-full rounded-full transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Liderazgo, Política PESV, Comité y Matriz de Riesgos viales PxI.
            </p>
          </div>

          {/* Fase 2: Implementación */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#f8fafc] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Fase 2: Implementar</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#006837] text-white">
                {pctImp}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${pctImp}%` }}
                className="bg-[#006837] h-full rounded-full transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Plan anual formación, mantenimiento preventivo, inspección diaria y rutas.
            </p>
          </div>

          {/* Fase 3: Seguimiento */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#f8fafc] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Fase 3: Seguimiento</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#fec828] text-[#004d28]">
                {pctSeg}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${pctSeg}%` }}
                className="bg-[#fec828] h-full rounded-full transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Indicadores mensuales de gestión, estadísticas de siniestralidad y auditoría.
            </p>
          </div>

          {/* Fase 4: Mejora */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-[#f8fafc] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Fase 4: Mejora</span>
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#fec828] text-[#004d28]">
                {pctMej}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${pctMej}%` }}
                className="bg-[#fec828] h-full rounded-full transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Planes de acción y mecanismos de comunicación bidireccional.
            </p>
          </div>
        </div>
      </div>

      {/* Fila 2: Control de Documentos & Matriz de Riesgos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Semáforo de Vigencias */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#fef9c3] text-[#004d28]">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Control de Vigencias Legales (SOAT, RTM, Licencias)
                  </h3>
                  <p className="text-xs text-slate-500">Alertas tempranas a 30 días para evitar sanciones e inmovilizaciones</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('vehiculos')}
                className="text-xs font-bold text-[#006837] hover:text-[#004d28] flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Flota</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {alertasVehiculos.length === 0 && alertasConductores.length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-[#006837] mb-2" />
                  <p className="text-xs font-medium">Todos los documentos y pólizas están vigentes.</p>
                </div>
              ) : (
                <>
                  {alertasVehiculos.map((a, idx) => (
                    <div
                      key={`al-veh-${idx}`}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-[#f8fafc] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-[#006837] text-white">
                          {a.vehiculo.placa}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800">
                            {a.vehiculo.marca} {a.vehiculo.linea} ({a.vehiculo.tipo})
                          </p>
                          <p className="text-[11px] text-slate-500">Póliza / Certificado: {a.tipoDoc}</p>
                        </div>
                      </div>
                      <TrafficLightBadge
                        fechaVencimiento={a.tipoDoc === 'SOAT' ? a.vehiculo.fechaVencimientoSoat : a.vehiculo.fechaVencimientoRtm}
                        tipoDocumento={a.tipoDoc}
                      />
                    </div>
                  ))}

                  {alertasConductores.map((a, idx) => (
                    <div
                      key={`al-cond-${idx}`}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-[#f8fafc] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-black px-2 py-1 rounded-lg bg-[#fec828] text-[#004d28]">
                          {a.conductor.categoriaLicencia}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800">
                            {a.conductor.nombres} {a.conductor.apellidos}
                          </p>
                          <p className="text-[11px] text-slate-500">C.C. {a.conductor.cedula} • Licencia de conducción</p>
                        </div>
                      </div>
                      <TrafficLightBadge
                        fechaVencimiento={a.conductor.fechaVencimientoLicencia}
                        tipoDocumento="Licencia"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Plan Estratégico de Seguridad Vial • Res. 40595</span>
            <span className="font-bold text-[#006837]">Trazabilidad legal en línea</span>
          </div>
        </div>

        {/* Columna Derecha: Matriz de Riesgos Resumen */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Riesgos Críticos Viales</h3>
                  <p className="text-xs text-slate-500">Paso 6: Matriz P x I</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('matriz_riesgos')}
                className="text-xs font-bold text-[#006837] hover:text-[#004d28] cursor-pointer"
              >
                Ver Matriz
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-900">Riesgo Crítico (16 - 25)</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-red-200 text-red-900">
                    {riesgosCriticos} peligros
                  </span>
                </div>
                <p className="text-[11px] text-red-700 mt-1">
                  Exceso de velocidad y fatiga en cabina. Controles telemáticos activos.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Riesgo Alto (10 - 15)</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    {riesgosAltos} peligros
                  </span>
                </div>
                <p className="text-[11px] text-amber-700 mt-1">
                  Falla de frenos en montaña y aquaplaning por lluvias.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#e8f5e9] border border-[#c8e6c9]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#004d28]">Inspección Preoperacional</span>
                  <Badge variant="success" size="sm">Automatizada</Badge>
                </div>
                <p className="text-[11px] text-[#006837] mt-1">
                  Revisión obligatoria diaria de 10 puntos mecánicos antes de cada ruta.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('autoevaluacion')}
            className="w-full mt-4 py-2.5 px-4 rounded-full bg-[#006837] hover:bg-[#004d28] text-white text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-[#006837]/20 cursor-pointer"
          >
            <span>Ver Autoevaluación Circular 0034</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fila 3: Últimas Inspecciones Preoperacionales Registradas */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Últimas Inspecciones Diarias Preoperacionales</h3>
            <p className="text-xs text-slate-500">Trazabilidad en tiempo real antes de salida de patio</p>
          </div>
          <button
            onClick={() => setActiveTab('inspecciones')}
            className="text-xs font-bold text-[#006837] hover:text-[#004d28] flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas las inspecciones</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] bg-slate-50/70">
                <th className="py-2.5 px-3">Fecha y Hora</th>
                <th className="py-2.5 px-3">Vehículo</th>
                <th className="py-2.5 px-3">Conductor</th>
                <th className="py-2.5 px-3">Frenos</th>
                <th className="py-2.5 px-3">Llantas</th>
                <th className="py-2.5 px-3">Fluidos</th>
                <th className="py-2.5 px-3">Decisión</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inspecciones.slice(0, 5).map(i => {
                const veh = vehiculos.find(v => v.id === i.vehiculoId);
                const cond = conductores.find(c => c.id === i.conductorId);
                return (
                  <tr key={i.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-600">{i.fechaHora}</td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#006837] text-white font-mono text-xs">
                        {veh ? veh.placa : i.vehiculoId}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">
                      {cond ? `${cond.nombres} ${cond.apellidos}` : i.conductorId}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        i.frenosServicio === 'BUENO' ? 'bg-[#e8f5e9] text-[#006837]' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {i.frenosServicio}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        i.estadoLlantasLabrado === 'BUENO' ? 'bg-[#e8f5e9] text-[#006837]' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {i.estadoLlantasLabrado}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        !i.fugaFluidos ? 'bg-[#e8f5e9] text-[#006837]' : 'bg-rose-100 text-rose-800 font-black'
                      }`}>
                        {i.fugaFluidos ? 'FUGA DETECTADA' : 'OK'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={i.decision === 'APROBADO' ? 'success' : 'danger'}>
                        {i.decision === 'APROBADO' ? 'APROBADO' : 'RECHAZADO'}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-slate-500" title={i.observaciones}>
                      {i.observaciones || 'Sin novedades'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
