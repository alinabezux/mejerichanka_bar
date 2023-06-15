const Category = require('../dataBase/models/Category');

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await Category.find({});

            res.json(categories);
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
            await Category.create(req.body);

            res.status(201).json('Created.');
        } catch (e) {
            next(e)
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const {categoryId} = req.params;

            await Category.deleteOne({_id: categoryId});

            res.status(204).json('Deleted.');
        } catch (e) {
            next(e)
        }
    }
}