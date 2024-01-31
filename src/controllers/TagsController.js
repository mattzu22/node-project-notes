const knex = require ("../database/knex");


class TagsController {
  async index(request, response){
    const  user_id  = request.user.id;

    const tags = await knex("tags")
    .where({ user_id })
    .groupBy("name")
    //groupBy = agrupar por algum elemento, faz com que as tags não se repitam 

    return response.json(tags)
  }
}

module.exports = TagsController;