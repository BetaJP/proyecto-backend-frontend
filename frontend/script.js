const API_URL = 'http://localhost:3000';

// Referencias a elementos del DOM
const userForm = document.getElementById('userForm');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const loadUsersBtn = document.getElementById('loadUsers');
const usersList = document.getElementById('usersList');

// Cargar usuarios al hacer clic en el botón
loadUsersBtn.addEventListener('click', loadUsers);

// Agregar usuario al enviar el formulario
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!nombre || !email) {
        showError('Por favor completa todos los campos');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email })
        });
        
        if (response.ok) {
            const nuevoUsuario = await response.json();
            showSuccess(`Usuario ${nuevoUsuario.nombre} agregado correctamente`);
            userForm.reset();
            loadUsers(); // Recargar la lista
        } else {
            const error = await response.json();
            showError(error.error || 'Error al agregar usuario');
        }
    } catch (error) {
        showError('Error de conexión con el servidor');
        console.error('Error:', error);
    }
});

// Función para cargar usuarios
async function loadUsers() {
    usersList.innerHTML = '<div class="loading">Cargando usuarios...</div>';
    
    try {
        const response = await fetch(`${API_URL}/api/usuarios`);
        
        if (response.ok) {
            const usuarios = await response.json();
            displayUsers(usuarios);
        } else {
            showError('Error al cargar usuarios');
        }
    } catch (error) {
        showError('Error de conexión con el servidor');
        console.error('Error:', error);
    }
}

// Función para mostrar usuarios
function displayUsers(usuarios) {
    if (usuarios.length === 0) {
        usersList.innerHTML = '<p>No hay usuarios registrados</p>';
        return;
    }
    
    const usersHTML = usuarios.map(usuario => `
        <div class="user-card">
            <h3>${usuario.nombre}</h3>
            <p>Email: ${usuario.email}</p>
            <p>ID: ${usuario.id}</p>
        </div>
    `).join('');
    
    usersList.innerHTML = usersHTML;
}

// Función para mostrar errores
function showError(message) {
    usersList.innerHTML = `<div class="error">${message}</div>`;
}

// Función para mostrar mensajes de éxito
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.style.cssText = `
        background-color: #e6ffe6;
        color: #008000;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        border-left: 4px solid #008000;
    `;
    successDiv.textContent = message;
    
    usersList.insertBefore(successDiv, usersList.firstChild);
    
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Cargar usuarios al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend cargado. Asegúrate de que el backend esté corriendo en el puerto 3000');
});