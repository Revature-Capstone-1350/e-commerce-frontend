import eCommerceClient from '../remote/e-commerce-api/eCommerceClient';
import { apiCreateProduct, apiGetAllProducts, apiGetProductById, apiGetReviewByProductId, apiPostReviewByProductId, apiUpdateProduct } from '../remote/e-commerce-api/productService';

jest.mock('../remote/e-commerce-api/eCommerceClient');

const eCommerceClientMock = eCommerceClient as jest.Mocked<typeof eCommerceClient>;

describe('Fetch All Products', () => {
    it('should return products list', async () => {
        const products = [
            {
                productId: 1,
                name: 'Product 1',
                description: 'Description 1',
                price: 1,
                imageUrlSmall: 'imageUrlSmall 1',
                imageUrlMed: 'imageUrlMed 1',
                category: 'Category 1',
                numberOfRatings: 6,
                sumOfRatings: 16
            }
        ];

        // Mock the response from the API
        (eCommerceClientMock.get as jest.MockedFunction<typeof eCommerceClient.get>).mockResolvedValue({
            data: products,
            status: 200
        });

        // Call the API
        const result = await apiGetAllProducts();

        // Assert the result
        expect(eCommerceClient.get).toHaveBeenCalledWith('/api/product');
        expect(result.status).toBe(200);
        expect(result.payload).toBe(products);
    });
});

describe('Fetch Product By Id', () => {
    it('should return single product', async () => {
        const products = [
            {
                productId: 1,
                name: 'Product 1',
                description: 'Description 1',
                price: 1,
                imageUrlSmall: 'imageUrlSmall 1',
                imageUrlMed: 'imageUrlMed 1',
                category: 'Category 1',
                numberOfRatings: 6,
                sumOfRatings: 16
            },
            {
                productId: 2,
                name: 'Product 1',
                description: 'Description 1',
                price: 1,
                imageUrlSmall: 'imageUrlSmall 1',
                imageUrlMed: 'imageUrlMed 1',
                category: 'Category 1',
                numberOfRatings: 6,
                sumOfRatings: 16
            }
        ];

        // Mock the response from the API
        (eCommerceClientMock.get as jest.MockedFunction<typeof eCommerceClient.get>).mockResolvedValue({
            data: products[1],
            status: 200
        });

        // Call the API
        const result = await apiGetProductById('2');

        // Assert the result
        expect(eCommerceClient.get).toHaveBeenCalledWith('/api/product/2');
        expect(result.status).toBe(200);
        expect(result.payload).toEqual(products[1]);
    });
});

describe('Update Product', () => {
    it('should update product', async () => {
        const product = {
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            price: 1,
            imageUrlS: 'imageUrlSmall 1',
            imageUrlM: 'imageUrlMed 1',
            category: 1,
            numberOfRatings: 6,
            sumOfRatings: 16
        };

        // Mock the response from the API
        (eCommerceClientMock.put as jest.MockedFunction<typeof eCommerceClient.put>).mockResolvedValue({
            data: product,
            status: 204
        });

        // Call the API
        const result = await apiUpdateProduct(product, 'token');

        // Assert the result
        expect(eCommerceClient.put).toHaveBeenCalledWith('/api/product', product, {
            headers: {
                Authorization: 'token',
            },
        });
        expect(result.status).toBe(204);
        expect(result.payload).toEqual(product);
    });
});

describe('Create Product', () => {
    it('should create product', async () => {
        const product = {
            name: 'Product 1',
            description: 'Description 1',
            price: 1,
            imageUrlS: 'imageUrlSmall 1',
            imageUrlM: 'imageUrlMed 1',
            category: 1,
        };

        // Mock the response from the API
        (eCommerceClientMock.post as jest.MockedFunction<typeof eCommerceClient.post>).mockResolvedValue({
            data: product,
            status: 201
        });

        // Call the API
        const result = await apiCreateProduct(product, 'token');

        // Assert the result
        expect(eCommerceClient.post).toHaveBeenCalledWith('/api/product/createproduct', product, {
            headers: {
                Authorization: 'token',
            },
        });
        expect(result.status).toBe(201);
        expect(result.payload).toEqual(product);
    });
});

describe('Add Review', () => {
    it('should add review', async () => {
        const review = {
            rating: 5,
            description: 'comment'
        };

        // Mock the response from the API
        (eCommerceClientMock.post as jest.MockedFunction<typeof eCommerceClient.post>).mockResolvedValue({
            data: review,
            status: 201
        });

        // Call the API
        const result = await apiPostReviewByProductId('1',
            JSON.parse(JSON.stringify({ rating: 5, description: 'comment' })), 'token');

        // Assert the result
        expect(eCommerceClient.post).toHaveBeenCalledWith('/api/product/rating/1', review, {
            headers: {
                Authorization: 'token',
            },
        });
        expect(result.status).toBe(201);
        expect(result.payload).toEqual(review);
    });
});

describe('Get Review By Product Id', () => {
    it('should get review by product id', async () => {
        const reviews = [
            {
                rating: 5,
                description: 'comment',
                reviewerName: 'John Doe'
            },
            {
                rating: 3,
                description: 'commenting',
                reviewerName: 'Jane Doe'
            }
        ];

        // Mock the response from the API
        (eCommerceClientMock.get as jest.MockedFunction<typeof eCommerceClient.get>).mockResolvedValue({
            data: reviews,
            status: 200
        });

        // Call the API
        const result = await apiGetReviewByProductId('1');

        // Assert the result    
        expect(eCommerceClient.get).toHaveBeenCalledWith('/api/product/rating/1');
        expect(result.status).toBe(200);
        expect(result.payload).toEqual(reviews);
    });
});

