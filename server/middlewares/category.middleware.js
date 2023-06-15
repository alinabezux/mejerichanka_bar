const Category = require("../dataBase/models/Category");
const NotFoundError = require("../errors/ApiError");

module.exports = {
    checkIfCategoryExists: async (req, res, next) => {
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
    }
}