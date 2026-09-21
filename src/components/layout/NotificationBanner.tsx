import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, X, ChevronRight } from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { ActiveTab } from './Sidebar';

interface NotificationBannerProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ setActiveTab }) => {
  const { alertasVehiculos, alertasConductores, vehiculos } = usePesv();
  const [dismissed, setDismissed] = useState(false);

  const vehiculosNoAptos = vehiculos.filter(v => v.estadoOperativo === 'NO_APTO');
  const vencidosTotal = alertasVehiculos.filter(a => a.status === 'VENCIDO').length +
                        alertasConductores.filter(a => a.status === 'VENCIDO').length;
  const porVencerTotal = alertasVehiculos.filter(a => a.status === 'POR_VENCER').length +
                         alertasConductores.filter(a => a.status === 'POR_VENCER').length;

  if (dismissed || (vencidosTotal === 0 && porVencerTotal === 0 && vehiculosNoAptos.length === 0)) {
    return null;
  }

  return (
    <div className="bg-[#fffbeb] border-b border-[#fef08a] text-[#78350f] px-6 py-2.5 shadow-xs flex items-center justify-between gap-4 text-xs select-none">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-[#fec828] text-[#004d28]">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold tracking-wide uppercase text-[10px] bg-[#fec828] text-[#004d28] px-2 py-0.5 rounded-full">
            Alerta PESV:
          </span>
          {vehiculosNoAptos.length > 0 && (
            <span className="font-bold text-rose-800 underline cursor-pointer" onClick={() => setActiveTab('vehiculos')}>
              {vehiculosNoAptos.length} vehículo(s) NO APTOS para circular.
            </span>
          )}
          {vencidosTotal > 0 && (
            <span className="font-semibold text-rose-800">
              {vencidosTotal} documento(s) <strong className="bg-rose-100 px-1 py-0.5 rounded">VENCIDOS</strong> (SOAT / RTM / Licencias).
            </span>
          )}
          {porVencerTotal > 0 && (
            <span className="text-amber-800 font-medium">
              {porVencerTotal} documento(s) por vencer en &lt; 30 días.
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('vehiculos')}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#006837] text-white font-bold hover:bg-[#004d28] transition shadow-xs cursor-pointer text-[11px]"
        >
          <span>Revisar Flota</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full hover:bg-amber-200/50 text-slate-500 hover:text-slate-800 transition cursor-pointer"
          title="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
