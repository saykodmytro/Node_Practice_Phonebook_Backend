import { User } from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";

const { SECRET_KEY } = process.env;

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong 1");
    }

    const passwordCorrect = await user.comparePassword(password);
    if (!passwordCorrect) {
      throw HttpError(401, "Email or password is wrong 2");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = (req, res) => {
  const { email, name, avatar } = req.user;
  res.status(200).json({ email, name, avatar });
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { file } = req;

    if (!file) {
      throw HttpError(400, "You need file");
    }

    const { path: tempUpload, originalname } = file;
    const newName = `${_id}${originalname}`;
    const resultUpload = path.resolve("public", "avatars", newName);
    await fs.rename(tempUpload, resultUpload);
    const avatar = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatar }, { new: true });
    res.status(200).json({ avatar });
  } catch (error) {
    next(error);
  }
};
