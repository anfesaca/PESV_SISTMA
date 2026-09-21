import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
  Save,
  AlertCircle
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { calculatePesvLevel } from '../../utils/pesvCalculations';
import { Badge } from '../common/Badge';

export const ConfiguracionModule: React.FC = () => {
  const { empresa, setEmpresa, diagnostico, updateDiagnostico } = usePesv();

  // Estados locales para el simulador de Diagnóstico
  const [automotores, setAutomotores] = useState(diagnostico.totalVehiculosAutomotores);
  const [motos, setMotos] = useState(diagnostico.totalMotocicletas);
  const [conductoresDirectos, setConductoresDirectos] = useState(diagnostico.totalConductoresDirectos);
  const [conductoresTerceros, setConductoresTerceros] = useState(diagnostico.totalConductoresTerceros);

  // Cálculo reactivo
  const diagCalculado = calculatePesvLevel(automotores, motos, conductoresDirectos, conductoresTerceros);

  // Estado del formulario de empresa
  const [formData, setFormData] = useState({
    nit: empresa.nit,
    razonSocial: empresa.razonSocial,
    actividadEconomica: empresa.actividadEconomica,
    direccion: empresa.direccion,
    ciudad: empresa.ciudad,
    representanteLegal: empresa.representanteLegal,
    responsablePesv: empresa.responsablePesv,
    politicaAprobada: empresa.politicaAprobada,
    comiteConformado: empresa.comiteConformado
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveEmpresa = (e: React.FormEvent) => {
    e.preventDefault();
    setEmpresa({
      ...empresa,
      ...formData
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAplicarDiagnostico = () => {
    updateDiagnostico({
      ...diagnostico,
      totalVehiculosAutomotores: automotores,
      totalMotocicletas: motos,
      totalConductoresDirectos: conductoresDirectos,
      totalConductoresTerceros: conductoresTerceros,
      clasificacionCalculada: diagCalculado.nivel,
      pasosAplicables: diagCalculado.pasos,
      fechaDiagnostico: new Date().toISOString().split('T')[0]
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>¡Datos de configuración y diagnóstico PESV actualizados correctamente!</span>
        </div>
      )}

      {/* Sección 1: Diagnóstico Automático (Resolución 40595 de 2022) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-800">
                Paso 5: Motor de Diagnóstico y Clasificación Legal del PESV
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cálculo automatizado del nivel de diseño (Básico, Estándar o Avanzado) según Capítulo I de la Res. 40595 de 2022.
            </p>
          </div>
          <Badge variant={diagCalculado.nivel === 'AVANZADO' ? 'purple' : diagCalculado.nivel === 'ESTANDAR' ? 'info' : 'success'}>
            Nivel: {diagCalculado.nivel} ({diagCalculado.pasos} pasos)
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Inputs de cálculo */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Caracterización de Flota y Conductores
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Vehículos Automotores (Camiones/Autos)
                </label>
                <input
                  type="number"
                  min="0"
                  value={automotores}
                  onChange={e => setAutomotores(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Motocicletas al servicio de la entidad
                </label>
                <input
                  type="number"
                  min="0"
                  value={motos}
                  onChange={e => setMotos(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Conductores Directos / Nómina
                </label>
                <input
                  type="number"
                  min="0"
                  value={conductoresDirectos}
                  onChange={e => setConductoresDirectos(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Conductores Contratistas / Terceros
                </label>
                <input
                  type="number"
                  min="0"
                  value={conductoresTerceros}
                  onChange={e => setConductoresTerceros(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div>
                <span className="font-semibold">Flota Total Combinada: </span>
                <strong className="text-slate-900">{automotores + motos} unidades</strong>
              </div>
              <div>
                <span className="font-semibold">Personal de Conducción: </span>
                <strong className="text-slate-900">{conductoresDirectos + conductoresTerceros} personas</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAplicarDiagnostico}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Aplicar Clasificación Oficial al Sistema</span>
            </button>
          </div>

          {/* Resultado de clasificación oficial */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                  Dictamen Legal Normativo
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Res. 40595/2022
                </span>
              </div>

              <h4 className="text-2xl font-black mt-2 text-white">NIVEL {diagCalculado.nivel}</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {diagCalculado.descripcion}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Pasos obligatorios:</span>
                  <strong className="text-white font-bold">{diagCalculado.pasos} de 24 pasos</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Frecuencia auditoría:</span>
                  <strong className="text-white font-bold">
                    {diagCalculado.nivel === 'AVANZADO' ? 'Semestral' : 'Anual'}
                  </strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Comité de Seguridad Vial:</span>
                  <strong className="text-emerald-400 font-bold">
                    {diagCalculado.nivel === 'BASICO' ? 'Opcional / Recomendado' : 'Obligatorio por Ley'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-lg bg-white/10 text-[11px] text-slate-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Al aplicar, el sistema adapta automáticamente la autoevaluación anual y los módulos operacionales correspondientes.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2: Datos Maestros de la Empresa (Paso 1, 2, 3 y 4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Paso 1 al 4: Información Corporativa y Gobernanza Vial
              </h3>
              <p className="text-xs text-slate-500">Designación de líderes, comités y compromiso de la alta dirección</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveEmpresa} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Razón Social</label>
              <input
                type="text"
                required
                value={formData.razonSocial}
                onChange={e => setFormData({ ...formData, razonSocial: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIT</label>
              <input
                type="text"
                required
                value={formData.nit}
                onChange={e => setFormData({ ...formData, nit: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Actividad Económica (CIIU)</label>
              <input
                type="text"
                value={formData.actividadEconomica}
                onChange={e => setFormData({ ...formData, actividadEconomica: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad / Municipio</label>
              <input
                type="text"
                value={formData.ciudad}
                onChange={e => setFormData({ ...formData, ciudad: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dirección Principal</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Representante Legal (Paso 4)</label>
              <input
                type="text"
                value={formData.representanteLegal}
                onChange={e => setFormData({ ...formData, representanteLegal: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Líder Responsable del PESV (Paso 1 - Licencia SST / Idoneidad)
              </label>
              <input
                type="text"
                value={formData.responsablePesv}
                onChange={e => setFormData({ ...formData, responsablePesv: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.politicaAprobada}
                  onChange={e => setFormData({ ...formData, politicaAprobada: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-medium text-slate-700">Paso 3: Política de Seguridad Vial Aprobada y Divulgada</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.comiteConformado}
                  onChange={e => setFormData({ ...formData, comiteConformado: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-medium text-slate-700">Paso 2: Comité de Seguridad Vial Formalmente Activo</span>
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Configuración Legal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
