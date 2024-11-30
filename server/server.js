const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const fileUpload = require('express-fileupload');
mongoose.set('strictQuery', false);
require('dotenv').config();
const configs = require("./configs/configs");

const router = require("./routes");
const ApiError = require("./errors/ApiError");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'static')));

app.use(fileUpload());

app.use('/api', router);

app.get('/', (req, res) => {
    res.json({ message: "WELCOME" });
    console.log('Welcome page.');
});

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(configs.PORT, configs.HOST, async () => {
    await mongoose.connect(configs.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`Backend server is running on port ${configs.PORT} !`);
});

