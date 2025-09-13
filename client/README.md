# 💸 Cotzia — Frontend (Next.js)

Bienvenido al repositorio del **frontend** de **Cotzia**, un sistema integral de gestión de costos y presupuestos empresariales. Diseñado para automatizar el control de costos de producción, gestión de insumos, productos y generación de presupuestos precisos.
Este proyecto forma parte de una solución fullstack, y esta carpeta corresponde a la aplicación desarrollada con **Next.js** + **Tailwind CSS** + **TypeScript**.

---

## 🧠 Objetivo del Proyecto

Cotzia digitaliza y automatiza procesos clave para la gestión empresarial:
📦 **Gestión de insumos y productos** - Control completo de inventario
⚙️ **Calculadora de costos** - Cálculo automático y manual de costos de producción
🧾 **Generación de presupuestos** - Presupuestos precisos y profesionales
📊 **Dashboard interactivo** - Visualización de datos en tiempo real
📝 **Exportación de reportes** - Reportes en PDF y Excel
👥 **Gestión de usuarios** - Control de acceso y colaboración

Este frontend consume una API REST desarrollada en el backend.

---

## 👥 Equipo de Desarrollo Frontend

- [Franco Maidana](https://github.com/maidana0)
- [Matías Diaconchuk](https://github.com/mdiaconchuk)
- [Luis Angel](https://github.com/devjsluis)

Convención de ramas: `client/feature/...`, siguiendo el flujo **GitFlow**.

### Estructura de Ramas
- `main`: Rama principal de producción
- `develop`: Rama de desarrollo

### Convenciones de Commits
Se sigue una estructura clara para los mensajes de commit:
- `feat`: Nuevas características
- `fix`: Correcciones de bugs
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el significado del código
- `refactor`: Refactorización del código
- `test`: Añadir o corregir tests

---

## 🚀 Tecnologías Utilizadas

- **Next.js 15** (App Router + Server Actions)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4** + `tw-animate-css`
- **Zod** (validación de formularios)
- **React Hook Form** (manejo de formularios)
- **Zustand** (estado global)
- **TanStack Query** (gestión de estado servidor)
- **TanStack Table** (tablas de datos)
- **Lucide React** (íconos)
- **Radix UI** (componentes primitivos)
- **class-variance-authority** y **clsx** (utilidades CSS)
- **Recharts** (gráficos y visualización)
- **jsPDF** y **React PDF** (exportación de reportes)
- **date-fns** (manejo de fechas)
- **Sonner** (notificaciones)

---

## 📂 Estructura del Proyecto

```
client/
├── public/             # Imágenes públicas, favicons, assets
│   └── assets/         # Imágenes de la aplicación
├── src/
│   ├── app/            # App router de Next.js (layouts, pages, routing)
│   │   ├── (auth)/     # Rutas de autenticación
│   │   ├── (items)/    # Gestión de productos e insumos
│   │   ├── api/        # API routes
│   │   ├── calculadora/# Calculadora de costos
│   │   ├── configuracion/ # Configuración del sistema
│   │   └── inicio/     # Dashboard principal
│   ├── components/     # Componentes reutilizables organizados por feature
│   │   ├── auth/       # Componentes de autenticación
│   │   ├── calculator/ # Componentes de calculadora
│   │   ├── dashboard/  # Componentes del dashboard
│   │   ├── landing/    # Página de inicio
│   │   ├── shared/     # Componentes compartidos
│   │   └── ui/         # Componentes base de UI
│   ├── hooks/          # Custom React hooks
│   ├── interfaces/     # Interfaces TypeScript
│   ├── lib/            # Funciones auxiliares y configuraciones
│   ├── providers/      # Providers de contexto
│   ├── schemas/        # Esquemas de validación Zod
│   ├── store/          # Zustand global store
│   ├── types/          # Tipos TypeScript
│   └── utils/          # Utilidades y helpers
├── .env.example        # Variables de entorno de ejemplo
├── package.json        # Configuración de dependencias y scripts
└── tsconfig.json       # Configuración de TypeScript
```

---

## ✨ Funcionalidades Implementadas

### 🔐 **Autenticación**
- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña
- Gestión de sesiones

### 📊 **Dashboard**
- Panel de control con métricas
- Visualización de productos e insumos
- Gráficos interactivos
- Cards informativas

### 🧮 **Calculadora de Costos**
- Cálculo automático de costos de producción
- Gestión de costos indirectos
- Cálculo de mano de obra
- Generación de presupuestos

### 📦 **Gestión de Productos e Insumos**
- CRUD completo de productos
- CRUD completo de insumos
- Sistema de categorización
- Control de stock

### ⚙️ **Configuración**
- Configuración de costos generales
- Gestión de perfil de usuario
- Configuración de notificaciones
- Gestión de usuarios (admin)

### 📋 **Reportes y Exportación**
- Exportación a PDF
- Exportación a Excel
- Historial de operaciones
- Reportes personalizados

---

## 📦 Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/schweigenderFlugel/costflow.git
cd costflow/client
```

2. Instala las dependencias (usa el gestor que prefieras):

```bash
# Con Bun (recomendado)
bun install

# O con npm
npm install
```

3. Crea tu archivo `.env.local` a partir de `.env.example`.
   Variables necesarias:

```env
SERVER_API=http://localhost:3000/api
```

4. Levanta el servidor de desarrollo:

```bash
bun run dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🛠️ Scripts Útiles

```bash
bun run dev        # Inicia el modo desarrollo con Turbopack
bun run build      # Compila la app para producción
bun run start      # Sirve la app compilada
bun run lint       # Linter con ESLint
```

---

## 🔗 Enlaces Útiles

* 🌐 **Deploy:** https://cotzia.vercel.app
* 🛠 **Servidor Backend:** *\[link por definir]*
* 🎨 **Diseño Figma:** https://www.figma.com/design/zyar1gseMkji8Ut3Xaskhv/Cotzia---Foo-Talent-Group---Equipo-4---Noche
* 📋 **Casos de Uso:** [📝 Documento de Casos de Uso](https://github.com/schweigenderFlugel/costflow/blob/main/docs/CUS.pdf)

---

## 🎯 Próximas Características

* Notificaciones en tiempo real
* Integración con sistemas de inventario externos
* Análisis predictivo de costos
* API para integraciones de terceros
* Aplicación móvil

---

📌 **Nota:** Este proyecto está en desarrollo activo. Las funcionalidades pueden cambiar y mejorarse continuamente.

---
