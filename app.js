// ======= VARIABLES GLOBALES =======
const btnFlotante = document.querySelector('.flotante');
const modal = document.querySelector('.modal');
const cerrarForm = document.getElementById('cerrarForm');
const guardarReceta = document.getElementById('guardarReceta');
const listaRecetas = document.getElementById('listaRecetas');
const buscarReceta = document.getElementById('buscarReceta');
const menuCategorias = document.querySelectorAll('.menu li');
const detalleReceta = document.getElementById('detalleReceta');

// Arreglo inicial de recetas
let recetas = [];

// ======= FUNCIONES =======

// Mostrar formulario
btnFlotante.addEventListener('click', () => modal.classList.remove('oculto'));

// Cerrar formulario
cerrarForm.addEventListener('click', () => modal.classList.add('oculto'));

// Guardar receta nueva
guardarReceta.addEventListener('click', () => {
  const nombre = document.getElementById('nombreReceta').value.trim();
  const categoria = document.getElementById('categoriaReceta').value;
  const ingredientes = document.getElementById('ingredientesReceta').value.split('\n').map(i => i.trim()).filter(i => i);
  const procedimiento = document.getElementById('procedimientoReceta').value.split('\n').map(p => p.trim()).filter(p => p);
  const imagen = document.getElementById('imagenReceta').files[0] ? URL.createObjectURL(document.getElementById('imagenReceta').files[0]) : '';

  if(!nombre || !categoria) return alert('Nombre y categoría son obligatorios.');

  const receta = { nombre, categoria, ingredientes, procedimiento, imagen };
  recetas.push(receta);
  mostrarRecetas(recetas);
  modal.classList.add('oculto');
  limpiarFormulario();
});

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById('nombreReceta').value = '';
  document.getElementById('categoriaReceta').value = '';
  document.getElementById('ingredientesReceta').value = '';
  document.getElementById('procedimientoReceta').value = '';
  document.getElementById('imagenReceta').value = '';
}

// Mostrar recetas en la lista
function mostrarRecetas(array) {
  listaRecetas.innerHTML = '';
  if(array.length === 0) {
    listaRecetas.innerHTML = '<p>No se encontraron recetas.</p>';
    return;
  }
  array.forEach((receta, index) => {
    const div = document.createElement('div');
    div.classList.add('receta');
    div.innerHTML = `
      <img src="${receta.imagen || 'https://via.placeholder.com/250x150'}" alt="${receta.nombre}">
      <div class="info">
        <h4>${receta.nombre}</h4>
        <p>${receta.categoria}</p>
      </div>
    `;
    div.addEventListener('click', () => verDetalleReceta(index));
    listaRecetas.appendChild(div);
  });
}

// Ver detalle de receta
function verDetalleReceta(index) {
  const r = recetas[index];
  detalleReceta.innerHTML = `
    <button class="volver" onclick="cerrarDetalle()">← Volver</button>
    <div class="detalle-contenido">
      <img class="detalle-imagen" src="${r.imagen || 'https://via.placeholder.com/250x150'}" alt="${r.nombre}">
      <div class="detalle-info">
        <h2>${r.nombre}</h2>
        <p><strong>Categoría:</strong> ${r.categoria}</p>
        <div class="tabs">
          <button class="tab activa" data-tab="ingredientes">Ingredientes</button>
          <button class="tab" data-tab="procedimiento">Procedimiento</button>
        </div>
        <div class="tab-contenido activa" id="ingredientes">
          <ul id="detalleIngredientes">${r.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="tab-contenido" id="procedimiento">
          <ol id="detalleProcedimiento">${r.procedimiento.map(p => `<li>${p}</li>`).join('')}</ol>
        </div>
      </div>
    </div>
  `;
  detalleReceta.style.display = 'block';

  // Tabs
  const tabs = detalleReceta.querySelectorAll('.tab');
  const contenidos = detalleReceta.querySelectorAll('.tab-contenido');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('activa'));
      tab.classList.add('activa');
      contenidos.forEach(c => c.classList.remove('activa'));
      detalleReceta.querySelector(`#${tab.dataset.tab}`).classList.add('activa');
    });
  });
}

// Cerrar detalle
function cerrarDetalle() {
  detalleReceta.style.display = 'none';
}

// Filtrado por búsqueda
buscarReceta.addEventListener('input', () => {
  const texto = buscarReceta.value.toLowerCase();
  const filtradas = recetas.filter(r => r.nombre.toLowerCase().includes(texto));
  mostrarRecetas(filtradas);
});

// Filtrado por categoría
menuCategorias.forEach(li => {
  li.addEventListener('click', () => {
    const cat = li.dataset.categoria;
    if(cat === 'todas') {
      mostrarRecetas(recetas);
    } else {
      mostrarRecetas(recetas.filter(r => r.categoria === cat));
    }
  });
});

// Inicial
mostrarRecetas(recetas);
