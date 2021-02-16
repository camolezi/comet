import User, { UserSchema } from "../domain/models/user";
import mongoose, { Types } from "mongoose";

class UserRepository {
  private readonly userModel: mongoose.Model<mongoose.Document>;

  constructor(conn: mongoose.Connection) {
    this.userModel = conn.model("users", UserSchema);
  }

  async getUserById(id: Types.ObjectId): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean();
  }

  async saveNewUser(user: User): Promise<User> {
    const userDoc = await this.userModel.create(user);
    const userObj = userDoc.toObject();
    return { ...userObj, _id: userObj._id.toString() } as User;
  }
}

export default UserRepository;
