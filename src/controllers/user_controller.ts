import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepository from "../database/user.repository";

function UserController(userRepository: UserRepository): Router {
  const userRouter = Router();

  userRouter.post("/", async (req, res) => {
    res.status(StatusCodes.CREATED);

    const createdUser = await userRepository.saveNewUser(req.body);
    res.json(createdUser.toJSON());
  });

  return userRouter;
}

export default UserController;
