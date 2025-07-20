const express = require('express');
const app = express();
const cors = require('cors');
const { connectDb } = require('./db/connection');
require('dotenv').config();
const port = process.env.PORT || 3000;

connectDb();

/**
 *
 * TODO: Allow only specific uris
 */
app.use(cors());

app.use(express.json());

app.use('/', require('./routes'));

//Port listening
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
