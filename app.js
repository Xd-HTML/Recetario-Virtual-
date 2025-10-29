// ============================
// 📘 Clase Receta
// ============================
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

// ============================
// 📗 Clase Recetario
// ============================
class Recetario {
  constructor() {
    this.recetas = JSON.parse(localStorage.getItem("recetas")) || [];
  }

  guardarEnLocalStorage() {
    localStorage.setItem("recetas", JSON.stringify(this.recetas));
  }

  agregarReceta(receta) {
    this.recetas.push(receta);
    this.guardarEnLocalStorage();
  }

  mostrarTodas(filtro = "") {
    const lista = document.getElementById("listaRecetas");
    lista.classList.remove("oculto");

    let recetasFiltradas = this.recetas;

    if (filtro && filtro !== "todas") {
      recetasFiltradas = recetasFiltradas.filter(r => r.categoria === filtro);
    }

    lista.innerHTML = recetasFiltradas.map((r, i) => r.mostrarHTML(i)).join("") || `
      <p style="text-align:center; color:#777;">No hay recetas disponibles en esta categoría.</p>
    `;

    // Evento al hacer clic en una receta
    document.querySelectorAll(".receta").forEach(card => {
      card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        localStorage.setItem("recetaDetalle", JSON.stringify(this.recetas[index]));
        window.location.href = "detalle.html";
      });
    });
  }

  buscarPorTitulo(texto) {
    const lista = document.getElementById("listaRecetas");
    const termino = texto.toLowerCase().trim();
    const resultados = this.recetas.filter(r => r.titulo.toLowerCase().includes(termino));

    lista.innerHTML = resultados.map((r, i) => r.mostrarHTML(i)).join("") || `
      <p style="text-align:center; color:#777;">No se encontraron recetas con ese título.</p>
    `;

    document.querySelectorAll(".receta").forEach(card => {
      card.addEventListener("click", () => {
        const index = card.getAttribute("data-index");
        localStorage.setItem("recetaDetalle", JSON.stringify(this.recetas[index]));
        window.location.href = "detalle.html";
      });
    });
  }
}

// ============================
// 📙 Inicialización
// ============================
const app = new Recetario();

// Nombre aleatorio para la cabecera
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
document.getElementById("nombreWeb").textContent = nombres[Math.floor(Math.random() * nombres.length)];

// ============================
// 📋 Formularios y botones
// ============================
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

btnAgregar.addEventListener("click", () => formReceta.classList.remove("oculto"));
cerrarForm.addEventListener("click", () => formReceta.classList.add("oculto"));

// ============================
// 🧁 Guardar nueva receta
// ============================
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

// ============================
// 🔎 Búsqueda en vivo
// ============================
document.getElementById("buscarReceta").addEventListener("input", e => {
  const texto = e.target.value;
  if (texto === "") {
    app.mostrarTodas();
  } else {
    app.buscarPorTitulo(texto);
  }
});

// ============================
// 🍽️ Filtrado por categorías
// ============================
document.querySelectorAll(".menu li").forEach(item => {
  item.addEventListener("click", () => {
    const categoria = item.getAttribute("data-categoria");
    app.mostrarTodas(categoria);
  });
});

// ============================
// 🚀 Mostrar recetas al iniciar
// ============================
app.mostrarTodas();
