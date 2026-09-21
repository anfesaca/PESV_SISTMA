import React, { useState } from 'react';
import {
  AlertTriangle,
  Plus,
  Search,
  Shield,
  Filter,
  CheckCircle2,
  AlertOctagon,
  Edit2,
  Trash2
} from 'lucide-react';
import { usePesv } from '../../context/PesvContext';
import { MatrizRiesgo, FactorRiesgo, NivelRiesgoCualitativo } from '../../types/pesv';
import { calculateRisk } from '../../utils/pesvCalculations';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const MatrizRiesgosModule: React.FC = () => {
  const { matrizRiesgos, addMatrizRiesgo, updateMatrizRiesgo, deleteMatrizRiesgo } = usePesv();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterFactor, setFilterFactor] = useState<string>('TODOS');
  const [filterNivel, setFilterNivel] = useState<string>('TODOS');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRiesgo, setEditingRiesgo] = useState<MatrizRiesgo | null>(null);

  const initialForm: Omit<MatrizRiesgo, 'id'> = {
    empresaId: 'emp-001',
    factor: 'HUMANO',
    peligro: '',
    consecuencia: '',
    probabilidad: 3,
    impacto: 3,
    valorRiesgo: 9,
    clasificacion: 'MEDIO',
    medidaIntervencion: 'ADMINISTRATIVO',
    descripcionControl: '',
    responsable: 'Coordinador PESV',
    estado: 'VIGENTE'
  };

  const [formData, setFormData] = useState<Omit<MatrizRiesgo, 'id'>>(initialForm);

  const openCreateModal = () => {
    setEditingRiesgo(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (r: MatrizRiesgo) => {
    setEditingRiesgo(r);
    setFormData({
      empresaId: r.empresaId,
      factor: r.factor,
      peligro: r.peligro,
      consecuencia: r.consecuencia,
      probabilidad: r.probabilidad,
      impacto: r.impacto,
      valorRiesgo: r.valorRiesgo,
      clasificacion: r.clasificacion,
      medidaIntervencion: r.medidaIntervencion,
      descripcionControl: r.descripcionControl,
      responsable: r.responsable,
      estado: r.estado
    });
    setIsModalOpen(true);
  };

  const handleProbImpactChange = (prob: number, imp: number) => {
    const risk = calculateRisk(prob, imp);
    setFormData({
      ...formData,
      probabilidad: prob,
      impacto: imp,
      valorRiesgo: risk.valor,
      clasificacion: risk.clasificacion
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRiesgo) {
      updateMatrizRiesgo({ ...formData, id: editingRiesgo.id });
    } else {
      addMatrizRiesgo(formData);
    }
    setIsModalOpen(false);
  };

  const filteredRiesgos = matrizRiesgos.filter(r => {
    const text = `${r.peligro} ${r.consecuencia} ${r.descripcionControl}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesFactor = filterFactor === 'TODOS' || r.factor === filterFactor;
    const matchesNivel = filterNivel === 'TODOS' || r.clasificacion === filterNivel;
    return matchesSearch && matchesFactor && matchesNivel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Matriz de Identificación y Evaluación de Riesgos Viales (Paso 6 y 8)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Valoración cuantitativa $P \times I$ bajo los 4 factores del PESV: Humano, Vehículo, Infraestructura y Entorno
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Evaluar Nuevo Peligro Vial</span>
        </button>
      </div>

      {/* Matriz Visual 5x5 (Heatmap Cuadrante) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Mapa de Calor de Riesgos Viales (Probabilidad vs Severidad / Impacto)</span>
          <span className="text-[11px] font-normal text-slate-500">Haz clic en cualquier celda para explorar</span>
        </h4>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] flex">
            {/* Eje Y: Probabilidad */}
            <div className="w-16 flex flex-col justify-around text-[11px] font-bold text-slate-500 text-right pr-2">
              <span>P5 (Casi seguro)</span>
              <span>P4 (Frecuente)</span>
              <span>P3 (Ocasional)</span>
              <span>P2 (Posible)</span>
              <span>P1 (Raro)</span>
            </div>

            {/* Matriz Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-5 gap-1.5 h-64">
                {[5, 4, 3, 2, 1].map(prob =>
                  [1, 2, 3, 4, 5].map(imp => {
                    const score = prob * imp;
                    const itemsInCell = matrizRiesgos.filter(r => r.probabilidad === prob && r.impacto === imp);
                    const isCrit = score >= 16;
                    const isHigh = score >= 10 && score < 16;
                    const isMed = score >= 5 && score < 10;

                    const bgClass = isCrit
                      ? 'bg-rose-500/90 text-white hover:bg-rose-600'
                      : isHigh
                      ? 'bg-orange-500/80 text-white hover:bg-orange-600'
                      : isMed
                      ? 'bg-amber-400/80 text-slate-900 hover:bg-amber-500'
                      : 'bg-emerald-400/70 text-slate-900 hover:bg-emerald-500';

                    return (
                      <div
                        key={`${prob}-${imp}`}
                        className={`rounded-lg p-2 transition-all cursor-pointer flex flex-col justify-between ${bgClass}`}
                        title={`P: ${prob} x I: ${imp} = ${score} (${itemsInCell.length} peligros)`}
                        onClick={() => {
                          if (itemsInCell.length > 0) {
                            setSearchTerm(itemsInCell[0].peligro.substring(0, 15));
                          }
                        }}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                          <span>{score}</span>
                          {itemsInCell.length > 0 && (
                            <span className="w-5 h-5 rounded-full bg-black/40 text-white flex items-center justify-center text-[10px] font-bold">
                              {itemsInCell.length}
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] truncate font-medium leading-tight opacity-90">
                          {itemsInCell.length > 0 ? itemsInCell[0].peligro : ''}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Eje X: Impacto */}
              <div className="grid grid-cols-5 gap-1.5 mt-2 text-[11px] font-bold text-slate-500 text-center">
                <span>I1 (Insignificante)</span>
                <span>I2 (Menor)</span>
                <span>I3 (Moderado)</span>
                <span>I4 (Mayor)</span>
                <span>I5 (Catastrófico)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar peligro o control (ej. velocidad, fatiga, frenos)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterFactor}
            onChange={e => setFilterFactor(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Todos los factores</option>
            <option value="HUMANO">Factor Humano</option>
            <option value="VEHICULO">Factor Vehicular</option>
            <option value="INFRAESTRUCTURA">Infraestructura Vial</option>
            <option value="ENTORNO">Entorno y Clima</option>
          </select>

          <select
            value={filterNivel}
            onChange={e => setFilterNivel(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white font-medium text-slate-700"
          >
            <option value="TODOS">Todos los niveles</option>
            <option value="CRITICO">Crítico (16-25)</option>
            <option value="ALTO">Alto (10-15)</option>
            <option value="MEDIO">Medio (5-9)</option>
            <option value="BAJO">Bajo (1-4)</option>
          </select>
        </div>
      </div>

      {/* Lista de Peligros Viales Evaluados */}
      <div className="space-y-3">
        {filteredRiesgos.map(r => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                  {r.factor}
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                  r.clasificacion === 'CRITICO' ? 'bg-red-100 text-red-800 border border-red-300' :
                  r.clasificacion === 'ALTO' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                  r.clasificacion === 'MEDIO' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {r.clasificacion} (P{r.probabilidad} × I{r.impacto} = {r.valorRiesgo})
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  Control: {r.medidaIntervencion}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">{r.peligro}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong className="text-slate-700">Consecuencia potencial:</strong> {r.consecuencia}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">Medida de Control Operacional:</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{r.descripcionControl}</p>
                <p className="text-[10px] text-slate-400 mt-1">Responsable de seguimiento: {r.responsable}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                onClick={() => openEditModal(r)}
                className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition"
                title="Editar Riesgo"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`¿Eliminar peligro vial "${r.peligro}"?`)) {
                    deleteMatrizRiesgo(r.id);
                  }
                }}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Eliminar Riesgo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRiesgo ? 'Editar Peligro y Control Vial' : 'Registrar Nuevo Peligro en Matriz Vial'}
        subtitle="Evaluación según el Paso 6 de la Resolución 40595 de 2022"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Factor de Riesgo</label>
              <select
                value={formData.factor}
                onChange={e => setFormData({ ...formData, factor: e.target.value as FactorRiesgo })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white font-bold"
              >
                <option value="HUMANO">Factor Humano (Conductores / Peatones)</option>
                <option value="VEHICULO">Factor Vehículo (Frenos / Llantas / Mecánica)</option>
                <option value="INFRAESTRUCTURA">Factor Infraestructura (Vías / Señales)</option>
                <option value="ENTORNO">Factor Entorno (Clima / Lluvia / Niebla)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jerarquía de Control</label>
              <select
                value={formData.medidaIntervencion}
                onChange={e => setFormData({ ...formData, medidaIntervencion: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white font-semibold"
              >
                <option value="ELIMINACION">Eliminación</option>
                <option value="SUSTITUCION">Sustitución</option>
                <option value="INGENIERIA">Control de Ingeniería (GPS, Frenado automático)</option>
                <option value="ADMINISTRATIVO">Control Administrativo (Pausas, Políticas, Charlas)</option>
                <option value="EPP">Equipos de Protección Personal (Casco certificado, etc.)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción del Peligro *</label>
              <input
                type="text"
                required
                placeholder="ej. Exceso de velocidad en curvas de descenso pronunciado"
                value={formData.peligro}
                onChange={e => setFormData({ ...formData, peligro: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Consecuencia Potencial *</label>
              <input
                type="text"
                required
                placeholder="ej. Volcamiento del vehículo, colisión frontal con víctimas mortales"
                value={formData.consecuencia}
                onChange={e => setFormData({ ...formData, consecuencia: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Cuantificación P x I */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Probabilidad: {formData.probabilidad} / 5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.probabilidad}
                onChange={e => handleProbImpactChange(parseInt(e.target.value), formData.impacto)}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>1 Raro</span>
                <span>3 Ocasional</span>
                <span>5 Casi Seguro</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Impacto / Severidad: {formData.impacto} / 5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.impacto}
                onChange={e => handleProbImpactChange(formData.probabilidad, parseInt(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>1 Insignificante</span>
                <span>3 Moderado</span>
                <span>5 Catastrófico</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Valor Cuantitativo Resultante:</span>
            <span className={`px-3 py-1 rounded-full font-black ${
              formData.clasificacion === 'CRITICO' ? 'bg-red-100 text-red-800' :
              formData.clasificacion === 'ALTO' ? 'bg-orange-100 text-orange-800' :
              formData.clasificacion === 'MEDIO' ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {formData.probabilidad} × {formData.impacto} = {formData.valorRiesgo} ({formData.clasificacion})
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Medida de Control Propuesta *</label>
            <textarea
              rows={3}
              required
              placeholder="Detalla el control que se implementará para mitigar o eliminar este peligro vial..."
              value={formData.descripcionControl}
              onChange={e => setFormData({ ...formData, descripcionControl: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Responsable del Control</label>
              <input
                type="text"
                value={formData.responsable}
                onChange={e => setFormData({ ...formData, responsable: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Estado</label>
              <select
                value={formData.estado}
                onChange={e => setFormData({ ...formData, estado: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white font-bold"
              >
                <option value="VIGENTE">VIGENTE (En seguimiento continuo)</option>
                <option value="CONTROLADO">CONTROLADO (Riesgo mitigado con efectividad)</option>
                <option value="EN_REVISION">EN REVISIÓN (Pendiente ajuste)</option>
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
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition cursor-pointer"
            >
              {editingRiesgo ? 'Guardar Cambios' : 'Registrar Peligro'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
