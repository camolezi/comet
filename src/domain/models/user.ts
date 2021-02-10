import { Schema } from "mongoose";

interface User {
  _id?: string;
  name: string;
  email: string;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default User;
