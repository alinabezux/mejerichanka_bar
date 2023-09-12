const Category = require("../dataBase/models/Category");
const ApiError = require("../errors/ApiError");

module.exports = {
    checkIfCategoryExistsForCreateCategory: async (req, res, next) => {
        try {
            const categoryOfProduct = req.body.category;

            const category = await Category.findOne({category: `${categoryOfProduct}`});

            if (category) {
                throw new ApiError(`Категорія ${categoryOfProduct} не існує в базі даних.`)
            }

            next();

        } catch (e) {
            next(e);
        }
    }
}