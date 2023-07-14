import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const productsService = {
    getAll: (category, type) => $host.get(urls.products, {params: {category, type}}),
    getProductById: (productId) => $host.get(`${urls.products}/${productId}`)
}

export {productsService}


