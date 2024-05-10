const knex = require("../database/knex");

class NotesRepository {
  async create({title, description, user_id}) {
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    return {note_id};
  }

  async addLink(links) {
    await knex("links").insert(links);
  }

  async addTags(tags) {
    await knex("tags").insert(tags);
  }
}

module.exports = NotesRepository;
