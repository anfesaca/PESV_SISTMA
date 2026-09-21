import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  Truck,
  Edit2,
  Calendar
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { Mantenimiento, TipoMantenimiento, EstadoMantenimiento } from '../../types/pesv';
import { formatCOP } from '../../utils/pesvCalculations';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const MantenimientoModule: React.FC = () => {
  const { mantenimientos, addMantenimiento, updateMantenimiento, vehiculos } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMnt, setEditingMnt] = useState<Mantenimiento | null>(null);

  const initialForm: Omit<Mantenimiento, 'id'> = {
    empresaId: 'emp-001',
    vehiculoId: vehiculos[0]?.id || '',
    tipo: 'PREVENTIVO',
    fechaProgramada: new Date().toISOString().split('T')[0],
    fechaEjecutada: '',
    kilometraje: 0,
    taller: '',
    descripcionTrabajo: '',
    repuestosCambiados: [],
    costoTotal: 0,
    estado: 'PROGRAMADO',
    facturaNumero: ''
  };

  const [formData, setFormData] = useState<Omit<Mantenimiento, 'id'>>(initialForm);
  const [repuestosTexto, setRepuestosTexto] = useState('');

  const openCreateModal = () => {
    setEditingMnt(null);
    setFormData(initialForm);
    setRepuestosTexto('');
    setIsModalOpen(true);
  };

  const openEditModal = (m: Mantenimiento) => {
    setEditingMnt(m);
    setFormData({
      empresaId: m.empresaId,
      vehiculoId: m.vehiculoId,
      tipo: m.tipo,
      fechaProgramada: m.fechaProgramada,
      fechaEjecutada: m.fechaEjecutada || '',
      kilometraje: m.kilometraje,
      taller: m.taller,
      descripcionTrabajo: m.descripcionTrabajo,
      repuestosCambiados: m.repuestosCambiados,
      costoTotal: m.costoTotal,
      estado: m.estado,
      facturaNumero: m.facturaNumero || ''
    });
    setRepuestosTexto(m.repuestosCambiados.join('\n'));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const repuestos = repuestosTexto
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const payload = {
      ...formData,
      repuestosCambiados: repuestos
    };

    if (editingMnt) {
      updateMantenimiento({ ...payload, id: editingMnt.id });
    } else {
      addMantenimiento(payload);
    }
    setIsModalOpen(false);
  };

  const filteredMantenimientos = mantenimientos.filter(m => {
    const veh = vehiculos.find(v => v.id === m.vehiculoId);
    const text = `${veh?.placa} ${m.taller} ${m.descripcionTrabajo}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'TODOS' || m.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  const totalGastado = mantenimientos.reduce((acc, curr) => acc + curr.costoTotal, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            Plan de Mantenimiento Preventivo y Correctivo (Paso 17)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Presupuesto ejecutado en talleres certificados: <strong className="text-slate-900">{formatCOP(totalGastado)}</strong>
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Mantenimiento</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por placa, taller o trabajo realizado..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterTipo}
          onChange={e => setFilterTipo(e.target.value)}
          className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700 w-full sm:w-auto"
        >
          <option value="TODOS">Todos los tipos</option>
          <option value="PREVENTIVO">Mantenimiento Preventivo</option>
          <option value="CORRECTIVO">Mantenimiento Correctivo</option>
        </select>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMantenimientos.map(m => {
          const veh = vehiculos.find(v => v.id === m.vehiculoId);
          return (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300">
                    {veh ? veh.placa : m.vehiculoId}
                  </span>
                  <Badge variant={m.tipo === 'PREVENTIVO' ? 'info' : 'warning'}>
                    {m.tipo}
                  </Badge>
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{m.descripcionTrabajo}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Taller: {m.taller}</p>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Costo Total:</span>
                    <strong className="text-slate-900 font-bold">{formatCOP(m.costoTotal)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Kilometraje:</span>
                    <span className="font-mono">{m.kilometraje.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Programado para:</span>
                    <span>{m.fechaProgramada}</span>
                  </div>
                </div>

                {m.repuestosCambiados.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Repuestos / Insumos:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {m.repuestosCambiados.map((rep, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          {rep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Badge
                  variant={
                    m.estado === 'COMPLETADO' ? 'success' :
                    m.estado === 'EN_PROCESO' ? 'warning' : 'neutral'
                  }
                  size="sm"
                >
                  {m.estado}
                </Badge>
                <button
                  onClick={() => openEditModal(m)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                  title="Editar Mantenimiento"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMnt ? 'Editar Orden de Mantenimiento' : 'Programar Nueva Orden de Mantenimiento'}
        subtitle="Hojas de vida de flota según el Paso 17 del PESV"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Vehículo *</label>
              <select
                value={formData.vehiculoId}
                onChange={e => setFormData({ ...formData, vehiculoId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-bold"
              >
                {vehiculos.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.placa} ({v.marca} {v.linea})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Intervención</label>
              <select
                value={formData.tipo}
                onChange={e => setFormData({ ...formData, tipo: e.target.value as TipoMantenimiento })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
              >
                <option value="PREVENTIVO">Preventivo (Programado según fabricante)</option>
                <option value="CORRECTIVO">Correctivo (Reparación de daño/falla)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Programada *</label>
              <input
                type="date"
                required
                value={formData.fechaProgramada}
                onChange={e => setFormData({ ...formData, fechaProgramada: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kilometraje</label>
              <input
                type="number"
                min="0"
                value={formData.kilometraje}
                onChange={e => setFormData({ ...formData, kilometraje: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Taller de Servicio *</label>
              <input
                type="text"
                required
                placeholder="ej. Diesel del Valle SAS"
                value={formData.taller}
                onChange={e => setFormData({ ...formData, taller: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Costo Estimado / Facturado (COP)</label>
              <input
                type="number"
                min="0"
                value={formData.costoTotal}
                onChange={e => setFormData({ ...formData, costoTotal: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción del Trabajo Realizado *</label>
              <textarea
                rows={2}
                required
                value={formData.descripcionTrabajo}
                onChange={e => setFormData({ ...formData, descripcionTrabajo: e.target.value })}
                placeholder="Detalle de trabajos mecánicos, inspección de frenos, suspensión, etc."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Repuestos Reemplazados (uno por línea)</label>
              <textarea
                rows={2}
                value={repuestosTexto}
                onChange={e => setRepuestosTexto(e.target.value)}
                placeholder="Pastillas cerámicas&#10;Filtro de combustible&#10;Líquido de frenos"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado</label>
              <select
                value={formData.estado}
                onChange={e => setFormData({ ...formData, estado: e.target.value as EstadoMantenimiento })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-bold"
              >
                <option value="PROGRAMADO">PROGRAMADO</option>
                <option value="EN_PROCESO">EN PROCESO EN TALLER</option>
                <option value="COMPLETADO">COMPLETADO / RECIBIDO</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">No. Factura / Orden</label>
              <input
                type="text"
                placeholder="FAC-8921"
                value={formData.facturaNumero}
                onChange={e => setFormData({ ...formData, facturaNumero: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              {editingMnt ? 'Guardar Cambios' : 'Registrar Mantenimiento'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
