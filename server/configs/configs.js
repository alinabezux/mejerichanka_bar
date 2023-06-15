module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mejerichanka',
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    REFRESH_SECRET:process.env.REFRESH_SECRET
}