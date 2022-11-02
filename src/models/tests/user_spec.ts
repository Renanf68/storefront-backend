import { User, UserStore } from "../user";

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
});
