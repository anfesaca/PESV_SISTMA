import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Search,
  AlertTriangle,
  Edit2,
  Trash2,
  Filter,
  CheckCircle2,
  Wrench,
  Ban,
  Calendar
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { Vehiculo, TipoVehiculo, EstadoVehiculo } from '../../types/pesv';
import { TrafficLightBadge } from '../common/TrafficLightBadge';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const VehiculosModule: React.FC = () => {
  const { vehiculos, addVehiculo, updateVehiculo, deleteVehiculo, conductores } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('TODOS');
  const [filterEstado, setFilterEstado] = useState<string>('TODOS');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null);

  // Form State
  const initialForm: Omit<Vehiculo, 'id'> = {
    empresaId: 'emp-001',
    placa: '',
    tipo: 'CAMION',
    marca: '',
    linea: '',
    modelo: new Date().getFullYear(),
    kilometrajeActual: 0,
    conductorHabitualId: '',
    numeroSoat: '',
    aseguradoraSoat: '',
    fechaVencimientoSoat: '',
    numeroRtm: '',
    cdaRtm: '',
    fechaVencimientoRtm: '',
    estadoOperativo: 'OPERATIVO',
    observaciones: ''
  };

  const [formData, setFormData] = useState<Omit<Vehiculo, 'id'>>(initialForm);
  const [formError, setFormError] = useState('');

  const openCreateModal = () => {
    setEditingVehiculo(null);
    setFormData(initialForm);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (veh: Vehiculo) => {
    setEditingVehiculo(veh);
    setFormData({
      empresaId: veh.empresaId,
      placa: veh.placa,
      tipo: veh.tipo,
      marca: veh.marca,
      linea: veh.linea,
      modelo: veh.modelo,
      kilometrajeActual: veh.kilometrajeActual,
      conductorHabitualId: veh.conductorHabitualId || '',
      numeroSoat: veh.numeroSoat,
      aseguradoraSoat: veh.aseguradoraSoat,
      fechaVencimientoSoat: veh.fechaVencimientoSoat,
      numeroRtm: veh.numeroRtm,
      cdaRtm: veh.cdaRtm,
      fechaVencimientoRtm: veh.fechaVencimientoRtm,
      estadoOperativo: veh.estadoOperativo,
      observaciones: veh.observaciones || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const placaClean = formData.placa.trim().toUpperCase();

    if (!placaClean) {
      setFormError('La placa vehicular es obligatoria.');
      return;
    }

    if (editingVehiculo) {
      updateVehiculo({
        ...formData,
        placa: placaClean,
        id: editingVehiculo.id
      });
    } else {
      addVehiculo({
        ...formData,
        placa: placaClean
      });
    }

    setIsModalOpen(false);
  };

  const filteredVehiculos = vehiculos.filter(v => {
    const matchesSearch =
      v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.linea.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipo = filterTipo === 'TODOS' || v.tipo === filterTipo;
    const matchesEstado = filterEstado === 'TODOS' || v.estadoOperativo === filterEstado;

    return matchesSearch && matchesTipo && matchesEstado;
  });

  return (
    <div className="space-y-6">
      {/* Header & Acciones */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#006837]" />
            Flota de Vehículos Registrados (Paso 17)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Total: {vehiculos.length} vehículos • {vehiculos.filter(v => v.estadoOperativo === 'OPERATIVO').length} operativos • {vehiculos.filter(v => v.estadoOperativo === 'NO_APTO').length} con restricción
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006837] hover:bg-[#004d28] text-white text-xs font-bold shadow-md shadow-[#006837]/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#fec828]" />
          <span>Registrar Nuevo Vehículo</span>
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por placa, marca o línea (ej. WKK-452, Kenworth)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterTipo}
            onChange={e => setFilterTipo(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Todos los tipos</option>
            <option value="CAMION">Camión / Tractomula</option>
            <option value="FURGON">Furgón</option>
            <option value="CAMIONETA">Camioneta</option>
            <option value="MOTOCICLETA">Motocicleta</option>
            <option value="AUTOMOVIL">Automóvil</option>
          </select>

          <select
            value={filterEstado}
            onChange={e => setFilterEstado(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="OPERATIVO">Operativo</option>
            <option value="NO_APTO">No Apto / Restringido</option>
            <option value="EN_TALLER">En Mantenimiento</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>
      </div>

      {/* Tabla de Vehículos */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] bg-slate-50/60">
                <th className="py-3 px-4">Placa & Tipo</th>
                <th className="py-3 px-4">Marca y Línea</th>
                <th className="py-3 px-4">Kilometraje</th>
                <th className="py-3 px-4">Vigencia SOAT</th>
                <th className="py-3 px-4">Vigencia RTM</th>
                <th className="py-3 px-4">Conductor Habitual</th>
                <th className="py-3 px-4">Estado Operacional</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehiculos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron vehículos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredVehiculos.map(v => {
                  const habitual = conductores.find(c => c.id === v.conductorHabitualId);
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs px-2.5 py-1 rounded-md bg-slate-900 text-amber-300 border border-slate-700 tracking-wider">
                            {v.placa}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 uppercase">
                            {v.tipo}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-800">{v.marca} {v.linea}</p>
                        <p className="text-[11px] text-slate-400">Modelo {v.modelo}</p>
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {v.kilometrajeActual.toLocaleString()} km
                      </td>
                      <td className="py-3 px-4">
                        <TrafficLightBadge fechaVencimiento={v.fechaVencimientoSoat} />
                      </td>
                      <td className="py-3 px-4">
                        <TrafficLightBadge fechaVencimiento={v.fechaVencimientoRtm} />
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {habitual ? `${habitual.nombres} ${habitual.apellidos}` : <span className="text-slate-400 italic">No asignado</span>}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            v.estadoOperativo === 'OPERATIVO' ? 'success' :
                            v.estadoOperativo === 'EN_TALLER' ? 'warning' : 'danger'
                          }
                        >
                          {v.estadoOperativo}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(v)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                            title="Editar Vehículo"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar vehículo con placa ${v.placa}?`)) {
                                deleteVehiculo(v.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Eliminar Vehículo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Creación / Edición */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehiculo ? `Editar Vehículo: ${editingVehiculo.placa}` : 'Registrar Nuevo Vehículo en Flota'}
        subtitle="Control de activos conforme al Paso 17 de la Resolución 40595 de 2022"
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Placa Vehicular *</label>
              <input
                type="text"
                required
                placeholder="ej. WKK-452"
                value={formData.placa}
                onChange={e => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono uppercase font-bold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Vehículo</label>
              <select
                value={formData.tipo}
                onChange={e => setFormData({ ...formData, tipo: e.target.value as TipoVehiculo })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="CAMION">Camión / Tractomula</option>
                <option value="FURGON">Furgón Refrigerado / Seco</option>
                <option value="CAMIONETA">Camioneta 4x4</option>
                <option value="MOTOCICLETA">Motocicleta</option>
                <option value="AUTOMOVIL">Automóvil Liviano</option>
                <option value="MICROBUS">Microbús / Pasajeros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Modelo (Año)</label>
              <input
                type="number"
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.modelo}
                onChange={e => setFormData({ ...formData, modelo: parseInt(e.target.value) || 2020 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Marca</label>
              <input
                type="text"
                placeholder="ej. Kenworth, Chevrolet, Toyota"
                value={formData.marca}
                onChange={e => setFormData({ ...formData, marca: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Línea / Referencia</label>
              <input
                type="text"
                placeholder="ej. T800, Hilux, Dutro"
                value={formData.linea}
                onChange={e => setFormData({ ...formData, linea: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kilometraje Actual (km)</label>
              <input
                type="number"
                min="0"
                value={formData.kilometrajeActual}
                onChange={e => setFormData({ ...formData, kilometrajeActual: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Documentos Legales Obligatorios
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-800">SOAT (Seguro Obligatorio)</p>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Aseguradora</label>
                  <input
                    type="text"
                    placeholder="ej. Seguros Bolívar, Sura"
                    value={formData.aseguradoraSoat}
                    onChange={e => setFormData({ ...formData, aseguradoraSoat: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">No. Póliza</label>
                  <input
                    type="text"
                    value={formData.numeroSoat}
                    onChange={e => setFormData({ ...formData, numeroSoat: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Fecha Vencimiento SOAT *</label>
                  <input
                    type="date"
                    required
                    value={formData.fechaVencimientoSoat}
                    onChange={e => setFormData({ ...formData, fechaVencimientoSoat: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-800">Revisión Técnico-Mecánica (RTM)</p>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">CDA Autorizado</label>
                  <input
                    type="text"
                    placeholder="ej. CDA del Valle"
                    value={formData.cdaRtm}
                    onChange={e => setFormData({ ...formData, cdaRtm: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">No. Certificado RTM</label>
                  <input
                    type="text"
                    value={formData.numeroRtm}
                    onChange={e => setFormData({ ...formData, numeroRtm: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Fecha Vencimiento RTM *</label>
                  <input
                    type="date"
                    required
                    value={formData.fechaVencimientoRtm}
                    onChange={e => setFormData({ ...formData, fechaVencimientoRtm: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Conductor Habitual Asignado</label>
              <select
                value={formData.conductorHabitualId}
                onChange={e => setFormData({ ...formData, conductorHabitualId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="">Sin conductor fijo asignado</option>
                {conductores.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombres} {c.apellidos} (Lic. {c.categoriaLicencia} - Cédula {c.cedula})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado Operativo</label>
              <select
                value={formData.estadoOperativo}
                onChange={e => setFormData({ ...formData, estadoOperativo: e.target.value as EstadoVehiculo })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-bold"
              >
                <option value="OPERATIVO">OPERATIVO (Apto para despacho)</option>
                <option value="NO_APTO">NO APTO (Inmovilizado por falla o SOAT)</option>
                <option value="EN_TALLER">EN TALLER (Mantenimiento en curso)</option>
                <option value="INACTIVO">INACTIVO (Fuera de servicio)</option>
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
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              {editingVehiculo ? 'Guardar Cambios' : 'Registrar Vehículo'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
