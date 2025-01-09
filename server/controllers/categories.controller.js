const Category = require('../dataBase/models/Category');
const S3Service = require("../services/s3.service");

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            let {page = 1, isGettingAll} = req.query;
            const limit = 10;
            let count;

            if (JSON.parse(isGettingAll)) {
                const categories = await Category.find({})
                count = await Category.countDocuments();

                return res.json({categories, count: count});
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
            const category = await Category.create(req.body.category);

            res.json(category)
        } catch (e) {
            next(e)
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const newInfo = req.body.category;
            const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, newInfo, {new: true});

            res.status(201).json(updatedCategory);
            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    uploadImage: async (req, res, next) => {
        try {
            const { prevImage } = req.body;
            const { categoryId } = req.params;

            console.log('prevImage')
            console.log(prevImage)

            if (!req.files.image) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            if (prevImage) {
                await S3Service.deleteImage('categories', categoryId, prevImage);
            }

            const sendData = await S3Service.uploadPublicFile(req.files.image, 'categories', categoryId);
            const newCategory = await Category.findByIdAndUpdate(categoryId, { image: sendData.Location }, { new: true });

            res.status(200).json(newCategory);
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