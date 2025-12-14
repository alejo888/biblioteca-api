const { Router } = require("express");
const router = Router();
const { crearLibro, getLibro, getLibroDetalle, actualizarLibro, eliminarLibro } = require("../controllers/inventario");
const { validarCampos } = require("../middlewares/validaciones");
const { check } = require("express-validator");

router.get("/lists", getLibro);

router.get("/lists/:id", getLibroDetalle);

router.post("/lists",
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('autor', 'El autor es obligatorio').not().isEmpty(),
        validarCampos
    ], crearLibro);

router.put("/lists/:id", actualizarLibro);

router.delete("/lists/:id", eliminarLibro);

module.exports = router;
