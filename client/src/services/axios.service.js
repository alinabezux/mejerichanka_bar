import axios from "axios";
import {createBrowserHistory} from "history";

import {baseURL} from "../configs/urls";
import {authService} from "./auth.service";


const $host = axios.create({baseURL})
const $authHost = axios.create({baseURL})
export const history = createBrowserHistory();

let isRefreshing = false;


// debugger
$authHost.interceptors.request.use((config) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

$authHost.interceptors.response.use((config) => {
        return config;
    },
    async (error) => {
        const refreshToken = authService.getRefreshToken();
        console.log(refreshToken);
        if (error.response?.status === 401 && refreshToken && !isRefreshing) {
            console.log("401")
            isRefreshing = true;
            try {
                const {data} = await authService.refresh(refreshToken);
                console.log("refreshing")

                localStorage.setItem('access', data.accessToken)
                localStorage.setItem('refresh', data.refreshToken)

            } catch (e) {
                authService.deleteInfo()
                history.replace('/logIn?expSession=true')
            }
            isRefreshing = false;
            return $authHost(error.config)
        }
        return Promise.reject(error)
    }
)

export {$host, $authHost};