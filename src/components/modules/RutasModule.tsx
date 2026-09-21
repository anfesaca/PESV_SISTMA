import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Search,
  AlertTriangle,
  Clock,
  Gauge,
  Edit2,
  Trash2,
  Milestone
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { Ruta } from '../../types/pesv';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const RutasModule: React.FC = () => {
  const { rutas, addRuta, updateRuta, deleteRuta } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRuta, setEditingRuta] = useState<Ruta | null>(null);

  const initialForm: Omit<Ruta, 'id'> = {
    empresaId: 'emp-001',
    codigo: '',
    nombre: '',
    origen: '',
    destino: '',
    distanciaKm: 50,
    tiempoEstimadoMin: 60,
    tipoVia: 'TRONCAL',
    puntosCriticos: ['Sector de curvas peligrosas'],
    velocidadMaxSugeridaKmH: 60,
    nivelRiesgoRuta: 'MEDIO'
  };

  const [formData, setFormData] = useState<Omit<Ruta, 'id'>>(initialForm);
  const [puntosTexto, setPuntosTexto] = useState('');

  const openCreateModal = () => {
    setEditingRuta(null);
    setFormData(initialForm);
    setPuntosTexto('Sector de curvas peligrosas\nPaso urbano congestionado');
    setIsModalOpen(true);
  };

  const openEditModal = (r: Ruta) => {
    setEditingRuta(r);
    setFormData({
      empresaId: r.empresaId,
      codigo: r.codigo,
      nombre: r.nombre,
      origen: r.origen,
      destino: r.destino,
      distanciaKm: r.distanciaKm,
      tiempoEstimadoMin: r.tiempoEstimadoMin,
      tipoVia: r.tipoVia,
      puntosCriticos: r.puntosCriticos,
      velocidadMaxSugeridaKmH: r.velocidadMaxSugeridaKmH,
      nivelRiesgoRuta: r.nivelRiesgoRuta
    });
    setPuntosTexto(r.puntosCriticos.join('\n'));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const puntosArray = puntosTexto
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const payload = {
      ...formData,
      puntosCriticos: puntosArray
    };

    if (editingRuta) {
      updateRuta({ ...payload, id: editingRuta.id });
    } else {
      addRuta(payload);
    }
    setIsModalOpen(false);
  };

  const filteredRutas = rutas.filter(r =>
    `${r.codigo} ${r.nombre} ${r.origen} ${r.destino}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Planificación de Rutogramas y Vías Seguras (Paso 14 y 15)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mapeo de corredores logísticos, identificación de puntos críticos y velocidades seguras
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Rutograma</span>
        </button>
      </div>

      {/* Grid de Rutogramas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRutas.map(r => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-emerald-300">
                  {r.codigo}
                </span>
                <Badge
                  variant={
                    r.nivelRiesgoRuta === 'ALTO' ? 'danger' :
                    r.nivelRiesgoRuta === 'MEDIO' ? 'warning' : 'success'
                  }
                >
                  Riesgo {r.nivelRiesgoRuta}
                </Badge>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mt-3">{r.nombre}</h4>

              <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-400">De:</span>
                  <span className="font-medium text-slate-800">{r.origen}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold text-slate-400">A:</span>
                  <span className="font-medium text-slate-800">{r.destino}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 bg-slate-50 rounded-xl text-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Distancia</p>
                  <p className="text-xs font-black text-slate-800">{r.distanciaKm} km</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Tiempo</p>
                  <p className="text-xs font-black text-slate-800">{r.tiempoEstimadoMin} min</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Vel. Máx</p>
                  <p className="text-xs font-black text-blue-700">{r.velocidadMaxSugeridaKmH} km/h</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Puntos Críticos Identificados ({r.puntosCriticos.length}):
                </p>
                <ul className="space-y-1">
                  {r.puntosCriticos.map((pc, idx) => (
                    <li key={idx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{pc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 capitalize">{r.tipoVia.toLowerCase()}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(r)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition"
                  title="Editar"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar la ruta ${r.nombre}?`)) {
                      deleteRuta(r.id);
                    }
                  }}
                  className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRuta ? `Editar Ruta: ${editingRuta.codigo}` : 'Registrar Nuevo Rutograma'}
        subtitle="Mapeo de riesgos viales conforme al Paso 15 de la Resolución 40595 de 2022"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Código de Ruta *</label>
              <input
                type="text"
                required
                placeholder="ej. RUT-OCC-01"
                value={formData.codigo}
                onChange={e => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono uppercase focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Descriptivo *</label>
              <input
                type="text"
                required
                placeholder="ej. Corredor Cali - Buenaventura"
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Origen *</label>
              <input
                type="text"
                required
                value={formData.origen}
                onChange={e => setFormData({ ...formData, origen: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destino *</label>
              <input
                type="text"
                required
                value={formData.destino}
                onChange={e => setFormData({ ...formData, destino: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Distancia (km)</label>
              <input
                type="number"
                min="1"
                value={formData.distanciaKm}
                onChange={e => setFormData({ ...formData, distanciaKm: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tiempo Estimado (minutos)</label>
              <input
                type="number"
                min="1"
                value={formData.tiempoEstimadoMin}
                onChange={e => setFormData({ ...formData, tiempoEstimadoMin: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Vía</label>
              <select
                value={formData.tipoVia}
                onChange={e => setFormData({ ...formData, tipoVia: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="TRONCAL">Troncal Nacional (Doble calzada / Montaña)</option>
                <option value="URBANA">Vía Urbana / Metropolitana</option>
                <option value="RURAL">Vía Terciaria / Rural</option>
                <option value="MIXTA">Vía Mixta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Velocidad Máxima Recomendada (km/h)</label>
              <input
                type="number"
                min="10"
                max="100"
                value={formData.velocidadMaxSugeridaKmH}
                onChange={e => setFormData({ ...formData, velocidadMaxSugeridaKmH: parseInt(e.target.value) || 60 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Puntos Críticos / Zonas de Peligro Vial (Uno por línea)
              </label>
              <textarea
                rows={3}
                value={puntosTexto}
                onChange={e => setPuntosTexto(e.target.value)}
                placeholder="ej. Km 40 Curvas cerradas y niebla densa&#10;Descenso de montaña con riesgo de recalentamiento de frenos"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
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
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              {editingRuta ? 'Guardar Cambios' : 'Registrar Rutograma'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
