// import contactsService from "../services/contactsServices.js";

import { Contact } from "../db/models/Contact.js";

export const getAllContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner });
    res.json(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  // const { id } = req.params;
  // const { contactId } = req.user.id;

  try {
    // const result = await Contact.findOneAndDelete({
    //   _id: id,
    //   owner: contactId,
    // });
    // if (result === null) {
    //   throw HttpError(404, "Contact Not Found");
    // }
    res.status(201).send({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {};
