class Receta {
  constructor(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida) {
    this.categoria = categoria;
    this.portada = portada;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.ingredientes = ingredientes;
    this.imgSec = imgSec;
    this.procedimiento = procedimiento;
    this.ensalada = ensalada;
    this.bebida = bebida;
  }

  mostrarHTML(index) {
    return `
      <div class="receta" data-index="${index}">
        ${this.portada ? `<img src="${this.portada}" alt="Portada de ${this.titulo}">` : ""}
        <div class="info">
          <h4>${this.titulo}</h4>
          <p>${this.descripcion}</p>
        </div>
      </div>
    `;
  }

  // Vista detallada
  mostrarDetalle() {
    return `
      <button class="volver" id="volverLista">← Volver</button>
      ${this.portada ? `<img class="detalle-imagen" src="${this.portada}" alt="${this.titulo}">` : ""}
      <div class="detalle-info">
        <h2>${this.titulo}</h2>
        <p>${this.descripcion}</p>

        <div class="tabs">
          <div class="tab activa" data-tab="comida">🍛 Comida</div>
          <div class="tab" data-tab="bebida">🥤 Bebida</div>
          <div class="tab" data-tab="ensalada">🥗 Ensalada</div>
        </div>

        <!-- Sección 1: Comida -->
        <div class="tab-contenido activa" id="comida">
          <div class="bloque">
            ${this.imgSec ? `<img class="detalle-secundaria" src="${this.imgSec}" alt="Imagen comida">` : ""}
            <h3>Ingredientes</h3>
            <ul id="detalleIngredientes">
              ${this.ingredientes.map(ing => `<li>${ing.trim()}</li>`).join('')}
            </ul>
          </div>
          <h3>Procedimiento</h3>
          <ol>
            ${this.procedimiento.split('.').filter(p => p.trim() !== '').map((p, i) => `<li><strong>Paso ${i + 1}:</strong> ${p.trim()}.</li>`).join('')}
          </ol>
        </div>

        <!-- Sección 2: Bebida -->
        <div class="tab-contenido" id="bebida">
          <div class="bloque">
            <img class="detalle-secundaria" src="${this.bebida || 'https://via.placeholder.com/150'}" alt="Bebida">
            <h3>Ingredientes</h3>
            <ul>
              <li>Agua o leche según preferencia</li>
              <li>Azúcar al gusto</li>
              <li>Hielo o decorado opcional</li>
            </ul>
          </div>
          <h3>Preparación</h3>
          <ol>
            <li><strong>Paso 1:</strong> Mezcla los ingredientes base.</li>
            <li><strong>Paso 2:</strong> Agrega endulzante o decorado.</li>
            <li><strong>Paso final:</strong> Sirve y disfruta junto con la comida.</li>
          </ol>
        </div>

        <!-- Sección 3: Ensalada -->
        <div class="tab-contenido" id="ensalada">
          <div class="bloque">
            <img class="detalle-secundaria" src="${this.ensalada || 'https://via.placeholder.com/150'}" alt="Ensalada">
            <h3>Ingredientes</h3>
            <ul>
              <li>Lechuga fresca</li>
              <li>Tomates cherry</li>
              <li>Aceite de oliva y limón</li>
              <li>Sal al gusto</li>
            </ul>
          </div>
          <h3>Preparación</h3>
          <ol>
            <li><strong>Paso 1:</strong> Lava y corta los ingredientes.</li>
            <li><strong>Paso 2:</strong> Mezcla y añade el aderezo.</li>
            <li><strong>Paso final:</strong> Acompaña con la comida principal.</li>
          </ol>
        </div>
      </div>
    `;
  }
}

class Recetario {
  constructor() {
    this.recetas = [];
  }

  agregarReceta(receta) {
    this.recetas.push(receta);
  }

  mostrarTodas() {
    const lista = document.getElementById("listaRecetas");
    lista.innerHTML = this.recetas.map((r, i) => r.mostrarHTML(i)).join('');

    // Activar eventos para abrir detalle
    document.querySelectorAll('.receta').forEach(card => {
      card.addEventListener('click', e => {
        const index = card.getAttribute('data-index');
        this.mostrarDetalle(index);
      });
    });
  }

  mostrarDetalle(index) {
    const receta = this.recetas[index];
    const detalle = document.getElementById("detalleReceta");
    const lista = document.getElementById("listaRecetas");
    detalle.innerHTML = receta.mostrarDetalle();

    lista.classList.add("oculto");
    detalle.classList.remove("oculto");

    // Botón volver
    document.getElementById("volverLista").addEventListener("click", () => {
      detalle.classList.add("oculto");
      lista.classList.remove("oculto");
    });

    // Tabs
    const tabs = detalle.querySelectorAll(".tab");
    const contenidos = detalle.querySelectorAll(".tab-contenido");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("activa"));
        contenidos.forEach(c => c.classList.remove("activa"));
        tab.classList.add("activa");
        detalle.querySelector(`#${tab.dataset.tab}`).classList.add("activa");
      });
    });
  }
}

// ===== Inicialización =====
const app = new Recetario();
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
document.getElementById("nombreWeb").textContent = nombres[Math.floor(Math.random() * nombres.length)];

// Botones y formulario
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

btnAgregar.addEventListener("click", () => formReceta.classList.remove("oculto"));
cerrarForm.addEventListener("click", () => formReceta.classList.add("oculto"));

guardarReceta.addEventListener("click", () => {
  const categoria = document.getElementById("categoriaReceta").value;
  const titulo = document.getElementById("tituloReceta").value;
  const descripcion = document.getElementById("descripcionBreve").value;
  const ingredientes = document.getElementById("ingredientes1").value.split(",");
  const procedimiento = document.getElementById("procedimiento1").value;
  const ensalada = document.getElementById("ensalada").value;
  const bebida = document.getElementById("bebida").value;

  const portadaFile = document.getElementById("imagenPortada").files[0];
  const imgSecFile = document.getElementById("imagenSecundaria").files[0];

  const portada = portadaFile ? URL.createObjectURL(portadaFile) : null;
  const imgSec = imgSecFile ? URL.createObjectURL(imgSecFile) : null;

  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);
  app.mostrarTodas();

  formReceta.classList.add("oculto");
});
