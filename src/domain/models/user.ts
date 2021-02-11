import { Schema } from "mongoose";
import Task from "./task";

interface User {
  _id?: string;
  name: string;
  email: string;
  tasks: Array<Task>;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tasks: {
    type: [
      {
        name: { type: String, required: true },
        completed: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
});

export default User;
