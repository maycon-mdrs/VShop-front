import { Api } from '@/services/Api';
import { IProduct } from '@/interfaces/IProduct';

export async function getProducts(): Promise<IProduct[] | null> {
    try {
        const request = await Api.get('/Products');
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getProduct(id: number): Promise<IProduct | null> {
    try {
        const request = await Api.get(`/Products/${id}`);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createProduct(product: IProduct): Promise<IProduct | null> {
    try {
        const request = await Api.post('/Products', product);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateProduct(id: number, product: IProduct): Promise<IProduct | null> {
    try {
        const request = await Api.put(`/Products/${id}`, product);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteProduct(id: number) {
    try {
        const request = await Api.delete(`/Products/${id}`);
        return request.data;
    } catch (error) {
        console.error(error);
    }
}
