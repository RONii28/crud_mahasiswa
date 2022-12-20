const routes = require("express").Router();

// controller
const controller = require("../controller/auth.controller");
// route POST
routes.post("/", controller.login);

module.exports = routes;