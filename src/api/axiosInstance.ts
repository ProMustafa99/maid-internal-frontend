import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true,
});

// let isRedirecting = false;

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        let redirected = false;
        
        const status = error?.response?.status;

        if (status == 401) {
            redirected = true;
            // notify("Session expired - please log in again");
            // logoutFn();
            // goTo("/login");
        } else if (status == 403) {
            redirected = true;
            // notify("Forbidden");
            // goTo("/forbidden");
        } 

        if (!redirected) {
            return Promise.reject(error);
        }
    }
)