import LoginRequest from '../../models/LoginRequest';
import RegisterRequest from '../../models/RegisterRequest';
import ResetRequest from '../../models/ResetRequest';
import eCommerceClient, { eCommerceApiResponse, eCommerceLoginResponse, eCommerceResetResponse } from './eCommerceClient';

const baseURL = '/auth';

export const apiLogin = async (email: string, password: string): Promise<eCommerceLoginResponse> => {
    const response = await eCommerceClient.post<LoginRequest>(`${baseURL}/login`, {
        email: email,
        password: password,
    });
    return { status: response.status, payload: response.data, headers: response.headers };
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

export const apiResetPassword = async (resetRequest: ResetRequest, token: string): Promise<eCommerceResetResponse> => {
    const response = await eCommerceClient.patch<ResetRequest>(`${baseURL}/reset`, resetRequest,
        {
            headers: {
                Authorization: token,
            },
        });
    return { status: response.status, payload: response.data, headers: response.headers };
};


