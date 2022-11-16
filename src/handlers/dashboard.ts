import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import { verifyAuthToken } from "./verifyAuthToken";

const dashboard = new DashboardQueries();

const productsByCategoryId = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.productsByCategoryId(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productsInOrder = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrder(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const topFivePopularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.topFivePopularProducts();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const userOrdersByStatus = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.userOrdersByStatus(
      req.params.id,
      req.body.order_status
    );
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get("/products_by_category_id/:id", productsByCategoryId);
  app.get("/top-five-popular-products", topFivePopularProducts);
  app.get("/products_in_order/:id", verifyAuthToken, productsInOrder);
  app.get("/users/:id/orders", verifyAuthToken, userOrdersByStatus);
};

export default dashboardRoutes;
