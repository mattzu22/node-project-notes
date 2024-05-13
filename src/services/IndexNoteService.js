class IndexNoteService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute(user_id, title, tags) {
    const filterTags = tags ? tags.split(",") : null;

    const [userTags, titleTagsUser, tagsByUser] = await Promise.all([
      this.notesRepository.index(user_id),
      this.notesRepository.findByTitle( user_id, title ),
      filterTags
        ? this.notesRepository.findByTag( user_id, title, filterTags )
        : null,
    ]);

    const notes = tagsByUser ? tagsByUser : titleTagsUser;

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return notesWithTags;
  }
}

module.exports = IndexNoteService;
