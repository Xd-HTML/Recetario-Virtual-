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
    // Reconstruir instancias de Receta para recuperar métodos
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

  mostrarTodas() {
    const lista = document.getElementById("listaRecetas");
    if (!lista) return;

    lista.innerHTML = "";

    if (this.recetas.length === 0) {
      lista.innerHTML = `<p class="vacio">🍰 Aún no hay recetas guardadas. ¡Agrega la primera!</p>`;
      return;
    }

    lista.innerHTML = this.recetas.map((r, i) => r.mostrarHTML(i)).join("");

    // Evento al hacer clic en una receta (convertir index a número)
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
  const primeraSeccion = document.querySelectorAll(".seccion")[0];
  if (primeraSeccion) primeraSeccion.click();
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
    if (contenidoSecciones[i]) contenidoSecciones[i].classList.remove("oculto");
  });
});

// ===============================
// 📦 Función auxiliar para convertir imagen a Base64
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
  const categoriaEl = document.getElementById("categoriaReceta");
  const categoria = categoriaEl ? categoriaEl.value : "";
  const tituloEl = document.getElementById("tituloReceta");
  const titulo = tituloEl ? tituloEl.value.trim() : "";
  const descripcion = (document.getElementById("descripcionBreve") || { value: "" }).value.trim();
  const ingredientesRaw = (document.getElementById("ingredientes1") || { value: "" }).value.trim();
  const ingredientes = ingredientesRaw ? ingredientesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
  const procedimientoRaw = (document.getElementById("procedimiento1") || { value: "" }).value.trim();
  const procedimiento = procedimientoRaw ? procedimientoRaw.split("\n").map(s => s.trim()).filter(Boolean) : [];
  const ensalada = (document.getElementById("ensalada") || { value: "" }).value.trim();
  const bebida = (document.getElementById("bebida") || { value: "" }).value.trim();

  const portadaFile = (document.getElementById("imagenPortada") || { files: [] }).files[0];
  const imgSecFile = (document.getElementById("imagenSecundaria") || { files: [] }).files[0];

  if (!titulo) {
    alert("Por favor, ingresa un título para la receta.");
    return;
  }

  // Convertir imágenes a base64 para que se guarden en localStorage
  let portada = null, imgSec = null;
  try {
    portada = await convertirABase64(portadaFile);
    imgSec = await convertirABase64(imgSecFile);
  } catch (err) {
    console.warn("Error leyendo imágenes:", err);
  }

  const nueva = new Receta(categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida);
  app.agregarReceta(nueva);
  app.mostrarTodas();

  // Limpiar formulario
  formReceta.classList.add("oculto");
  formReceta.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = "");
  if (document.getElementById("imagenPortada")) document.getElementById("imagenPortada").value = "";
  if (document.getElementById("imagenSecundaria")) document.getElementById("imagenSecundaria").value = "";
  if (document.getElementById("categoriaReceta")) document.getElementById("categoriaReceta").selectedIndex = 0;
  alert("✅ Receta guardada correctamente.");
});

// ===============================
// 🚀 Mostrar recetas al inicio
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  app.mostrarTodas();
});

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

// 🔍 Verifica si hay usuario logueado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Si no está logueado, redirige al login
    alert("Debes iniciar sesión para crear recetas");
    window.location.href = "login.html";
  }
});

import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebaseConfig.js';

const loginModal = document.getElementById('loginModal');
const btnPerfil = document.getElementById('btnPerfil');
const btnLogin = document.getElementById('btnLogin');
const btnCerrarLogin = document.getElementById('btnCerrarLogin');
const btnAgregar = document.getElementById('btnAgregar');

let usuarioActual = null;

// Mostrar el modal de login
btnPerfil.addEventListener('click', () => {
  if (usuarioActual) {
    if (confirm("¿Deseas cerrar sesión?")) {
      signOut(auth);
    }
  } else {
    loginModal.classList.remove('oculto');
  }
});

// Cerrar modal
btnCerrarLogin.addEventListener('click', () => {
  loginModal.classList.add('oculto');
});

// Iniciar sesión
btnLogin.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginModal.classList.add('oculto');
    alert("Inicio de sesión exitoso.");
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Verificar sesión
onAuthStateChanged(auth, (user) => {
  usuarioActual = user;
  if (user) {
    btnPerfil.textContent = "👤 Cerrar Sesión";
    btnAgregar.style.display = "block";
  } else {
    btnPerfil.textContent = "👤 Iniciar Sesión";
    btnAgregar.style.display = "none";
  }
});

