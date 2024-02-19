import express from "express";
import {
  getAllContacts,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { authentificate } from "../middlewares/auth.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import { validateBody } from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authentificate, getAllContacts);

contactsRouter.post(
  "/",
  authentificate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.delete("/:contactId", deleteContact);

contactsRouter.patch("/:contactId", updateContact);

export default contactsRouter;
