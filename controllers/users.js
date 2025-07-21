const User = require('../models/users');
const controller = {};

/**
 * TODO: Delete all trycatch blocks, they get replaced with the wrapper and global error middleware fn.
 */

controller.getAll = async (req, res) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = 'Returns a list of all the Users.'
     */
    try {
        const result = await User.find();

        if (result) {
            res.status(200).json(result);
            return;
        }

        res.status(404).json({ error: 'No Users found' });
    } catch (error) {
        console.log('🚀 ~ users.js:23 ~ controller.getAll= ~ error:', error);

        res.status(500).json({
            error: 'An error occurred while retrieving the information',
        });
    }
};
controller.getSingle = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Returns a single User'

    try {
        const result = await User.findById(req.params.id);

        if (result) {
            res.status(200).json(result);
            return;
        }

        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.log('🚀 ~ users.js:44 ~ controller.getSingle= ~ error:', error);

        res.status(500).json({
            error: 'An error occurred while retrieving the information',
        });
    }
};

controller.createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a new User'
    // #swagger.description = 'Insert a new User into the database. '
    // #swagger.requestBody = { $ref: '#/components/requestBodies/UserBody' }

    try {
        const createdUser = await User.create(req.body);

        res.status(201).json(createdUser);
    } catch (error) {
        console.log(
            '🚀 ~ users.js:64 ~ controller.createUser= ~ error:',
            error,
        );
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

controller.updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update a User'
    // #swagger.description = 'Replaces an existing User in the database. '
    // #swagger.requestBody = { $ref: '#/components/requestBodies/UserBody' }
    try {
        const updatedUser = await User.replaceOne(
            { _id: req.params.id },
            req.body,
        );

        if (updatedUser.modifiedCount > 0) {
            res.status(204).json(updatedUser);
            return;
        }

        res.status(404).json({
            error: 'User not found',
        });
    } catch (error) {
        console.log(
            '🚀 ~ users.js:91 ~ controller.updateUser= ~ error:',
            error,
        );
        res.status(500).json({
            error: 'An error ocurred updating the User. Please try again later.',
        });
    }
};

controller.deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a User'

    try {
        const deletedUser = await User.deleteOne({
            _id: req.params.id,
        });

        if (deletedUser.deletedCount > 0) {
            res.status(200).json({
                message: 'User succesfully deleted',
            });
            return;
        }

        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.log(
            '🚀 ~ users.js:119 ~ controller.deleteUser ~ error:',
            error,
        );
        res.status(500).json({
            error: 'An error ocurred deleting the User',
        });
    }
};

module.exports = controller;
