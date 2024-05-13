const knex = require("../database/knex");
const NotesRepository = require("../repositories/NotesRepository");
const DeleteNoteService = require("../services/DeleteNoteService");
const IndexNoteService = require("../services/IndexNoteService");
const NotesCreateService = require("../services/NotesCreateService");
const ShowNoteService = require("../services/ShowNoteService");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const notesCreateService = new NotesCreateService(notesRepository);

    await notesCreateService.execute({
      title,
      description,
      user_id,
      links,
      tags,
    });

    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();
    const notesShowService = new ShowNoteService(notesRepository);

    const { note, tags, links } = await notesShowService.execute(id);

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();
    const deleteNoteService = new DeleteNoteService(notesRepository);

    await deleteNoteService.execute(id);

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;

    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const indexNoteService = new IndexNoteService(notesRepository);

    const notesWithTags  = await indexNoteService.execute(
      user_id,
      title,
      tags
    );

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
