import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const authService = {
    login: (user) => $host.post(urls.auth.logIn, user),

}