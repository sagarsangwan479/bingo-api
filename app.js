const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnection = require('./config/db.js');

const appRouter = require('./routes/index.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', appRouter);

app.use('*', (req, res) => {
    res.send('running')
})

dbConnection.connect((err) => {
    if(err){
        throw new Error(err);
    }

    console.log('db connected');

    app.listen(process.env.PORT, () => {
        console.log('running at', process.env.PORT)
    })
})
