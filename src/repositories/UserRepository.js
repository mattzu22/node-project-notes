const sqliteConnection = require("../database/sqlite")

class UserRepository{
    async findByEmail(email){
        const dataBase = await sqliteConnection();
      
        const user = await dataBase.get("SELECT * FROM users WHERE email = (?)", [email])

        return user;
    }

    async create({ name, email, password }){
        const dataBase = await sqliteConnection();
      
        const userId = await dataBase.run("INSERT INTO users (name,email,password) VALUES (? , ?, ?)", [ name, email , password ])

        return {id: userId};
    }
}

module.exports = UserRepository;