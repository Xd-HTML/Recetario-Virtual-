// =========================================
// 🚀 Clase Receta (Molde)
// =========================================
class Receta {
    constructor({ titulo, descripcion, ingredientes, procedimiento, ensalada, bebida, imagen, imagen2 }) {
        this.titulo = titulo || "Sin título";
        this.descripcion = descripcion || "";
        this.ingredientes = ingredientes || [];
        this.procedimiento = procedimiento || [];
        this.ensalada = ensalada || "Sin ensalada";
        this.bebida = bebida || "Sin bebida";
        this.imagen = imagen || "img/default.jpg";
        this.imagen2 = imagen2 || "img/default2.jpg";
    }
}

// =========================================
// 🏭 Patrón Factory: Creador de recetas
// =========================================
class RecetaFactory {
    static crearReceta(data) {
        return new Receta(data);
    }
}

// =========================================
// 📌 Guardar una receta nueva
// =========================================
function guardarReceta(data) {
    let recetas = JSON.parse(localStorage.getItem("recetas")) || [];

    // Crear receta usando Factory
    const nuevaReceta = RecetaFactory.crearReceta(data);

    // Crear ID único
    nuevaReceta.id = Date.now();

    // Guardar en la lista
    recetas.push(nuevaReceta);

    // Guardar en localStorage
    localStorage.setItem("recetas", JSON.stringify(recetas));

    alert("Receta guardada exitosamente");
}

// =========================================
// 📌 Ver una receta (abrir detalle)
// =========================================
function verReceta(id) {
    const recetas = JSON.parse(localStorage.getItem("recetas")) || [];

    const recetaEncontrada = recetas.find(r => r.id === id);

    if (recetaEncontrada) {
        // Crear un objeto receta real con Factory
        const receta = RecetaFactory.crearReceta(recetaEncontrada);

        localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));

        // Ir a la página de detalle
        window.location.href = "ver_receta.html";
    }
}

// =========================================
// 📌 Mostrar lista de recetas en index.html
// =========================================
function cargarRecetas() {
    const contenedor = document.getElementById("listaRecetas");
    if (!contenedor) return;

    const recetas = JSON.parse(localStorage.getItem("recetas")) || [];

    contenedor.innerHTML = recetas.map(r => `
        <div class="item-receta" onclick="verReceta(${r.id})">
            <img src="${r.imagen}" class="img-item">
            <h3>${r.titulo}</h3>
            <p>${r.descripcion.substring(0, 70)}...</p>
        </div>
    `).join("");
}

// =========================================
// 🗑️ Limpiar historial (opcional)
// =========================================
function limpiarHistorial() {
    localStorage.removeItem("recetaSeleccionada");
    console.log("Historial borrado correctamente");
}

// =========================================
// 📌 Ejecutar cuando cargue la página
// =========================================
document.addEventListener("DOMContentLoaded", cargarRecetas);
