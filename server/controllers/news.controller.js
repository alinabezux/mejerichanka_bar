const New = require('../dataBase/models/New');
const S3Service = require("../services/s3.service");
const uuid = require('uuid');

module.exports = {
    getAllNews: async (req, res, next) => {
        try {
            const news = await New.find({})
            res.json(news);

        } catch (e) {
            next(e);
        }
    },
    createNew: async (req, res, next) => {
        try {
            const imageId = uuid.v4();
            const sendData = await S3Service.uploadPublicFile(req.files.image, 'news', imageId);
            const newData = await New.create({image: sendData.Location});

            res.status(200).json(newData);
        } catch (e) {
            next(e);
        }
    },
    deleteNew: async (req, res, next) => {
        try {
            const {newId} = req.params;
            await New.deleteOne({_id: newId});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}