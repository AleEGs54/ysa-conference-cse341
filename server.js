const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connectDb } = require('./db/connection');
require('dotenv').config();
const port = process.env.PORT || 3000;

//Passport config
require('./auth/passport')(passport);

//Connect to MongoDB through Mongoose
connectDb();

//Session config and init
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }),
);

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

/**
 *
 * TODO: Allow only specific uris
 */
app.use(cors());

app.use(express.json());

app.use('/', require('./routes'));

/**
 * * Joi error handling
 */
app.use((err, req, res, next) => {
    if (err.statusCode === 400 && err.details) {
        return res.status(400).json({
            message: err.message,
            errors: err.details,
        });
    }
    // goes to the next middleware if not a validation error
    return next(err);
});

/**
 * * Global error handling for common middleware
 */
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error('Unhandled error:', err);

    // Default to 500 Internal Server Error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    return res.status(statusCode).json({
        error: {
            message,
            // stack trace only in development
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
});

//Port listening
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
