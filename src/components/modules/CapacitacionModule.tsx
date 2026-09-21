import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { Capacitacion } from '../../types/pesv';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const CapacitacionModule: React.FC = () => {
  const { capacitaciones, addCapacitacion, updateCapacitacion } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCap, setEditingCap] = useState<Capacitacion | null>(null);

  const initialForm: Omit<Capacitacion, 'id'> = {
    empresaId: 'emp-001',
    tema: 'MANEJO_DEFENSIVO',
    titulo: '',
    fechaProgramada: new Date().toISOString().split('T')[0],
    duracionHoras: 4,
    instructor: '',
    asistentesEsperados: 25,
    asistentesReales: 0,
    estado: 'PROGRAMADA'
  };

  const [formData, setFormData] = useState<Omit<Capacitacion, 'id'>>(initialForm);

  const openCreateModal = () => {
    setEditingCap(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (c: Capacitacion) => {
    setEditingCap(c);
    setFormData({
      empresaId: c.empresaId,
      tema: c.tema,
      titulo: c.titulo,
      fechaProgramada: c.fechaProgramada,
      duracionHoras: c.duracionHoras,
      instructor: c.instructor,
      asistentesEsperados: c.asistentesEsperados,
      asistentesReales: c.asistentesReales,
      estado: c.estado
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCap) {
      updateCapacitacion({ ...formData, id: editingCap.id });
    } else {
      addCapacitacion(formData);
    }
    setIsModalOpen(false);
  };

  const filteredCapacitaciones = capacitaciones.filter(c =>
    `${c.titulo} ${c.instructor} ${c.tema}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalHoras = capacitaciones.filter(c => c.estado === 'EJECUTADA').reduce((a, b) => a + b.duracionHoras, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            Plan Anual de Capacitación y Formación Vial (Paso 10)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Total horas ejecutadas: <strong className="text-slate-900">{totalHoras} horas</strong> • Sesiones: {capacitaciones.length}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Sesión de Formación</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCapacitaciones.map(c => {
          const cobertura = c.asistentesEsperados > 0 ? Math.round((c.asistentesReales / c.asistentesEsperados) * 100) : 0;
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 uppercase">
                    {c.tema.replace(/_/g, ' ')}
                  </span>
                  <Badge variant={c.estado === 'EJECUTADA' ? 'success' : 'warning'}>
                    {c.estado}
                  </Badge>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-3 leading-snug">{c.titulo}</h4>

                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Fecha: <strong className="text-slate-800">{c.fechaProgramada}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Intensidad: <strong className="text-slate-800">{c.duracionHoras} horas</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Instructor: <strong className="text-slate-800">{c.instructor}</strong></span>
                  </p>
                </div>

                {c.estado === 'EJECUTADA' && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Asistencia:</span>
                      <strong className="text-slate-900 font-bold">{c.asistentesReales} de {c.asistentesEsperados}</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.min(100, cobertura)}%` }} />
                    </div>
                    <p className="text-[10px] text-right font-bold text-purple-700">{cobertura}% de cobertura</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => openEditModal(c)}
                  className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                >
                  Modificar Registro
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
        title={editingCap ? 'Editar Capacitación Vial' : 'Programar Nueva Capacitación Vial'}
        subtitle="Cumplimiento del Paso 10 de la Resolución 40595 de 2022"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título de la Sesión *</label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="ej. Taller de Manejo Defensivo y Gestión de Distancias"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Eje Temático Legal</label>
              <select
                value={formData.tema}
                onChange={e => setFormData({ ...formData, tema: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="MANEJO_DEFENSIVO">Manejo Defensivo y Prevención</option>
                <option value="FATIGA_DISTRACTORES">Prevención de Fatiga y Distractores (Móvil)</option>
                <option value="PRIMEROS_AUXILIOS">Primeros Auxilios y Respondiente Vial</option>
                <option value="GESTION_VELOCIDAD">Gestión de la Velocidad Segura</option>
                <option value="NORMATIVA_PESV">Normativa de Tránsito y PESV</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Programada *</label>
              <input
                type="date"
                required
                value={formData.fechaProgramada}
                onChange={e => setFormData({ ...formData, fechaProgramada: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duración (Horas)</label>
              <input
                type="number"
                min="1"
                value={formData.duracionHoras}
                onChange={e => setFormData({ ...formData, duracionHoras: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Instructor / Entidad Formadora *</label>
              <input
                type="text"
                required
                placeholder="ej. ARL Sura / Cruz Roja"
                value={formData.instructor}
                onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Asistentes Esperados</label>
              <input
                type="number"
                min="1"
                value={formData.asistentesEsperados}
                onChange={e => setFormData({ ...formData, asistentesEsperados: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Asistentes Reales (si ya se ejecutó)</label>
              <input
                type="number"
                min="0"
                value={formData.asistentesReales}
                onChange={e => setFormData({ ...formData, asistentesReales: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado de la Capacitación</label>
              <select
                value={formData.estado}
                onChange={e => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white font-bold"
              >
                <option value="PROGRAMADA">PROGRAMADA</option>
                <option value="EJECUTADA">EJECUTADA CON ASISTENCIA FIRMADA</option>
                <option value="REPROGRAMADA">REPROGRAMADA</option>
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
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition cursor-pointer"
            >
              {editingCap ? 'Guardar Cambios' : 'Registrar Sesión'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
