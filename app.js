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

  mostrarHTML() {
    return `
      <div class="receta">
        ${this.portada ? `<img src="${this.portada}" alt="Portada">` : ""}
        <h3>${this.titulo}</h3>
        <p>${this.descripcion}</p>
        <hr>
        <h4>Ingredientes:</h4>
        <p>${this.ingredientes.join(", ")}</p>
        ${this.imgSec ? `<img src="${this.imgSec}" alt="Secundaria">` : ""}
        <h4>Procedimiento:</h4>
        <p>${this.procedimiento}</p>
        ${this.ensalada ? `<h4>Ensalada:</h4><p>${this.ensalada}</p>` : ""}
        ${this.bebida ? `<h4>Bebida:</h4><p>${this.bebida}</p>` : ""}
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
    lista.innerHTML = this.recetas.map(r => r.mostrarHTML()).join('');
  }
}

const app = new Recetario();

// 🔹 Nombre aleatorio
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
document.getElementById("nombreWeb").textContent = nombres[Math.floor(Math.random() * nombres.length)];

// 🔹 Botón para abrir formulario
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
