import { DashboardQueries } from "../../services/dashboard";
import {
  clearDashboardTest,
  setupDashboardTest,
  SetupDashboardTestResult,
} from "../utils";

const dashboard = new DashboardQueries();

let setup: SetupDashboardTestResult;

fdescribe("Dashboard Models", () => {
  beforeAll(async () => {
    setup = await setupDashboardTest();
  });
  it("should have a productsByCategoryId method", () => {
    expect(dashboard.productsByCategoryId).toBeDefined();
  });
  it("should have a productsInOrder method", () => {
    expect(dashboard.productsInOrder).toBeDefined();
  });
  it("should have an topFivePopularProducts method", () => {
    expect(dashboard.topFivePopularProducts).toBeDefined();
  });
  it("should have an userOrdersByStatus method", () => {
    expect(dashboard.userOrdersByStatus).toBeDefined();
  });
  it("productsByCategoryId method should return correct products", async () => {
    const response = await dashboard.productsByCategoryId(setup.category1Id);
    expect(response.length).toEqual(4);
  });
  it("productsInOrder method should return correct products", async () => {
    const response = await dashboard.productsInOrder(setup.orders[0]);
    expect(response.length).toEqual(4);
  });
  it("topFivePopularProducts method should return correct products", async () => {
    const response = await dashboard.topFivePopularProducts();
    const productIds = response.map((product) => product.id);
    expect(productIds).toEqual([
      setup.products[5],
      setup.products[3],
      setup.products[4],
      setup.products[1],
      setup.products[0],
    ]);
  });
  it("userOrdersByStatus method should return correct order", async () => {
    const response = await dashboard.userOrdersByStatus(
      setup.userId,
      "complete"
    );
    expect(response[0].id).toEqual(setup.orders[2]);
  });
  afterAll(async () => {
    await clearDashboardTest(setup);
  });
});
