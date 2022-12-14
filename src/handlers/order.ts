import express, { Request, Response } from "express";
import { OrderStore } from "../models/order";
import { Order, OrderStatus } from "../types";
import { verifyAuthToken } from "./verifyAuthToken";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.userId,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const updateStatus = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.params.id;
    const status: OrderStatus = req.body.status;
    const newOrder = await store.updateStatus(orderId, status);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    const relationship = await store.addProduct(orderId, productId, quantity);
    res.json(relationship);
  } catch (error) {
    const message = (error as Error).message;
    res.status(400);
    res.json({ error: message });
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

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.put("/orders/:id", verifyAuthToken, updateStatus);
  app.delete("/orders/:id", verifyAuthToken, destroy);
  // add product
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

export default orderRoutes;
