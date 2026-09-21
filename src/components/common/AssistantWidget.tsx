import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Sparkles,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { ActiveTab } from '../layout/Sidebar';
import { exportFullPesvExcel } from '../../utils/excelExport';

interface AssistantWidgetProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AssistantWidget: React.FC<AssistantWidgetProps> = ({ setActiveTab }) => {
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    empresa,
    vehiculos,
    conductores,
    inspecciones,
    matrizRiesgos,
    mantenimientos,
    estandares,
    autoevaluacionScore,
    alertasVehiculos,
    alertasConductores
  } = usePesv();

  const totalAlertas = alertasVehiculos.length + alertasConductores.length;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 select-none print:hidden">
      {/* Globo de Diálogo Tipo Seguros Bolívar */}
      {bubbleVisible && !modalOpen && (
        <div className="bg-[#fffdf0] border border-[#fef08a] shadow-xl rounded-2xl p-3 pr-8 relative max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => setBubbleVisible(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 p-0.5 rounded-full transition"
            title="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5">
            <div className="w-1.5 h-9 bg-[#006837] rounded-full shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#004d28] leading-tight">
                Cuénteme, ¿qué necesita?
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Soy su asistente virtual <strong className="text-[#006837]">OlivIA</strong> de Seguros Bolívar.
              </p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-2 text-[11px] font-bold text-[#006837] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver opciones rápidas</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Botón Flotante Circular Amarillo OlivIA */}
      <button
        onClick={() => setModalOpen(prev => !prev)}
        className="w-16 h-16 rounded-full bg-[#fec828] hover:bg-[#f0b500] text-[#004d28] shadow-2xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white ring-4 ring-[#fec828]/20 cursor-pointer"
        title="Asistente Virtual OlivIA - Seguros Bolívar"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-[#006837] text-[#006837]" />
          <Sparkles className="w-3 h-3 text-[#fec828] absolute -top-1 -right-1 fill-white" />
        </div>
        <span className="text-[10px] font-black tracking-tight leading-none mt-0.5">
          Oliv<span className="text-[#006837]">IA</span>
        </span>
      </button>

      {/* Modal / Menú Rápido de OlivIA */}
      {modalOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 w-80 mb-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#fec828] flex items-center justify-center text-[#004d28] font-black text-xs">
                OA
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#004d28]">Asistente OlivIA</h4>
                <p className="text-[10px] text-slate-400">Seguridad Vial Seguros Bolívar</p>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 leading-relaxed">
            Hola, con gusto le oriento en el cumplimiento de la <strong>Circular 0034</strong> y la <strong>Resolución 40595</strong>.
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => {
                setActiveTab('inspecciones');
                setModalOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-[#e8f5e9] text-xs font-medium text-slate-800 hover:text-[#006837] flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-[#006837]" />
                <span>Hacer inspección preoperacional</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setActiveTab('autoevaluacion');
                setModalOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-[#e8f5e9] text-xs font-medium text-slate-800 hover:text-[#006837] flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#006837]" />
                <span>Ver puntaje Circular 0034 ({autoevaluacionScore.puntaje}%)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setActiveTab('vehiculos');
                setModalOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-[#e8f5e9] text-xs font-medium text-slate-800 hover:text-[#006837] flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Vencimientos activos ({totalAlertas})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => {
                exportFullPesvExcel(empresa, vehiculos, conductores, inspecciones, matrizRiesgos, mantenimientos, estandares);
                setModalOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-[#006837] hover:bg-[#004d28] text-xs font-bold text-white flex items-center justify-between transition shadow-md shadow-[#006837]/20 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#fec828]" />
                <span>Descargar Libro Excel Oficial</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
