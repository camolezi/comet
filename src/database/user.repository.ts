import UserSchema from "../domain/models/user";
import mongoose from "mongoose";

class UserRepository {
  private readonly userModel: mongoose.Model<mongoose.Document>;

  constructor(conn: mongoose.Connection) {
    this.userModel = conn.model("users", UserSchema);
  }

  async getUserById(id: any): Promise<any> {
    return (await this.userModel.findById(id).exec()).toObject();
  }

  async saveNewUser(user: any): Promise<any> {
    return this.userModel.create(user);
  }
}

export default UserRepository;
