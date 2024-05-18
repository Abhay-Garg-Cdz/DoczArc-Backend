const express = require('express');
require('dotenv').config();
const mongoose =  require('mongoose')
dbConnect = require('./config/dbConnect')
const cors = require('cors')

const whitelist = process.env.WHITELIST.split(',');
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};



const doczarc  = express();



const PORT = process.env.PORT || 3500;

 dbConnect();

doczarc.use(express.json());
// doczarc.use(cors);
doczarc.use(cors(corsOptions));
doczarc.use('/api/v1',require("./routes/apiRoutes"));



 mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    doczarc.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});