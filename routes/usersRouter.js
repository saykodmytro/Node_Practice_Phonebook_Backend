import express from "express";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
} from "../controllers/usersControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { authentificate } from "../middlewares/auth.js";
import { storage } from "../middlewares/upload.js";
import { loginSchemas, registerSchemas } from "../schemas/userSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerSchemas), register);

usersRouter.post("/login", validateBody(loginSchemas), login);

usersRouter.post("/logout", authentificate, logout);

usersRouter.get("/current", authentificate, getCurrent);

usersRouter.patch(
  "/avatar",
  authentificate,
  storage.single("avatar"),
  updateAvatar
);

export default usersRouter;
