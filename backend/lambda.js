// Lambda handler for PWF backend
let usuarios = [
  { id: 1, nombre: 'Juan', email: 'juan@ejemplo.com' },
  { id: 2, nombre: 'María', email: 'maria@ejemplo.com' }
];

exports.handler = async (event) => {
    const { httpMethod, path, body, queryStringParameters } = event;
    
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    };
    
    try {
        // Handle CORS preflight
        if (httpMethod === 'OPTIONS') {
            return response;
        }
        
        // Root endpoint
        if (path === '/' && httpMethod === 'GET') {
            response.body = JSON.stringify({ mensaje: 'Backend funcionando correctamente!' });
            return response;
        }
        
        // Get all users
        if (path === '/api/usuarios' && httpMethod === 'GET') {
            response.body = JSON.stringify(usuarios);
            return response;
        }
        
        // Get user by ID
        if (path.startsWith('/api/usuarios/') && httpMethod === 'GET') {
            const id = parseInt(path.split('/')[3]);
            const usuario = usuarios.find(u => u.id === id);
            
            if (usuario) {
                response.body = JSON.stringify(usuario);
            } else {
                response.statusCode = 404;
                response.body = JSON.stringify({ error: 'Usuario no encontrado' });
            }
            return response;
        }
        
        // Create new user
        if (path === '/api/usuarios' && httpMethod === 'POST') {
            const { nombre, email } = JSON.parse(body);
            
            if (!nombre || !email) {
                response.statusCode = 400;
                response.body = JSON.stringify({ error: 'Nombre y email son requeridos' });
                return response;
            }
            
            const nuevoUsuario = {
                id: usuarios.length + 1,
                nombre,
                email
            };
            
            usuarios.push(nuevoUsuario);
            response.statusCode = 201;
            response.body = JSON.stringify(nuevoUsuario);
            return response;
        }
        
        // Route not found
        response.statusCode = 404;
        response.body = JSON.stringify({ error: 'Ruta no encontrada' });
        return response;
        
    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: 'Error interno del servidor' });
        return response;
    }
};