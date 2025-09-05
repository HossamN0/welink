import { store } from "@/store";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

client.interceptors.request.use(
    async (config) => {
        const token = store.getState()?.PersistSlice.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => Promise.reject(error)
)

export default function request<T = unknown>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const onSuccess = (response: AxiosResponse<T>): AxiosResponse<T> => {
        return response;
    };

    const onError = (error: AxiosError): never => { throw error; };

    return client(options).then(onSuccess).catch(onError);
}
