import React, { useState } from 'react';
import { PesvProvider } from './context/PesvContext';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NotificationBanner } from './components/layout/NotificationBanner';
import { DashboardOverview } from './components/modules/DashboardOverview';
import { ConfiguracionModule } from './components/modules/ConfiguracionModule';
import { VehiculosModule } from './components/modules/VehiculosModule';
import { ConductoresModule } from './components/modules/ConductoresModule';
import { RutasModule } from './components/modules/RutasModule';
import { MatrizRiesgosModule } from './components/modules/MatrizRiesgosModule';
import { InspeccionPreoperacionalModule } from './components/modules/InspeccionPreoperacionalModule';
import { MantenimientoModule } from './components/modules/MantenimientoModule';
import { CapacitacionModule } from './components/modules/CapacitacionModule';
import { SiniestrosModule } from './components/modules/SiniestrosModule';
import { AutoevaluacionCircular0034 } from './components/modules/AutoevaluacionCircular0034';
import { ReportesExportModule } from './components/modules/ReportesExportModule';
import { IndicadoresModule } from './components/modules/IndicadoresModule';

import { AssistantWidget } from './components/common/AssistantWidget';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f8fafc] font-sans text-slate-800">
      {/* Cabecera Superior Corporativa Seguros Bolívar (Full Width) */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Banner de Alertas Críticas de Vencimientos / Inmovilizaciones */}
      <NotificationBanner setActiveTab={setActiveTab} />

      {/* Cuerpo: Barra Lateral y Contenido Principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar de Navegación de 12 Módulos (Estilo Blanco & Verde Institucional) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Contenido Dinámico según Módulo Seleccionado */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto pb-12">
            {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
            {activeTab === 'indicadores' && <IndicadoresModule />}
            {activeTab === 'configuracion' && <ConfiguracionModule />}
            {activeTab === 'vehiculos' && <VehiculosModule />}
            {activeTab === 'conductores' && <ConductoresModule />}
            {activeTab === 'rutas' && <RutasModule />}
            {activeTab === 'matriz_riesgos' && <MatrizRiesgosModule />}
            {activeTab === 'inspecciones' && <InspeccionPreoperacionalModule />}
            {activeTab === 'mantenimientos' && <MantenimientoModule />}
            {activeTab === 'capacitaciones' && <CapacitacionModule />}
            {activeTab === 'siniestros' && <SiniestrosModule />}
            {activeTab === 'autoevaluacion' && <AutoevaluacionCircular0034 />}
            {activeTab === 'reportes' && <ReportesExportModule />}
          </div>
        </main>
      </div>

      {/* Asistente Virtual Flotante OlivIA (Seguros Bolívar) */}
      <AssistantWidget setActiveTab={setActiveTab} />
    </div>
  );
};

export default function App() {
  return (
    <PesvProvider>
      <MainApp />
    </PesvProvider>
  );
}

