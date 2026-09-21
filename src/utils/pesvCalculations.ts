import { NivelPESV, NivelRiesgoCualitativo, EstadoDocumento, EstandarPESV } from '../types/pesv';

/**
 * Determina el Nivel del PESV según la Resolución 40595 de 2022 (Capítulo I)
 * Basado en cantidad de vehículos (automotores y motos) y conductores contratados/directos
 */
export function calculatePesvLevel(
  vehiculosAutomotores: number,
  motocicletas: number,
  conductoresDirectos: number,
  conductoresTerceros: number
): { nivel: NivelPESV; pasos: number; descripcion: string } {
  const totalVehiculos = vehiculosAutomotores + motocicletas;
  const totalConductores = conductoresDirectos + conductoresTerceros;

  // Criterios Resolución 40595
  // BÁSICO: Entre 11 y 19 vehículos O entre 2 y 19 conductores
  // ESTÁNDAR: Entre 20 y 50 vehículos O entre 20 y 50 conductores
  // AVANZADO: Más de 50 vehículos O más de 50 conductores
  if (totalVehiculos > 50 || totalConductores > 50) {
    return {
      nivel: 'AVANZADO',
      pasos: 24,
      descripcion: 'Flota superior a 50 vehículos o más de 50 conductores. Aplica los 24 pasos del PESV con auditorías semestrales.'
    };
  }

  if (totalVehiculos >= 20 || totalConductores >= 20) {
    return {
      nivel: 'ESTANDAR',
      pasos: 20,
      descripcion: 'Flota entre 20 y 50 vehículos o conductores. Aplica 20 pasos del PESV con enfoque sistemático de gestión vial.'
    };
  }

  return {
    nivel: 'BASICO',
    pasos: 12,
    descripcion: 'Flota entre 11 y 19 vehículos o conductores. Aplica los 12 pasos fundamentales de gobernanza y control preoperacional.'
  };
}

/**
 * Matriz de Riesgo P x I (Probabilidad x Impacto)
 */
export function calculateRisk(probabilidad: number, impacto: number): {
  valor: number;
  clasificacion: NivelRiesgoCualitativo;
  color: string;
  badgeClass: string;
} {
  const p = Math.max(1, Math.min(5, probabilidad));
  const i = Math.max(1, Math.min(5, impacto));
  const valor = p * i;

  if (valor >= 16) {
    return {
      valor,
      clasificacion: 'CRITICO',
      color: '#dc2626', // red-600
      badgeClass: 'bg-red-100 text-red-800 border-red-300'
    };
  } else if (valor >= 10) {
    return {
      valor,
      clasificacion: 'ALTO',
      color: '#ea580c', // orange-600
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-300'
    };
  } else if (valor >= 5) {
    return {
      valor,
      clasificacion: 'MEDIO',
      color: '#eab308', // yellow-500
      badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };
  } else {
    return {
      valor,
      clasificacion: 'BAJO',
      color: '#16a34a', // green-600
      badgeClass: 'bg-green-100 text-green-800 border-green-300'
    };
  }
}

/**
 * Semáforo de vigencias (SOAT, RTM, Licencias de Conducción)
 */
export function getDocumentStatus(fechaVencimiento: string): {
  status: EstadoDocumento;
  diasRestantes: number;
  label: string;
  badgeClass: string;
} {
  if (!fechaVencimiento) {
    return {
      status: 'VENCIDO',
      diasRestantes: -999,
      label: 'Sin fecha registrada',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300'
    };
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const target = new Date(fechaVencimiento);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - hoy.getTime();
  const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (dias < 0) {
    return {
      status: 'VENCIDO',
      diasRestantes: dias,
      label: `Vencido hace ${Math.abs(dias)} días`,
      badgeClass: 'bg-red-100 text-red-800 border-red-300'
    };
  } else if (dias <= 30) {
    return {
      status: 'POR_VENCER',
      diasRestantes: dias,
      label: `Vence en ${dias} días`,
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
    };
  } else {
    return {
      status: 'VIGENTE',
      diasRestantes: dias,
      label: `Vigente (${dias} días)`,
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
  }
}

/**
 * Evaluación y Puntuación Oficial Circular 0034
 */
export function evaluateAutoevaluacion(estandares: EstandarPESV[], nivel: NivelPESV) {
  const aplicables = estandares.filter(e => e.aplicaNivel.includes(nivel));
  if (aplicables.length === 0) return { puntaje: 0, nivelAlcanzado: 'CRITICO' as const, aplicables: 0, cumplidos: 0 };

  const cumplidos = aplicables.filter(e => e.cumple === 'CUMPLE').length;
  const noAplica = aplicables.filter(e => e.cumple === 'NO_APLICA').length;
  
  // Base efectiva: aplicables menos los que legalmente justifican NO_APLICA
  const baseEvaluacion = Math.max(1, aplicables.length - noAplica);
  const puntaje = Math.round((cumplidos / baseEvaluacion) * 100);

  let nivelAlcanzado: 'CRITICO' | 'ACEPTABLE' | 'DESTACADO' = 'CRITICO';
  if (puntaje >= 85) {
    nivelAlcanzado = 'DESTACADO';
  } else if (puntaje >= 60) {
    nivelAlcanzado = 'ACEPTABLE';
  }

  return {
    puntaje,
    nivelAlcanzado,
    aplicables: aplicables.length,
    cumplidos,
    noAplica,
    noCumple: aplicables.filter(e => e.cumple === 'NO_CUMPLE').length
  };
}

/**
 * Formateo de Moneda Colombiana (COP)
 */
export function formatCOP(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
}
