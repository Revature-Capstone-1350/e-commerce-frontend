import Product from '../../models/Product';
import UpdateProduct from '../../models/UpdateProduct';
import eCommerceClient, { eCommerceApiResponse } from './eCommerceClient';

const baseURL = '/api/product';

export const apiGetAllProducts = async (): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<Product[]>(`${baseURL}`);
    return { status: response.status, payload: response.data };
};

export const apiGetProductById = async (id: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<Product>(`${baseURL}/${id}`);
    return { status: response.status, payload: response.data };
};

export const apiUpdateProduct = async (product: UpdateProduct): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<UpdateProduct>(`${baseURL}`, product);
    return { status: response.status, payload: product };
};

export const apiPurchase = async (
    products: { id: number; }[],
): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.patch<Product[]>(`${baseURL}`, products);
    return { status: response.status, payload: response.data };
};

export const apiDeleteProduct = async (id: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<Product>(`${baseURL}/${id}`);
    return { status: response.status, payload: response.data };
};
