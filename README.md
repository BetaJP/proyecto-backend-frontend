# Proyecto Backend y Frontend Simple

Un proyecto completo con backend en Node.js/Express y frontend en HTML/CSS/JavaScript vanilla.

## Estructura del Proyecto

```
test/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md
```

## Backend (Node.js + Express)

### Características:
- API REST para gestión de usuarios
- CORS habilitado para conexión con frontend
- Endpoints: GET, POST para usuarios
- Puerto: 3000

### Cómo ejecutar:
```bash
cd backend
npm install
npm run dev  # con nodemon para desarrollo
# o
npm start    # para producción
```

### Endpoints disponibles:
- `GET /` - Mensaje de bienvenida
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario

## Frontend (HTML/CSS/JavaScript)

### Características:
- Interfaz web simple para gestionar usuarios
- Formulario para agregar usuarios
- Lista de usuarios con carga dinámica
- Manejo de errores y mensajes de éxito
- Diseño responsivo

### Cómo ejecutar:
Abre `frontend/index.html` en tu navegador o usa un servidor local:

```bash
cd frontend
# Con Python 3
python -m http.server 8000
# O con Node.js (si tienes http-server instalado)
npx http-server
```

## Uso

1. **Iniciar el backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Abrir el frontend:**
   - Abre `frontend/index.html` en tu navegador
   - O usa un servidor local en el puerto 8000

3. **Probar la aplicación:**
   - Haz clic en "Cargar Usuarios" para ver los usuarios existentes
   - Usa el formulario para agregar nuevos usuarios
   - Los datos se sincronizarán automáticamente

## Tecnologías Utilizadas

### Backend:
- Node.js
- Express.js
- CORS
- Nodemon (desarrollo)

### Frontend:
- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API para comunicación con backend