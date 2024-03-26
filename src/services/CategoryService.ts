import { Api } from '@/services/Api';
import { ICategory } from '@/interfaces/ICategory';

export async function getCategories(): Promise<ICategory[] | null> {
    try {
        const request = await Api.get('/Categories');
        return request.data;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export async function getCategoriesProducts(): Promise<ICategory[] | null> {
    try {
        const request = await Api.get(`/Categories/products`);
        return request.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}


export async function createCategory(category: ICategory): Promise<ICategory | null> {
    try {
        const request = await Api.post('/Categories', category);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateCategory(category: ICategory): Promise<ICategory | null> {
    try {
        const request = await Api.put(`/Categories/${category.categoryId}`, category);
        return request.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteCategory(id: number) {
    try {
        const request = await Api.delete(`/Categories/${id}`);
        return request.data;
    } catch (error) {
        console.error(error);
    }
}
