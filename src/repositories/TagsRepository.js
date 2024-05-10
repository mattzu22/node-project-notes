const knex = require("../database/knex");


class TagsRepository {
  async index({user_id}) {
   return await knex("tags").where({ user_id }).groupBy("name");
        //groupBy = agrupar por algum elemento, faz com que as tags não se repitam 
  }
};

module.exports = TagsRepository;
