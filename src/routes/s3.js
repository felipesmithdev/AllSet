const express = require("express");
const router = express.Router();

const chuvaController = require("../controllers/s3ChuvaController");
const trafegoController = require("../controllers/s3TrafegoController");

router.get("/chuva", chuvaController.buscarTodosJsonsDeChuva);
router.get("/trafego", trafegoController.buscarTodosJsonsDeTrafego);

module.exports = router;