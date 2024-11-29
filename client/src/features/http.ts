import axios, { AxiosInstance } from 'axios';

class Http {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            timeout: 50000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }
}

const http = new Http().instance;

export default http;
