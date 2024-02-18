import Joi from "joi";

export const registerSchemas = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
});
