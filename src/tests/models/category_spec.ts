import { CategoryStore } from "../../models/category";
import { testCategory } from "../helpers";

const store = new CategoryStore();

let newCategoryId: string;

describe("Category Models", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have an show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have an create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have an update method", () => {
    expect(store.update).toBeDefined();
  });
  it("should have an delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("index method should return a list of categories", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  it("create method should return created category", async () => {
    const category = await store.create(testCategory);
    newCategoryId = category.id ?? "not_found";
    expect(category.name).toEqual(testCategory.name);
  });
  it("show method should return correct category", async () => {
    const category = await store.show(newCategoryId);
    expect(category.id).toEqual(newCategoryId);
  });
  it("update method should return updated category", async () => {
    const category = await store.update({ name: "skate", id: newCategoryId });
    expect(category.name).toEqual("skate");
  });
  it("delete method should return deleted category", async () => {
    const category = await store.delete(newCategoryId);
    expect(category.id).toEqual(newCategoryId);
  });
});
