import { CategoryStore } from "../../models/category";
import { testCategory } from "../helpers";

const store = new CategoryStore();

let newCategoryId: string;

fdescribe("Category Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have an show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(store.create).toBeDefined();
  });
  it("index method should return a list of categories", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  it("create method should return created category", async () => {
    const result = await store.create(testCategory);
    newCategoryId = result.id ?? "not_found";
    expect(result.name).toEqual(testCategory.name);
  });
  it("update method should return updated category", async () => {
    const result = await store.update({ name: "skate", id: newCategoryId });
    expect(result.name).toEqual("skate");
  });
  it("delete method should return deleted category", async () => {
    const user = await store.delete(newCategoryId);
    expect(user.id).toEqual(newCategoryId);
  });
});
