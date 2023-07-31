import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const typesService = {
    getAll: () => $host.get(urls.types),
    createType: (type) => $host.post(urls.types, {type}),
    deleteById: (typeId) => $host.delete(`${urls.types}/${typeId}`)

}

export {typesService}