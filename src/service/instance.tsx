import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { createBrowserHistory } from "history";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_DEMO
})
const token = localStorage.getItem("token")
const history = createBrowserHistory()

/*-------no need endpoint login--------*/

apiInstance.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers = {
            Authorization: token
        }
    }
    return config
})

apiInstance.interceptors.response.use(config => config, (err) => {
    const toast = useToast()
    if (err.response) {
        if (err.response.status === 401) {
            toast({
                position: 'top',
                title: 'Error',
                description: 'Token has expired',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            localStorage.clear();
            history.push("/");
            window.location.reload();
        }
        else {
            toast({
                position: 'top',
                title: 'Error',
                description: `error code: ${err.response.status} message: ${err.response.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return Promise.reject(err)
})

export default apiInstance;