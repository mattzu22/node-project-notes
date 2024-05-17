const UserRepositoryinMemory = require("../repositories/UserRepositoryinMemory");
const UserCreateService = require("./UserCreateService");
const UserUpdateService = require("./UserUpdateService");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

describe("UserRepositoryInMemory", () => {
  let userRepositoryinMemory = null;
  let userUpdateService = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryinMemory = new UserRepositoryinMemory();
    userCreateService = new UserCreateService(userRepositoryinMemory);
    userUpdateService = new UserUpdateService(userRepositoryinMemory);
  });

  it("the user must be updated", async () => {
    const user = {
      name: "user Test",
      email: "teste@gmail.com",
      password: "12345",
    };

    const userUpdated = {
      name: "updated user Test",
      email: "updatedemail@gmail.com",
    };

    const { id: user_id } = await userCreateService.execute(user);

    await userUpdateService.execute({
      ...userUpdated,
      user_id,
    });

    const updatedUser = await userRepositoryinMemory.findByUserId(user_id);

    expect(updatedUser.name).toBe(userUpdated.name);
    expect(updatedUser.email).toBe(userUpdated.email);
  });

  it("Verificar se o e-mail já está em uso", async () => {
    const user1 = {
      name: "teste 1",
      email: "teste1@gmail.com",
      password: "3123",
    };

    const user2 = {
      name: "teste 2",
      email: "teste2@gmail.com",
      password: "3123",
    };

    const updatedUser2 = {
      email: "teste1@gmail.com",
    };

    await userCreateService.execute(user1);
    const { id: user_id } = await userCreateService.execute(user2);

    await expect(
      userUpdateService.execute({
        ...updatedUser2,
        user_id,
      })
    ).rejects.toEqual(new AppError("Email já está em uso!"));
  });

  it("verificar se o user existe!", async () => {
    const user1 = {
      name: "user1",
      email: "user1@gmail.com",
      password: "12345",
    };

    const userUpdated = {
      name: "user2",
      email: "user2@gmail.com",
      password: "12345",
    };

    await userCreateService.execute(user1);

    await expect(
      userUpdateService.execute({
        ...userUpdated,
        user_id: "9aebba755a1b1f0dc5b8a845f9c84c5d",
      })
    ).rejects.toEqual(new AppError("Usuário não encontrado!"));
  });

  it("deve lançar um erro se a senha antiga não for fornecida ao definir a nova senha", async () => {
    const userMock = {
      name: "user1",
      email: "user1@gmail.com",
      password: "12345",
    };

    const userUpdatedPassword = {
      password: "123457",
      old_password: "12345"
    };

    const { id: user_id } = await userCreateService.execute(userMock);

    await userUpdateService.execute({
      ...userUpdatedPassword,
      user_id,
    });

    const updatedUser = await userRepositoryinMemory.findByUserId(user_id);

    const passwordMatches = await compare(userUpdatedPassword.password, updatedUser.password)

    await expect(passwordMatches).toBe(true);
  });

  it("deve lançar um erro se a senha antiga não for fornecida ao definir a nova senha", async () => {
    const userMock = {
      name: "user1",
      email: "user1@gmail.com",
      password: "12345",
    };

    const userUpdatedPassword = {
      password: "123457",
    };

    const { id: user_id } = await userCreateService.execute(userMock);

    await expect(
      userUpdateService.execute({
        ...userUpdatedPassword,
        user_id,
      })
    ).rejects.toEqual({"message": "Você precisa informar a senha antiga para definir a nova senha!", "statusCode": 400});
  });
});
