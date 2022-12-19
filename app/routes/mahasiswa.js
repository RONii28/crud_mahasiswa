const routes = require("express").Router();

const controller = require("../controller/mahasiswa.controller")

routes.post("/", controller.create);
routes.get("/", controller.getAll);
routes.patch("/:id", controller.avatar);
routes.get("/:id", controller.getDetail);
routes.put("/:id", controller.update);
routes.delete("/:id", controller.delete);

module.exports = routes;