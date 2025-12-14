const { response } = require("express");
const Libro = require("../model/libro");

const crearLibro = async (req, res = response) => {

    const { titulo } = req.body;

    try {

        const libroExistente = await Libro.findOne({ titulo });

        if (libroExistente) {
            return res.status(400).json({
                success: false,
                msg: `El libro ${titulo} ya existe en el inventario`
            });
        }

        const libro = new Libro(req.body);
        await libro.save();

        res.status(201).json({
            success: true,
            msg: `Libro ${titulo} creado exitosamente`,
            libro
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al crear libro'
        });
    }

}

const getLibro = async (req, res = response) => {
    try {
        const libros = await Libro.find();
        res.status(200).json({
            success: true,
            msg: 'Lista de libros',
            libros
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener libros'
        });
    }
}

const getLibroDetalle = async (req, res = response) => {

    const id = req.params.id;

    try {
        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                success: false,
                msg: 'Libro no encontrado',
                libro
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Libro encontrado',
            libro
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener libro'
        });
    }
}

const actualizarLibro = async (req, res = response) => {
    const id = req.params.id;

    try {
        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                success: false,
                msg: 'No existe un libro con ese id',
            });
        }
        const { titulo } = req.body;
        if (titulo !== libro.titulo) {
            const libroExistente = await Libro.findOne({ titulo });
            if (libroExistente) {
                return res.status(400).json({
                    success: false,
                    msg: `El titulo ${titulo} ya esta en uso por otro libro`
                });
            }
        }

        const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Libro actualizado exitosamente',
            libroActualizado
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar libro'
        });
    }
}

const eliminarLibro = async (req, res = response) => {
    const _id = req.params.id;

    try {
        const libro = await Libro.findById(_id);
        if (!libro) {
            return res.status(404).json({
                success: false,
                msg: 'Libro no encontrado',
            });
        }
        const libroEliminado = await Libro.findByIdAndDelete(_id);
        res.status(200).json({
            success: true,
            msg: 'Libro eliminado exitosamente',
            libroEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar libro'
        });
    }
}

module.exports = {
    crearLibro,
    getLibro,
    getLibroDetalle,
    actualizarLibro,
    eliminarLibro
}