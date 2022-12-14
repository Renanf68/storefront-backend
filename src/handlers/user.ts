import express, { Request, Response } from "express";
import { UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { verifyAuthToken } from "./verifyAuthToken";
import { User } from "../types";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    if (!user) {
      res.send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newUser = (await store.create(user)) as User;
    const token = jwt.sign(
      { user: { id: newUser.id, username: newUser.username } },
      process.env.TOKEN_SECRET!
    );
    res.json({ id: newUser.id, token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const auth = async (req: Request, res: Response) => {
  try {
    const user = await store.authentication(
      req.body.username,
      req.body.password
    );
    let token: string | null = null;
    if (user) {
      token = jwt.sign(
        { user: { id: user.id, username: user.username } },
        process.env.TOKEN_SECRET!
      );
    }
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/users/auth", auth);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default userRoutes;
