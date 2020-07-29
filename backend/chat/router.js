const express = require("express");
const router = express.Router();
const Notificacion = require("./src/controllers/notificacion");

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.route("/notificacion").post(Notificacion.nueva);
router.route("/notificacion/:idNotificacion").delete(Notificacion.eliminar);
module.exports = router;