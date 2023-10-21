const { Router } = require("express");

// por se tratar de uma class eu precisso instanciar( realocando-reservando uma espaço em memoria  ) ele na memória
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const userController = new UsersController();


usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);

module.exports = usersRoutes;








// function myMidleware(request, response, next) {
//   const { isAdmin, user } = request.body;

//   if (!isAdmin) {
//     return response.json({
//       message: `O usuário ${user} não tem permisão para acessar o painel`,
//     });
//   }
//   O NEXT É A FUNÇÃO DO MIDLEWARE QUE CHAMA A PR[OXIMA FUNÇÃO A SER EXECUTADA NO FLUXO
//   next();
// }

//eu posso passar o midleware de duas formas 
//1- diretamente na rota especifica, vc passa como um parâmetro antes de ser chamado o controller
//2- em todas as rotas, vc passa na rota, dessa forma vc atingi todas as rotas de uma só vez
// usersRoutes.use(myMidleware)