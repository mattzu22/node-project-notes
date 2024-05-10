const knex = require ("../database/knex");
const TagsRepository = require("../repositories/TagsRepository");


class TagsController {
  async index(request, response){
    const  user_id  = request.user.id;

    const tagsRepository = new TagsRepository();
    const tags = await tagsRepository.index({user_id});

    return response.json(tags)
  }
}

module.exports = TagsController;