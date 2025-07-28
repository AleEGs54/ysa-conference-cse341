const Joi = require('joi');

const userSchema = Joi.object({
    githubId: Joi.string().trim(),
    name: Joi.string().trim().min(2).max(100).required().messages({
        'string.base': 'A valid name is required',
        'string.min': "Name can't be a single letter",
    }),
    username: Joi.string().trim().min(5).max(50).required().messages({
        'string.base': 'A valid username is required',
        'string.min': 'Username must be at least 5 characters long',
        'string.max': 'Username must be less than 50 characters long',
    }),
    password: Joi.string()
        .trim()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/),
    //.required()
    // .messages({
    //     'string.base': 'A valid password is required',
    //     'string.pattern': 'Password must match the required pattern',
    // })
    email: Joi.string().email().trim().lowercase(),
    role: Joi.string().valid('admin', 'staff', 'employee').required(),
});

/*
 *Validates the previous schemas
 */
function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        //customized error for Joi
        const validationError = new Error('Validation failed');
        validationError.statusCode = 400;
        validationError.details = error.details.map((detail) => detail.message);
        return next(validationError);
    }
    return next();
}

module.exports = {
    validateUser,
};
