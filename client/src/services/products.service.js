import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const productsService = {
    getAll: (category, type) => $host.get(urls.products, {params: {category, type}}),
    createProduct: (product) => $authHost.post(urls.products, {product}),
    updateProduct: (productId, product) => $authHost.put(`${urls.products}/${productId}`, {product}),
    uploadPhoto: (productId, image) => $authHost.patch(`${urls.products}/${productId}`, image),
    deleteById: (productId) => $authHost.delete(`${urls.products}/${productId}`),
}

export {productsService}


