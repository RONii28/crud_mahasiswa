const Joi = require("joi");

module.exports = Joi.object({
    nim: Joi.number()
        .required()
        .integer()
        .messages({
            "any.required": "username cannot be empty",
            "number.base": "name must be a integer"
        }),
    name: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "name cannot be empty",
            "string.base": "name must be a string"
        }),
    no_hp: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "no_hp cannot be empty",
            "string.base": "no_hp must be a string",
        }),

    address : Joi.string()
      .required()
      .trim()
      .messages({
        "any.required": "name cannot be empty",
        "string.base": "name must be a text"
      }),

    prodi : Joi.string()
      .required()
      .trim()
      .messages({
        "any.required": "prodi cannot be empty",
        "string.base": "prodi must be a string"
      }),
});