import express, { Request, Response } from "express";
import { verifyAuthToken } from "./verifyAuthToken";
import { ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  if (!product) {
    res.send("Product not found");
  }
  res.json(product);
};
const create = async (req: Request, res: Response) => {
  try {
    const newProduct = await store.create({
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    });
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const updated = await store.update({
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
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

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.put("/products/:id", verifyAuthToken, update);
  app.delete("/products/:id", verifyAuthToken, destroy);
};

export default productRoutes;
