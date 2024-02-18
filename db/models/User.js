import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false }
);

userShema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userShema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = model("user", userShema);
