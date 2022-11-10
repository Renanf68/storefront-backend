import supertest from "supertest";
import app from "../../server";
import {
  testUser,
  testCategory,
  getUserTokenFromResponse,
  testProduct,
} from "../helpers";

const request = supertest(app);

let newUserId: string;
let userToken: string;
let newCategoryId: string;
let newProductId: string;
let newOrderId: string;

describe("Order Handlers", () => {
  beforeAll(async () => {
    const newUser = await request
      .post("/users")
      .send(testUser)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    newUserId = newUser.body.id;
    userToken = getUserTokenFromResponse(newUser.body.token);
    const newCategory = await request
      .post("/categories")
      .send(testCategory)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    newCategoryId = newCategory.body.id;
    const newProduct = await request
      .post("/products")
      .send({ ...testProduct, category_id: newCategoryId })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("authorization", userToken);
    newProductId = newProduct.body.id;
  }),
    it("post /orders endpoint should return status 200", async () => {
      const response = await request
        .post("/orders")
        .send({ user_id: newUserId, status: "active" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("authorization", userToken);
      newOrderId = response.body.id;
      expect(response.status).toBe(200);
    });
  it("get /orders endpoint should return a list of orders", async () => {
    const response = await request
      .get("/orders")
      .set("authorization", userToken);
    expect(response.body.length).toEqual(1);
  });
  it("get /orders/:id endpoint should return correct order", async () => {
    const response = await request
      .get(`/orders/${newOrderId}`)
      .set("authorization", userToken);
    expect(response.body.id).toEqual(newOrderId);
  });
  it("post /orders/:id/products endpoint should return created relationship", async () => {
    const response = await request
      .post(`/orders/${newOrderId}/products`)
      .send({
        productId: newProductId,
        quantity: 4,
      })
      .set("authorization", userToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.body.order_id).toEqual(newOrderId.toString());
  });
  it("put /orders/:id endpoint should return updated order", async () => {
    const response = await request
      .put(`/orders/${newOrderId}`)
      .send({
        status: "complete",
      })
      .set("authorization", userToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.body.status).toEqual("complete");
  });
  it("delete /orders/:id endpoint should return deleted order", async () => {
    const response = await request
      .delete(`/orders/${newOrderId}`)
      .set("authorization", userToken);
    expect(response.body.id).toEqual(newOrderId);
  });
  afterAll(async () => {
    await request.delete(`/users/${newUserId}`).set("authorization", userToken);
    await request
      .delete(`/categories/${newCategoryId}`)
      .set("authorization", userToken);
    await request
      .delete(`/products/${newProductId}`)
      .set("authorization", userToken);
  });
});
