
class NotesCreateService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute({ title, description, user_id, links, tags }) {
    //cadastrar a nota e recupera o id da nota cadastrado
    const { note_id } = await this.notesRepository.create({
      title,
      description,
      user_id,
    });

    console.log(note_id);

    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });

    await this.notesRepository.addLink(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await this.notesRepository.addTags(tagsInsert)
  }
}

module.exports = NotesCreateService
