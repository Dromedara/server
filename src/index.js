const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');


//Server port
const port = 4242;

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

app.use(cors(corsOptions));

const {authMiddleware} = require('./utils');

//Router import and connection.
app.use('/user', require('./routers/user'));
app.use('/schedule',  authMiddleware, require('./routers/schedule'));
app.use('/materials', authMiddleware, require('./routers/material'));
app.use('/queue', authMiddleware, require('./routers/queue'));

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


