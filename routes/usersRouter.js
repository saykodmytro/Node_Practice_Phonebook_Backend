import express from "express";
import { register } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchemas } from "../schemas/userSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerSchemas), register);

usersRouter.post("/login");

usersRouter.post("/logout");

usersRouter.get("/current");

export default usersRouter;
