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
    if (!lista) return;
    lista.classList.remove("oculto");
    lista.innerHTML = this.recetas.map((r, i) => r.mostrarHTML(i)).join("");

    document.querySelectorAll(".receta").forEach(card => {
      card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        localStorage.setItem("recetaSeleccionada", JSON.stringify(this.recetas[index]));
        window.location.href = "detalle.html";
      });
    });
  }
}

const app = new Recetario();

// Nombre aleatorio para cabecera
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
const nombreWeb = document.getElementById("nombreWeb");
if (nombreWeb) nombreWeb.textContent = nombres[Math.floor(Math.random() * nombres.length)];

// Formulario
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

// Mostrar formulario
if (btnAgregar) {
  btnAgregar.addEventListener("click", () => {
    formReceta.classList.remove("oculto");
    document.querySelector(".seccion.active").click(); // Muestra la primera sección
  });
}

// Cerrar formulario
if (cerrarForm) {
  cerrarForm.addEventListener("click", () => formReceta.classList.add("oculto"));
}

// Cambiar entre secciones
const secciones = document.querySelectorAll(".seccion");
const contenidoSecciones = document.querySelectorAll(".contenido-seccion");

secciones.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    secciones.forEach(s => s.classList.remove("active"));
    contenidoSecciones.forEach(c => c.classList.add("oculto"));
    btn.classList.add("active");
    contenidoSecciones[i].classList.remove("oculto");
  });
});

// Guardar receta
if (guardarReceta) {
  guardarReceta.addEventListener("click", () => {
    const categoria = document.getElementById("categoriaReceta").value;
    const titulo = document.getElementById("tituloReceta").value.trim();
    const descripcion = document.getElementById("descripcionBreve").value.trim();
    const ingredientes = document.getElementById("ingredientes1").value.split(",");
    const procedimiento = document.getElementById("procedimiento1").value.trim();
    const ensalada = document.getElementById("ensalada").value.trim();
    const bebida = document.getElementById("bebida").value.trim();

    const portadaFile = document.getElementById("imagenPortada").files[0];
    const imgSecFile = document.getElementById("imagenSecundaria").files[0];
    const portada = portadaFile ? URL.createObjectURL(portadaFile) : null;
    const imgSec = imgSecFile ? URL.createObjectURL(imgSecFile) : null;

    if (!titulo) {
      alert("Por favor, agrega un título a la receta.");
      return;
    }

    const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
    app.agregarReceta(nueva);
    app.mostrarTodas();

    formReceta.classList.add("oculto");
    formReceta.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = "");
    document.getElementById("imagenPortada").value = "";
    document.getElementById("imagenSecundaria").value = "";
    document.getElementById("categoriaReceta").selectedIndex = 0;
  });
}

// Mostrar recetas al inicio
document.addEventListener("DOMContentLoaded", () => {
  app.mostrarTodas();
});
