import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { getDocumentStatus } from '../../utils/pesvCalculations';

interface TrafficLightBadgeProps {
  fechaVencimiento: string;
  tipoDocumento?: string;
}

export const TrafficLightBadge: React.FC<TrafficLightBadgeProps> = ({
  fechaVencimiento,
  tipoDocumento
}) => {
  const { status, diasRestantes, label } = getDocumentStatus(fechaVencimiento);

  if (status === 'VIGENTE') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
        <span>{tipoDocumento ? `${tipoDocumento}: ` : ''}{label}</span>
      </span>
    );
  }

  if (status === 'POR_VENCER') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
        <span>{tipoDocumento ? `${tipoDocumento}: ` : ''}{label}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-300">
      <AlertOctagon className="w-3 h-3 text-rose-600 shrink-0" />
      <span>{tipoDocumento ? `${tipoDocumento}: ` : ''}{label}</span>
    </span>
  );
};
