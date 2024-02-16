//hash é a função que vai gerar a cryptografia 
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const dataBase = await sqliteConnection();
    //inserir um conteúdo de uma variavel dentro do comando SQL
    const checkUserExists = await dataBase.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      // lançou uma exceção
      throw new AppError("Este e-mail já existe!")
    }

    const hashPassword = await hash(password, 9);

    //run + executar, nesse caso uma inserção 
    await dataBase.run("INSERT INTO users (name,email,password) VALUES (? , ?, ?)", [ name, email , hashPassword ])

    return response.status(201).json();

  }

  async update(request, response){
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if(!user){
      throw new AppError("Usuário não encontrado!")
    }

    const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
      throw new AppError("Email já está em uso!")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha!");
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);
      // const checkNewPassword = await compare(password, user.password )

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere ou se trata da mesma senha!");
      }

      user.password = await hash(password, 9);
    }

    await database.run(`
      UPDATE users SET
      name= ?,
      email= ?,
      password= ?,
      updated_at = DATETIME('now')
      WHERE id = ?
      `,
      [user.name, user.email, user.password , user_id]     
    )

    return response.json();
  }
}

module.exports = UsersController;
