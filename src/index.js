//Libraries import
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');


//Server port
const port = 4242; //Server will be available on http://localhost:4242/

const app = express();

//Options to parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Disable CORS
const corsOptions ={
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions)); //this line allow to connect to server from anywhere, but it is not secure

const {authMiddleware} = require('./utils');

//Router import and connection.
app.use('/schedule', authMiddleware, require('./routers/schedule')); //Every request that starts with http://localhost:4242/library will go here/
app.use('/materials', authMiddleware, require('./routers/material'));
app.use('/user', require('./routers/user'));

app.get('/check', authMiddleware, (req, res) => {
    res.send(`Hello ${req.user.name}`)
})


app.listen(port, () => console.log(`Server is on ${port}`));

//Database connection (You need to start DB before connection by CMD or MongoDBCompass)
mongoose.connect(
    'mongodb://localhost:27017/student_app_final',
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error => console.log(`MongoDB connection ${error ? 'error' : 'success'}`))
);

// app.listen(3000)

