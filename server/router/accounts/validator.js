const Joi = require("joi");

exports.login = async (req) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  try {
    const validatedData = await schema.validateAsync(req);
    return validatedData;
  } catch (error) {
    throw error; // Handle validation errors as needed
  }
};
