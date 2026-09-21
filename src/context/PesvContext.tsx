import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Empresa,
  Usuario,
  Conductor,
  Vehiculo,
  Ruta,
  DiagnosticoPESV,
  MatrizRiesgo,
  InspeccionPreoperacional,
  Mantenimiento,
  Capacitacion,
  Siniestro,
  EstandarPESV,
  IndicadorMensual,
  NivelPESV
} from '../types/pesv';
import {
  initialEmpresa,
  initialUsuarios,
  initialConductores,
  initialVehiculos,
  initialRutas,
  initialDiagnostico,
  initialMatrizRiesgos,
  initialInspecciones,
  initialMantenimientos,
  initialCapacitaciones,
  initialSiniestros,
  initialEstandaresPESV,
  initialIndicadores
} from '../data/initialData';
import { getDocumentStatus, evaluateAutoevaluacion } from '../utils/pesvCalculations';

interface PesvContextType {
  empresa: Empresa;
  usuarios: Usuario[];
  conductores: Conductor[];
  vehiculos: Vehiculo[];
  rutas: Ruta[];
  diagnostico: DiagnosticoPESV;
  matrizRiesgos: MatrizRiesgo[];
  inspecciones: InspeccionPreoperacional[];
  mantenimientos: Mantenimiento[];
  capacitaciones: Capacitacion[];
  siniestros: Siniestro[];
  estandares: EstandarPESV[];
  indicadores: IndicadorMensual[];
  currentUsuario: Usuario;

  // Acciones
  setEmpresa: (empresa: Empresa) => void;
  updateDiagnostico: (diag: DiagnosticoPESV) => void;
  addConductor: (conductor: Omit<Conductor, 'id'>) => void;
  updateConductor: (conductor: Conductor) => void;
  deleteConductor: (id: string) => void;

  addVehiculo: (vehiculo: Omit<Vehiculo, 'id'>) => void;
  updateVehiculo: (vehiculo: Vehiculo) => void;
  deleteVehiculo: (id: string) => void;

  addRuta: (ruta: Omit<Ruta, 'id'>) => void;
  updateRuta: (ruta: Ruta) => void;
  deleteRuta: (id: string) => void;

  addMatrizRiesgo: (riesgo: Omit<MatrizRiesgo, 'id'>) => void;
  updateMatrizRiesgo: (riesgo: MatrizRiesgo) => void;
  deleteMatrizRiesgo: (id: string) => void;

  addInspeccion: (inspeccion: Omit<InspeccionPreoperacional, 'id'>) => void;
  addMantenimiento: (mnt: Omit<Mantenimiento, 'id'>) => void;
  updateMantenimiento: (mnt: Mantenimiento) => void;

  addCapacitacion: (cap: Omit<Capacitacion, 'id'>) => void;
  updateCapacitacion: (cap: Capacitacion) => void;

  addSiniestro: (sin: Omit<Siniestro, 'id'>) => void;
  updateSiniestro: (sin: Siniestro) => void;

  updateEstandar: (pasoNumero: number, fields: Partial<EstandarPESV>) => void;
  resetDemoData: () => void;

  // Métricas y Alertas calculadas
  alertasVehiculos: { vehiculo: Vehiculo; tipoDoc: 'SOAT' | 'RTM'; dias: number; label: string; status: 'POR_VENCER' | 'VENCIDO' }[];
  alertasConductores: { conductor: Conductor; tipoDoc: 'LICENCIA'; dias: number; label: string; status: 'POR_VENCER' | 'VENCIDO' }[];
  autoevaluacionScore: { puntaje: number; nivelAlcanzado: 'CRITICO' | 'ACEPTABLE' | 'DESTACADO'; aplicables: number; cumplidos: number };
}

const PesvContext = createContext<PesvContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'pesv_app_v1_';

export const PesvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const load = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [empresa, setEmpresaState] = useState<Empresa>(() => load('empresa', initialEmpresa));
  const [usuarios] = useState<Usuario[]>(() => load('usuarios', initialUsuarios));
  const [conductores, setConductores] = useState<Conductor[]>(() => load('conductores', initialConductores));
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(() => load('vehiculos', initialVehiculos));
  const [rutas, setRutas] = useState<Ruta[]>(() => load('rutas', initialRutas));
  const [diagnostico, setDiagnostico] = useState<DiagnosticoPESV>(() => load('diagnostico', initialDiagnostico));
  const [matrizRiesgos, setMatrizRiesgos] = useState<MatrizRiesgo[]>(() => load('matrizRiesgos', initialMatrizRiesgos));
  const [inspecciones, setInspecciones] = useState<InspeccionPreoperacional[]>(() => load('inspecciones', initialInspecciones));
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>(() => load('mantenimientos', initialMantenimientos));
  const [capacitaciones, setCapacitaciones] = useState<Capacitacion[]>(() => load('capacitaciones', initialCapacitaciones));
  const [siniestros, setSiniestros] = useState<Siniestro[]>(() => load('siniestros', initialSiniestros));
  const [estandares, setEstandares] = useState<EstandarPESV[]>(() => load('estandares', initialEstandaresPESV));
  const [indicadores] = useState<IndicadorMensual[]>(() => load('indicadores', initialIndicadores));

  const [currentUsuario] = useState<Usuario>(initialUsuarios[0]);

  // Sincronización con localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'empresa', JSON.stringify(empresa));
  }, [empresa]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'conductores', JSON.stringify(conductores));
  }, [conductores]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'vehiculos', JSON.stringify(vehiculos));
  }, [vehiculos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'rutas', JSON.stringify(rutas));
  }, [rutas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'diagnostico', JSON.stringify(diagnostico));
  }, [diagnostico]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'matrizRiesgos', JSON.stringify(matrizRiesgos));
  }, [matrizRiesgos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'inspecciones', JSON.stringify(inspecciones));
  }, [inspecciones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'mantenimientos', JSON.stringify(mantenimientos));
  }, [mantenimientos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'capacitaciones', JSON.stringify(capacitaciones));
  }, [capacitaciones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'siniestros', JSON.stringify(siniestros));
  }, [siniestros]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'estandares', JSON.stringify(estandares));
  }, [estandares]);

  // Métodos CRUD
  const setEmpresa = (emp: Empresa) => setEmpresaState(emp);

  const updateDiagnostico = (diag: DiagnosticoPESV) => {
    setDiagnostico(diag);
    setEmpresaState(prev => ({ ...prev, nivelPesv: diag.clasificacionCalculada }));
  };

  const addConductor = (c: Omit<Conductor, 'id'>) => {
    const nuevo: Conductor = { ...c, id: `cond-${Date.now()}` };
    setConductores(prev => [nuevo, ...prev]);
  };

  const updateConductor = (c: Conductor) => {
    setConductores(prev => prev.map(item => item.id === c.id ? c : item));
  };

  const deleteConductor = (id: string) => {
    setConductores(prev => prev.filter(c => c.id !== id));
  };

  const addVehiculo = (v: Omit<Vehiculo, 'id'>) => {
    const nuevo: Vehiculo = { ...v, id: `veh-${Date.now()}` };
    setVehiculos(prev => [nuevo, ...prev]);
  };

  const updateVehiculo = (v: Vehiculo) => {
    setVehiculos(prev => prev.map(item => item.id === v.id ? v : item));
  };

  const deleteVehiculo = (id: string) => {
    setVehiculos(prev => prev.filter(v => v.id !== id));
  };

  const addRuta = (r: Omit<Ruta, 'id'>) => {
    const nueva: Ruta = { ...r, id: `rut-${Date.now()}` };
    setRutas(prev => [nueva, ...prev]);
  };

  const updateRuta = (r: Ruta) => {
    setRutas(prev => prev.map(item => item.id === r.id ? r : item));
  };

  const deleteRuta = (id: string) => {
    setRutas(prev => prev.filter(r => r.id !== id));
  };

  const addMatrizRiesgo = (mr: Omit<MatrizRiesgo, 'id'>) => {
    const nuevo: MatrizRiesgo = { ...mr, id: `rsg-${Date.now()}` };
    setMatrizRiesgos(prev => [nuevo, ...prev]);
  };

  const updateMatrizRiesgo = (mr: MatrizRiesgo) => {
    setMatrizRiesgos(prev => prev.map(item => item.id === mr.id ? mr : item));
  };

  const deleteMatrizRiesgo = (id: string) => {
    setMatrizRiesgos(prev => prev.filter(r => r.id !== id));
  };

  const addInspeccion = (insp: Omit<InspeccionPreoperacional, 'id'>) => {
    const nueva: InspeccionPreoperacional = { ...insp, id: `insp-${Date.now()}` };
    setInspecciones(prev => [nueva, ...prev]);

    // Actualiza kilometraje del vehículo y estado si es rechazado
    setVehiculos(prev => prev.map(v => {
      if (v.id === insp.vehiculoId) {
        return {
          ...v,
          kilometrajeActual: Math.max(v.kilometrajeActual, insp.kilometraje),
          estadoOperativo: insp.decision === 'RECHAZADO_CRITICO' ? 'NO_APTO' : v.estadoOperativo
        };
      }
      return v;
    }));
  };

  const addMantenimiento = (m: Omit<Mantenimiento, 'id'>) => {
    const nuevo: Mantenimiento = { ...m, id: `mnt-${Date.now()}` };
    setMantenimientos(prev => [nuevo, ...prev]);
  };

  const updateMantenimiento = (m: Mantenimiento) => {
    setMantenimientos(prev => prev.map(item => item.id === m.id ? m : item));
  };

  const addCapacitacion = (c: Omit<Capacitacion, 'id'>) => {
    const nueva: Capacitacion = { ...c, id: `cap-${Date.now()}` };
    setCapacitaciones(prev => [nueva, ...prev]);
  };

  const updateCapacitacion = (c: Capacitacion) => {
    setCapacitaciones(prev => prev.map(item => item.id === c.id ? c : item));
  };

  const addSiniestro = (s: Omit<Siniestro, 'id'>) => {
    const nuevo: Siniestro = { ...s, id: `sin-${Date.now()}` };
    setSiniestros(prev => [nuevo, ...prev]);
  };

  const updateSiniestro = (s: Siniestro) => {
    setSiniestros(prev => prev.map(item => item.id === s.id ? s : item));
  };

  const updateEstandar = (pasoNumero: number, fields: Partial<EstandarPESV>) => {
    setEstandares(prev => prev.map(e => e.pasoNumero === pasoNumero ? { ...e, ...fields } : e));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setEmpresaState(initialEmpresa);
    setConductores(initialConductores);
    setVehiculos(initialVehiculos);
    setRutas(initialRutas);
    setDiagnostico(initialDiagnostico);
    setMatrizRiesgos(initialMatrizRiesgos);
    setInspecciones(initialInspecciones);
    setMantenimientos(initialMantenimientos);
    setCapacitaciones(initialCapacitaciones);
    setSiniestros(initialSiniestros);
    setEstandares(initialEstandaresPESV);
  };

  // Cálculo reactivo de alertas de vigencia de vehículos
  const alertasVehiculos = vehiculos.flatMap(v => {
    const items: { vehiculo: Vehiculo; tipoDoc: 'SOAT' | 'RTM'; dias: number; label: string; status: 'POR_VENCER' | 'VENCIDO' }[] = [];
    const stSoat = getDocumentStatus(v.fechaVencimientoSoat);
    if (stSoat.status !== 'VIGENTE') {
      items.push({ vehiculo: v, tipoDoc: 'SOAT', dias: stSoat.diasRestantes, label: stSoat.label, status: stSoat.status });
    }
    const stRtm = getDocumentStatus(v.fechaVencimientoRtm);
    if (stRtm.status !== 'VIGENTE') {
      items.push({ vehiculo: v, tipoDoc: 'RTM', dias: stRtm.diasRestantes, label: stRtm.label, status: stRtm.status });
    }
    return items;
  });

  // Cálculo reactivo de alertas de licencias de conductores
  const alertasConductores = conductores.flatMap(c => {
    const items: { conductor: Conductor; tipoDoc: 'LICENCIA'; dias: number; label: string; status: 'POR_VENCER' | 'VENCIDO' }[] = [];
    const stLic = getDocumentStatus(c.fechaVencimientoLicencia);
    if (stLic.status !== 'VIGENTE') {
      items.push({ conductor: c, tipoDoc: 'LICENCIA', dias: stLic.diasRestantes, label: stLic.label, status: stLic.status });
    }
    return items;
  });

  // Puntuación global de autoevaluación Circular 0034
  const autoevaluacionScore = evaluateAutoevaluacion(estandares, empresa.nivelPesv);

  return (
    <PesvContext.Provider
      value={{
        empresa,
        usuarios,
        conductores,
        vehiculos,
        rutas,
        diagnostico,
        matrizRiesgos,
        inspecciones,
        mantenimientos,
        capacitaciones,
        siniestros,
        estandares,
        indicadores,
        currentUsuario,
        setEmpresa,
        updateDiagnostico,
        addConductor,
        updateConductor,
        deleteConductor,
        addVehiculo,
        updateVehiculo,
        deleteVehiculo,
        addRuta,
        updateRuta,
        deleteRuta,
        addMatrizRiesgo,
        updateMatrizRiesgo,
        deleteMatrizRiesgo,
        addInspeccion,
        addMantenimiento,
        updateMantenimiento,
        addCapacitacion,
        updateCapacitacion,
        addSiniestro,
        updateSiniestro,
        updateEstandar,
        resetDemoData,
        alertasVehiculos,
        alertasConductores,
        autoevaluacionScore
      }}
    >
      {children}
    </PesvContext.Provider>
  );
};

export const usePesv = () => {
  const context = useContext(PesvContext);
  if (!context) {
    throw new Error('usePesv debe ser usado dentro de un PesvProvider');
  }
  return context;
};
