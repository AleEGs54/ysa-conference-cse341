const Participant = require('../models/participants');
const controller = {};

/**
 * TODO: Delete all trycatch blocks, they get replaced with the wrapper and global error middleware fn.
 */

controller.getAll = async (req, res) => {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.summary = 'Returns a list of all the participants.'
     */
    try {
        const result = await Participant.find();

        if (result) {
            res.status(200).json(result);
            return;
        }

        res.status(404).json({ error: 'No participants found' });
    } catch (error) {
        console.log(
            '🚀 ~ participants.js:18 ~ controller.getAll= ~ error:',
            error,
        );

        res.status(500).json({
            error: 'An error occurred while retrieving the information',
        });
    }
};
controller.getSingle = async (req, res) => {
    // #swagger.tags = ['Participants']
    // #swagger.summary = 'Returns a single participant'

    try {
        const result = await Participant.findById(req.params.id);

        if (result) {
            res.status(200).json(result);
            return;
        }

        res.status(404).json({ error: 'Participant not found' });
    } catch (error) {
        console.log(
            '🚀 ~ participants.js:37 ~ controller.getSingle= ~ error:',
            error,
        );

        res.status(500).json({
            error: 'An error occurred while retrieving the information',
        });
    }
};

controller.createParticipant = async (req, res) => {
    // #swagger.tags = ['Participants']
    // #swagger.summary = 'Create a new Participant'
    // #swagger.description = 'Insert a new participant into the database. '
    // #swagger.requestBody = { $ref: '#/components/requestBodies/ParticipantBody' }

    try {
        const createdParticipant = await Participant.create(req.body);

        res.status(201).json(createdParticipant);
    } catch (error) {
        console.log(
            '🚀 ~ participants.js:43 ~ controller.createParticipant= ~ error:',
            error,
        );
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.updateParticipant = async (req, res) => {
    // #swagger.tags = ['Participants']
    // #swagger.summary = 'Update a Participant'
    // #swagger.description = 'Replaces an existing participant in the database. '
    // #swagger.requestBody = { $ref: '#/components/requestBodies/ParticipantBody' }
    try {
        const updatedParticipant = await Participant.replaceOne(
            { _id: req.params.id },
            req.body,
        );

        if (updatedParticipant.modifiedCount > 0) {
            res.status(204).json(updatedParticipant);
        }

        res.status(404).json({
            error: 'Participant not found',
        });
    } catch (error) {
        console.log(
            '🚀 ~ participants.js:122 ~ controller.updateParticipant= ~ error:',
            error,
        );
        res.status(500).json({
            error: 'An error ocurred updating the participant. Please try again later.',
        });
    }
};

controller.deleteParticipant = async (req, res) => {
    // #swagger.tags = ['Participants']
    // #swagger.summary = 'Delete a Participant'

    try {
        const deletedParticipant = await Participant.deleteOne({
            _id: req.params.id,
        });

        if (deletedParticipant.deletedCount > 0) {
            res.status(200).json({
                message: 'Participant succesfully deleted',
            });
            return;
        }

        res.status(404).json({ error: 'Participant not found' });
    } catch (error) {
        console.log(
            '🚀 ~ participants.js:110 ~ controller.deleteParticipant ~ error:',
            error,
        );
        res.status(500).json({
            error: 'An error ocurred deleting the participant',
        });
    }
};

module.exports = controller;
