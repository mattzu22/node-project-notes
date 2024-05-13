class TagsIndexService{
    constructor(tagsRepository){
        this.tagsRepository = tagsRepository
    }

    async execute(user_id){
        const tags = await this.tagsRepository.index({user_id});

        return tags;
    }
}

module.exports = TagsIndexService;