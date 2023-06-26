import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const categoriesService = {
    getAll: () => $host.get(`${urls.categories}`)
}

export {categoriesService}