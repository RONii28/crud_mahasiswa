const routes = require("express").Router();

routes.use("/v1/mahasiswa", require("./mahasiswa"));
routes.use("/v1/auth", require("./auth"));


module.exports = routes;