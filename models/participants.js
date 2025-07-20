const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, minlength: 2 },
    lastName: { type: String, required: true, trim: true, minlength: 2 },
    preferedName: { type: String, trim: true },
    dob: {
        type: String,
        required: true,
        match: [
            /^\d{4}-\d{2}-\d{2}$/,
            'Date of birth must be in YYYY-MM-DD format',
        ],
    },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    phone: {
        type: String,
        match: [/^\+?[0-9\s\-()]{7,15}$/, 'Phone number is invalid'],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    age: { type: Number, min: 0, max: 120 },
    shirtSize: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    ldsMember: { type: Boolean },
    stake: { type: String, trim: true },
    ward: { type: String, trim: true },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    allergies: { type: String },
    medicalTreatment: { type: String },
    conditions: {
        diabetic: { type: Boolean },
        asthmatic: { type: Boolean },
    },
    insurance: { type: String, trim: true },
    covidDoses: { type: Number, min: 0, max: 10 },
    emergencyContact: {
        firstName: { type: String, required: true, trim: true, minlength: 2 },
        lastName: { type: String, required: true, trim: true, minlength: 2 },
        email: {
            type: String,
            required: true,
            match: [/\S+@\S+\.\S+/, 'Email is invalid'],
        },
        phone: {
            type: String,
            match: [/^\+?[0-9\s\-()]{7,15}$/, 'Phone number is invalid'],
        },
    },
});

//Creates the model and then exports it.
module.exports = mongoose.model('Participant', participantSchema);
