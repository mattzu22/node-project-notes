const { Router } = require("express");

// por se tratar de uma class eu precisso instanciar( realocando-reservando uma espaço em memoria  ) ele na memória
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();

const userController = new UsersController();


usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuthenticated, userController.update);

module.exports = usersRoutes;
