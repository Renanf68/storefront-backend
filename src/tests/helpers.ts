import { Category, Product, User } from "../types";

export const testUser = {
  username: "fanning",
  first_name: "Mick",
  last_name: "Fanning",
  password: "AsasdG30f",
} as User;

export const testCategory = {
  name: "surf",
} as Category;

export const testProduct = {
  name: "surfboard",
  price: 1000,
} as Product;

export const getUserTokenFromResponse = (text: string) => {
  return `Bearer ${text.replace(/['"]+/g, "")}`;
};
