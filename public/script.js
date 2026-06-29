const API_URL = 'http://localhost:3000/api/asignaciones';

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

document.getElementById('formCrear').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const datos = {
        nombre: document.getElementById('crearNombre').value,
        hardware: document.getElementById('crearHardware').value,
        modelo: document.getElementById('crearModelo').value,
        marca: document.getElementById('crearMarca').value,
        descripcion: document.getElementById('crearDescripcion').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            mostrarRespuesta('respuestaCrear', 'exito', 'Registrado con éxito');
            document.getElementById('formCrear').reset();
        } else {
            mostrarRespuesta('respuestaCrear', 'error', 'Error al registrar');
        }
    } catch (error) {
        mostrarRespuesta('respuestaCrear', 'error', 'Error: ' + error.message);
    }
});

async function listarTodas() {
    try {
        const response = await fetch(API_URL);
        const datos = await response.json();

        if (response.ok) {
            mostrarRespuesta('respuestaListar', 'exito', `Se encontraron ${datos.length} registros`);
            llenarTabla(datos);
        } else {
            mostrarRespuesta('respuestaListar', 'error', 'Error al listar');
        }
    } catch (error) {
        mostrarRespuesta('respuestaListar', 'error', 'Error: ' + error.message);
    }
}

function llenarTabla(datos) {
    const tbody = document.getElementById('cuerpoTablaListar');
    tbody.innerHTML = '';

    datos.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item._id}</td>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.hardware}</td>
            <td>${item.modelo}</td>
            <td>${item.marca}</td>
            <td>${item.descripcion}</td>
            <td>${new Date(item.fecha_fabricación).toLocaleString()}</td>
        `;
        tbody.appendChild(fila);
    });
}

async function actualizar() {
    const id = document.getElementById('actualizarId').value;

    if (!id) {
        mostrarRespuesta('respuestaActualizar', 'error', 'Ingresa el ID MongoDB');
        return;
    }

    const datos = {};
    
    if (document.getElementById('actualizarNombre').value) {
        datos.nombre = document.getElementById('actualizarNombre').value;
    }
    if (document.getElementById('actualizarHardware').value) {
        datos.hardware = document.getElementById('actualizarHardware').value;
    }
    if (document.getElementById('actualizarModelo').value) {
        datos.modelo = document.getElementById('actualizarModelo').value;
    }
    if (document.getElementById('actualizarMarca').value) {
        datos.marca = document.getElementById('actualizarMarca').value;
    }
    if (document.getElementById('actualizarDescripcion').value) {
        datos.descripcion = document.getElementById('actualizarDescripcion').value;
    }

    if (Object.keys(datos).length === 0) {
        mostrarRespuesta('respuestaActualizar', 'error', 'Ingresa al menos un campo');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            mostrarRespuesta('respuestaActualizar', 'exito', 'Actualizado con éxito');
            document.getElementById('actualizarId').value = '';
            document.getElementById('actualizarNombre').value = '';
            document.getElementById('actualizarHardware').value = '';
            document.getElementById('actualizarModelo').value = '';
            document.getElementById('actualizarMarca').value = '';
            document.getElementById('actualizarDescripcion').value = '';
        } else {
            mostrarRespuesta('respuestaActualizar', 'error', 'Error al actualizar');
        }
    } catch (error) {
        mostrarRespuesta('respuestaActualizar', 'error', 'Error: ' + error.message);
    }
}

async function eliminar() {
    const id = document.getElementById('eliminarId').value;

    if (!id) {
        mostrarRespuesta('respuestaEliminar', 'error', 'Ingresa el ID MongoDB');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarRespuesta('respuestaEliminar', 'exito', 'Eliminado con éxito');
            document.getElementById('eliminarId').value = '';
        } else {
            mostrarRespuesta('respuestaEliminar', 'error', 'Error al eliminar');
        }
    } catch (error) {
        mostrarRespuesta('respuestaEliminar', 'error', 'Error: ' + error.message);
    }
}

function mostrarRespuesta(elementId, tipo, mensaje) {
    const elemento = document.getElementById(elementId);
    elemento.classList.remove('exito', 'error');
    elemento.classList.add(tipo);
    elemento.innerHTML = mensaje;
}