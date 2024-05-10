const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");
const SessionsService = require("../services/SessionsService");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const sessionsService = new SessionsService(userRepository);

    const {user, token} = await sessionsService.execute({email, password});

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
