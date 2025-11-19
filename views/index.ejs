<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recetario Virtual</title>
    <link rel="stylesheet" href="/css/estilos.css">

    <!-- Opcional: Bootstrap -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

    <style>
        body { background: #f7f7f7; }
        .tarjeta {
            background: #fff;
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: 0.2s;
        }
        .tarjeta:hover { transform: scale(1.02); }
        .tarjeta img {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }
        .sin-img {
            width: 100%;
            height: 180px;
            background: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 40px;
        }
    </style>
</head>
<body>

    <div class="container mt-4">

        <h1 class="text-center mb-4">🥕 Recetario Virtual</h1>

        <!-- ============================
              Buscador
        ==============================-->
        <form class="d-flex mb-3" method="GET" action="/">
            <input class="form-control me-2" type="search"
                   name="buscar"
                   placeholder="Buscar receta por título..."
                   value="<%= buscar || '' %>">
            <button class="btn btn-primary">Buscar</button>
        </form>

        <!-- ============================
              Botón agregar
        ==============================-->
        <a href="/recetas/nueva" class="btn btn-success mb-4">➕ Agregar Receta</a>

        <!-- ============================
              Lista de recetas
        ==============================-->
        <div class="row">

            <% if (recetas.length === 0) { %>

                <p class="text-center text-muted">No hay recetas registradas.</p>

            <% } else { %>

                <% recetas.forEach(r => { %>
                    <div class="col-md-4 mb-3">
                        <div class="tarjeta">

                            <% if (r.portada) { %>
                                <img src="<%= r.portada %>" alt="Imagen">
                            <% } else { %>
                                <div class="sin-img">🍽️</div>
                            <% } %>

                            <h5><%= r.titulo %></h5>
                            <p><%= r.descripcion %></p>

                            <!-- Ver + Eliminar -->
                            <a href="/recetas/<%= r.id %>" class="btn btn-primary btn-sm">Ver</a>

                            <a href="/recetas/eliminar/<%= r.id %>"
                               class="btn btn-danger btn-sm"
                               onclick="return confirm('¿Eliminar esta receta?')">
                               Eliminar
                            </a>
                        </div>
                    </div>
                <% }) %>

            <% } %>

        </div>
    </div>

</body>
</html>
