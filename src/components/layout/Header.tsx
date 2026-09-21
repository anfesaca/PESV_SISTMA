import React, { useState } from 'react';
import {
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Bell,
  ShieldCheck,
  Award
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { ActiveTab } from './Sidebar';
import { BolivarLogo } from '../common/BolivarLogo';
import { exportFullPesvExcel } from '../../utils/excelExport';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const {
    empresa,
    currentUsuario,
    autoevaluacionScore,
    alertasVehiculos,
    alertasConductores,
    vehiculos,
    conductores,
    inspecciones,
    matrizRiesgos,
    mantenimientos,
    estandares
  } = usePesv();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const totalAlertas = alertasVehiculos.length + alertasConductores.length;

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const handleExport = () => {
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo Seguros Bolívar */}
        <div
          className="cursor-pointer shrink-0"
          onClick={() => setActiveTab('dashboard')}
          title="Ir al inicio - Sistema PESV Seguros Bolívar"
        >
          <BolivarLogo size="lg" />
        </div>

        {/* Menú de Navegación Horizontal con estilo sobrio y elegante */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700">
          {/* Categoría: Personas */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('personas')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer border ${
                activeTab === 'conductores' || activeTab === 'capacitaciones'
                  ? 'bg-[#e8f5e9] text-[#006837] border-[#c8e6c9] font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>Personas</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {openDropdown === 'personas' && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setActiveTab('conductores');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Conductores & Licencias
                </button>
                <button
                  onClick={() => {
                    setActiveTab('capacitaciones');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Plan de Capacitaciones
                </button>
              </div>
            )}
          </div>

          {/* Categoría: Empresas */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('empresas')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer border ${
                activeTab === 'vehiculos' || activeTab === 'rutas' || activeTab === 'mantenimientos'
                  ? 'bg-[#e8f5e9] text-[#006837] border-[#c8e6c9] font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>Empresas</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {openDropdown === 'empresas' && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setActiveTab('vehiculos');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Flota Vehicular & SOAT
                </button>
                <button
                  onClick={() => {
                    setActiveTab('rutas');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Rutogramas & Vías
                </button>
                <button
                  onClick={() => {
                    setActiveTab('mantenimientos');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Plan de Mantenimiento
                </button>
              </div>
            )}
          </div>

          {/* Categoría: ARL / Seguridad */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('arl')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer border ${
                activeTab === 'matriz_riesgos' || activeTab === 'inspecciones' || activeTab === 'siniestros'
                  ? 'bg-[#e8f5e9] text-[#006837] border-[#c8e6c9] font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>ARL &amp; Prevención</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {openDropdown === 'arl' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setActiveTab('matriz_riesgos');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Matriz de Riesgos Viales PxI
                </button>
                <button
                  onClick={() => {
                    setActiveTab('inspecciones');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Inspección Preoperacional Diaria
                </button>
                <button
                  onClick={() => {
                    setActiveTab('siniestros');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Investigación de Siniestros
                </button>
              </div>
            )}
          </div>

          {/* Categoría: Soluciones */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('soluciones')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer border ${
                activeTab === 'autoevaluacion' || activeTab === 'configuracion' || activeTab === 'reportes' || activeTab === 'indicadores'
                  ? 'bg-[#e8f5e9] text-[#006837] border-[#c8e6c9] font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span>Soluciones</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {openDropdown === 'soluciones' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setActiveTab('configuracion');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Diagnóstico Automático (Res. 40595)
                </button>
                <button
                  onClick={() => {
                    setActiveTab('indicadores');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Indicadores de Gestión Vial
                </button>
                <button
                  onClick={() => {
                    setActiveTab('autoevaluacion');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Circular 0034 (24 Pasos)
                </button>
                <button
                  onClick={() => {
                    setActiveTab('reportes');
                    setOpenDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#e8f5e9] hover:text-[#006837] font-medium transition cursor-pointer"
                >
                  Certificado &amp; Exportación
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Acciones del Extremo Derecho */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Botón Reportes Excel con icono de documento */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#006837] bg-white hover:bg-[#e8f5e9] text-[#006837] text-xs font-bold transition shadow-xs cursor-pointer"
            title="Exportar base de datos consolidada a Excel"
          >
            <FileText className="w-4 h-4 text-[#006837]" />
            <span>Reportes Excel</span>
          </button>
        </div>
      </div>
    </header>
  );
};
