// Tipos de datos para el Sistema de Gestión PESV (Circular 0034 / Res. 40595 de 2022)

export type NivelPESV = 'BASICO' | 'ESTANDAR' | 'AVANZADO';

export type RolUsuario = 'ADMIN' | 'RESPONSABLE_PESV' | 'INSPECTOR' | 'CONDUCTOR' | 'AUDITOR';

export type EstadoDocumento = 'VIGENTE' | 'POR_VENCER' | 'VENCIDO';

export type TipoVehiculo = 'AUTOMOVIL' | 'CAMIONETA' | 'MOTOCICLETA' | 'CAMION' | 'FURGON' | 'MICROBUS';

export type EstadoVehiculo = 'OPERATIVO' | 'EN_TALLER' | 'INACTIVO' | 'NO_APTO';

export type CategoriaLicencia = 'A1' | 'A2' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3';

export type EstadoInspeccion = 'BUENO' | 'REGULAR' | 'MALO';

export type DecisionInspeccion = 'APROBADO' | 'RECHAZADO_CRITICO';

export type FactorRiesgo = 'HUMANO' | 'VEHICULO' | 'INFRAESTRUCTURA' | 'ENTORNO';

export type NivelRiesgoCualitativo = 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO';

export type TipoMantenimiento = 'PREVENTIVO' | 'CORRECTIVO';

export type EstadoMantenimiento = 'PROGRAMADO' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';

export type GravedadSiniestro = 'SOLO_DANOS' | 'CON_HERIDOS' | 'FATAL';

// 1. Empresa / Configuración
export interface Empresa {
  id: string;
  nit: string;
  razonSocial: string;
  actividadEconomica: string;
  direccion: string;
  ciudad: string;
  representanteLegal: string;
  responsablePesv: string;
  nivelPesv: NivelPESV;
  politicaAprobada: boolean;
  comiteConformado: boolean;
  fechaUltimaAuditoria?: string;
}

// 2. Usuarios del Sistema
export interface Usuario {
  id: string;
  empresaId: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  cargo: string;
  activo: boolean;
}

// 3. Colaboradores / Conductores
export interface Conductor {
  id: string;
  empresaId: string;
  cedula: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
  cargo: string;
  tipoVinculacion: 'DIRECTO' | 'CONTRATISTA' | 'TEMPORAL';
  categoriaLicencia: CategoriaLicencia;
  numeroLicencia: string;
  fechaVencimientoLicencia: string;
  fechaExamenMedico: string;
  estadoAptitudMedica: 'APTO' | 'APTO_RESTRICCION' | 'NO_APTO';
  restriccionesMedicas?: string;
  kilometrosMesPromedio: number;
  comparendosPendientes: number;
  activo: boolean;
}

// 4. Vehículos de la Flota
export interface Vehiculo {
  id: string;
  empresaId: string;
  placa: string;
  tipo: TipoVehiculo;
  marca: string;
  linea: string;
  modelo: number;
  kilometrajeActual: number;
  conductorHabitualId?: string;
  numeroSoat: string;
  aseguradoraSoat: string;
  fechaVencimientoSoat: string;
  numeroRtm: string;
  cdaRtm: string;
  fechaVencimientoRtm: string;
  estadoOperativo: EstadoVehiculo;
  observaciones?: string;
}

// 5. Rutas Frecuentes e Itinerarios
export interface Ruta {
  id: string;
  empresaId: string;
  codigo: string;
  nombre: string;
  origen: string;
  destino: string;
  distanciaKm: number;
  tiempoEstimadoMin: number;
  tipoVia: 'URBANA' | 'TRONCAL' | 'RURAL' | 'MIXTA';
  puntosCriticos: string[];
  velocidadMaxSugeridaKmH: number;
  nivelRiesgoRuta: 'BAJO' | 'MEDIO' | 'ALTO';
}

// 6. Diagnóstico PESV (Clasificación de Nivel)
export interface DiagnosticoPESV {
  id: string;
  empresaId: string;
  fechaDiagnostico: string;
  totalVehiculosAutomotores: number;
  totalMotocicletas: number;
  totalConductoresDirectos: number;
  totalConductoresTerceros: number;
  clasificacionCalculada: NivelPESV;
  pasosAplicables: number;
  responsableDiagnostico: string;
}

// 7. Matriz de Riesgos Viales
export interface MatrizRiesgo {
  id: string;
  empresaId: string;
  factor: FactorRiesgo;
  peligro: string;
  consecuencia: string;
  probabilidad: number; // 1 a 5
  impacto: number; // 1 a 5
  valorRiesgo: number; // probabilidad * impacto
  clasificacion: NivelRiesgoCualitativo;
  medidaIntervencion: 'ELIMINACION' | 'SUSTITUCION' | 'INGENIERIA' | 'ADMINISTRATIVO' | 'EPP';
  descripcionControl: string;
  responsable: string;
  estado: 'VIGENTE' | 'EN_REVISION' | 'CONTROLADO';
}

// 8. Inspección Preoperacional Diaria
export interface InspeccionPreoperacional {
  id: string;
  empresaId: string;
  vehiculoId: string;
  conductorId: string;
  fechaHora: string;
  kilometraje: number;
  frenosServicio: EstadoInspeccion;
  frenoParqueo: EstadoInspeccion;
  lucesDelanteras: EstadoInspeccion;
  lucesTraserasFreno: EstadoInspeccion;
  direccionales: EstadoInspeccion;
  estadoLlantasLabrado: EstadoInspeccion;
  presionLlantas: EstadoInspeccion;
  nivelAceiteMotor: EstadoInspeccion;
  nivelRefrigerante: EstadoInspeccion;
  nivelLiquidoFrenos: EstadoInspeccion;
  cinturonesSeguridad: EstadoInspeccion;
  limpiabrisas: EstadoInspeccion;
  espejosRetrovisores: EstadoInspeccion;
  fugaFluidos: boolean;
  kitCarreteraCompleto: boolean;
  botiquinVigente: boolean;
  extintorVigente: boolean;
  decision: DecisionInspeccion;
  observaciones?: string;
  firmaConductor: string;
}

// 9. Mantenimiento Vehicular
export interface Mantenimiento {
  id: string;
  empresaId: string;
  vehiculoId: string;
  tipo: TipoMantenimiento;
  fechaProgramada: string;
  fechaEjecutada?: string;
  kilometraje: number;
  taller: string;
  descripcionTrabajo: string;
  repuestosCambiados: string[];
  costoTotal: number;
  estado: EstadoMantenimiento;
  facturaNumero?: string;
}

// 10. Capacitación y Formación Vial
export interface Capacitacion {
  id: string;
  empresaId: string;
  tema: 'MANEJO_DEFENSIVO' | 'PRIMEROS_AUXILIOS' | 'NORMATIVA_PESV' | 'FATIGA_DISTRACTORES' | 'GESTION_VELOCIDAD';
  titulo: string;
  fechaProgramada: string;
  duracionHoras: number;
  instructor: string;
  asistentesEsperados: number;
  asistentesReales: number;
  estado: 'PROGRAMADA' | 'EJECUTADA' | 'REPROGRAMADA';
}

// 11. Siniestros e Incidentes Viales
export interface Siniestro {
  id: string;
  empresaId: string;
  vehiculoId: string;
  conductorId: string;
  rutaId?: string;
  fechaHora: string;
  ubicacion: string;
  gravedad: GravedadSiniestro;
  descripcionHechos: string;
  causaInmediata: string;
  causaRaiz: string;
  diasIncapacidad: number;
  costoEstimado: number;
  estadoInvestigacion: 'ABIERTA' | 'EN_ANALISIS' | 'CERRADA';
  planAccionLecciones: string;
}

// 12. Autoevaluación Circular 0034 / Res. 40595
export interface EstandarPESV {
  pasoNumero: number;
  fase: 'PLANIFICACION' | 'IMPLEMENTACION' | 'SEGUIMIENTO' | 'MEJORA';
  nombre: string;
  criterioLegal: string;
  aplicaNivel: NivelPESV[];
  pesoPorcentual: number;
  cumple: 'CUMPLE' | 'NO_CUMPLE' | 'NO_APLICA';
  evidenciaTexto: string;
  observaciones?: string;
}

export interface AutoevaluacionAnual {
  id: string;
  empresaId: string;
  periodoAnual: number;
  fechaRegistro: string;
  responsableEvaluacion: string;
  puntajeObtenido: number;
  nivelAlcanzado: 'CRITICO' | 'ACEPTABLE' | 'DESTACADO';
  estandares: EstandarPESV[];
}

// 13. Indicadores KPI Mensuales
export interface IndicadorMensual {
  id: string;
  empresaId: string;
  mes: string;
  siniestrosTotal: number;
  siniestrosConLesion: number;
  tasaSiniestralidad: number;
  preoperacionalesProgramados: number;
  preoperacionalesRealizados: number;
  cumplimientoPreoperacionalPct: number;
  mantenimientosEjecutados: number;
  mantenimientosProgramados: number;
  cumplimientoMantenimientoPct: number;
  kilometrosFlotaTotal: number;
  conductoresCapacitadosPct: number;
}
