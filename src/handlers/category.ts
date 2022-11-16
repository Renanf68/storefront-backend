import express, { Request, Response } from "express";
import { verifyAuthToken } from "./verifyAuthToken";
import { CategoryStore } from "../models/category";

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  try {
    const categories = await store.index();
    res.json(categories);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const category = await store.show(req.params.id);
    if (!category) {
      res.send("Category not found");
    }
    res.json(category);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const newCategory = await store.create({
      name: req.body.name,
    });
    res.json(newCategory);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const updated = await store.update({
      name: req.body.name,
      id: req.params.id,
    });
    res.json(updated);
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

const categoryRoutes = (app: express.Application) => {
  app.get("/categories", index);
  app.get("/categories/:id", show);
  app.post("/categories", verifyAuthToken, create);
  app.put("/categories/:id", verifyAuthToken, update);
  app.delete("/categories/:id", verifyAuthToken, destroy);
};

export default categoryRoutes;
