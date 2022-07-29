/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'text/plain',

    },
});

export interface eCommerceApiResponse {
    status: number;
    payload: any;
}

export interface eCommerceLoginResponse {
    status: number;
    payload: any;
    headers: any;
}

export interface eCommerceResetResponse {
    status: number;
    payload: any;
    headers: any;
}


export default eCommerceClient;
