import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const typesService = {
    getAll: (page, isGettingAll) => $host.get(urls.types, {params: {page, isGettingAll}}),
    getTypesByCategoryId: (categoryId) => $host.get(`${urls.types}/${categoryId}`),
    updateType: (typeId, type) => $authHost.put(`${urls.types}/${typeId}`, {type}),
    createType: (type) => $authHost.post(urls.types, {type}),
    deleteById: (typeId) => $authHost.delete(`${urls.types}/${typeId}`)
}

export {typesService}