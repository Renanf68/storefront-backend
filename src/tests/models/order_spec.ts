import { CategoryStore } from "../../models/category";
import { OrderStore } from "../../models/order";
import { ProductStore } from "../../models/product";
import { UserStore } from "../../models/user";
import { OrderProducts } from "../../types";
import { testCategory, testProduct, testUser } from "../helpers";

const userStore = new UserStore();
const categoryStore = new CategoryStore();
const productStore = new ProductStore();
const store = new OrderStore();

let newUserId: string;
let newCategoryId: string;
let newProductId: string;
let newOrderId: string;

fdescribe("Order Models", () => {
  beforeAll(async () => {
    const user = await userStore.create(testUser);
    newUserId = user.id!;
    const result = await categoryStore.create(testCategory);
    newCategoryId = result.id!;
    const product = await productStore.create({
      ...testProduct,
      category_id: newCategoryId,
    });
    newProductId = product.id!;
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
  it("should have an updateStatus method", () => {
    expect(store.updateStatus).toBeDefined();
  });
  it("should have an delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  it("create method should return created order", async () => {
    const order = await store.create({
      user_id: newUserId,
      status: "active",
    });
    newOrderId = order.id ?? "not_found";
    expect(order.status).toEqual("active");
  });
  it("show method should return correct order", async () => {
    const order = await store.show(newOrderId);
    expect(order.id).toEqual(newOrderId);
  });
  it("addProduct method should return correct relationship", async () => {
    const relationship = await store.addProduct(newOrderId, newProductId, 6);
    const newRelationshipId = relationship.id;
    expect(relationship).toEqual({
      id: newRelationshipId,
      quantity: 6,
      order_id: newOrderId.toString(),
      product_id: newProductId.toString(),
    } as OrderProducts);
  });
  it("updateStatus method should return updated order", async () => {
    const order = await store.updateStatus(newOrderId, "complete");
    expect(order.status).toEqual("complete");
  });
  it("delete method should return deleted order", async () => {
    const order = await store.delete(newOrderId);
    expect(order.id).toEqual(newOrderId);
  });
});
