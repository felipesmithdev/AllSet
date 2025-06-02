var express = require("express");
var router = express.Router();
var slackController = require("../controllers/slackController");

// Rota para solicitar análise via Slack
router.post("/solicitarAnalise", function (req, res) {
    slackController.solicitarAnalise(req, res);
});

module.exports = router;