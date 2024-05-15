class UserRepositoryinMemory{
    users = [];

    async create({email, name, password}){
        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            email,
            name, 
            password
        }

        this.users.push(user);

        return user;
    }

    async findByEmail(email){
        return this.users.find(user => user.email === email)
    }

    
    async findByUserId(user_id){
        return this.users.find(user => user.id === user_id)
    }

    async update({ user, user_id }) {
        const userToBeUpdatedIndex = this.users.findIndex(u => u.id === user_id.id);
        if (userToBeUpdatedIndex !== -1) {
          this.users[userToBeUpdatedIndex] = {
            ...this.users[userToBeUpdatedIndex],
            name: user.name,
            email: user.email,
            // Adicione outras propriedades que deseja atualizar aqui
          };
          return this.users[userToBeUpdatedIndex];
        } else {
          return null; // Ou lance um erro, se preferir
        }
      }
}

module.exports = UserRepositoryinMemory;