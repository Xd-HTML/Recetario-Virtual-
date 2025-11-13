// ===============================
// 🌮 Clase Receta
// ===============================
class Receta {
  constructor(categoria = "", portada = null, titulo = "", descripcion = "", ingredientes = [], imgSec = null, procedimiento = [], ensalada = "", bebida = "") {
    this.categoria = categoria;
    this.portada = portada;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.ingredientes = Array.isArray(ingredientes) ? ingredientes : (ingredientes ? String(ingredientes).split(",") : []);
    this.imgSec = imgSec;
    this.procedimiento = Array.isArray(procedimiento) ? procedimiento : (procedimiento ? String(procedimiento).split("\n") : []);
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
    const raw = JSON.parse(localStorage.getItem("recetasGuardadas")) || [];
    this.recetas = raw.map(r => new Receta(
      r?.categoria,
      r?.portada,
      r?.titulo,
      r?.descripcion,
      r?.ingredientes,
      r?.imgSec,
      r?.procedimiento,
      r?.ensalada,
      r?.bebida
    ));
  }

  agregarReceta(receta) {
    this.recetas.push(receta);
    this.guardarLocal();
  }

  guardarLocal() {
    localStorage.setItem("recetasGuardadas", JSON.stringify(this.recetas));
  }

  // 🆕 **MOSTRAR FILTRADAS POR CATEGORÍA**
  mostrarPorCategoria(categoria) {
    const lista = document.getElementById("listaRecetas");
    if (!lista) return;

    lista.innerHTML = "";

    let filtradas =
      categoria === "todas"
        ? this.recetas
        : this.recetas.filter(r => r.categoria === categoria);

    if (filtradas.length === 0) {
      lista.innerHTML = `<p class="vacio">🍽️ No hay recetas en esta sección.</p>`;
      return;
    }

    lista.innerHTML = filtradas
      .map((r, i) => r.mostrarHTML(i))
      .join("");

    // Activar el click en cada tarjeta
    document.querySelectorAll(".tarjeta").forEach(card => {
      card.addEventListener("click", () => {
        const index = Number(card.getAttribute("data-index"));
        if (Number.isFinite(index) && this.recetas[index]) {
          localStorage.setItem("recetaSeleccionada", JSON.stringify(this.recetas[index]));
          window.location.href = "detalle.html";
        }
      });
    });
  }
}

// ===============================
// 🧾 Inicialización
// ===============================
const app = new Recetario();

// Nombre aleatorio del encabezado
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
});

// Cerrar
cerrarForm?.addEventListener("click", () => formReceta.classList.add("oculto"));

// Tabs de secciones del formulario
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
// 📦 Convertir imagen a Base64
// ===============================
function convertirABase64(archivo) {
  return new Promise((resolve, reject) => {
    if (!archivo) return resolve(null);
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject("Error al leer el archivo");
    lector.readAsDataURL(archivo);
  });
}

// ===============================
// 💾 Guardar receta
// ===============================
guardarReceta?.addEventListener("click", async () => {
  const categoria = document.getElementById("categoriaReceta").value;
  const titulo = document.getElementById("tituloReceta").value.trim();
  const descripcion = document.getElementById("descripcionBreve").value.trim();
  const ingredientes = document.getElementById("ingredientes1").value.trim().split(",").map(a => a.trim());
  const procedimiento = document.getElementById("procedimiento1").value.trim().split("\n").map(a => a.trim());
  const ensalada = document.getElementById("ensalada")?.value || "";
  const bebida = document.getElementById("bebida")?.value || "";

  const portadaFile = document.getElementById("imagenPortada").files[0];
  const imgSecFile = document.getElementById("imagenSecundaria").files[0];

  if (!titulo) {
    alert("Por favor ingresa un título.");
    return;
  }

  let portada = await convertirABase64(portadaFile);
  let imgSec = await convertirABase64(imgSecFile);

  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);

  formReceta.classList.add("oculto");
  alert("Receta guardada ✔");
});

// ===============================
// 🚀 Mostrar recetas según categoría
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  app.mostrarPorCategoria("todas");

  document.getElementById("btnTodas")?.addEventListener("click", () => app.mostrarPorCategoria("todas"));
  document.getElementById("btnComidas")?.addEventListener("click", () => app.mostrarPorCategoria("comida"));
  document.getElementById("btnEnsaladas")?.addEventListener("click", () => app.mostrarPorCategoria("ensalada"));
  document.getElementById("btnBebidas")?.addEventListener("click", () => app.mostrarPorCategoria("bebida"));
});
