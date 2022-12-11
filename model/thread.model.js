import { Schema, model } from "mongoose";

const threadSchema = new Schema({
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true},
  likes: { type: Number, default: 0 },
  banner: {},
  tags: [{ type: String, enum: [
    "Footbal", "Home", "Phone", 
    "GOAT", "Seleção"]}],
  createdAt: { type: Date, default: Date.now() },
  creator: { type: Types.ObjectId, ref: "User" }
});

export const UserModel = model("User", threadSchema);