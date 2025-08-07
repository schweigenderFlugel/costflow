# 💸 CostFlow — Frontend (Next.js)

Bienvenido al repositorio del **frontend** de **CostFlow**, un sistema integral de gestión para laboratorios como **Laiquén**, enfocado en la automatización del control de costos de producción, insumos, recetas y stock.  
Este proyecto forma parte de una solución fullstack, y esta carpeta corresponde a la aplicación desarrollada con **Next.js** + **Tailwind CSS** + **TypeScript**.

---

## 🧠 Objetivo del Proyecto

Digitalizar y automatizar procesos clave del laboratorio Laiquén:  
📦 Gestión de insumos y productos  
⚙️ Recetas de producción  
🧾 Cálculo automático de costos  
📊 Dashboards interactivos  
📝 Generación de reportes exportables  

Este frontend consumirá una API REST desarrollada en el backend (ver carpeta `server`).

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
- **Lucide React** (íconos)
- **clsx** y **class-variance-authority** (utilidades CSS)

---

## 📂 Estructura del Proyecto

```

client/
├── public/             # Imágenes públicas, favicons, etc.
├── src/
│   ├── actions/        # Server actions para formularios y lógica
│   ├── app/            # App router de Next.js (layouts, pages, routing)
│   ├── components/     # Componentes reutilizables de UI
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layouts base para páginas
│   ├── lib/            # Funciones auxiliares y utils compartidos
│   ├── providers/      # Providers de contexto
│   ├── store/          # Zustand global store
│   ├── types/          # Tipos y modelos compartidos (TS)
│   └── utils/          # Utilidades y helpers generales
├── .env.example        # Variables de entorno de ejemplo
├── package.json        # Configuración de dependencias y scripts
├── tsconfig.json       # Configuración de TypeScript

````

---

## 🧪 Casos de Uso

Los casos de uso fueron modelados para cubrir el ciclo completo de:
- Carga y edición de insumos y productos
- Generación y edición de recetas
- Cálculo de costos (manual, automático, con inflación, etc.)
- Visualización de dashboards
- Exportación de reportes
- Registro y autenticación de usuarios
- Gestión de stock y producción

Más detalles: [📝 Documento de Casos de Uso](https://github.com/schweigenderFlugel/costflow/blob/main/docs/CUS.pdf)

---

## 📦 Instalación Local

1. Clona el repositorio:  
```bash
git clone https://github.com/schweigenderFlugel/costflow.git
cd costflow/client
````

2. Instala las dependencias (usa el gestor que prefieras):

```bash
# Con Bun
bun install

# O con npm
npm install
```

3. Crea tu archivo `.env.local` a partir de `.env.example`.
   Por ahora solo es obligatoria:

```
SERVER_API=http://localhost:3000/api
```

4. Levanta el servidor de desarrollo:

```bash
bun run dev
# o
npm run dev
```

---

## 🛠️ Scripts Útiles

```bash
bun run dev        # Inicia el modo desarrollo
bun run build      # Compila la app para producción
bun run start      # Sirve la app compilada
bun run lint       # Linter con ESLint
```

---

## 🔗 Enlaces Útiles

* 🌐 **Deploy (pendiente)**
* 🛠 **Servidor Backend:** *\[link por definir]()
* 🎨 **Diseño Figma:** *\[link por definir]*
* 📋 **Miro Board:** *\[link por definir]*

---

## ✨ Próximamente

* Autenticación
* Dashboard interactivo con filtros
* Control de stock en tiempo real
* Exportación a Excel y PDF

---

📌 **Nota:** Este proyecto está en desarrollo activo. Las funcionalidades pueden cambiar.

---