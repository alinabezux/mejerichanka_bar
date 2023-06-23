import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const productsService = {
    getAll: () => $host.get(`${urls.products}`),
    getProductById: (productId) => $host.get(`${urls.products}/${productId}`)
}

export {productsService}


// import {$host} from "./axios.service";
// import {urls} from "../configs/urls";
//
// export const fetchProducts = async () => {
//     const {data} = await $host.get(`${urls.products}`)
//     return data
//
// }