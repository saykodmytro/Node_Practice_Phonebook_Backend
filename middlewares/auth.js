import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../db/models/User.js";

const { SECRET_KEY } = process.env;

export const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized 1"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("id: ", id);
    const user = await User.findById(id);
    console.log("user: ", user);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized 2"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
