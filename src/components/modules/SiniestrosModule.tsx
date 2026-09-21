import React, { useState } from 'react';
import {
  Siren,
  Plus,
  Search,
  AlertTriangle,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { Siniestro, GravedadSiniestro } from '../../types/pesv';
import { formatCOP } from '../../utils/pesvCalculations';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const SiniestrosModule: React.FC = () => {
  const { siniestros, addSiniestro, updateSiniestro, vehiculos, conductores, rutas } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSin, setEditingSin] = useState<Siniestro | null>(null);

  const initialForm: Omit<Siniestro, 'id'> = {
    empresaId: 'emp-001',
    vehiculoId: vehiculos[0]?.id || '',
    conductorId: conductores[0]?.id || '',
    rutaId: rutas[0]?.id || '',
    fechaHora: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ubicacion: '',
    gravedad: 'SOLO_DANOS',
    descripcionHechos: '',
    causaInmediata: '',
    causaRaiz: '',
    diasIncapacidad: 0,
    costoEstimado: 0,
    estadoInvestigacion: 'ABIERTA',
    planAccionLecciones: ''
  };

  const [formData, setFormData] = useState<Omit<Siniestro, 'id'>>(initialForm);

  const openCreateModal = () => {
    setEditingSin(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Siniestro) => {
    setEditingSin(s);
    setFormData({
      empresaId: s.empresaId,
      vehiculoId: s.vehiculoId,
      conductorId: s.conductorId,
      rutaId: s.rutaId || '',
      fechaHora: s.fechaHora,
      ubicacion: s.ubicacion,
      gravedad: s.gravedad,
      descripcionHechos: s.descripcionHechos,
      causaInmediata: s.causaInmediata,
      causaRaiz: s.causaRaiz,
      diasIncapacidad: s.diasIncapacidad,
      costoEstimado: s.costoEstimado,
      estadoInvestigacion: s.estadoInvestigacion,
      planAccionLecciones: s.planAccionLecciones
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSin) {
      updateSiniestro({ ...formData, id: editingSin.id });
    } else {
      addSiniestro(formData);
    }
    setIsModalOpen(false);
  };

  const filteredSiniestros = siniestros.filter(s => {
    const veh = vehiculos.find(v => v.id === s.vehiculoId);
    const cond = conductores.find(c => c.id === s.conductorId);
    const text = `${veh?.placa} ${cond?.nombres} ${s.ubicacion} ${s.descripcionHechos}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Siren className="w-5 h-5 text-rose-600" />
            Investigación y Registro de Siniestros Viales (Paso 13 y 21)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Análisis de causas inmediatas y raíz (Ishikawa), lecciones aprendidas y cálculo de siniestralidad
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Reportar Nuevo Siniestro</span>
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {filteredSiniestros.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">¡Cero siniestros registrados!</p>
            <p className="text-xs text-slate-500">La flota mantiene un índice de seguridad vial óptimo.</p>
          </div>
        ) : (
          filteredSiniestros.map(s => {
            const veh = vehiculos.find(v => v.id === s.vehiculoId);
            const cond = conductores.find(c => c.id === s.conductorId);
            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-900 text-amber-300">
                      {veh ? veh.placa : s.vehiculoId}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Conductor: {cond ? `${cond.nombres} ${cond.apellidos}` : s.conductorId}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{s.fechaHora}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={s.gravedad === 'FATAL' ? 'danger' : s.gravedad === 'CON_HERIDOS' ? 'warning' : 'neutral'}>
                      {s.gravedad.replace(/_/g, ' ')}
                    </Badge>
                    <Badge variant={s.estadoInvestigacion === 'CERRADA' ? 'success' : 'info'}>
                      Investigación {s.estadoInvestigacion}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">Ubicación: <span className="font-normal text-slate-600">{s.ubicacion}</span></p>
                  <p className="text-xs text-slate-700 mt-1">{s.descripcionHechos}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900">Causa Inmediata:</p>
                    <p className="text-slate-600 mt-0.5">{s.causaInmediata}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900">Causa Raíz (Árbol de Causas):</p>
                    <p className="text-slate-600 mt-0.5">{s.causaRaiz}</p>
                  </div>
                </div>

                {s.planAccionLecciones && (
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                    <p className="font-bold">Lecciones Aprendidas y Plan de Acción:</p>
                    <p className="mt-0.5">{s.planAccionLecciones}</p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Impacto económico: <strong className="text-slate-900">{formatCOP(s.costoEstimado)}</strong></span>
                  <button
                    onClick={() => openEditModal(s)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer"
                  >
                    Actualizar Investigación
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSin ? 'Editar Investigación de Siniestro' : 'Registrar Nuevo Siniestro Vial'}
        subtitle="Protocolo de investigación según el Paso 13 de la Resolución 40595"
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Vehículo Involucrado *</label>
              <select
                value={formData.vehiculoId}
                onChange={e => setFormData({ ...formData, vehiculoId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white font-bold"
              >
                {vehiculos.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.placa} ({v.marca} {v.linea})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Conductor Involucrado *</label>
              <select
                value={formData.conductorId}
                onChange={e => setFormData({ ...formData, conductorId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white"
              >
                {conductores.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombres} {c.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha y Hora *</label>
              <input
                type="text"
                required
                value={formData.fechaHora}
                onChange={e => setFormData({ ...formData, fechaHora: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ubicación del Accidente *</label>
              <input
                type="text"
                required
                placeholder="ej. Km 18 Vía al Mar, curva sector Dagua"
                value={formData.ubicacion}
                onChange={e => setFormData({ ...formData, ubicacion: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gravedad del Evento</label>
              <select
                value={formData.gravedad}
                onChange={e => setFormData({ ...formData, gravedad: e.target.value as GravedadSiniestro })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white font-bold"
              >
                <option value="SOLO_DANOS">Solo Daños Materiales</option>
                <option value="CON_HERIDOS">Con Personas Lesionadas</option>
                <option value="FATAL">Con Víctimas Fatales</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción de los Hechos *</label>
              <textarea
                rows={2}
                required
                value={formData.descripcionHechos}
                onChange={e => setFormData({ ...formData, descripcionHechos: e.target.value })}
                placeholder="Describe cómo sucedió el siniestro, condiciones climáticas, estado de la vía..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Causa Inmediata (Acto o Condición)</label>
              <input
                type="text"
                placeholder="ej. Distancia de seguimiento insuficiente"
                value={formData.causaInmediata}
                onChange={e => setFormData({ ...formData, causaInmediata: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Causa Raíz (Falla del Sistema)</label>
              <input
                type="text"
                placeholder="ej. Fatiga por falta de relevo en turno extendido"
                value={formData.causaRaiz}
                onChange={e => setFormData({ ...formData, causaRaiz: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Costo Estimado (COP)</label>
              <input
                type="number"
                min="0"
                value={formData.costoEstimado}
                onChange={e => setFormData({ ...formData, costoEstimado: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Plan de Acción y Lecciones Aprendidas</label>
              <textarea
                rows={2}
                value={formData.planAccionLecciones}
                onChange={e => setFormData({ ...formData, planAccionLecciones: e.target.value })}
                placeholder="Medidas adoptadas para evitar recurrencia y divulgación a la flota..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado de Investigación</label>
              <select
                value={formData.estadoInvestigacion}
                onChange={e => setFormData({ ...formData, estadoInvestigacion: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 bg-white font-bold"
              >
                <option value="ABIERTA">ABIERTA (En recopilación)</option>
                <option value="EN_ANALISIS">EN ANÁLISIS POR COMITÉ</option>
                <option value="CERRADA">CERRADA CON LECCIONES</option>
              </select>
            </div>
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
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition cursor-pointer"
            >
              {editingSin ? 'Guardar Cambios' : 'Registrar Siniestro'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
