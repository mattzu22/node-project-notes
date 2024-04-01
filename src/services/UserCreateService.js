const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    //inserir um conteúdo de uma variavel dentro do comando SQL
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      // lançou uma exceção
      throw new AppError("Este e-mail já existe!");
    }

    const hashPassword = await hash(password, 9);

    //run + executar, nesse caso uma inserção
    await this.userRepository.create({ name, email, password: hashPassword });
  }
}

module.exports = UserCreateService;
