import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have an show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(store.create).toBeDefined();
  });
  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  xit("create method should return created user", async () => {
    const userData = {
      username: "fanning",
      first_name: "Mick",
      last_name: "Fanning",
      password: "AsasdG30f",
    } as User;
    const result = await store.create(userData);
    expect(result.username).toEqual("fanning");
  });
  xit("create method should return error when user already exists", async () => {
    const userData = {
      username: "fanning",
      first_name: "Mick",
      last_name: "Fanning",
      password: "AsasdG30f",
    } as User;
    await expectAsync(store.create(userData)).toBeRejectedWithError(
      "User fanning already exists."
    );
  });
});
