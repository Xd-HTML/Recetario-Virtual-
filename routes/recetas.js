<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><%= receta.titulo %> | Recetario Virtual</title>

    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

    <style>
        body {
            background: #fafafa;
        }
        .contenedor {
            background: #fff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        }
        .portada {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .img-secundaria {
            width: 100%;
            border-radius: 10px;
            margin-top: 15px;
        }
        .titulo {
            font-size: 32px;
            font-weight: bold;
        }
        .subtitulo {
            margin-top: 25px;
            font-weight: bold;
        }
        ul, ol { padding-left: 20px; }
    </style>
</head>
<body>

    <div class="container mt-4 mb-5">

        <!-- Botones -->
        <a href="/" class="btn btn-secondary mb-3">← Volver</a>
        <a href="/recetas/eliminar/<%= receta.id %>" 
           class="btn btn-danger mb-3 ms-2"
           onclick="return confirm('¿Eliminar esta receta?')">
           🗑 Eliminar
        </a>

        <div class="contenedor">

            <!-- Título -->
            <h1 class="titulo"><%= receta.titulo %></h1>

            <!-- Descripción -->
            <p class="text-muted"><%= receta.descripcion %></p>

            <!-- Imagen principal -->
            <% if (receta.portada) { %>
                <img src="<%= receta.portada %>" class="portada">
            <% } %>

            <!-- INGREDIENTES -->
            <h3 class="subtitulo">🥗 Ingredientes</h3>
            <ul>
                <% receta.ingredientes.forEach(i => { %>
                    <li><%= i %></li>
                <% }) %>
            </ul>

            <!-- Imagen secundaria -->
            <% if (receta.imgSec) { %>
                <img src="<%= receta.imgSec %>" class="img-secundaria">
            <% } %>

            <!-- PROCEDIMIENTO -->
            <h3 class="subtitulo">👩‍🍳 Procedimiento</h3>
            <ol>
                <% receta.procedimiento.forEach(p => { %>
                    <li><%= p %></li>
                <% }) %>
            </ol>

            <!-- Acompañamientos -->
            <h3 class="subtitulo">🍽 Acompañamientos</h3>

            <p><strong>Ensalada:</strong> <%= receta.ensalada || "Sin ensalada" %></p>
            <p><strong>Bebida:</strong> <%= receta.bebida || "Sin bebida" %></p>

        </div>

    </div>

</body>
</html>
