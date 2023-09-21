import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const categoriesService = {
    getAll: (page, isGettingAll) => $host.get(urls.categories, {params: {page, isGettingAll}}),
    createCategory: (category) => $authHost.post(urls.categories, {category}),
    uploadPhoto: (categoryId, image) => $authHost.patch(`${urls.categories}/${categoryId}`, image),
    deleteById: (categoryId) => $authHost.delete(`${urls.categories}/${categoryId}`)
}

export {categoriesService}