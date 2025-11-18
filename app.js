// ===============================
// 🌮 Clase Receta
// ===============================
class Receta {
  constructor(
    categoria = "",
    portada = null,
    titulo = "",
    descripcion = "",
    ingredientes = "",
    imgSec = null,
    procedimiento = "",
    ensalada = "",
    bebida = ""
  ) {
    this.categoria = categoria;
    this.portada = portada;
    this.titulo = titulo;
    this.descripcion = descripcion;

    // 👉 ya NO se separa por comas ni nada
    this.ingredientes = ingredientes;

    this.imgSec = imgSec;

    // 👉 ya NO se separa por saltos de línea
    this.procedimiento = procedimiento;

    this.ensalada = ensalada;
    this.bebida = bebida;
  }

  // Genera HTML de tarjeta
  mostrarHTML(index) {
    return `
      <div class="tarjeta" data-index="${index}">
        <div class="imagen">
          ${this.portada ? `<img src="${this.portada}" alt="Imagen de ${this.titulo}">`
          : `<div class="sin-imagen">🍽️</div>`}
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
    const raw = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];

    this.recetas = raw.map(r => new Receta(
      r.categoria,
      r.portada,
      r.titulo,
      r.descripcion,
      r.ingredientes,  // ahora es string
      r.imgSec,
      r.procedimiento, // ahora es string
      r.ensalada,
      r.bebida
    ));
  }

  agregarReceta(receta) {
    this.recetas.push(receta);
    this.guardarLocal();
  }

  guardarLocal() {
    localStorage.setItem("recetasGuardadas", JSON.stringify(this.recetas));
  }

  // ===============================
  // 🔎 FILTRO POR CATEGORÍAS
  // ===============================
  mostrarPorCategoria(categoria) {
    const lista = document.getElementById("listaRecetas");
    if (!lista) return;

    lista.innerHTML = "";

    const filtradas = categoria === "todas"
      ? this.recetas
      : this.recetas.filter(r => r.categoria === categoria);

    if (filtradas.length === 0) {
      lista.innerHTML = `<p class="vacio">🍽️ No hay recetas en esta categoría.</p>`;
      return;
    }

    lista.innerHTML = filtradas.map((r, i) => r.mostrarHTML(i)).join("");

    document.querySelectorAll(".tarjeta").forEach((card, i) => {
      card.addEventListener("click", () => {
        localStorage.setItem("recetaSeleccionada", JSON.stringify(filtradas[i]));
        window.location.href = "detalle.html";
      });
    });
  }

  // =====================================
  // 🔎 BUSCADOR (POR TÍTULO Y DESCRIPCIÓN)
  // =====================================
  buscar(texto) {
    const lista = document.getElementById("listaRecetas");
    if (!lista) return;

    const palabra = texto.toLowerCase();

    const resultados = this.recetas.filter(r =>
      r.titulo.toLowerCase().includes(palabra) ||
      r.descripcion.toLowerCase().includes(palabra)
    );

    lista.innerHTML = resultados.length
      ? resultados.map((r, i) => r.mostrarHTML(i)).join("")
      : `<p class="vacio">❌ No se encontraron coincidencias.</p>`;

    document.querySelectorAll(".tarjeta").forEach((card, i) => {
      card.addEventListener("click", () => {
        localStorage.setItem("recetaSeleccionada", JSON.stringify(resultados[i]));
        window.location.href = "detalle.html";
      });
    });
  }
}

// ===============================
// 🧾 Inicialización
// ===============================
const app = new Recetario();

// Nombre aleatorio
const nombres = ["Cocina Mágica", "Mi Sazón", "Sabores Caseros", "Delicias del Hogar"];
const nombreWeb = document.getElementById("nombreWeb");
if (nombreWeb) nombreWeb.textContent = nombres[Math.floor(Math.random() * nombres.length)];

// ===============================
// FORMULARIO
// ===============================
const btnAgregar = document.getElementById("btnAgregar");
const formReceta = document.getElementById("formReceta");
const cerrarForm = document.getElementById("cerrarForm");
const guardarReceta = document.getElementById("guardarReceta");

btnAgregar?.addEventListener("click", () => formReceta.classList.remove("oculto"));
cerrarForm?.addEventListener("click", () => formReceta.classList.add("oculto"));

// Tabs
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

// ===============================
// BASE64 para imágenes
// ===============================
function convertirABase64(archivo) {
  return new Promise((resolve) => {
    if (!archivo) return resolve(null);
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.readAsDataURL(archivo);
  });
}

// ===============================
// 💾 GUARDAR RECETA
// ===============================
guardarReceta?.addEventListener("click", async () => {
  const categoria = document.getElementById("categoriaReceta").value;
  const titulo = document.getElementById("tituloReceta").value.trim();
  const descripcion = document.getElementById("descripcionBreve").value.trim();

  // ✔ YA NO SE DIVIDEN AUTOMÁTICAMENTE
  const ingredientes = document.getElementById("ingredientes1").value.trim();
  const procedimiento = document.getElementById("procedimiento1").value.trim();

  const ensalada = document.getElementById("ensalada")?.value || "";
  const bebida = document.getElementById("bebida")?.value || "";

  const portadaFile = document.getElementById("imagenPortada").files[0];
  const imgSecFile = document.getElementById("imagenSecundaria").files[0];

  if (!titulo) {
    alert("Por favor ingresa un título.");
    return;
  }

  const portada = await convertirABase64(portadaFile);
  const imgSec = await convertirABase64(imgSecFile);

  const nueva = new Receta(
    categoria,
    portada,
    titulo,
    descripcion,
    ingredientes,
    imgSec,
    procedimiento,
    ensalada,
    bebida
  );

  app.agregarReceta(nueva);

  formReceta.classList.add("oculto");
  alert("Receta guardada ✔");

  app.mostrarPorCategoria(categoria);
});

// ===============================
// 🚀 CARGAR INICIO + EVENTOS DEL MENÚ
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  app.mostrarPorCategoria("todas");

  document.querySelectorAll(".menu li").forEach(btn => {
    btn.addEventListener("click", () => {
      const categoria = btn.getAttribute("data-categoria");

      document.querySelectorAll(".menu li").forEach(li => li.classList.remove("activo"));
      btn.classList.add("activo");

      app.mostrarPorCategoria(categoria);
    });
  });

  // Buscador
  const buscador = document.getElementById("buscarReceta");

  if (buscador) {
    buscador.addEventListener("input", () => {
      const texto = buscador.value.trim();
      if (texto === "") app.mostrarPorCategoria("todas");
      else app.buscar(texto);
    });
  }

});

// ===============================
// 🗑️ BORRAR HISTORIAL
// ===============================
document.getElementById("btnBorrarHistorial")?.addEventListener("click", () => {
  localStorage.clear();
  alert("Historial borrado correctamente.");
});



<script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"></script>

<script>
  // Configuración REAL de tu proyecto
  const firebaseConfig = {
  apiKey: "AIzaSyB2cU8nXlkxEBLKSX5cBvLKybGE8HHpw1c",
  authDomain: "recetario-virtual.firebaseapp.com",
  databaseURL: "https://recetario-virtual-default-rtdb.firebaseio.com",
  projectId: "recetario-virtual",
  storageBucket: "recetario-virtual.firebasestorage.app",
  messagingSenderId: "1062247715844",
  appId: "1:1062247715844:web:180a220283b74c481f5151"
};

  // Inicializar Firebase
  const appFirebase = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
</script>

