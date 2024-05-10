const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");
const AppError = require("../utils/AppError");

class SessionsService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError("Preencha os campos", 400);
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      //subject seria o conteudo que vai vir dentro do token
      subject: String(user.id),
      expiresIn,
    });

    return {user, token}
  }
}

module.exports = SessionsService;
