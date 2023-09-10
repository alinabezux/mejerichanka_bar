const Type = require("../dataBase/models/Type");
const ApiError = require("../errors/ApiError");

module.exports = {
    checkIfTypeExistsForTypes: async (req, res, next) => {
        try {
            if (req.body.type) {
                const typeOfProduct = req.body.type;
                const type = await Type.findOne({type: `${typeOfProduct}`});

                if (type) {
                    throw new ApiError(404, `Type ${typeOfProduct}  exists in database.`)
                }
            }

            next();

        } catch (e) {
            next(e)
        }
    }
}