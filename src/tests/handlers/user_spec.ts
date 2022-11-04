import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";

const request = supertest(app);

const testUser = {
  username: "fanning",
  first_name: "Mick",
  last_name: "Fanning",
  password: "AsasdG30f",
} as User;

let userToken: string;

fdescribe("User Handler", () => {
  it("post /users/create endpoint should return status 200", async () => {
    const response = await request
      .post("/users/create")
      .send(testUser)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
  it("post /users/auth endpoint should return a token", async () => {
    const response = await request
      .post("/users/auth")
      .send({ username: testUser.username, password: testUser.password })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    userToken = `Bearer ${response.text.replace(/['"]+/g, "")}`;
    expect(response.text).toMatch("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
  });
  it("get /users endpoint without token should return 401", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });
  it("get /users endpoint should return a list of users", async () => {
    const response = await request
      .get("/users")
      .set("authorization", userToken);
    expect(response.body.length).toEqual(1);
  });
  it("get /users/:id endpoint should return correct user", async () => {
    const response = await request
      .get("/users/1")
      .set("authorization", userToken);
    expect(response.body.username).toEqual(testUser.username);
  });
  it("delete /users/:id endpoint should return deleted user id", async () => {
    const response = await request
      .delete("/users/1")
      .set("authorization", userToken);
    expect(response.body.id).toEqual(1);
  });
});
