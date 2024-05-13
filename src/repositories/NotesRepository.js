const knex = require("../database/knex");

class NotesRepository {
  async create({ title, description, user_id }) {
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    return { note_id };
  }

  async addLink(links) {
    await knex("links").insert(links);
  }

  async addTags(tags) {
    await knex("tags").insert(tags);
  }

  async show(id) {
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_At");

    return { note, tags, links };
  }

  async delete(id) {
    await knex("notes").where({ id }).delete();
  }

  async index(user_id) {
    const userTags = await knex("tags").where({ user_id });

    return userTags;
  }

  async findByTitle(user_id, title) {
    const notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("notes.title");

    return notes;
  }

  async findByTag(user_id, title, filterTags) {
    const notes = await knex("tags")
      .select(["notes.id", "notes.title", "notes.user_id"])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .groupBy("notes.id")
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("title");

    return notes;
  }
}

module.exports = NotesRepository;
