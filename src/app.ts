import express from "express";
import UserController from "./controllers/user_controller";
import { startDBConnection } from "./database/db.connection";
import UserRepository from "./database/user.repository";

const app = express();

app.use(express.json());

app.get("/version", (req, res) => {
  res.json({ version: "1.0" });
});

const userConn = startDBConnection();
const userRepository = new UserRepository(userConn);

app.use("/users", UserController(userRepository));

export default app;
