const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Datos de ejemplo
let usuarios = [
  { id: 1, nombre: 'Juan', email: 'juan@ejemplo.com' },
  { id: 2, nombre: 'María', email: 'maria@ejemplo.com' }
];

// Ruta principal
app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend funcionando correctamente!' });
});

// Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

// Obtener un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };
  
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});