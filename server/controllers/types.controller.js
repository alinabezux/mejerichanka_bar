const Type = require("../dataBase/models/Type");


module.exports = {
    getAllTypes: async (req, res, next) => {
        try {
            let {page = 1, isGettingAll} = req.query;
            const limit = 5;
            let count;

            if (JSON.parse(isGettingAll)) {
                const types = await Type.find({})

                return res.json({types})
            }

            const types = await Type.find({}).limit(limit).skip((page - 1) * limit);
            count = await Type.countDocuments();

            return res.json({
                types,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
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

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
}