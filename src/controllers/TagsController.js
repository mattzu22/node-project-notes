const knex = require ("../database/knex");
const TagsRepository = require("../repositories/TagsRepository");
const TagsIndexService = require("../services/TagsIndexService");


class TagsController {
  async index(request, response){
    const user_id  = request.user.id;

    const tagsRepository = new TagsRepository();
    const tagsIndexService = new TagsIndexService(tagsRepository);

    const  tags  = await tagsIndexService.execute(user_id);

    return response.json(tags)
  }
}

module.exports = TagsController;