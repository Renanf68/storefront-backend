import { UserStore } from "../../models/user";
import { testUser } from "../helpers";

const store = new UserStore();

let newUserId: string;

describe("User Models", () => {
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
  it("create method should return created user", async () => {
    const result = await store.create(testUser);
    newUserId = result.id ?? "not_found";
    expect(result.username).toEqual("fanning");
  });
  it("create method should return error when user already exists", async () => {
    await expectAsync(store.create(testUser)).toBeRejectedWithError(
      "User fanning already exists."
    );
  });
  it("authentication method should return authenticated user", async () => {
    const user = await store.authentication(
      testUser.username,
      testUser.password!
    );
    expect(user?.username).toEqual(testUser.username);
  });
  it("delete method should return deleted user", async () => {
    const user = await store.delete(newUserId);
    expect(user.id).toEqual(newUserId);
  });
});
