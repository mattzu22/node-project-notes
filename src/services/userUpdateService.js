const AppError = require("../utils/AppError");

const { hash, compare } = require("bcryptjs");

class userUpdateService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute({ name, email, password, old_password, user_id }) {
      const user = await this.userRepository.findByUserId(user_id);
      const userWithUpdateEmail = await this.userRepository.findByEmail(email);
  
      if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
        throw new AppError("Email já está em uso!");
      }
  
      if (!user) {
        throw new AppError("Usuário não encontrado!");
      }
  
      user.name = name ?? user.name;
      user.email = email ?? user.email;
  
      if (password && !old_password) {
        throw new AppError(
          "Você precisa informar a senha antiga para definir a nova senha!"
        );
      }
  
      if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password);
  
        if (!checkOldPassword) {
          throw new AppError(
            "A senha antiga não confere ou se trata da mesma senha!"
          );
        }
  
        user.password = await hash(password, 9);
      }
  
      await this.userRepository.update({ user, user_id });
    }
  }

module.exports = userUpdateService
