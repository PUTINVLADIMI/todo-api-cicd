# 📋 TODO API - Proyecto CI/CD para DevOps

¡Bienvenido a tu primer proyecto de CI/CD! Esta es una API REST simple para gestionar tareas, diseñada para aprender los conceptos fundamentales de integración y despliegue continuo.

## 🎯 Objetivos de Aprendizaje

- ✅ Entender qué es un pipeline CI/CD
- ✅ Configurar GitHub Actions
- ✅ Escribir y ejecutar pruebas automatizadas
- ✅ Containerizar aplicaciones con Docker
- ✅ Desplegar automáticamente a producción
- ✅ Implementar health checks y monitoreo básico

## 🏗️ Arquitectura del Pipeline

```
📝 Push Code → 🔄 CI/CD Pipeline
    ↓
    🧪 Tests → 🏗️ Build → 🚀 Deploy
    ↓          ↓         ↓
    ✅ Pass    📦 Image   🌐 Production
```

## 🚀 Empezando

### Prerrequisitos

- Node.js 18+ instalado
- Git configurado
- Cuenta en GitHub
- Cuenta en Railway/Render (gratuita)
- Docker (opcional, para desarrollo local)

### 1️⃣ Configuración Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/todo-api-cicd.git
cd todo-api-cicd

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev
```

### 2️⃣ Probar la API

```bash
# Health check
curl http://localhost:3000/health

# Obtener todas las tareas
curl http://localhost:3000/todos

# Crear una nueva tarea
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primera tarea"}'
```

### 3️⃣ Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con coverage
npm run test:coverage

# Ejecutar en modo watch
npm run test:watch
```

## 📊 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check del servicio |
| GET | `/todos` | Obtener todas las tareas |
| GET | `/todos/:id` | Obtener tarea específica |
| POST | `/todos` | Crear nueva tarea |
| PUT | `/todos/:id` | Actualizar tarea |
| DELETE | `/todos/:id` | Eliminar tarea |

## 🔧 Configuración del Pipeline CI/CD

### Paso 1: Configurar GitHub Secrets

En tu repositorio de GitHub, ve a Settings → Secrets → Actions y agrega:

```
DOCKER_USERNAME: tu-usuario-dockerhub
DOCKER_PASSWORD: tu-password-dockerhub
RAILWAY_TOKEN: tu-token-railway
```

### Paso 2: Entender el Pipeline

El archivo `.github/workflows/ci-cd.yml` define 4 jobs:

1. **🧪 Test**: Ejecuta pruebas y validaciones
2. **🏗️ Build**: Construye la imagen Docker
3. **🚀 Deploy**: Despliega a producción
4. **📢 Notify**: Envía notificaciones

### Paso 3: Triggering del Pipeline

El pipeline se ejecuta cuando:
- Haces `push` a `main` o `develop`
- Abres un Pull Request hacia `main`

## 🐳 Docker

### Construir imagen localmente

```bash
# Construir imagen
docker build -t todo-api .

# Ejecutar contenedor
docker run -p 3000:3000 todo-api

# Ejecutar con variables de entorno
docker run -p 3000:3000 -e PORT=3000 todo-api
```

## 🚀 Despliegue

### Railway (Recomendado)

1. Crear cuenta en [Railway](https://railway.app)
2. Conectar tu repositorio de GitHub
3. Configurar variables de entorno
4. ¡Listo! Se despliega automáticamente

### Render (Alternativa)

1. Crear cuenta en [Render](https://render.com)
2. Crear nuevo Web Service
3. Conectar repositorio
4. Configurar build y start commands

## 📈 Monitoreo y Logs

### Health Check

La aplicación incluye un endpoint `/health` que retorna:

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

### Logs importantes

```bash
# Ver logs localmente
npm run dev

# Ver logs en Railway
railway logs

# Ver logs en Docker
docker logs <container-id>
```

## 🧪 Pruebas

### Estructura de pruebas

```javascript
describe('API Endpoint', () => {
  it('should do something', async () => {
    const response = await request(app).get('/endpoint');
    expect(response.status).toBe(200);
  });
});
```

### Cobertura de pruebas

- **Rutas**: Todas las rutas principales
- **Validaciones**: Datos de entrada
- **Errores**: Manejo de casos edge
- **Respuestas**: Formato correcto de respuestas

## 🔄 Flujo de Desarrollo

### 1. Desarrollo local

```bash
git checkout -b feature/nueva-funcionalidad
# Hacer cambios
npm test
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 2. Pull Request

- Crear PR hacia `main`
- El pipeline ejecuta automáticamente tests
- Revisar resultados antes de hacer merge

### 3. Despliegue

- Merge a `main` → Despliegue automático
- Verificar health check
- Monitorear logs

## 🐛 Troubleshooting

### Problemas comunes

**Tests fallan**: Verificar que todas las dependencias estén instaladas
```bash
npm ci
npm test
```

**Pipeline falla**: Revisar logs en GitHub Actions
- Ir a Actions tab en GitHub
- Seleccionar el pipeline fallido
- Revisar logs de cada step

**Despliegue falla**: Verificar variables de entorno
- Confirmar secrets en GitHub
- Verificar configuración en Railway/Render

### Comandos útiles

```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install

# Verificar sintaxis del workflow
# (usar extensión GitHub Actions en VS Code)

# Probar Docker localmente
docker build -t test-api .
docker run -p 3000:3000 test-api
```

## 📚 Siguiente Nivel

Una vez que domines este proyecto, puedes agregar:

- **Base de datos**: PostgreSQL o MongoDB
- **Autenticación**: JWT tokens
- **Rate limiting**: Protección contra abuso
- **Logs estructurados**: Winston o similar
- **Métricas**: Prometheus + Grafana
- **Alertas**: Slack/Discord notifications
- **Staging environment**: Ambiente de pruebas
- **Blue-green deployment**: Despliegues sin downtime

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch
3. Commit cambios
4. Push al branch
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles

---

¡Felicidades! 🎉 Has creado tu primer pipeline CI/CD. Ahora entiendes cómo funciona la automatización en DevOps y tienes las bases para proyectos más complejos.