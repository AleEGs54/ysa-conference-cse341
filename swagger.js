// swagger.js

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    openapi: '3.0.0',

    info: {
        title: 'Participants API',
        description: 'API to know how to make requests to the DB',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'https://ysa-conference-cse341.onrender.com',
            description: 'Production server',
        },
        {
            url: 'http://localhost:3000',
            description: 'Local development server',
        },
    ],
    components: {
        schemas: {
            Participant: {
                type: 'object',
                properties: {
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    preferedName: { type: 'string' },
                    dob: {
                        type: 'string',
                        format: 'date',
                        example: '1990-01-01',
                    },
                    gender: { type: 'string', example: 'Male' },
                    phone: { type: 'string', example: '123456789' },
                    email: {
                        type: 'string',
                        format: 'email',
                    },
                    age: { type: 'integer' },
                    shirtSize: { type: 'string', example: 'M' },
                    ldsMember: { type: 'boolean', example: false },
                    stake: { type: 'string' },
                    ward: { type: 'string' },
                    bloodType: { type: 'string', example: 'A+' },
                    allergies: { type: 'string', example: 'Explain.../No' },
                    medicalTreatment: {
                        type: 'string',
                        example: 'Explain.../No',
                    },
                    conditions: {
                        type: 'object',
                        properties: {
                            diabetic: { type: 'boolean', example: false },
                            asthmatic: { type: 'boolean', example: false },
                        },
                    },
                    insurance: {
                        type: 'string',
                    },
                    covidDoses: { type: 'integer', example: 0 },
                    emergencyContact: {
                        type: 'object',
                        properties: {
                            firstName: { type: 'string' },
                            lastName: { type: 'string' },
                            email: {
                                type: 'string',
                                format: 'email',
                            },
                            phone: { type: 'string', example: '123456789' },
                        },
                    },
                },
                required: ['firstName', 'lastName', 'email', 'dob', 'gender'],
            },
        },
        requestBodies: {
            ParticipantBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Participant',
                        },
                        examples: {
                            Participant: {
                                value: {
                                    firstName: 'any',
                                    lastName: 'any',
                                    preferedName: 'any',
                                    dob: 'any',
                                    gender: 'any',
                                    phone: 'any',
                                    email: 'any',
                                    age: 20,
                                    shirtSize: 'any',
                                    ldsMember: false,
                                    stake: 'any',
                                    ward: 'any',
                                    bloodType: 'any',
                                    allergies: 'any',
                                    medicalTreatment: 'any',
                                    conditions: {
                                        diabetic: false,
                                        asthmatic: false,
                                    },
                                    insurance: 'any',
                                    covidDoses: 2,
                                    emergencyContact: {
                                        firstName: 'any',
                                        lastName: 'any',
                                        email: 'any',
                                        phone: 'any',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
