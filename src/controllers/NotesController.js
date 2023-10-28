const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    //cadastrar a nota e recupera o id da nota cadastrado
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_At");

    response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query;

    //whereLike serve pra procurar por valores que contenham dentro de um conteúdo, utilizando %chave%
    let notes;

    if (tags) {
      const filterTags = tags.split(",");
      //whereIn vai comprar name da tag com o vetor que estpa sendo passado
      notes = await knex("tags")
        //select passando um vetor pra pegar os valores de ambas as tabelas
        .select(["notes.id", "notes.title", "notes.user_id"])
        //filtrar as tags de acordo o id do user
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        //innerJoin serve pra conectar uma tabela com a outra, primeiro parametro vai ser qual tabela vc quer conectar e os outros dois será qual registro eu vou utilizar pra conectar ambas
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("notes.title");
    }

    //pegar todas as tags baseado no id do usuário
    const userTags = await knex("tags").where({ user_id })
    const notesWithTags = notes.map(note => {
      //filter para filtrar as tags das notas
        const noteTags = userTags.filter(tag => tag.note_id === note.id)

        return {
          ...note,
          tags: noteTags
        }
    })

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
