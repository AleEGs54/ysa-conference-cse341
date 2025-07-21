const Joi = require('joi');

const emergencyContactSchema = Joi.object({
    firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\+?[0-9\s\-()]{7,15}$/)
        .messages({
            'string.base': "Emergency contact's phone number is invalid",
        }),
});

const participantSchema = Joi.object({
    firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
    preferedName: Joi.string().trim().optional(),

    dob: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
            'string.base': 'Date of birth must be in YYYY-MM-DD format',
        }),

    gender: Joi.string().valid('Male', 'Female', 'Other').required(),

    phone: Joi.string()
        .pattern(/^\+?[0-9\s\-()]{7,15}$/)
        .messages({ 'string.base': 'Phone number is invalid' }),

    email: Joi.string().email().trim().lowercase().required(),

    age: Joi.number().min(0).max(120),

    shirtSize: Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL'),

    ldsMember: Joi.boolean(),

    stake: Joi.string().trim().optional(),
    ward: Joi.string().trim().optional(),

    bloodType: Joi.string().valid(
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
    ),

    allergies: Joi.string().optional(),
    medicalTreatment: Joi.string().optional(),

    conditions: Joi.object({
        diabetic: Joi.boolean(),
        asthmatic: Joi.boolean(),
    }),

    insurance: Joi.string().trim().optional(),

    covidDoses: Joi.number().min(0).max(10),

    //emergencyContact schema from above
    emergencyContact: emergencyContactSchema.required(),
});

/*
 *Validates the previous schemas
 */
function validateParticipant(req, res, next) {
    const { error } = participantSchema.validate(req.body, {
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
    validateParticipant,
};
