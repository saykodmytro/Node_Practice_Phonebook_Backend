import express from "express";
import { login, register } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchemas, registerSchemas } from "../schemas/userSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerSchemas), register);

usersRouter.post("/login", validateBody(loginSchemas), login);

usersRouter.post("/logout");

usersRouter.get("/current");

export default usersRouter;
