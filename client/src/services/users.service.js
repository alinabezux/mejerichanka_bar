import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const usersService = {
    getAll: () => $host.get(urls.users)
}

export {usersService}