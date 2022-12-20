const joi = require("joi");
 module.exports = joi.object({
  nim: joi.number().required().messages({
    "any.required": "nim cannot be empty",
    "string.base": "nim must be integer"
  }),

  password: joi.string().min(8).max(20).required().trim().messages({
    "any.required": "password cannot be empty",
    "string.base": "password must be a text",
    "string.min": "lenght password minimal 8 chararcter",
    "string.max": "length password maximum 20 character"
  })
});