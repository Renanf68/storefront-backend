import Client from "../database";
import { Category } from "../types";

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      const sql = "SELECT * FROM categories";
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get categories: ${err}`);
    }
  }
  async show(id: string): Promise<Category> {
    try {
      const sql = "SELECT * FROM categories WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to show category ${id}: ${err}`);
    }
  }
  async create(c: Category): Promise<Category> {
    try {
      const categorySql = "SELECT * FROM categories WHERE name=($1)";
      const conn = await Client.connect();
      const currentCategories = await conn.query(categorySql, [c.name]);
      conn.release();
      if (currentCategories.rows.length) {
        throw new Error(`Category ${c.name} already exists.`);
      }
    } catch (err) {
      throw new Error(
        `Unable to check if category ${c.name} already exists: ${err}`
      );
    }
    try {
      const sql = "INSERT INTO categories (name) VALUES($1) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [c.name]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Could not add new category ${c.name}: ${err}`);
    }
  }
  async update(c: Category): Promise<Category> {
    try {
      const sql = "UPDATE categories SET name=($1) WHERE id=($2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [c.name, c.id]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Could not update category ${c.name}: ${err}`);
    }
  }
  async delete(id: string): Promise<{ id: string }> {
    try {
      const sql = "DELETE FROM categories WHERE id=($1) RETURNING id";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const category = result.rows[0];
      return category;
    } catch (err) {
      throw new Error(`Could not delete category ${id}: ${err}`);
    }
  }
}
