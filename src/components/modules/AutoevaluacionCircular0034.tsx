import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Printer,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Download
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { EstandarPESV } from '../../types/pesv';
import { Badge } from '../common/Badge';

export const AutoevaluacionCircular0034: React.FC = () => {
  const { estandares, updateEstandar, empresa, autoevaluacionScore } = usePesv();

  const [filterFase, setFilterFase] = useState<string>('TODAS');
  const [filterCumplimiento, setFilterCumplimiento] = useState<string>('TODOS');
  const [expandedPaso, setExpandedPaso] = useState<number | null>(null);

  const toggleExpand = (paso: number) => {
    setExpandedPaso(prev => (prev === paso ? null : paso));
  };

  const handleStatusChange = (paso: number, cumple: 'CUMPLE' | 'NO_CUMPLE' | 'NO_APLICA') => {
    updateEstandar(paso, { cumple });
  };

  const handleEvidenciaChange = (paso: number, evidenciaTexto: string) => {
    updateEstandar(paso, { evidenciaTexto });
  };

  const handleObservacionChange = (paso: number, observaciones: string) => {
    updateEstandar(paso, { observaciones });
  };

  const filteredEstandares = estandares.filter(e => {
    const matchesFase = filterFase === 'TODAS' || e.fase === filterFase;
    const matchesCumplimiento = filterCumplimiento === 'TODOS' || e.cumple === filterCumplimiento;
    return matchesFase && matchesCumplimiento;
  });

  const getFaseColor = (fase: string) => {
    switch (fase) {
      case 'PLANIFICACION': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IMPLEMENTACION': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'SEGUIMIENTO': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'MEJORA': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner de Dictamen Oficial */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-2xl ${
            autoevaluacionScore.nivelAlcanzado === 'DESTACADO' ? 'bg-[#e8f5e9] text-[#006837] border border-[#c8e6c9]' :
            autoevaluacionScore.nivelAlcanzado === 'ACEPTABLE' ? 'bg-[#fef9c3] text-[#854d0e] border border-[#fde047]' :
            'bg-rose-50 text-rose-600 border border-rose-200'
          }`}>
            <Award className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Instrumento Dinámico de Autoevaluación
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#fec828]/25 text-[#004d28] border border-[#fec828]">
                Circular 0034 / Res. 40595
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              Puntaje Legal Obtenido: <span className="text-[#006837]">{autoevaluacionScore.puntaje}%</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Estado de Auditoría: <strong className="uppercase text-[#006837]">{autoevaluacionScore.nivelAlcanzado}</strong> • Cumple {autoevaluacionScore.cumplidos} de {autoevaluacionScore.aplicables} estándares aplicables al nivel <strong className="uppercase">{empresa.nivelPesv}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006837] hover:bg-[#004d28] text-white text-xs font-bold transition shadow-md shadow-[#006837]/20 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#fec828]" />
            <span>Imprimir Dictamen Oficial</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600">Filtrar por Fase:</span>
          <select
            value={filterFase}
            onChange={e => setFilterFase(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODAS">Todas las fases (24 Pasos)</option>
            <option value="PLANIFICACION">Fase I: Planificación (Pasos 1-8)</option>
            <option value="IMPLEMENTACION">Fase II: Implementación (Pasos 9-19)</option>
            <option value="SEGUIMIENTO">Fase III: Seguimiento (Pasos 20-22)</option>
            <option value="MEJORA">Fase IV: Mejora Continua (Pasos 23-24)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600">Estado:</span>
          <select
            value={filterCumplimiento}
            onChange={e => setFilterCumplimiento(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="CUMPLE">Cumple Requisito</option>
            <option value="NO_CUMPLE">No Cumple (No conformidad)</option>
            <option value="NO_APLICA">No Aplica con Justificación</option>
          </select>
        </div>
      </div>

      {/* Lista de los 24 Pasos Oficiales */}
      <div className="space-y-3">
        {filteredEstandares.map(est => {
          const aplicaEmpresa = est.aplicaNivel.includes(empresa.nivelPesv);
          const isExpanded = expandedPaso === est.pasoNumero;

          return (
            <div
              key={est.pasoNumero}
              className={`bg-white rounded-2xl border transition-all duration-150 overflow-hidden ${
                isExpanded ? 'border-blue-400 shadow-md ring-1 ring-blue-400/20' : 'border-slate-200 shadow-xs'
              }`}
            >
              <div
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                onClick={() => toggleExpand(est.pasoNumero)}
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono shrink-0">
                    {est.pasoNumero}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getFaseColor(est.fase)}`}>
                        {est.fase}
                      </span>
                      {aplicaEmpresa ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          Exigible en Nivel {empresa.nivelPesv}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          Exclusivo para {est.aplicaNivel.join('/')}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{est.nombre}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{est.criterioLegal}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(est.pasoNumero, 'CUMPLE')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        est.cumple === 'CUMPLE'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-emerald-700'
                      }`}
                    >
                      Cumple
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(est.pasoNumero, 'NO_CUMPLE')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        est.cumple === 'NO_CUMPLE'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-rose-700'
                      }`}
                    >
                      No Cumple
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(est.pasoNumero, 'NO_APLICA')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        est.cumple === 'NO_APLICA'
                          ? 'bg-slate-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      No Aplica
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(est.pasoNumero)}
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Acordeón de Evidencias y Observaciones */}
              {isExpanded && (
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-4 text-xs animate-in fade-in duration-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Evidencia Documental / Soporte Verificable:
                      </label>
                      <textarea
                        rows={2}
                        value={est.evidenciaTexto}
                        onChange={e => handleEvidenciaChange(est.pasoNumero, e.target.value)}
                        placeholder="ej. Acta de nombramiento, política firmada, plan anual 2026, carpetas de hojas de vida..."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Observaciones del Auditor / Oportunidad de Mejora:
                      </label>
                      <textarea
                        rows={2}
                        value={est.observaciones || ''}
                        onChange={e => handleObservacionChange(est.pasoNumero, e.target.value)}
                        placeholder="Hallazgos en auditoría interna, fechas límite de subsanación..."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Peso Ponderado Legal: <strong>{est.pesoPorcentual}%</strong></span>
                    <span>Guardado automático en tiempo real</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
