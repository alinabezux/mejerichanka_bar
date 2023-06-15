const Type = require("../dataBase/models/Type");


module.exports = {
    getAllTypes: async (req, res, next) => {
        try {
            const types = await Type.find({});

            res.json(types);
        } catch (e) {
            next(e);
        }
    },
    createType: async (req, res, next) => {
        try {
            await Type.create(req.body);

            res.status(201).json('Created.');
        } catch (e) {
            next(e)
        }
    },
    deleteType: async (req, res, next) => {
        try {
            await Type.deleteOne({_id: req.params.typeId});

            res.status(204).json('Deleted.');
        } catch (e) {
            next(e)
        }
    },
}