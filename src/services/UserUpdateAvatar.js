const DiskStorage = require("../provider/DiskStorage");
const AppError = require("../utils/AppError");

class UserUpdateAvatar {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ avatarFilename, user_id }) {
    const user = await this.userRepository.findByUserId(user_id);

    const diskStorage = new DiskStorage();

    if (!user) {
      throw new AppError(
        "Somente pessoas autorizadas pode mudar o avatar",
        401
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filename = await diskStorage.saveFile(avatarFilename);

    await this.userRepository.updateAvatar({
      filename,
      user_id,
    });

    const userUpdated = await this.userRepository.findByUserId(user_id)

    return userUpdated;
  }
}

module.exports = UserUpdateAvatar;
