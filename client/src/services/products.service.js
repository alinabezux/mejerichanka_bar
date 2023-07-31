import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const productsService = {
    getAll: (category, type) => $host.get(urls.products, {params: {category, type}}),
    createProduct: (product) => $host.post(urls.products, {product}),
    updateProduct: (productId, product) => $host.put(`${urls.products}/${productId}`, {product}),
    deleteById: (productId) => $host.delete(`${urls.products}/${productId}`),
}

export {productsService}


