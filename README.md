# 💪 Gym Tracker - Full Stack Training Logger

Una aplicación web completa para el seguimiento y análisis de entrenamientos en el gimnasio, desarrollada como proyecto personal enfocado en buenas prácticas de desarrollo y arquitectura escalable.

![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST_Framework-ff1709?style=flat&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 🎯 Características Principales

### ✅ Gestión de Ejercicios
- Catálogo global de 27+ ejercicios pre-cargados
- Creación de ejercicios personalizados
- Filtrado por grupo muscular y búsqueda en tiempo real
- Sistema híbrido: ejercicios globales + custom por usuario

### 📋 Rutinas de Entrenamiento
- Creación de plantillas de rutinas personalizadas
- Agregar/editar/eliminar ejercicios de rutinas
- Configuración de sets y reps objetivo por ejercicio
- Marcado de rutina activa
- Estimación de duración del entrenamiento

### 🏋️ Logger de Entrenamientos
- Registro en tiempo real de entrenamientos
- Inicio desde rutina o workout freestyle
- Tracking de peso, repeticiones y RPE (Rate of Perceived Exertion)
- Agregar/editar/eliminar sets durante el entrenamiento
- Agregar ejercicios on-the-fly
- Cálculo automático de volumen total
- Historial completo de entrenamientos

### 📊 Dashboard y Estadísticas
- Métricas del mes: entrenamientos, volumen total
- Historial de entrenamientos recientes
- Visualización de progreso

### 🔐 Autenticación Segura
- Sistema de sessions con Django (no JWT)
- CSRF protection
- Registro y login con validación
- Gestión de perfil de usuario

---

## 🏗️ Arquitectura

### Backend (Django + DRF)

```
backend/
├── apps/
│   ├── users/          # Autenticación y perfiles
│   ├── exercises/      # Catálogo de ejercicios
│   ├── routines/       # Plantillas de entrenamiento
│   ├── workouts/       # Logger y historial
│   └── ai_coach/       # (Próximamente)
├── core/               # Utilidades compartidas
│   ├── permissions.py  # Permisos custom
│   ├── pagination.py   # Paginación
│   └── exceptions.py   # Excepciones
└── config/
    └── settings/       # Settings modulares (dev/prod)
```

**Decisiones Técnicas:**
- **Apps por dominio**: Cada app representa un bounded context (DDD)
- **Settings modulares**: Separación clara dev/prod para facilitar deployment
- **Sessions > JWT**: Para un MVP, sessions ofrecen logout real sin complejidad adicional
- **Permissions custom**: `IsOwner`, `IsOwnerOrGlobal` para control granular de acceso
- **Serializers nested**: Hasta 3 niveles (Workout → Exercise → Set) con validaciones

### Frontend (React + TypeScript)

```
frontend/
├── src/
│   ├── features/           # Feature-based architecture
│   │   ├── auth/
│   │   ├── exercises/
│   │   ├── routines/
│   │   └── workouts/
│   └── shared/
│       ├── api/            # Axios client + CSRF handling
│       ├── components/     # Componentes reutilizables
│       └── hooks/          # Custom hooks
```

**Decisiones Técnicas:**
- **Feature-based structure**: Todo lo relacionado a una feature está junto
- **TypeScript**: Type safety en toda la aplicación
- **Tailwind CSS**: Utility-first para desarrollo rápido
- **Custom hooks**: Lógica reutilizable (`useAuth`, `useExercises`, `useWorkout`)
- **Axios interceptors**: Manejo automático de CSRF tokens

---

## 🛠️ Stack Tecnológico

### Backend
- **Django 5.x** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Base de datos (SQLite en dev)
- **django-cors-headers** - CORS handling
- **django-filter** - Filtrado avanzado
- **python-dotenv** - Variables de entorno

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool (HMR ultrarrápido)
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Styling
- **Lucide React** - Iconos

### Futuro
- **Groq API** - IA Coach con Llama 3.1
- **Recharts** - Gráficos de progreso
- **Railway** - Deploy backend
- **Vercel** - Deploy frontend

---

## 🚀 Instalación

### Prerrequisitos
- Python 3.12+
- Node.js 18+
- PostgreSQL (opcional, usa SQLite en dev)

### Backend

```bash
# Clonar repositorio
git clone git@github.com:ValenBelone7/Gym-Tracker-Backend.git
cd gym-tracker-backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Migraciones
python manage.py migrate

# Cargar ejercicios iniciales
python manage.py seed_exercises

# Crear superusuario
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver
```

### Frontend

```bash
# Clonar repositorio
git clone git@github.com:ValenBelone7/Gym-Tracker-Frontend.git
cd gym-tracker-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.development
# Verificar que VITE_API_URL apunte a http://localhost:8000/api

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Django: http://localhost:8000/admin

---

## 📖 Uso

### 1. Crear una Rutina
1. Ir a "Rutinas" → "+ Nueva Rutina"
2. Ingresar nombre y descripción
3. Click "Crear Rutina"
4. Agregar ejercicios desde el catálogo
5. Configurar sets y reps objetivo

### 2. Registrar un Entrenamiento
1. Dashboard → "Empezar ahora"
2. Agregar ejercicios (o iniciar desde rutina)
3. Registrar sets con peso/reps/RPE
4. Click "Finalizar Entrenamiento"

### 3. Ver Progreso
1. Dashboard muestra estadísticas del mes
2. "Entrenamientos" muestra historial completo
3. Click en workout para ver detalle

---

## 🔑 API Endpoints

### Autenticación
```
POST   /api/auth/register      # Registrar usuario
POST   /api/auth/login         # Login
POST   /api/auth/logout        # Logout
GET    /api/auth/me            # Usuario actual
PATCH  /api/auth/profile       # Actualizar perfil
```

### Ejercicios
```
GET    /api/exercises/         # Listar (con filtros)
POST   /api/exercises/         # Crear custom
GET    /api/exercises/:id/     # Detalle
PATCH  /api/exercises/:id/     # Actualizar custom
DELETE /api/exercises/:id/     # Borrar custom
```

### Rutinas
```
GET    /api/routines/                      # Listar
POST   /api/routines/                      # Crear
GET    /api/routines/:id/                  # Detalle
PATCH  /api/routines/:id/                  # Actualizar
DELETE /api/routines/:id/                  # Borrar
POST   /api/routines/:id/exercises/        # Agregar ejercicio
PATCH  /api/routines/:id/exercises/:ex_id/ # Editar ejercicio
DELETE /api/routines/:id/exercises/:ex_id/ # Quitar ejercicio
POST   /api/routines/:id/start-workout/    # Iniciar workout
```

### Entrenamientos
```
GET    /api/workouts/                            # Listar
POST   /api/workouts/                            # Crear
GET    /api/workouts/:id/                        # Detalle
DELETE /api/workouts/:id/                        # Borrar
POST   /api/workouts/:id/exercises/              # Agregar ejercicio
DELETE /api/workouts/:id/exercises/:ex_id/       # Quitar ejercicio
POST   /api/workouts/:id/exercises/:ex_id/sets/  # Agregar set
PATCH  /api/workouts/:id/exercises/:ex_id/sets/:set_id/ # Editar set
DELETE /api/workouts/:id/exercises/:ex_id/sets/:set_id/ # Borrar set
POST   /api/workouts/:id/finish/                 # Finalizar
```

---

## 🧪 Testing

### Backend
```bash
# Ejecutar tests
python manage.py test

# Con coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend
```bash
# Ejecutar tests (cuando se implementen)
npm test
```

### Testing Manual
Incluye collection de Postman en `/docs/postman_collection.json` con todos los endpoints configurados.

---

## 🎓 Aprendizajes Clave

### Decisiones Arquitectónicas

**1. Sessions vs JWT**
- Elegí sessions para el MVP por simplicidad y seguridad
- Logout real sin complejidad de blacklist/refresh tokens
- Menor superficie de ataque
- Si escalo a mobile, puedo agregar JWT después

**2. Feature-based Structure en Frontend**
- Escalabilidad: fácil agregar/remover features
- Cohesión: todo lo relacionado está junto
- Mantenibilidad: imports claros y cortos

**3. Serializers Nested con Escritura**
- Desafío: Serializers nested con write operations
- Solución: Separar en `CreateSerializer` y `UpdateSerializer`
- Beneficio: API más limpia para el frontend

**4. Modelos con Properties Calculadas**
- `@property` en modelos para métricas (volumen, duración)
- Evita N+1 queries con `select_related` y `prefetch_related`
- Claridad en el código vs performance

### Challenges Superados

**1. CSRF con SPA**
- Configuración de interceptors en Axios
- Manejo de cookies con `withCredentials: true`
- Lectura de CSRF token desde cookies

**2. Timezone Issues**
- Error: "Expected date, got datetime"
- Solución: Usar `.date()` en el backend para campos `DateField`
- Aprendizaje: Separar fecha (date) de timestamp (datetime)

**3. Serialización de Datos Nested**
- 3 niveles: Workout → WorkoutExercise → Set
- Validaciones en cada nivel
- Balance entre performance y claridad

---

## 🚧 Roadmap

### En Progreso
- [ ] IA Coach con Groq API (sugerencias de entrenamiento)
- [ ] Gráficos de progreso con Recharts
- [ ] Deploy a producción (Railway + Vercel)

### Futuro
- [ ] PWA (offline support)
- [ ] Timer de descanso entre sets
- [ ] Drag & drop para reordenar ejercicios
- [ ] Calculadora de 1RM
- [ ] Exportar datos a CSV
- [ ] Dark mode
- [ ] Compartir rutinas entre usuarios

---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## 👨‍💻 Autor

**Valentín Belone**
- LinkedIn:(https://www.linkedin.com/in/valent%C3%ADn-belone-a447b42b7/)
- GitHub: (https://github.com/ValenBelone7)

---

## 🙏 Agradecimientos

Proyecto desarrollado como parte de mi portfolio profesional, aplicando buenas prácticas de desarrollo full-stack y arquitectura de software.

---

**⭐ Si te gustó el proyecto, dale una estrella en GitHub!**