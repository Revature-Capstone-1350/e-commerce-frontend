import { apiLogin, apiRegister } from '../remote/e-commerce-api/authService';
import eCommerceClient from '../remote/e-commerce-api/eCommerceClient';

jest.mock('../remote/e-commerce-api/eCommerceClient');

const eCommerceClientMock = eCommerceClient as jest.Mocked<typeof eCommerceClient>;

describe('Attempt to login', () => {
    it('api call is good', async () => {


        // Mock the response from the API
        (eCommerceClientMock.post as jest.MockedFunction<typeof eCommerceClient.post>).mockResolvedValue({
            data: { email: 'something', password: 'Tester12@' },
            status: 200
        });

        // Call the API
        const result = await apiLogin('something', 'Tester12@');

        // Assert the result
        expect(eCommerceClient.post).toHaveBeenCalledWith('/auth/login', { email: 'something', password: 'Tester12@' });
        expect(result.status).toBe(200);
        expect(result.payload).toEqual({ email: 'something', password: 'Tester12@' });
    });
});

describe('Attempt to register', () => {
    it('if api call is good', async () => {

        const registerRequest = {
            firstName: 'Tester',
            lastName: 'Tester',
            email: 'tester@gmail.com',
            password: 'Tester12@'
        };

        // Mock the response from the API
        (eCommerceClientMock.post as jest.MockedFunction<typeof eCommerceClient.post>).mockResolvedValue({
            data: registerRequest,
            status: 200
        });

        // Call the API
        const result = await apiRegister(registerRequest.firstName, registerRequest.lastName, registerRequest.email, registerRequest.password);

        // Assert the result
        expect(eCommerceClient.post).toHaveBeenCalledWith('/auth/register', registerRequest);
        expect(result.status).toBe(200);
    });
});
