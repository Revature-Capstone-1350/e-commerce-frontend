import LoginRequest from '../../models/LoginRequest';
import RegisterRequest from '../../models/RegisterRequest';
import eCommerceClient, { eCommerceApiResponse } from './eCommerceClient';

const baseURL = '/auth';

export const apiLogin = async (email: string, password: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<LoginRequest>(`${baseURL}/login`, {
        email: email,
        password: password,
    });
    return { status: response.status, payload: response.data };
};

export const apiRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<RegisterRequest>(`${baseURL}/register`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    });
    return { status: response.status, payload: response.data };
};
