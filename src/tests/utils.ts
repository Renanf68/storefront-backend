import { CategoryStore } from "../models/category";
import { OrderStore } from "./../models/order";
import { ProductStore } from "./../models/product";
import { UserStore } from "./../models/user";
import { testUser } from "./helpers";

const userStore = new UserStore();
const categoryStore = new CategoryStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const handleProducts = async (category1Id: string, category2Id: string) => {
  const product1 = await productStore.create({
    name: "surfboard",
    price: 1200,
    category_id: category1Id,
  });
  const product2 = await productStore.create({
    name: "leash",
    price: 200,
    category_id: category1Id,
  });
  const product3 = await productStore.create({
    name: "tailpad",
    price: 130,
    category_id: category1Id,
  });
  const product4 = await productStore.create({
    name: "sunscreen",
    price: 50,
    category_id: category1Id,
  });
  const product5 = await productStore.create({
    name: "skateboard",
    price: 400,
    category_id: category2Id,
  });
  const product6 = await productStore.create({
    name: "skateboard wheel",
    price: 100,
    category_id: category2Id,
  });
  return [
    product1.id!,
    product2.id!,
    product3.id!,
    product4.id!,
    product5.id!,
    product6.id!,
  ];
};

const handleOrders = async (userId: string, productsIds: string[]) => {
  const order1 = await orderStore.create({ user_id: userId, status: "active" });
  const order2 = await orderStore.create({ user_id: userId, status: "active" });
  const order3 = await orderStore.create({
    user_id: userId,
    status: "complete",
  });
  await orderStore.addProduct(order1.id!, productsIds[0], 10);
  await orderStore.addProduct(order1.id!, productsIds[1], 20);
  await orderStore.addProduct(order1.id!, productsIds[2], 4);
  await orderStore.addProduct(order1.id!, productsIds[3], 50);
  await orderStore.addProduct(order2.id!, productsIds[4], 30);
  await orderStore.addProduct(order2.id!, productsIds[5], 100);
  return [order1.id!, order2.id!, order3.id!];
};

export interface SetupDashboardTestResult {
  userId: string;
  category1Id: string;
  category2Id: string;
  products: string[];
  orders: string[];
}

export const setupDashboardTest =
  async (): Promise<SetupDashboardTestResult> => {
    const user = await userStore.create(testUser);
    const category1 = await categoryStore.create({ name: "surf" });
    const category2 = await categoryStore.create({ name: "skate" });
    const products = await handleProducts(category1.id!, category2.id!);
    const orders = await handleOrders(user.id!, products);
    return {
      userId: user.id!,
      category1Id: category1.id!,
      category2Id: category2.id!,
      products,
      orders,
    };
  };

export const clearDashboardTest = async (setup: SetupDashboardTestResult) => {
  try {
    await setup.orders.reduce(async (promise, orderId) => {
      await promise;
      await orderStore.delete(orderId);
    }, Promise.resolve());
    await setup.products.reduce(async (promise, productId) => {
      await promise;
      await productStore.delete(productId);
    }, Promise.resolve());
    await categoryStore.delete(setup.category1Id);
    await categoryStore.delete(setup.category2Id);
    await userStore.delete(setup.userId);
  } catch (error) {
    console.log(error);
  }
};
