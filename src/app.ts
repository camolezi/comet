import express from "express";
import UserController from "./controllers/user_controller";

const app = express();

app.use(express.json());

app.get("/version", (req, res) => {
  res.json({ version: "1.0" });
});

app.use("/users", UserController);

export default app;
