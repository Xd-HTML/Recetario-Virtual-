// ================================================
//            FACTORY PARA CREAR SERVICIOS
// ================================================

const RecetaService = require("../services/RecetaService");
// Si luego agregas más servicios, los importas aquí:
// const UsuarioService = require("../services/UsuarioService");

class ServiceFactory {

    /**
     * Crea un servicio según el tipo solicitado.
     * @param {string} type → "recetas", "usuarios", etc.
     * @returns instancia del servicio solicitado
     */
    static create(type) {

        switch (type) {

            case "recetas":
                return new RecetaService();

            // case "usuarios":
            //     return new UsuarioService();

            default:
                throw new Error(`ServiceFactory ERROR: tipo de servicio desconocido → ${type}`);
        }

    }
}

module.exports = ServiceFactory;
