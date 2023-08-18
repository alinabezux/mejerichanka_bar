import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const usersService = {
    getAll: () => $host.get(urls.users),
    register: (user) => $host.post(urls.auth.registration, {user}),
}

export {usersService}