import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../server";
import { testUser, testCategory, getUserTokenFromResponse } from "../helpers";

const request = supertest(app);

let newCategoryId: string;
let newUserId: string;
let userToken: string;

fdescribe("Category Handlers", () => {
  beforeAll(async () => {
    const response = await request
      .post("/users")
      .send(testUser)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    newUserId = response.body.id;
    userToken = getUserTokenFromResponse(response.body.token);
  }),
    it("post /categories endpoint should return status 200", async () => {
      console.log("userToken", userToken);
      const response = await request
        .post("/categories")
        .send(testCategory)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("authorization", userToken);
      console.log("response", response.error);
      newCategoryId = response.body.id;
      expect(response.status).toBe(200);
    });
  it("get /categories endpoint should return a list of categories", async () => {
    const response = await request.get("/categories");
    expect(response.body.length).toEqual(1);
  });
  it("get /categories/:id endpoint should return correct category", async () => {
    const response = await request.get(`/categories/${newCategoryId}`);
    expect(response.body.name).toEqual(testCategory.name);
  });
  it("put /categories/:id endpoint should return updated category name", async () => {
    const response = await request
      .put(`/categories/${newCategoryId}`)
      .send({ name: "skate" })
      .set("authorization", userToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.body.name).toEqual("skate");
  });
  it("delete /categories/:id endpoint should return deleted category id", async () => {
    const response = await request
      .delete(`/categories/${newCategoryId}`)
      .set("authorization", userToken);
    expect(response.body.id).toEqual(newCategoryId);
  });
  afterAll(async () => {
    await request.delete(`/users/${newUserId}`).set("authorization", userToken);
  });
});
