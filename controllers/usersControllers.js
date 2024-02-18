import { User } from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "User already exist");
    }

    const avatar = gravatar.url(email);

    const newUser = new User({ avatar, ...req.body });
    await newUser.hashPassword();
    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY);

    await User.findOneAndUpdate(newUser._id, { token });
    res.status(201).json({
      token,
      user: {
        name,
        email,
        avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};
