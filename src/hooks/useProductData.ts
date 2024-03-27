import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, deleteProduct, updateProduct } from "@/services/ProductService";

export function useProductData() {
    const query = useQuery({
        queryFn:  getProducts,
        queryKey: ["products-data"],
    });

    return query;
}

export function useProductMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createProduct,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['products-data'] });
        }
    });

    return mutate;
}

export function useProductUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  updateProduct,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['products-data'] });
        }
    });

    return mutate;
}

export function useProductDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  deleteProduct,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['products-data'] });
        }
    });

    return mutate;
}
