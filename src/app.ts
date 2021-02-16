import express from "express";
import SpellController from "./controllers/spell.controller";
import UserController from "./controllers/user.controller";
import { startDBConnection } from "./persistence/db.connection";
import SpellRepository from "./persistence/spell.repository";
import UserRepository from "./persistence/user.repository";

const app = express();

app.use(express.json());

app.get("/version", (req, res) => {
  res.json({ version: "1.0" });
});

const userConn = startDBConnection();
const userRepository = new UserRepository(userConn);

const spellConn = startDBConnection();
const spellRepository = new SpellRepository(spellConn);

app.use("/users", UserController(userRepository));
app.use("/spells", SpellController(spellRepository));

export default app;
