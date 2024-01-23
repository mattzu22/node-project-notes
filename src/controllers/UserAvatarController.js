const knex = require("knex");
const DiskStorage  = require("../provider/DiskStorage");
const AppError = require("../utils/AppError");


class UserAvatarController {
  async update(request, response){
    const id_user = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: id_user }).first();

    if (!user) {
        throw new AppError("Somente pessoas autorizadas pode mudar o avatar", 401)
    }

    if(user.avatar){
        await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename
  }
}

module.exports = UserAvatarController;