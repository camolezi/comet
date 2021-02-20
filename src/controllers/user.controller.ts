import { Router, Request, Response, NextFunction } from "express";
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
  req: Request,
  res: Response,
  error: NextFunction
) =>
  EitherAsync.liftEither(validateUserJson(req.body))
    .map((user) => userRepository.saveNewUser(user))
    .ifRight(respondWithJson(res)(StatusCodes.CREATED))
    .ifLeft(error)
    .run();

const validateUserJson = (jsonBody: unknown) => {
  const userCodec = Codec.interface({
    name: string,
    email: string,
  });
  return userCodec.decode(jsonBody);
};

const respondWithJson = (res: Response) => (status: StatusCodes) => (
  json: unknown
) => {
  res.status(status);
  res.json(json);
};

export default UserController;
