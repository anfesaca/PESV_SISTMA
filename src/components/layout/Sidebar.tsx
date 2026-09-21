import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Truck,
  Users,
  ClipboardCheck,
  Wrench,
  MapPin,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';

export type ActiveTab =
  | 'dashboard'
  | 'indicadores'
  | 'vehiculos'
  | 'conductores'
  | 'inspecciones'
  | 'mantenimientos'
  | 'rutas'
  | 'matriz_riesgos'
  | 'reportes'
  | 'configuracion'
  | 'capacitaciones'
  | 'siniestros'
  | 'autoevaluacion';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { empresa, alertasVehiculos, alertasConductores } = usePesv();

  const totalAlertas = alertasVehiculos.length + alertasConductores.length;

  const menuItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'indicadores' as ActiveTab, label: 'Indicadores', icon: BarChart3, badge: null },
    { id: 'vehiculos' as ActiveTab, label: 'Vehículos', icon: Truck, badge: alertasVehiculos.length > 0 ? alertasVehiculos.length : null, badgeAlert: true },
    { id: 'conductores' as ActiveTab, label: 'Conductores', icon: Users, badge: alertasConductores.length > 0 ? alertasConductores.length : null, badgeAlert: true },
    { id: 'inspecciones' as ActiveTab, label: 'Inspecciones', icon: ClipboardCheck, badge: 'Diario' },
    { id: 'mantenimientos' as ActiveTab, label: 'Mantenimiento', icon: Wrench, badge: null },
    { id: 'rutas' as ActiveTab, label: 'Rutas', icon: MapPin, badge: null },
    { id: 'matriz_riesgos' as ActiveTab, label: 'Riesgos', icon: AlertTriangle, badge: null },
    { id: 'reportes' as ActiveTab, label: 'Reportes', icon: FileSpreadsheet, badge: 'Excel' },
    { id: 'configuracion' as ActiveTab, label: 'Configuración', icon: Settings, badge: null }
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col h-full shrink-0 border-r border-slate-200 shadow-xs select-none">
      {/* Cabecera del Panel */}
      <div className="p-4 border-b border-slate-100 bg-[#f8fafc]">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-4 h-4 text-[#006837]" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Sistema PESV
          </span>
        </div>
        <p className="text-xs font-bold text-slate-700 truncate" title={empresa.razonSocial}>
          {empresa.razonSocial}
        </p>
        <p className="text-[10px] text-slate-400">NIT {empresa.nit}</p>
      </div>

      {/* Lista de Navegación (10 Opciones Exactas) */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 custom-scrollbar">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#006837] text-white shadow-md shadow-[#006837]/25'
                  : 'text-slate-600 hover:bg-[#e8f5e9] hover:text-[#006837]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#fec828]' : 'text-slate-400 group-hover:text-[#006837]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    item.badgeAlert
                      ? 'bg-rose-500 text-white animate-pulse'
                      : isActive
                      ? 'bg-white/20 text-[#fec828]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Estado del Sistema */}
      <div className="p-4 border-t border-slate-100 bg-[#f8fafc]">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Alertas vigentes:</span>
          <span className={`font-bold ${totalAlertas > 0 ? 'text-rose-600' : 'text-[#006837]'}`}>
            {totalAlertas}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Plataforma conectada</span>
        </div>
      </div>
    </aside>
  );
};
