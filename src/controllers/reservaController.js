const Reserva = require("../models/reservation.model.js");
require("../middlewares/auth.js");

// GET: Mostrar todas las reservas de un usuario
const obtenerReservas = async (req, res) => {
  try {
    let reservas;

    if (req.usuario.rol === "admin") {
      // Admin ve todas las reservas
      reservas = await Reserva.find().populate("usuarioId");
    } else {
      // Cliente solo ve sus reservas
      reservas = await Reserva.find({ usuarioId: req.usuario._id });
    }

    res.render("reservas/listado", {
      reservas,
      titulo: "Mis reservas",
      usuario: req.usuario,
      nombre: req.usuario.nombre,
    });
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).send("Error al obtener reservas");
  }
};

// POST: Crear nueva reserva
const crearReserva = async (req, res) => {
  try {
    console.log("Body recibido:", req.body);
    console.log("Usuario en req:", req.usuario);

    const { fecha, hora } = req.body;
    if (!req.usuario) {
      return res.status(401).send("Usuario no autenticado");
    }

    const fechaHora = new Date(`${fecha}T${hora}`);

    const nuevaReserva = new Reserva({
      usuarioId: req.usuario._id,
      fechaHora,
    });

    await nuevaReserva.save();
    res.redirect("/reservas");
  } catch (error) {
    console.error("Error al crear reserva:", error.message);
    res.status(500).send("Error al crear reserva");
  }
};

// POST o DELETE: Cancelar reserva
const cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await Reserva.findByIdAndDelete(id);
    res.redirect("/reservas");
  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    res.status(500).send("Error al cancelar reserva");
  }
};

module.exports = {
  obtenerReservas,
  crearReserva,
  cancelarReserva,
};
