import * as XLSX from 'xlsx';
import {
  Vehiculo,
  Conductor,
  InspeccionPreoperacional,
  MatrizRiesgo,
  Mantenimiento,
  EstandarPESV,
  Empresa
} from '../types/pesv';
import { getDocumentStatus } from './pesvCalculations';

export function exportFullPesvExcel(
  empresa: Empresa,
  vehiculos: Vehiculo[],
  conductores: Conductor[],
  inspecciones: InspeccionPreoperacional[],
  riesgos: MatrizRiesgo[],
  mantenimientos: Mantenimiento[],
  estandares: EstandarPESV[]
) {
  const wb = XLSX.utils.book_new();

  // 1. Hoja Portada y Empresa
  const empresaData = [
    { 'CAMPO': 'Razón Social', 'VALOR': empresa.razonSocial },
    { 'CAMPO': 'NIT', 'VALOR': empresa.nit },
    { 'CAMPO': 'Actividad Económica', 'VALOR': empresa.actividadEconomica },
    { 'CAMPO': 'Ciudad y Dirección', 'VALOR': `${empresa.ciudad} - ${empresa.direccion}` },
    { 'CAMPO': 'Representante Legal', 'VALOR': empresa.representanteLegal },
    { 'CAMPO': 'Responsable PESV', 'VALOR': empresa.responsablePesv },
    { 'CAMPO': 'Nivel PESV Asignado', 'VALOR': empresa.nivelPesv },
    { 'CAMPO': 'Fecha de Generación', 'VALOR': new Date().toLocaleString('es-CO') }
  ];
  const wsEmpresa = XLSX.utils.json_to_sheet(empresaData);
  XLSX.utils.book_append_sheet(wb, wsEmpresa, 'Datos_Empresa');

  // 2. Hoja Vehículos
  const vehiculosData = vehiculos.map(v => {
    const stSoat = getDocumentStatus(v.fechaVencimientoSoat);
    const stRtm = getDocumentStatus(v.fechaVencimientoRtm);
    return {
      'Placa': v.placa,
      'Tipo': v.tipo,
      'Marca / Línea': `${v.marca} ${v.linea}`,
      'Modelo': v.modelo,
      'Kilometraje': v.kilometrajeActual,
      'Estado Operativo': v.estadoOperativo,
      'No. SOAT': v.numeroSoat,
      'Vencimiento SOAT': v.fechaVencimientoSoat,
      'Estado SOAT': stSoat.label,
      'No. RTM': v.numeroRtm,
      'Vencimiento RTM': v.fechaVencimientoRtm,
      'Estado RTM': stRtm.label
    };
  });
  const wsVeh = XLSX.utils.json_to_sheet(vehiculosData);
  XLSX.utils.book_append_sheet(wb, wsVeh, 'Flota_Vehicular');

  // 3. Hoja Conductores
  const conductoresData = conductores.map(c => {
    const stLic = getDocumentStatus(c.fechaVencimientoLicencia);
    return {
      'Cédula': c.cedula,
      'Nombres y Apellidos': `${c.nombres} ${c.apellidos}`,
      'Teléfono': c.telefono,
      'Cargo': c.cargo,
      'Vinculación': c.tipoVinculacion,
      'Categoría Licencia': c.categoriaLicencia,
      'Vencimiento Licencia': c.fechaVencimientoLicencia,
      'Estado Licencia': stLic.label,
      'Aptitud Médica': c.estadoAptitudMedica,
      'Restricciones Médicas': c.restriccionesMedicas || 'Ninguna',
      'Comparendos': c.comparendosPendientes
    };
  });
  const wsCond = XLSX.utils.json_to_sheet(conductoresData);
  XLSX.utils.book_append_sheet(wb, wsCond, 'Conductores');

  // 4. Hoja Inspecciones Preoperacionales
  const inspData = inspecciones.map(i => {
    const veh = vehiculos.find(v => v.id === i.vehiculoId);
    const cond = conductores.find(c => c.id === i.conductorId);
    return {
      'Fecha y Hora': i.fechaHora,
      'Vehículo': veh ? veh.placa : i.vehiculoId,
      'Conductor': cond ? `${cond.nombres} ${cond.apellidos}` : i.conductorId,
      'Kilometraje': i.kilometraje,
      'Frenos Servicio': i.frenosServicio,
      'Freno Parqueo': i.frenoParqueo,
      'Luces Delanteras': i.lucesDelanteras,
      'Direccionales': i.direccionales,
      'Labrado Llantas': i.estadoLlantasLabrado,
      'Líquido Frenos': i.nivelLiquidoFrenos,
      'Fuga Fluidos': i.fugaFluidos ? 'SI (PELIGRO)' : 'NO',
      'Kit Carretera': i.kitCarreteraCompleto ? 'Completo' : 'Incompleto',
      'DECISIÓN OPERATIVA': i.decision,
      'Observaciones': i.observaciones || ''
    };
  });
  const wsInsp = XLSX.utils.json_to_sheet(inspData);
  XLSX.utils.book_append_sheet(wb, wsInsp, 'Inspecciones_Preop');

  // 5. Hoja Matriz de Riesgos
  const riesgosData = riesgos.map(r => ({
    'Factor': r.factor,
    'Peligro Identificado': r.peligro,
    'Consecuencia': r.consecuencia,
    'Probabilidad (1-5)': r.probabilidad,
    'Impacto (1-5)': r.impacto,
    'Valor Riesgo (PxI)': r.valorRiesgo,
    'Nivel': r.clasificacion,
    'Jerarquía Control': r.medidaIntervencion,
    'Control Operacional': r.descripcionControl,
    'Responsable': r.responsable,
    'Estado': r.estado
  }));
  const wsRsg = XLSX.utils.json_to_sheet(riesgosData);
  XLSX.utils.book_append_sheet(wb, wsRsg, 'Matriz_Riesgos');

  // 6. Hoja Autoevaluación Oficial Circular 0034 / Res 40595
  const autoevalData = estandares.map(e => ({
    'Paso #': e.pasoNumero,
    'Fase PESV': e.fase,
    'Estándar': e.nombre,
    'Criterio Legal': e.criterioLegal,
    'Aplica a Nivel': e.aplicaNivel.join(', '),
    'Peso (%)': e.pesoPorcentual,
    'Estado Cumplimiento': e.cumple,
    'Evidencia / Soporte': e.evidenciaTexto,
    'Observaciones de Auditoría': e.observaciones || ''
  }));
  const wsEval = XLSX.utils.json_to_sheet(autoevalData);
  XLSX.utils.book_append_sheet(wb, wsEval, 'Autoevaluacion_Oficial');

  // Descarga del libro de Excel
  const filename = `PESV_Reporte_Integral_${empresa.nit.replace(/[^0-9]/g, '')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, filename);
}
