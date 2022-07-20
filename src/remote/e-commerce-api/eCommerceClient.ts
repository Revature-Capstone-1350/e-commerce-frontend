/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
    baseURL: 'http://localhost:5000/skyview',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface eCommerceApiResponse {
    status: number;
    payload: any;
}

export default eCommerceClient;
