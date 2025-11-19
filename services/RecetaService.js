// ================================================
//          Servicio para la tabla "recetas"
// ================================================

const conexion = require("../config/db");

class RecetaService {

    // ======================
    //   LISTAR TODAS
    // ======================
    async listar() {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM recetas", (error, resultados) => {
                if (error) reject(error);
                else resolve(resultados);
            });
        });
    }

    // ======================
    //   OBTENER POR ID
    // ======================
    async obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                "SELECT * FROM recetas WHERE id = ?",
                [id],
                (error, resultados) => {
                    if (error) reject(error);
                    else resolve(resultados[0] || null);
                }
            );
        });
    }

    // ======================
    //   CREAR NUEVA RECETA
    // ======================
    async crear(data) {
        const {
            categoria,
            portada,
            titulo,
            descripcion,
            ingredientes,
            imgSec,
            procedimiento,
            ensalada,
            bebida
        } = data;

        return new Promise((resolve, reject) => {
            conexion.query(
                `INSERT INTO recetas 
                (categoria, portada, titulo, descripcion, ingredientes, imgSec, procedimiento, ensalada, bebida)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    categoria,
                    portada,
                    titulo,
                    descripcion,
                    JSON.stringify(ingredientes),
                    imgSec,
                    JSON.stringify(procedimiento),
                    ensalada,
                    bebida
                ],
                (error, resultado) => {
                    if (error) reject(error);
                    else resolve({ id: resultado.insertId, ...data });
                }
            );
        });
    }

    // ======================
    //   ACTUALIZAR
    // ======================
    async actualizar(id, data) {
        const {
            categoria,
            portada,
            titulo,
            descripcion,
            ingredientes,
            imgSec,
            procedimiento,
            ensalada,
            bebida
        } = data;

        return new Promise((resolve, reject) => {
            conexion.query(
                `UPDATE recetas SET 
                    categoria=?, 
                    portada=?, 
                    titulo=?, 
                    descripcion=?, 
                    ingredientes=?, 
                    imgSec=?, 
                    procedimiento=?, 
                    ensalada=?, 
                    bebida=?
                WHERE id=?`,
                [
                    categoria,
                    portada,
                    titulo,
                    descripcion,
                    JSON.stringify(ingredientes),
                    imgSec,
                    JSON.stringify(procedimiento),
                    ensalada,
                    bebida,
                    id
                ],
                (error) => {
                    if (error) reject(error);
                    else resolve({ id, ...data });
                }
            );
        });
    }

    // ======================
    //   ELIMINAR
    // ======================
    async eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(
                "DELETE FROM recetas WHERE id = ?",
                [id],
                (error, resultado) => {
                    if (error) reject(error);
                    else resolve({ eliminado: true });
                }
            );
        });
    }
}

module.exports = RecetaService;
