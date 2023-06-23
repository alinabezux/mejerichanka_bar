const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
mongoose.set('strictQuery', false);
require('dotenv').config();

const configs = require("../server/configs/configs");
const router = require('../server/routes/index');
const accountRouter = require("../server/routes/account.router");

const app = express();

app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'server', 'static')));
app.use(express.static(path.resolve(__dirname, 'server', 'dataBase', 'images')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Backend server is running on port ${configs.PORT} !`);
});

app.get('/', (req, res) => {
    res.json({message: "WELCOME"});
    console.log('Welcome page.');
});

app.use('/api', router);
app.use('/account', accountRouter)
