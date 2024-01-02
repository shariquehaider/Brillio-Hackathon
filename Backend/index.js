const express = require('express');
const dotenv = require('dotenv');
const router = require('./route/router');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
