import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default model<UserInterface>("User", UserSchema, "users");
