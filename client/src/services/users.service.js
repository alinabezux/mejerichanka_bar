import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const usersService = {
    getAll: (page) => $authHost.get(urls.users, {params: {page}}),
    register: (user) => $host.post(urls.auth.registration, {user}),
}

export {usersService}