import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const typesService = {
    getAll: () => $host.get(urls.types)
}

export {typesService}