import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../server";
import { getUserTokenFromResponse, testUser } from "../helpers";

const request = supertest(app);

let newUserId: string;
let userToken: string;

describe("User Handlers", () => {
  it("post /users endpoint should return status 200", async () => {
    const response = await request
      .post("/users")
      .send(testUser)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    console.log(response.body);
    newUserId = response.body.id;
    expect(response.status).toBe(200);
  });
  it("post /users/auth endpoint should return correct token", async () => {
    const response = await request
      .post("/users/auth")
      .send({ username: testUser.username, password: testUser.password })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    userToken = getUserTokenFromResponse(response.text);
    const decoded = jwt.decode(response.text.replace(/['"]+/g, ""));
    const username = decoded
      ? (decoded as jwt.JwtPayload).user?.username
      : null;
    expect(username).toEqual(testUser.username);
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
      .get(`/users/${newUserId}`)
      .set("authorization", userToken);
    expect(response.body.username).toEqual(testUser.username);
  });
  it("delete /users/:id endpoint should return deleted user id", async () => {
    const response = await request
      .delete(`/users/${newUserId}`)
      .set("authorization", userToken);
    expect(response.body.id).toEqual(newUserId);
  });
});
