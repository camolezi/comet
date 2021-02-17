import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepository from "../persistence/user.repository";

import { Codec, EitherAsync, string } from "purify-ts";

function UserController(userRepository: UserRepository): Router {
  const userRouter = Router();

  userRouter.post("/", UserPostHandler(userRepository));

  userRouter.get("/", async (req, res) => {
    res.status(StatusCodes.OK);

    const user = await userRepository.getUserByEmail(req.body.email);
    res.json(user);
  });

  return userRouter;
}

const UserPostHandler = (userRepository: UserRepository) => (
  req,
  res,
  next
) => {
  res.status(StatusCodes.CREATED);

  const saveNewUser = (receivedUser) =>
    userRepository.saveNewUser(receivedUser);

  const respondWithJson = (createdUser) => res.json(createdUser);

  const callErrorMiddleware = (e) => next(e);

  const userCodec = Codec.interface({
    name: string,
    email: string,
  });
  const receivedUser = userCodec.decode(req.body);

  EitherAsync.liftEither(receivedUser)
    .map(saveNewUser)
    .ifRight(respondWithJson)
    .ifLeft(callErrorMiddleware)
    .run();
};

export default UserController;
