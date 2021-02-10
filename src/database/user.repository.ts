import User, { UserSchema } from "../domain/models/user";
import mongoose from "mongoose";
import { ObjectID } from "mongodb";

class UserRepository {
  private readonly userModel: mongoose.Model<mongoose.Document>;

  constructor(conn: mongoose.Connection) {
    this.userModel = conn.model("users", UserSchema);
  }

  async getUserById(id: ObjectID): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  async saveNewUser(user: User): Promise<User> {
    return (await this.userModel.create(user)).toObject() as User;
  }
}

export default UserRepository;
