import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const typesService = {
    getAll: () => $host.get(urls.types),
    createType: (type) => $authHost.post(urls.types, {type}),
    deleteById: (typeId) => $authHost.delete(`${urls.types}/${typeId}`)

}

export {typesService}