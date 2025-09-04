import axios from "axios";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default function request({ ...options }) {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (res: any) => res;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (err: any) => { throw err; };

    return client(options).then(onSuccess).catch(onError);
}
