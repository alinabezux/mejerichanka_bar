const Type = require("../dataBase/models/Type");



module.exports = {
    getAllTypes: async (req, res, next) => {
        try {
            let {page = 1, isGettingAll} = req.query;
            const limit = 10;
            let count;

            if (JSON.parse(isGettingAll)) {
                const types = await Type.find({})
                count = await Type.countDocuments();

                return res.json({types, count: count})
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

    getTypesByCategoryId: async (req, res, next) => {
        try {
            const typesByCategory = await Type.find({_category: req.params.categoryId});
            res.json(typesByCategory);
        } catch (e) {
            next(e);
        }
    },
    createType: async (req, res, next) => {
        try {
            const type = await Type.create(req.body.type);
            return res.status(201).json(type);
        } catch (e) {
            next(e)
        }
    },

    updateType: async (req, res, next) => {
        try {
            const newInfo = req.body.type;
            const updatedType = await Type.findByIdAndUpdate(req.params.typeId, newInfo, {new: true});
            res.status(201).json(updatedType);
        } catch (e) {
            next(e);
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