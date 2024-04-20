document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const lista = document.getElementById('lista');
    const nombreTareaInput = document.getElementById('nombreTarea');
    const estadoTareaInput = document.getElementById('estadoTarea');
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    function mostrarTareas() {
        lista.innerHTML = '';
        tareas.forEach(function(tarea) {
            const tareaElemento = document.createElement('div');
            tareaElemento.classList.add('lista__tarea');
            if (tarea.terminada) {
                tareaElemento.classList.add('lista__tarea--terminada');
            } else {
                tareaElemento.classList.add('lista__tarea--pendiente');
            }
            tareaElemento.textContent = tarea.nombre;
            tareaElemento.addEventListener('click', function() {
                tarea.terminada = !tarea.terminada;
                if (tarea.terminada) {
                    tareaElemento.classList.remove('lista__tarea--pendiente');
                    tareaElemento.classList.add('lista__tarea--terminada');
                } else {
                    tareaElemento.classList.remove('lista__tarea--terminada');
                    tareaElemento.classList.add('lista__tarea--pendiente');
                }
                guardarTareas();
            });
            lista.appendChild(tareaElemento);
        });
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreTarea = nombreTareaInput.value.trim();
        if (nombreTarea === '') return;
        const nuevaTarea = {
            id: tareas.length + 1,
            nombre: nombreTarea,
            terminada: estadoTareaInput.checked
        };
        tareas.push(nuevaTarea);
        guardarTareas();
        mostrarTareas();
        formulario.reset();
    });

    mostrarTareas();
});
