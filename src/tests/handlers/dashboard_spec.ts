import supertest from "supertest";
import app from "../../server";
import { Product } from "../../types";
import { getUserTokenFromResponse, testUser } from "../helpers";
import {
  clearDashboardTest,
  setupDashboardTest,
  SetupDashboardTestResult,
} from "../utils";

const request = supertest(app);

let setup: SetupDashboardTestResult;
let userToken: string;

describe("Order Handlers", () => {
  beforeAll(async () => {
    setup = await setupDashboardTest();
    const response = await request
      .post("/users/auth")
      .send({ username: testUser.username, password: testUser.password })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    userToken = getUserTokenFromResponse(response.text);
  }),
    it("get /products_by_category_id/:id endpoint should return correct products", async () => {
      const response = await request.get(
        `/products_by_category_id/${setup.category2Id}`
      );
      expect(response.body.length).toEqual(2);
    });
  it("get /top-five-popular-products endpoint should return correct products", async () => {
    const response = await request.get("/top-five-popular-products");
    const productsIds = response.body.map((product: Product) => product.id);
    expect(productsIds).toEqual([
      setup.products[5],
      setup.products[3],
      setup.products[4],
      setup.products[1],
      setup.products[0],
    ]);
  });
  it("get /products_in_order/:id endpoint should return correct products", async () => {
    const response = await request
      .get(`/products_in_order/${setup.orders[1]}`)
      .set("authorization", userToken);
    expect(response.body.length).toEqual(2);
  });
  it("get /users/:id/orders endpoint should return correct orders", async () => {
    const response = await request
      .get(`/users/${setup.userId}/orders`)
      .send({ order_status: "active" })
      .set("authorization", userToken);
    expect(response.body.length).toEqual(2);
  });
  afterAll(async () => {
    await clearDashboardTest(setup);
  });
});
