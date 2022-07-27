import CreateProductRequest from '../../models/CreateProductRequest';
import Product from '../../models/Product';
import UpdateProduct from '../../models/UpdateProduct';
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

export const apiUpdateProduct = async (product: UpdateProduct, token: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.put<UpdateProduct>(`${baseURL}`, product, {
        headers: {
            Authorization: token,
        },
    });
    return { status: response.status, payload: product };
};

export const apiPurchase = async (products: { id: number; }[],): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.patch<Product[]>(`${baseURL}`, products);
    return { status: response.status, payload: response.data };
};

export const apiDeleteProduct = async (id: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<Product>(`${baseURL}/${id}`);
    return { status: response.status, payload: response.data };
};

export const apiCreateProduct = async (product: CreateProductRequest, token: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<Product>(`${baseURL}/createproduct`, {
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrlS: product.imageUrlS,
        imageUrlM: product.imageUrlM
    }, {
        headers: {
            Authorization: token,
        },
    });
    return { status: response.status, payload: product };
};

export const apiPostReviewByProductId = async (
    id: string,
    rating: Record<string, never>,
    token: string,
): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<Rating>(
        `${baseURL}/rating/${id}`,
        rating,
        {
            headers: {
                Authorization: token,
            },
        },
    );
    return { status: response.status, payload: response.data };
};

export const apiGetReviewByProductId = async (id: string): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<Rating>(`${baseURL}/rating/${id}`);
    return { status: response.status, payload: response.data };
};
