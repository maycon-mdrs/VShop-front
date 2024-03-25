import { IProduct } from "@/interfaces/IProduct";
import { ICategory } from "@/interfaces/ICategory";
import { CardProduct } from "@/components/cardProduct/CardProduct";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useProductData } from "@/hooks/useProductData";
import { useCategoryData } from "@/hooks/useCategoryData";
import { Filter } from "@/components/Filter";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ListProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const product = useProductData();
    const categories = useCategoryData();

    // Filtro de dados baseado nos searchParams
    const filteredData = (product.data ?? []).filter(product => {
        const titleFilter = searchParams.get('title')?.toLowerCase();

        const matchesTitle = titleFilter ? product.name.toLowerCase().includes(titleFilter) : true;
        let matches = true;

        return matchesTitle && matches;
    });

    // Função para limpar a busca
    const clearSearch = () => {
        setSearchParams(new URLSearchParams()); // Define uma nova URLSearchParams vazia
        navigate('/'); // Volta para a URL padrão, se necessário
    };

    return (
        <>
            <div className="flex gap-2">
                <Filter />
                <Button variant="secondary" onClick={clearSearch}>X</Button>
            </div>
            {categories.data?.map((category: ICategory, index) => {
                const filteredProducts = filteredData.filter(product => product.categoryId === category.categoryId);
                if (filteredProducts && filteredProducts.length > 0) {
                    return (
                        <Accordion type="multiple" key={index}>
                            <AccordionItem value={`item-${category.categoryId}`} key={index}>
                                <AccordionTrigger>{category.name}</AccordionTrigger>
                                <AccordionContent className="flex flex-wrap sm:justify-normal justify-center items-center gap-4">
                                    {filteredProducts.map((product: IProduct, index) => (
                                        <CardProduct
                                            key={index}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            imageUrl={product.imageUrl}
                                            stock={product.stock}
                                            categoryId={product.categoryId}
                                        />
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    );
                }
                return null;
            })}
        </>
    )
}
