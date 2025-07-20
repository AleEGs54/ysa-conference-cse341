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
                    firstName: { type: 'string', example: 'Joe' },
                    lastName: { type: 'string', example: 'Doe' },
                    preferedName: { type: 'string', example: 'Joe' },
                    dob: {
                        type: 'string',
                        format: 'date',
                        example: '1990-01-01',
                    },
                    gender: { type: 'string', example: 'Male' },
                    phone: { type: 'string', example: '987654321' },
                    email: {
                        type: 'string',
                        format: 'email',
                        example: 'joe@email.com',
                    },
                    age: { type: 'integer', example: 23 },
                    shirtSize: { type: 'string', example: 'L' },
                    ldsMember: { type: 'boolean', example: true },
                    stake: { type: 'string', example: 'Draper' },
                    ward: { type: 'string', example: 'South Mountain' },
                    bloodType: { type: 'string', example: 'O+' },
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
                        example: 'Name of the insurance...',
                    },
                    covidDoses: { type: 'integer', example: 3 },
                    emergencyContact: {
                        type: 'object',
                        properties: {
                            firstName: { type: 'string', example: 'John' },
                            lastName: { type: 'string', example: 'Doe' },
                            email: {
                                type: 'string',
                                format: 'email',
                                example: 'john@email.com',
                            },
                            phone: { type: 'string', example: '123456789' },
                        },
                    },
                },
                required: ['firstName', 'lastName', 'email', 'dob', 'gender'],
            },
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
