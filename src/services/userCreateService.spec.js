const UserCreateService = require("./UserCreateService")
const UserRepositoryinMemory = require("../repositories/UserRepositoryinMemory")
const AppError = require("../utils/AppError")

describe("UserRepositoryinMemory", () =>{
    let userRepositoryinMemory = null;
    let userCreateService = null;

    beforeEach(() =>{
        userRepositoryinMemory = new UserRepositoryinMemory();
        userCreateService = new UserCreateService(userRepositoryinMemory); 
    })

    it("user should be create", async ()=>{
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "1234"
        }
    
        const userCreated = await userCreateService.execute(user);
    
        expect(userCreated).toHaveProperty("id");
    })

    it("user not should be create with exists email", async ()=>{
        const user1 = {
            name: "test 1",
            emails: "email@test.com",
            password: "1234"
        }

        const user2 = {
            name: "test 2",
            emails: "email@test.com",
            password: "3123"
        }

        await userCreateService.execute(user1)
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já existe!"))

    })
})
