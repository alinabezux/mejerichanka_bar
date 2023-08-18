import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const categoriesService = {
    getAll: () => $host.get(urls.categories),
    createCategory: (category) => $host.post(urls.categories, {category}),
    uploadPhoto: (categoryId, image) => $host.patch(`${urls.categories}/${categoryId}`, image),
    deleteById: (categoryId) => $host.delete(`${urls.categories}/${categoryId}`)
}

export {categoriesService}