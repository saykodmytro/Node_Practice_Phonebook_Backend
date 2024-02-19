import express from "express";
import {
  getCurrent,
  login,
  logout,
  register,
} from "../controllers/usersControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { authentificate } from "../middlewares/auth.js";
import { loginSchemas, registerSchemas } from "../schemas/userSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerSchemas), register);

usersRouter.post("/login", validateBody(loginSchemas), login);

usersRouter.post("/logout", authentificate, logout);

usersRouter.get("/current", authentificate, getCurrent);

export default usersRouter;
