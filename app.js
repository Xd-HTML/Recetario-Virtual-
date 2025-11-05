// ===============================
// 🌮 Clase Receta
// ===============================
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

  // 💡 Genera la tarjeta visual del catálogo
  mostrarHTML(index) {
    return `
      <div class="tarjeta" data-index="${index}">
        <div class="imagen">
          ${
            this.portada
              ? `<img src="${this.portada}" alt="Imagen de ${this.titulo}">`
              : `<div class="sin-imagen">🍽️</div>`
          }
        </div>
        <div class="contenido">
          <h3>${this.titulo}</h3>
          <p>${this.descripcion || "Sin descripción breve."}</p>
        </div>
      </div>
    `;
  }
}

// ===============================
// 📘 Clase Recetario
// ===============================
class Recetario {
  constructor() {
    this.recetas = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
  }

  agregarReceta(receta) {
    this.recetas.push(receta);
    this.guardarLocal();
  }

  guardarLocal() {
    localStorage.setItem("recetasGuardadas", JSON.stringify(this.recetas));
  }

  mostrarTodas() {
    const lista = document.getElementById("listaRecetas");
    if (!lista) return;

    lista.innerHTML = "";

    if (this.recetas.length === 0) {
      lista.innerHTML = `<p class="vacio">🍰 Aún no hay recetas guardadas. ¡Agrega la primera!</p>`;
      return;
    }

    // Generar las tarjetas directamente dentro del contenedor de cuadrícula
    lista.innerHTML = this.recetas.map((r, i) => r.mostrarHTML(i)).join("");

    // Evento al hacer clic en una receta
    document.querySelectorAll(".tarjeta").forEach(card => {
      card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        localStorage.setItem("recetaSeleccionada", JSON.stringify(this.recetas[index]));
        alert(`📋 Receta seleccionada: ${this.recetas[index].titulo}`);
      });
    });
  }
}

// ===============================
// 🧾 Inicialización
// ===============================
const app = new Recetario();

// Cambiar nombre del encabezado aleatoriamente
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
const nombreWeb = document.getElementById("nombreWeb");
if (nombreWeb) nombreWeb.textContent = nombres[Math.floor(Math.random() * nombres.length)];

// ===============================
// 🧁 Formulario y botones
// ===============================
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

// Mostrar formulario
btnAgregar?.addEventListener("click", () => {
  formReceta.classList.remove("oculto");
  document.querySelectorAll(".seccion")[0].click();
});

// Cerrar formulario
cerrarForm?.addEventListener("click", () => formReceta.classList.add("oculto"));

// Tabs (secciones)
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
guardarReceta?.addEventListener("click", () => {
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
    alert("Por favor, ingresa un título para la receta.");
    return;
  }

  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);
  app.mostrarTodas();

  // Limpiar formulario
  formReceta.classList.add("oculto");
  formReceta.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = "");
  document.getElementById("imagenPortada").value = "";
  document.getElementById("imagenSecundaria").value = "";
  document.getElementById("categoriaReceta").selectedIndex = 0;
});

// ===============================
// 🚀 Mostrar recetas al inicio
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  app.mostrarTodas();
});
