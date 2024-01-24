const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

// por se tratar de uma class eu precisso instanciar( realocando-reservando uma espaço em memoria  ) ele na memória
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

//a gente utiliza o single pq vamos upar apenas um arquivo, a foto do user, e depois passamos o nome do campo que vaitrazer esse arquivo 

usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuthenticated, userController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes;
