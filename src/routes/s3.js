const express = require("express");
const router = express.Router();

const bucketController = require("../controllers/s3Controller");

router.get("/dados/:mes", bucketController.buscarDadosPorMes);

module.exports = router;