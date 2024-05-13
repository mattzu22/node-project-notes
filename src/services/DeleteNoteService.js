class DeleteNoteService{
    constructor(notesRespository){
        this.notesRespository = notesRespository
    }

    async execute(id){
        await this.notesRespository.delete(id);
    }
}

module.exports = DeleteNoteService;