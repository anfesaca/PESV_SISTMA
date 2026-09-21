import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  AlertTriangle,
  Edit2,
  Trash2,
  CheckCircle2,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { Conductor, CategoriaLicencia } from '../../types/pesv';
import { TrafficLightBadge } from '../common/TrafficLightBadge';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const ConductoresModule: React.FC = () => {
  const { conductores, addConductor, updateConductor, deleteConductor } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterVinculacion, setFilterVinculacion] = useState<string>('TODOS');
  const [filterAptitud, setFilterAptitud] = useState<string>('TODOS');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConductor, setEditingConductor] = useState<Conductor | null>(null);

  const initialForm: Omit<Conductor, 'id'> = {
    empresaId: 'emp-001',
    cedula: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: '',
    cargo: 'Conductor',
    tipoVinculacion: 'DIRECTO',
    categoriaLicencia: 'C2',
    numeroLicencia: '',
    fechaVencimientoLicencia: '',
    fechaExamenMedico: '',
    estadoAptitudMedica: 'APTO',
    restriccionesMedicas: '',
    kilometrosMesPromedio: 2500,
    comparendosPendientes: 0,
    activo: true
  };

  const [formData, setFormData] = useState<Omit<Conductor, 'id'>>(initialForm);
  const [formError, setFormError] = useState('');

  const openCreateModal = () => {
    setEditingConductor(null);
    setFormData(initialForm);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Conductor) => {
    setEditingConductor(c);
    setFormData({
      empresaId: c.empresaId,
      cedula: c.cedula,
      nombres: c.nombres,
      apellidos: c.apellidos,
      telefono: c.telefono,
      correo: c.correo,
      cargo: c.cargo,
      tipoVinculacion: c.tipoVinculacion,
      categoriaLicencia: c.categoriaLicencia,
      numeroLicencia: c.numeroLicencia,
      fechaVencimientoLicencia: c.fechaVencimientoLicencia,
      fechaExamenMedico: c.fechaExamenMedico,
      estadoAptitudMedica: c.estadoAptitudMedica,
      restriccionesMedicas: c.restriccionesMedicas || '',
      kilometrosMesPromedio: c.kilometrosMesPromedio,
      comparendosPendientes: c.comparendosPendientes,
      activo: c.activo
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cedula || !formData.nombres || !formData.apellidos) {
      setFormError('Cédula, nombres y apellidos son campos obligatorios.');
      return;
    }

    if (editingConductor) {
      updateConductor({
        ...formData,
        id: editingConductor.id
      });
    } else {
      addConductor(formData);
    }
    setIsModalOpen(false);
  };

  const filteredConductores = conductores.filter(c => {
    const full = `${c.nombres} ${c.apellidos} ${c.cedula}`.toLowerCase();
    const matchesSearch = full.includes(searchTerm.toLowerCase());
    const matchesVinculacion = filterVinculacion === 'TODOS' || c.tipoVinculacion === filterVinculacion;
    const matchesAptitud = filterAptitud === 'TODOS' || c.estadoAptitudMedica === filterAptitud;
    return matchesSearch && matchesVinculacion && matchesAptitud;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#006837]" />
            Registro y Competencia de Conductores (Paso 10 y 11)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Total: {conductores.length} conductores • {conductores.filter(c => c.tipoVinculacion === 'DIRECTO').length} directos • {conductores.filter(c => c.tipoVinculacion === 'CONTRATISTA').length} contratistas
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006837] hover:bg-[#004d28] text-white text-xs font-bold shadow-md shadow-[#006837]/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#fec828]" />
          <span>Registrar Nuevo Conductor</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cédula o nombre del conductor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterVinculacion}
            onChange={e => setFilterVinculacion(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Toda vinculación</option>
            <option value="DIRECTO">Directo / Nómina</option>
            <option value="CONTRATISTA">Contratista</option>
            <option value="TEMPORAL">Temporal</option>
          </select>

          <select
            value={filterAptitud}
            onChange={e => setFilterAptitud(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Toda aptitud médica</option>
            <option value="APTO">Apto 100%</option>
            <option value="APTO_RESTRICCION">Apto con Restricciones</option>
            <option value="NO_APTO">No Apto</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] bg-slate-50/60">
                <th className="py-3 px-4">Cédula & Nombre</th>
                <th className="py-3 px-4">Cargo & Vinculación</th>
                <th className="py-3 px-4">Categoría Licencia</th>
                <th className="py-3 px-4">Vigencia Licencia</th>
                <th className="py-3 px-4">Aptitud Médica</th>
                <th className="py-3 px-4">Comparendos</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConductores.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No se encontraron conductores registrados.
                  </td>
                </tr>
              ) : (
                filteredConductores.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{c.nombres} {c.apellidos}</p>
                      <p className="text-[11px] text-slate-400 font-mono">C.C. {c.cedula}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-700">{c.cargo}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                        {c.tipoVinculacion}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-black text-xs font-mono">
                        {c.categoriaLicencia}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <TrafficLightBadge fechaVencimiento={c.fechaVencimientoLicencia} />
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          c.estadoAptitudMedica === 'APTO' ? 'success' :
                          c.estadoAptitudMedica === 'APTO_RESTRICCION' ? 'warning' : 'danger'
                        }
                      >
                        {c.estadoAptitudMedica === 'APTO' ? 'APTO' :
                         c.estadoAptitudMedica === 'APTO_RESTRICCION' ? 'RESTRICCIÓN' : 'NO APTO'}
                      </Badge>
                      {c.restriccionesMedicas && (
                        <p className="text-[10px] text-slate-400 italic truncate max-w-[150px]" title={c.restriccionesMedicas}>
                          {c.restriccionesMedicas}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {c.comparendosPendientes > 0 ? (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                          <ShieldAlert className="w-3 h-3 text-rose-600" />
                          {c.comparendosPendientes} multa(s)
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium text-[11px]">Paz y Salvo</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                          title="Editar Conductor"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar al conductor ${c.nombres} ${c.apellidos}?`)) {
                              deleteConductor(c.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Eliminar Conductor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingConductor ? `Editar Conductor: ${editingConductor.nombres}` : 'Registrar Nuevo Conductor'}
        subtitle="Control de perfil y competencia según los Pasos 10 y 11 del PESV"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cédula de Ciudadanía *</label>
              <input
                type="text"
                required
                value={formData.cedula}
                onChange={e => setFormData({ ...formData, cedula: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Vinculación</label>
              <select
                value={formData.tipoVinculacion}
                onChange={e => setFormData({ ...formData, tipoVinculacion: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="DIRECTO">Directo / Contrato Laboral</option>
                <option value="CONTRATISTA">Contratista de Prestación de Servicios</option>
                <option value="TEMPORAL">Empresa de Servicios Temporales</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombres *</label>
              <input
                type="text"
                required
                value={formData.nombres}
                onChange={e => setFormData({ ...formData, nombres: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Apellidos *</label>
              <input
                type="text"
                required
                value={formData.apellidos}
                onChange={e => setFormData({ ...formData, apellidos: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Móvil</label>
              <input
                type="text"
                value={formData.telefono}
                onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={formData.correo}
                onChange={e => setFormData({ ...formData, correo: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría de Licencia</label>
              <select
                value={formData.categoriaLicencia}
                onChange={e => setFormData({ ...formData, categoriaLicencia: e.target.value as CategoriaLicencia })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white font-mono font-bold"
              >
                <option value="C3">C3 - Articulados / Tractocamiones</option>
                <option value="C2">C2 - Camiones Rígidos / Busetas</option>
                <option value="C1">C1 - Automóviles Públicos / Taxis</option>
                <option value="B3">B3 - Articulados Particulares</option>
                <option value="B2">B2 - Camiones Particulares</option>
                <option value="B1">B1 - Automóviles Particulares</option>
                <option value="A2">A2 - Motocicletas &gt; 125cc</option>
                <option value="A1">A1 - Motocicletas &lt; 125cc</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Vencimiento Licencia *</label>
              <input
                type="date"
                required
                value={formData.fechaVencimientoLicencia}
                onChange={e => setFormData({ ...formData, fechaVencimientoLicencia: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Examen Médico Ocupacional</label>
              <input
                type="date"
                value={formData.fechaExamenMedico}
                onChange={e => setFormData({ ...formData, fechaExamenMedico: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Aptitud Médica Laboral</label>
              <select
                value={formData.estadoAptitudMedica}
                onChange={e => setFormData({ ...formData, estadoAptitudMedica: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="APTO">Apto sin restricciones</option>
                <option value="APTO_RESTRICCION">Apto con restricciones (lentes, audición, etc.)</option>
                <option value="NO_APTO">No apto para conducción</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Restricciones Médicas (si aplica)</label>
              <input
                type="text"
                placeholder="ej. Uso obligatorio de lentes correctivos bifocales"
                value={formData.restriccionesMedicas}
                onChange={e => setFormData({ ...formData, restriccionesMedicas: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer"
            >
              {editingConductor ? 'Guardar Cambios' : 'Registrar Conductor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
