const Participant = require('../models/participants');
const controller = {};

controller.getAll = async (req, res) => {
    /**
     * #swagger.tags = ['Participants']
     */
    try {
        const result = await Participant.find();

        if (result) {
            res.status(200).json(result);
            return;
        }

        res.status(500).json({
            error: 'An error occurred while retrieving the information',
        });
    } catch (error) {
        console.log('🚀 ~ participants.js:9 ~ error:', error);
    }
};
controller.getSingle = async (req, res) => {
    // #swagger.tags = ['Participants']

    try {
        const result = await Participant.findById(req.params.id);

        if (result) {
            res.status(200).json(result);
            return;
        }

        res.status(500).json({
            error: 'An error occurred while retrieving the information',
        });
    } catch (error) {
        console.log('🚀 ~ participants.js:9 ~ error:', error);
    }
};

controller.createParticipant = async (req, res) => {
    // #swagger.tags = ['Participants']
    // #swagger.summary = 'Create a new Participant'
    // #swagger.description = 'Insert a new participant into the database. '
    /* #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/Participant'
            },
            examples: {
                ParticipantExample: { 
                    value: {
                        firstName: 'Jane',
                        lastName: 'Doe',
                        preferedName: 'Janey',
                        dob: '1995-03-15',
                        gender: 'Female',
                        phone: '1112223333',
                        email: 'jane.doe@example.com',
                        age: 28,
                        shirtSize: 'M',
                        ldsMember: true,
                        stake: 'Riverton',
                        ward: 'North Creek',
                        bloodType: 'A+',
                        allergies: 'None',
                        medicalTreatment: 'None',
                        conditions: {
                            diabetic: false,
                            asthmatic: false,
                        },
                        insurance: 'Blue Cross',
                        covidDoses: 2,
                        emergencyContact: {
                            firstName: 'David',
                            lastName: 'Doe',
                            email: 'david.doe@example.com',
                            phone: '4445556666',
                        }
                    }
                }
            }
        }
    }
}
#swagger.responses[201] = {
    description: 'Participant created successfully.'
}
#swagger.responses[500] = {
    description: 'Internal Server Error'
}
*/

    try {
        const createdParticipant = await Participant.create(req.body);

        if (createdParticipant) {
            res.status(201).send();
            return;
        }

        res.status(500).json({ error: 'Internal Server Error' });
    } catch (error) {
        console.log(
            '🚀 ~ participants.js:43 ~ controller.createParticipant= ~ error:',
            error,
        );
    }
};

module.exports = controller;
