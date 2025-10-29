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
    const detalle = document.getElementById("detalleReceta");

    detalle.classList.add("oculto");
    lista.classList.remove("oculto");

    lista.innerHTML = this.recetas.map((r, i) => r.mostrarHTML(i)).join("");

    // Activar clic en cada tarjeta para abrir nueva página
    document.querySelectorAll(".receta").forEach(card => {
      card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        // Guardar la receta seleccionada en localStorage
        localStorage.setItem("recetaDetalle", JSON.stringify(this.recetas[index]));
        // Abrir detalle.html en nueva pestaña
        window.open("detalle.html", "_blank");
      });
    });
  }
}

const app = new Recetario();

// Nombre aleatorio para la cabecera
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

  // Imágenes
  const portadaFile = document.getElementById("imagenPortada").files[0];
  const imgSecFile = document.getElementById("imagenSecundaria").files[0];

  const portada = portadaFile ? URL.createObjectURL(portadaFile) : null;
  const imgSec = imgSecFile ? URL.createObjectURL(imgSecFile) : null;

  if (!titulo) {
    alert("Por favor, agrega un título a la receta.");
    return;
  }

  // Crear y agregar receta
  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);
  app.mostrarTodas();

  // Cerrar formulario y limpiar campos
  formReceta.classList.add("oculto");
  formReceta.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = "");
  document.getElementById("imagenPortada").value = "";
  document.getElementById("imagenSecundaria").value = "";
  document.getElementById("categoriaReceta").selectedIndex = 0;
});

// Mostrar recetas guardadas al inicio
app.mostrarTodas();
