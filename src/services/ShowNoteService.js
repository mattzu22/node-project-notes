class ShowNoteService{
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
      }

      async execute(id){
        const {note, tags, links} = await this.notesRepository.show(id);
        return {note, tags, links}
      }
}

module.exports = ShowNoteService;