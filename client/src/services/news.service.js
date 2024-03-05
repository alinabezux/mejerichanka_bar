import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const newsService = {
    getAllNews: () => $host.get(urls.news),
    createNew: (image) => $authHost.post(urls.news, image),
    deleteNew: (newId) => $authHost.delete(`${urls.news}/${newId}`)
}

export {newsService}