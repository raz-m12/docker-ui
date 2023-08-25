let express = require('express');
let router = express.Router();

let containerController = require("../controllers/container.controller");

/* GET users listing. */
router.get('/projects', containerController.getProjects);

module.exports = router;
