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

  // Método que muestra solo la imagen de portada, título y descripción en el formato de tarjeta
  mostrarHTML() {
    return `
      <div class="receta">
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

  // Mostrar todas las recetas guardadas en tarjetas
  mostrarTodas() {
    const lista = document.getElementById("listaRecetas");
    lista.innerHTML = this.recetas.map(r => r.mostrarHTML()).join('');
  }
}

const app = new Recetario();

// Generar un nombre aleatorio para el recetario
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
document.getElementById("nombreWeb").textContent = nombres[Math.floor(Math.random() * nombres.length)];

// Abrir formulario de agregar receta
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

// Mostrar formulario cuando se haga clic en el botón "+"
btnAgregar.addEventListener("click", () => formReceta.classList.remove("oculto"));

// Cerrar el formulario
cerrarForm.addEventListener("click", () => formReceta.classList.add("oculto"));

// Guardar una nueva receta
guardarReceta.addEventListener("click", () => {
  const categoria = document.getElementById("categoriaReceta").value;
  const titulo = document.getElementById("tituloReceta").value;
  const descripcion = document.getElementById("descripcionBreve").value;
  const ingredientes = document.getElementById("ingredientes1").value.split(",");
  const procedimiento = document.getElementById("procedimiento1").value;
  const ensalada = document.getElementById("ensalada").value;
  const bebida = document.getElementById("bebida").value;

  // Leer las imágenes
  const portadaFile = document.getElementById("imagenPortada").files[0];
  const imgSecFile = document.getElementById("imagenSecundaria").files[0];

  // Convertir las imágenes a URLs temporales
  const portada = portadaFile ? URL.createObjectURL(portadaFile) : null;
  const imgSec = imgSecFile ? URL.createObjectURL(imgSecFile) : null;

  // Crear la receta y agregarla
  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);

  // Mostrar todas las recetas guardadas
  app.mostrarTodas();

  // Cerrar el formulario
  formReceta.classList.add("oculto");
});
