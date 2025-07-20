const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    await mongoose
        .connect(process.env.MONGODB_URL)
        .then(console.log('Database is connected!'))
        .catch((err) => console.log(`Error connecting to database: ${err}`));
};

module.exports = { connectDb };
