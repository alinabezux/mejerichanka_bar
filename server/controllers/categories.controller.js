const Category = require('../dataBase/models/Category');
const S3Service = require("../services/s3.service");

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            let {page = 1, isGettingAll} = req.query;
            const limit = 5;
            let count;

            if (JSON.parse(isGettingAll)) {
                const categories = await Category.find({})

                return res.json({categories});
            }

            const categories = await Category.find({}).limit(limit).skip((page - 1) * limit);
            count = await Category.countDocuments();

            return res.json({
                categories,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });

        } catch (e) {
            next(e);
        }
    },
    getCategoryById: async (req, res, next) => {
        try {
            const {categoryId} = req.params;
            const category = await Category.findById(categoryId);

            res.json(category);
        } catch (e) {
            next(e);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const category = await Category.create(req.body);

            res.json(category)
        } catch (e) {
            next(e)
        }
    },

    uploadImage: async (req, res, next) => {
        try {
            const sendData = await S3Service.uploadPublicFile(req.files.image, 'categories', req.params.categoryId);
            const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, {image: sendData.Location}, {new: true});

            res.json(updatedCategory);
        } catch (e) {
            next(e);
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            const {categoryId} = req.params;

            await Category.deleteOne({_id: categoryId});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    }
}