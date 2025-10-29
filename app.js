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

  // Tarjeta visual del listado
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
  detalleHTML() {
    const ingredientesHTML = this.ingredientes.map(i => `<li>${i.trim()}</li>`).join("");
    return `
      <section id="detalleReceta">
        <button class="volver">⬅ Volver</button>
        <div class="detalle-contenido">
          ${this.portada ? `<img class="detalle-imagen" src="${this.portada}" alt="${this.titulo}">` : ""}
          <div class="detalle-info">
            <h2>${this.titulo}</h2>
            <p>${this.descripcion}</p>
          </div>
        </div>

        <div class="tabs">
          <button class="tab activa" data-tab="principal">Receta principal</button>
          ${this.ensalada ? `<button class="tab" data-tab="ensalada">Ensalada</button>` : ""}
          ${this.bebida ? `<button class="tab" data-tab="bebida">Bebida</button>` : ""}
        </div>

        <div id="principal" class="tab-contenido activa">
          <h3>Ingredientes</h3>
          <ul id="detalleIngredientes">${ingredientesHTML}</ul>
          ${this.imgSec ? `<img class="detalle-secundaria" src="${this.imgSec}" alt="Imagen secundaria">` : ""}
          <h3>Procedimiento</h3>
          <p>${this.procedimiento}</p>
        </div>

        ${this.ensalada ? `
          <div id="ensalada" class="tab-contenido">
            <h3>Receta de Ensalada</h3>
            <p>${this.ensalada}</p>
          </div>` : ""}

        ${this.bebida ? `
          <div id="bebida" class="tab-contenido">
            <h3>Receta de Bebida</h3>
            <p>${this.bebida}</p>
          </div>` : ""}
      </section>
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
    lista.innerHTML = this.recetas.map((r, i) => r.mostrarHTML(i)).join("");

    // Activar clic en cada tarjeta
    document.querySelectorAll(".receta").forEach(card => {
      card.addEventListener("click", e => {
        const index = card.getAttribute("data-index");
        this.mostrarDetalle(index);
      });
    });
  }

  mostrarDetalle(index) {
    const receta = this.recetas[index];
    const lista = document.getElementById("listaRecetas");
    lista.innerHTML = receta.detalleHTML();

    // Botón volver
    document.querySelector(".volver").addEventListener("click", () => this.mostrarTodas());

    // Tabs
    const tabs = document.querySelectorAll(".tab");
    const contenidos = document.querySelectorAll(".tab-contenido");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("activa"));
        contenidos.forEach(c => c.classList.remove("activa"));

        tab.classList.add("activa");
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).classList.add("activa");
      });
    });
  }
}

const app = new Recetario();

// Nombre aleatorio
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
document.getElementById("nombreWeb").textContent = nombres[Math.floor(Math.random() * nombres.length)];

// Referencias al DOM
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

// Mostrar formulario
btnAgregar.addEventListener("click", () => formReceta.classList.remove("oculto"));
cerrarForm.addEventListener("click", () => formReceta.classList.add("oculto"));

// Guardar nueva receta
guardarReceta.addEventListener("click", () => {
  const categoria = document.getElementById("categoriaReceta").value;
  const titulo = document.getElementById("tituloReceta").value.trim();
  const descripcion = document.getElementById("descripcionBreve").value.trim();
  const ingredientes = document.getElementById("ingredientes1").value.split(",");
  const procedimiento = document.getElementById("procedimiento1").value.trim();
  const ensalada = document.getElementById("ensalada").value.trim();
  const bebida = document.getElementById("bebida").value.trim();

  // Archivos de imagen
  const portadaFile = document.getElementById("imagenPortada").files[0];
  const imgSecFile = document.getElementById("imagenSecundaria").files[0];

  // Convertir imágenes a URLs
  const portada = portadaFile ? URL.createObjectURL(portadaFile) : null;
  const imgSec = imgSecFile ? URL.createObjectURL(imgSecFile) : null;

  // Crear y agregar receta
  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);
  app.mostrarTodas();

  // Cerrar formulario
  formReceta.classList.add("oculto");
  formReceta.querySelectorAll("input, textarea").forEach(el => el.value = "");
  document.getElementById("categoriaReceta").selectedIndex = 0;
});
