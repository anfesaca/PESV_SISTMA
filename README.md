# PESV Sistema — Plataforma de Gestión del Plan Estratégico de Seguridad Vial

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white&style=flat-square)

## Descripción General

PESV Sistema es una aplicación web para la gestión integral del **Plan Estratégico de Seguridad Vial (PESV)**, diseñada para apoyar a las organizaciones en el cumplimiento de la normativa colombiana de seguridad vial (incluyendo la Circular 0034). Permite administrar conductores, vehículos, rutas, siniestros, mantenimiento, indicadores y reportes desde un solo lugar.

## Características Principales

| Módulo | Descripción |
| --- | --- |
| Dashboard | Vista general con indicadores clave del PESV |
| Conductores | Registro y seguimiento de conductores |
| Vehículos | Inventario y control de la flota vehicular |
| Rutas | Gestión de rutas y trayectos |
| Mantenimiento | Programación y control de mantenimiento vehicular |
| Matriz de Riesgos | Identificación y evaluación de riesgos viales |
| Inspección Preoperacional | Registro de inspecciones antes de cada viaje |
| Siniestros | Registro y análisis de siniestros viales |
| Capacitación | Seguimiento a la formación en seguridad vial |
| Indicadores | Visualización de métricas y KPIs del PESV |
| Autoevaluación Circular 0034 | Autoevaluación conforme a la normativa vigente |
| Reportes y Exportación | Generación de reportes exportables (Excel) |
| Configuración | Ajustes generales del sistema |

## Tecnologías

- **React** — construcción de la interfaz de usuario
- **TypeScript** — tipado estático
- **Vite** — entorno de desarrollo y build
- **Oxlint** — linting del proyecto

## Estructura del Proyecto

```
pesv-sistema/
├── public/                        # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── layout/                # Sidebar, NotificationBanner, etc.
│   │   └── modules/                # Módulos funcionales del PESV
│   ├── context/                   # Contexto global (PesvContext)
│   ├── data/                      # Datos iniciales
│   ├── types/                     # Tipados de TypeScript
│   ├── utils/                     # Utilidades (cálculos, exportación a Excel)
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm (incluido con Node.js)

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/anfesaca/PESV_SISTMA.git
cd PESV_SISTMA
npm install
```

## Ejecución en Desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173/`.

## Compilación para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## Vista Previa de la Build de Producción

```bash
npm run preview
```

## Linting

Este proyecto usa [Oxlint](https://oxc.rs) para el análisis estático del código:

```bash
npm run lint
```

## Licencia

Este proyecto es de uso interno / privado. Ajusta esta sección según corresponda.
