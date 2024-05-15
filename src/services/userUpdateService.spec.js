const UserRepositoryinMemory = require("../repositories/UserRepositoryinMemory");
const UserCreateService = require("./UserCreateService");
const UserUpdateService = require("./UserUpdateService");


describe("UserRepositoryInMemory", () =>{
    let userRepositoryinMemory = null;
    let userUpdateService = null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryinMemory = new UserRepositoryinMemory();
        userCreateService = new UserCreateService(userRepositoryinMemory);
        userUpdateService = new UserUpdateService(userRepositoryinMemory);
    })

    it("the user must be updated", async()=>{
        const user = {
            name: "user Test",
            email: "teste@gmail.com",
            password: "12345"
        };

        const userUpdated = {
            name: "updated user Test",
            email: "updatedemail@gmail.com"
        };

        const {id: user_id}= await userCreateService.execute(user);

        await userUpdateService.execute({
            ...userUpdated,
            user_id
        });

        const updatedUser = await userRepositoryinMemory.findByUserId(user_id);

        expect(updatedUser.name).toBe(userUpdated.name);
        expect(updatedUser.email).toBe(userUpdated.email);
    })
})