import React, { useState } from 'react';
import {
  ClipboardCheck,
  Plus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Camera,
  Car,
  User,
  Gauge,
  PenTool,
  Search,
  Filter
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import {
  InspeccionPreoperacional,
  EstadoInspeccion,
  DecisionInspeccion
} from '../../types/pesv';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const InspeccionPreoperacionalModule: React.FC = () => {
  const { inspecciones, addInspeccion, vehiculos, conductores } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDecision, setFilterDecision] = useState<string>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const initialForm: Omit<InspeccionPreoperacional, 'id'> = {
    empresaId: 'emp-001',
    vehiculoId: vehiculos[0]?.id || '',
    conductorId: conductores[0]?.id || '',
    fechaHora: new Date().toISOString().replace('T', ' ').substring(0, 19),
    kilometraje: 0,
    frenosServicio: 'BUENO',
    frenoParqueo: 'BUENO',
    lucesDelanteras: 'BUENO',
    lucesTraserasFreno: 'BUENO',
    direccionales: 'BUENO',
    estadoLlantasLabrado: 'BUENO',
    presionLlantas: 'BUENO',
    nivelAceiteMotor: 'BUENO',
    nivelRefrigerante: 'BUENO',
    nivelLiquidoFrenos: 'BUENO',
    cinturonesSeguridad: 'BUENO',
    limpiabrisas: 'BUENO',
    espejosRetrovisores: 'BUENO',
    fugaFluidos: false,
    kitCarreteraCompleto: true,
    botiquinVigente: true,
    extintorVigente: true,
    decision: 'APROBADO',
    observaciones: '',
    firmaConductor: ''
  };

  const [formData, setFormData] = useState<Omit<InspeccionPreoperacional, 'id'>>(initialForm);

  // Cada vez que cambia el vehículo seleccionado en el form, precargar su kilometraje actual
  const handleVehiculoChange = (vehId: string) => {
    const sel = vehiculos.find(v => v.id === vehId);
    setFormData({
      ...formData,
      vehiculoId: vehId,
      kilometraje: sel ? sel.kilometrajeActual : formData.kilometraje,
      conductorId: sel?.conductorHabitualId || formData.conductorId
    });
  };

  // Cálculo automático de la decisión según fallas críticas
  const esFallaCritica =
    formData.frenosServicio === 'MALO' ||
    formData.nivelLiquidoFrenos === 'MALO' ||
    formData.estadoLlantasLabrado === 'MALO' ||
    formData.fugaFluidos === true;

  const decisionCalculada: DecisionInspeccion = esFallaCritica ? 'RECHAZADO_CRITICO' : 'APROBADO';

  const openModal = () => {
    const primerVeh = vehiculos[0];
    setFormData({
      ...initialForm,
      vehiculoId: primerVeh?.id || '',
      kilometraje: primerVeh ? primerVeh.kilometrajeActual : 0,
      conductorId: primerVeh?.conductorHabitualId || conductores[0]?.id || '',
      fechaHora: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cond = conductores.find(c => c.id === formData.conductorId);
    const nombreFirma = cond ? `${cond.nombres} ${cond.apellidos} (Verificado digitalmente)` : 'Conductor Asignado';

    addInspeccion({
      ...formData,
      decision: decisionCalculada,
      firmaConductor: formData.firmaConductor || nombreFirma
    });

    setIsModalOpen(false);
  };

  const filteredInspecciones = inspecciones.filter(i => {
    const veh = vehiculos.find(v => v.id === i.vehiculoId);
    const cond = conductores.find(c => c.id === i.conductorId);
    const searchString = `${veh?.placa} ${cond?.nombres} ${cond?.apellidos} ${i.observaciones}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesDecision = filterDecision === 'TODOS' || i.decision === filterDecision;
    return matchesSearch && matchesDecision;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-[#006837]" />
            Inspección Preoperacional Diaria (Paso 16 del PESV)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verificación obligatoria de 10 sistemas críticos antes de marcha con inmovilización inmediata ante fallas
          </p>
        </div>

        <button
          onClick={openModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006837] hover:bg-[#004d28] text-white text-xs font-bold shadow-md shadow-[#006837]/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#fec828]" />
          <span>Nueva Inspección de Salida</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por placa, conductor o hallazgo..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterDecision}
            onChange={e => setFilterDecision(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="APROBADO">Aprobados para Operar</option>
            <option value="RECHAZADO_CRITICO">Rechazados por Falla Crítica</option>
          </select>
        </div>
      </div>

      {/* Tabla de Historial de Inspecciones */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] bg-slate-50/60">
                <th className="py-3 px-4">Fecha y Hora</th>
                <th className="py-3 px-4">Vehículo</th>
                <th className="py-3 px-4">Conductor Responsable</th>
                <th className="py-3 px-4">Kilometraje</th>
                <th className="py-3 px-4">Frenos</th>
                <th className="py-3 px-4">Llantas</th>
                <th className="py-3 px-4">Fluidos & Fugas</th>
                <th className="py-3 px-4">Kit & Botiquín</th>
                <th className="py-3 px-4">Decisión</th>
                <th className="py-3 px-4">Observaciones & Hallazgos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInspecciones.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 text-xs">
                    No hay inspecciones registradas con ese criterio.
                  </td>
                </tr>
              ) : (
                filteredInspecciones.map(i => {
                  const veh = vehiculos.find(v => v.id === i.vehiculoId);
                  const cond = conductores.find(c => c.id === i.conductorId);
                  const esRechazado = i.decision === 'RECHAZADO_CRITICO';

                  return (
                    <tr key={i.id} className={`hover:bg-slate-50/80 transition-colors ${esRechazado ? 'bg-rose-50/30' : ''}`}>
                      <td className="py-3 px-4 font-mono text-slate-600">{i.fechaHora}</td>
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300">
                          {veh ? veh.placa : i.vehiculoId}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {cond ? `${cond.nombres} ${cond.apellidos}` : i.conductorId}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700">
                        {i.kilometraje.toLocaleString()} km
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          i.frenosServicio === 'BUENO' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {i.frenosServicio}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          i.estadoLlantasLabrado === 'BUENO' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {i.estadoLlantasLabrado}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {i.fugaFluidos ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-100 text-red-800 border border-red-300">
                            FUGA ACTIVA
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700">
                            Sin Fugas
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {i.kitCarreteraCompleto && i.botiquinVigente && i.extintorVigente ? (
                          <span className="text-emerald-600 font-bold">100% Completo</span>
                        ) : (
                          <span className="text-amber-600 font-bold">Incompleto</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={i.decision === 'APROBADO' ? 'success' : 'danger'}>
                          {i.decision === 'APROBADO' ? 'APROBADO' : 'NO APTO (RECHAZO)'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-500" title={i.observaciones}>
                        {i.observaciones || 'Sin novedades reportadas'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Formulario de Inspección */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva Inspección Diaria Preoperacional"
        subtitle="Diligenciamiento obligatorio previo a la salida de patio (Resolución 40595 - Paso 16)"
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Vehículo a Inspeccionar *</label>
              <select
                value={formData.vehiculoId}
                onChange={e => handleVehiculoChange(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white font-bold"
              >
                {vehiculos.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.placa} - {v.marca} {v.linea} ({v.tipo})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Conductor Responsable *</label>
              <select
                value={formData.conductorId}
                onChange={e => setFormData({ ...formData, conductorId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {conductores.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombres} {c.apellidos} (C.C. {c.cedula})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kilometraje Inicial al Salir *</label>
              <input
                type="number"
                required
                value={formData.kilometraje}
                onChange={e => setFormData({ ...formData, kilometraje: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
            </div>
          </div>

          {/* Bloque de Verificación Mecánica */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Lista de Chequeo Mecánico y de Seguridad</span>
              <span className="text-[11px] font-normal text-rose-600">
                * Fallas en frenos, llantas o fuga bloquean automáticamente el vehículo
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Frenos Servicio */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-semibold text-slate-800 mb-1">1. Frenos de Servicio</label>
                <select
                  value={formData.frenosServicio}
                  onChange={e => setFormData({ ...formData, frenosServicio: e.target.value as EstadoInspeccion })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="BUENO">Bueno (Efectivo)</option>
                  <option value="REGULAR">Regular</option>
                  <option value="MALO">MALO (Pérdida de presión)</option>
                </select>
              </div>

              {/* Freno Parqueo */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-semibold text-slate-800 mb-1">2. Freno de Seguridad / Parqueo</label>
                <select
                  value={formData.frenoParqueo}
                  onChange={e => setFormData({ ...formData, frenoParqueo: e.target.value as EstadoInspeccion })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="BUENO">Bueno (Inmoviliza al 100%)</option>
                  <option value="REGULAR">Regular</option>
                  <option value="MALO">Malo</option>
                </select>
              </div>

              {/* Labrado Llantas */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-semibold text-slate-800 mb-1">3. Labrado Llantas (&gt; 2mm)</label>
                <select
                  value={formData.estadoLlantasLabrado}
                  onChange={e => setFormData({ ...formData, estadoLlantasLabrado: e.target.value as EstadoInspeccion })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="BUENO">Bueno (Profundidad legal)</option>
                  <option value="REGULAR">Regular</option>
                  <option value="MALO">MALO (Lisas / Deformadas)</option>
                </select>
              </div>

              {/* Líquido Frenos */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-semibold text-slate-800 mb-1">4. Nivel Líquido de Frenos</label>
                <select
                  value={formData.nivelLiquidoFrenos}
                  onChange={e => setFormData({ ...formData, nivelLiquidoFrenos: e.target.value as EstadoInspeccion })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="BUENO">Bueno (Nivel óptimo)</option>
                  <option value="REGULAR">Bajo</option>
                  <option value="MALO">CRÍTICO (Vacío / Fuga)</option>
                </select>
              </div>

              {/* Luces y Direccionales */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-semibold text-slate-800 mb-1">5. Luces y Direccionales</label>
                <select
                  value={formData.lucesDelanteras}
                  onChange={e => setFormData({ ...formData, lucesDelanteras: e.target.value as EstadoInspeccion })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="BUENO">Bueno (100% operativas)</option>
                  <option value="REGULAR">Regular (Bombillo fundido)</option>
                  <option value="MALO">Malo</option>
                </select>
              </div>

              {/* Cinturones */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <label className="block text-xs font-semibold text-slate-800 mb-1">6. Cinturones de Seguridad</label>
                <select
                  value={formData.cinturonesSeguridad}
                  onChange={e => setFormData({ ...formData, cinturonesSeguridad: e.target.value as EstadoInspeccion })}
                  className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white font-medium"
                >
                  <option value="BUENO">Bueno (Anclaje seguro)</option>
                  <option value="MALO">Malo (Deteriorado)</option>
                </select>
              </div>
            </div>

            {/* Checkboxes de seguridad y fugas */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                <input
                  type="checkbox"
                  checked={formData.fugaFluidos}
                  onChange={e => setFormData({ ...formData, fugaFluidos: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded"
                />
                <span>¿Presenta Fuga Visible de Aceite, Agua o Combustible?</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.kitCarreteraCompleto}
                  onChange={e => setFormData({ ...formData, kitCarreteraCompleto: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span>Kit de Carretera Completo</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.botiquinVigente}
                  onChange={e => setFormData({ ...formData, botiquinVigente: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span>Botiquín Vigente</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.extintorVigente}
                  onChange={e => setFormData({ ...formData, extintorVigente: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span>Extintor con Carga Vigente</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observaciones, Hallazgos o Desperfectos
            </label>
            <textarea
              rows={2}
              placeholder="Escribe aquí cualquier sonido extraño, vibración o anomalía..."
              value={formData.observaciones}
              onChange={e => setFormData({ ...formData, observaciones: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Banner de Decisión Automática del Sistema */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            decisionCalculada === 'APROBADO'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <div className="flex items-center gap-3">
              {decisionCalculada === 'APROBADO' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600" />
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Decisión del Sistema: {decisionCalculada === 'APROBADO' ? 'APTO PARA MARCHA' : 'INMOVILIZACIÓN INMEDIATA (RECHAZADO)'}
                </p>
                <p className="text-[11px] opacity-90">
                  {decisionCalculada === 'APROBADO'
                    ? 'Todos los sistemas críticos cumplen con los estándares de seguridad.'
                    : 'Falla crítica detectada en frenos, labrado de llantas o fuga de fluidos. El vehículo no puede salir a carretera.'}
                </p>
              </div>
            </div>

            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase ${
              decisionCalculada === 'APROBADO' ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
            }`}>
              {decisionCalculada}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              Firmar y Registrar Inspección
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
