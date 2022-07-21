import Product from '../../models/Product';
import Rating from '../../models/RatingResponse';
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

export const apiGetReviewByProductId = async (id: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<Rating>(`${baseURL}/rating/${id}`);
    return { status: response.status, payload: response.data }; 
};

// export const apiPostReviewByProductId = async (id: string): Promise<eCommerceApiResponse> => {
//     const response = await eCommerceClient.post<Rating>(`${baseURL}/rating/${id}`);
//     return { status: response.status, payload: response.data }; 
// };

export const apiUpsertProduct = async (product: Product): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<Product>(`${baseURL}`, product);
    return { status: response.status, payload: response.data };
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
