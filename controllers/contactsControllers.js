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

export const deleteContact = (req, res) => {};

export const updateContact = (req, res) => {};
