const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const dataBase = await sqliteConnection();

    const user = await dataBase.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);

    return user;
  }

  async findByUserId(user_id) {
    const dataBase = await sqliteConnection();

    const user = await dataBase.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    return user;
  }

  async create({ name, email, password }) {
    const dataBase = await sqliteConnection();

    const userId = await dataBase.run(
      "INSERT INTO users (name,email,password) VALUES (? , ?, ?)",
      [name, email, password]
    );

    return { id: userId };
  }

  async update({ user, user_id }) {
    const dataBase = await sqliteConnection();

    await dataBase.run(
      `
      UPDATE users SET
      name= ?,
      email= ?,
      password= ?,
      updated_at = DATETIME('now')
      WHERE id = ?
      `,
      [user.name, user.email, user.password, user_id]
    );
  }

  async updateAvatar({ filename, user_id }) {
    await knex("users").update({ avatar: filename }).where({ id: user_id });
  }
}

module.exports = UserRepository;
