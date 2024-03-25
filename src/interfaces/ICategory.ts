import { IProduct } from "@/interfaces/IProduct";

export interface ICategory {
    categoryId?: number;
    name: string;
    products?: IProduct[];
}