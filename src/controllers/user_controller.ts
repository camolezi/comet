import express from "express";

const UserController = express.Router();

UserController.post("/", (req, res) => {
  res.status(201);
  res.json(req.body);
});

export default UserController;
