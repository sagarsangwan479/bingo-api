const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnection = require('./config/db.js');
dbConnection();

const appRouter = require('./routes/index.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', appRouter);

app.use('*', (req, res) => {
    res.send('running')
})

app.listen(3000, () => {
    console.log('running at ', 3000);
})
