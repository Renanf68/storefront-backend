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

describe("Product Handlers", () => {
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
  }),
    it("post /products endpoint should return status 200", async () => {
      const response = await request
        .post("/products")
        .send({ ...testProduct, category_id: newCategoryId })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("authorization", userToken);
      newProductId = response.body.id;
      expect(response.status).toBe(200);
    });
  it("get /products endpoint should return a list of products", async () => {
    const response = await request.get("/products");
    expect(response.body.length).toEqual(1);
  });
  it("get /products/:id endpoint should return correct product", async () => {
    const response = await request.get(`/products/${newProductId}`);
    expect(response.body.name).toEqual(testProduct.name);
  });
  it("put /products/:id endpoint should return updated product", async () => {
    const response = await request
      .put(`/products/${newProductId}`)
      .send({
        ...testProduct,
        price: 1200,
        category_id: newCategoryId,
      })
      .set("authorization", userToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.body.price).toEqual(1200);
  });
  it("delete /products/:id endpoint should return deleted product", async () => {
    const response = await request
      .delete(`/products/${newProductId}`)
      .set("authorization", userToken);
    expect(response.body.id).toEqual(newProductId);
  });
  afterAll(async () => {
    await request.delete(`/users/${newUserId}`).set("authorization", userToken);
    await request
      .delete(`/categories/${newCategoryId}`)
      .set("authorization", userToken);
  });
});
