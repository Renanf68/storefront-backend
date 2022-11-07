import { CategoryStore } from "../../models/category";
import { ProductStore } from "../../models/product";
import { testCategory, testProduct } from "../helpers";

const categorystore = new CategoryStore();
const store = new ProductStore();

let newCategoryId: string;
let newProductId: string;

describe("Product Models", () => {
  beforeAll(async () => {
    const result = await categorystore.create(testCategory);
    newCategoryId = result.id!;
  });
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
  it("create method should return created product", async () => {
    const product = await store.create({
      ...testProduct,
      category_id: newCategoryId,
    });
    newProductId = product.id ?? "not_found";
    expect(product.name).toEqual(testProduct.name);
  });
  it("show method should return correct product", async () => {
    const product = await store.show(newProductId);
    expect(product.id).toEqual(newProductId);
  });
  it("update method should return updated product", async () => {
    const product = await store.update({
      id: newProductId,
      name: testProduct.name,
      price: 1200,
      category_id: newCategoryId,
    });
    expect(product.price).toEqual(1200);
  });
  it("delete method should return deleted product", async () => {
    const product = await store.delete(newProductId);
    expect(product.id).toEqual(newProductId);
  });
});
