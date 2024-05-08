const UserRepository = require("../repositories/UserRepository");
const UserUpdateAvatar = require("../services/UserUpdateAvatar");
class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const userRepository = new UserRepository();
    const userUpdateAvatar = new UserUpdateAvatar(userRepository);

    const userUpdated = await userUpdateAvatar.execute({
      avatarFilename,
      user_id,
    });

    return response.json(userUpdated);
  }
}

module.exports = UserAvatarController;
