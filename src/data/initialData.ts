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
  IndicadorMensual
} from '../types/pesv';

export const initialEmpresa: Empresa = {
  id: 'emp-001',
  nit: '901.458.789-2',
  razonSocial: 'Transportes Logísticos del Valle S.A.S.',
  actividadEconomica: '4923 - Transporte de carga por carretera y distribución logística',
  direccion: 'Calle 15 # 28-45, Zona Industrial Acopi',
  ciudad: 'Yumbo, Valle del Cauca',
  representanteLegal: 'Ing. Carlos Alberto Montoya',
  responsablePesv: 'Dra. Marcela Restrepo Morales (Lic. SST #8942)',
  nivelPesv: 'ESTANDAR',
  politicaAprobada: true,
  comiteConformado: true,
  fechaUltimaAuditoria: '2026-08-15'
};

export const initialUsuarios: Usuario[] = [
  {
    id: 'usr-1',
    empresaId: 'emp-001',
    nombre: 'Dra. Marcela Restrepo',
    correo: 'lider.pesv@transvalle.com.co',
    rol: 'RESPONSABLE_PESV',
    cargo: 'Coordinadora de Seguridad Vial y SST',
    activo: true
  },
  {
    id: 'usr-2',
    empresaId: 'emp-001',
    nombre: 'Carlos Alberto Montoya',
    correo: 'gerencia@transvalle.com.co',
    rol: 'ADMIN',
    cargo: 'Gerente General',
    activo: true
  },
  {
    id: 'usr-3',
    empresaId: 'emp-001',
    nombre: 'Javier Domínguez',
    correo: 'inspeccion.patio@transvalle.com.co',
    rol: 'INSPECTOR',
    cargo: 'Jefe de Patio y Taller',
    activo: true
  },
  {
    id: 'usr-4',
    empresaId: 'emp-001',
    nombre: 'Andrés Felipe Gómez',
    correo: 'andres.gomez@transvalle.com.co',
    rol: 'CONDUCTOR',
    cargo: 'Conductor Carga Pesada',
    activo: true
  }
];

export const initialConductores: Conductor[] = [
  {
    id: 'cond-1',
    empresaId: 'emp-001',
    cedula: '1144125890',
    nombres: 'Andrés Felipe',
    apellidos: 'Gómez Henao',
    telefono: '315 889 2314',
    correo: 'andres.gomez@transvalle.com.co',
    cargo: 'Conductor Tractocamión',
    tipoVinculacion: 'DIRECTO',
    categoriaLicencia: 'C3',
    numeroLicencia: '1144125890-C3',
    fechaVencimientoLicencia: '2027-05-18',
    fechaExamenMedico: '2026-04-10',
    estadoAptitudMedica: 'APTO',
    kilometrosMesPromedio: 4200,
    comparendosPendientes: 0,
    activo: true
  },
  {
    id: 'cond-2',
    empresaId: 'emp-001',
    cedula: '94389102',
    nombres: 'Javier Orlando',
    apellidos: 'Muñoz Caicedo',
    telefono: '317 452 9012',
    correo: 'javier.munoz@transvalle.com.co',
    cargo: 'Conductor Camión Dobletroque',
    tipoVinculacion: 'DIRECTO',
    categoriaLicencia: 'C2',
    numeroLicencia: '94389102-C2',
    fechaVencimientoLicencia: '2026-10-02', // Por vencer en ~18 días
    fechaExamenMedico: '2026-01-15',
    estadoAptitudMedica: 'APTO_RESTRICCION',
    restriccionesMedicas: 'Uso permanente de lentes correctivos',
    kilometrosMesPromedio: 3600,
    comparendosPendientes: 1,
    activo: true
  },
  {
    id: 'cond-3',
    empresaId: 'emp-001',
    cedula: '16789420',
    nombres: 'Héctor Fabio',
    apellidos: 'López Quintero',
    telefono: '310 998 3411',
    correo: 'hector.lopez@transvalle.com.co',
    cargo: 'Conductor Furgón Urbano',
    tipoVinculacion: 'DIRECTO',
    categoriaLicencia: 'C1',
    numeroLicencia: '16789420-C1',
    fechaVencimientoLicencia: '2026-08-30', // Ya vencida para prueba de semáforo
    fechaExamenMedico: '2025-08-20',
    estadoAptitudMedica: 'APTO',
    kilometrosMesPromedio: 2100,
    comparendosPendientes: 0,
    activo: true
  },
  {
    id: 'cond-4',
    empresaId: 'emp-001',
    cedula: '1113678901',
    nombres: 'Diana Carolina',
    apellidos: 'Torres Velasco',
    telefono: '316 234 5678',
    correo: 'diana.torres@transvalle.com.co',
    cargo: 'Supervisora de Ruta / Conductora Liviano',
    tipoVinculacion: 'DIRECTO',
    categoriaLicencia: 'B1',
    numeroLicencia: '1113678901-B1',
    fechaVencimientoLicencia: '2028-11-20',
    fechaExamenMedico: '2026-06-12',
    estadoAptitudMedica: 'APTO',
    kilometrosMesPromedio: 1500,
    comparendosPendientes: 0,
    activo: true
  },
  {
    id: 'cond-5',
    empresaId: 'emp-001',
    cedula: '1088456123',
    nombres: 'William Eduardo',
    apellidos: 'Paz Meneses',
    telefono: '312 678 9012',
    correo: 'william.paz@transvalle.com.co',
    cargo: 'Mensajero y Distribución Motorizada',
    tipoVinculacion: 'CONTRATISTA',
    categoriaLicencia: 'A2',
    numeroLicencia: '1088456123-A2',
    fechaVencimientoLicencia: '2027-02-14',
    fechaExamenMedico: '2026-02-10',
    estadoAptitudMedica: 'APTO',
    kilometrosMesPromedio: 2800,
    comparendosPendientes: 0,
    activo: true
  }
];

export const initialVehiculos: Vehiculo[] = [
  {
    id: 'veh-1',
    empresaId: 'emp-001',
    placa: 'WKK-452',
    tipo: 'CAMION',
    marca: 'Kenworth',
    linea: 'T800 Tractocamión',
    modelo: 2022,
    kilometrajeActual: 148500,
    conductorHabitualId: 'cond-1',
    numeroSoat: '45892019-SEGUROS_BOLIVAR',
    aseguradoraSoat: 'Seguros Bolívar',
    fechaVencimientoSoat: '2027-03-15',
    numeroRtm: 'RTM-789012-CDA_DEL_VALLE',
    cdaRtm: 'CDA del Valle S.A.',
    fechaVencimientoRtm: '2027-04-10',
    estadoOperativo: 'OPERATIVO'
  },
  {
    id: 'veh-2',
    empresaId: 'emp-001',
    placa: 'TRL-890',
    tipo: 'CAMION',
    marca: 'Chevrolet',
    linea: 'FVZ Dobletroque 6x4',
    modelo: 2021,
    kilometrajeActual: 182300,
    conductorHabitualId: 'cond-2',
    numeroSoat: '11894022-SURA',
    aseguradoraSoat: 'Seguros Sura',
    fechaVencimientoSoat: '2026-09-28', // Alerta: por vencer en 14 días
    numeroRtm: 'RTM-665412-CDA_METRO',
    cdaRtm: 'CDA Metropolitano',
    fechaVencimientoRtm: '2026-10-05', // Alerta: por vencer en 21 días
    estadoOperativo: 'OPERATIVO'
  },
  {
    id: 'veh-3',
    empresaId: 'emp-001',
    placa: 'SPQ-123',
    tipo: 'FURGON',
    marca: 'Hino',
    linea: 'Dutro Pro Furgón Refrigerado',
    modelo: 2023,
    kilometrajeActual: 62400,
    conductorHabitualId: 'cond-3',
    numeroSoat: '99014522-ALLIANZ',
    aseguradoraSoat: 'Allianz Seguros',
    fechaVencimientoSoat: '2026-08-25', // Vencido hace días para prueba de semáforo
    numeroRtm: 'RTM-112344-CDA_PACIFICO',
    cdaRtm: 'CDA del Pacífico',
    fechaVencimientoRtm: '2027-01-20',
    estadoOperativo: 'NO_APTO',
    observaciones: 'Vehículo restringido por SOAT vencido.'
  },
  {
    id: 'veh-4',
    empresaId: 'emp-001',
    placa: 'JKN-567',
    tipo: 'CAMIONETA',
    marca: 'Toyota',
    linea: 'Hilux 4x4 Diésel',
    modelo: 2024,
    kilometrajeActual: 31200,
    conductorHabitualId: 'cond-4',
    numeroSoat: '77894101-SEGUROS_ESTADO',
    aseguradoraSoat: 'Seguros del Estado',
    fechaVencimientoSoat: '2027-06-30',
    numeroRtm: 'RTM-998811-CDA_AUTOS',
    cdaRtm: 'CDA Autos de Occidente',
    fechaVencimientoRtm: '2027-06-30',
    estadoOperativo: 'OPERATIVO'
  },
  {
    id: 'veh-5',
    empresaId: 'emp-001',
    placa: 'MBQ-42F',
    tipo: 'MOTOCICLETA',
    marca: 'Yamaha',
    linea: 'XTZ 150',
    modelo: 2023,
    kilometrajeActual: 41800,
    conductorHabitualId: 'cond-5',
    numeroSoat: '33412099-LA_PREVISORA',
    aseguradoraSoat: 'La Previsora Seguros',
    fechaVencimientoSoat: '2027-02-18',
    numeroRtm: 'RTM-456123-CDA_MOTOS',
    cdaRtm: 'CDA Motos del Valle',
    fechaVencimientoRtm: '2027-02-18',
    estadoOperativo: 'OPERATIVO'
  }
];

export const initialRutas: Ruta[] = [
  {
    id: 'rut-1',
    empresaId: 'emp-001',
    codigo: 'RUT-OCC-01',
    nombre: 'Corredor Logístico Cali - Buenaventura',
    origen: 'Zona Industrial Acopi (Yumbo)',
    destino: 'Sociedad Portuaria de Buenaventura',
    distanciaKm: 125,
    tiempoEstimadoMin: 210,
    tipoVia: 'TRONCAL',
    puntosCriticos: [
      'Km 40 Vía al Mar (Curvas cerradas y niebla)',
      'Sector Dagua (Riesgo de derrumbes en época de lluvias)',
      'Descenso Loboguerrero (Riesgo de recalentamiento de frenos)'
    ],
    velocidadMaxSugeridaKmH: 60,
    nivelRiesgoRuta: 'ALTO'
  },
  {
    id: 'rut-2',
    empresaId: 'emp-001',
    codigo: 'RUT-NAL-02',
    nombre: 'Troncal de Occidente Cali - Medellín',
    origen: 'Cali / Yumbo',
    destino: 'Centro Logístico Itagüí',
    distanciaKm: 420,
    tiempoEstimadoMin: 480,
    tipoVia: 'TRONCAL',
    puntosCriticos: [
      'Paso de La Pintada (Tráfico pesado mixto)',
      'Sector Cañafisto (Curvas pronunciadas)',
      'Intersección Buga (Cruce de alta velocidad)'
    ],
    velocidadMaxSugeridaKmH: 70,
    nivelRiesgoRuta: 'MEDIO'
  },
  {
    id: 'rut-3',
    empresaId: 'emp-001',
    codigo: 'RUT-URB-03',
    nombre: 'Distribución Metropolitana Cali - Jamundí',
    origen: 'Centro de Distribución Acopi',
    destino: 'Supermercados Cali Norte, Sur y Jamundí',
    distanciaKm: 48,
    tiempoEstimadoMin: 90,
    tipoVia: 'URBANA',
    puntosCriticos: [
      'Paso Ancho con Carrera 66 (Intersección semafórica conflictiva)',
      'Calle 5ta (Congestión y paso de ciclistas/peatones)',
      'Autopista Simón Bolívar (Maniobras imprevistas de motos)'
    ],
    velocidadMaxSugeridaKmH: 50,
    nivelRiesgoRuta: 'MEDIO'
  }
];

export const initialDiagnostico: DiagnosticoPESV = {
  id: 'diag-001',
  empresaId: 'emp-001',
  fechaDiagnostico: '2026-08-10',
  totalVehiculosAutomotores: 24,
  totalMotocicletas: 6,
  totalConductoresDirectos: 22,
  totalConductoresTerceros: 8,
  clasificacionCalculada: 'ESTANDAR',
  pasosAplicables: 20,
  responsableDiagnostico: 'Dra. Marcela Restrepo Morales'
};

export const initialMatrizRiesgos: MatrizRiesgo[] = [
  {
    id: 'rsg-1',
    empresaId: 'emp-001',
    factor: 'HUMANO',
    peligro: 'Exceso de velocidad en tramos troncales y descensos',
    consecuencia: 'Volcamiento, colisión frontal, pérdida de control con fatalidades',
    probabilidad: 4,
    impacto: 5,
    valorRiesgo: 20,
    clasificacion: 'CRITICO',
    medidaIntervencion: 'INGENIERIA',
    descripcionControl: 'Telemetría GPS en tiempo real con alertas sonoras en cabina al superar 80 km/h y bloqueo gradual por torre de control.',
    responsable: 'Centro de Monitoreo Satelital',
    estado: 'VIGENTE'
  },
  {
    id: 'rsg-2',
    empresaId: 'emp-001',
    factor: 'HUMANO',
    peligro: 'Fatiga y microsueño en trayectos nocturnos mayores a 4 horas',
    consecuencia: 'Salida de la vía, colisión contra objeto fijo, atropellamiento',
    probabilidad: 4,
    impacto: 4,
    valorRiesgo: 16,
    clasificacion: 'CRITICO',
    medidaIntervencion: 'ADMINISTRATIVO',
    descripcionControl: 'Política obligatoria de pausas activas cada 2.5 horas y relevo de conductor en rutas superiores a 8 horas.',
    responsable: 'Coordinador de Despacho',
    estado: 'VIGENTE'
  },
  {
    id: 'rsg-3',
    empresaId: 'emp-001',
    factor: 'VEHICULO',
    peligro: 'Cristalización o falla de frenos en descenso de montaña (Loboguerrero)',
    consecuencia: 'Pérdida de capacidad de frenado, choque múltiple, volcamiento',
    probabilidad: 3,
    impacto: 5,
    valorRiesgo: 15,
    clasificacion: 'ALTO',
    medidaIntervencion: 'ADMINISTRATIVO',
    descripcionControl: 'Inspección preoperacional estricta de zapatas y líquido de frenos + uso obligatorio de freno de motor y retardador.',
    responsable: 'Jefe de Patio / Conductores',
    estado: 'CONTROLADO'
  },
  {
    id: 'rsg-4',
    empresaId: 'emp-001',
    factor: 'ENTORNO',
    peligro: 'Aquaplaning por lluvias torrenciales en la vía al Mar',
    consecuencia: 'Pérdida de tracción, colisión contra barreras de contención',
    probabilidad: 3,
    impacto: 4,
    valorRiesgo: 12,
    clasificacion: 'ALTO',
    medidaIntervencion: 'ADMINISTRATIVO',
    descripcionControl: 'Capacitación en conducción en condiciones climáticas adversas y calibración de profundidad mínima de labrado a 3 mm.',
    responsable: 'Líder de Seguridad Vial',
    estado: 'VIGENTE'
  },
  {
    id: 'rsg-5',
    empresaId: 'emp-001',
    factor: 'HUMANO',
    peligro: 'Uso de teléfono móvil o distracción visual al conducir',
    consecuencia: 'Colisión por alcance posterior, atropello de peatones',
    probabilidad: 3,
    impacto: 3,
    valorRiesgo: 9,
    clasificacion: 'MEDIO',
    medidaIntervencion: 'ADMINISTRATIVO',
    descripcionControl: 'Prohibición estricta de dispositivos móviles en movimiento según política PESV; auditorías de cabina aleatorias.',
    responsable: 'Comité de Seguridad Vial',
    estado: 'CONTROLADO'
  },
  {
    id: 'rsg-6',
    empresaId: 'emp-001',
    factor: 'INFRAESTRUCTURA',
    peligro: 'Baches, desniveles y falta de señalización vertical en vías secundarias',
    consecuencia: 'Daños en suspensión, pinchazo repentino, maniobra evasiva peligrosa',
    probabilidad: 2,
    impacto: 2,
    valorRiesgo: 4,
    clasificacion: 'BAJO',
    medidaIntervencion: 'ADMINISTRATIVO',
    descripcionControl: 'Mapeo de puntos críticos en el rutograma y reducción preventiva de velocidad a 30 km/h en zonas deterioradas.',
    responsable: 'Planificador de Rutas',
    estado: 'CONTROLADO'
  }
];

export const initialInspecciones: InspeccionPreoperacional[] = [
  {
    id: 'insp-001',
    empresaId: 'emp-001',
    vehiculoId: 'veh-1',
    conductorId: 'cond-1',
    fechaHora: '2026-09-14 05:45:00',
    kilometraje: 148500,
    frenosServicio: 'BUENO',
    frenoParqueo: 'BUENO',
    lucesDelanteras: 'BUENO',
    lucesTraserasFreno: 'BUENO',
    direccionales: 'BUENO',
    estadoLlantasLabrado: 'BUENO',
    presionLlantas: 'BUENO',
    nivelAceiteMotor: 'BUENO',
    nivelRefrigerante: 'BUENO',
    nivelLiquidoFrenos: 'BUENO',
    cinturonesSeguridad: 'BUENO',
    limpiabrisas: 'BUENO',
    espejosRetrovisores: 'BUENO',
    fugaFluidos: false,
    kitCarreteraCompleto: true,
    botiquinVigente: true,
    extintorVigente: true,
    decision: 'APROBADO',
    observaciones: 'Vehículo en óptimas condiciones mecánicas para ruta Buenaventura.',
    firmaConductor: 'Andrés Gómez Henao (Firma Digital Verificada)'
  },
  {
    id: 'insp-002',
    empresaId: 'emp-001',
    vehiculoId: 'veh-2',
    conductorId: 'cond-2',
    fechaHora: '2026-09-14 06:10:00',
    kilometraje: 182300,
    frenosServicio: 'BUENO',
    frenoParqueo: 'BUENO',
    lucesDelanteras: 'BUENO',
    lucesTraserasFreno: 'BUENO',
    direccionales: 'REGULAR',
    estadoLlantasLabrado: 'BUENO',
    presionLlantas: 'BUENO',
    nivelAceiteMotor: 'BUENO',
    nivelRefrigerante: 'BUENO',
    nivelLiquidoFrenos: 'BUENO',
    cinturonesSeguridad: 'BUENO',
    limpiabrisas: 'BUENO',
    espejosRetrovisores: 'BUENO',
    fugaFluidos: false,
    kitCarreteraCompleto: true,
    botiquinVigente: true,
    extintorVigente: true,
    decision: 'APROBADO',
    observaciones: 'Direccional trasera derecha con mica opaca pero operativa. Se programa cambio.',
    firmaConductor: 'Javier Muñoz Caicedo (Firma Digital Verificada)'
  },
  {
    id: 'insp-003',
    empresaId: 'emp-001',
    vehiculoId: 'veh-3',
    conductorId: 'cond-3',
    fechaHora: '2026-09-13 07:00:00',
    kilometraje: 62400,
    frenosServicio: 'MALO',
    frenoParqueo: 'BUENO',
    lucesDelanteras: 'BUENO',
    lucesTraserasFreno: 'BUENO',
    direccionales: 'BUENO',
    estadoLlantasLabrado: 'REGULAR',
    presionLlantas: 'BUENO',
    nivelAceiteMotor: 'BUENO',
    nivelRefrigerante: 'REGULAR',
    nivelLiquidoFrenos: 'MALO',
    cinturonesSeguridad: 'BUENO',
    limpiabrisas: 'BUENO',
    espejosRetrovisores: 'BUENO',
    fugaFluidos: true,
    kitCarreteraCompleto: true,
    botiquinVigente: true,
    extintorVigente: true,
    decision: 'RECHAZADO_CRITICO',
    observaciones: 'FUGA CRÍTICA DETECTADA: Pedal de freno con pérdida de presión y fuga en manguera de rueda delantera izquierda. VEHÍCULO INMOVILIZADO EN PATIO.',
    firmaConductor: 'Héctor López Q. (Firma Digital Verificada)'
  }
];

export const initialMantenimientos: Mantenimiento[] = [
  {
    id: 'mnt-001',
    empresaId: 'emp-001',
    vehiculoId: 'veh-3',
    tipo: 'CORRECTIVO',
    fechaProgramada: '2026-09-14',
    fechaEjecutada: '2026-09-14',
    kilometraje: 62400,
    taller: 'Diesel del Valle SAS',
    descripcionTrabajo: 'Cambio urgente de mangueras de frenos delanteras, purga de circuito y reemplazo total de líquido DOT 4.',
    repuestosCambiados: ['Manguera freno delantera izq', 'Líquido freno DOT4 (2L)', 'Juego de pastillas cerámicas'],
    costoTotal: 850000,
    estado: 'COMPLETADO',
    facturaNumero: 'FAC-8921'
  },
  {
    id: 'mnt-002',
    empresaId: 'emp-001',
    vehiculoId: 'veh-1',
    tipo: 'PREVENTIVO',
    fechaProgramada: '2026-09-25',
    kilometraje: 150000,
    taller: 'Kenworth de la Montaña',
    descripcionTrabajo: 'Mantenimiento mayor de los 150.000 km: cambio de aceite 15W40, filtros de combustible, aceite y aire, alineación y balanceo de ejes.',
    repuestosCambiados: ['Filtros primarios/secundarios', 'Aceite sintético Mobil Delvac'],
    costoTotal: 2450000,
    estado: 'PROGRAMADO'
  },
  {
    id: 'mnt-003',
    empresaId: 'emp-001',
    vehiculoId: 'veh-2',
    tipo: 'PREVENTIVO',
    fechaProgramada: '2026-09-10',
    fechaEjecutada: '2026-09-10',
    kilometraje: 182000,
    taller: 'Centro de Servicios Diésel Occidente',
    descripcionTrabajo: 'Calibración de inyectores, cambio de correas de accesorios y revisión de sistema de suspensión neumática.',
    repuestosCambiados: ['Correa alternador', 'Filtro trampa de agua'],
    costoTotal: 1200000,
    estado: 'COMPLETADO',
    facturaNumero: 'FAC-6612'
  }
];

export const initialCapacitaciones: Capacitacion[] = [
  {
    id: 'cap-001',
    empresaId: 'emp-001',
    tema: 'MANEJO_DEFENSIVO',
    titulo: 'Técnicas de Manejo Defensivo y Gestión de Distancias de Seguridad',
    fechaProgramada: '2026-08-20',
    duracionHoras: 4,
    instructor: 'Capitán (R) Jorge H. Cañas - ARL Sura',
    asistentesEsperados: 25,
    asistentesReales: 24,
    estado: 'EJECUTADA'
  },
  {
    id: 'cap-002',
    empresaId: 'emp-001',
    tema: 'FATIGA_DISTRACTORES',
    titulo: 'Control de la Somnolencia, Pausas Activas y Efectos del Uso del Móvil',
    fechaProgramada: '2026-09-05',
    duracionHoras: 3,
    instructor: 'Psicóloga Especialista Lina María Osorio',
    asistentesEsperados: 25,
    asistentesReales: 25,
    estado: 'EJECUTADA'
  },
  {
    id: 'cap-003',
    empresaId: 'emp-001',
    tema: 'PRIMEROS_AUXILIOS',
    titulo: 'Primer Respondiente en Accidentes de Tránsito y Soporte Básico Vital',
    fechaProgramada: '2026-09-28',
    duracionHoras: 6,
    instructor: 'Cruz Roja Colombiana Seccional Valle',
    asistentesEsperados: 25,
    asistentesReales: 0,
    estado: 'PROGRAMADA'
  }
];

export const initialSiniestros: Siniestro[] = [
  {
    id: 'sin-001',
    empresaId: 'emp-001',
    vehiculoId: 'veh-2',
    conductorId: 'cond-2',
    rutaId: 'rut-3',
    fechaHora: '2026-07-18 14:20:00',
    ubicacion: 'Autopista Suroriental con Calle 44, Cali',
    gravedad: 'SOLO_DANOS',
    descripcionHechos: 'Colisión por alcance leve con taxi que frenó intempestivamente para recoger pasajero.',
    causaInmediata: 'Distancia de seguimiento insuficiente en tráfico denso.',
    causaRaiz: 'Falta de anticipación visual y distracción momentánea en punto ciego.',
    diasIncapacidad: 0,
    costoEstimado: 1450000,
    estadoInvestigacion: 'CERRADA',
    planAccionLecciones: 'Retroalimentación individual al conductor con video telemático; reforzamiento de la regla de los 3 segundos en congestión urbana.'
  }
];

// Los 24 Pasos Oficiales de la Resolución 40595 de 2022 y Circular 0034
export const initialEstandaresPESV: EstandarPESV[] = [
  {
    pasoNumero: 1,
    fase: 'PLANIFICACION',
    nombre: 'Líder del diseño e implementación del PESV',
    criterioLegal: 'Designación formal del responsable del PESV con idoneidad, perfil técnico y competencias en SST.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Acta de nombramiento firmada por Gerencia designando a Dra. Marcela Restrepo.'
  },
  {
    pasoNumero: 2,
    fase: 'PLANIFICACION',
    nombre: 'Comité de Seguridad Vial',
    criterioLegal: 'Conformación de comité paritario con actas de reunión bimestrales y seguimiento a compromisos.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Acta de conformación y actas de reuniones de enero, marzo, mayo y julio de 2026.'
  },
  {
    pasoNumero: 3,
    fase: 'PLANIFICACION',
    nombre: 'Política de Seguridad Vial de la Organización',
    criterioLegal: 'Política documentada, fechada, firmada por el representante legal y divulgada a todo el personal.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Política publicada en cartelera institucional y firmada el 15 de enero de 2026.'
  },
  {
    pasoNumero: 4,
    fase: 'PLANIFICACION',
    nombre: 'Liderazgo, compromiso y corresponsabilidad',
    criterioLegal: 'Asignación de recursos financieros, técnicos y humanos específicos para el PESV en el presupuesto anual.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Rubro presupuestal PESV 2026 aprobado por $45.000.000 COP.'
  },
  {
    pasoNumero: 5,
    fase: 'PLANIFICACION',
    nombre: 'Diagnóstico integral de seguridad vial',
    criterioLegal: 'Caracterización de flota, colaboradores, desplazamientos laborales e in itinere y determinación del nivel.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Documento de diagnóstico actualizado con clasificación en nivel Estándar.'
  },
  {
    pasoNumero: 6,
    fase: 'PLANIFICACION',
    nombre: 'Caracterización, evaluación y control de riesgos viales',
    criterioLegal: 'Matriz de identificación de peligros viales bajo factores humano, vehicular, vial y ambiental.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Matriz de riesgos viales vigente con 6 peligros evaluados y planes de acción.'
  },
  {
    pasoNumero: 7,
    fase: 'PLANIFICACION',
    nombre: 'Objetivos y metas del PESV',
    criterioLegal: 'Objetivos medibles, coherentes con la política y alineados con la reducción de la siniestralidad.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Ficha de metas 2026: Reducción del 15% en incidentes y 100% de inspecciones operacionales.'
  },
  {
    pasoNumero: 8,
    fase: 'PLANIFICACION',
    nombre: 'Programas de gestión de riesgos críticos',
    criterioLegal: 'Programas específicos para velocidad segura, prevención de fatiga, no uso de distractores y EPP.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Manuales de los 4 programas de riesgos críticos aprobados y en ejecución.'
  },
  {
    pasoNumero: 9,
    fase: 'IMPLEMENTACION',
    nombre: 'Plan anual de trabajo del PESV',
    criterioLegal: 'Cronograma detallado con actividades, responsables, fechas y porcentaje de ejecución mensual.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Plan de trabajo anual con avance global del 78% al mes de agosto.'
  },
  {
    pasoNumero: 10,
    fase: 'IMPLEMENTACION',
    nombre: 'Competencia y plan anual de formación en seguridad vial',
    criterioLegal: 'Programa de capacitación teórica y práctica con evaluación de conocimientos a conductores y personal.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Registros de asistencia y evaluaciones de manejo defensivo y fatiga.'
  },
  {
    pasoNumero: 11,
    fase: 'IMPLEMENTACION',
    nombre: 'Responsabilidad y comportamiento seguro',
    criterioLegal: 'Inclusión de deberes de seguridad vial en contratos, manuales de funciones y evaluación de desempeño.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Anexos a contratos laborales con obligaciones expresas en seguridad vial.'
  },
  {
    pasoNumero: 12,
    fase: 'IMPLEMENTACION',
    nombre: 'Plan de preparación y respuesta ante emergencias viales',
    criterioLegal: 'Protocolo PAS (Proteger, Avisar, Socorrer) y cadena de llamadas de emergencia en carretera.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Cartilla PAS entregada a cada conductor y visible en cabina.'
  },
  {
    pasoNumero: 13,
    fase: 'IMPLEMENTACION',
    nombre: 'Investigación interna de accidentes de tránsito',
    criterioLegal: 'Procedimiento metodológico de investigación con árbol de causas, lecciones aprendidas y seguimiento.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Informe técnico de investigación del siniestro SIN-001 cerrado con plan de acción.'
  },
  {
    pasoNumero: 14,
    fase: 'IMPLEMENTACION',
    nombre: 'Vías seguras administradas por la organización',
    criterioLegal: 'Señalización, demarcación de sentidos, límites de velocidad y pasos peatonales en parqueaderos y patios.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Plano y señalización vial interna del patio logístico de Acopi con reductores de velocidad.'
  },
  {
    pasoNumero: 15,
    fase: 'IMPLEMENTACION',
    nombre: 'Planificación de desplazamientos laborales (Rutogramas)',
    criterioLegal: 'Estudio de rutas, tiempos de descanso, identificación de puntos críticos y velocidad permitida.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Rutogramas formalizados para corredor Buenaventura y Medellín.'
  },
  {
    pasoNumero: 16,
    fase: 'IMPLEMENTACION',
    nombre: 'Inspección diaria preoperacional de vehículos',
    criterioLegal: 'Checklist documentado y verificado antes de iniciar cualquier marcha diaria con inmovilización si hay fallas.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Sistema digital de preoperacional con 100% de trazabilidad y rechazos inmediatos por fallas.'
  },
  {
    pasoNumero: 17,
    fase: 'IMPLEMENTACION',
    nombre: 'Mantenimiento preventivo y correctivo de vehículos',
    criterioLegal: 'Plan de mantenimiento basado en manuales del fabricante con hojas de vida y facturación de talleres.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Hojas de vida de flota y órdenes de servicio al día.'
  },
  {
    pasoNumero: 18,
    fase: 'IMPLEMENTACION',
    nombre: 'Gestión del cambio y contratistas en seguridad vial',
    criterioLegal: 'Exigencia de cumplimiento PESV a transportadores terceros y monitoreo del cambio operacional.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'NO_CUMPLE',
    evidenciaTexto: '',
    observaciones: 'Pendiente auditoría documental a 3 contratistas de transporte de carga líquida.'
  },
  {
    pasoNumero: 19,
    fase: 'IMPLEMENTACION',
    nombre: 'Archivo y retención documental del PESV',
    criterioLegal: 'Custodia segura digital de registros por mínimo 5 años garantizando trazabilidad y confidencialidad.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Repositorio seguro con copias periódicas de seguridad de toda la documentación.'
  },
  {
    pasoNumero: 20,
    fase: 'SEGUIMIENTO',
    nombre: 'Indicadores de desempeño y reporte de gestión',
    criterioLegal: 'Medición mensual de indicadores de estructura, proceso y resultado (siniestralidad, mantenimiento).',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Tablero mensual de KPIs viales con corte a agosto 2026.'
  },
  {
    pasoNumero: 21,
    fase: 'SEGUIMIENTO',
    nombre: 'Registro y análisis estadístico de siniestros viales',
    criterioLegal: 'Base histórica con cálculo de tasas por millón de kilómetros e identificación de patrones de riesgo.',
    aplicaNivel: ['ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Estadística consolidada de siniestralidad 2025-2026.'
  },
  {
    pasoNumero: 22,
    fase: 'SEGUIMIENTO',
    nombre: 'Auditoría anual del PESV',
    criterioLegal: 'Auditoría interna o externa anual con equipo auditor competente e informe de no conformidades.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Informe de auditoría interna de fecha 15 de agosto de 2026.'
  },
  {
    pasoNumero: 23,
    fase: 'MEJORA',
    nombre: 'Plan de mejora continua y acciones correctivas',
    criterioLegal: 'Planes de acción derivados de auditorías, siniestros e inspecciones con seguimiento a cierre.',
    aplicaNivel: ['BASICO', 'ESTANDAR', 'AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'CUMPLE',
    evidenciaTexto: 'Plan de mejoramiento PESV con 4 acciones correctivas en ejecución.'
  },
  {
    pasoNumero: 24,
    fase: 'MEJORA',
    nombre: 'Mecanismos de comunicación y participación',
    criterioLegal: 'Canales bidireccionales para que conductores reporten condiciones inseguras en vías y vehículos.',
    aplicaNivel: ['AVANZADO'],
    pesoPorcentual: 4.16,
    cumple: 'NO_APLICA',
    evidenciaTexto: 'No aplica por ser empresa clasificada en nivel Estándar (opcional para Avanzado).'
  }
];

export const initialIndicadores: IndicadorMensual[] = [
  {
    id: 'ind-2026-05',
    empresaId: 'emp-001',
    mes: '2026-05',
    siniestrosTotal: 0,
    siniestrosConLesion: 0,
    tasaSiniestralidad: 0,
    preoperacionalesProgramados: 310,
    preoperacionalesRealizados: 302,
    cumplimientoPreoperacionalPct: 97.4,
    mantenimientosEjecutados: 4,
    mantenimientosProgramados: 4,
    cumplimientoMantenimientoPct: 100,
    kilometrosFlotaTotal: 48200,
    conductoresCapacitadosPct: 92
  },
  {
    id: 'ind-2026-06',
    empresaId: 'emp-001',
    mes: '2026-06',
    siniestrosTotal: 0,
    siniestrosConLesion: 0,
    tasaSiniestralidad: 0,
    preoperacionalesProgramados: 300,
    preoperacionalesRealizados: 295,
    cumplimientoPreoperacionalPct: 98.3,
    mantenimientosEjecutados: 5,
    mantenimientosProgramados: 5,
    cumplimientoMantenimientoPct: 100,
    kilometrosFlotaTotal: 51000,
    conductoresCapacitadosPct: 96
  },
  {
    id: 'ind-2026-07',
    empresaId: 'emp-001',
    mes: '2026-07',
    siniestrosTotal: 1,
    siniestrosConLesion: 0,
    tasaSiniestralidad: 1.88,
    preoperacionalesProgramados: 310,
    preoperacionalesRealizados: 308,
    cumplimientoPreoperacionalPct: 99.3,
    mantenimientosEjecutados: 3,
    mantenimientosProgramados: 4,
    cumplimientoMantenimientoPct: 75,
    kilometrosFlotaTotal: 53100,
    conductoresCapacitadosPct: 100
  },
  {
    id: 'ind-2026-08',
    empresaId: 'emp-001',
    mes: '2026-08',
    siniestrosTotal: 0,
    siniestrosConLesion: 0,
    tasaSiniestralidad: 0,
    preoperacionalesProgramados: 310,
    preoperacionalesRealizados: 310,
    cumplimientoPreoperacionalPct: 100,
    mantenimientosEjecutados: 6,
    mantenimientosProgramados: 6,
    cumplimientoMantenimientoPct: 100,
    kilometrosFlotaTotal: 54900,
    conductoresCapacitadosPct: 100
  }
];
