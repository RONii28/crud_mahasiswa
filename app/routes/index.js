const routes = require("express").Router();

routes.use("/v1/mahasiswa", require("./mahasiswa"));

module.exports = routes;