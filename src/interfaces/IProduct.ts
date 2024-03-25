import { ICategory } from '@/interfaces/ICategory';

export interface IProduct {
    id?: number;
    name: string;
    price: number;
    stock: number;
    description?: string;
    imageUrl: string;
    category?: ICategory;
    categoryId: number;
}
