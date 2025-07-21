const utilities = {};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 ? Should I use this instead of express-async-errors??? - Yeah
 **************************************** */
utilities.handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = utilities;
