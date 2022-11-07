import { Category, User } from "../types";

export const testUser = {
  username: "fanning",
  first_name: "Mick",
  last_name: "Fanning",
  password: "AsasdG30f",
} as User;

export const testCategory = {
  name: "surf",
} as Category;

export const getUserTokenFromResponse = (text: string) => {
  return `Bearer ${text.replace(/['"]+/g, "")}`;
};
