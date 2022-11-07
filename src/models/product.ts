import Client from "../database";
import { Product } from "../types";

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products ORDER BY price ASC";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category_id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
  async update(p: Product): Promise<Product> {
    try {
      const sql =
        "UPDATE products SET name=($2), price=($3), category_id=($4) WHERE id=($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        p.id,
        p.name,
        p.price,
        p.category_id,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not update product ${p.name}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
