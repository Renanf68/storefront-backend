import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import { verifyAuthToken } from "./verifyAuthToken";

const dashboard = new DashboardQueries();

const productsByCategoryId = async (req: Request, res: Response) => {
  const products = await dashboard.productsByCategoryId(req.params.id);
  res.json(products);
};

const productsInOrder = async (req: Request, res: Response) => {
  const products = await dashboard.productsInOrder(req.params.id);
  res.json(products);
};

const topFivePopularProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.topFivePopularProducts();
  res.json(products);
};

const userOrdersByStatus = async (req: Request, res: Response) => {
  const products = await dashboard.userOrdersByStatus(
    req.body.user_id,
    req.body.order_status
  );
  res.json(products);
};

const dashboardRoutes = (app: express.Application) => {
  app.get("/products_by_category_id/:id", productsByCategoryId);
  app.get("/top-five-popular-products", topFivePopularProducts);
  app.get("/products_in_order/:id", verifyAuthToken, productsInOrder);
  app.get("/user_orders_by_status/:id", verifyAuthToken, userOrdersByStatus);
};

export default dashboardRoutes;
