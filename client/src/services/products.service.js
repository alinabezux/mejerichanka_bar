import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const productsService = {
    getAll: (category, type, page, isGettingAll) => $host.get(urls.products, {
        params: {
            category,
            type,
            page,
            isGettingAll
        }
    }),
    createProduct: (product) => $authHost.post(urls.products, {product}),
    updateProduct: (productId, product) => $authHost.put(`${urls.products}/${productId}`, {product}),
    uploadPhoto: (productId, formData) => $authHost.patch(`${urls.products}/${productId}`, formData),
    deleteById: (productId) => $authHost.delete(`${urls.products}/${productId}`),
}

export {productsService}


