import Client from "../database";
import { Order, OrderItem, OrderStatus, Product } from "../types";

export class DashboardQueries {
  // product queries
  async productsByCategoryId(categoryId: string): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products WHERE category_id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [categoryId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products to category ${categoryId}: ${err}`);
    }
  }
  async productsInOrder(orderId: string): Promise<OrderItem[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT p.id, p.name, p.price, r.quantity FROM products p INNER JOIN order_products r ON r.order_id = ($1) AND r.product_id = p.id";
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products to order ${orderId}: ${err}`);
    }
  }
  async topFivePopularProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT p.* FROM order_products op JOIN products p ON p.id=op.product_id GROUP BY p.id ORDER BY Sum(quantity) DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get 5 most popular products: ${err}`);
    }
  }
  // order queries
  async userOrdersByStatus(
    userId: string,
    status: OrderStatus
  ): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [userId, status]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get active orders to user ${userId}: ${err}`);
    }
  }
}
