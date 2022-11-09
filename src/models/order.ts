import Client from "../database";
import { Order, OrderProducts, OrderStatus } from "../types";

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get orders ${error}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}: ${err}`);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.status, o.user_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order to user ${o.user_id}: ${err}`);
    }
  }
  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    try {
      const sql = "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderId, status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not update order ${orderId}. Error: ${err}`);
    }
  }
  async addProduct(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<OrderProducts> {
    try {
      const orderSql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const orderQueryResult = await conn.query(orderSql, [orderId]);
      const order = orderQueryResult.rows[0] as Order;
      if (order.status !== "active") {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const relationship = result.rows[0];
      conn.release();
      return relationship;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const relationshipSql = "DELETE FROM order_products WHERE order_id=($1)";
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const conn = await Client.connect();
      await conn.query(relationshipSql, [id]);
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}: ${err}`);
    }
  }
}
