const Category = require("../dataBase/models/Category");
const NotFoundError = require("../errors/ApiError");
const Product = require("../dataBase/models/Product");
const ApiError = require("../errors/ApiError");

module.exports = {

    checkIfCategoryExistsForCreateProduct: async (req, res, next) => {
        try {
            const categoryOfProduct = req.body.category;
            const category = await Category.findOne({category: `${categoryOfProduct}`});

            if (!category) {
                throw new NotFoundError(`Category ${categoryOfProduct} doesn't exists in database.`)
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    checkIfCategoryExistsForCreateCategory: async (req, res, next) => {
        try {
            const categoryOfProduct = req.body.category;

            const category = await Category.findOne({category: `${categoryOfProduct}`});

            if (category) {
                throw new ApiError(`Category ${categoryOfProduct}  exists in database.`)
            }

            next();

        } catch (e) {
            next(e);
        }
    }
}