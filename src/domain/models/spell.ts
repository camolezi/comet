import { Schema } from "mongoose";

export default interface Spell {
  _id?: string;
  name: string;
}

export const SpellSchema = new Schema({
  name: { type: String, required: true },
});
