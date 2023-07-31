const Type = require("../dataBase/models/Type");


module.exports = {
    getAllTypes: async (req, res, next) => {
        try {
            const types = await Type.find({});

            return res.json(types);
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
            const {typeId} = req.params;

            await Type.deleteOne({_id: typeId});

            res.status(204).json('Deleted.');
        } catch (e) {
            next(e)
        }
    },
}