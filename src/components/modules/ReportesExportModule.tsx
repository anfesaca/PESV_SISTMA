import React from 'react';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Printer,
  ShieldCheck,
  FileText,
  Building2,
  Truck,
  Users,
  AlertTriangle
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { exportFullPesvExcel } from '../../utils/excelExport';

export const ReportesExportModule: React.FC = () => {
  const {
    empresa,
    vehiculos,
    conductores,
    inspecciones,
    matrizRiesgos,
    mantenimientos,
    estandares,
    autoevaluacionScore
  } = usePesv();

  const handleExportExcel = () => {
    exportFullPesvExcel(
      empresa,
      vehiculos,
      conductores,
      inspecciones,
      matrizRiesgos,
      mantenimientos,
      estandares
    );
  };

  return (
    <div className="space-y-6">
      {/* Banner Principal de Exportación */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-950 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <FileSpreadsheet className="w-4 h-4" /> Instrumento Dinámico Oficial
          </div>
          <h3 className="text-xl font-bold tracking-tight">Exportación Consolidada de Datos PESV</h3>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Genera un libro oficial en formato Microsoft Excel (.xlsx) con 10+ hojas de cálculo interconectadas listas para requerimientos del Ministerio de Transporte, SuperTransporte o ARL.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-black shadow-lg shadow-black/20 transition cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>Descargar Libro Excel Completo (.xlsx)</span>
        </button>
      </div>

      {/* Tarjetas Informativas de Contenido del Libro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hoja 1: Datos de Empresa</h4>
              <p className="text-[11px] text-slate-500">Razón social, NIT, nivel PESV y representantes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hoja 2: Flota Vehicular</h4>
              <p className="text-[11px] text-slate-500">Inventario, SOAT, RTM y estado mecánico</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hoja 3: Conductores</h4>
              <p className="text-[11px] text-slate-500">Licencias, exámenes médicos y vinculaciones</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hoja 4: Preoperacionales</h4>
              <p className="text-[11px] text-slate-500">Historial diario de 10 puntos mecánicos</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hoja 5: Matriz de Riesgos</h4>
              <p className="text-[11px] text-slate-500">Valoración P x I y jerarquía de controles</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hoja 6: Circular 0034</h4>
              <p className="text-[11px] text-slate-500">Los 24 pasos y ponderación oficial</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vista Previa de Dictamen Imprimible */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 print:border-none print:shadow-none">
        <div className="border-b border-slate-200 pb-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Informe de Autoevaluación y Cumplimiento PESV
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Conforme a la Circular 0034 de 2022 y Resolución 40595 de 2022 (Ministerio de Transporte)
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-slate-400 font-semibold uppercase text-[10px]">Empresa:</p>
            <p className="font-bold text-slate-800">{empresa.razonSocial}</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold uppercase text-[10px]">NIT:</p>
            <p className="font-bold text-slate-800 font-mono">{empresa.nit}</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold uppercase text-[10px]">Nivel PESV:</p>
            <p className="font-bold text-blue-600 uppercase">{empresa.nivelPesv}</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold uppercase text-[10px]">Puntaje Final:</p>
            <p className="font-bold text-emerald-600 text-sm">{autoevaluacionScore.puntaje}% ({autoevaluacionScore.nivelAlcanzado})</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div>
            <p className="font-bold text-slate-900 mb-1">Representante Legal:</p>
            <p>{empresa.representanteLegal}</p>
            <div className="mt-8 pt-2 border-t border-slate-300 w-48 text-[11px] text-slate-500">
              Firma Representante Legal
            </div>
          </div>

          <div>
            <p className="font-bold text-slate-900 mb-1">Responsable del PESV:</p>
            <p>{empresa.responsablePesv}</p>
            <div className="mt-8 pt-2 border-t border-slate-300 w-48 text-[11px] text-slate-500">
              Firma Líder PESV (Lic. SST)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
