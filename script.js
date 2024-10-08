class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = {};
    }

    inscribirMateria(materia) {
        this.materias.push(materia);
    }

    asignarCalificacion(materia, calificacion) {
        this.calificaciones[materia] = calificacion;
    }

    obtenerPromedio() {
        const notas = Object.values(this.calificaciones);
        const suma = notas.reduce((a, b) => a + b, 0);
        return suma / notas.length || 0;
    }
}

const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

document.getElementById('alumno-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);

    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    this.reset();
});

function inscribirMateria(nombreAlumno, materia) {
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    if (alumno) {
        alumno.inscribirMateria(materia);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
       
    }
}

function buscarPorNombre(nombre) {
    return alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(nombre.toLowerCase()));
}


function renderizarAlumnos() {
    const lista = document.getElementById('alumno-list');
    lista.innerHTML = '';
    
    alumnos.forEach((alumno) => {
        const li = document.createElement('li');
        const promedio = alumno.obtenerPromedio().toFixed(2);
        li.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad} - Promedio: ${promedio}`;
        lista.appendChild(li);
    });
}

function renderizarResultados(resultados) {
    const lista = document.getElementById('alumno-list');
    lista.innerHTML = '';

    resultados.forEach((alumno) => {
        const li = document.createElement('li');
        const promedio = alumno.obtenerPromedio().toFixed(2);
        const materiasYCalificacion = Object.entries(alumno.calificaciones)
        .map(([materia, calificacion]) => `${materia}: ${calificacion}`)
        .join(',');

        li.textContent = `${alumno.nombre} ${alumno.apellidos} |Edad:  ${alumno.edad} |Materia: ${materiasYCalificacion} |Promedio:  ${promedio}`;
        lista.appendChild(li);
    });
}

function buscar() {
    const nombre = document.getElementById('buscar-nombre').value;
    const resultados = buscarPorNombre(nombre);
    renderizarResultados(resultados);
}

document.getElementById('calificacion-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre-alumno').value;
    const materia = document.getElementById('materia').value;
    const calificacion = parseInt(document.getElementById('calificacion').value);

    const alumno = alumnos.find(a => a.nombre === nombre);
    if (alumno) {
        alumno.asignarCalificacion(materia, calificacion);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
       
    }
});

renderizarAlumnos();
inscribirMateria('Nombre Alumno', 'Matemáticas');