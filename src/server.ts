import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./handlers/user";
import categoryRoutes from "./handlers/category";
import productRoutes from "./handlers/product";
import orderRoutes from "./handlers/order";
import dashboardRoutes from "./handlers/dashboard";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://otheralloweddomain.com",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

userRoutes(app);
categoryRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
