        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else if (currentTheme === 'light') {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        document.getElementById('copyright-text').textContent = `© ${new Date().getFullYear()} WebDev Explorer. Todos los derechos reservados a nombre de Santiago Cerdeira.`;
        
        // Ejecutar código básico
        document.getElementById('run-basic-code').addEventListener('click', function() {
            console.log("Hola, Juan");
            console.log("Mayor de edad");
            for (let i = 0; i < 5; i++) {
                console.log("Iteración: " + i);
            }
            alert("Código ejecutado. Mira la consola para ver los resultados.");
        });
        
        // Manipulación del DOM
        document.getElementById('dom-button').addEventListener('click', function() {
            const titulo = document.getElementById('titulo-dom');
            const contenedorResultado = titulo.parentElement;
            const boton = document.getElementById('dom-button');
    
            // Modificar título
            titulo.style.color = '#f0db4f';
            titulo.style.backgroundColor = '#333';
            titulo.style.padding = '0.5rem';
            titulo.textContent = 'Nuevo título modificado con JS';
    
            const parrafos = contenedorResultado.querySelectorAll('p');
            // Buscar párrafos solo dentro del mismo contenedor
    
            if (parrafos.length > 1) {
                parrafos[1].textContent = 'El DOM ha sido modificado!';
            } else {
                const nuevoParrafo = document.createElement('p');
                nuevoParrafo.textContent = 'Este es un nuevo párrafo creado con JavaScript';
                // Insertar antes del botón
                contenedorResultado.insertBefore(nuevoParrafo, boton);
            }
        });
        
        // Eventos
        const miBoton = document.getElementById('miBoton');
        const contador = document.getElementById('contador');
        let cuenta = 0;
        
        miBoton.addEventListener('click', () => {
            cuenta++;
            contador.textContent = cuenta;
            miBoton.style.transform = 'scale(1.1)';
            setTimeout(() => {
                miBoton.style.transform = 'scale(1)';
            }, 200);
        });
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                console.log('Enter presionado');
                alert('Has presionado Enter!');
            }
        });
        
        // Fetch API
        document.getElementById('cargar-btn').addEventListener('click', obtenerUsuarios);
        
        async function obtenerUsuarios() {
            try {
                const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
                const usuarios = await respuesta.json();
                mostrarUsuarios(usuarios);
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('lista-usuarios').innerHTML = 
                    '<li style="color:red">Error al cargar los usuarios</li>';
            }
        }
        
        function mostrarUsuarios(usuarios) {
            const lista = document.getElementById('lista-usuarios');
            lista.innerHTML = usuarios
                .map(user => `<li>${user.name} (${user.email})</li>`)
                .join('');
        }
        
        // LocalStorage
        // Elementos del DOM
const storageKeyInput = document.getElementById('storage-key');
const storageValueInput = document.getElementById('storage-value');
const storageResult = document.getElementById('storage-result');

// Botones
document.getElementById('guardar').addEventListener('click', guardarDato);
document.getElementById('obtener').addEventListener('click', obtenerDato);
document.getElementById('borrar').addEventListener('click', borrarDato);
document.getElementById('mostrar-todos').addEventListener('click', mostrarTodos);
document.getElementById('exportar').addEventListener('click', exportarJSON);
document.getElementById('limpiar-todo').addEventListener('click', limpiarTodo);

// Funciones
function guardarDato() {
    const clave = storageKeyInput.value.trim();
    const valor = storageValueInput.value.trim();
    
    if (clave && valor) {
        try {
            // Intenta parsear si es un objeto JSON válido
            const parsedValue = JSON.parse(valor);
            localStorage.setItem(clave, JSON.stringify(parsedValue));
            mostrarResultado(`✅ <strong>${clave}</strong> guardado como objeto: <pre>${JSON.stringify(parsedValue, null, 2)}</pre>`);
        } catch {
            // Si no es JSON, guarda como string
            localStorage.setItem(clave, valor);
            mostrarResultado(`✅ <strong>${clave}</strong> guardado: "${valor}"`);
        }
    } else {
        mostrarResultado('⚠ Ingresa una clave y un valor');
    }
}

function obtenerDato() {
    const clave = storageKeyInput.value.trim();
    if (!clave) {
        mostrarResultado('⚠ Ingresa una clave');
        return;
    }

    const valor = localStorage.getItem(clave);
    if (valor) {
        try {
            // Intenta mostrar como objeto si es JSON
            const parsedValue = JSON.parse(valor);
            mostrarResultado(`🔍 <strong>${clave}</strong>: <pre>${JSON.stringify(parsedValue, null, 2)}</pre>`);
        } catch {
            // Si no es JSON, muestra como string
            mostrarResultado(`🔍 <strong>${clave}</strong>: "${valor}"`);
        }
    } else {
        mostrarResultado(`❌ Clave "${clave}" no encontrada`);
    }
}

function borrarDato() {
    const clave = storageKeyInput.value.trim();
    if (clave && localStorage.getItem(clave)) {
        localStorage.removeItem(clave);
        mostrarResultado(`🗑 <strong>${clave}</strong> eliminado`);
    } else {
        mostrarResultado('❌ Clave no existe');
    }
}

function mostrarTodos() {
    if (localStorage.length === 0) {
        mostrarResultado('ℹ No hay datos en localStorage');
        return;
    }
    
    let html = '<strong>Datos almacenados:</strong><ul>';
    Object.entries(localStorage).forEach(([clave, valor]) => {
        try {
            const parsedValue = JSON.parse(valor);
            html += `<li><strong>${clave}</strong>: <pre>${JSON.stringify(parsedValue, null, 2)}</pre></li>`;
        } catch {
            html += `<li><strong>${clave}</strong>: "${valor}"</li>`;
        }
    });
    html += '</ul>';
    mostrarResultado(html);
}

function exportarJSON() {
    if (localStorage.length === 0) {
        mostrarResultado('ℹ No hay datos para exportar');
        return;
    }

    const datos = Object.fromEntries(Object.entries(localStorage).map(([k, v]) => {
        try {
            return [k, JSON.parse(v)]; // Intenta parsear los valores
        } catch {
            return [k, v]; // Si no es JSON, mantiene el string
        }
    }));

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `localStorage-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    mostrarResultado('📁 <strong>Datos exportados como JSON</strong> (descarga automática)');
}

function limpiarTodo() {
    if (localStorage.length === 0) {
        mostrarResultado('ℹ localStorage ya está vacío');
        return;
    }
    
    if (confirm('¿Borrar TODOS los datos del localStorage?')) {
        localStorage.clear();
        mostrarResultado('🧹 <strong>Todos los datos fueron eliminados</strong>');
    }
}

function mostrarResultado(mensaje) {
    storageResult.innerHTML = mensaje;
    storageResult.style.display = 'block';
}