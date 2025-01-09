import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const categoriesService = {
    getAll: (page, isGettingAll) => $host.get(urls.categories, {params: {page, isGettingAll}}),
    createCategory: (category) => $authHost.post(urls.categories, {category}),
    updateCategory: (categoryId, category) => $authHost.put(`${urls.categories}/${categoryId}`, {category}),
    uploadPhoto: (categoryId, formData) => $authHost.patch(`${urls.categories}/${categoryId}`, formData),
    deleteById: (categoryId) => $authHost.delete(`${urls.categories}/${categoryId}`)
}

export {categoriesService}