const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const fileUpload = require('express-fileupload');
mongoose.set('strictQuery', false);
require('dotenv').config();
const configs = require("./configs/configs");


const router = require("./routes");
const accountRouter = require("./routes/account.router");
const basketRouter = require("./routes/basket.router");
const orderRouter = require("./routes/order.router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'static')));

app.use(fileUpload());

app.use('/api', router);
app.use('/account', accountRouter);
app.use('/basket', basketRouter);
app.use('/order', orderRouter);


app.get('/', (req, res) => {
    res.json({message: "WELCOME"});
    console.log('Welcome page.');
});

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



