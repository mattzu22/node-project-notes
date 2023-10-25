const { Router } = require("express");

// por se tratar de uma class eu precisso instanciar( realocando-reservando uma espaço em memoria  ) ele na memória
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const userController = new UsersController();


usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);

module.exports = usersRoutes;
