<!DOCTYPE html>

<html lang="es"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Detalle de Receta | Recetario Virtual</title>  <link rel="stylesheet" href="detalle.css"></head><body>  <!-- Encabezado -->  <header class="encabezado-detalle"><button id="btnVolver" class="btn-volver" onclick="window.history.back()">← Volver</button>

<h1>Detalle de la Receta</h1>

  </header>  <!-- Contenedor Principal -->  <main id="detalleReceta" class="contenedor-detalle"><section class="portada">

  <img id="detalleImagen" class="detalle-imagen" src="" alt="Imagen principal de la receta">

</section>



<section class="info-principal">

  <h2 id="detalleTitulo">Título de la receta</h2>

  <p id="detalleDescripcion" class="descripcion"></p>

</section>



<section class="bloque">

  <h3>Ingredientes</h3>

  <ul id="detalleIngredientes" class="lista-ingredientes">

    <li>Ejemplo: 1 taza de harina</li>

    <li>Ejemplo: 2 huevos</li>

    <li>Ejemplo: 1/2 taza de leche</li>

  </ul>

</section>



<section class="bloque">

  <img id="detalleImagen2" class="detalle-secundaria" src="" alt="Imagen secundaria de la receta">

</section>



<section class="bloque">

  <h3>Procedimiento</h3>

  <ol id="detalleProcedimiento" class="lista-procedimiento">

    <li>Mezcla todos los ingredientes secos.</li>

    <li>Añade los líquidos y bate hasta obtener una masa homogénea.</li>

    <li>Cocina a fuego medio hasta dorar.</li>

  </ol>

</section>



<section class="bloque acompanamientos">

  <h3>Acompañamientos</h3>



  <div id="detalleEnsalada" class="sub-bloque">

    <strong>Ensalada:</strong>

    <p>Lechuga, tomate, palta y un toque de limón.</p>

  </div>



  <div id="detalleBebida" class="sub-bloque">

    <strong>Bebida:</strong>

    <p>Jugo natural o una bebida fría al gusto.</p>

  </div>

</section>

  </main>  <footer class="pie-detalle"><p>Recetario Virtual © 2025</p>

  </footer>  <script>
  
    // Cargar los datos guardados desde localStorage
  
    document.addEventListener("DOMContentLoaded", () => {
  
      const receta = JSON.parse(localStorage.getItem("recetaSeleccionada"));
  

  
      if (receta) {
  
        document.getElementById("detalleTitulo").textContent = receta.titulo || "Receta sin título";
  
        document.getElementById("detalleDescripcion").textContent = receta.descripcion || "";
  
        document.getElementById("detalleIngredientes").innerHTML = receta.ingredientes
  
          ? receta.ingredientes.map(i => `<li>${i}</li>`).join("")
  
          : "";
  
        document.getElementById("detalleProcedimiento").innerHTML = receta.procedimiento
  
          ? receta.procedimiento.map(p => `<li>${p}</li>`).join("")
  
          : "";
  
        document.getElementById("detalleEnsalada").innerHTML = `<strong>Ensalada:</strong> <p>${receta.ensalada || "Sin ensalada"}</p>`;
  
        document.getElementById("detalleBebida").innerHTML = `<strong>Bebida:</strong> <p>${receta.bebida || "Sin bebida"}</p>`;
  

  
        // Cargar imágenes
  
        document.getElementById("detalleImagen").src = receta.imagen || "img/default.jpg";
  
        document.getElementById("detalleImagen2").src = receta.imagen2 || "img/default2.jpg";
  
      }
  
    });
  
  </script></body></html>
