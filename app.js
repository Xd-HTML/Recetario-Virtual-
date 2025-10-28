// === app.js ===

// 📦 Clase principal para las recetas
class Receta {
  constructor(titulo, categoria, ingredientes, pasos) {
    this.titulo = titulo;
    this.categoria = categoria;
    this.ingredientes = ingredientes;
    this.pasos = pasos;
  }

  mostrarHTML() {
    return `
      <div class="receta">
        <h3>${this.titulo}</h3>
        <p><strong>Categoría:</strong> ${this.categoria}</p>
        <p><strong>Ingredientes:</strong> ${this.ingredientes.join(', ')}</p>
        <p><strong>Pasos:</strong> ${this.pasos}</p>
      </div>
    `;
  }
}

// 📚 Clase para manejar el recetario
class Recetario {
  constructor() {
    this.recetas = [];
  }

  agregarReceta(receta) {
    this.recetas.push(receta);
  }

  filtrarPorCategoria(categoria) {
    return this.recetas.filter(r => r.categoria === categoria);
  }

  buscarPorTitulo(titulo) {
    return this.recetas.filter(r => r.titulo.toLowerCase().includes(titulo.toLowerCase()));
  }
}

// 🧠 Instancia del recetario
const miRecetario = new Recetario();

// 🔹 Agregamos recetas de ejemplo
miRecetario.agregarReceta(new Receta("Aros con Pollo", "comida", ["pollo", "harina", "aceite"], "Freír los aros hasta dorar."));
miRecetario.agregarReceta(new Receta("Torta de Chocolate", "reposteria", ["harina", "cacao", "azúcar"], "Hornear 40 minutos."));
miRecetario.agregarReceta(new Receta("Jugo de Fresa", "bebidas", ["fresas", "agua", "azúcar"], "Licuar y servir frío."));

// 🔎 Mostrar recetas
const lista = document.getElementById("listaRecetas");
const categorias = document.querySelectorAll(".menu li");
const buscar = document.getElementById("buscarReceta");
const nombreWeb = document.getElementById("nombreWeb");

// 🌟 Nombre aleatorio para la web
const nombres = ["Sabores del Mundo", "Cocina Mágica", "Recetas Estelares", "Dulce Hogar", "Mi Sabor"];
nombreWeb.textContent = nombres[Math.floor(Math.random() * nombres.length)];

// 🎯 Mostrar todas las recetas al inicio
mostrarRecetas(miRecetario.recetas);

// 🧩 Filtrar por categoría
categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    const categoria = cat.dataset.categoria;
    mostrarRecetas(miRecetario.filtrarPorCategoria(categoria));
  });
});

// 🔍 Buscar por título
buscar.addEventListener("input", () => {
  const texto = buscar.value;
  mostrarRecetas(miRecetario.buscarPorTitulo(texto));
});

// 🖼️ Función para mostrar recetas
function mostrarRecetas(listaRecetas) {
  lista.innerHTML = listaRecetas.map(r => r.mostrarHTML()).join('');
}
