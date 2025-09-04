import axios from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function request({ ...options }) {
    const onSuccess = (res: any) => res;
    const onError = (err: any) => { throw err; };

    return client(options).then(onSuccess).catch(onError);
}
